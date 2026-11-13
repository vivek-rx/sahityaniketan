import { NextRequest, NextResponse } from "next/server";
import { searchBooksOnline } from "@/lib/book-api";
import { mapDbBookToVolume } from "@/lib/book-mapper";
import { getBooks } from "@/lib/actions/books";
import type { Book } from "@/types/database";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "15", 10);

  try {
    const { books: dbBooks } = await getBooks({ search: query, pageSize: limit });
    const mappedDbBooks = (dbBooks || []).map((b: Book, idx: number) =>
      mapDbBookToVolume(b, idx)
    );

    if (mappedDbBooks.length > 0) {
      return NextResponse.json({
        success: true,
        count: mappedDbBooks.length,
        query,
        books: mappedDbBooks,
      });
    }

    const books = await searchBooksOnline(query || "मराठी", limit);
    return NextResponse.json({
      success: true,
      count: books.length,
      query,
      books,
    });
  } catch (error) {
    console.error("API error fetching books:", error);
    return NextResponse.json({
      success: true,
      count: 0,
      query,
      books: [],
    });
  }
}
