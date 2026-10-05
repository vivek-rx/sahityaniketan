"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import type { Json } from "@/types/database";

export async function getSetting(key: string): Promise<Json | null> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();
  if (error) return null;
  return data?.value ?? null;
}

export async function getAllSettings(): Promise<Record<string, Json>> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) throw new Error(error.message);
  return Object.fromEntries(((data as any[]) ?? []).map((r) => [r.key, r.value]));
}

export async function setSetting(key: string, value: Json, updatedBy?: string): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_by: updatedBy ?? "admin", updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function setSettings(settings: Record<string, Json>, updatedBy?: string): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const rows = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_by: updatedBy ?? "admin",
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from("site_settings").upsert(rows);
  if (error) throw new Error(error.message);
}
