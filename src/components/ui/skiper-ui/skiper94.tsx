"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogStory {
  id: string;
  title: string;
  slug?: string;
  category?: string;
  date?: string;
  published_at?: string;
  thumbnail_url?: string;
  excerpt?: string;
  author?: string;
  readTime?: string;
}

interface BlogCardOrangeProps {
  story: BlogStory;
  className?: string;
  readMoreLabel?: string;
}

/**
 * Skiper94 — Premium Vibrant Orange Editorial Blog Card
 * Designed for rich cultural essays, library chronicles, and longform Marathi reads.
 */
export const BlogCardOrange: React.FC<BlogCardOrangeProps> = ({
  story,
  className,
  readMoreLabel = "संपूर्ण लेख वाचा",
}) => {
  const postSlug = story.slug || story.id;
  const imgUrl = story.thumbnail_url || "/images/real/library_vintage_books.png";
  const dateText = story.published_at
    ? new Date(story.published_at).toLocaleDateString("mr-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : story.date || "साहित्य संचित";

  const categoryLabel = story.category === "news" ? "वृत्त व घडामोडी" : "विशेष शोधनिबंध";
  const readTimeText = story.readTime || "४ मिनिटे वाचन";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-[#181210] border border-orange-100/80 dark:border-orange-950/60 shadow-[0_4px_20px_-4px_rgba(234,88,12,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_40px_-10px_rgba(234,88,12,0.2)] dark:hover:shadow-[0_16px_40px_-10px_rgba(251,146,60,0.15)] hover:border-orange-400/60 dark:hover:border-orange-500/50 transition-all duration-300",
        className
      )}
    >
      {/* Top Image Showcase */}
      <Link href={`/stories/${postSlug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-orange-50 dark:bg-stone-900 block">
        <img
          src={imgUrl}
          alt={story.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

        {/* Floating Category Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/90 text-white backdrop-blur-md text-[11px] font-bold tracking-wide shadow-sm font-marathi-body border border-orange-300/30">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>{categoryLabel}</span>
        </div>

        {/* Reading Time Tag */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium font-marathi-body">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{readTimeText}</span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 justify-between p-5 sm:p-6">
        <div>
          {/* Metadata Row: Date & Publication */}
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2.5 font-marathi-body">
            <span>{dateText}</span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-stone-500 dark:text-stone-400 font-normal">साहित्य निकेतन</span>
          </div>

          {/* Title */}
          <Link href={`/stories/${postSlug}`} className="block group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            <h3 className="font-marathi-heading font-extrabold text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 mb-2.5">
              {story.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {story.excerpt && (
            <p className="font-marathi-body text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 font-normal mb-5">
              {story.excerpt}
            </p>
          )}
        </div>

        {/* Card Footer: Author & Read More Button */}
        <div className="pt-4 mt-auto border-t border-orange-100/70 dark:border-stone-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/80 border border-orange-200 dark:border-orange-800 flex items-center justify-center shrink-0 text-orange-700 dark:text-orange-300">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 truncate font-marathi-body">
              {story.author || "साहित्य संपादन मंडळ"}
            </span>
          </div>

          <Link
            href={`/stories/${postSlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-all font-marathi-body shrink-0 group-hover:translate-x-0.5"
          >
            <span>{readMoreLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export const BlogGridOrange: React.FC<{
  stories: BlogStory[];
  readMoreLabel?: string;
  className?: string;
}> = ({ stories, readMoreLabel, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", className)}>
      {stories.map((story) => (
        <BlogCardOrange key={story.id} story={story} readMoreLabel={readMoreLabel} />
      ))}
    </div>
  );
};

export const Skiper94 = BlogCardOrange;
export default BlogCardOrange;
