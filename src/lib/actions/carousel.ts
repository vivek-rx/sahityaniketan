"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import type { CarouselSlide } from "@/types/database";

export async function getCarouselSlides(activeOnly = false) {
  const supabase = (await createClient()) as any;
  let query = supabase.from("carousel_slides").select("*").order("display_order");
  if (activeOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createSlide(input: Omit<CarouselSlide, "id" | "created_at" | "updated_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("carousel_slides").insert(input).select().maybeSingle();
  if (error) throw new Error(error.message);
  let row = data as any;
  if (!row) {
    const fetched = await supabase.from("carousel_slides").select("*").order("created_at", { ascending: false }).limit(1).maybeSingle();
    row = fetched.data;
  }
  await logAction("create", "carousel_slide", row?.id, row?.title ?? input.title);
  return row as CarouselSlide;
}

export async function updateSlide(id: string, input: Partial<CarouselSlide>) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("carousel_slides").update(input).eq("id", id).select().maybeSingle();
  if (error) throw new Error(error.message);
  let row = data as any;
  if (!row) {
    const fetched = await supabase.from("carousel_slides").select("*").eq("id", id).maybeSingle();
    row = fetched.data;
  }
  await logAction("update", "carousel_slide", id, row?.title ?? id);
  return row as CarouselSlide;
}

export async function reorderSlides(orderedIds: string[]) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("carousel_slides").update({ display_order: index }).eq("id", id)
    )
  );
  await logAction("reorder", "carousel_slide", undefined, "Slides reordered");
}

export async function toggleSlideActive(id: string, active: boolean) {
  return updateSlide(id, { is_active: active });
}

export async function deleteSlide(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const slide = await supabase.from("carousel_slides").select("title").eq("id", id).single();
  const { error } = await supabase.from("carousel_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);
  const slideData = slide.data as any;
  await logAction("delete", "carousel_slide", id, slideData?.title ?? id);
}
