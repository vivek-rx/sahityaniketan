"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import type { Notice } from "@/types/database";

export async function getNotices(activeOnly = false) {
  const supabase = (await createClient()) as any;
  let query = supabase
    .from("notices")
    .select("*")
    .order("priority", { ascending: true })
    .order("created_at", { ascending: false });
  if (activeOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createNotice(input: Omit<Notice, "id" | "created_at" | "updated_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("notices").insert(input).select().single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("create", "notice", row.id, row.title);
  return row as Notice;
}

export async function updateNotice(id: string, input: Partial<Notice>) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("notices").update(input).eq("id", id).select().maybeSingle();
  if (error) throw new Error(error.message);
  let row = data as any;
  if (!row) {
    const fetched = await supabase.from("notices").select("*").eq("id", id).maybeSingle();
    row = fetched.data;
  }
  await logAction("update", "notice", id, row?.title ?? id);
  return row as Notice;
}

export async function deactivateNotice(id: string) {
  return updateNotice(id, { is_active: false });
}

export async function deleteNotice(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const n = await supabase.from("notices").select("title").eq("id", id).single();
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) throw new Error(error.message);
  const nData = n.data as any;
  await logAction("delete", "notice", id, nData?.title ?? id);
}

/** Expire notices that have passed their expires_at date */
export async function expireOldNotices() {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("notices")
    .update({ is_active: false })
    .eq("is_active", true)
    .not("expires_at", "is", null)
    .lt("expires_at", now);
  if (error) throw new Error(error.message);
}
