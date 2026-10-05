"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import type { Post } from "@/types/database";

export async function getPosts(status?: string) {
  const supabase = (await createClient()) as any;
  let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPublishedPosts(limit = 20) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPostBySlug(slug: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) throw new Error(error.message);
  const postData = data as any;
  // Increment view count
  await (createAdminClient() as any).from("posts").update({ views: (postData?.views ?? 0) + 1 }).eq("id", postData.id);
  return postData as Post;
}

export async function createPost(input: Omit<Post, "id" | "created_at" | "updated_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  // Auto-generate slug from title if not provided
  if (!input.slug) {
    input.slug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80) + "-" + Date.now();
  }
  if (input.status === "published" && !input.published_at) {
    input.published_at = new Date().toISOString();
  }
  const { data, error } = await supabase.from("posts").insert(input).select().single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("create", "post", row.id, row.title);
  return row as Post;
}

export async function updatePost(id: string, input: Partial<Post>) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  if (input.status === "published" && !input.published_at) {
    input.published_at = new Date().toISOString();
  }
  const { data, error } = await supabase.from("posts").update(input).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("update", "post", id, row.title);
  return row as Post;
}

export async function publishPost(id: string) {
  return updatePost(id, { status: "published", published_at: new Date().toISOString() });
}

export async function archivePost(id: string) {
  return updatePost(id, { status: "archived" });
}

export async function deletePost(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const post = await supabase.from("posts").select("title").eq("id", id).single();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  const postData = post.data as any;
  await logAction("delete", "post", id, postData?.title ?? id);
}

export async function togglePinPost(id: string, pinned: boolean) {
  return updatePost(id, { is_pinned: pinned });
}
