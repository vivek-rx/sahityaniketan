"use client";

import Link from "next/link";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { Users, Landmark, ArrowRight } from "lucide-react";
import { MotionSkeleton } from "@/components/ui/loader-skeleton";
import { TiltCard } from "@/components/ui/tilt-card";
import { useLanguage } from "@/context/language-context";

const TRUSTEES_DATA = [
  {
    name: "डॉ. शरद पांडुरंग हबाकर",
    nameEn: "Dr. Sharad Pandurang Habakar",
    role: "विश्वस्त",
    roleHi: "न्यासी",
    roleEn: "Trustee",
  },
  {
    name: "श्री. रामचंद्र नरसदासजी संबर",
    nameEn: "Shri Ramchandra Narasdasji Sanbar",
    role: "विश्वस्त",
    roleHi: "न्यासी",
    roleEn: "Trustee",
  },
  {
    name: "श्री. भास्करराव झुंडीरामजी धर्मपाळे",
    nameEn: "Shri Bhaskarrao Jhundiramji Dharmapale",
    role: "विश्वस्त",
    roleHi: "न्यासी",
    roleEn: "Trustee",
  },
];

const EXECUTIVE_COMMITTEE = [
  {
    name: "श्री. दत्तप्रसाद पांडुरंग रांदड़",
    nameEn: "Shri Dattaprasad Pandurang Randad",
    role: "अध्यक्ष",
    roleHi: "अध्यक्ष",
    roleEn: "President",
  },
  {
    name: "श्री. सुभाष हरिभाऊ देशपांडे",
    nameEn: "Shri Subhash Haribhau Deshpande",
    role: "उपाध्यक्ष",
    roleHi: "उपाध्यक्ष",
    roleEn: "Vice President",
  },
  {
    name: "श्री. शंतनु शंकरराव हिरळकर",
    nameEn: "Shri Shantanu Shankarrao Hiralkar",
    role: "कार्यवाह",
    roleHi: "कार्यवाह",
    roleEn: "Secretary",
  },
  {
    name: "श्री. कोस्तुभ श्रीराम कोदरकर",
    nameEn: "Shri Kostubh Shriram Kodarkar",
    role: "सहकार्यवाहक",
    roleHi: "सह-कार्यवाहक",
    roleEn: "Joint Secretary",
  },
  {
    name: "श्री. सूर्यकांत पंठरीनाथ कानडे",
    nameEn: "Shri Suryakant Pantharinath Kanade",
    role: "कोषाध्यक्ष",
    roleHi: "कोषाध्यक्ष",
    roleEn: "Treasurer",
  },
  {
    name: "ॲड. श्री. मकरंद माधवराव पत्की",
    nameEn: "Adv. Shri Makarand Madhavrao Patki",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    name: "श्री. विपीन माणिकराव खीरसागर",
    nameEn: "Shri Vipin Manikrao Kshirsagar",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    name: "श्री. अमोल शंकरराव जड",
    nameEn: "Shri Amol Shankarrao Jad",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    name: "श्री. ललितकुमार रामविलास बजाज",
    nameEn: "Shri Lalitkumar Ramvilas Bajaj",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    name: "ॲड. श्री. अक्षय प्रकाशराव खडके",
    nameEn: "Adv. Shri Akshay Prakashrao Khadke",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    name: "सौ. प्रतिभा दिपक देवळे",
    nameEn: "Mrs. Pratibha Deepak Devale",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    name: "सौ. मंजुषा प्रकाशराव कुलकर्णी",
    nameEn: "Mrs. Manjusha Prakashrao Kulkarni",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    name: "श्री. जितेंद्र अरविंद देशपांडे",
    nameEn: "Shri Jitendra Arvind Deshpande",
    role: "स्वीकृत सदस्य",
    roleHi: "स्वीकृत सदस्य",
    roleEn: "Nominated Member",
  },
  {
    name: "श्री. दत्तप्रसाद चिंतामणी गोस्वामी",
    nameEn: "Shri Dattaprasad Chintamani Goswami",
    role: "स्वीकृत सदस्य",
    roleHi: "स्वीकृत सदस्य",
    roleEn: "Nominated Member",
  },
];

export default function AboutPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="font-marathi-body bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors pb-24"
      >
        <PageHeader
          title={isEn ? "Executive Board & Trustees" : isHi ? "कार्यकारिणी एवं न्यासी मंडल" : "कार्यकारिणी व विश्वस्त मंडळ"}
          subtitle={
            isEn
              ? "Sahitya Niketan Public Library, Ambajogai (Term 2023–24 to 2028–29)"
              : isHi
              ? "साहित्य निकेतन सार्वजनिक पुस्तकालय, अंबाजोगाई (सत्र २०२३-२४ से २०२८-२९)"
              : "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई (सन २०२३-२४ ते २०२८-२९)"
          }
        />

        {/* =========================================================
            कार्यकारिणी व विश्वस्त मंडळ
            ========================================================= */}
        <section id="team" className="section py-12 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4">

            {/* ---- नोंदणी व विश्वस्त मंडळ ---- */}
            <div className="mt-4 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest block">
                  {isEn
                    ? "Societies Registration Act 1860 • Reg. No. BHR/3/1962"
                    : isHi
                    ? "सोसायटीज रजिस्ट्रेशन एक्ट १८६० • पंजीकरण सं. BHR/3/1962"
                    : "सोसायटीज रजिस्ट्रेशन ॲक्ट, १८६० • नोंदणी क्र. BHR/3/1962"}
                </span>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-marathi-heading">
                  {isEn ? "Current Board of Trustees" : isHi ? "वर्तमान न्यासी मंडल" : "विद्यमान विश्वस्त मंडळ"}
                </h3>
                <p className="text-xs text-zinc-500">
                  {isEn
                    ? "Current trustees governing institutional policies and stewardship"
                    : isHi
                    ? "संस्था के नीति-निर्धारण एवं विकास का सफल संचालन करने वाले न्यासी"
                    : "संस्थेच्या ध्येयधोरणांचे यशस्वी संचलन करणारे वर्तमान विश्वस्त"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {TRUSTEES_DATA.map((member) => (
                  <div
                    key={member.name}
                    className="flex flex-col items-center text-center group w-full max-w-xs p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#800020]/10 text-[#800020] dark:bg-amber-400/10 dark:text-amber-300 flex items-center justify-center font-bold text-lg mb-3">
                      <Users className="h-8 w-8" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-marathi-heading">
                      {isEn ? member.nameEn : member.name}
                    </h4>
                    <p className="text-xs text-zinc-500 font-marathi-body mt-1">
                      {isEn ? member.roleEn : isHi ? member.roleHi : member.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* पहिले विश्वस्त मंडळ (१९६२) स्मृति फलक */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-950/30 dark:to-stone-900 border border-amber-300/70 dark:border-amber-800/50 max-w-3xl mx-auto mt-8 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
                      <Landmark className="h-3.5 w-3.5" />
                      <span>{isEn ? "First Board of Trustees (1962 — Foundation)" : isHi ? "प्रथम न्यासी मंडल (१९६२ — आधारशिला)" : "पहिले विश्वस्त मंडळ (१९६२ — पायाभरणी)"}</span>
                    </div>
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 font-marathi-heading">
                      {isEn
                        ? "Shri E. M. Kulkarni • Shri B. S. Lohia • Shri C. B. Gupta"
                        : "श्री. एकनाथ माधवराव कुलकर्णी • श्री. भगवानदासजी सालीग्रामजी लोहिया • श्री. चंद्रगुप्त बिहारीलाल गुप्त"}
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-400 font-marathi-body">
                      {isEn
                        ? "Founding charter and institutional governance under Societies Registration Act 1860 (BHR/3/1962)"
                        : isHi
                        ? "सोसायटीज रजिस्ट्रेशन एक्ट १८६० (BHR/3/1962) के तहत ग्रन्थालय का संस्थागत आधार"
                        : "सोसायटीज रजिस्ट्रेशन ॲक्ट १८६० (BHR/3/1962) अंतर्गत ग्रंथालयाची सनद व संस्थात्मक पायाभरणी"}
                    </p>
                  </div>

                  <Link
                    href="/trustees"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-medium shrink-0 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{isEn ? "View Details" : isHi ? "विवरण देखें" : "तपशील पहा"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-16 border-t border-zinc-200 dark:border-zinc-800" />

            {/* ---- कार्यकारिणी सदस्य ---- */}
            <div>
              <h3 className="text-xl font-bold text-center text-zinc-900 dark:text-zinc-100 font-marathi-heading mb-1">
                {isEn ? "Executive Committee" : isHi ? "कार्यकारिणी मंडल" : "कार्यकारिणी मंडळ"}
              </h3>
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-10 font-marathi-body">
                {isEn ? "(Term 2023–24 to 2028–29)" : isHi ? "(सत्र २०२३-२४ से २०२८-२९)" : "(सन २०२३-२४ ते २०२८-२९)"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 justify-items-center">
                {EXECUTIVE_COMMITTEE.map((member) => (
                  <div
                    key={member.name}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Archival Photo Frame with Motion 3D Tilt Card & metallic shimmer */}
                    <TiltCard
                      maxTilt={16}
                      scale={1.04}
                      glare={true}
                      glareOpacity={0.25}
                      className="w-52 h-64 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 shadow-md group-hover:shadow-xl transition-shadow cursor-pointer"
                    >
                      <MotionSkeleton className="absolute inset-0 opacity-40 pointer-events-none rounded-2xl" />
                      <div
                        style={{ transform: "translateZ(30px)" }}
                        className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
                      >
                        <Users className="h-16 w-16 text-zinc-400 dark:text-zinc-500 group-hover:scale-110 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-all duration-300" />
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 font-medium tracking-wide">
                          {isEn ? "Official Portrait" : isHi ? "आधिकारिक चित्र" : "अधिकृत छायाचित्र"}
                        </span>
                      </div>
                    </TiltCard>
                    <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-3 font-marathi-heading">
                      {isEn ? member.nameEn : member.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 font-marathi-body">
                      {isEn ? member.roleEn : isHi ? member.roleHi : member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
