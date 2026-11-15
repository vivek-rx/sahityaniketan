import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { titleEnFor, authorEnFor } from "@/lib/book-titles";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Route runs at request time (dynamic) — vote counts change constantly.
export const dynamic = "force-dynamic";

/** Cookie-free anon client: public reads + vote inserts (RLS-protected). */
function publicAnonClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

export type AwardsPayload = {
  year: number;
  votingOpen: boolean;
  categories: Array<{
    category: string;
    nominees: Array<{
      id: string;
      bookId: string;
      title: string;
      titleEn?: string;
      author: string;
      authorEn?: string;
      coverUrl: string | null;
      votes: number;
    }>;
  }>;
};

const VoteSchema = z.object({
  nomineeId: z.string().uuid(),
  voterKey: z.string().min(8).max(64),
});

export async function GET() {
  // The awards tables are typed, but the embedded books join isn't declared in
  // the generated Relationships map — cast like the other action modules do.
  const supabase = publicAnonClient() as any;
  const year = new Date().getFullYear();

  try {
    const [{ data: settings }, { data: nominees, error: nomErr }] =
      await Promise.all([
        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "choice_awards_voting_open")
          .maybeSingle(),
        supabase
          .from("choice_nominees")
          .select(
            "id, year, category, display_order, book_id, books (id, title, title_marathi, author, cover_url)"
          )
          .eq("year", year)
          .order("category")
          .order("display_order"),
      ]);

    if (nomErr) throw new Error(nomErr.message);
    const votingOpen = settings?.value === true || settings?.value === "true";

    // Count votes per nominee in one query
    const { data: votes, error: votesErr } = await supabase
      .from("choice_votes")
      .select("nominee_id, category")
      .eq("year", year);
    if (votesErr) throw new Error(votesErr.message);

    const counts = new Map<string, number>();
    const categoryTotals = new Map<string, number>();
    for (const v of votes ?? []) {
      counts.set(v.nominee_id, (counts.get(v.nominee_id) ?? 0) + 1);
      categoryTotals.set(v.category, (categoryTotals.get(v.category) ?? 0) + 1);
    }

    // Group nominees by category, preserving display_order
    const byCategory = new Map<string, AwardsPayload["categories"][number]>();
    for (const n of nominees ?? []) {
      const book = Array.isArray(n.books) ? n.books[0] : n.books;
      if (!book) continue;
      if (!byCategory.has(n.category)) {
        byCategory.set(n.category, { category: n.category, nominees: [] });
      }
      byCategory.get(n.category)!.nominees.push({
        id: n.id,
        bookId: book.id,
        title: book.title_marathi || book.title,
        titleEn: titleEnFor(book.title_marathi || book.title),
        author: book.author,
        authorEn: authorEnFor(book.author),
        coverUrl: book.cover_url ?? null,
        votes: counts.get(n.id) ?? 0,
      });
    }

    return NextResponse.json({
      success: true,
      year,
      votingOpen,
      categories: [...byCategory.values()],
      totalVotes: (votes ?? []).length,
    });
  } catch (error) {
    console.error("Awards GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load awards" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = publicAnonClient() as any;

  try {
    const body = await request.json();
    const parsed = VoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid vote payload" },
        { status: 400 }
      );
    }
    const { nomineeId, voterKey } = parsed.data;

    // Voting must be open
    const { data: settings } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "choice_awards_voting_open")
      .maybeSingle();
    const votingOpen = settings?.value === true || settings?.value === "true";
    if (!votingOpen) {
      return NextResponse.json(
        { success: false, error: "VOTING_CLOSED" },
        { status: 403 }
      );
    }

    // Nominee must exist; derive year/category from it (never trust client)
    const { data: nominee } = await supabase
      .from("choice_nominees")
      .select("id, year, category")
      .eq("id", nomineeId)
      .maybeSingle();
    if (!nominee) {
      return NextResponse.json(
        { success: false, error: "NOMINEE_NOT_FOUND" },
        { status: 404 }
      );
    }

    const { error } = await supabase.from("choice_votes").insert({
      nominee_id: nomineeId,
      year: nominee.year,
      category: nominee.category,
      voter_key: voterKey,
    });

    if (error) {
      // Unique index (year, category, voter_key) → already voted here
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, error: "ALREADY_VOTED" },
          { status: 409 }
        );
      }
      throw new Error(error.message);
    }

    // Return the fresh tally for this category so the UI updates instantly
    const { data: tally } = await supabase
      .from("choice_votes")
      .select("nominee_id")
      .eq("year", nominee.year)
      .eq("category", nominee.category);

    const counts: Record<string, number> = {};
    for (const v of tally ?? []) {
      counts[v.nominee_id] = (counts[v.nominee_id] ?? 0) + 1;
    }

    return NextResponse.json({
      success: true,
      category: nominee.category,
      counts,
    });
  } catch (error) {
    console.error("Awards POST error:", error);
    return NextResponse.json(
      { success: false, error: "VOTE_FAILED" },
      { status: 500 }
    );
  }
}
