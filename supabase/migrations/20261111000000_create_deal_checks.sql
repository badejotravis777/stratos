-- Deal Check: every brand deal a creator runs through the checker.
--
-- Rows are written only by the `deal-check` Edge Function (service role), so
-- people can't fake rows to skew the rate benchmark or reset their free
-- checks. Each person can read their own history. The raw deal text is never
-- stored, only the structured result.

create table if not exists public.deal_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),

  title text,
  platform text,
  niche text,
  country text,
  currency text,
  followers integer,
  followers_band text,
  avg_views integer,
  engagement_rate numeric,

  deliverable_count integer,
  offered_fee numeric,
  offered_per_deliverable numeric,
  fair_rate_low numeric,
  fair_rate_high numeric,
  verdict text check (verdict in ('take_it', 'negotiate', 'walk_away')),
  deal_score integer,
  scam_risk text,

  result jsonb not null
);

create index if not exists deal_checks_user_created_idx
  on public.deal_checks (user_id, created_at desc);

create index if not exists deal_checks_benchmark_idx
  on public.deal_checks (platform, followers_band, currency);

alter table public.deal_checks enable row level security;

drop policy if exists "Read own deal checks" on public.deal_checks;
create policy "Read own deal checks"
  on public.deal_checks for select
  to authenticated
  using (auth.uid() = user_id);

-- What creators of a similar size on the same platform were actually offered,
-- per deliverable, over the last 12 months. Returns no row until at least five
-- offers exist, so a single person's deal can never be singled out.
create or replace function public.deal_benchmark(
  p_platform text,
  p_band text,
  p_currency text
)
returns table (
  sample_size bigint,
  offered_p25 numeric,
  offered_median numeric,
  offered_p75 numeric
)
language sql
stable
security definer
set search_path = public
as $$
  select
    count(*) as sample_size,
    round(percentile_cont(0.25) within group (order by offered_per_deliverable)::numeric, 2),
    round(percentile_cont(0.50) within group (order by offered_per_deliverable)::numeric, 2),
    round(percentile_cont(0.75) within group (order by offered_per_deliverable)::numeric, 2)
  from public.deal_checks
  where platform = p_platform
    and followers_band = p_band
    and currency = p_currency
    and offered_per_deliverable is not null
    and offered_per_deliverable > 0
    and created_at > now() - interval '12 months'
  having count(*) >= 5;
$$;

revoke all on function public.deal_benchmark(text, text, text) from public, anon;
grant execute on function public.deal_benchmark(text, text, text) to authenticated, service_role;
