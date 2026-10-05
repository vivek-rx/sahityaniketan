"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rectangular" | "rounded" | "circular" | "text";
}

/**
 * MotionSkeleton — Exact @motion/loader-skeleton implementation.
 * Neutral, high-contrast, modern clean shimmer wave.
 */
export function MotionSkeleton({
  className,
  variant = "rounded",
  ...props
}: MotionSkeletonProps) {
  const variantClasses = {
    rectangular: "rounded-none",
    rounded: "rounded-2xl",
    circular: "rounded-full",
    text: "rounded-md h-4 w-full",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden isolate",
        "bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {/* ── EXACT METALLIC SHIMMER WAVE ── */}
      <motion.div
        aria-hidden="true"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -skew-x-12 pointer-events-none bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent w-full h-full"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. BOOKS SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────

export function BookCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 sm:p-5 space-y-4 border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden",
        className
      )}
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
        <MotionSkeleton className="w-full h-full rounded-xl" />
      </div>

      {/* Book Metadata */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <MotionSkeleton className="h-4 w-20 rounded-full" />
          <MotionSkeleton className="h-3 w-12 rounded-full" />
        </div>
        <MotionSkeleton className="h-5 w-4/5 rounded-md" />
        <MotionSkeleton className="h-4 w-3/5 rounded-md" />
      </div>

      {/* Shelf & Action Button */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <MotionSkeleton className="h-3.5 w-24 rounded-md" />
        <MotionSkeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function BookGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={`book-skel-${i}`} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. EVENTS SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────

export function EventCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 sm:p-6 space-y-4 border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden flex flex-col justify-between",
        className
      )}
    >
      <div className="space-y-4">
        {/* Header: Date Stamp & Category */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MotionSkeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-1">
              <MotionSkeleton className="h-3.5 w-24 rounded-md" />
              <MotionSkeleton className="h-2.5 w-16 rounded-md" />
            </div>
          </div>
          <MotionSkeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title */}
        <div className="space-y-2 pt-2">
          <MotionSkeleton className="h-5 w-full rounded-md" />
          <MotionSkeleton className="h-5 w-3/4 rounded-md" />
        </div>

        {/* Snippet */}
        <div className="space-y-1.5 pt-1">
          <MotionSkeleton className="h-3.5 w-full rounded-md" />
          <MotionSkeleton className="h-3.5 w-5/6 rounded-md" />
        </div>

        {/* Venue & Organizer */}
        <div className="pt-3 space-y-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <MotionSkeleton className="h-4 w-4 rounded-full" />
            <MotionSkeleton className="h-3 w-40 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <MotionSkeleton className="h-4 w-4 rounded-full" />
            <MotionSkeleton className="h-3 w-32 rounded-md" />
          </div>
        </div>
      </div>

      {/* RSVP Action */}
      <div className="pt-4 flex items-center justify-between">
        <MotionSkeleton className="h-4 w-28 rounded-md" />
        <MotionSkeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={`event-skel-${i}`} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BLOGS & STORIES SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────

export function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 space-y-4 border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden",
        className
      )}
    >
      {/* Blog Thumbnail */}
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden">
        <MotionSkeleton className="w-full h-full rounded-xl" />
        <div className="absolute top-3 left-3">
          <MotionSkeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Meta Date & Read Time */}
      <div className="flex items-center justify-between text-xs pt-1">
        <MotionSkeleton className="h-3 w-28 rounded-md" />
        <MotionSkeleton className="h-3 w-16 rounded-md" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <MotionSkeleton className="h-5 w-full rounded-md" />
        <MotionSkeleton className="h-5 w-4/5 rounded-md" />
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5 pt-1">
        <MotionSkeleton className="h-3.5 w-full rounded-md" />
        <MotionSkeleton className="h-3.5 w-11/12 rounded-md" />
        <MotionSkeleton className="h-3.5 w-4/6 rounded-md" />
      </div>

      {/* Author Strip & Read Link */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MotionSkeleton className="h-7 w-7 rounded-full" />
          <MotionSkeleton className="h-3 w-24 rounded-md" />
        </div>
        <MotionSkeleton className="h-4 w-16 rounded-md" />
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={`blog-skel-${i}`} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. TEAM MEMBERS & PHOTOS SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────

export function TeamMemberSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center space-y-3", className)}>
      {/* Portrait Frame */}
      <div className="w-52 h-64 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 relative overflow-hidden flex items-center justify-center shadow-xs">
        <MotionSkeleton className="w-full h-full rounded-xl" />
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <MotionSkeleton className="w-20 h-20 rounded-full" />
        </div>
      </div>

      {/* Member Name */}
      <MotionSkeleton className="h-5 w-40 rounded-md" />

      {/* Designation */}
      <MotionSkeleton className="h-4 w-24 rounded-full" />
    </div>
  );
}

export function TeamGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
      {Array.from({ length: count }).map((_, i) => (
        <TeamMemberSkeleton key={`team-skel-${i}`} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. GALLERY PHOTO SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────

export function GalleryPhotoSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 p-3 space-y-2.5 bg-white dark:bg-zinc-900",
        className
      )}
    >
      <MotionSkeleton className="aspect-video w-full rounded-xl" />
      <MotionSkeleton className="h-4 w-3/4 rounded-md" />
      <MotionSkeleton className="h-3 w-1/2 rounded-md" />
    </div>
  );
}

export function GalleryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <GalleryPhotoSkeleton key={`gallery-skel-${i}`} />
      ))}
    </div>
  );
}
