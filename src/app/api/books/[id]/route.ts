import { NextResponse } from "next/server";
import { getPublicBookById } from "@/lib/books/public";
import { mapDbBookToVolume } from "@/lib/book-mapper";

/**
 * Single book, database-backed.
 *
 * The catalogue detail page previously called `getBookById()` from
 * `lib/book-api`, which only understood Open Library work IDs. Every Supabase
 * UUID therefore resolved to null and the page showed "Book Not Found".
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing book id" },
      { status: 400 }
    );
  }

  const book = await getPublicBookById(id);

  if (!book) {
    return NextResponse.json(
      { success: false, error: "Book not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, book: mapDbBookToVolume(book) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}