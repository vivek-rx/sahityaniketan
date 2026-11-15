"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";

export interface CommitteePhoto {
  member_slug: string;
  image_url: string;
  updated_at: string;
}

/** Public read — used by the About page to merge portraits into the roster. */
export async function getCommitteePhotos(): Promise<Record<string, string>> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase.from("committee_photos").select("*");
  if (error) return {};
  const map: Record<string, string> = {};
  for (const row of data as CommitteePhoto[]) map[row.member_slug] = row.image_url;
  return map;
}

/** Admin write — called after the file is uploaded to storage. */
export async function setCommitteePhoto(memberSlug: string, imageUrl: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { error } = await supabase
    .from("committee_photos")
    .upsert(
      { member_slug: memberSlug, image_url: imageUrl, updated_at: new Date().toISOString() },
      { onConflict: "member_slug" }
    );
  if (error) throw new Error(error.message);
  await logAction("update", "committee_photo", memberSlug, memberSlug);
}

/** Admin remove — clears the record (the storage file stays; harmless). */
export async function deleteCommitteePhoto(memberSlug: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { error } = await supabase
    .from("committee_photos")
    .delete()
    .eq("member_slug", memberSlug);
  if (error) throw new Error(error.message);
  await logAction("delete", "committee_photo", memberSlug, memberSlug);
}
