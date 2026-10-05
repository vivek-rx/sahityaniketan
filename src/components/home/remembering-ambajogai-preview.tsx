"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Camera, 
  BookOpen, 
  Newspaper, 
  GraduationCap, 
  Sparkles,
  HeartHandshake,
  Layers,
  MapPin,
  Calendar
} from "lucide-react";
import { 
  AMBAJOGAI_CATEGORIES, 
  AMBAJOGAI_MEMORY_ITEMS 
} from "@/lib/data/remembering-ambajogai";
import { useLanguage } from "@/context/language-context";

export function RememberingAmbajogaiPreview() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const launchedCategories = AMBAJOGAI_CATEGORIES.filter((c) => c.isLaunched);
  const plannedCategories = AMBAJOGAI_CATEGORIES.filter((c) => !c.isLaunched);

  // Filter items based on active tab
  const displayedItems = activeTab === "all" 
    ? AMBAJOGAI_MEMORY_ITEMS.slice(0, 4) 
    : AMBAJOGAI_MEMORY_ITEMS.filter((item) => item.categoryId === activeTab);

  return (
    <section className="py-12 sm:py-16 bg-[#F3ECE3]/80 dark:bg-[#191013] border-t border-[#E5DDD0] dark:border-[#332228] font-marathi-body transition-colors">
      <div className="section">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 pb-6 border-b border-[#E5DDD0] dark:border-[#332228]">
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#800020] dark:text-[#E5B869] uppercase tracking-wider mb-1">
              {language === "en" ? "Archival Memory Vault" : "अभिलेख व स्मृती दालन"}
            </p>
            <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-[#FAF2E8] leading-tight">
              {language === "en" ? "Remembering Ambajogai" : "अंबाजोगाईच्या ऐतिहासिक स्मृती"}
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium mt-1.5 leading-relaxed">
              {language === "en"
                ? "Historical photographs, ancient town planning, and cultural chronicles from our archives."
                : "ऐतिहासिक छायाचित्रे, जुनी नगररचना, विस्मृतीत गेलेली वृत्तपत्रे आणि स्थानिक सांस्कृतिक संचिताचे डिजिटल अभिलेखागार."}
            </p>
          </div>

          <Link
            href="/ambajogai-smruti"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm active:scale-98"
          >
            <span>{language === "en" ? "Open Full Memory Vault" : "संपूर्ण स्मृती दालन उघडा"}</span>
          </Link>
        </div>

        {/* Category Switchers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#800020] text-white shadow-xs"
                : "bg-white dark:bg-[#1E1418] text-stone-700 dark:text-stone-300 border border-[#E5DDD0] dark:border-[#332228] hover:border-stone-400"
            }`}
          >
            {language === "en" ? `All Memories (${AMBAJOGAI_MEMORY_ITEMS.length})` : `सर्व आठवणी (${AMBAJOGAI_MEMORY_ITEMS.length})`}
          </button>

          {launchedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === cat.id
                  ? "bg-[#800020] text-white shadow-xs"
                  : "bg-white dark:bg-[#1E1418] text-stone-700 dark:text-stone-300 border border-[#E5DDD0] dark:border-[#332228] hover:border-stone-400"
              }`}
            >
              <span>{language === "en" ? cat.titleEnglish : cat.titleMarathi}</span>
              <span className="text-[10px] opacity-70">({cat.itemCount})</span>
            </button>
          ))}
        </div>

        {/* 4-Item Heritage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-300"
            >
              <div>
                {/* Image Mask Frame */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <Image
                    src={item.image}
                    alt={item.titleMarathi}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {/* Era pill */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#120B0D]/85 text-[#FAF2E8] text-[10px] font-bold border border-white/20 backdrop-blur-2xs">
                    {item.era}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                    <MapPin className="w-3 h-3 text-[#800020] dark:text-[#E5B869] shrink-0" />
                    <span className="truncate">{item.locationMarathi}</span>
                  </div>

                  <h3 className="font-marathi-heading text-base font-bold text-stone-900 dark:text-[#FAF2E8] group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors line-clamp-2">
                    {item.titleMarathi}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed line-clamp-3">
                    {item.summaryMarathi}
                  </p>
                </div>
              </div>

              {/* Card Footer: Shelf reference & Explore link */}
              <div className="p-4 pt-2 border-t border-stone-100 dark:border-[#2D1B22] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-stone-400 truncate max-w-[140px]">
                  {item.archiveReference}
                </span>
                <Link
                  href="/ambajogai-smruti"
                  className="font-bold text-[#800020] dark:text-[#E5B869] hover:underline inline-flex items-center gap-1"
                >
                  <span>वाचा</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Future Architecture Growing Strip */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#800020] dark:text-[#E5B869] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>पुढील टप्प्यातील दालने (आर्किटेक्चर विस्तार)</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                कलाकार, सामाजिक कार्यकर्ते, पारंपरिक उत्सव आणि लोकचळवळींचे दालन लवकरच डिजिटल संग्रहात समाविष्ट होत आहे.
              </p>
              
              {/* Planned category tags */}
              <div className="flex flex-wrap gap-2 mt-2.5">
                {plannedCategories.map((c) => (
                  <span
                    key={c.id}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#160E11] border border-[#E5DDD0] dark:border-[#332228] text-[11px] font-semibold text-stone-600 dark:text-stone-400"
                  >
                    • {c.titleMarathi}
                  </span>
                ))}
              </div>
            </div>

            {/* Community Contribution Invitation */}
            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/contact?subject=ambajogai-archives"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1E1418] border border-[#800020] dark:border-[#E5B869]/50 text-[#800020] dark:text-[#E5B869] text-xs font-bold hover:bg-[#800020] hover:text-white dark:hover:bg-[#E5B869] dark:hover:text-stone-950 transition-all shadow-2xs"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>आपल्याकडील जुनी छायाचित्रे सामायिक करा</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
