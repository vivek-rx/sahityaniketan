"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, User, Eye, Bookmark, Star } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Button, 
  Chip 
} from "@heroui/react";
import { cn } from "@/lib/utils";
import type { BookWithRelations } from "@/types/database";

interface BookCardProps {
  book: BookWithRelations;
  className?: string;
  index?: number;
}

const availabilityStyles = {
  available: {
    label: "उपलब्ध (Available)",
    bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  issued: {
    label: "वितरित (Issued)",
    bg: "bg-amber-50 text-amber-800 border-amber-200",
  },
  reference_only: {
    label: "संदर्भ कक्ष (Reference)",
    bg: "bg-[#F3ECE3] text-[#800020] border-[#B8860B]/40",
  },
  lost: {
    label: "अनुपलब्ध (Unavailable)",
    bg: "bg-stone-100 text-stone-600 border-stone-200",
  },
};

/**
 * BookCard — Sahitya Niketan Heritage Display Card powered by HeroUI
 */
export function BookCard({ book, className, index = 0 }: BookCardProps) {
  const availability = availabilityStyles[book.availability ?? "available"] ?? availabilityStyles.available;
  const bookTitle = book.title;
  const bookAuthor = typeof book.author === "string" ? book.author : (book.author as unknown as { name?: string })?.name;
  const bookCategory = typeof book.category === "string" ? book.category : (book.category as unknown as { name?: string })?.name;
  const bookLanguage = typeof book.language === "string" ? book.language : (book.language as unknown as { name?: string })?.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn("h-full", className)}
    >
      <Card className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] shadow-2xs hover:border-[#800020] dark:hover:border-[#E5B869] hover:shadow-lg transition-all duration-300 p-0">
        <div>
          {/* Book Cover Image Area */}
          <Link
            href={`/catalogue/${book.slug}`}
            className="relative aspect-[3/4] w-full block overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F3ECE3] dark:from-[#1E1418] dark:to-[#120B0D]"
          >
            {book.cover_url ? (
              <Image
                src={book.cover_url}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#800020]/10 dark:bg-[#1E1418] text-[#800020] dark:text-[#E5B869] border border-[#800020]/20 dark:border-[#332228] shadow-2xs group-hover:scale-110 transition-transform">
                  <BookOpen className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <span className="font-marathi-heading text-sm font-extrabold text-stone-900 dark:text-[#FAF2E8] line-clamp-2 px-2">
                  {book.title}
                </span>
                <span className="mt-1 text-[11px] text-[#800020] dark:text-[#E5B869] font-marathi-body font-bold">
                  साहित्य निकेतन डिजिटल संग्रह
                </span>
              </div>
            )}

            {/* Top Badges using HeroUI Chip */}
            <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 z-10">
              {book.is_featured && (
                <Chip
                  variant="primary"
                  size="sm"
                  className="bg-[#B8860B] text-white font-black text-[10px] shadow-xs px-2"
                >
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-amber-200" />
                    <span>विशेष</span>
                  </div>
                </Chip>
              )}
              {bookLanguage && (
                <Chip
                  variant="secondary"
                  size="sm"
                  className="bg-[#800020] text-white font-bold text-[10px] shadow-xs px-2"
                >
                  {bookLanguage}
                </Chip>
              )}
            </div>

            <div className="absolute right-2.5 top-2.5 z-10">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold shadow-2xs backdrop-blur-md",
                  availability.bg
                )}
              >
                {availability.label}
              </span>
            </div>

            {/* Quick Hover Read Overlay */}
            <div className="absolute inset-0 bg-[#800020]/80 dark:bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
              <Button
                variant="primary"
                className="rounded-full bg-white dark:bg-[#1E1418] text-[#800020] dark:text-[#E5B869] font-black text-xs px-4 py-2 shadow-lg hover:bg-[#F3ECE3] transition-colors flex items-center gap-1.5 border border-[#B8860B]/40"
              >
                <Eye className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                <span>डिजिटल वाचन</span>
              </Button>
            </div>
          </Link>

          {/* Book Details */}
          <div className="p-4 space-y-2">
            {/* Category */}
            {bookCategory && (
              <span className="block text-xs font-extrabold text-[#800020] dark:text-[#E5B869] uppercase tracking-wider font-marathi-body">
                {bookCategory}
              </span>
            )}

            {/* Title */}
            <Link href={`/catalogue/${book.slug}`} className="block">
              <h3 className="font-marathi-heading text-base sm:text-lg font-extrabold text-stone-900 dark:text-[#FAF2E8] line-clamp-2 leading-snug group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors">
                {bookTitle}
              </h3>
            </Link>

            {/* Author */}
            {bookAuthor && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-marathi-body">
                <User className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869] shrink-0" />
                <span className="line-clamp-1 font-semibold">
                  {bookAuthor}
                </span>
              </div>
            )}

            {/* Reader Rating Score */}
            <div className="flex items-center justify-between bg-[#FAF8F5] dark:bg-[#160E11] rounded-xl px-2.5 py-1.5 border border-[#E5DDD0] dark:border-[#332228] text-xs font-marathi-body">
              <div className="flex items-center gap-1 text-[#B8860B] dark:text-[#E5B869] font-extrabold">
                <Star className="h-3.5 w-3.5 fill-[#B8860B] dark:fill-[#E5B869] text-[#B8860B] dark:text-[#E5B869]" />
                <span>४.९</span>
              </div>
              <span className="text-[10px] font-bold text-[#800020] dark:text-[#E5B869]">
                ९६% वाचक पसंती
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <CardFooter className="p-4 pt-2 border-t border-[#E5DDD0] dark:border-[#332228] flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-marathi-body">
          <span className="font-mono text-[11px] font-semibold">
            {book.publication_year ? `वर्ष: ${book.publication_year}` : `कप्पा: ${book.shelf_number || "M-01"}`}
          </span>

          <Link
            href={`/catalogue/${book.slug}`}
            className="font-extrabold text-[#800020] dark:text-[#E5B869] hover:text-[#66001A] dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>सविस्तर</span>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
