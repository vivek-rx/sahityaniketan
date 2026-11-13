import type { Book } from "@/types/database";
import type { BookVolume } from "@/lib/book-api";

/**
 * True when a stored cover can be rendered directly. Only absolute https URLs
 * and same-origin paths are allowed; anything else falls back to the generated
 * SVG so a bad database value can never become an XSS vector.
 */
export function sanitizeCoverUrl(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  return null;
}

/** Stored real cover first, generated typographic cover otherwise. */
export function coverUrlForBook(
  book: Pick<Book, "id" | "cover_url">
): string {
  return sanitizeCoverUrl(book.cover_url) || `/api/covers/${book.id}.svg`;
}

function normalizeLanguage(language?: string | null): BookVolume["language"] {
  const value = (language || "").toLowerCase();
  if (value.includes("hi") || value.includes("हिन्दी") || value.includes("हिंदी")) {
    return "hi";
  }
  if (value.includes("sa") || value.includes("संस्कृत")) return "sa";
  if (value.includes("en")) return "en";
  if (value.includes("mr") || value.includes("मराठी")) return "mr";
  return "other";
}

function languageName(language?: string | null): string {
  switch (normalizeLanguage(language)) {
    case "hi":
      return "हिन्दी";
    case "sa":
      return "संस्कृत";
    case "en":
      return "English";
    case "mr":
      return "मराठी";
    default:
      return "मराठी";
  }
}

/**
 * Maps a database row to the shape the catalogue UI already understands.
 * Shared by /api/books, /api/books/[id] and the detail page so covers, ratings
 * and shelf labels cannot drift between views.
 */
export function mapDbBookToVolume(book: Book, index = 0): BookVolume {
  const title = book.title || "ग्रंथ";
  const author = book.author || "अज्ञात लेखक";
  const category = book.category || "ग्रंथ संग्रह";
  const rating = Number(book.rating);
  const ratingsCount = Number(book.total_ratings);

  return {
    id: book.id || `db-${index}`,
    title,
    titleMarathi: book.title_marathi || title,
    author,
    authorMarathi: author,
    authors: [author],
    description:
      book.description ||
      `${title} — लेखक: ${author} (${category})`,
    descriptionMarathi:
      book.description ||
      `${title} — लेखक: ${author} (${category})`,
    coverImage: coverUrlForBook(book),
    language: normalizeLanguage(book.language),
    languageName: languageName(book.language),
    category,
    categoryMarathi: category,
    year: book.publication_year ?? "—",
    publisher: book.publisher || "साहित्य निकेतन ग्रंथालय",
    isbn: book.isbn || undefined,
    callNumber: book.shelf_number || book.isbn || "891.463",
    shelf: book.shelf_number
      ? `कप्पा क्र. ${book.shelf_number}`
      : "मुख्य वाचन कक्ष",
    rating: Number.isFinite(rating) ? rating : 0,
    ratingsCount: Number.isFinite(ratingsCount) ? ratingsCount : 0,
    goodreadsUrl: `https://openlibrary.org/search?q=${encodeURIComponent(title)}`,
    isHeritage: Boolean(book.is_featured),
    isRare: Boolean(book.is_featured),
  };
}