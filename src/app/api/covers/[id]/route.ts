import { NextResponse } from "next/server";
import { getPublicBookById } from "@/lib/books/public";
import { generateCoverSvg } from "@/lib/covers";
import { sanitizeCoverUrl } from "@/lib/book-mapper";

export const revalidate = 3600;

/**
 * Direct cover API — no storage, no upload step.
 *
 * GET /api/covers/{bookId}.svg
 *   - 302 to the stored real cover when `books.cover_url` is set
 *   - otherwise a generated 600×900 typographic cover (≈2 KB, cached at the edge)
 *
 * The `.svg` suffix matters: next/image treats SVG sources as unoptimized
 * automatically, so catalogue cards can keep using <Image> without enabling
 * dangerouslyAllowSVG for the whole site.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId).replace(/\.svg$/i, "");

  if (!id) {
    return new NextResponse("Missing book id", { status: 400 });
  }

  const book = await getPublicBookById(id);
  if (!book) {
    return new NextResponse("Book not found", { status: 404 });
  }

  const storedCover = sanitizeCoverUrl(book.cover_url);
  if (storedCover) {
    return NextResponse.redirect(storedCover, {
      status: 302,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  const svg = generateCoverSvg({
    id: book.id,
    title: book.title_marathi || book.title,
    author: book.author,
    year: book.publication_year,
    category: book.category,
    language: book.language,
  });

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Length": String(new TextEncoder().encode(svg).byteLength),
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
    },
  });
}