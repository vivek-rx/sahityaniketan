"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import type { GalleryAlbum, GalleryItem } from "@/types/database";

// ─── ALBUMS ──────────────────────────────────────────────────

export async function getAlbums(includeArchived = false) {
  const supabase = (await createClient()) as any;
  let query = supabase
    .from("gallery_albums")
    .select("*, gallery_items(count)")
    .order("display_order");
  if (!includeArchived) query = query.eq("is_archived", false);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAlbumWithItems(albumId: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("gallery_albums")
    .select("*, gallery_items(*)")
    .eq("id", albumId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createAlbum(input: Omit<GalleryAlbum, "id" | "created_at" | "updated_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("gallery_albums").insert(input).select().maybeSingle();
  if (error) throw new Error(error.message);
  let row = data as any;
  if (!row) {
    const fetched = await supabase.from("gallery_albums").select("*").order("created_at", { ascending: false }).limit(1).maybeSingle();
    row = fetched.data;
  }
  await logAction("create", "gallery_album", row?.id, row?.title ?? (input as any).title);
  return row as GalleryAlbum;
}

export async function updateAlbum(id: string, input: Partial<GalleryAlbum>) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("gallery_albums").update(input).eq("id", id).select().maybeSingle();
  if (error) throw new Error(error.message);
  let row = data as any;
  if (!row) {
    const fetched = await supabase.from("gallery_albums").select("*").eq("id", id).maybeSingle();
    row = fetched.data;
  }
  await logAction("update", "gallery_album", id, row?.title ?? id);
  return row as GalleryAlbum;
}

export async function archiveAlbum(id: string) {
  return updateAlbum(id, { is_archived: true });
}

export async function deleteAlbum(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const album = await supabase.from("gallery_albums").select("title").eq("id", id).single();
  const { error } = await supabase.from("gallery_albums").delete().eq("id", id);
  if (error) throw new Error(error.message);
  const albumData = album.data as any;
  await logAction("delete", "gallery_album", id, albumData?.title ?? id);
}

// ─── ITEMS ───────────────────────────────────────────────────

export async function addGalleryItem(input: Omit<GalleryItem, "id" | "created_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("gallery_items").insert(input).select().maybeSingle();
  if (error) throw new Error(error.message);
  let row = data as any;
  if (!row) {
    const fetched = await supabase.from("gallery_items").select("*").eq("album_id", input.album_id).order("created_at", { ascending: false }).limit(1).maybeSingle();
    row = fetched.data;
  }
  await logAction("create", "gallery_item", row?.id, row?.caption ?? row?.url ?? input.url);
  return row as GalleryItem;
}

export async function addGalleryItemsBulk(items: Omit<GalleryItem, "id" | "created_at">[]) {
  if (!items.length) return [];
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase.from("gallery_items").insert(items).select();
  if (error) throw new Error(error.message);
  await logAction("create", "gallery_item", undefined, `Bulk added ${items.length} photos`);
  return (data || []) as GalleryItem[];
}

export async function deleteGalleryItem(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAction("delete", "gallery_item", id);
}

export async function deleteGalleryItemsBulk(ids: string[]) {
  if (!ids.length) return;
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { error } = await supabase.from("gallery_items").delete().in("id", ids);
  if (error) throw new Error(error.message);
  await logAction("delete", "gallery_item", undefined, `Bulk deleted ${ids.length} photos`);
}

export async function reorderGalleryItems(albumId: string, orderedIds: string[]) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("gallery_items").update({ display_order: index }).eq("id", id)
    )
  );
}
