import type { ReactNode } from "react";
import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getPublicBookById } from "@/lib/books/public";
import { sanitizeCoverUrl } from "@/lib/book-mapper";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

// Shared between generateMetadata and the layout for a single request.
const getBook = cache(getPublicBookById);

function descriptionFor(book: {
  title: string;
  author: string;
  description?: string | null;
  category?: string | null;
  publication_year?: number | null;
}): string {
  const stored = book.description?.trim();
  if (stored) return stored.slice(0, 180);

  const year = book.publication_year ? ` (${book.publication_year})` : "";
  return `${book.title} — ${book.author}${year}. ${book.category || "ग्रंथ संग्रह"} — साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई येथील ग्रंथसूची नोंद.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBook(slug);

  if (!book) {
    return buildPageMetadata({
      title: "ग्रंथ तपशील",
      description:
        "साहित्य निकेतन ग्रंथालयाच्या ग्रंथसूचीमधील ग्रंथाचा तपशील — लेखक, प्रकाशक, क्रमांक, दालन आणि उपलब्धता.",
      path: `/catalogue/${slug}`,
      image: DEFAULT_OG_IMAGE,
      imageAlt: "साहित्य निकेतन ग्रंथालयातील मराठी ग्रंथ",
    });
  }

  return buildPageMetadata({
    title: book.title_marathi || book.title,
    description: descriptionFor(book),
    path: `/catalogue/${slug}`,
    image: sanitizeCoverUrl(book.cover_url) || DEFAULT_OG_IMAGE,
    imageAlt: `${book.title_marathi || book.title} — ${book.author}`,
  });
}

export default async function BookDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await getBook(slug);

  // Real HTTP 404 for unknown catalogue IDs instead of a 200 shell that only
  // fails after client-side hydration.
  if (!book) notFound();

  return children;
}