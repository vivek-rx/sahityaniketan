-- ============================================================
-- Choice Awards: nominees + anonymous voting
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query).
-- ============================================================

-- ─── Nominees ─────────────────────────────────────────────────
create table if not exists public.choice_nominees (
  id uuid primary key default gen_random_uuid(),
  year int not null default 2026,
  category text not null,
  book_id uuid not null references public.books (id) on delete cascade,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- A book can only be nominated once per category per year
create unique index if not exists choice_nominees_unique_book
  on public.choice_nominees (year, category, book_id);

create index if not exists choice_nominees_year_category_idx
  on public.choice_nominees (year, category, display_order);

-- ─── Votes ────────────────────────────────────────────────────
create table if not exists public.choice_votes (
  id uuid primary key default gen_random_uuid(),
  nominee_id uuid not null references public.choice_nominees (id) on delete cascade,
  year int not null default 2026,
  category text not null,
  voter_key text not null,
  created_at timestamptz not null default now()
);

-- One vote per voter per category per year (no vote switching in v1)
create unique index if not exists choice_votes_unique_voter
  on public.choice_votes (year, category, voter_key);

create index if not exists choice_votes_nominee_idx
  on public.choice_votes (nominee_id);

-- ─── RLS ──────────────────────────────────────────────────────
alter table public.choice_nominees enable row level security;
alter table public.choice_votes enable row level security;

drop policy if exists "choice_nominees_public_read" on public.choice_nominees;
create policy "choice_nominees_public_read"
  on public.choice_nominees for select
  to anon, authenticated
  using (true);

drop policy if exists "choice_nominees_admin_write" on public.choice_nominees;
create policy "choice_nominees_admin_write"
  on public.choice_nominees for all
  to authenticated
  using (is_admin())
  with check (is_admin());

drop policy if exists "choice_votes_public_read" on public.choice_votes;
create policy "choice_votes_public_read"
  on public.choice_votes for select
  to anon, authenticated
  using (true);

drop policy if exists "choice_votes_public_insert" on public.choice_votes;
create policy "choice_votes_public_insert"
  on public.choice_votes for insert
  to anon, authenticated
  with check (
    char_length(voter_key) between 8 and 64
    and exists (
      select 1 from public.choice_nominees n
      where n.id = nominee_id and n.year = year and n.category = category
    )
  );

-- ─── Voting open/close toggle ────────────────────────────────
insert into public.site_settings (key, value, description)
values (
  'choice_awards_voting_open',
  'true'::jsonb,
  'Whether the public Choice Awards voting form accepts votes'
)
on conflict (key) do nothing;
