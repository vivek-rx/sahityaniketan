-- ====================================================================
-- SAHITYA NIKETAN GRANTHALAYA — FULL PRODUCTION SCHEMA
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Auto update_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 1. ADMIN USERS
-- =============================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  role        TEXT DEFAULT 'librarian' CHECK (role IN ('super_admin','librarian','curator','viewer')),
  permissions JSONB DEFAULT '{}',
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. BOOKS (supports 20,000+ rows)
-- =============================================
CREATE TABLE IF NOT EXISTS public.books (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  title_marathi    TEXT,
  author           TEXT NOT NULL,
  isbn             TEXT UNIQUE,
  language         TEXT DEFAULT 'मराठी',
  category         TEXT DEFAULT 'कादंबरी',
  shelf_number     TEXT,
  publication_year INT,
  publisher        TEXT,
  description      TEXT,
  cover_url        TEXT,
  availability     TEXT DEFAULT 'available' CHECK (availability IN ('available','issued','reference_only')),
  is_featured      BOOLEAN DEFAULT FALSE,
  is_archived      BOOLEAN DEFAULT FALSE,
  rating           NUMERIC(3,2) DEFAULT 0,
  total_ratings    INT DEFAULT 0,
  borrow_count     INT DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. BOOK RATINGS
-- =============================================
CREATE TABLE IF NOT EXISTS public.book_ratings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id      UUID REFERENCES public.books(id) ON DELETE CASCADE,
  user_email   TEXT NOT NULL,
  rating_score INT CHECK (rating_score BETWEEN 1 AND 5),
  review_text  TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, user_email)
);

-- =============================================
-- 4. EVENTS
-- =============================================
CREATE TABLE IF NOT EXISTS public.events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  title_marathi   TEXT,
  description     TEXT,
  event_date      DATE NOT NULL,
  event_time      TEXT,
  location        TEXT,
  image_url       TEXT,
  video_url       TEXT,
  attendees_count INT DEFAULT 0,
  is_featured     BOOLEAN DEFAULT FALSE,
  is_archived     BOOLEAN DEFAULT FALSE,
  display_order   INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. HERO CAROUSEL SLIDES
-- =============================================
CREATE TABLE IF NOT EXISTS public.carousel_slides (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  subtitle      TEXT,
  image_url     TEXT,
  button_text   TEXT,
  button_link   TEXT,
  display_order INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  scheduled_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. POSTS / NEWS
-- =============================================
CREATE TABLE IF NOT EXISTS public.posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE,
  content       TEXT,
  excerpt       TEXT,
  thumbnail_url TEXT,
  category      TEXT DEFAULT 'announcement' CHECK (category IN ('announcement','news','event','notice','blog')),
  status        TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','scheduled','archived')),
  language      TEXT DEFAULT 'mr' CHECK (language IN ('mr','hi','en')),
  is_pinned     BOOLEAN DEFAULT FALSE,
  tags          TEXT[] DEFAULT '{}',
  published_at  TIMESTAMPTZ,
  scheduled_at  TIMESTAMPTZ,
  author_email  TEXT,
  views         INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 7. GALLERY ALBUMS
-- =============================================
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  category      TEXT DEFAULT 'Events',
  description   TEXT,
  cover_url     TEXT,
  event_id      UUID REFERENCES public.events(id) ON DELETE SET NULL,
  is_featured   BOOLEAN DEFAULT FALSE,
  is_archived   BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 8. GALLERY ITEMS
-- =============================================
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id      UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  type          TEXT DEFAULT 'photo' CHECK (type IN ('photo','video')),
  url           TEXT NOT NULL,
  thumbnail_url TEXT,
  caption       TEXT,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 9. NOTICE BOARD
-- =============================================
CREATE TABLE IF NOT EXISTS public.notices (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  content     TEXT,
  priority    TEXT DEFAULT 'normal' CHECK (priority IN ('urgent','high','normal','low')),
  type        TEXT DEFAULT 'general' CHECK (type IN ('general','holiday','event','exam','admission')),
  is_active   BOOLEAN DEFAULT TRUE,
  expires_at  TIMESTAMPTZ,
  created_by  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 10. MEMBERS
-- =============================================
CREATE TABLE IF NOT EXISTS public.members (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  email            TEXT,
  phone            TEXT,
  address          TEXT,
  membership_type  TEXT DEFAULT 'standard' CHECK (membership_type IN ('standard','student','senior','lifetime')),
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending','active','expired','suspended')),
  membership_start DATE,
  membership_end   DATE,
  books_borrowed   INT DEFAULT 0,
  photo_url        TEXT,
  notes            TEXT,
  id_type          TEXT,
  locale           TEXT,
  consent_given    BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version  TEXT,
  consent_at       TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 10b. PUBLIC FORM SUBMISSIONS
-- Writes go through validated server actions using the service role;
-- no anon INSERT policies on purpose.
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  subject         TEXT,
  message         TEXT NOT NULL,
  status          TEXT DEFAULT 'unread' CHECK (status IN ('unread','read','replied','archived')),
  locale          TEXT,
  consent_given   BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version TEXT,
  consent_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.book_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_title      TEXT NOT NULL,
  author          TEXT,
  requested_by    TEXT NOT NULL,
  phone           TEXT,
  email           TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','procured','rejected')),
  notes           TEXT,
  locale          TEXT,
  consent_given   BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version TEXT,
  consent_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  status          TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed','unsubscribed')),
  source          TEXT DEFAULT 'footer',
  consent_given   BOOLEAN NOT NULL DEFAULT FALSE,
  consent_version TEXT,
  consent_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

-- =============================================
-- 11. SITE SETTINGS (key-value)
-- =============================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB,
  description TEXT,
  updated_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 12. AUDIT LOG
-- =============================================
CREATE TABLE IF NOT EXISTS public.audit_log (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_email    TEXT NOT NULL,
  action         TEXT NOT NULL,
  resource_type  TEXT NOT NULL,
  resource_id    TEXT,
  resource_title TEXT,
  details        JSONB,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES (critical for 20k books performance)
-- =============================================
CREATE INDEX IF NOT EXISTS idx_books_fts ON public.books
  USING gin(to_tsvector('simple',
    coalesce(title,'') || ' ' || coalesce(title_marathi,'') || ' ' ||
    coalesce(author,'') || ' ' || coalesce(isbn,'')
  ));
CREATE INDEX IF NOT EXISTS idx_books_title_trgm    ON public.books USING gin(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_books_author_trgm   ON public.books USING gin(author gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_books_category      ON public.books(category);
CREATE INDEX IF NOT EXISTS idx_books_language      ON public.books(language);
CREATE INDEX IF NOT EXISTS idx_books_availability  ON public.books(availability);
CREATE INDEX IF NOT EXISTS idx_books_featured      ON public.books(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_books_archived      ON public.books(is_archived);
CREATE INDEX IF NOT EXISTS idx_events_date         ON public.events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_archived     ON public.events(is_archived);
CREATE INDEX IF NOT EXISTS idx_posts_status        ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_slug          ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_members_status      ON public.members(status);
CREATE INDEX IF NOT EXISTS idx_notices_active      ON public.notices(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_audit_created       ON public.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_created     ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status      ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_book_requests_created ON public.book_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_book_requests_status  ON public.book_requests(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_created  ON public.newsletter_subscribers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_rsvps_created ON public.event_rsvps(created_at DESC);

-- =============================================
-- TRIGGERS
-- =============================================
DROP TRIGGER IF EXISTS t_books_updated_at          ON public.books;
DROP TRIGGER IF EXISTS t_events_updated_at         ON public.events;
DROP TRIGGER IF EXISTS t_posts_updated_at          ON public.posts;
DROP TRIGGER IF EXISTS t_gallery_albums_updated_at ON public.gallery_albums;
DROP TRIGGER IF EXISTS t_carousel_updated_at       ON public.carousel_slides;
DROP TRIGGER IF EXISTS t_notices_updated_at        ON public.notices;
DROP TRIGGER IF EXISTS t_members_updated_at        ON public.members;
DROP TRIGGER IF EXISTS t_admin_users_updated_at    ON public.admin_users;

CREATE TRIGGER t_books_updated_at          BEFORE UPDATE ON public.books          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER t_events_updated_at         BEFORE UPDATE ON public.events         FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER t_posts_updated_at          BEFORE UPDATE ON public.posts          FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER t_gallery_albums_updated_at BEFORE UPDATE ON public.gallery_albums FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER t_carousel_updated_at       BEFORE UPDATE ON public.carousel_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER t_notices_updated_at        BEFORE UPDATE ON public.notices        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER t_members_updated_at        BEFORE UPDATE ON public.members        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER t_admin_users_updated_at    BEFORE UPDATE ON public.admin_users    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.books           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_ratings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carousel_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_requests           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps             ENABLE ROW LEVEL SECURITY;

-- Helper function: is current user an active admin?
-- SECURITY DEFINER is owned by the migration role (postgres), which bypasses
-- RLS on admin_users. Without that, a policy that reads admin_users would
-- re-enter itself and Postgres raises 42P17 "infinite recursion".
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE lower(email) = lower(coalesce(auth.email(), ''))
      AND is_active = TRUE
  );
$$;

-- Helper function: is current user a super admin?
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE lower(email) = lower(coalesce(auth.email(), ''))
      AND role = 'super_admin'
      AND is_active = TRUE
  );
$$;

-- BOOKS
DROP POLICY IF EXISTS books_public_read  ON public.books;
DROP POLICY IF EXISTS books_admin_write  ON public.books;
CREATE POLICY books_public_read ON public.books FOR SELECT USING (TRUE);
CREATE POLICY books_admin_write ON public.books FOR ALL   USING (public.is_admin());

-- BOOK RATINGS
DROP POLICY IF EXISTS ratings_public_read ON public.book_ratings;
DROP POLICY IF EXISTS ratings_any_insert  ON public.book_ratings;
CREATE POLICY ratings_public_read ON public.book_ratings FOR SELECT USING (TRUE);
CREATE POLICY ratings_any_insert  ON public.book_ratings FOR INSERT WITH CHECK (TRUE);

-- EVENTS
DROP POLICY IF EXISTS events_public_read ON public.events;
DROP POLICY IF EXISTS events_admin_write ON public.events;
CREATE POLICY events_public_read ON public.events FOR SELECT USING (TRUE);
CREATE POLICY events_admin_write ON public.events FOR ALL   USING (public.is_admin());

-- CAROUSEL
DROP POLICY IF EXISTS carousel_public_read ON public.carousel_slides;
DROP POLICY IF EXISTS carousel_admin_write ON public.carousel_slides;
CREATE POLICY carousel_public_read ON public.carousel_slides FOR SELECT USING (TRUE);
CREATE POLICY carousel_admin_write ON public.carousel_slides FOR ALL   USING (public.is_admin());

-- POSTS
DROP POLICY IF EXISTS posts_public_read ON public.posts;
DROP POLICY IF EXISTS posts_admin_write ON public.posts;
CREATE POLICY posts_public_read ON public.posts FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY posts_admin_write ON public.posts FOR ALL   USING (public.is_admin());

-- GALLERY
DROP POLICY IF EXISTS gallery_albums_public ON public.gallery_albums;
DROP POLICY IF EXISTS gallery_albums_admin  ON public.gallery_albums;
CREATE POLICY gallery_albums_public ON public.gallery_albums FOR SELECT USING (TRUE);
CREATE POLICY gallery_albums_admin  ON public.gallery_albums FOR ALL   USING (public.is_admin());

DROP POLICY IF EXISTS gallery_items_public ON public.gallery_items;
DROP POLICY IF EXISTS gallery_items_admin  ON public.gallery_items;
CREATE POLICY gallery_items_public ON public.gallery_items FOR SELECT USING (TRUE);
CREATE POLICY gallery_items_admin  ON public.gallery_items FOR ALL   USING (public.is_admin());

-- NOTICES
DROP POLICY IF EXISTS notices_public_read ON public.notices;
DROP POLICY IF EXISTS notices_admin_write ON public.notices;
CREATE POLICY notices_public_read ON public.notices FOR SELECT USING (is_active = TRUE OR public.is_admin());
CREATE POLICY notices_admin_write ON public.notices FOR ALL   USING (public.is_admin());

-- MEMBERS (admin only)
DROP POLICY IF EXISTS members_admin_only ON public.members;
CREATE POLICY members_admin_only ON public.members FOR ALL USING (public.is_admin());

-- ADMIN USERS
-- NOTE: never put a bare `SELECT ... FROM admin_users` inside a policy on
-- admin_users. It re-enters the policy and causes 42P17 infinite recursion.
-- Use the SECURITY DEFINER helpers instead.
DROP POLICY IF EXISTS admin_read       ON public.admin_users;
DROP POLICY IF EXISTS admin_superadmin ON public.admin_users;
CREATE POLICY admin_read       ON public.admin_users FOR SELECT USING (public.is_admin());
CREATE POLICY admin_superadmin ON public.admin_users FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- SITE SETTINGS
DROP POLICY IF EXISTS settings_public_read ON public.site_settings;
DROP POLICY IF EXISTS settings_admin_write ON public.site_settings;
CREATE POLICY settings_public_read ON public.site_settings FOR SELECT USING (TRUE);
CREATE POLICY settings_admin_write ON public.site_settings FOR ALL   USING (public.is_admin());

-- AUDIT LOG
DROP POLICY IF EXISTS audit_admin_read ON public.audit_log;
DROP POLICY IF EXISTS audit_any_insert ON public.audit_log;
CREATE POLICY audit_admin_read ON public.audit_log FOR SELECT USING (public.is_admin());
CREATE POLICY audit_any_insert ON public.audit_log FOR INSERT WITH CHECK (TRUE);

-- PUBLIC FORM TABLES
-- No anon/authenticated policies: RLS denies every browser read and write.
-- Server actions use the service role after zod validation, honeypot, elapsed
-- time, Turnstile (when configured) and per-IP rate limiting.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_submissions   TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.book_requests         TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_rsvps           TO service_role;

-- =============================================
-- SEED: ADMIN USER
-- =============================================
INSERT INTO public.admin_users (email, name, role)
VALUES ('sahityaniketanabajogai@gmail.com', 'Sahitya Niketan Admin', 'super_admin')
ON CONFLICT (email) DO UPDATE SET role = 'super_admin', is_active = TRUE, updated_at = NOW();

-- =============================================
-- SEED: DEFAULT SITE SETTINGS
-- =============================================
INSERT INTO public.site_settings (key, value, description) VALUES
  ('library_name',          '"साहित्य निकेतन ग्रंथालय"',          'Library name (Marathi)'),
  ('library_name_en',       '"Sahitya Niketan Library"',            'Library name (English)'),
  ('library_city',          '"अंबाजोगाई, बीड, महाराष्ट्र"',       'City and district'),
  ('library_phone',         '"+91 90966 42583"',                    'Contact phone'),
  ('library_email',         '"sahityaniketan.ambajogai@gmail.com"', 'Contact email'),
  ('library_hours',         '"सोम-शनि: सकाळी ८:०० ते रात्री ८:३० (वर्तमानपत्र कक्ष सकाळी ७:०० पासून)"', 'Opening hours'),
  ('established_year',      '"1945"',                               'Year established'),
  ('total_books_display',   '"39,953"',                             'Printed volumes in the physical collection'),
  ('total_members_display', '"सक्रिय वाचक व सभासद"',                  'Qualitative member label; no unverified count'),
  ('hero_tagline',          '"ज्ञान, संस्कृती आणि साहित्याचे केंद्र"', 'Hero tagline')
ON CONFLICT (key) DO NOTHING;
