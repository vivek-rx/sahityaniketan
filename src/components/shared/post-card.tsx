"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Share2, MessageSquare } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { PostWithAuthor } from "@/types/database";

interface PostCardProps {
  post: PostWithAuthor;
  className?: string;
  index?: number;
}

const categoryStyles: Record<string, { label: string; color: string }> = {
  update: { label: "Update", color: "var(--color-forest)" },
  announcement: { label: "Announcement", color: "var(--color-maroon)" },
  notice: { label: "Notice", color: "var(--color-gold-dark)" },
  achievement: { label: "Achievement", color: "var(--color-gold)" },
  news: { label: "News", color: "var(--color-forest)" },
  event: { label: "Event", color: "var(--color-maroon)" },
  blog: { label: "Blog", color: "var(--color-gold-dark)" },
};

/**
 * PostCard — Facebook-style news/update card
 * Shows image, title, date, excerpt, category, share button
 */
export function PostCard({ post, className, index = 0 }: PostCardProps) {
  const category = categoryStyles[post.category] ?? categoryStyles.announcement;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn("heritage-card group overflow-hidden p-0", className)}
    >
      {/* Post image */}
      {post.image_url && (
        <Link href={`/news/${post.slug}`} className="block">
          <div
            className="relative aspect-[16/9] w-full overflow-hidden"
            style={{ backgroundColor: "var(--color-cream)" }}
          >
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Link>
      )}

      <div className="p-5">
        {/* Header — category + date */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: category.color }}
          >
            {category.label}
          </span>
          <span
            className="flex items-center gap-1.5 text-[12px]"
            style={{ color: "var(--color-text-light)" }}
          >
            <Calendar className="h-3 w-3" strokeWidth={1.5} />
            {post.published_at
              ? formatDate(post.published_at, { month: "short" })
              : formatDate(post.created_at, { month: "short" })}
          </span>
        </div>

        {/* Title */}
        <Link href={`/news/${post.slug}`}>
          <h3
            className="mb-2 line-clamp-2 text-[15px] font-bold font-heading leading-snug transition-colors group-hover:text-[var(--color-maroon)] text-stone-900 dark:text-stone-100"
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className="mb-4 line-clamp-3 text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Footer — Read more + Share */}
        <div
          className="flex items-center justify-between border-t pt-3"
          style={{ borderColor: "var(--color-border-subtle)" }}
        >
          <Link
            href={`/news/${post.slug}`}
            className="flex items-center gap-1 text-[13px] font-medium transition-colors hover:text-[var(--color-maroon)]"
            style={{ color: "var(--color-gold)" }}
          >
            Read More
          </Link>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full transition-heritage hover:bg-[var(--color-cream)]"
            aria-label="Share post"
            onClick={(e) => {
              e.preventDefault();
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  url: `/news/${post.slug}`,
                });
              }
            }}
          >
            <Share2
              className="h-3.5 w-3.5"
              style={{ color: "var(--color-text-light)" }}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
