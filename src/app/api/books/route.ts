import { NextRequest, NextResponse } from "next/server";
import { searchBooksOnline } from "@/lib/book-api";
import { getBooks } from "@/lib/actions/books";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "15", 10);

  try {
    const { books: dbBooks } = await getBooks({ search: query, pageSize: limit });
    const mappedDbBooks = (dbBooks || []).map((b: any, idx: number) => ({
      id: b.id || `db-${idx}`,
      title: b.title,
      titleMarathi: b.title,
      author: b.author,
      authorMarathi: b.author,
      authors: [b.author],
      description: `${b.title} — लेखक: ${b.author} (${b.category || "ग्रंथालय संग्रह"})`,
      descriptionMarathi: `${b.title} — लेखक: ${b.author} (${b.category || "ग्रंथालय संग्रह"})`,
      coverImage: b.cover_url || "",
      language: (b.language || "mr").toLowerCase().includes("hi") ? "hi" : (b.language || "").toLowerCase().includes("sa") ? "sa" : (b.language || "").toLowerCase().includes("en") ? "en" : "mr",
      languageName: b.language || "मराठी",
      category: b.category || "General",
      categoryMarathi: b.category || "ग्रंथ संग्रह",
      year: b.publication_year || "—",
      publisher: b.category || "साहित्य निकेतन",
      isbn: b.isbn || undefined,
      callNumber: b.isbn || "891.463",
      shelf: b.shelf_number ? `कप्पा क्र. ${b.shelf_number}` : "मुख्य वाचन कक्ष",
      rating: 4.9,
      ratingsCount: 45,
      goodreadsUrl: `https://openlibrary.org/search?q=${encodeURIComponent(b.title)}`,
      isHeritage: b.is_featured,
    }));

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
