"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StickyBanner } from "@/components/ui/sticky-banner";
import type { DailyAnnouncementData } from "@/lib/actions/daily-announcement";
import { Megaphone } from "lucide-react";

interface SiteStickyBannerProps {
  initialData?: DailyAnnouncementData | null;
}

const DEFAULT_BANNER: DailyAnnouncementData = {
  text: "नवीन घडामोड: साहित्य निकेतन ग्रंथालयाचे दुर्मीळ हस्तलिखित दालन व आधुनिक अभ्यासिका सर्व वाचकांसाठी खुली आहे.",
  link: "/membership",
  linkText: "सभासद नोंदणी करा",
  isActive: true,
  badge: "दैनिक सूचना",
  priority: "high",
};

export function SiteStickyBanner({ initialData }: SiteStickyBannerProps) {
  const [data, setData] = useState<DailyAnnouncementData | null>(initialData || DEFAULT_BANNER);

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

  return (
    <StickyBanner
      className="bg-gradient-to-r from-[#6B0F1A] via-[#800020] to-[#5A0C16] text-[#FAF2E8] border-b border-[#C5A059]/40 py-2 sm:py-2.5 px-4 sm:px-8 shadow-sm relative z-50 font-marathi-body"
      hideOnScroll={false}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-center max-w-5xl pr-8">
        {data.badge && (
          <span className="inline-flex items-center gap-1 bg-[#E5B869] text-[#3A050B] text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs shrink-0 tracking-wide uppercase">
            <Megaphone className="h-3 w-3" />
            <span>{data.badge}</span>
          </span>
        )}

        <span className="font-medium text-[#FAF2E8] text-balance">
          {data.text}
        </span>

        {data.link && (
          <Link
            href={data.link}
            className="inline-flex items-center gap-1 font-bold text-[#FDE68A] hover:text-white underline underline-offset-4 transition-colors shrink-0 ml-1"
          >
            <span>{data.linkText || "अधिक वाचा"}</span>
          </Link>
        )}
      </div>
    </StickyBanner>
  );
}
