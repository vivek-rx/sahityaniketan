"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Landmark, Scroll, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function HeritageFreedomWall() {
  const { language } = useLanguage();

  return (
    <section className="section py-12 sm:py-16">
      {/* Container with Clean Linen Background & Modern Borders */}
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#FFF9F2] via-[#FDF5EB] to-[#F7EDE0] dark:from-[#1E0508] dark:via-[#190305] dark:to-[#120204] border-2 border-[#E0CDB8] dark:border-[#4A1017] shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (7 cols): Historical Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-white leading-tight">
              निजामशाहीविरुद्धचा लढा आणि <br className="hidden sm:inline" />
              <span className="text-[#991B1B] dark:text-[#E8B830]">साहित्य निकेतनची</span> ऐतिहासिक स्थापना
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 font-marathi-body">
              १९४५ च्या सुमारास मराठवाडा हैद्राबादच्या निजामाच्या राजवटीत खितपत पडला होता. मराठी भाषा, मराठी शाळा आणि वाचनालयांवर निजामाच्या कडक बंदीचे सावट होते. अशा अत्यंत बिकट आणि संघर्षाच्या काळात, अंबाजोगाईतील स्वातंत्र्यसैनिकांनी व मराठीप्रेमी राष्ट्रभक्तांनी लोकमान्य टिळक पुण्यतिथीचे औचित्य साधून <strong>१ ऑगस्ट १९४५</strong> रोजी भूमिगत प्रेरणेतून <strong>&apos;साहित्य निकेतन&apos;</strong> ची स्थापना केली.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-stone-200 dark:border-neutral-800 shadow-xs">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Scroll className="h-4 w-4 text-[#991B1B] dark:text-[#E8B830]" />
                  <h4 className="font-marathi-heading text-sm font-bold text-stone-900 dark:text-white">
                    आद्यकवि मुकुंदराज (११८८)
                  </h4>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-marathi-body leading-normal">
                  मराठी भाषेतील आद्यग्रंथ &apos;विवेकसिंधू&apos; ची रचना अंबाजोगाईच्या पवित्र भूमीत झाली. ग्रंथालयात या परंपरेचे दुर्मिळ मुकुंदराज संदर्भ जतन आहेत.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-stone-200 dark:border-neutral-800 shadow-xs">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Landmark className="h-4 w-4 text-[#991B1B] dark:text-[#E8B830]" />
                  <h4 className="font-marathi-heading text-sm font-bold text-stone-900 dark:text-white">
                    संत दासोपंत व मोडी लिपी
                  </h4>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-marathi-body leading-normal">
                  जगातील सर्वात मोठी ४० फुटी कापडी &apos;पासोडी&apos; आणि अठराव्या शतकातील पेशवेकालीन मोडी कागदपत्रांचे ऐतिहासिक संदर्भ दालन.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#881337] hover:bg-[#72102E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>{language === "en" ? "80 Years of History & Photos" : "८० वर्षांचा संपूर्ण इतिहास व छायाचित्रे"}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                {language === "en" ? "Govt. Recognized Class 'A' Public Library (Reg. No. 45)" : "महाराष्ट्र शासन वर्ग 'अ' सार्वजनिक ग्रंथालय (नोंदणी क्र. ४५)"}
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Manuscript Facsimile Card */}
          <div className="lg:col-span-5 relative">
            <div
              className="rounded-2xl p-6 sm:p-7 shadow-2xl border-2 border-[#D9C4A5] text-stone-900 relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, #F8EFE0 0%, #EDE0C8 100%),
                  repeating-linear-gradient(45deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 2px, transparent 2px, transparent 4px)
                `,
                boxShadow: "0 15px 35px -5px rgba(0,0,0,0.25), inset 0 0 25px rgba(160, 120, 70, 0.2)",
              }}
            >
              {/* Manuscript header */}
              <div className="text-center pb-3 border-b-2 border-[#C0392B]/40 mb-4">
                <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-widest font-marathi-heading">
                  ॥ आद्यकवि मुकुंदराज विवेकसिंधू वचनामृत ॥
                </span>
                <p className="text-[10px] text-stone-600 font-semibold mt-0.5">
                  अंबाजोगाई भूमी — शके १११० (इ.स. ११८८)
                </p>
              </div>

              {/* Classical Verse Inscription */}
              <blockquote className="my-4 text-center px-2 py-3 bg-[#FFFDF7] rounded-xl border border-[#D9C4A5] shadow-inner">
                <p className="font-marathi-heading text-base sm:text-lg font-bold leading-relaxed text-stone-900">
                  &ldquo;मराठीया बोलिया कौतुके । <br />
                  परी अमृतातेही पैजा जिंके । <br />
                  ऐसी अक्षरे रसिके । मेळवीन ॥&rdquo;
                </p>
                <footer className="mt-2 text-xs font-bold text-[#881337]">
                  — ज्ञानेश्वर महाराज व मुकुंदराज विवेकसिंधू परंपरा
                </footer>
              </blockquote>

              {/* Photo of Historic Plaque */}
              <div className="relative rounded-xl overflow-hidden h-40 border border-stone-300 shadow-md my-4">
                <Image
                  src="/images/real/library_inauguration_plaque.png"
                  alt="साहित्य निकेतन उद्घाटन शिलालेख व ऐतिहासिक दस्तऐवज"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                  <p className="text-white text-[11px] font-bold">
                    साहित्य निकेतन ऐतिहासिक वास्तू शिलालेख — शुक्रवार पेठ, अंबाजोगाई
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-stone-700 border-t border-stone-300">
                <span>३९,९५३ मुद्रित ग्रंथ</span>
                <span className="text-[#991B1B]">सार्वजनिक वाचन सेवा (१९४५ ते २०२६)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
