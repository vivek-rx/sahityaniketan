"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import type { Member } from "@/types/database";

export async function getMembers(status?: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  let query = supabase.from("members").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getMemberStats() {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("members").select("status");
  if (error) throw new Error(error.message);
  const stats = { total: 0, pending: 0, active: 0, expired: 0, suspended: 0 };
  ((data as any[]) ?? []).forEach((m) => {
    stats.total++;
    const s = m.status as keyof typeof stats;
    if (stats[s] !== undefined) stats[s]++;
  });
  return stats;
}

export async function createMember(input: Omit<Member, "id" | "created_at" | "updated_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("members").insert(input).select().single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("create", "member", row.id, row.name);
  return row as Member;
}

export async function updateMember(id: string, input: Partial<Member>) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("members").update(input).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("update", "member", id, row.name);
  return row as Member;
}

export async function approveMember(id: string) {
  const start = new Date().toISOString().split("T")[0];
  const end = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  return updateMember(id, {
    status: "active",
    membership_start: start,
    membership_end: end,
  });
}

export async function suspendMember(id: string) {
  return updateMember(id, { status: "suspended" });
}

export async function deleteMember(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const m = await supabase.from("members").select("name").eq("id", id).single();
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw new Error(error.message);
  const mData = m.data as any;
  await logAction("delete", "member", id, mData?.name ?? id);
}
