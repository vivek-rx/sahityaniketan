"use client";

import React from "react";
import { Newspaper, Clock, Bell, BookOpen, FileText, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const NEWSPAPERS = [
  { name: "लोकमत", edition: "मराठवाडा विशेष आवृत्ती", arrival: "सकाळी ६:४५", tag: "सर्वाधिक वाचक" },
  { name: "सकाळ", edition: "बीड - छत्रपती संभाजीनगर", arrival: "सकाळी ७:००", tag: "विभागीय" },
  { name: "लोकसत्ता", edition: "संपादकीय व चतुरंग पुरवणी", arrival: "सकाळी ७:१५", tag: "साहित्य/विचार" },
  { name: "तरुण भारत", edition: "मराठवाडा आवृत्ती", arrival: "सकाळी ७:००", tag: "नियमित" },
  { name: "सामना", edition: "दैनिक आवृत्ती", arrival: "सकाळी ७:२०", tag: "नियमित" },
  { name: "पुण्यनगरी", edition: "मराठवाडा विभाग", arrival: "सकाळी ७:१०", tag: "नियमित" },
  { name: "दिव्य मराठी", edition: "दैनिक अंक", arrival: "सकाळी ७:२५", tag: "विशेष पुरवणी" },
  { name: "The Indian Express", edition: "National Edition", arrival: "सकाळी ७:३०", tag: "English" },
];

export function PhysicalNoticeBoard() {
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#120B0D] border-t border-[#E5DDD0] dark:border-[#332228] font-marathi-body transition-colors">
      <div className="section">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#800020] dark:text-[#E5B869] uppercase tracking-wider mb-1">
              {language === "en" ? "Daily Notices & Periodicals" : "दैनिक ग्रंथालय फलक व सूचना"}
            </p>
            <h2 className="font-marathi-heading text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-[#FAF2E8]">
              {language === "en" ? "Notice Board & Daily Periodicals Hall" : "साहित्य निकेतन सूचना फलक व वर्तमानपत्र दालन"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium mt-1">
              {language === "en"
                ? "Official circulars, daily quote, and arrival schedule of daily newspapers."
                : "अधिकृत वाचनालय परिपत्रके, आजचा सुविचार व दैनिक वर्तमानपत्र वाचक दालन."}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] text-xs font-semibold text-stone-700 dark:text-stone-300 shadow-2xs">
            <Clock className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
            <span>{language === "en" ? "Daily Hours: 8:00 AM – 8:30 PM" : "दैनिक वेळ: सकाळी ८:०० ते रात्री ८:३०"}</span>
          </div>
        </div>

        {/* Main Editorial Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* LEFT PANEL (7 Cols): Official Institutional Circular */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] p-6 sm:p-7 shadow-2xs">
            <div>
              {/* Institution Letterhead Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100 dark:border-[#2D1B22] mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#800020]/10 text-[#800020] dark:bg-[#E5B869]/15 dark:text-[#E5B869] text-[11px] font-bold border border-[#800020]/15 dark:border-[#E5B869]/30">
                      <ShieldCheck className="h-3 w-3" />
                      <span>{language === "en" ? "Class 'A' Library" : "वर्ग 'अ' ग्रंथालय"}</span>
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                      {language === "en" ? "Reg. No. 45 (Est. 1 August 1945)" : "नोंदणी क्र. ४५ (स्थापना: १ ऑगस्ट १९४५)"}
                    </span>
                  </div>
                  <h3 className="font-marathi-heading text-lg sm:text-xl font-bold text-stone-900 dark:text-[#FAF2E8] mt-1.5">
                    साहित्य निकेतन सार्वजनिक वाचनालय, अंबाजोगाई
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    शुक्रवार पेठ, अंबाजोगाई (जि. बीड) — वाचन सत्र २०२६
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 bg-[#FAF8F5] dark:bg-[#160E11] px-3 py-1.5 rounded-xl border border-[#E5DDD0] dark:border-[#332228]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">परिपत्रक क्र.</span>
                  <span className="text-xs font-bold text-[#800020] dark:text-[#E5B869] font-mono">सानिग्रं/२०२६/०४</span>
                </div>
              </div>

              {/* Circular Title */}
              <div className="mb-4">
                <span className="inline-block text-xs font-bold text-[#800020] dark:text-[#E5B869] uppercase tracking-wide">
                  वाचकांसाठी अधिकृत नियमावली व सूचना
                </span>
                <h4 className="font-marathi-heading text-base sm:text-lg font-bold text-stone-900 dark:text-[#FAF2E8] mt-0.5">
                  ग्रंथ देवाण-घेवाण, वाचन मुदत व दालन शिस्त
                </h4>
              </div>

              {/* Guidelines List */}
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300 font-marathi-body">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#160E11] border border-[#E5DDD0] dark:border-[#332228]">
                  <CheckCircle2 className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-stone-900 dark:text-[#FAF2E8]">१४ दिवसांची वाचन मुदत:</strong> सर्व सभासदांना एका वेळी घेतलेले पुस्तक कमाल <strong>१४ दिवसांच्या</strong> मुदतीत परत करणे आवश्यक आहे.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#160E11] border border-[#E5DDD0] dark:border-[#332228]">
                  <CheckCircle2 className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-stone-900 dark:text-[#FAF2E8]">दुर्मिळ हस्तलिखिते व संदर्भ ग्रंथ:</strong> आद्यकवि मुकुंदराज हस्तलिखिते, संत दासोपंत पसोडी व संदर्भ विश्वकोश केवळ ग्रंथालय दालनातच वाचनासाठी उपलब्ध आहेत.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#160E11] border border-[#E5DDD0] dark:border-[#332228]">
                  <CheckCircle2 className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-stone-900 dark:text-[#FAF2E8]">वातानुकूलित अभ्यासिका दालन:</strong> स्पर्धा परीक्षा अभ्यासिका सकाळी ६:०० ते रात्री १०:०० पर्यंत अखंड सुरू असून शांतता राखणे बंधनकारक आहे.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Note with Authority Info */}
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-[#2D1B22] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                <span>मध्यवर्ती वाचन दालन, शुक्रवार पेठ, अंबाजोगाई</span>
              </div>
              <div className="font-semibold text-stone-700 dark:text-stone-300">
                आदेशानुसार: मुख्य ग्रंथपाल, साहित्य निकेतन
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (5 Cols): Thought of the Day & Periodicals */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* 1. आजचा सुविचार — Clean Heritage Maroon Block */}
            <div className="rounded-2xl p-6 bg-[#800020] text-white shadow-2xs relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>सुविचार फलक</span>
                  </div>
                  <span className="text-[11px] font-mono text-white/70">
                    दैनिक विचार
                  </span>
                </div>

                <blockquote className="my-2 text-center">
                  <p className="font-marathi-heading text-base sm:text-lg font-bold leading-relaxed text-white">
                    &ldquo;पुस्तके वाचणे म्हणजे केवळ माहिती गोळा करणे नव्हे, तर स्वतःच्या बुद्धीला व संस्कृतीला पंख देणे होय.&rdquo;
                  </p>
                  <footer className="mt-2 text-xs font-semibold text-amber-200 font-marathi-body">
                    — आद्यकवी मुकुंदराज (विवेकसिंधू रचनाकार, अंबाजोगाई)
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* 2. दैनिक वर्तमानपत्र दालन — Clean Modern Schedule Grid */}
            <div className="flex-1 rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-[#2D1B22] mb-3">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                  <h4 className="font-marathi-heading text-base font-bold text-stone-900 dark:text-[#FAF2E8]">
                    दैनिक वर्तमानपत्र दालन
                  </h4>
                </div>
                <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-full">
                  सर्व नागरिकांसाठी खुले
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {NEWSPAPERS.map((paper, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#160E11] border border-[#E5DDD0] dark:border-[#332228] flex items-center justify-between transition-colors hover:bg-stone-100 dark:hover:bg-[#25181E]"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-stone-900 dark:text-[#FAF2E8] truncate">{paper.name}</p>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{paper.edition}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#800020] dark:text-[#E5B869] shrink-0 font-mono bg-white dark:bg-[#1E1418] px-1.5 py-0.5 rounded border border-[#E5DDD0] dark:border-[#332228]">
                      {paper.arrival}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 dark:border-[#2D1B22] flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                <span>तळमजला वृत्तपत्र वाचन दालन (३५ दैनिके)</span>
                <span className="text-[#800020] dark:text-[#E5B869] font-bold">सर्व नागरिकांसाठी खुले</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
