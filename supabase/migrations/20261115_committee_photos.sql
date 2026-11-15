-- ============================================================
-- Committee Photos: portraits for the About → Executive Committee cards.
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query).
-- Files themselves are uploaded to the `cms-media` storage bucket under
-- team/<slug>.<ext> by the /admin/committee CMS.
-- ============================================================

create table if not exists public.committee_photos (
  member_slug text primary key,
  image_url text not null,
  updated_at timestamptz not null default now()
);

-- ─── RLS ──────────────────────────────────────────────────────
alter table public.committee_photos enable row level security;

-- Anyone (anon included) may read — the About page is public.
drop policy if exists "committee_photos_public_read" on public.committee_photos;
create policy "committee_photos_public_read"
  on public.committee_photos
  for select
  using (true);

-- Writes happen exclusively through the server-side admin client
-- (service role bypasses RLS) after requireAdmin() checks.
