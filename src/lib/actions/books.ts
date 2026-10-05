"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";
import type { Book } from "@/types/database";

// ─── READ ─────────────────────────────────────────────────────

export async function getBooks({
  page = 1,
  pageSize = 20,
  search = "",
  category = "",
  language = "",
  availability = "",
  featured = false,
  archived = false,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  language?: string;
  availability?: string;
  featured?: boolean;
  archived?: boolean;
} = {}) {
  const supabase = (await createClient()) as any;
  let query = supabase
    .from("books")
    .select("*", { count: "exact" })
    .eq("is_archived", archived)
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (search) query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%,isbn.ilike.%${search}%`);
  if (category) query = query.eq("category", category);
  if (language) query = query.eq("language", language);
  if (availability) query = query.eq("availability", availability);
  if (featured) query = query.eq("is_featured", true);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { books: data ?? [], total: count ?? 0 };
}

export async function getAllBooks() {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("is_archived", false)
    .order("title");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getFeaturedBooks(limit = 8) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("is_featured", true)
    .eq("is_archived", false)
    .order("rating", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBookById(id: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("books")
    .select("*, book_ratings(*)")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// ─── CREATE ───────────────────────────────────────────────────

export async function createBook(input: Omit<Book, "id" | "created_at" | "updated_at">) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase
    .from("books")
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("create", "book", row.id, row.title);
  return row as Book;
}

// ─── UPDATE ───────────────────────────────────────────────────

export async function updateBook(id: string, input: Partial<Book>) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase
    .from("books")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("update", "book", id, row.title);
  return row as Book;
}

export async function toggleBookFeatured(id: string, featured: boolean) {
  return updateBook(id, { is_featured: featured });
}

export async function updateBookAvailability(id: string, availability: Book["availability"]) {
  return updateBook(id, { availability });
}

// ─── DELETE / ARCHIVE ─────────────────────────────────────────

export async function archiveBook(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const { data, error } = await supabase
    .from("books")
    .update({ is_archived: true })
    .eq("id", id)
    .select("title")
    .single();
  if (error) throw new Error(error.message);
  const row = data as any;
  await logAction("archive", "book", id, row.title);
}

export async function restoreBook(id: string) {
  return updateBook(id, { is_archived: false });
}

export async function deleteBook(id: string) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const book = await supabase.from("books").select("title").eq("id", id).single();
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) throw new Error(error.message);
  const bookData = book.data as any;
  await logAction("delete", "book", id, bookData?.title ?? id);
}

// ─── BULK IMPORT ──────────────────────────────────────────────

export async function bulkImportBooks(rows: Omit<Book, "id" | "created_at" | "updated_at">[]) {
  await requireAdmin();
  const supabase = createAdminClient() as any;
  const BATCH_SIZE = 500;
  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("books")
      .upsert(batch, { onConflict: "isbn", ignoreDuplicates: false });
    if (error) throw new Error(`Batch ${i / BATCH_SIZE + 1} failed: ${error.message}`);
    inserted += batch.length;
  }

  await logAction("bulk_import", "book", undefined, `${inserted} books imported`);
  return { inserted };
}

// ─── FETCH COVER FROM OPEN LIBRARY ───────────────────────────

export async function fetchBookCoverByISBN(isbn: string): Promise<string | null> {
  try {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const json = await res.json();
    const book = json[`ISBN:${isbn}`];
    return book?.cover?.large ?? book?.cover?.medium ?? null;
  } catch {
    return null;
  }
}

// ─── BOOK REVIEWS & RATINGS ───────────────────────────────────

export async function getBookReviews(bookId: string) {
  try {
    const supabase = (await createClient()) as any;
    const { data, error } = await supabase
      .from("book_reviews")
      .select("*")
      .eq("book_id", bookId)
      .order("created_at", { ascending: false });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function createBookReview(review: {
  book_id: string;
  reviewer_name: string;
  rating: number;
  title: string;
  comment: string;
}) {
  try {
    const supabase = (await createClient()) as any;
    const { data, error } = await supabase
      .from("book_reviews")
      .insert([
        {
          book_id: review.book_id,
          reviewer_name: review.reviewer_name,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Failed to create review in Supabase:", error.message);
    }
    return data;
  } catch (err) {
    console.error("Failed to create review:", err);
    return null;
  }
}
