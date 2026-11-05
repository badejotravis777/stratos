import { supabase } from './supabaseClient';

const TOOL_FIELDS = 'id, title, description, type, category';

/**
 * The Starter Kit is the set of tools a niche's plan uses in its first week
 * (days 1–7), in plan order. If a niche has no tools linked to those days yet,
 * fall back to the first few tools in the niche so the kit is never empty.
 */
export async function fetchStarterKit(nicheId, limit = 5) {
  if (!nicheId) return [];

  const { data: taskRows } = await supabase
    .from('daily_tasks')
    .select(`day_number, tools(${TOOL_FIELDS})`)
    .eq('niche_id', nicheId)
    .lte('day_number', 7)
    .order('day_number', { ascending: true });

  const seen = new Set();
  const kit = [];
  (taskRows || []).forEach((row) => {
    if (row.tools && !seen.has(row.tools.id)) {
      seen.add(row.tools.id);
      kit.push(row.tools);
    }
  });

  if (kit.length > 0) return kit.slice(0, limit);

  const { data: fallback } = await supabase
    .from('tools')
    .select(TOOL_FIELDS)
    .eq('niche_id', nicheId)
    .order('title', { ascending: true })
    .limit(limit);
  return fallback || [];
}
