"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  /** Whether to show a background card pill container (default true) */
  variant?: "pill" | "minimal" | "transparent" | "glass";
  /** Optional max items before collapsing middle into ellipsis (default 3) */
  maxItems?: number;
}

const ROUTE_LABELS_MR: Record<string, string> = {
  about: "आमच्याबद्दल",
  stories: "वाचन व लेख",
  catalogue: "ग्रंथसूची",
  events: "कार्यक्रम व उपक्रम",
  gallery: "छायाचित्र दालन",
  contact: "संपर्क",
  membership: "सदस्यत्व व अभ्यासिका",
  history: "इतिहास व वारसा",
  news: "बातम्या व परिपत्रके",
  library: "ग्रंथालय दालने",
  "ambajogai-smruti": "अंबाजोगाईच्या स्मृती",
  admin: "प्रशासक नियंत्रण कक्ष",
  noticeboard: "परिपत्रके व नोटीस फलक",
  carousel: "मुखपृष्ठ बॅनर",
  login: "प्रशासक लॉगिन",
  phone: "मोबाईल आवृत्ती",
};

const ROUTE_LABELS_EN: Record<string, string> = {
  about: "About Us",
  stories: "Stories & Articles",
  catalogue: "Catalogue",
  events: "Events & Programs",
  gallery: "Photo Gallery",
  contact: "Contact",
  membership: "Membership",
  history: "History & Heritage",
  news: "News & Notices",
  library: "Library Sections",
  "ambajogai-smruti": "Ambajogai Memories",
  admin: "Admin Console",
  noticeboard: "Notices",
  carousel: "Hero Slides",
  login: "Login",
  phone: "Mobile View",
};

/**
 * Breadcrumbs Component
 * Strictly complies with NameThatUI guidelines & W3C WAI-ARIA authoring practices:
 * - Rendered inside <nav aria-label="Breadcrumb">
 * - Semantic <ol> and <li> hierarchy trail
 * - Links each ancestor back to root
 * - Marks the final crumb with aria-current="page" (never a link to itself)
 * - Separators marked aria-hidden="true" to prevent screen reader noise
 * - Collapses middle ancestors into an ellipsis when trail exceeds maxItems
 * - Includes Schema.org BreadcrumbList JSON-LD for SEO
 */
export function Breadcrumbs({
  items,
  className,
  variant = "pill",
  maxItems = 3,
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // If items not explicitly provided, derive from current pathname
  const breadcrumbItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;
    if (!pathname || pathname === "/") return [];

    const segments = pathname.split("/").filter(Boolean);
    const result: BreadcrumbItem[] = [];
    let currentHref = "";

    const labels = language === "en" ? ROUTE_LABELS_EN : ROUTE_LABELS_MR;

    segments.forEach((seg, idx) => {
      currentHref += `/${seg}`;
      const isLast = idx === segments.length - 1;
      const label = labels[seg] || decodeURIComponent(seg).replace(/[-_]/g, " ");
      result.push({
        label,
        href: isLast ? undefined : currentHref,
      });
    });

    return result;
  }, [items, pathname, language]);

  // Don't render breadcrumbs on homepage if no custom trail provided
  if (breadcrumbItems.length === 0) return null;

  const homeLabel = language === "en" ? "Home" : "मुख्यपृष्ठ";

  // Middle-crumb collapse logic (e.g. Home > ... > Current Page)
  const shouldCollapse = !isExpanded && breadcrumbItems.length > maxItems;
  const firstCrumb = breadcrumbItems[0];
  const lastCrumb = breadcrumbItems[breadcrumbItems.length - 1];
  const middleCrumbs = breadcrumbItems.slice(1, -1);

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: "https://sahityaniketan.org",
      },
      ...breadcrumbItems.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: crumb.label,
        item: crumb.href
          ? `https://sahityaniketan.org${crumb.href}`
          : undefined,
      })),
    ],
  };

  const containerStyles = {
    pill: "inline-flex items-center text-xs sm:text-sm text-stone-600 dark:text-stone-300 bg-white/95 dark:bg-[#1E1418]/95 py-1.5 sm:py-2 px-3 sm:px-3.5 border border-stone-200/90 dark:border-[#332228] rounded-xl shadow-2xs backdrop-blur-sm",
    minimal: "inline-flex items-center text-xs sm:text-sm text-stone-600 dark:text-stone-300 py-1",
    transparent: "inline-flex items-center text-xs sm:text-sm text-white/90 drop-shadow-sm py-1",
    glass: "inline-flex items-center text-xs sm:text-sm text-zinc-200 bg-black/50 py-1.5 sm:py-2 px-3 sm:px-3.5 border border-white/15 rounded-xl shadow-xs backdrop-blur-md",
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className={cn(containerStyles[variant as keyof typeof containerStyles] || containerStyles.transparent, className)}
      >
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 list-none p-0 m-0 leading-none">
          {/* 1. Root Crumb (Home) */}
          <li className="inline-flex items-center">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
                variant === "transparent" || variant === "glass"
                  ? "text-zinc-300 hover:text-white"
                  : "text-stone-500 hover:text-[#800020] dark:text-stone-400 dark:hover:text-[#E5B869]"
              )}
              aria-label={homeLabel}
            >
              <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{homeLabel}</span>
            </Link>
          </li>

          {/* Root Separator */}
          <li aria-hidden="true" className={cn("shrink-0 select-none", variant === "transparent" || variant === "glass" ? "text-zinc-500" : "text-stone-300 dark:text-stone-600")}>
            <ChevronRight className="h-3 w-3" />
          </li>

          {/* 2. Middle Crumbs with Ellipsis Collapse */}
          {shouldCollapse ? (
            <>
              {/* First ancestor */}
              <li className="inline-flex items-center">
                <Link
                  href={firstCrumb.href || "#"}
                  className={cn(
                    "font-medium transition-colors whitespace-nowrap",
                    variant === "transparent" || variant === "glass"
                      ? "text-zinc-300 hover:text-white"
                      : "text-stone-600 hover:text-[#800020] dark:text-stone-300 dark:hover:text-[#E5B869]"
                  )}
                >
                  {firstCrumb.label}
                </Link>
              </li>

              <li aria-hidden="true" className={cn("shrink-0 select-none", variant === "transparent" || variant === "glass" ? "text-zinc-500" : "text-stone-300 dark:text-stone-600")}>
                <ChevronRight className="h-3 w-3" />
              </li>

              {/* Collapsed Ancestors Ellipsis */}
              <li className="inline-flex items-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  aria-label="Expand collapsed ancestor breadcrumbs"
                  title="Expand breadcrumbs"
                  className={cn(
                    "p-1 rounded-md transition-colors cursor-pointer",
                    variant === "transparent" || variant === "glass"
                      ? "text-zinc-400 hover:text-white hover:bg-white/10"
                      : "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                  )}
                >
                  <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </li>

              <li aria-hidden="true" className={cn("shrink-0 select-none", variant === "transparent" || variant === "glass" ? "text-zinc-500" : "text-stone-300 dark:text-stone-600")}>
                <ChevronRight className="h-3 w-3" />
              </li>
            </>
          ) : (
            // Full expanded ancestors
            breadcrumbItems.slice(0, -1).map((item, idx) => (
              <React.Fragment key={`${item.label}-${idx}`}>
                <li className="inline-flex items-center">
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "font-medium transition-colors whitespace-nowrap",
                      variant === "transparent" || variant === "glass"
                        ? "text-zinc-300 hover:text-white"
                        : "text-stone-600 hover:text-[#800020] dark:text-stone-300 dark:hover:text-[#E5B869]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
                <li aria-hidden="true" className={cn("shrink-0 select-none", variant === "transparent" || variant === "glass" ? "text-zinc-500" : "text-stone-300 dark:text-stone-600")}>
                  <ChevronRight className="h-3 w-3" />
                </li>
              </React.Fragment>
            ))
          )}

          {/* 3. Final Crumb: Current Page Location */}
          <li className="inline-flex items-center min-w-0">
            <span
              aria-current="page"
              className={cn(
                "font-bold truncate max-w-[200px] sm:max-w-[340px]",
                variant === "glass"
                  ? "text-amber-300 font-bold"
                  : variant === "transparent"
                  ? "text-white font-extrabold"
                  : "text-[#800020] dark:text-[#E5B869]"
              )}
            >
              {lastCrumb.label}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}
