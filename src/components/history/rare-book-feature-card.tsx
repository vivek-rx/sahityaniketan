"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  BookOpen, 
  Sparkles, 
  Share2, 
  Check, 
  Bookmark, 
  Calendar, 
  ShieldCheck, 
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";
import { useLanguage } from "@/context/language-context";

interface RareBookFeatureCardProps {
  className?: string;
}

export function RareBookFeatureCard({ className }: RareBookFeatureCardProps) {
  const { language } = useLanguage();
  const idx = language === "en" ? 2 : language === "hi" ? 1 : 0;
  const pick = (t: [string, string, string]) => t[idx];
  const [copied, setCopied] = useState(false);

  const bookData = {
    title: "विवेकसिंधू (हस्तलिखित प्रत)",
    englishTitle: "Vivekasindhu (Original Manuscript Folios)",
    author: "आद्यकवी मुकुंदराज (Ambajogai)",
    accessionNo: "SNL-MSS-001/1188",
    year: "१२ वे शतक (इ.स. ११८८)",
    category: "अभिजात मराठी तत्त्वज्ञान व आद्यकाव्य",
    pages: "१,४०० ओव्या (दुर्मीळ भूर्जपत्र संग्रह)",
    status: "अभिलेखागार संदर्भ कक्षामध्ये उपलब्ध",
    image: "/images/real/library_vintage_books.png",
  };

  const shareText = pick([
    `📚 *साहित्य निकेतन ग्रंथालय, अंबाजोगाई — दुर्मीळ ग्रंथ मालिका*\n\n` +
      `📖 *${bookData.title}*\n` +
      `✍️ रचनाकार: ${bookData.author}\n` +
      `⏳ कालखंड: ${bookData.year} (८००+ वर्षे जुने)\n` +
      `🏛️ नोंदणी क्र.: ${bookData.accessionNo}\n\n` +
      `मराठीतील पहिला तत्त्वज्ञानाचा आद्यग्रंथ आता डिजिटल स्वरूपात पाहा व वाचा:\n${typeof window !== "undefined" ? window.location.href : `${SITE_URL}/history`}`,
    `📚 *साहित्य निकेतन पुस्तकालय, अंबाजोगाई — दुर्लभ ग्रंथ श्रृंखला*\n\n` +
      `📖 *${bookData.title}*\n` +
      `✍️ रचनाकार: ${bookData.author}\n` +
      `⏳ कालखंड: १२ वीं शताब्दी (ई. ११८८) (८००+ वर्ष पुराना)\n` +
      `🏛️ पंजीकरण सं.: ${bookData.accessionNo}\n\n` +
      `मराठी का पहला दार्शनिक आदिग्रंथ अब डिजिटल रूप में देखें और पढ़ें:\n${typeof window !== "undefined" ? window.location.href : `${SITE_URL}/history`}`,
    `📚 *Sahitya Niketan Public Library, Ambajogai — Rare Book Series*\n\n` +
      `📖 *${bookData.englishTitle}*\n` +
      `✍️ Author: Aadyakavi Mukundraj (Ambajogai)\n` +
      `⏳ Period: 12th Century (c. 1188 CE) (800+ years old)\n` +
      `🏛️ Accession No.: ${bookData.accessionNo}\n\n` +
      `The first philosophical treatise of the Marathi language, now viewable & readable in digital form:\n${typeof window !== "undefined" ? window.location.href : `${SITE_URL}/history`}`,
  ]);

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : `${SITE_URL}/history`)}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-[#B8860B]/40 bg-[#120B0D] text-[#FAF2E8] p-6 sm:p-8 shadow-2xl space-y-6 font-marathi-body select-none",
        className
      )}
    >
      {/* Top Banner Tag */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#332228] pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#800020] text-white text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
            {pick(["दुर्मीळ ग्रंथ मालिका (भाग १)", "दुर्लभ ग्रंथ श्रृंखला (भाग १)", "Rare Book Series (Part 1)"])}
          </span>
          <span className="text-xs text-[#E5B869] font-bold">
            {pick(["साहित्य निकेतन विशेष संग्रह", "साहित्य निकेतन विशेष संग्रह", "Sahitya Niketan Special Collections"])}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-stone-400">{pick(["नोंदणी क्र.:", "पंजीकरण सं.:", "Accession No.:"])}</span>
          <span className="font-mono text-xs font-bold text-[#E5B869] bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
            {bookData.accessionNo}
          </span>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Book Preview Image (5 Cols) */}
        <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#B8860B]/30 bg-black">
          <Image
            src={bookData.image}
            alt={bookData.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#B8860B]/50 text-[#E5B869] text-xs font-bold flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>{pick(["दुर्मीळ मूळ प्रत", "दुर्लभ मूल प्रति", "Rare Original Edition"])}</span>
          </div>
        </div>

        {/* Book Details (7 Cols) */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-marathi-heading">
              {bookData.title}
            </h3>
            <p className="text-xs text-stone-300 font-medium mt-0.5">
              {bookData.englishTitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-black/35 p-2.5 rounded-xl border border-white/5">
              <span className="text-stone-400 block text-[10px]">{pick(["ग्रंथकार:", "ग्रंथकार:", "Author:"])}</span>
              <span className="font-bold text-white text-xs">{bookData.author}</span>
            </div>
            <div className="bg-black/35 p-2.5 rounded-xl border border-white/5">
              <span className="text-stone-400 block text-[10px]">{pick(["कालखंड:", "कालावधि:", "Period:"])}</span>
              <span className="font-bold text-[#E5B869] text-xs">
                {pick(["१२ वे शतक (इ.स. ११८८)", "१२ वीं शताब्दी (ई. ११८८)", "12th Century (c. 1188 CE)"])}
              </span>
            </div>
            <div className="bg-black/35 p-2.5 rounded-xl border border-white/5">
              <span className="text-stone-400 block text-[10px]">{pick(["विषय:", "विषय:", "Subject:"])}</span>
              <span className="font-bold text-white text-xs">
                {pick(["अभिजात मराठी तत्त्वज्ञान व आद्यकाव्य", "उत्कृष्ट मराठी दर्शन एवं आदिकाव्य", "Classical Marathi Philosophy & Foundational Poetry"])}
              </span>
            </div>
            <div className="bg-black/35 p-2.5 rounded-xl border border-white/5">
              <span className="text-stone-400 block text-[10px]">{pick(["उपलब्धता स्थिती:", "उपलब्धता स्थिति:", "Availability:"])}</span>
              <span className="font-bold text-emerald-400 text-xs">
                {pick(["सुरक्षित जतन (संदर्भ कक्ष)", "सुरक्षित संरक्षण (संदर्भ कक्ष)", "Preserved (Reference Room)"])}
              </span>
            </div>
          </div>

          {/* Social Share Mechanics Strip */}
          <div className="pt-2 border-t border-[#332228] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* WhatsApp Share Button */}
              <button
                onClick={handleWhatsAppShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                title={pick(["व्हॉट्सॲपवर शेअर करा", "व्हाट्सऐप पर साझा करें", "Share on WhatsApp"])}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.125-.533-1.614-.672-2.651-2.316-2.73-2.423-.081-.107-.648-.864-.648-1.649 0-.786.409-1.173.555-1.332.146-.16.32-.2.426-.2.106 0 .213.002.306.007.098.005.23-.037.36.275.133.32.453 1.107.493 1.187.04.08.066.174.013.28-.053.107-.08.174-.16.267-.08.093-.168.208-.24.28-.08.08-.163.167-.07.327.093.16.415.685.89 1.108.613.546 1.13.715 1.29.795.16.08.253.067.346-.04.093-.107.4-.466.506-.626.107-.16.213-.133.36-.08.146.053.933.44 1.093.52.16.08.267.12.307.187.04.066.04.386-.104.792zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                <span>{pick(["व्हॉट्सॲपवर पाठवा", "व्हाट्सऐप पर भेजें", "Send via WhatsApp"])}</span>
              </button>

              {/* Facebook Share Button */}
              <button
                onClick={handleFacebookShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                title={pick(["फेसबुकवर शेअर करा", "फेसबुक पर साझा करें", "Share on Facebook"])}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>{pick(["फेसबुक", "फेसबुक", "Facebook"])}</span>
              </button>

              {/* Copy Share Text */}
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer border border-white/10"
                title={pick(["मजकूर कॉपी करा", "टेक्स्ट कॉपी करें", "Copy Share Text"])}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            <Link
              href="/catalogue?category=manuscripts"
              className="inline-flex items-center gap-1.5 text-xs text-[#E5B869] hover:underline font-bold"
            >
              <span>{pick(["सर्व दुर्मीळ ग्रंथ पहा", "सभी दुर्लभ ग्रंथ देखें", "Browse All Rare Books"])}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
