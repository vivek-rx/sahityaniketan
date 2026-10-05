"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import type { Event } from "@/types/database";

export async function getEvents(includeArchived = false) {
  const supabase = (await createClient()) as any;
  let query = supabase.from("events").select("*").order("event_date", { ascending: false });
  if (!includeArchived) query = query.eq("is_archived", false);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getUpcomingEvents(limit = 6) {
  const supabase = (await createClient()) as any;
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_archived", false)
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPastEvents(limit = 6) {
  const supabase = (await createClient()) as any;
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_archived", false)
    .lt("event_date", today)
    .order("event_date", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createEvent(input: Omit<Event, "id" | "created_at" | "updated_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("events").insert(input).select().single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("create", "event", row.id, row.title);
  return row as Event;
}

export async function updateEvent(id: string, input: Partial<Event>) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("events").update(input).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("update", "event", id, row.title);
  return row as Event;
}

export async function archiveEvent(id: string) {
  return updateEvent(id, { is_archived: true });
}

export async function restoreEvent(id: string) {
  return updateEvent(id, { is_archived: false });
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const evt = await supabase.from("events").select("title").eq("id", id).single();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  const evtData = evt.data as any;
  await logAction("delete", "event", id, evtData?.title ?? id);
}

/** Auto-archive events older than the given number of days */
export async function autoArchiveOldEvents(olderThanDays = 365) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - olderThanDays);
  const { error } = await supabase
    .from("events")
    .update({ is_archived: true })
    .eq("is_archived", false)
    .lt("event_date", cutoff.toISOString().split("T")[0]);
  if (error) throw new Error(error.message);
  await logAction("auto_archive", "event", undefined, `Events older than ${olderThanDays} days archived`);
}
