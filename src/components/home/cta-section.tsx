"use client";

import Link from "next/link";
import { BookOpen, UserCheck, ShieldCheck, FileText, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { NoiseBackground } from "@/components/ui/ambient-noise-background";
import { useAnimeScroll } from "@/hooks/use-anime-scroll";

/**
 * CTASection — Unified Heritage Call-to-Action before footer
 * Harmonized with the Sahitya Niketan Heritage Design System
 */
export function CTASection() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : language === "hi" ? "hi" : "mr";
  const sectionRef = useAnimeScroll<HTMLElement>("fade-up", { threshold: 0.12, duration: 750 });
  const buttonsRef = useAnimeScroll<HTMLDivElement>("stagger", { threshold: 0.2, delay: 300, staggerDelay: 120, duration: 600 });

  const content = {
    headline: {
      mr: "ग्रंथालय सभासदत्व व वाचक नोंदणी",
      hi: "ग्रन्थालय सदस्यता एवं पाठक पंजीकरण",
      en: "Library Membership & Reader Registration",
    },
    description: {
      mr: "साहित्य निकेतन सार्वजनिक वाचनालय व ग्रंथालयाचे सभासदत्व स्थानिक नागरिक, अभ्यासक व विद्यार्थ्यांसाठी खुले आहे. ग्रंथ देवाणघेवाण, संदर्भ कक्ष आणि अभ्यासिका सुविधेसाठी विहित नमुन्यात अर्ज करावा.",
      hi: "साहित्य निकेतन सार्वजनिक वाचनालय एवं ग्रन्थालय की सदस्यता नागरिकों, शोधार्थियों व छात्रों हेतु खुली है। ग्रन्थ वितरण, सन्दर्भ कक्ष एवं अध्ययन कक्ष सुविधा हेतु विहित प्रपत्र में आवेदन करें।",
      en: "Membership to Sahitya Niketan Public Library is open to citizens, researchers, and students. Submit the prescribed application for borrowing privileges, reference access, and reading room facilities.",
    },
    timing: {
      mr: "कार्यालयीन वेळ: सकाळी ८.०० ते रात्री ८.३०",
      hi: "कार्यालयीन समय: प्रातः ८.०० से रात्रि ८.३०",
      en: "Hours: 8:00 AM – 8:30 PM",
    },
    location: {
      mr: "पत्ता: शुक्रवार पेठ, अंबाजोगाई (जि. बीड)",
      hi: "पता: शुक्रवार पेठ, अंबाजोगाई (जि. बीड)",
      en: "Address: Shukrawar Peth, Ambajogai (Dist. Beed)",
    },
    btnMember: {
      mr: "सभासद वर्गणी व नियम",
      hi: "सदस्यता शुल्क व नियम",
      en: "Membership Rules & Fees",
    },
    btnCatalogue: {
      mr: "ग्रंथसूची शोधा",
      hi: "ग्रन्थ सूची खोजें",
      en: "Search Catalogue",
    },
  };

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 font-marathi-body transition-colors">
      <div className="section max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Clean Pavilion Card */}
        <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 sm:p-12 shadow-sm text-center">
          
          {/* Main Headline */}
          <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight mb-4">
            {content.headline[lang]}
          </h2>

          {/* Supporting Description */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            {content.description[lang]}
          </p>

          {/* Office Hours & Physical Address */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-8">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span>{content.timing[lang]}</span>
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span>{content.location[lang]}</span>
            </span>
          </div>

          {/* Call to Action Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer font-marathi-body"
            >
              <UserCheck className="w-4 h-4" />
              <span>{content.btnMember[lang]}</span>
            </Link>

            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm font-semibold border border-zinc-200 dark:border-zinc-700 transition-all shadow-xs font-marathi-body"
            >
              <BookOpen className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <span>{content.btnCatalogue[lang]}</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
