"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/require-admin";

export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  pendingMembers: number;
  activeMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  archivedEvents: number;
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalGalleryPhotos: number;
  activeNotices: number;
  activeSlides: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const today = new Date().toISOString().split("T")[0];

  const [
    books,
    members,
    pendingMembers,
    activeMembers,
    events,
    upcomingEvents,
    archivedEvents,
    posts,
    publishedPosts,
    draftPosts,
    galleryPhotos,
    activeNotices,
    activeSlides,
  ] = await Promise.all([
    supabase.from("books").select("id", { count: "exact", head: true }).eq("is_archived", false),
    supabase.from("members").select("id", { count: "exact", head: true }),
    supabase.from("members").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("members").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("events").select("id", { count: "exact", head: true }).eq("is_archived", false),
    supabase.from("events").select("id", { count: "exact", head: true }).eq("is_archived", false).gte("event_date", today),
    supabase.from("events").select("id", { count: "exact", head: true }).eq("is_archived", true),
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("gallery_items").select("id", { count: "exact", head: true }).eq("type", "photo"),
    supabase.from("notices").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("carousel_slides").select("id", { count: "exact", head: true }).eq("is_active", true),
  ]);

  return {
    totalBooks:       books.count ?? 0,
    totalMembers:     members.count ?? 0,
    pendingMembers:   pendingMembers.count ?? 0,
    activeMembers:    activeMembers.count ?? 0,
    totalEvents:      events.count ?? 0,
    upcomingEvents:   upcomingEvents.count ?? 0,
    archivedEvents:   archivedEvents.count ?? 0,
    totalPosts:       posts.count ?? 0,
    publishedPosts:   publishedPosts.count ?? 0,
    draftPosts:       draftPosts.count ?? 0,
    totalGalleryPhotos: galleryPhotos.count ?? 0,
    activeNotices:    activeNotices.count ?? 0,
    activeSlides:     activeSlides.count ?? 0,
  };
}

export async function getRecentActivity(limit = 20) {
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
