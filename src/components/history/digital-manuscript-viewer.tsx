"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  Share2, 
  Sparkles,
  Info,
  Check,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ManuscriptPage {
  id: string;
  pageNumber: number;
  title: string;
  image: string;
  transcription: string;
  meaning: string;
  date: string;
  dimensions: string;
  medium: string;
}

interface Manuscript {
  id: string;
  title: string;
  author: string;
  period: string;
  significance: string;
  pages: ManuscriptPage[];
}

const MANUSCRIPTS: Manuscript[] = [
  {
    id: "vivekasindhu",
    title: "विवेकसिंधू (Vivekasindhu)",
    author: "आद्यकवी मुकुंदराज (Mukundraj)",
    period: "१२ वे शतक (इ.स. ११८८, शक १११०)",
    significance: "मराठी भाषेतील उपलब्ध पहिला तात्त्विक व अभिजात आद्यग्रंथ. अंबाजोगाई नगरीत रचलेली अलौकिक साहित्यकृती.",
    pages: [
      {
        id: "vs-1",
        pageNumber: 1,
        title: "पत्र १: मंगलाचरण व ग्रंथारंभ (Invocation & Opening Folio)",
        image: "/images/real/library_vintage_books.png",
        transcription: "॥ श्री गणेशाय नमः ॥ ॥ विवेकसिंधु ॥ मुकुंदराज कृत ॥ यथार्थ वस्तु निर्निमित्त ॥ सच्चिदानंद पद अव्यक्त ॥ सत्यन्यकतास्वनम्सगुह्त...",
        meaning: "श्रीगणेशाला नमन करून आद्यकवी मुकुंदराज यांनी मराठीत अध्यात्म व तात्त्विक चिंतनाचा हा आद्यग्रंथ रचला. सर्व सृष्टीचे मूळ कारण असलेल्या सच्चिदानंद तत्त्वाचे यथार्थ निरूपण येथे केले आहे.",
        date: "१२ वे शतक",
        dimensions: "२८ सेंमी × १६ सेंमी",
        medium: "हस्तनिर्मित भूर्जपत्र व काळी वनस्पती शाई (Aged Birch Bark & Herbal Carbon Ink)"
      },
      {
        id: "vs-2",
        pageNumber: 2,
        title: "पत्र २: सच्चिदानंद स्वरूप व श्रीयंत्र रेखाटन (Spiritual Yantra Folio)",
        image: "/images/real/library_window.png",
        transcription: "२ विवेकसिंधू ॥ जीवा:: जीव्व: आत्मानामलावकांदाधदारालाबनसेनानं... सच्चिदानंद पद अव्यक्त ॥ यथार्थ वागवार्वमि ॥",
        meaning: "जीव आणि शिव यांच्या अभेद नात्याचे अलौकिक विवेचन. मध्यभागी काढलेले पवित्र श्रीयंत्र ध्यानधारणेसाठी अत्यंत दुर्लभ मानले जाते.",
        date: "१२ वे शतक",
        dimensions: "२८ सेंमी × १६ सेंमी",
        medium: "भूर्जपत्र, हिंगूळ व काजळ शाई (Cinnabar Vermilion & Mineral Ink)"
      }
    ]
  },
  {
    id: "dasopant-pasodi",
    title: "दासोपंत पासोडी (Dasopant Pasodi)",
    author: "संत दासोपंत (Sant Dasopant, Ambajogai)",
    period: "१६ वे शतक (इ.स. १५५१–१६१५)",
    significance: "जगातील एकमेव ४० फूट लांबीचे वस्त्र हस्तलिखित! कापडावर काढलेली चक्रव्यूहाकार तत्त्वज्ञानाची चित्रे व ओव्या.",
    pages: [
      {
        id: "dp-1",
        pageNumber: 1,
        title: "पासोडी आरंभ पत्र: अद्वैत तत्त्वज्ञान वस्त्रपट (Sacred Cloth Scroll Opening)",
        image: "/images/real/library_cupboards.png",
        transcription: "॥ दासोपंत पसोडी ॥ उसोनंग पसोडी वस्तररूपन ऐसी समजा उ नये... यथार्थ निरूपण ॥",
        meaning: "४० फूट लांब व ४ फूट रुंद अशा हाताने विणलेल्या कापडावर सूक्ष्म हस्ताक्षरात आणि नैसर्गिक रंगांत काढलेले हे अद्भूत हस्तलिखित आहे.",
        date: "१६ वे शतक",
        dimensions: "४० फूट लांब वस्त्रपट (प्रदर्शित भाग)",
        medium: "हस्तनिर्मित सुती वस्त्र, वनस्पती व खनिज रंग (Handwoven Cotton & Mineral Pigments)"
      }
    ]
  }
];

export function DigitalManuscriptViewer() {
  const [selectedManuscriptIndex, setSelectedManuscriptIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const currentManuscript = MANUSCRIPTS[selectedManuscriptIndex];
  const currentPage = currentManuscript.pages[currentPageIndex] || currentManuscript.pages[0];

  const handleNextPage = () => {
    if (currentPageIndex < currentManuscript.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    const text = `साहित्य निकेतन ग्रंथालयातील १२ व्या शतकातील दुर्मीळ हस्तलिखित '${currentManuscript.title}' ऑनलाइन उघडून पहा: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="w-full rounded-3xl border-2 border-[#D4A017]/40 bg-[#140407] text-[#FAF2E8] p-5 sm:p-8 shadow-2xl space-y-6">
      {/* Header & Manuscript Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#3A0F14] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E5B869] tracking-wider uppercase mb-1">
            <BookOpen className="w-4 h-4" />
            <span>डिजिटल हस्तलिखित वाचक</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-marathi-heading">
            {currentManuscript.title}
          </h3>
          <p className="text-xs text-stone-300 font-marathi-body mt-0.5">
            {currentManuscript.author} — {currentManuscript.period}
          </p>
        </div>

        {/* Manuscript Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#22070A] p-1.5 rounded-2xl border border-white/10 shrink-0">
          {MANUSCRIPTS.map((ms, idx) => (
            <button
              key={ms.id}
              onClick={() => {
                setSelectedManuscriptIndex(idx);
                setCurrentPageIndex(0);
                setIsZoomed(false);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-marathi-body",
                selectedManuscriptIndex === idx
                  ? "bg-[#800020] text-white shadow-md"
                  : "text-stone-300 hover:text-white"
              )}
            >
              {ms.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Flip Viewer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* The Realistic Manuscript Book Page (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#B8860B]/30 bg-[#120B0D] flex items-center justify-center group">
            {/* Ambient Leather / Velvet Museum Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

            {/* The Animated Page Flip Canvas */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentManuscript.id}-${currentPage.pageNumber}`}
                initial={{ rotateY: -15, opacity: 0, scale: 0.95 }}
                animate={{ rotateY: 0, opacity: 1, scale: isZoomed ? 1.35 : 1 }}
                exit={{ rotateY: 15, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "relative w-[92%] h-[90%] transition-transform duration-300 cursor-zoom-in",
                  isZoomed && "cursor-zoom-out z-30"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={currentPage.image}
                  alt={currentPage.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Realistic Page Spine Shadow Effect on Left */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

            {/* Zoom / Full View Controls Overlay */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-xl bg-black/70 hover:bg-black text-white/90 border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
            </div>

            {/* Page Flip Next / Prev Floating Arrows */}
            {currentManuscript.pages.length > 1 && (
              <>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPageIndex === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-[#800020] text-white border border-white/20 backdrop-blur-md transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer z-20"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPageIndex === currentManuscript.pages.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-[#800020] text-white border border-white/20 backdrop-blur-md transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer z-20"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Page Counter & Slider Pagination */}
          <div className="flex items-center justify-between w-full mt-3 px-1 text-xs text-stone-400">
            <span className="font-bold text-[#E5B869]">
              पान {currentPage.pageNumber} / {currentManuscript.pages.length}
            </span>
            <span className="text-[11px] text-stone-400">
              हस्तलिखित झूम करण्यासाठी चित्रावर क्लिक करा
            </span>
          </div>
        </div>

        {/* Scholarly Commentary & Transliteration Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 bg-[#1A1014] p-5 sm:p-6 rounded-2xl border border-[#332228]">
          <div>
            <span className="text-[11px] font-bold text-[#E5B869] block mb-1">
              मूळ हस्तलिखित मजकूर (Ancient Script Transliteration):
            </span>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs sm:text-sm text-[#FDE68A] leading-relaxed select-all">
              {currentPage.transcription}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-stone-300 block mb-1 font-marathi-body">
              मराठी भावार्थ व ऐतिहासिक महत्त्व:
            </span>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-marathi-body">
              {currentPage.meaning}
            </p>
          </div>

          {/* Archival Metadata Pills */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
            <div>
              <span className="text-stone-400 block">कालखंड:</span>
              <span className="font-bold text-white">{currentPage.date}</span>
            </div>
            <div>
              <span className="text-stone-400 block">माध्यम / साहित्य:</span>
              <span className="font-bold text-white">{currentPage.medium}</span>
            </div>
          </div>

          {/* 1-Click Share & Preservation Note */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#800020] text-white text-xs font-bold transition-all cursor-pointer border border-white/15"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>लिंक कॉपी झाली!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#E5B869]" />
                  <span>हस्तलिखित शेअर करा</span>
                </>
              )}
            </button>

            <span className="text-[10px] text-stone-400 text-right">
              साहित्य निकेतन अभिलेखागार
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
