"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { BookOpen, Search } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { PhoneticInput } from "@/components/ui/phonetic-input";
import { devaNormalize } from "@/lib/transliterate";
import { useTranslatedFields, type SiteLang } from "@/lib/translate";
import { BlogGridOrange } from "@/components/ui/skiper-ui/skiper94";
import type { Post } from "@/types/database";



export default function StoriesClient({ initialStories = [] }: { initialStories: Post[] }) {
  const { language } = useLanguage();
  const rawStories = initialStories;
  const [stories] = useState<any[]>(rawStories);
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time translation: CMS stories are authored in their own language
  // (usually Marathi); readers in EN/HI mode get machine-translated
  // titles/excerpts while the original stays the graceful fallback.
  const translatedStories = useTranslatedFields(
    stories,
    ["title", "excerpt"] as any,
    language as SiteLang,
    (story) => (story.language as SiteLang) || "mr"
  );

  const filteredStories = translatedStories.filter((story) => {
    // Fuzzy match: normalize Devanagari on both sides so a phonetic-typed
    // query ("swami" → स्वमि) still finds "स्वामी"-spelled titles.
    const raw = searchQuery.trim();
    if (!raw) return true;
    const q = devaNormalize(raw);
    const haystacks = [story.title, story.excerpt].filter(Boolean).map(devaNormalize);
    return haystacks.some((h) => h.includes(q));
  });

  const pageTitle =
    language === "en"
      ? "Library Articles & Journal"
      : language === "hi"
      ? "वाचन कट्टा एवं विशेष आलेख"
      : "वाचन कट्टा व विशेष लेख";

  const pageSubtitle =
    language === "en"
      ? "Historical essays, archival notes, and 80-year literary tradition of Sahitya Niketan."
      : language === "hi"
      ? "ऐतिहासिक शोध, दुर्लभ पाण्डुलिपियां एवं साहित्य निकेतन की ८१ वर्षों की परंपरा।"
      : "ऐतिहासिक शोध, दुर्मीळ हस्तलिखिते आणि साहित्य निकेतन ग्रंथालयाचा ८१ वर्षांचा गौरवशाली वारसा.";

  const searchPlaceholder =
    language === "en"
      ? "Search articles..."
      : language === "hi"
      ? "आलेख खोजें..."
      : "लेख किंवा विषय शोधा...";

  const readBtnText =
    language === "en" ? "Read Article" : language === "hi" ? "पूरा आलेख पढ़ें" : "संपूर्ण लेख वाचा";

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] transition-colors pb-20">
        <PageHeader
          title={pageTitle}
          subtitle={pageSubtitle}
        />

        <div className="section max-w-[1240px] mx-auto pt-8 px-4 sm:px-6">
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4 mb-8 bg-white dark:bg-[#181210] p-4 rounded-2xl border border-orange-200/70 dark:border-orange-950/60 shadow-xs">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500/80" />
              <PhoneticInput
                value={searchQuery}
                onValueChange={setSearchQuery}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-orange-200 dark:border-stone-800 bg-orange-50/40 dark:bg-stone-900/60 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
            </div>
          </div>

          {/* Skiper94 Orange Blog Card Grid */}
          {filteredStories.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-[#181210] rounded-3xl border border-orange-200/70 dark:border-orange-950/60 p-8 space-y-4 max-w-lg mx-auto">
              <BookOpen className="h-10 w-10 text-orange-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 dark:text-white font-marathi-heading">
                {language === "en" ? "No articles found" : "कोणतेही लेख आढळले नाहीत"}
              </h3>
            </div>
          ) : (
            <BlogGridOrange stories={filteredStories} readMoreLabel={readBtnText} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
