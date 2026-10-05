"use client";

import { useState, useEffect } from "react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import {
  BookOpen,
  User,
  Building,
  Bookmark,
  Calendar,
  ArrowLeft,
  Eye,
  Star,
  ExternalLink,
  ShieldCheck,
  Share2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getBookById, BookVolume } from "@/lib/book-api";
import { BookReviewsSection } from "@/components/catalogue/book-reviews-section";
import { Framer3DBook } from "@/components/ui/framer-3d-book";
import { BobbingDots } from "@/components/ui/bobbing-dots";

export default function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [book, setBook] = useState<BookVolume | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      const resolvedParams = await params;
      const data = await getBookById(resolvedParams.slug);
      setBook(data);
      setIsLoading(false);
    }
    loadBook();
  }, [params]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="section py-24 text-center font-marathi-body min-h-[50vh] flex flex-col items-center justify-center space-y-4">
          <BobbingDots size="lg" className="text-[#800020] dark:text-[#E5B869] mx-auto" />
          <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
            ग्रंथ तपशील लोड होत आहे...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Navbar />
        <main className="section py-20 text-center font-marathi-body">
          <h1 className="text-xl font-bold text-stone-800">Book Not Found</h1>
          <Link href="/catalogue" className="text-sm font-bold text-[#991B1B] hover:underline mt-4 inline-block">
            Return to Catalogue
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors">
        <PageHeader
          title={book.titleMarathi || book.title}
          titleHindi={book.authorMarathi || book.author}
          subtitle={`Call Number: ${book.callNumber} • Shelf: ${book.shelf}`}
          breadcrumbs={[
            { label: "ग्रंथसूची", href: "/catalogue" },
            { label: book.titleMarathi || book.title },
          ]}
        />

        <section className="section py-10">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] dark:text-[#E5B869] hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← ग्रंथसूचीत परत जा</span>
          </Link>

          <div className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-6 md:p-8 shadow-xs transition-colors">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Cover Image */}
              <div className="w-full md:w-72 shrink-0 space-y-4">
                <div className="flex justify-center w-full py-2">
                  <Framer3DBook
                    title={book.titleMarathi || book.title}
                    author={book.authorMarathi || book.author}
                    coverImage={book.coverImage}
                    isbn={book.isbn || book.callNumber}
                    width={220}
                    height={330}
                  />
                </div>

                {/* Goodreads Reviews */}
                <a
                  href={book.goodreadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#25181C] hover:bg-[#800020]/5 dark:hover:bg-[#800020]/20 text-[#800020] dark:text-[#E5B869] py-2.5 px-4 text-xs font-bold transition-all flex items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-serif italic font-bold text-sm">g</span>
                    <span>गुडरीड्स समीक्षणे</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>

              {/* Book Info */}
              <div className="flex-1 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#800020]/10 dark:bg-[#800020]/25 border border-[#800020]/20 dark:border-[#800020]/40 px-3 py-1 text-xs font-bold text-[#800020] dark:text-[#E5B869]">
                    {book.categoryMarathi || book.category}
                  </span>
                  <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-3 py-1 rounded-md text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{book.rating.toFixed(1)} / ५.०</span>
                    <span className="text-[11px] text-stone-500 dark:text-[#B8A699] font-normal">
                      ({book.ratingsCount.toLocaleString()} परीक्षणे)
                    </span>
                  </div>
                  {book.isRare && (
                    <span className="rounded-md bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] border border-[#800020]/20 dark:border-[#800020]/40 px-2.5 py-1 text-xs font-bold">
                      दुर्मीळ अभिजात संग्रह
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-[#FAF2E8] leading-tight font-marathi-heading">
                    {book.titleMarathi || book.title}
                  </h1>
                  {book.titleMarathi && book.title !== book.titleMarathi && (
                    <p className="text-sm font-medium text-stone-500 dark:text-[#D5C2B4] mt-0.5">{book.title}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-stone-700 dark:text-[#D5C2B4]">
                  <User className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                  <span className="font-bold text-stone-900 dark:text-[#FAF2E8]">{book.authorMarathi || book.author}</span>
                </div>

                <div className="border-t border-b border-[#E5DDD0] dark:border-[#332228] py-4 space-y-2">
                  <h2 className="text-xs font-bold text-stone-400 dark:text-[#B8A699] uppercase tracking-wider font-devanagari">
                    ग्रंथ परिचय व सारांश
                  </h2>
                  <p className="text-sm text-stone-700 dark:text-[#D5C2B4] leading-relaxed font-devanagari">
                    {book.descriptionMarathi || book.description}
                  </p>
                  {book.descriptionMarathi && (
                    <p className="text-xs text-stone-500 dark:text-[#A8988B] leading-relaxed pt-1">
                      {book.description}
                    </p>
                  )}
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-[#FAF8F5] dark:bg-[#25181C] p-4 rounded-xl border border-[#E5DDD0] dark:border-[#332228] font-devanagari">
                  <div>
                    <span className="text-stone-400 dark:text-[#B8A699] block font-medium">प्रकाशक</span>
                    <span className="font-semibold text-stone-800 dark:text-[#FAF2E8]">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 dark:text-[#B8A699] block font-medium">प्रकाशन वर्ष</span>
                    <span className="font-semibold text-stone-800 dark:text-[#FAF2E8]">{book.year}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 dark:text-[#B8A699] block font-medium">पृष्ठ संख्या</span>
                    <span className="font-semibold text-stone-800 dark:text-[#FAF2E8]">{book.pageCount || "उपलब्ध नाही"}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 dark:text-[#B8A699] block font-medium">वर्गीकरण क्रमांक</span>
                    <span className="font-mono font-bold text-[#800020] dark:text-[#E5B869]">{book.callNumber}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 dark:text-[#B8A699] block font-medium">कप्पा क्रमांक</span>
                    <span className="font-semibold text-stone-800 dark:text-[#FAF2E8]">{book.shelf}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 dark:text-[#B8A699] block font-medium">उपलब्धता</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">वाचनालयात उपलब्ध</span>
                  </div>
                </div>

                {/* Reader Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2 font-devanagari">
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 rounded-full bg-[#800020] hover:bg-[#66001A] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-[#E5B869]" />
                    <span>ग्रंथालयात संपर्क साधा</span>
                  </Link>

                  <a
                    href={book.goodreadsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] hover:bg-[#800020]/5 dark:hover:bg-[#800020]/20 px-5 py-2.5 text-xs font-bold text-stone-700 dark:text-[#FAF2E8] transition-colors"
                  >
                    <Eye className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                    <span>गुडरीड्स समीक्षणे पहा</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Reader Reviews & Star Ratings Section */}
            <div className="mt-12">
              <BookReviewsSection
                bookId={book.id}
                bookTitle={book.titleMarathi || book.title}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
