"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

interface PageHeaderProps {
  title: string;
  titleHindi?: string;
  subtitle?: string;
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
  hideBreadcrumbs?: boolean;
  /** Custom background image path. Defaults to authentic real Marathi books photograph */
  backgroundImage?: string;
  /** Custom badge text (e.g. section or institutional label) */
  categoryBadge?: string;
  children?: React.ReactNode;
}

/**
 * PageHeader — Authentic Archival Page Banner
 * Clearly showcases authentic Marathi library books photograph with high visibility,
 * centered title and subtitle, and premium typography.
 */
export function PageHeader({
  title,
  titleHindi,
  subtitle,
  className,
  breadcrumbs,
  hideBreadcrumbs = false,
  backgroundImage = "/images/real/marathi_books_display.png",
  categoryBadge,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-zinc-800 bg-zinc-950 py-12 sm:py-16 lg:py-20 text-white transition-colors select-none",
        className
      )}
    >
      {/* ── AUTHENTIC MARATHI BOOKS PHOTOGRAPH (HIGH VISIBILITY) ── */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src={backgroundImage}
            alt="Marathi Literary Archives"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] scale-[1.02] opacity-85 dark:opacity-80"
          />
          {/* Subtle balanced scrim: preserves vivid book details while guaranteeing crisp text contrast */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/60" />
        </div>
      )}

      {/* ── FOREGROUND CONTENT (CENTERED & ELEGANT TYPOGRAPHY) ── */}
      <div className="container max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        {/* Glass Breadcrumbs Component centered */}
        {!hideBreadcrumbs && (
          <div className="flex justify-center mb-1">
            <Breadcrumbs items={breadcrumbs} variant="glass" />
          </div>
        )}

        {categoryBadge && (
          <p className="text-xs sm:text-sm font-semibold text-amber-300 uppercase tracking-widest font-marathi-body">
            {categoryBadge}
          </p>
        )}


        {/* Page / Route Title centered */}
        <h1 className="font-marathi-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] max-w-3xl mx-auto">
          {title}
        </h1>

        {/* Secondary Marathi / Hindi / English Heading centered */}
        {titleHindi && (
          <p className="text-base sm:text-lg md:text-xl font-bold font-marathi-body text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mx-auto">
            {titleHindi}
          </p>
        )}

        {/* Narrative / Context Subtitle nicely written and centered */}
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-zinc-100 font-marathi-body font-medium max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {subtitle}
          </p>
        )}

        {/* Optional Actions or Filter Controls centered */}
        {children && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 w-full">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHeader;
