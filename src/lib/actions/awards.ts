"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import { setSetting } from "./settings";
import type { Book } from "@/types/database";

export interface AwardNomineeRow {
  id: string;
  year: number;
  category: string;
  display_order: number;
  book: {
    id: string;
    title: string;
    title_marathi: string | null;
    author: string;
    cover_url: string | null;
    category: string | null;
  } | null;
  votes: number;
}

const YEAR = () => new Date().getFullYear();

/** Admin listing: every nominee for the current year with vote counts. */
export async function getAwardsAdmin(): Promise<AwardNomineeRow[]> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const year = YEAR();

  const [{ data: nominees, error }, { data: votes, error: vErr }] =
    await Promise.all([
      supabase
        .from("choice_nominees")
        .select(
          "id, year, category, display_order, book_id, books (id, title, title_marathi, author, cover_url, category)"
        )
        .eq("year", year)
        .order("category")
        .order("display_order"),
      supabase.from("choice_votes").select("nominee_id, year"),
    ]);
  if (error) throw new Error(error.message);
  if (vErr) throw new Error(vErr.message);

  const counts = new Map<string, number>();
  for (const v of votes ?? []) {
    counts.set(v.nominee_id, (counts.get(v.nominee_id) ?? 0) + 1);
  }

  return (nominees ?? []).map((n: any) => ({
    id: n.id,
    year: n.year,
    category: n.category,
    display_order: n.display_order,
    book: Array.isArray(n.books) ? n.books[0] : n.books,
    votes: counts.get(n.id) ?? 0,
  }));
}

/** Books available for nomination (unarchived, id/title/author/cover/category). */
export async function getNominationBooks(): Promise<Book[]> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase
    .from("books")
    .select("id, title, title_marathi, author, cover_url, category, is_archived")
    .eq("is_archived", false)
    .order("category")
    .order("title");
  if (error) throw new Error(error.message);
  return (data ?? []) as Book[];
}

/** Distinct categories present in the books table. */
export async function getBookCategories(): Promise<string[]> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase
    .from("books")
    .select("category")
    .eq("is_archived", false);
  if (error) throw new Error(error.message);
  const cats = [
    ...new Set<string>(
      (data ?? [])
        .map((r: any) => (r.category || "").trim())
        .filter(Boolean)
    ),
  ];
  return cats.sort();
}

/** Nominate a book in a category for the current year. */
export async function addNominee(bookId: string, category: string): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const cat = category.trim();
  if (!bookId || !cat) throw new Error("Book and category are required");

  const { count } = await supabase
    .from("choice_nominees")
    .select("id", { count: "exact", head: true })
    .eq("year", YEAR())
    .eq("category", cat);
  const displayOrder = count ?? 0;

  const { error } = await supabase.from("choice_nominees").insert({
    year: YEAR(),
    category: cat,
    book_id: bookId,
    display_order: displayOrder,
  });
  if (error) {
    if (error.code === "23505") {
      throw new Error("This book is already nominated in this category.");
    }
    throw new Error(error.message);
  }
  await logAction("award_nominee_add", "choice_nominees", bookId, cat, { category: cat, year: YEAR() });
}

/** Remove a nominee (their votes cascade away with them). */
export async function removeNominee(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { error } = await supabase
    .from("choice_nominees")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  await logAction("award_nominee_remove", "choice_nominees", id);
}

/** Open or close public voting (stored in site_settings). */
export async function setVotingOpen(open: boolean): Promise<void> {
  await setSetting("choice_awards_voting_open", open);
  await logAction("award_voting_toggle", "site_settings", "choice_awards_voting_open", undefined, { open });
}
