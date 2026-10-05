"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import {
  Search,
  Filter,
  BookOpen,
  Eye,
  Bookmark,
  Star,
  ExternalLink,
  Sparkles,
  BookPlus,
  LayoutList,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { BookVolume } from "@/lib/book-api";
import { BookRequestModal } from "@/components/catalogue/book-request-modal";
import { Framer3DBook } from "@/components/ui/framer-3d-book";
import { BobbingDots } from "@/components/ui/bobbing-dots";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";
  const { language } = useLanguage();

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [books, setBooks] = useState<BookVolume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 12;

  // Book Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      try {
        const searchTerm = debouncedQuery.trim() || (selectedCategory !== "all" ? selectedCategory : "");
        const res = await fetch(`/api/books?q=${encodeURIComponent(searchTerm)}&limit=24`);
        if (res.ok) {
          const data = await res.json();
          if (data.books && data.books.length > 0) {
            setBooks(data.books);
          } else {
            setBooks([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, [debouncedQuery, selectedCategory]);

  const filteredItems = useMemo(() => {
    return books.filter((item) => {
      const matchesLang =
        selectedLanguage === "all" || item.language === selectedLanguage;

      const matchesCat =
        selectedCategory === "all" ||
        item.category === selectedCategory ||
        item.category.includes(selectedCategory);

      return matchesLang && matchesCat;
    });
  }, [books, selectedLanguage, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, selectedCategory, selectedLanguage]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-5 shadow-2xs space-y-6 h-fit transition-colors">
          <div className="flex items-center justify-between border-b border-[#E5DDD0] dark:border-[#332228] pb-3">
            <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-[#FAF2E8] text-sm font-devanagari">
              <Filter className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
              <span>{language === "mr" ? "ग्रंथ वर्गीकरण व गाळणी" : language === "hi" ? "ग्रन्थ वर्गीकरण व फिल्टर" : "Catalogue Filters"}</span>
            </div>
            {(selectedLanguage !== "all" || selectedCategory !== "all" || query) && (
              <button
                onClick={() => {
                  setSelectedLanguage("all");
                  setSelectedCategory("all");
                  setQuery("");
                }}
                className="text-[11px] text-[#800020] dark:text-[#E5B869] font-bold hover:underline cursor-pointer"
              >
                {language === "mr" ? "रीसेट" : language === "hi" ? "रीसेट" : "Reset"}
              </button>
            )}
          </div>

          {/* Library Membership & Circulation Guide */}
          <div className="bg-[#F3ECE3] dark:bg-[#180E11] p-3.5 rounded-xl border border-[#E5DDD0] dark:border-[#332228] space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#800020] dark:text-[#E5B869]">
              <BookOpen className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
              <span>ग्रंथ देवघेव व वाचन कक्ष नियम</span>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed font-devanagari">
              नोंदणीकृत सभासदांना १४ दिवसांच्या मुदतीसाठी दोन पुस्तके घरी नेण्यास मिळतील. संदर्भ ग्रंथ, नियतकालिके व दुर्मीळ हस्तलिखिते केवळ वाचन कक्षात उपलब्ध राहतील.
            </p>
          </div>

          {/* Language Filter */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-[#FAF2E8] uppercase tracking-wider block mb-2 font-marathi-heading">
              {language === "mr" ? "पुस्तकाची भाषा" : language === "hi" ? "पुस्तक की भाषा" : "Book Language"}
            </label>
            <div className="space-y-1 text-sm font-marathi-body">
              {[
                { id: "all", label: language === "mr" ? "सर्व भाषा" : language === "hi" ? "सभी भाषाएं" : "All Languages" },
                { id: "mr", label: language === "en" ? "Marathi" : "मराठी" },
                { id: "hi", label: language === "en" ? "Hindi" : "हिन्दी" },
                { id: "sa", label: language === "en" ? "Sanskrit" : "संस्कृत" },
                { id: "en", label: language === "mr" ? "इंग्रजी" : language === "hi" ? "अंग्रेजी" : "English" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors font-semibold cursor-pointer flex items-center justify-between text-sm",
                    selectedLanguage === lang.id
                      ? "bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] font-bold border-l-2 border-[#800020] dark:border-[#E5B869]"
                      : "hover:bg-[#F3ECE3] dark:hover:bg-[#180E11] text-stone-700 dark:text-stone-300"
                  )}
                >
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-[#FAF2E8] uppercase tracking-wider block mb-2 font-marathi-heading">
              {language === "mr" ? "विषय दालन" : language === "hi" ? "विषय दीर्घा" : "Collection Category"}
            </label>
            <div className="space-y-1 text-sm font-marathi-body">
              {[
                { id: "all", label: language === "mr" ? "सर्व दालने" : language === "hi" ? "सभी संग्रह" : "All Collections" },
                { id: "बालसाहित्य", label: language === "mr" ? "बालमित्र व किशोर साहित्य" : language === "hi" ? "बाल साहित्य" : "Children & Youth" },
                { id: "संतसाहित्य", label: language === "mr" ? "संतसाहित्य व मोडी" : language === "hi" ? "संत साहित्य" : "Saint Literature & Modi" },
                { id: "ऐतिहासिक", label: language === "mr" ? "ऐतिहासिक कादंबरी" : language === "hi" ? "ऐतिहासिक उपन्यास" : "Historical Novels" },
                { id: "कादंबरी", label: language === "mr" ? "अभिजात कादंबरी" : language === "hi" ? "क्लासिक उपन्यास" : "Marathi Classics" },
                { id: "स्पर्धा परीक्षा", label: language === "mr" ? "स्पर्धा परीक्षा अभ्यासिका" : language === "hi" ? "प्रतियोगी परीक्षा" : "Competitive Exam Books" },
                { id: "नाटक", label: language === "mr" ? "नाटक व काव्य" : language === "hi" ? "नाटक व काव्य" : "Theatre & Poetry" },
                { id: "इतिहास", label: language === "mr" ? "इतिहास व मुक्ती संग्राम" : language === "hi" ? "इतिहास व शोध" : "History & Research" },
                { id: "विनोदी", label: language === "mr" ? "विनोदी साहित्य" : language === "hi" ? "हास्य व व्यंग्य" : "Humour & Satire" },
                { id: "आत्मचरित्र", label: language === "mr" ? "आत्मचरित्र व चरित्र" : language === "hi" ? "जीवनी व आत्मकथा" : "Biographies" },
                { id: "हिन्दी", label: language === "mr" ? "हिन्दी साहित्य" : language === "hi" ? "हिन्दी साहित्य" : "Hindi Classics" },
                { id: "संस्कृत", label: language === "mr" ? "संस्कृत काव्य व तत्त्वज्ञान" : language === "hi" ? "संस्कृत ग्रन्थ" : "Sanskrit Classics" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg transition-colors font-semibold cursor-pointer text-sm",
                    selectedCategory === cat.id
                      ? "bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] font-bold border-l-2 border-[#800020] dark:border-[#E5B869]"
                      : "hover:bg-[#F3ECE3] dark:hover:bg-[#180E11] text-stone-700 dark:text-stone-300"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* Main Catalogue Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Input Bar */}
          <div className="bg-white dark:bg-[#1E1418] p-4 rounded-2xl border border-[#E5DDD0] dark:border-[#332228] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  language === "mr"
                    ? "पुस्तकाचे नाव, लेखक किंवा विषय शोधा..."
                    : language === "hi"
                      ? "पुस्तक, लेखक या विषय से खोजें..."
                      : "Search books by title, author, or subject..."
                }
                className="w-full rounded-full border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#180E11] py-2.5 pl-4 pr-10 text-xs sm:text-sm text-gray-900 dark:text-[#FAF2E8] placeholder:text-stone-400 dark:placeholder-stone-500 focus:border-[#800020] dark:focus:border-[#E5B869] focus:bg-white dark:focus:bg-[#1E1418] focus:outline-none focus:ring-1 focus:ring-[#800020]"
              />
              {isLoading ? (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pr-0.5">
                  <BobbingDots size="sm" className="text-[#800020] dark:text-[#E5B869]" duration={0.8} />
                </div>
              ) : (
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 dark:text-stone-500" />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 font-devanagari">
              <div className="flex items-center gap-3">
                <span>
                  {language === "mr" ? "एकूण संग्रह:" : "Total Stacks:"}{" "}
                  <span className="font-extrabold text-[#800020] dark:text-[#E5B869] text-sm">३९,९५३</span>{" "}
                  <span className="text-stone-300 dark:text-[#332228]">|</span>{" "}
                  {language === "mr" ? "निवडक सूची:" : "Showing:"}{" "}
                  <span className="font-bold text-[#800020] dark:text-[#E5B869] text-sm">{filteredItems.length}</span>{" "}
                  {language === "mr" ? "ग्रंथ" : "books"}
                </span>

                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-[#800020] hover:bg-[#66001A] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer font-marathi-body"
                >
                  <BookPlus className="h-3.5 w-3.5" />
                  <span>+ ग्रंथ मागणी</span>
                </button>
              </div>

              {/* View Format Switcher (Default: List) */}
              <div className="flex items-center gap-1 bg-[#F3ECE3] dark:bg-[#180E11] p-1 rounded-xl border border-[#E5DDD0] dark:border-[#332228]">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                    viewMode === "list"
                      ? "bg-white dark:bg-[#1E1418] text-[#800020] dark:text-[#E5B869] shadow-2xs font-extrabold border border-[#E5DDD0] dark:border-[#332228]"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-[#FAF2E8]"
                  )}
                  title={language === "en" ? "List View" : "सूची स्वरूप"}
                >
                  <LayoutList className="h-3.5 w-3.5" />
                  <span>{language === "en" ? "List" : language === "hi" ? "सूची" : "सूची"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                    viewMode === "grid"
                      ? "bg-white dark:bg-[#1E1418] text-[#800020] dark:text-[#E5B869] shadow-2xs font-extrabold border border-[#E5DDD0] dark:border-[#332228]"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-[#FAF2E8]"
                  )}
                  title={language === "en" ? "Grid View" : "दालन स्वरूप"}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>{language === "en" ? "Grid" : language === "hi" ? "ग्रिड" : "दालन"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Books Results (Default: List Format) */}
          {filteredItems.length > 0 ? (
            <>
              {viewMode === "list" ? (
              /* ========================================================
                 LIST FORMAT (DEFAULT) — Authentic Library Catalogue Cards
                 ======================================================== */
              <div className="space-y-4">
                {paginatedItems.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xs hover:shadow-md hover:border-[#800020] dark:hover:border-[#E5B869] transition-all group"
                  >
                    {/* Left: Cover and Core Meta */}
                    <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                      {/* Book Miniature Cover */}
                      <Link
                        href={`/catalogue/${book.id}`}
                        className="w-20 sm:w-24 shrink-0 aspect-[2/3] rounded-xl overflow-hidden border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#180E11] relative shadow-xs flex items-center justify-center group-hover:shadow-sm"
                      >
                        {book.coverImage ? (
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="96px"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-2 text-center h-full w-full bg-gradient-to-br from-[#800020] to-[#550015] text-white">
                            <BookOpen className="h-6 w-6 text-[#E5B869] mb-1" />
                            <span className="text-[9px] font-bold line-clamp-2 leading-tight">
                              {book.title}
                            </span>
                          </div>
                        )}
                      </Link>

                      {/* Bibliographic Info */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px]">
                          <span className="px-2 py-0.5 rounded-md bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] font-bold border border-[#800020]/20 dark:border-[#800020]/40">
                            {book.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-[#332228] text-stone-700 dark:text-stone-300 font-medium">
                            {book.language}
                          </span>
                          {book.rating > 0 && (
                            <div className="flex items-center gap-1 text-amber-600 dark:text-[#E5B869] font-bold bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200/60 dark:border-amber-800/40">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              <span>{book.rating.toFixed(1)}</span>
                            </div>
                          )}
                          <span className="text-stone-400 dark:text-stone-500 text-[10px] font-mono">
                            {book.year}
                          </span>
                        </div>

                        <h3 className="font-devanagari text-base sm:text-lg font-bold text-gray-900 dark:text-[#FAF2E8] leading-snug group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors">
                          <Link href={`/catalogue/${book.id}`}>
                            {language === "en" ? book.title : book.titleMarathi || book.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm font-semibold text-[#800020] dark:text-[#E5B869] font-devanagari">
                          {language === "en" ? book.author : book.authorMarathi || book.author}
                        </p>

                        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed font-devanagari">
                          {language === "en" ? book.description : book.descriptionMarathi || book.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                          <span>
                            <strong className="text-stone-700 dark:text-[#FAF2E8] font-devanagari">वर्गीकरण:</strong> {book.isbn || book.callNumber}
                          </span>
                          <span>•</span>
                          <span>
                            <strong className="text-stone-700 dark:text-[#FAF2E8] font-devanagari">कप्पा:</strong> {book.shelf || "मुख्य वाचन कक्ष"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="w-full md:w-44 shrink-0 flex flex-col sm:flex-row md:flex-col gap-2 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-[#E5DDD0] dark:border-[#332228] md:pl-5 justify-center">
                      <Link
                        href={`/catalogue/${book.id}`}
                        className="w-full rounded-lg bg-[#800020] hover:bg-[#66001A] text-white py-2 px-3 text-center text-xs font-bold transition-all flex items-center justify-center gap-2 font-devanagari shadow-xs"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>{language === "mr" ? "तपशील पहा" : language === "hi" ? "विवरण देखें" : "View Details"}</span>
                      </Link>

                      <a
                        href={book.goodreadsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full rounded-lg border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#180E11] hover:bg-[#F3ECE3] dark:hover:bg-[#25151C] text-stone-800 dark:text-[#FAF2E8] py-2 px-3 text-center text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        title="View on Goodreads"
                      >
                        <span className="font-serif italic font-bold">g</span>
                        <span>Goodreads</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ========================================================
                 GRID FORMAT (ALTERNATIVE)
                 ======================================================== */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedItems.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#800020] dark:hover:border-[#E5B869] transition-all group"
                  >
                    <div>
                      {/* 3D Interactive Framer Book Cover Area */}
                      <div className="flex justify-center mb-3 py-1">
                        <Framer3DBook
                          title={language === "en" ? book.title : book.titleMarathi || book.title}
                          author={language === "en" ? book.author : book.authorMarathi || book.author}
                          coverImage={book.coverImage}
                          isbn={book.isbn || book.callNumber}
                          width={170}
                          height={255}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1 text-amber-600 dark:text-[#E5B869] font-bold bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200/60 dark:border-amber-800/40">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span>{book.rating.toFixed(1)}</span>
                            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
                              ({book.ratingsCount.toLocaleString()})
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono">{book.year}</span>
                        </div>

                        <h3 className="font-devanagari text-base font-bold text-gray-900 dark:text-[#FAF2E8] leading-snug group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors line-clamp-1">
                          {language === "en" ? book.title : book.titleMarathi || book.title}
                        </h3>

                        <p className="text-xs font-semibold text-[#800020] dark:text-[#E5B869] font-devanagari line-clamp-1">
                          {language === "en" ? book.author : book.authorMarathi || book.author}
                        </p>

                        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed font-devanagari">
                          {language === "en" ? book.description : book.descriptionMarathi || book.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E5DDD0] dark:border-[#332228] space-y-2">
                      <Link
                        href={`/catalogue/${book.id}`}
                        className="w-full rounded-lg bg-[#800020] hover:bg-[#66001A] text-white py-2 text-center text-xs font-bold transition-all flex items-center justify-center gap-2 font-devanagari shadow-xs"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>{language === "mr" ? "तपशील पहा" : language === "hi" ? "विवरण देखें" : "View Details"}</span>
                      </Link>

                      <a
                        href={book.goodreadsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full rounded-lg border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#180E11] hover:bg-[#F3ECE3] dark:hover:bg-[#25151C] text-stone-800 dark:text-[#FAF2E8] py-1.5 text-center text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        title="View on Goodreads"
                      >
                        <span className="font-serif italic font-bold">g</span>
                        <span>Goodreads</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Server-safe Client Pagination Controls Bar */}
            {totalPages > 1 && (
              <div className="mt-8 pt-6 border-t border-[#E5DDD0] dark:border-[#332228] flex flex-col sm:flex-row items-center justify-between gap-4 font-devanagari select-none">
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  {language === "mr" ? "दाखवत आहे:" : language === "hi" ? "प्रदर्शित:" : "Showing:"}{" "}
                  <span className="font-bold text-[#800020] dark:text-[#E5B869]">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)}
                  </span>{" "}
                  / {filteredItems.length} {language === "mr" ? "ग्रंथ" : "books"} (पृष्ठ {currentPage} / {totalPages})
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border",
                      currentPage === 1
                        ? "opacity-40 cursor-not-allowed bg-stone-100 dark:bg-stone-800 text-stone-400 border-transparent"
                        : "cursor-pointer bg-white dark:bg-[#1E1418] text-[#800020] dark:text-[#E5B869] border-[#E5DDD0] dark:border-[#332228] hover:bg-[#F3ECE3] dark:hover:bg-[#25151C]"
                    )}
                    aria-label="मागील पृष्ठ"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{language === "mr" ? "मागील" : language === "hi" ? "पिछला" : "Prev"}</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setCurrentPage(p);
                        window.scrollTo({ top: 380, behavior: "smooth" });
                      }}
                      className={cn(
                        "w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center",
                        p === currentPage
                          ? "bg-[#800020] text-white shadow-xs font-extrabold"
                          : "bg-white dark:bg-[#1E1418] text-stone-700 dark:text-stone-300 border border-[#E5DDD0] dark:border-[#332228] hover:bg-[#F3ECE3] dark:hover:bg-[#25151C]"
                      )}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border",
                      currentPage === totalPages
                        ? "opacity-40 cursor-not-allowed bg-stone-100 dark:bg-stone-800 text-stone-400 border-transparent"
                        : "cursor-pointer bg-white dark:bg-[#1E1418] text-[#800020] dark:text-[#E5B869] border-[#E5DDD0] dark:border-[#332228] hover:bg-[#F3ECE3] dark:hover:bg-[#25151C]"
                    )}
                    aria-label="पुढील पृष्ठ"
                  >
                    <span>{language === "mr" ? "पुढील" : language === "hi" ? "अगला" : "Next"}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
          ) : isLoading ? (
            <div className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-16 text-center font-devanagari flex flex-col items-center justify-center gap-3">
              <BobbingDots size="lg" className="text-[#800020] dark:text-[#E5B869]" duration={0.8} />
              <p className="text-xs font-bold text-stone-600 dark:text-stone-300">
                {language === "mr" ? "ग्रंथसंग्रह शोधत आहे..." : language === "hi" ? "ग्रन्थ सूची खोजी जा रही है..." : "Searching library catalogue..."}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-12 text-center font-devanagari">
              <BookOpen className="h-10 w-10 text-stone-300 dark:text-[#E5B869] mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800 dark:text-[#FAF2E8]">
                {language === "mr" ? "एकही पुस्तक सापडले नाही" : language === "hi" ? "कोई पुस्तक नहीं मिली" : "No Books Found"}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {language === "mr"
                  ? "कृपया वेगळा शब्द शोधून पहा किंवा गाळणी बदला."
                  : language === "hi"
                    ? "कृपया अन्य शब्द खोजें या फिल्टर बदलें।"
                    : "Try searching with a different author name or book title."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Book Request Modal */}
      <BookRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </>
  );
}

export default function CataloguePage() {
  const { language } = useLanguage();

  return (
    <>
      <Navbar />
      <main id="main-content" className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] min-h-screen transition-colors">
        <PageHeader
          title={
            language === "mr"
              ? "साहित्य निकेतन ग्रंथसूची व संदर्भ संग्रह"
              : language === "hi"
                ? "साहित्य निकेतन ग्रन्थ सूची एवं संदर्भ संग्रह"
                : "Library Catalogue & Heritage Stacks"
          }
          subtitle={
            language === "mr"
              ? "साहित्य निकेतन ग्रंथालयातील ३९,९५३ मुद्रित ग्रंथ, संदर्भ संग्रह व दुर्मीळ हस्तलिखितांची अधिकृत नोंदणीकृत सूची."
              : language === "hi"
                ? "साहित्य निकेतन ग्रन्थालय में संरक्षित ३९,९५३ मुद्रित ग्रन्थ, सन्दर्भ साहित्य एवं दुर्लभ पाण्डुलिपियों की पंजीकृत सूची।"
                : "Official registered holdings of 39,953 printed books, reference volumes, and archival manuscripts."
          }
        />

        <section className="section py-10">
          <Suspense
            fallback={
              <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-stone-600 dark:text-[#D5C0AE]">
                <BobbingDots size="lg" className="text-[#800020] dark:text-[#E5B869]" />
                <span className="text-xs font-bold font-marathi-heading">ग्रंथसूची लोड होत आहे...</span>
              </div>
            }
          >
            <CatalogueContent />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
