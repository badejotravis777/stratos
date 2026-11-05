-- Waitlist signups from the marketing site (landing page + /waitlist).
-- Run this in the Supabase SQL editor, or with `supabase db push`.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null
    check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  source text not null default 'Landing page'
    check (char_length(source) <= 64),
  created_at timestamptz not null default now()
);

-- One row per address, case-insensitive.
create unique index if not exists waitlist_email_unique
  on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

-- Visitors (logged in or not) can add themselves.
-- There is deliberately no SELECT/UPDATE/DELETE policy: the list is only
-- readable from the Supabase dashboard or with the service role key.
drop policy if exists "Anyone can join the waitlist" on public.waitlist;
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);
