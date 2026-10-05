"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export interface BannerSingleActionBrandProps {
  badgeText?: string;
  message?: string;
  linkText?: string;
  href?: string;
  type?: "article" | "photo" | "event";
}

export function BannerSingleActionBrand({
  badgeText,
  message,
  linkText,
  href = "/stories",
  type = "article",
}: BannerSingleActionBrandProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguage();

  if (!isVisible) return null;

  const defaultBadge =
    badgeText ||
    (type === "photo"
      ? language === "mr" ? "नवीन छायाचित्रे" : "New Photos"
      : language === "mr" ? "नवीन लेख" : "New Story");

  const defaultMessage =
    message ||
    (type === "photo"
      ? language === "mr"
        ? "ग्रंथालय वाचन दालने व ऐतिहासिक छायाचित्रांचा संग्रह अद्ययावत झाला आहे."
        : "Historical archives & reading room photos have been updated."
      : language === "mr"
      ? "साहित्य संचित: 'ग्रंथालय चळवळ आणि आद्यकवी मुकुंदराजांचा ज्ञानवारसा' हा नवा लेख प्रसिद्ध झाला आहे."
      : "Sahitya Sanchit: A new feature on Ambajogai's literary heritage is now live.");

  const defaultLinkText =
    linkText ||
    (language === "mr" ? "संपूर्ण लेख वाचा" : language === "hi" ? "पूरा लेख पढ़ें" : "Read story");

  return (
    <aside
      aria-label="Announcement"
      className="relative z-30 bg-[#C0392B] dark:bg-[#78151B] text-white px-4 py-2.5 sm:py-3 transition-colors border-b border-[#A93226] dark:border-[#520C11] shadow-xs"
    >
      <div className="section flex items-center justify-between gap-3">
        {/* Centered or left-aligned announcement message */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center text-center text-xs sm:text-sm font-marathi-body min-w-0">
          {/* Pill Badge */}
          <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide">
            <Sparkles className="h-3 w-3 text-[#FFD9CC]" />
            <span>{defaultBadge}</span>
          </span>

          {/* Announcement text */}
          <span className="truncate text-white/95 font-medium hidden md:inline">
            {defaultMessage}
          </span>

          {/* Action Link */}
          <Link
            href={href}
            className="inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:text-[#FFD9CC] shrink-0 transition-colors"
          >
            <span>{defaultLinkText}</span>
          </Link>
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss banner"
          className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

export default BannerSingleActionBrand;
