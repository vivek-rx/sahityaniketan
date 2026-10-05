"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Navbar, 
  Footer,
  Breadcrumbs 
} from "@/components/layout";
import { 
  Landmark, 
  Camera, 
  BookOpen, 
  Newspaper, 
  GraduationCap, 
  Flame, 
  Search, 
  X, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  HeartHandshake, 
  Share2, 
  Sparkles,
  Layers,
  FileText
} from "lucide-react";
import { 
  AMBAJOGAI_CATEGORIES, 
  AMBAJOGAI_MEMORY_ITEMS, 
  AmbajogaiMemoryItem 
} from "@/lib/data/remembering-ambajogai";
import { useLanguage } from "@/context/language-context";

export default function RememberingAmbajogaiPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeItem, setActiveItem] = useState<AmbajogaiMemoryItem | null>(null);

  const launchedCategories = AMBAJOGAI_CATEGORIES.filter((c) => c.isLaunched);
  const plannedCategories = AMBAJOGAI_CATEGORIES.filter((c) => !c.isLaunched);

  // Filter items
  const filteredItems = AMBAJOGAI_MEMORY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.categoryId === selectedCategory;
    const matchesSearch = 
      searchQuery === "" ||
      item.titleMarathi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summaryMarathi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationMarathi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.era.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] font-marathi-body transition-colors">
        
        {/* =================================================================
            1. PAGE BANNER (Editorial Heritage Letterpress Styling)
           ================================================================= */}
        <section className="relative overflow-hidden py-14 sm:py-18 bg-gradient-to-b from-[#800020] via-[#5C0017] to-[#120B0D] text-white border-b border-[#B8860B]/40">
          <div className="absolute inset-0 bg-[radial-gradient(#B8860B_0.5px,transparent_0.5px)] [background-size:26px_26px] opacity-15 pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
            <div className="flex justify-center">
              <Breadcrumbs variant="transparent" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-marathi-heading text-white leading-tight">
              अंबाजोगाईच्या ऐतिहासिक स्मृती
            </h1>

            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-stone-200 font-medium leading-relaxed">
              जुनी छायाचित्रे, ऐतिहासिक वृत्तपत्रे, प्राचीन वास्तू, साहित्यिक आणि लोकचळवळींचा जिवंत वारसा. केवळ ग्रंथालयापुरते मर्यादित न राहता संपूर्ण अंबाजोगाईचा डिजिटल ज्ञानवारसा.
            </p>

            {/* In-Page Quick Stats */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E5B869]" />
                <span>{AMBAJOGAI_MEMORY_ITEMS.length}+ ऐतिहासिक नोंदी</span>
              </span>
              <span>•</span>
              <span>स्थापना १ ऑगस्ट १९४५</span>
              <span>•</span>
              <span>शुक्रवार पेठ, अंबाजोगाई</span>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. FILTER BAR & SEARCH (Tactile, Crisp)
           ================================================================= */}
        <section className="sticky top-16 z-30 bg-[#FAF8F5]/95 dark:bg-[#120B0D]/95 backdrop-blur-md border-b border-[#E5DDD0] dark:border-[#332228] py-3 shadow-2xs">
          <div className="section flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#800020] text-white shadow-xs"
                    : "bg-white dark:bg-[#1E1418] text-stone-700 dark:text-stone-300 border border-[#E5DDD0] dark:border-[#332228] hover:border-[#800020]"
                }`}
              >
                सर्व दालने ({AMBAJOGAI_MEMORY_ITEMS.length})
              </button>

              {launchedCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#800020] text-white shadow-xs"
                      : "bg-white dark:bg-[#1E1418] text-stone-700 dark:text-stone-300 border border-[#E5DDD0] dark:border-[#332228] hover:border-[#800020]"
                  }`}
                >
                  {cat.titleMarathi}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="स्मृतींमध्ये शोधा..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] text-xs text-stone-800 dark:text-stone-200 focus:outline-hidden focus:border-[#800020] dark:focus:border-[#E5B869]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* =================================================================
            3. MAIN ARCHIVAL GALLERY GRID (Strict Animation Rules)
           ================================================================= */}
        <section className="section py-10 sm:py-14">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1E1418] rounded-3xl border border-[#E5DDD0] dark:border-[#332228] p-8">
              <FileText className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <h3 className="font-marathi-heading text-lg font-bold">कोणतीही नोंद सापडली नाही</h3>
              <p className="text-xs text-stone-500 mt-1">कृपया शोध शब्द बदलून पहा किंवा सर्व दालने निवडा.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                सर्व नोंदी पहा
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] hover:border-[#800020] dark:hover:border-[#E5B869] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Archival Image Frame */}
                    <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                      <Image
                        src={item.image}
                        alt={item.titleMarathi}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#800020]/90 text-white text-[11px] font-bold border border-white/20 backdrop-blur-2xs shadow-xs">
                        {item.era}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#1E1418]/95 text-[10px] font-semibold text-stone-700 dark:text-stone-300 border border-[#E5DDD0] dark:border-[#332228] truncate shadow-xs">
                        📍 {item.locationMarathi}
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                        <span>{item.archiveReference}</span>
                        <span className="text-[#800020] dark:text-[#E5B869] font-sans font-bold">
                          तपशील पहा
                        </span>
                      </div>

                      <h3 className="font-marathi-heading text-lg font-bold text-stone-900 dark:text-[#FAF2E8] group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors">
                        {item.titleMarathi}
                      </h3>

                      <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed line-clamp-3">
                        {item.summaryMarathi}
                      </p>

                      {/* Tag badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] font-medium text-stone-600 dark:text-stone-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card bottom bar */}
                  <div className="p-4 pt-0 border-t border-transparent text-[11px] font-bold text-[#800020] dark:text-[#E5B869] flex items-center justify-end">
                    <span>संपूर्ण संदर्भ वाचा</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =================================================================
            4. GROWING ARCHITECTURE: PLANNED SECTIONS & COMMUNITY INVITATION
           ================================================================= */}
        <section className="section pb-16">
          <div className="rounded-3xl bg-[#F3ECE3]/80 dark:bg-[#1A1014] border border-[#E5DDD0] dark:border-[#332228] p-7 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <h2 className="font-marathi-heading text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                  अंबाजोगाईच्या ऐतिहासिक आठवणींचे जतन व विस्तार
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                  हा प्रकल्प केवळ ग्रंथालयापुरता मर्यादित नसून, अंबाजोगाईच्या प्रत्येक पैलूला एकत्र आणणारे व्यासपीठ आहे. खालील दालने पुढील टप्प्यात उपलब्ध करून दिली जात आहेत:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {plannedCategories.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] flex items-start gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#B8860B] mt-1.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          {c.titleMarathi}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">
                          {c.descriptionMarathi}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citizen Contribution Box */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#800020] dark:text-[#E5B869]">
                  <HeartHandshake className="w-4 h-4" />
                  <span>आपल्या आठवणींचे योगदान द्या</span>
                </div>
                <h3 className="font-marathi-heading text-base font-bold text-stone-900 dark:text-white">
                  आपल्याकडे जुनी छायाचित्रे अथवा पत्रे आहेत का?
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  अंबाजोगाईच्या ऐतिहासिक वारशाचे रक्षण करण्यासाठी आपले जुने कौटुंबिक अल्बम किंवा दस्तऐवज ग्रंथालयात स्कॅन करून परत मिळवा.
                </p>
                <Link
                  href="/contact?subject=ambajogai-heritage-donation"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>ग्रंथालयाशी संपर्क साधा</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================================
            5. ARCHIVAL DETAIL INSPECTION MODAL
           ================================================================= */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] shadow-2xl p-6 sm:p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#800020] dark:text-[#E5B869] mb-2">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{activeItem.era} • {activeItem.locationMarathi}</span>
                </div>

                <h2 className="font-marathi-heading text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-4">
                  {activeItem.titleMarathi}
                </h2>

                {/* Plate View */}
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-[#E5DDD0] dark:border-[#332228] mb-5">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.titleMarathi}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/80 text-white text-xs font-mono">
                    {activeItem.archiveReference}
                  </div>
                </div>

                {/* Detailed Summary */}
                <div className="space-y-3.5 text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-marathi-body">
                  <p className="font-semibold text-stone-900 dark:text-white">
                    {activeItem.summaryMarathi}
                  </p>

                  {activeItem.historicalContextMarathi && (
                    <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#160E11] border-l-4 border-[#800020] dark:border-[#E5B869]">
                      <span className="font-bold text-[#800020] dark:text-[#E5B869] block mb-1">
                        ऐतिहासिक संदर्भ:
                      </span>
                      {activeItem.historicalContextMarathi}
                    </div>
                  )}

                  {activeItem.curatorNoteMarathi && (
                    <p className="text-stone-600 dark:text-stone-400 italic">
                      <span className="font-bold not-italic">अभिलेखागार नोंद: </span>
                      {activeItem.curatorNoteMarathi}
                    </p>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-[#E5DDD0] dark:border-[#332228] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400">
                    साहित्य निकेतन ग्रंथालय, अंबाजोगाई
                  </span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold cursor-pointer"
                  >
                    बंद करा
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  );
}
