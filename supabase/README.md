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
