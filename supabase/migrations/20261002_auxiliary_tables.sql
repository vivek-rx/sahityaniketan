-- ====================================================================
-- SAHITYA NIKETAN GRANTHALAYA — MIGRATION 20261002
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ====================================================================

-- 1. Book Requests table (for reader book purchase/borrow requests)
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

-- 2. Contact Submissions table (inquiries & reader messages)
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

-- 3. Row Level Security (RLS)
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anonymous users can submit inquiries/requests
CREATE POLICY "Allow public insert to book_requests"
  ON public.book_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public insert to contact_submissions"
  ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admins can read and manage all requests
CREATE POLICY "Allow admin full access to book_requests"
  ON public.book_requests FOR ALL TO service_role USING (true);

CREATE POLICY "Allow admin full access to contact_submissions"
  ON public.contact_submissions FOR ALL TO service_role USING (true);
