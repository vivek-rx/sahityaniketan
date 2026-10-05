"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { ScrollTimeline } from "@/components/history/scroll-timeline";
import { useAnimeScroll } from "@/hooks/use-anime-scroll";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41";

/**
 * HistoryTimelineSection — The One Deliberate Animation Moment on the Homepage.
 * Unfolds the 80-year saga from the 1945 Nizam-era freedom struggle to the digital era
 * through a cinematic scroll-driven timeline.
 * Completely free of eyebrow badges — the monumental heading carries the full weight.
 */
export function HistoryTimelineSection() {
  const { language } = useLanguage();
  const headerRef = useAnimeScroll<HTMLDivElement>("fade-left", { threshold: 0.1, duration: 800 });
  const ctaRef = useAnimeScroll<HTMLDivElement>("fade-up", { threshold: 0.1, delay: 100, duration: 600 });

  const isEn = language === "en";
  const isHi = language === "hi";

  const title = isEn
    ? "1945 to 2026: Institutional History and Eight Decades of Service"
    : isHi
    ? "१९४५ से २०२६: ग्रन्थालय स्थापना, स्वतंत्रता संग्राम एवं वाचन आन्दोलन के ८० वर्ष"
    : "१९४५ ते २०२६: ग्रंथालय स्थापना, स्वातंत्र्य लढा आणि वाचन चळवळीची ८० वर्षे";

  const subtitle = isEn
    ? "Founded on 1 August 1945 during the Hyderabad liberation movement — an archival record of eight decades of library development."
    : isHi
    ? "हैदराबाद मुक्ति संग्राम के दौर में १ अगस्त १९४५ को स्थापित ग्रन्थालय और आठ दशकों की संस्थागत यात्रा।"
    : "हैदराबाद मुक्ती संग्रामाच्या काळात १ ऑगस्ट १९४५ रोजी स्थापन झालेले ग्रंथालय आणि पुढील आठ दशकांतील संस्थात्मक वाटचाल.";

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 font-marathi-body transition-colors overflow-hidden">
      {/* Subtle edge progressive blurs */}
      <ProgressiveBlur position="top" height="50px" blurAmount="4px" className="opacity-25" />
      <ProgressiveBlur position="bottom" height="50px" blurAmount="4px" className="opacity-25" />

      <div className="section">
        {/* Section Header: Pure Headings, NO Eyebrow Badge */}
        <div ref={headerRef} className="max-w-3xl mb-6 sm:mb-8 text-left">
          <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
            {title}
          </h2>
          <p className="font-marathi-body text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ── THE DELIBERATE ANIMATION MOMENT: SCROLL-DRIVEN TIMELINE ── */}
        <div className="relative">
          <ScrollTimeline />
        </div>

        {/* Bottom Editorial Callout to Full Archive */}
        <div ref={ctaRef} className="mt-12 text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95 font-marathi-body"
          >
            <span>
              {isEn
                ? "Read the Complete Archival History & Documents"
                : isHi
                ? "सम्पूर्ण ऐतिहासिक दस्तावेज एवं संस्थापक विवरण पढ़ें"
                : "ग्रंथालयाचा संपूर्ण सविस्तर इतिहास व मूळ सनदा वाचा"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
