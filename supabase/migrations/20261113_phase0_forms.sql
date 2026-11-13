-- ====================================================================
-- SAHITYA NIKETAN GRANTHALAYA — PHASE 0 PUBLIC FORMS
-- Run in: Supabase Dashboard → SQL Editor → Run
-- Idempotent: safe to run more than once.
--
-- Writes go through server actions using the service role; direct anon
-- inserts are deliberately not allowed, so nobody can bypass validation
-- with the public anon key.
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. Contact submissions
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  subject       TEXT,
  message       TEXT NOT NULL,
  status        TEXT DEFAULT 'unread' CHECK (status IN ('unread','read','replied','archived')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS consent_version TEXT,
  ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS locale TEXT;

-- --------------------------------------------------------------------
-- 2. Book acquisition requests
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.book_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_title    TEXT NOT NULL,
  author        TEXT,
  requested_by  TEXT NOT NULL,
  phone         TEXT,
  email         TEXT,
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','procured','rejected')),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.book_requests
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS consent_version TEXT,
  ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS locale TEXT;

-- --------------------------------------------------------------------
-- 3. Newsletter subscribers
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  status          TEXT NOT NULL DEFAULT 'subscribed'
                  CHECK (status IN ('subscribed','unsubscribed')),
  consent_given   BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version TEXT,
  consent_at      TIMESTAMPTZ,
  source          TEXT DEFAULT 'footer',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. Event RSVPs (events page currently uses curated event cards)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.event_rsvps (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_title     TEXT NOT NULL,
  event_date      TEXT,
  event_time      TEXT,
  venue           TEXT,
  name            TEXT NOT NULL,
  phone           TEXT,
  attendees       INT NOT NULL DEFAULT 1 CHECK (attendees BETWEEN 1 AND 10),
  consent_given   BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version TEXT,
  consent_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. Membership applications reuse the members table
-- --------------------------------------------------------------------
ALTER TABLE public.members
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS consent_version TEXT,
  ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS id_type TEXT,
  ADD COLUMN IF NOT EXISTS locale TEXT;

-- --------------------------------------------------------------------
-- 6. RLS: nobody reads submissions from the browser. Server actions use
--    the service role. Remove the old public-insert policies so the anon
--    key cannot write unvalidated rows.
-- --------------------------------------------------------------------
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to book_requests" ON public.book_requests;
DROP POLICY IF EXISTS "Allow public insert to contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow admin full access to book_requests" ON public.book_requests;
DROP POLICY IF EXISTS "Allow admin full access to contact_submissions" ON public.contact_submissions;

-- Explicit service-role grants (service_role also bypasses RLS).
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_submissions TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.book_requests TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_rsvps TO service_role;

-- --------------------------------------------------------------------
-- 7. Indexes for the admin inbox views
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx
  ON public.contact_submissions (status);
CREATE INDEX IF NOT EXISTS book_requests_created_at_idx
  ON public.book_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS book_requests_status_idx
  ON public.book_requests (status);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at_idx
  ON public.newsletter_subscribers (created_at DESC);
CREATE INDEX IF NOT EXISTS event_rsvps_created_at_idx
  ON public.event_rsvps (created_at DESC);
CREATE INDEX IF NOT EXISTS members_status_idx
  ON public.members (status);