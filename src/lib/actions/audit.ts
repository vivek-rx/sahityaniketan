"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import type { AuditLog } from "@/types/database";

/** Append an entry to the audit_log table. Fire-and-forget safe. */
export async function logAction(
  action: string,
  resourceType: string,
  resourceId?: string,
  resourceTitle?: string,
  details?: Record<string, unknown>
): Promise<void> {
  try {
    const serverClient = await createClient();
    const { data: { user } } = await serverClient.auth.getUser();

    const supabase = createAdminClient() as any;
    await supabase.from("audit_log").insert({
      actor_email: user?.email ?? "system",
      action,
      resource_type: resourceType,
      resource_id: resourceId ?? null,
      resource_title: resourceTitle ?? null,
      details: details ?? null,
    });
  } catch {
    // Audit failures should never break the main operation
  }
}

/** Fetch recent audit log entries (admin only) */
export async function getAuditLog(limit = 100): Promise<AuditLog[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}
