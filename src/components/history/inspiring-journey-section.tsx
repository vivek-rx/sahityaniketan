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
  const isHi = language === "hi";

  // Hindi display strings for chapter chrome not carried in the archival data file.
  const HI_TITLES: Record<string, string> = {
    foundation: "स्थापना: एक उदात्त विचार का जन्म",
    objective: "हमारा उद्देश्य: साहित्य से समाज परिवर्तन",
    "early-works": "प्रारंभिक कार्य: नींव के वर्ष",
    "struggle-for-space": "स्थान का संघर्ष और पुस्तकालय का विकास",
    "modern-building": "नवीन भवन और वर्तमान स्थिति",
    "trustees-governance": "संस्था और न्यासी मंडल",
    "accreditation-recognition": "शासकीय मान्यता और सम्मान",
  };

  const EN_YEARS: Record<string, string> = {
    foundation: "1945",
    objective: "Mission & Objectives",
    "early-works": "1945 – 1955",
    "struggle-for-space": "1958 – 1992",
    "modern-building": "1995 – Present",
    "trustees-governance": "Registered 1962 – Present",
    "accreditation-recognition": "1963 – Present",
  };

  const HI_YEARS: Record<string, string> = {
    objective: "ध्येय एवं उद्देश्य",
    "trustees-governance": "पंजीकरण १९६२ – वर्तमान",
  };

  const EN_HIGHLIGHTS: Record<string, string[]> = {
    foundation: [
      "Founded 1 August 1945 (pre-Independence era)",
      "Motto: 'Ek Hriday Ho Bharat Janani'",
      "Born of the freedom struggle and civic awakening",
      "Led by idealistic local youth",
    ],
    objective: [
      "Comprehensive advancement of Indian literature & culture",
      "Conservation of ancient, oriental & modern books",
      "Reference access for scholars & researchers",
      "Regular honours for distinguished readers",
    ],
    "early-works": [
      "Launch of the public reading hall & library",
      "Classes under Hindi Prachar Sabha, Hyderabad",
      "Selfless contribution of devoted teachers",
      "Built on nominal honorary honorariums",
    ],
    "struggle-for-space": [
      "1958: Municipal Council allots Plot No. 127 in Bhaji Mandai",
      "Funds raised through the concert of legendary vocalist Manik Varma",
      "1986: Relocation to the permanent Bhaji Mandai premises",
      "1992: Amicable settlement & grand central hall",
    ],
    "modern-building": [
      "1995-96: Two-storey building via Minister Jaysingrao Gaikwad's grant",
      "Wings split: Children's & Women's halls and the main reference stacks",
      "2017-18: Fully equipped modern auditorium on the second floor",
      "39,953+ printed volumes & rare manuscripts preserved",
    ],
    "trustees-governance": [
      "Reg. No.: BHR/3/1962 (Societies Registration Act, 1860)",
      "First trustees: E. M. Kulkarni, B. S. Lohia, C. B. Gupta",
      "Current trustees: Dr. Sharad Habakar, Ramchandra Sanbar, Bhaskarrao Dharmapale",
      "Democratic & transparent institutional governance",
    ],
    "accreditation-recognition": [
      "1963-64: Official Taluka Library government recognition",
      "1968: Founding of the District Library Association in Ambajogai",
      "Government of Maharashtra Grade 'A' public library status",
      "81+ years of unbroken knowledge service",
    ],
  };

  const HI_HIGHLIGHTS: Record<string, string[]> = {
    foundation: [
      "स्थापना १ अगस्त १९४५ (स्वाधीनता-पूर्व काल)",
      "ध्येय वाक्य: 'एक हृदय हो भारत जननी'",
      "स्वाधीनता आंदोलन एवं लोकजागृति की प्रेरणा से जन्म",
      "ध्येयवादी स्थानीय युवाओं का नेतृत्व",
    ],
    objective: [
      "भारतीय साहित्य एवं संस्कृति का सर्वांगीण उत्थान",
      "प्राचीन, पौर्वात्य एवं अर्वाचीन ग्रंथों का संरक्षण",
      "विद्वानों एवं शोधकर्ताओं के लिए संदर्भ उपलब्धता",
      "उत्कृष्ट पाठकों का नियमित सम्मान",
    ],
    "early-works": [
      "सार्वजनिक वाचनालय एवं ग्रंथालय की शुरुआत",
      "हिन्दी प्रचार सभा, हैदराबाद के अंतर्गत कक्षाएं",
      "समर्पित शिक्षकों का निःस्वार्थ योगदान",
      "अल्प मानदेय में पुस्तकालय का निर्माण",
    ],
    "struggle-for-space": [
      "१९५८: नगर परिषद द्वारा सब्जी मंडी का प्लॉट क्र. १२७ आवंटन",
      "प्रख्यात गायिका माणिक वर्मा के कार्यक्रम से निधि संकलन",
      "१९८६: स्थायी परिसर में पुस्तकालय का स्थानांतरण",
      "१९९२: समझौता एवं केंद्रीय सभागृह निर्माण",
    ],
    "modern-building": [
      "१९९५-९६: सहकार मंत्री जयसिंगराव गायकवाड के निधि से दो मंजिला भवन",
      "विभाजन: बाल एवं महिला विभाग तथा मुख्य संदर्भ दीर्घा",
      "२०१७-१८: द्वितीय तल पर सुसज्जित आधुनिक सभागृह",
      "३९,९५३+ मुद्रित ग्रंथों एवं दुर्लभ हस्तलिखितों का संरक्षण",
    ],
    "trustees-governance": [
      "पंजीकरण सं.: BHR/3/1962 (सोसायटीज रजिस्ट्रेशन एक्ट, १८६०)",
      "प्रथम न्यासी: ई. एम. कुलकर्णी, बी. एस. लोहिया, सी. बी. गुप्त",
      "वर्तमान न्यासी: डॉ. शरद हबाकर, रामचंद्र संबर, भास्करराव धर्मपाळे",
      "लोकतांत्रिक एवं पारदर्शी संस्थागत प्रबंधन",
    ],
    "accreditation-recognition": [
      "१९६३-६४: आधिकारिक तालुका पुस्तकालय शासकीय मान्यता",
      "१९६८: अंबाजोगाई में जिला पुस्तकालय संघ की स्थापना",
      "महाराष्ट्र शासन वर्ग 'अ' सार्वजनिक पुस्तकालय दर्जा",
      "८१+ वर्षों की अविरत ज्ञान सेवा",
    ],
  };

  const { chapters, registration, motto, foundingMembers, earlyTeachers } = OFFICIAL_LIBRARY_HISTORY;

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
      {/* ── SECTION HEADER & MOTTO PLAQUE ── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#800020] dark:text-amber-400 uppercase">
          {isEn
            ? `Official Archival Records • Reg. No. ${registration.regNumber}`
            : isHi
              ? `आधिकारिक ऐतिहासिक दस्तावेज • पंजीकरण सं. ${registration.regNumber}`
              : `अधिकृत ऐतिहासिक दस्तऐवज • नोंदणी क्र. ${registration.regNumber}`}
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-marathi-heading text-stone-900 dark:text-white leading-tight">
          {isEn
            ? OFFICIAL_LIBRARY_HISTORY.mainHeadingEn
            : isHi
              ? "हमारी प्रेरक यात्रा: साहित्य निकेतन, अंबाजोगाई"
              : OFFICIAL_LIBRARY_HISTORY.mainHeading}
        </h2>

        {/* Founding Motto Inscription Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#800020]/5 via-amber-500/5 to-transparent border border-[#800020]/20 dark:border-amber-500/20 text-center relative overflow-hidden my-6">
          <Quote className="w-10 h-10 text-[#800020]/15 dark:text-amber-400/15 absolute -top-1 -left-1" />
          <p className="text-xs uppercase tracking-widest font-bold text-[#800020] dark:text-amber-400 mb-1">
            {isEn ? "The Founding Motto (1945)" : isHi ? "संस्था का मूल ध्येय वाक्य (१९४५)" : "संस्थेचे मूळ ब्रीदवाक्य"}
          </p>
          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-marathi-heading text-stone-900 dark:text-amber-100">
            “{isEn ? motto.en : motto.mr}”
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-xl mx-auto">
            {isEn
              ? "Laying the foundation of public awareness, social reform, and patriotic unity through literature."
              : isHi
                ? "साहित्य के माध्यम से जनजागृति, सामाजिक सुधार एवं राष्ट्रीय एकता को सुदृढ़ करने वाला प्रकाशपुंज।"
                : "साहित्याच्या माध्यमातून लोकजागृती, सामाजिक सुधारणा आणि राष्ट्रीय एकात्मता दृढ करणारा दीपस्तंभ."}
          </p>
        </div>
      </div>

      {/* ── 7 AUTHENTIC CHRONICLE CHAPTERS ── */}
      <div className="space-y-12 sm:space-y-16">
        {chapters.map((chapter, idx) => {
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
                      {isEn
                        ? EN_YEARS[chapter.id] ?? chapter.yearRange
                        : isHi
                          ? HI_YEARS[chapter.id] ?? chapter.yearRange
                          : chapter.yearRange}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-marathi-heading text-stone-900 dark:text-white">
                      {isEn ? chapter.titleEn : isHi ? HI_TITLES[chapter.id] ?? chapter.title : chapter.title}
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
                      {isEn
                        ? "Key Historical Takeaways:"
                        : isHi
                          ? "प्रमुख ऐतिहासिक संदर्भ:"
                          : "महत्त्वाचे ऐतिहासिक संदर्भ:"}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300">
                      {(isEn
                        ? EN_HIGHLIGHTS[chapter.id] ?? chapter.keyHighlights
                        : isHi
                          ? HI_HIGHLIGHTS[chapter.id] ?? chapter.keyHighlights
                          : chapter.keyHighlights
                      ).map((hl, i) => (
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
                      alt={isEn ? chapter.titleEn : isHi ? HI_TITLES[chapter.id] ?? chapter.title : chapter.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 inset-x-3 text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{isEn ? chapter.titleEn : isHi ? HI_TITLES[chapter.id] ?? chapter.title : chapter.title}</span>
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
            {isEn ? registration.actEn : registration.act} (
            {isEn ? "Reg. No." : isHi ? "पंजीकरण सं." : "नोंदणी क्र."}{" "}
            {registration.regNumber})
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-marathi-heading">
            {isEn
              ? "Board of Trustees & Leadership Legacy"
              : isHi
                ? "न्यासी मण्डल एवं मार्गदर्शक धरोहर"
                : "विश्वस्त मंडळ व मार्गदर्शक वारसा"}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            {isEn
              ? "Guided by legendary pioneers in 1962 and sustained by distinguished public trustees today."
              : isHi
                ? "१९६२ के प्रथम न्यासी मण्डल की मजबूत नींव पर आज की अखंड ज्ञानपरम्परा निरंतर सेवारत है।"
                : "१९६२ मधील पहिल्या विश्वस्त मंडळाने रचलेल्या पायावर आजची अखंड ज्ञानपरंपरा दिमाखात कार्यरत आहे."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
          {/* First Trustees */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>
                {isEn
                  ? "First Trustees (1962)"
                  : isHi
                    ? "प्रथम न्यासी मण्डल (१९६२)"
                    : "पहिले विश्वस्त मंडळ (१९६२)"}
              </span>
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
              <span>
                {isEn
                  ? "Current Board of Trustees"
                  : isHi
                    ? "वर्तमान न्यासी मण्डल"
                    : "विद्यमान विश्वस्त मंडळ"}
              </span>
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
            <span className="text-amber-300 font-bold block mb-1">
              {isEn
                ? "Pioneering Youth Founders (1945):"
                : isHi
                  ? "स्थापना के ध्येयवादी युवा (१९४५):"
                  : "स्थापनेतील ध्येयवादी तरुण (१९४५):"}
            </span>
            <span className="leading-relaxed">
              {foundingMembers.join(" • ")}
            </span>
          </div>
          <div>
            <span className="text-amber-300 font-bold block mb-1">
              {isEn
                ? "Early Dedicated Teachers (Honorary Service):"
                : isHi
                  ? "प्रारंभिक समर्पित शिक्षक (अल्प मानदेय सेवा):"
                  : "प्रारंभीचे समर्पित शिक्षक (अल्प मानधन सेवा):"}
            </span>
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
