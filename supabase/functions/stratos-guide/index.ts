// Stratos Guide: the in-app chat assistant.
//
// Deploy:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   supabase functions deploy stratos-guide
//
// The browser sends the conversation; everything about the user (name, niche,
// plan day, today's task, available tools) is loaded here with the caller's
// own Supabase session, so the client can't spoof it.

import Anthropic from "npm:@anthropic-ai/sdk@1.5.0";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2.119.0";

const MODEL = Deno.env.get("STRATOS_GUIDE_MODEL") ?? "claude-opus-5-5";
const MAX_TURNS = 20; // most recent messages kept as context
const MAX_MESSAGE_CHARS = 4000;
const PLAN_LENGTH_DAYS = 30;

const PAGES = new Set([
  "Dashboard",
  "Growth Plan",
  "Categories",
  "Niche Toolkit",
  "Resources",
  "Tool",
  "Profile",
  "Settings",
  "Deal Check",
]);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Stable instructions first; per-user context goes in a second system block.
const GUIDE_INSTRUCTIONS = `You are Stratos Guide, the assistant inside Stratos HQ: a mobile-first brand toolkit that helps African creators and small businesses plan content, design visuals, and grow online without hiring an agency. Stratos is built by Novalith Marketing.

You help with content ideas, captions, hooks, Reel and TikTok scripts, DM scripts, posting plans, branding, and growth on Instagram, TikTok, X, LinkedIn and WhatsApp.

How to reply:
- Be warm, direct and practical. Lead with the answer and keep most replies under about 150 words unless the user asks for more.
- When asked for copy (captions, hooks, DMs, scripts), write it ready to paste, in a natural voice that fits the user's niche and audience. Offer two or three options when that helps them choose.
- Connect advice to the user's 30-day plan and today's task when it's relevant.
- Recommend Stratos tools by their exact names from the list you're given, and point to the app sections by name (Dashboard, Growth Plan, Categories, Niche Toolkit, Resources, Deal Check). Never invent tools, links, prices or features.
- When someone has a brand deal, sponsorship offer or creator contract, send them to Deal Check: it flags red flags and scam signs, estimates a fair rate, and writes a counter-offer.
- Use Naira for money when it comes up.
- The chat shows plain text: use short paragraphs and simple dash lists, no Markdown headings, bold, or tables.
- For billing, account or technical problems, tell them to message the Stratos team on WhatsApp or email hello@stratoshqapp.com.

Latency-sensitive; begin your visible answer immediately.`;

type ChatTurn = { role: "user" | "assistant"; content: string };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

/** Validates the client's history. Returns null if it can't be used. */
function sanitizeMessages(input: unknown): ChatTurn[] | null {
  if (!Array.isArray(input)) return null;

  const turns: ChatTurn[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (text) turns.push({ role, content: text });
  }

  // Keep a recent window, which must start and end with the user.
  let recent = turns.slice(-MAX_TURNS);
  while (recent.length && recent[0].role !== "user") recent = recent.slice(1);
  if (!recent.length || recent[recent.length - 1].role !== "user") return null;
  return recent;
}

function planDay(planStartDate: string | null): number {
  if (!planStartDate) return 1;
  const start = new Date(planStartDate);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const day = Math.floor((now.getTime() - start.getTime()) / 86_400_000) + 1;
  return Math.min(Math.max(day, 1), PLAN_LENGTH_DAYS);
}

async function buildUserContext(supabase: SupabaseClient, userId: string, page: string | null) {
  const { data: profile } = await supabase
    .from("users")
    .select("first_name, industry, niche_id, plan_start_date, niches(name)")
    .eq("id", userId)
    .maybeSingle();

  const lines: string[] = ["About the person you're helping:"];
  if (!profile) {
    lines.push("- Profile not available.");
    return lines.join("\n");
  }

  const niche = (profile.niches as { name?: string } | null)?.name ?? "not set";
  const day = planDay(profile.plan_start_date);
  lines.push(`- First name: ${profile.first_name || "unknown"}`);
  if (profile.industry) lines.push(`- What they do: ${profile.industry}`);
  lines.push(`- Niche: ${niche}`);
  lines.push(`- On day ${day} of their ${PLAN_LENGTH_DAYS}-day growth plan`);
  if (page) lines.push(`- Currently on the ${page} page of the app`);

  if (profile.niche_id) {
    const [{ data: task }, { count: completed }, { data: tools }] = await Promise.all([
      supabase
        .from("daily_tasks")
        .select("title, description, tools(title)")
        .eq("niche_id", profile.niche_id)
        .eq("day_number", day)
        .maybeSingle(),
      supabase
        .from("user_progress")
        .select("day_number", { count: "exact", head: true })
        .eq("user_id", userId)
        .not("completed_at", "is", null),
      supabase
        .from("tools")
        .select("title, type, category")
        .eq("niche_id", profile.niche_id)
        .order("title", { ascending: true })
        .limit(60),
    ]);

    if (typeof completed === "number") lines.push(`- Days completed so far: ${completed}`);
    if (task) {
      const linkedTool = (task.tools as { title?: string } | null)?.title;
      lines.push(
        `- Today's task: "${task.title}"${task.description ? ` (${task.description})` : ""}` +
          (linkedTool ? `. Suggested tool: ${linkedTool}` : ""),
      );
    }
    if (tools?.length) {
      lines.push("", `Stratos tools available for the ${niche} niche:`);
      for (const t of tools) {
        lines.push(`- ${t.title} (${[t.type, t.category].filter(Boolean).join(", ")})`);
      }
    }
  }

  return lines.join("\n");
}

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return json({ error: "Please log in to use Stratos Guide." }, 401);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const { data: authData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !authData.user) return json({ error: "Please log in to use Stratos Guide." }, 401);

  let body: { messages?: unknown; page?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const messages = sanitizeMessages(body.messages);
  if (!messages) return json({ error: "Send a message to get started." }, 400);
  if (messages[messages.length - 1].content.length > MAX_MESSAGE_CHARS) {
    return json({ error: `Please keep messages under ${MAX_MESSAGE_CHARS} characters.` }, 400);
  }

  const page = typeof body.page === "string" && PAGES.has(body.page) ? body.page : null;
  const userContext = await buildUserContext(supabase, authData.user.id, page);

  try {
    const response = await anthropic.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: "low" },
      // If a safety classifier declines, retry server-side on Anthropic's recommended model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [
        { type: "text", text: GUIDE_INSTRUCTIONS },
        { type: "text", text: userContext },
      ],
      messages,
    });

    if (response.stop_reason === "refusal") {
      return json({
        reply: "I can't help with that one. Try asking it another way, or message the Stratos team on WhatsApp.",
      });
    }

    const reply = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("\n")
      .trim();

    return json({
      reply: reply || "Sorry, I lost my train of thought. Could you ask that again?",
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return json({ error: "Stratos Guide is busy right now. Try again in a minute." }, 429);
    }
    if (err instanceof Anthropic.APIError) {
      console.error(`Claude API error ${err.status}:`, err.message);
      return json({ error: "Stratos Guide is unavailable right now." }, 502);
    }
    console.error("Unexpected error:", err);
    return json({ error: "Stratos Guide is unavailable right now." }, 500);
  }
});
