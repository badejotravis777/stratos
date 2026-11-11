# Supabase setup

Two one-time steps switch on the backend pieces the app already calls. Until
you do them, the app keeps working: waitlist signups fall back to the EmailJS
email only, and Stratos Guide tells users to message the team on WhatsApp.

## 1. Store waitlist signups

Run `migrations/20261105000000_create_waitlist.sql` in the Supabase dashboard
(SQL Editor → New query → paste → Run), or with the CLI:

```bash
supabase db push
```

This creates a `waitlist` table that anyone can add themselves to, but nobody
can read from the browser. View signups under Table Editor → `waitlist`.

## 2. Turn on Stratos Guide (the in-app chat)

The chat calls the `stratos-guide` Edge Function, which uses the Claude API.

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase secrets set ANTHROPIC_API_KEY=<your Anthropic API key>
supabase functions deploy stratos-guide
```

Get an API key from https://platform.claude.com. The function uses
`claude-opus-5-5` by default. To use a different model, set
`STRATOS_GUIDE_MODEL` with `supabase secrets set`.

## 3. Turn on Deal Check

Deal Check (`/deal-check` in the app) reviews a brand deal for a creator: red
flags, scam signs, a fair rate, and a counter-offer to send. It needs the
`deal_checks` table and its own Edge Function. It uses the same
`ANTHROPIC_API_KEY` secret as Stratos Guide.

Run `migrations/20261111000000_create_deal_checks.sql` (SQL Editor, or
`supabase db push`), then deploy the function:

```bash
supabase functions deploy deal-check
```

How it works:

- The function saves each result (never the deal text itself) to
  `deal_checks`. Users can read their own history; only the function can
  write, so nobody can skew the numbers or reset their free checks.
- Every saved offer feeds `deal_benchmark()`, which tells Claude what similar
  creators on the same platform were offered per deliverable. It only returns
  numbers once at least five offers exist for that platform, audience size
  and currency.
- People on the Starter (free) plan get 3 checks every 30 days. Paid plans are
  unlimited. Change the allowance with
  `supabase secrets set DEAL_CHECK_FREE_LIMIT=5`.
- The function uses `claude-opus-5-5` by default. To use a different model,
  set `DEAL_CHECK_MODEL`.
