"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StickyBanner } from "@/components/ui/sticky-banner";
import type { DailyAnnouncementData } from "@/lib/actions/daily-announcement";
import { Megaphone } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface SiteStickyBannerProps {
  initialData?: DailyAnnouncementData | null;
}

const DEFAULT_BANNER_TEXT = {
  mr: {
    badge: "दैनिक सूचना",
    text: "नवीन घडामोड: साहित्य निकेतन ग्रंथालयाचे दुर्मीळ हस्तलिखित दालन व आधुनिक अभ्यासिका सर्व वाचकांसाठी खुली आहे.",
    linkText: "सभासद नोंदणी करा",
  },
  hi: {
    badge: "दैनिक सूचना",
    text: "नवीन सूचना: साहित्य निकेतन ग्रन्थालय का दुर्लभ पाण्डुलिपि कक्ष एवं आधुनिक अध्ययन कक्ष सभी पाठकों हेतु खुला है।",
    linkText: "सदस्यता लें",
  },
  en: {
    badge: "Daily Notice",
    text: "Library Update: Sahitya Niketan's Rare Manuscript Gallery and Modern Study Hall are open for all readers.",
    linkText: "Join Library",
  },
};

export function SiteStickyBanner({ initialData }: SiteStickyBannerProps) {
  const { language } = useLanguage();
  const [data, setData] = useState<DailyAnnouncementData | null>(
    initialData || {
      text: DEFAULT_BANNER_TEXT.mr.text,
      link: "/membership",
      linkText: DEFAULT_BANNER_TEXT.mr.linkText,
      isActive: true,
      badge: DEFAULT_BANNER_TEXT.mr.badge,
      priority: "high",
    }
  );

  useEffect(() => {
    let isMounted = true;
    fetch("/api/announcement")
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (isMounted && res) {
          setData(res);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  if (!data || !data.isActive || !data.text) {
    return null;
  }

  // Determine localized text, badge, and linkText
  const isDefaultAnnouncement =
    data.text.includes("साहित्य निकेतन ग्रंथालयाचे दुर्मीळ") ||
    data.text.includes("साहित्य निकेतन") ||
    data.text === DEFAULT_BANNER_TEXT.mr.text;

  const currentText =
    isDefaultAnnouncement && language !== "mr"
      ? DEFAULT_BANNER_TEXT[language]?.text || data.text
      : data.text;

  const currentBadge =
    language === "en"
      ? data.badge === "दैनिक सूचना"
        ? "Daily Notice"
        : data.badge === "तातडीची सूचना"
        ? "Urgent Notice"
        : data.badge === "महत्त्वाची सूचना"
        ? "Important Notice"
        : "Notice"
      : language === "hi"
      ? data.badge || "दैनिक सूचना"
      : data.badge || "दैनिक सूचना";

  const currentLinkText =
    language === "en"
      ? data.linkText === "सभासद नोंदणी करा"
        ? "Join Library"
        : data.linkText || "Read More"
      : language === "hi"
      ? data.linkText === "सभासद नोंदणी करा"
        ? "सदस्यता लें"
        : data.linkText || "अधिक पढ़ें"
      : data.linkText || "अधिक वाचा";

  return (
    <StickyBanner
      className="bg-gradient-to-r from-[#6B0F1A] via-[#800020] to-[#5A0C16] text-[#FAF2E8] border-b border-[#C5A059]/40 py-2 sm:py-2.5 px-4 sm:px-8 shadow-sm relative z-50 font-marathi-body"
      hideOnScroll={false}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-center max-w-5xl pr-8">
        {currentBadge && (
          <span className="inline-flex items-center gap-1 bg-[#E5B869] text-[#3A050B] text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs shrink-0 tracking-wide uppercase">
            <Megaphone className="h-3 w-3" />
            <span>{currentBadge}</span>
          </span>
        )}

        <span className="font-medium text-[#FAF2E8] text-balance">
          {currentText}
        </span>

        {data.link && (
          <Link
            href={data.link}
            className="inline-flex items-center gap-1 font-bold text-[#FDE68A] hover:text-white underline underline-offset-4 transition-colors shrink-0 ml-1"
          >
            <span>{currentLinkText}</span>
          </Link>
        )}
      </div>
    </StickyBanner>
  );
}
