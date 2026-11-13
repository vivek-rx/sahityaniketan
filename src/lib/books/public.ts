import "server-only";
import type { Book } from "@/types/database";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const BOOK_FIELDS = [
  "id",
  "title",
  "title_marathi",
  "author",
  "isbn",
  "language",
  "category",
  "shelf_number",
  "publication_year",
  "publisher",
  "description",
  "cover_url",
  "availability",
  "is_featured",
  "is_archived",
  "rating",
  "total_ratings",
  "borrow_count",
  "created_at",
  "updated_at",
].join(",");

function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function headers(): HeadersInit {
  return {
    apikey: SUPABASE_KEY!,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
}

/**
 * Public, cookie-free read used by the cover endpoint, book detail metadata and
 * the single-book API. Books are publicly readable under RLS, so the anon key
 * is enough — no service-role secret is needed for rendering.
 */
export async function getPublicBookById(id: string): Promise<Book | null> {
  if (!isConfigured() || !id) return null;

  const url = `${SUPABASE_URL}/rest/v1/books?id=eq.${encodeURIComponent(id)}&select=${BOOK_FIELDS}&limit=1`;

  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    const rows = (await res.json()) as Book[];
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  } catch {
    return null;
  }
}

export async function getPublicBooks(options?: {
  limit?: number;
  featured?: boolean;
}): Promise<Book[]> {
  if (!isConfigured()) return [];

  const limit = Math.min(Math.max(options?.limit ?? 24, 1), 100);
  const featured = options?.featured ? "&is_featured=eq.true" : "";
  const url =
    `${SUPABASE_URL}/rest/v1/books?select=${BOOK_FIELDS}` +
    `&is_archived=eq.false${featured}&order=created_at.desc&limit=${limit}`;

  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as Book[];
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}