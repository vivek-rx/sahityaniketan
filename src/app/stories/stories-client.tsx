"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { BookOpen, Search } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { BlogGridOrange } from "@/components/ui/skiper-ui/skiper94";
import type { Post } from "@/types/database";

const DEFAULT_STORIES: any[] = [
  {
    id: "default-1",
    title: "अंबाजोगाईची ज्ञानसाधना: आद्यकवी मुकुंदराज व संत दासोपंतांचा समृद्ध वारसा",
    slug: "ambajogai-literary-heritage-mukundraj-dasopant",
    category: "blog",
    date: "ऐतिहासिक शोधनिबंध",
    thumbnail_url: "/images/real/library_vintage_books.png",
    excerpt: "अंबाजोगाई ही मराठी साहित्याची पावन जन्मभूमी मानली जाते. याच मातीत आद्यकवी मुकुंदराज यांनी मराठीतील पहिला ग्रंथ विवेकसिंधू लिहिला. संत दासोपंतांच्या पदस्पर्शाने पुनीत झालेल्या या साहित्यनगरीत ग्रंथ चळवळ कशी बहरली याचा हा विशेष मागोवा...",
    author: "प्रा. डॉ. सदानंद मोरे",
    readTime: "५ मिनिटे वाचन",
  },
  {
    id: "default-2",
    title: "वाचन संस्कृतीची ८० वर्षे: १ ऑगस्ट १९४५ पासूनचा गौरवशाली ग्रंथालय प्रवास",
    slug: "80-years-of-sahitya-niketan-ambajogai",
    category: "news",
    date: "स्थापना: १ ऑगस्ट १९४५",
    thumbnail_url: "/images/real/library_inauguration_plaque.webp",
    excerpt: "१ ऑगस्ट १९४५ रोजी स्थापन झालेले साहित्य निकेतन ग्रंथालय आज मराठवाड्यातील अग्रगण्य सार्वजनिक वाचनालय ठरले आहे. ३९,९५३ ग्रंथांचा अमूल्य संग्रह आणि स्पर्धा परीक्षा अभ्यासिकेच्या माध्यमातून हजारो युवकांना घडविणारे हे ज्ञानतीर्थ...",
    author: "साहित्य निकेतन संपादक मंडळ",
    readTime: "४ मिनिटे वाचन",
  },
  {
    id: "default-3",
    title: "मराठीतील आद्य ग्रंथ 'विवेकसिंधू' आणि दुर्मीळ मोडी हस्तलिखितांचे जतन",
    slug: "vivekasindhu-modi-manuscripts-preservation",
    category: "blog",
    date: "दुर्मीळ दस्तऐवज व संदर्भ",
    thumbnail_url: "/images/real/library_cupboards.png",
    excerpt: "मुकुंदराजकालीन संदर्भ, पेशवेकालीन सनदा आणि मोडी लिपीतील ऐतिहासिक हस्तलिखितांचे जतन साहित्य निकेतन ग्रंथालयाच्या लाकडी कपाटांमध्ये शास्त्रोक्त पद्धतीने कसे केले जाते याचा अभ्यासपूर्ण आढावा...",
    author: "संशोधन व संदर्भ कक्ष",
    readTime: "६ मिनिटे वाचन",
  },
];

export default function StoriesClient({ initialStories = [] }: { initialStories: Post[] }) {
  const { language } = useLanguage();
  const rawStories = initialStories.length > 0 ? initialStories : DEFAULT_STORIES;
  const [stories] = useState<any[]>(rawStories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = stories.filter((story) => {
    return (
      !searchQuery.trim() ||
      story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.excerpt && story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );
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
      ? "ऐतिहासिक शोध, दुर्लभ पाण्डुलिपियां एवं साहित्य निकेतन की ८० वर्षों की परंपरा।"
      : "ऐतिहासिक शोध, दुर्मीळ हस्तलिखिते आणि साहित्य निकेतन ग्रंथालयाचा ८० वर्षांचा गौरवशाली वारसा.";

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
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
