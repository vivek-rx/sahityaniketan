"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar, Footer, PageHeader, Breadcrumbs } from "@/components/layout";
import { InspiringJourneySection } from "@/components/history/inspiring-journey-section";
import { BeforeAfterSlider } from "@/components/history/before-after-slider";
import { DigitalManuscriptViewer } from "@/components/history/digital-manuscript-viewer";
import { VoiceOfEldersPlayer } from "@/components/history/voice-of-elders-player";
import { ScrollTimeline } from "@/components/history/scroll-timeline";
import { RareBookFeatureCard } from "@/components/history/rare-book-feature-card";
import { 
  History, 
  BookOpen, 
  Sparkles, 
  Mic, 
  Layers, 
  Users, 
  Clock, 
  MapPin, 
  Compass,
  Award
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function HistoryPage() {
  const { language } = useLanguage();

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] min-h-screen transition-colors font-marathi-body selection:bg-[#800020] selection:text-white">
        {/* =================================================================
            1. PAGE BANNER HEADER (Authentic Marathi Archives Background)
           ================================================================= */}
        <section className="relative overflow-hidden py-14 sm:py-20 bg-zinc-950 text-white border-b border-zinc-800">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src="/images/real/marathi_books_display.png"
              alt="Historical Marathi Books Archives"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_35%] scale-[1.02] opacity-85 dark:opacity-80"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/60" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
            <div className="flex justify-center">
              <Breadcrumbs variant="glass" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-marathi-heading text-white leading-tight drop-shadow-sm">
              {language === "en" ? "Sahitya Niketan: Historical Journey" : "साहित्य निकेतन ग्रंथालय: ऐतिहासिक वाटचाल"}
            </h1>

            <p className="max-w-3xl mx-auto text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
              {language === "en"
                ? "Founded on 1 August 1945 during the Hyderabad liberation movement, preserving 39,953 volumes and 12th-century rare manuscripts."
                : "हैदराबाद मुक्ती संग्रामाच्या काळात १ ऑगस्ट १९४५ रोजी स्थापन झालेले हे ग्रंथालय आज ३९,९५३ मुद्रित ग्रंथांचे व १२ व्या शतकातील दुर्मीळ हस्तलिखितांचे अधिकृत केंद्र आहे."}
            </p>

            {/* Quick Section Anchor Navigation */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <a
                href="#inspiring-journey"
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 transition-colors border border-amber-500/30 font-bold"
              >
                {language === "en" ? "Founding Chronicle (Original)" : "आमचा प्रेरणादायी प्रवास (मूळ दस्तऐवज)"}
              </a>
              <a
                href="#timeline"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#800020] text-white transition-colors border border-white/15"
              >
                {language === "en" ? "Chronological Timeline" : "ऐतिहासिक कालक्रम"}
              </a>
              <a
                href="#manuscript-viewer"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              >
                {language === "en" ? "Rare Manuscripts" : "दुर्मीळ हस्तलिखिते"}
              </a>
              <a
                href="#before-after"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              >
                {language === "en" ? "Evolution (1945 & Today)" : "वास्तू स्थित्यंतर (१९४५ व आज)"}
              </a>
              <a
                href="#voice-of-elders"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#800020] text-white transition-colors border border-white/15"
              >
                {language === "en" ? "Voices of Elders (Audio)" : "ज्येष्ठांचे बोल (ध्वनीमुद्रण)"}
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. SECTION: आमचा प्रेरणादायी प्रवास: साहित्य निकेतन, अंबाजोगाई (ORIGINAL DOCUMENT)
           ================================================================= */}
        <div id="inspiring-journey" className="scroll-mt-16">
          <InspiringJourneySection />
        </div>

        {/* =================================================================
            2. SECTION: DIGITAL MANUSCRIPT VIEWER (Rare Manuscripts Reader)
           ================================================================= */}
        <section id="manuscript-viewer" className="py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-marathi-heading text-stone-900 dark:text-white">
              ऐतिहासिक व दुर्मीळ हस्तलिखित संग्रह
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              आद्यकवी मुकुंदराज रचित 'विवेकसिंधू' आणि संत दासोपंत यांची 'पासोडी' या मूळ हस्तलिखित प्रतींचे शास्त्रोक्त डिजिटल स्वरूप.
            </p>
          </div>

          <DigitalManuscriptViewer />
        </section>

        {/* =================================================================
            3. SECTION: BEFORE / AFTER ARCHIVAL SLIDER (Building 1945 vs Today)
           ================================================================= */}
        <section id="before-after" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F3ECE3]/80 dark:bg-[#160E11] border-y border-[#E5DDD0] dark:border-[#332228]">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-marathi-heading text-stone-900 dark:text-white">
                १९४५ ची मूळ वास्तू आणि आजची ग्रंथालय इमारत
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                शुक्रवार पेठेतील ऐतिहासिक दगडी वास्तूत स्थापन झालेल्या ग्रंथालयाचा आजचा आधुनिक विस्तार.
              </p>
            </div>

            <BeforeAfterSlider />
          </div>
        </section>

        {/* =================================================================
            4. SECTION: VOICE OF ELDERS (Oral History Audio Player)
           ================================================================= */}
        <section id="voice-of-elders" className="py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-marathi-heading text-stone-900 dark:text-white">
              संस्थापक व ज्येष्ठ मार्गदर्शकांचे ध्वनीमुद्रित विचार
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              हैदराबाद मुक्ती लढा, वाचन चळवळ आणि ग्रंथालयाच्या स्थापनेची माहिती ज्येष्ठ पदाधिकाऱ्यांच्या मुखातून.
            </p>
          </div>

          <VoiceOfEldersPlayer />
        </section>

        {/* =================================================================
            5. SECTION: SCROLL-DRIVEN TIMELINE (Decade Markers & Ken Burns)
           ================================================================= */}
        <section id="timeline" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F3ECE3]/80 dark:bg-[#160E11] border-y border-[#E5DDD0] dark:border-[#332228]">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-marathi-heading text-stone-900 dark:text-white">
                १९४५ ते आज: ग्रंथालय कालक्रम
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                प्रत्येक दशकातील ऐतिहासिक टप्पे, शासकीय वर्ग 'अ' मान्यता आणि ग्रंथालयाचा विस्तार.
              </p>
            </div>

            <ScrollTimeline />
          </div>
        </section>

        {/* =================================================================
            6. SECTION: RARE BOOK STORY OF THE WEEK (Facebook & WhatsApp Circulation)
           ================================================================= */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-marathi-heading text-stone-900 dark:text-white">
              ग्रंथालयातील वैशिष्ट्यपूर्ण दुर्मीळ ग्रंथ
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              साहित्य निकेतनच्या अभिलेखागारातील ऐतिहासिक व दुर्मीळ ग्रंथांचा परिचय व संदर्भ.
            </p>
          </div>

          <RareBookFeatureCard />
        </section>

      </main>
      <Footer />
    </>
  );
}
