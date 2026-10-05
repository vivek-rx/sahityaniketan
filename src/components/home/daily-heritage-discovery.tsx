"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scroll, 
  BookOpen, 
  Clock, 
  RotateCw, 
  Sparkles, 
  X, 
  ShieldCheck, 
  MapPin, 
  ExternalLink,
  FileText
} from "lucide-react";
import { 
  DAILY_HERITAGE_ITEMS, 
  getDailyDiscoveryItem, 
  DailyHeritageItem 
} from "@/lib/data/daily-heritage-discovery";
import { useLanguage } from "@/context/language-context";

export function DailyHeritageDiscovery() {
  const { language } = useLanguage();
  const [offset, setOffset] = useState(0);
  const [item, setItem] = useState<DailyHeritageItem>(() => getDailyDiscoveryItem(0));
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Pick deterministic item on mount, can be rotated with button
  useEffect(() => {
    setItem(getDailyDiscoveryItem(offset));
  }, [offset]);

  const handleNextItem = () => {
    setIsRotating(true);
    setIsUnfolded(false);
    setOffset((prev) => prev + 1);
    setTimeout(() => setIsRotating(false), 500);
  };

  const getIcon = (type: DailyHeritageItem["type"]) => {
    switch (type) {
      case "archive_letter":
        return <Scroll className="w-4 h-4 text-[#800020] dark:text-[#E5B869]" />;
      case "rare_book":
        return <BookOpen className="w-4 h-4 text-[#800020] dark:text-[#E5B869]" />;
      case "on_this_day":
        return <Clock className="w-4 h-4 text-[#800020] dark:text-[#E5B869]" />;
    }
  };

  return (
    <section className="relative py-10 sm:py-12 bg-[#F3ECE3]/80 dark:bg-[#191013] border-t border-[#E5DDD0] dark:border-[#332228] font-marathi-body transition-colors overflow-hidden">
      <div className="section relative z-10">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#800020]/10 dark:bg-[#E5B869]/15 border border-[#800020]/15 dark:border-[#E5B869]/30 text-xs font-bold text-[#800020] dark:text-[#E5B869]">
              <span className="text-base">{item.typeEmoji}</span>
              <span>
                {language === "en"
                  ? item.type === "archive_letter"
                    ? "Archival Letter"
                    : item.type === "rare_book"
                    ? "Rare Manuscript"
                    : "On This Day"
                  : item.typeLabelMarathi}
              </span>
            </div>
            <span className="text-xs text-stone-600 dark:text-stone-400 font-medium hidden sm:inline">
              {language === "en" ? "Daily Archival Discovery from Collection" : "अभिलेखागारातील दैनंदिन ऐतिहासिक संदर्भ"}
            </span>
          </div>

          {/* Interactive Next Discovery Button */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleNextItem}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#1E1418] hover:bg-[#800020] hover:text-white dark:hover:bg-[#E5B869] dark:hover:text-stone-950 text-stone-700 dark:text-stone-200 border border-[#E5DDD0] dark:border-[#332228] transition-all shadow-2xs active:scale-95 cursor-pointer"
              title={language === "en" ? "View another heritage item" : "पुढील दुर्मिळ ऐतिहासिक ठेवा पहा"}
            >
              <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isRotating ? "rotate-180" : ""}`} />
              <span>{language === "en" ? "Next Heritage Discovery" : "दुसरा ऐतिहासिक ठेवा पहा"}</span>
            </button>
          </div>
        </div>

        {/* Main Archival Showcase Card */}
        <div className="relative rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] shadow-2xs overflow-hidden transition-all">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-5 sm:p-7"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Visual Thumbnail */}
                <div className="lg:col-span-4 relative group">
                  <div className="relative h-48 sm:h-52 w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-[#E5DDD0] dark:border-[#332228]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.titleMarathi}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
                        <FileText className="w-12 h-12 stroke-1" />
                      </div>
                    )}
                    {/* Archival Era Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#120B0D]/85 backdrop-blur-xs text-[#FAF2E8] text-[10px] font-bold border border-white/20 shadow-xs">
                      {item.year}
                    </div>

                    {/* Shelf reference label */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#1E1418]/95 text-[10px] font-semibold text-stone-700 dark:text-stone-300 border border-[#E5DDD0] dark:border-[#332228] truncate shadow-xs">
                      📍 {item.shelfReference}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#800020] dark:text-[#E5B869]">
                      {item.typeLabelMarathi}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      {item.authorOrOriginMarathi}
                    </span>
                  </div>

                  <h3 className="font-marathi-heading text-xl sm:text-2xl font-bold text-stone-900 dark:text-[#FAF2E8] leading-snug">
                    {item.titleMarathi}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                    {item.subtitleMarathi}
                  </p>

                  {/* Letter / Manuscript Excerpt Quote */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#160E11] border-l-3 border-[#800020] dark:border-[#E5B869] text-xs sm:text-sm font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
                    {item.excerptMarathi}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsUnfolded(!isUnfolded)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      <Scroll className="w-3.5 h-3.5" />
                      <span>{isUnfolded ? "अभिलेख घडी घाला" : "📜 संपूर्ण दस्तऐवज उलगडा"}</span>
                    </button>

                    <Link
                      href={item.actionUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#1E1418] hover:bg-stone-50 dark:hover:bg-[#25181E] text-stone-800 dark:text-stone-200 text-xs font-bold border border-[#E5DDD0] dark:border-[#332228] transition-colors"
                    >
                      <span>{item.callToActionTextMarathi}</span>
                    </Link>
                  </div>
                </div>

              </div>

              {/* Document Unfolding Area */}
              <AnimatePresence>
                {isUnfolded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scaleY: 0.96 }}
                    animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                    exit={{ opacity: 0, height: 0, scaleY: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 pt-6 border-t border-dashed border-[#E5DDD0] dark:border-[#332228] overflow-hidden origin-top"
                  >
                    <div className="relative p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#160E11] border border-[#E5DDD0] dark:border-[#332228] font-serif">
                      
                      {/* Top Paper Header Stamp */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#E5DDD0] dark:border-[#332228] text-xs text-stone-500 dark:text-stone-400">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#800020] dark:text-[#E5B869]">
                            साहित्य निकेतन ऐतिहासिक अभिलेखागार
                          </span>
                          <span>•</span>
                          <span>{item.shelfReference}</span>
                        </div>
                        <div className="text-[11px] font-mono">
                          नोंदणी क्र. SN-ARCHIVE-{item.id.toUpperCase()}
                        </div>
                      </div>

                      {/* Letter / Manuscript Body Lines */}
                      <div className="space-y-3.5 text-stone-800 dark:text-stone-100 text-sm sm:text-base leading-relaxed">
                        {item.fullDocumentTextMarathi?.map((paragraph, idx) => (
                          <p key={idx} className="font-marathi-body">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Curator's Historical Note */}
                      <div className="mt-6 pt-4 border-t border-[#E5DDD0] dark:border-[#332228] text-xs text-stone-600 dark:text-stone-300 font-sans">
                        <span className="font-bold text-[#800020] dark:text-[#E5B869]">ऐतिहासिक संदर्भ नोंद: </span>
                        {item.historicalNoteMarathi}
                      </div>

                      {/* Close Unfold Button */}
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => setIsUnfolded(false)}
                          className="text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline cursor-pointer"
                        >
                          अभिलेख घडी घाला
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
