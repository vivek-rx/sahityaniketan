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
