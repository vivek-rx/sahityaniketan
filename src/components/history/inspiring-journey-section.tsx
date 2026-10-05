"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { OFFICIAL_LIBRARY_HISTORY } from "@/lib/data/library-history-original";
import {
  BookOpen,
  Calendar,
  Award,
  Users,
  Building,
  CheckCircle2,
  Sparkles,
  Quote
} from "lucide-react";

export function InspiringJourneySection() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const { chapters, registration, motto, foundingMembers, earlyTeachers } = OFFICIAL_LIBRARY_HISTORY;

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
      {/* ── SECTION HEADER & MOTTO PLAQUE ── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#800020] dark:text-amber-400 uppercase">
          {isEn ? `Official Archival Records • Reg. No. ${registration.regNumber}` : `अधिकृत ऐतिहासिक दस्तऐवज • नोंदणी क्र. ${registration.regNumber}`}
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-marathi-heading text-stone-900 dark:text-white leading-tight">
          {isEn ? OFFICIAL_LIBRARY_HISTORY.mainHeadingEn : OFFICIAL_LIBRARY_HISTORY.mainHeading}
        </h2>

        {/* Founding Motto Inscription Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#800020]/5 via-amber-500/5 to-transparent border border-[#800020]/20 dark:border-amber-500/20 text-center relative overflow-hidden my-6">
          <Quote className="w-10 h-10 text-[#800020]/15 dark:text-amber-400/15 absolute -top-1 -left-1" />
          <p className="text-xs uppercase tracking-widest font-bold text-[#800020] dark:text-amber-400 mb-1">
            {isEn ? "The Founding Motto (1945)" : "संस्थेचे मूळ ब्रीदवाक्य"}
          </p>
          <div className="text-2xl sm:text-3xl md:text-4xl font-black font-serif italic text-stone-900 dark:text-amber-100">
            “{isEn ? motto.en : motto.mr}”
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-xl mx-auto">
            {isEn
              ? "Laying the foundation of public awareness, social reform, and patriotic unity through literature."
              : "साहित्याच्या माध्यमातून लोकजागृती, सामाजिक सुधारणा आणि राष्ट्रीय एकात्मता दृढ करणारा दीपस्तंभ."}
          </p>
        </div>
      </div>

      {/* ── 7 AUTHENTIC CHRONICLE CHAPTERS ── */}
      <div className="space-y-12 sm:space-y-16">
        {chapters.map((chapter, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <article
              key={chapter.id}
              id={chapter.id}
              className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#1A1215] border border-stone-200/80 dark:border-stone-800 shadow-sm transition-all hover:shadow-md space-y-6"
            >
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#800020] text-white text-sm font-black">
                    {chapter.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                      {chapter.yearRange}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-marathi-heading text-stone-900 dark:text-white">
                      {isEn ? chapter.titleEn : chapter.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Grid: Narrative Text + Image & Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Content Story (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 font-marathi-body text-justify">
                    {isEn ? chapter.contentEn : chapter.content}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      {isEn ? "Key Historical Takeaways:" : "महत्त्वाचे ऐतिहासिक संदर्भ:"}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300">
                      {chapter.keyHighlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2 bg-stone-50 dark:bg-[#231A1E] p-2.5 rounded-xl border border-stone-100 dark:border-stone-800/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#800020] dark:bg-amber-400 shrink-0 mt-1.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Real Archival Photo (5 cols) */}
                {chapter.image && (
                  <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm aspect-4/3 w-full bg-stone-100 dark:bg-stone-900">
                    <Image
                      src={chapter.image}
                      alt={chapter.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 inset-x-3 text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{chapter.title}</span>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* ── GOVERNANCE & TRUSTEES CARD ── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-stone-800 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            {registration.act} (नोंदणी क्र. {registration.regNumber})
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-marathi-heading">
            {isEn ? "Board of Trustees & Leadership Legacy" : "विश्वस्त मंडळ व मार्गदर्शक वारसा"}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            {isEn
              ? "Guided by legendary pioneers in 1962 and sustained by distinguished public trustees today."
              : "१९६२ मधील पहिल्या विश्वस्त मंडळाने रचलेल्या पायावर आजची अखंड ज्ञानपरंपरा दिमाखात कार्यरत आहे."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
          {/* First Trustees */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>{isEn ? "First Trustees (1962)" : "पहिले विश्वस्त मंडळ (१९६२)"}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-200">
              {(isEn ? registration.firstTrusteesEn : registration.firstTrustees).map((t, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Trustees */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Users className="w-5 h-5" />
              <span>{isEn ? "Current Board of Trustees" : "विद्यमान विश्वस्त मंडळ"}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-200">
              {(isEn ? registration.currentTrusteesEn : registration.currentTrustees).map((t, idx) => (
                <li key={idx} className="flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Founding Youth & Dedicated Teachers Memorial Strip */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-300">
          <div>
            <span className="text-amber-300 font-bold block mb-1">स्थापनेतील ध्येयवादी तरुण (१९४५):</span>
            <span className="leading-relaxed">
              {foundingMembers.join(" • ")}
            </span>
          </div>
          <div>
            <span className="text-amber-300 font-bold block mb-1">प्रारंभीचे समर्पित शिक्षक (अल्प मानधन सेवा):</span>
            <span className="leading-relaxed">
              {earlyTeachers.join(" • ")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InspiringJourneySection;
