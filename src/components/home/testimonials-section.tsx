"use client";

import React, { useState, useEffect, useMemo } from "react";
import { TestimonialPostPro, PostcardNote } from "@/components/ui/testimonial-post-pro";
import { useLanguage } from "@/context/language-context";
import { MessageSquareQuote } from "lucide-react";

const FALLBACK_POSTCARDS: PostcardNote[] = [
  {
    id: "test-1",
    name: "प्रा. डॉ. सदानंद मोरे",
    role: "ज्येष्ठ साहित्यिक व संशोधक",
    company: "महाराष्ट्र राज्य साहित्य व संस्कृती मंडळ",
    quote:
      "साहित्य निकेतन ग्रंथालयातील दुर्मीळ हस्तलिखितांचे दालन आणि आद्यकवी मुकुंदराजकालीन संदर्भ मराठवाड्याचा ऐतिहासिक ठेवा आहेत. संशोधकांसाठी हे ग्रंथालय अनमोल ज्ञानतीर्थ आहे.",
    caption: "दुर्मीळ हस्तलिखित दालन व संदर्भ कक्ष",
    postmark: "15 AUG 1945",
    imageUrl: "/images/real/marathi_books_display.png",
    cardColor: "#FFFDF5",
    stampTint: "#800020",
  },
  {
    id: "test-2",
    name: "प्रतीक कुलकर्णी",
    role: "तहसीलदार (महाराष्ट्र शासन महसूल)",
    company: "महाराष्ट्र शासन महसूल विभाग",
    quote:
      "साहित्य निकेतनच्या अभ्यासिका दालनात बसून मी सलग दोन वर्षे स्पर्धा परीक्षेचा अभ्यास केला. ग्रंथालयातील शांत वातावरण, संदर्भ ग्रंथांची उपलब्धता आणि अभ्यासकांची शिस्त यश मिळवून देण्यासाठी निर्णायक ठरली.",
    caption: "वातानुकूलित अभ्यासिका दालन",
    postmark: "26 JAN 1962",
    imageUrl: "/images/real/library_window.png",
    cardColor: "#F0F7F2",
    stampTint: "#1E4D38",
  },
  {
    id: "test-3",
    name: "डॉ. अलका जोशी",
    role: "मराठी भाषा अभ्यासक व लेखिका",
    company: "साहित्य निकेतन वाचक समिती",
    quote:
      "स्वातंत्र्यपूर्व काळापासून अविरत ज्ञानसेवा देणारे हे वर्ग 'अ' ग्रंथालय आहे. ३९ हजारांहून अधिक पुस्तकांचे समृद्ध दालन आणि वर्तमानपत्र वाचक कक्ष अंबाजोगाईच्या सांस्कृतिक जीवनाचा प्राण आहे.",
    caption: "३९,९५३+ मुद्रित ग्रंथ संपदा",
    postmark: "01 MAY 1975",
    imageUrl: "/images/real/library_vintage_books.png",
    cardColor: "#FFF4EC",
    stampTint: "#9C3A24",
  },
  {
    id: "test-4",
    name: "ॲड. सुधीर जोशी",
    role: "ज्येष्ठ आजीवन सभासद (४० वर्षे वाचक)",
    company: "अंबाजोगाई विधी व सांस्कृतिक परिषद",
    quote:
      "मी गेल्या चाळीस वर्षांपासून या ग्रंथालयाचा नियमित वाचक आहे. १९४५ पासूनची ग्रंथालयाची परंपरा नव्या पिढीने डिजिटल स्वरूपात जतन केली हे पाहून अत्यंत अभिमान वाटतो.",
    caption: "८० वर्षांची अखंड ज्ञानसेवा",
    postmark: "01 AUG 2020",
    imageUrl: "/images/real/library_cupboards.png",
    cardColor: "#EDF4FA",
    stampTint: "#1D3B64",
  },
];

interface TestimonialsSectionProps {
  initialTestimonials?: PostcardNote[];
}

export function TestimonialsSection({
  initialTestimonials,
}: TestimonialsSectionProps) {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";

  const [notes, setNotes] = useState<PostcardNote[]>(
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : FALLBACK_POSTCARDS
  );

  useEffect(() => {
    async function loadDynamic() {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (
          data.success &&
          Array.isArray(data.testimonials) &&
          data.testimonials.length > 0
        ) {
          const mapped: PostcardNote[] = data.testimonials.map((t: any, i: number) => ({
            id: t.id || `dyn-${i}`,
            name: t.name,
            role: t.role || t.designation || "वाचक",
            company: t.company || t.badge || "साहित्य निकेतन",
            quote: t.content || t.quote,
            caption: t.caption || t.name,
            postmark: t.postmark || `01 AUG ${1945 + i * 15}`,
            imageUrl: t.avatar || t.photo_url || FALLBACK_POSTCARDS[i % FALLBACK_POSTCARDS.length].imageUrl,
            cardColor: FALLBACK_POSTCARDS[i % FALLBACK_POSTCARDS.length].cardColor,
            stampTint: FALLBACK_POSTCARDS[i % FALLBACK_POSTCARDS.length].stampTint,
          }));
          setNotes(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic testimonials:", err);
      }
    }
    loadDynamic();
  }, []);

  return (
    <section className="relative py-16 sm:py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-b border-zinc-200 dark:border-zinc-800 transition-colors overflow-hidden select-none">
      <div className="section max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#800020] dark:text-amber-400 uppercase">
            {isEn ? "Community Testimonials" : isHi ? "पाठक विचार" : "वाचक व मान्यवर प्रतिक्रिया"}
          </p>

          <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white leading-tight">
            {isEn
              ? "Voices of Our Community"
              : isHi
              ? "साहित्य निकेतन के बारे में पाठकों के विचार"
              : "साहित्य निकेतनविषयी वाचकांचे मनोगत"}
          </h2>

          <p className="font-marathi-body text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto">
            {isEn
              ? "What scholars, competitive aspirants, and lifelong members say about their experience at Sahitya Niketan."
              : isHi
              ? "संशोधक, स्पर्धा परीक्षा अभ्यर्थी और आजीवन सदस्यों के अनुभव।"
              : "संशोधक, स्पर्धा परीक्षा अभ्यासक आणि ८० वर्षांच्या परंपरेतील आजीवन सभासदांचे वाचन अनुभव."}
          </p>
        </div>

        {/* ── TESTIMONIAL POST PRO COMPONENT (EXACT FRAMER POSTCARD REPLICA) ── */}
        <div className="flex justify-center w-full py-2">
          <TestimonialPostPro
            notes={notes}
            eyebrow={isEn ? "MEMBERS & SCHOLARS" : isHi ? "मान्यवर एवं पाठक" : "मान्यवर व वाचक"}
            heading={isEn ? "Archival Postcards" : isHi ? "ऐतिहासिक पत्र" : "वाचक अनुभव पत्र"}
            showHeading={false}
            showLedger={true}
            cardWidth={520}
            cardHeight={310}
            ledgerWidth={340}
            columnGap={44}
            accentColor="#713B4A"
            inkColor="#2B2118"
            paperColor="#FFFDF9"
            groundColor="transparent"
            flipLabel={isEn ? "Flip Card" : isHi ? "पत्र उलटें" : "पत्र उलटा"}
          />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
