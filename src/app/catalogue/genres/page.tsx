import { createPublicClient } from "@/lib/supabase/server";
import { GenresClient, type GenreGroup } from "./genres-client";

export const revalidate = 300; // refresh genre counts every 5 minutes

/**
 * /catalogue/genres — Goodreads-style "browse by genre" index.
 * Server-fetched from the books table (cookie-free client so this stays
 * static + ISR). Categories present in the DB drive the cards; icons,
 * English labels and gradient styling come from the curated map below.
 */
export default async function GenresPage() {
  let groups: GenreGroup[] = [];
  try {
    const supabase = createPublicClient() as any;
    const { data, error } = await supabase
      .from("books")
      .select("category, cover_url, title_marathi, title")
      .eq("is_archived", false);
    if (!error && data) {
      const byCat = new Map<string, { count: number; covers: string[] }>();
      for (const row of data as any[]) {
        const cat = (row.category || "").trim();
        if (!cat) continue;
        const entry = byCat.get(cat) || { count: 0, covers: [] };
        entry.count += 1;
        if (row.cover_url && entry.covers.length < 3 && !entry.covers.includes(row.cover_url)) {
          entry.covers.push(row.cover_url);
        }
        byCat.set(cat, entry);
      }
      groups = [...byCat.entries()]
        .map(([category, { count, covers }]) => ({ category, count, covers }))
        .sort((a, b) => b.count - a.count);
    }
  } catch {
    groups = [];
  }

  return <GenresClient groups={groups} />;
}
