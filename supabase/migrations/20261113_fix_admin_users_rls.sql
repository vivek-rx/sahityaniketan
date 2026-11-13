-- ====================================================================
-- FIX: admin_users RLS infinite recursion (Postgres 42P17)
-- Date: 2026-11-13
-- Apply in: Supabase Dashboard → SQL Editor → Run
--
-- Symptom:
--   GET /rest/v1/admin_users  ->  HTTP 500
--   {"code":"42P17","message":"infinite recursion detected in policy
--    for relation \"admin_users\""}
--
-- Cause:
--   The `admin_superadmin` policy contained a subquery on admin_users,
--   the same table it protects. Evaluating the policy re-entered itself.
--
-- Fix:
--   Move both membership checks into SECURITY DEFINER functions owned by
--   postgres (table owner, bypasses RLS) and reference only those functions
--   from the policies.
-- ====================================================================

BEGIN;

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

DROP POLICY IF EXISTS admin_read       ON public.admin_users;
DROP POLICY IF EXISTS admin_superadmin ON public.admin_users;

CREATE POLICY admin_read ON public.admin_users
  FOR SELECT USING (public.is_admin());

CREATE POLICY admin_superadmin ON public.admin_users
  FOR ALL
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

COMMIT;

-- Verification (run separately after COMMIT):
--   SELECT policyname, cmd, qual, with_check
--   FROM pg_policies WHERE tablename = 'admin_users';
--
-- As an anon key, this must now return `[]` (or 401), never 42P17:
--   curl "$SUPABASE_URL/rest/v1/admin_users?select=id&limit=1" \
--     -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY"