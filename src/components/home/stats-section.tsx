"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { FramerStatsSection, type StatItemData } from "@/components/ui/framer-stats-section";
import { useAnimeScroll } from "@/hooks/use-anime-scroll";
import { Award, BookOpen, Clock, Landmark, ArrowRight, ShieldCheck } from "lucide-react";

/**
 * StatsSection — Authentic Archival Heritage Monument & Library Statistics.
 * Replaces the stark typographic void with an authentic, museum-grade heritage showcase
 * featuring the real 1945 foundation plaque, official government recognition, and high-impact stats.
 */
export function StatsSection() {
  const { language } = useLanguage();
  const sectionRef = useAnimeScroll<HTMLElement>("fade-up", { threshold: 0.08, duration: 800 });

  const isEn = language === "en";
  const isHi = language === "hi";

  const badgeText = isEn
    ? "Govt. Recognized Class 'A' Public Library • Est. 1945"
    : isHi
    ? "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त • स्थापना: १ अगस्त १९४५"
    : "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त • स्थापना: १ ऑगस्ट १९४५";

  const headline = isEn
    ? "80 Years of Heritage: From Nizam Rule to the Digital Era"
    : isHi
    ? "८० वर्षों का गौरवशाली इतिहास: मुक्ति संग्राम से डिजिटल युग तक"
    : "८० वर्षांची ज्ञानतपस्या: हैदराबाद मुक्ती संग्रामापासून डिजिटल युगापर्यंत";

  const narrative = isEn
    ? "Founded on 1 August 1945 during the oppressive Nizam regime by visionary patriots to safeguard the Marathi language, democratic dialogue, and historical literature. Today, Sahitya Niketan stands as an accredited Grade 'A' cultural beacon, preserving rare 12th-century manuscripts alongside state-of-the-art competitive exam facilities."
    : isHi
    ? "हैदराबाद रियासत के दमनकारी दौर में १ अगस्त १९४५ को देशभक्त विचारकों द्वारा मराठी भाषा, संस्कृति और स्वतंत्रता के विचारों के संरक्षण हेतु स्थापित। आज साहित्य निकेतन ३९,९५३ पंजीकृत ग्रंथों, १२वीं सदी की प्राचीन पाण्डुलिपियों और आधुनिक अध्ययनशालाओं के साथ कार्यरत है।"
    : "हैदराबाद संस्थानातील पारतंत्र्यात मराठी भाषा, संस्कृती आणि साहित्याचे रक्षण करण्यासाठी देशभक्त विचारवंतांनी १ ऑगस्ट १९४५ रोजी ग्रंथालयाची स्थापना केली. आज ३९,९५३ मुद्रित ग्रंथ, १२ व्या शतकातील आद्यकवी मुकुंदराजकालीन दुर्मीळ हस्तलिखिते, मोडी लिपी सनदा आणि वातानुकूलित अभ्यासिका दालनांसह ग्रंथालय निरंतर सेवारत आहे.";

  const libraryStats: StatItemData[] = [
    {
      value: 39953,
      suffix: "+",
      label: isEn ? "Catalogued Volumes" : isHi ? "पंजीकृत मुद्रित पुस्तकें" : "नोंदणीकृत ग्रंथसंपदा",
      sublabel: isEn ? "Marathi, Sanskrit, Hindi, English" : isHi ? "४ समृद्ध भाषांमध्ये" : "मराठी, संस्कृत, हिंदी व इंग्रजी",
    },
    {
      value: 80,
      suffix: "+",
      label: isEn ? "Years of Continuous Service" : isHi ? "वर्षों का अविरत इतिहास" : "वर्षे अखंड ज्ञानसेवा",
      sublabel: isEn ? "Founded 1 August 1945" : isHi ? "स्थापना: १ अगस्त १९४५" : "स्थापना: १ ऑगस्ट १९४५",
    },
    {
      value: 1200,
      suffix: "+",
      label: isEn ? "Active Members & Scholars" : isHi ? "नियमित वाचक व अभ्यासक" : "सक्रिय सभासद व वाचक",
      sublabel: isEn ? "Daily Study Hall Users" : isHi ? "प्रतियोगी परीक्षा अभ्यर्थी" : "अभ्यासिका व संदर्भ वाचक",
    },
    {
      value: 1188,
      prefix: isEn ? "CE " : "शके ",
      label: isEn ? "Rare Manuscripts Heritage" : isHi ? "प्राचीन पाण्डुलिपि संग्रह" : "आद्यग्रंथ हस्तलिखिते",
      sublabel: isEn ? "Mukundraj & Modi Script" : isHi ? "मुकुंदराज व मोडी सनदा" : "विवेकसिंधू व मोडी सनदा",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 bg-[#F8F5EE] dark:bg-[#141210] border-y border-amber-950/15 dark:border-amber-500/15 overflow-hidden transition-colors font-marathi-body"
    >
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="section max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Archival Showcase Card */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-2xl sm:rounded-3xl border border-stone-300/80 dark:border-zinc-800 shadow-[0_12px_40px_-15px_rgba(40,24,12,0.12)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] overflow-hidden p-6 sm:p-8 lg:p-10 mb-10 sm:mb-12">
          
          {/* Top Seal & Accredited Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200 dark:border-zinc-800">
            <div className="inline-flex items-center gap-2 text-[#800020] dark:text-amber-300 text-xs sm:text-sm font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#800020] dark:text-amber-400 shrink-0" />
              <span>{badgeText}</span>
            </div>

            <div className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-medium">
              <Landmark className="w-3.5 h-3.5 text-[#800020] dark:text-amber-500" />
              <span>अंबाजोगाई, जि. बीड (महाराष्ट्र)</span>
            </div>
          </div>

          {/* Main Heritage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-8">
            
            {/* Left Column: Authentic 1945 Foundation Plaque Photo */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border-2 border-stone-200 dark:border-zinc-700 shadow-md aspect-4/3 bg-stone-100 dark:bg-zinc-800">
                <Image
                  src="/images/real/library_inauguration_plaque.webp"
                  alt="साहित्य निकेतन मूळ स्थापना शिलालेख - १ ऑगस्ट १९४५"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
                
                {/* Vintage vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Historical Tag */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#800020]/90 backdrop-blur-xs text-[11px] font-bold tracking-wider uppercase mb-1">
                    {isEn ? "Historic Foundation Inscription" : "मूळ स्थापना शिलालेख"}
                  </span>
                  <p className="text-xs text-stone-200 font-medium leading-snug">
                    {isEn ? "Unveiled on 1 August 1945 at Ambajogai" : "१ ऑगस्ट १९४५ रोजी अनावरण झालेली ऐतिहासिक कोनशिला"}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Brass Marks */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#800020] pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#800020] pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#800020] pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#800020] pointer-events-none" />
            </div>

            {/* Right Column: Narrative & Archival Credentials */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#800020] dark:text-amber-400 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>१९४५ — २०२६ : गौरवशाली ८० वर्षे</span>
              </div>

              <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight mb-4">
                {headline}
              </h2>

              <p className="font-marathi-body text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-6 font-normal">
                {narrative}
              </p>

              {/* Credential Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/80">
                  <BookOpen className="w-4 h-4 text-[#800020] dark:text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {isEn ? "39,953+ Registered Volumes" : "३९,९५३+ नोंदणीकृत ग्रंथसंग्रह"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/80">
                  <Award className="w-4 h-4 text-[#800020] dark:text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {isEn ? "12th Century Ancient Manuscripts" : "१२व्या शतकातील आद्यग्रंथ व मोडी सनदा"}
                  </span>
                </div>
              </div>

              {/* Action Link */}
              <div>
                <Link
                  href="/history"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#800020] hover:bg-[#6b0f1a] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                >
                  <span>{isEn ? "Read the Complete 80-Year History" : "८० वर्षांचा संपूर्ण इतिहास व दस्तऐवज वाचा"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* ── 4 KEY HERITAGE STATISTICS (FRAMED ELEGANT CARDS) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {libraryStats.map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-amber-900/30 dark:hover:border-amber-500/30 transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#800020] dark:text-amber-400 tracking-tight mb-2 group-hover:scale-105 transition-transform">
                {stat.prefix || ""}
                {language === "en"
                  ? stat.value.toLocaleString("en-IN")
                  : stat.value.toLocaleString("mr-IN")}
                {stat.suffix || ""}
              </div>

              <div className="font-marathi-heading text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-100 mb-1 leading-snug">
                {stat.label}
              </div>

              {stat.sublabel && (
                <div className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {stat.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default StatsSection;
