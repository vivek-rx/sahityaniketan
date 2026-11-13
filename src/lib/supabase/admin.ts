/**
 * Supabase Admin Client (Server-side only)
 * Uses SERVICE_ROLE key — bypasses RLS for admin operations
 * NEVER import this in client components or expose to browser
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Service-role client without the hand-written `Database` generic.
 *
 * supabase-js constrains every table Row/Insert to `Record<string, unknown>`.
 * The project's row types are TypeScript interfaces, which do not satisfy that
 * constraint, so a typed client collapses each table to `never`. Public form
 * tables (contact, book requests, newsletter, RSVPs) are therefore written
 * through this untyped client; their payloads are validated by zod first.
 */
export function createUntypedAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
