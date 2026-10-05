"use client";

import Link from "next/link";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Landmark, 
  ArrowRight
} from "lucide-react";
import { MotionSkeleton } from "@/components/ui/loader-skeleton";
import { TiltCard } from "@/components/ui/tilt-card";
import { useLanguage } from "@/context/language-context";

// 1. पहिले विश्वस्त मंडळ (१९६२ — संस्थात्मक पायाभरणी)
const FIRST_TRUSTEES_1962 = [
  {
    name: "श्री. एकनाथ माधवराव कुलकर्णी",
    nameEn: "Shri Eknath Madhavrao Kulkarni",
    role: "संस्थापक विश्वस्त (१९६२)",
    roleEn: "Founding Trustee (1962)",
    title: "प्रशासकीय व संस्थात्मक पायाभरणी",
    titleEn: "Administrative & Institutional Foundation",
    description:
      "सोसायटीज रजिस्ट्रेशन ॲक्ट १८६० अंतर्गत नोंदणी (BHR/3/1962) प्रक्रियेचे मुख्य सूत्रधार. ग्रंथालयाची सनद, लोकशाही नियमावली आणि शासकीय मान्यता मिळवून देण्यात निर्णायक योगदान.",
    descriptionEn:
      "Key architect of the official registration under Societies Registration Act 1860 (BHR/3/1962). Established the democratic constitution and statutory frameworks.",
    highlights: ["नोंदणी क्र. BHR/3/1962", "संस्थात्मक नियमावली", "लोकशाही प्रशासन"],
    badge: "पायाभरणी नेतृत्व",
  },
  {
    name: "श्री. भगवानदासजी सालीग्रामजी लोहिया",
    nameEn: "Shri Bhagwandasji Saligramji Lohia",
    role: "संस्थापक विश्वस्त (१९६२)",
    roleEn: "Founding Trustee (1962)",
    title: "दानशूर मार्गदर्शक व वास्तू संकल्पक",
    titleEn: "Philanthropist & Premises Visionary",
    description:
      "अंबाजोगाईतील प्रख्यात दानशूर व्यक्तिमत्त्व. ग्रंथालयाला आर्थिक स्थैर्य मिळवून देण्यासाठी, भाजी मंडईतील प्लॉट क्र. १२७ मिळविण्यासाठी आणि लोकसहभागातून निधी संकलनासाठी मोलाचे मार्गदर्शन.",
    descriptionEn:
      "Prominent philanthropist of Ambajogai. Instrumental in securing financial sustainability, civic land allotment, and public community fundraising.",
    highlights: ["आर्थिक स्थैर्य", "वास्तू उभारणी", "दानशूर नेतृत्व"],
    badge: "वास्तू संकल्पक",
  },
  {
    name: "श्री. चंद्रगुप्त बिहारीलाल गुप्त",
    nameEn: "Shri Chandragupta Biharilal Gupta",
    role: "संस्थापक विश्वस्त (१९६२)",
    roleEn: "Founding Trustee (1962)",
    title: "स्वातंत्र्यसेनानी व राष्ट्रभाषा प्रसारक",
    titleEn: "Freedom Fighter & Cultural Pioneer",
    description:
      "स्वातंत्र्यलढ्यातील अग्रणी कार्यकर्ते व राष्ट्रभाषा हिंदी प्रचार सभा, हैदराबादचे मार्गदर्शक. ग्रंथालयातील संदर्भ ग्रंथ दालन आणि युवक वाचक चळवळ समृद्ध करण्यात आयुष्यभर योगदान.",
    descriptionEn:
      "Eminent freedom activist and pioneer of Hindi Prachar Sabha. Dedicated his life to developing the reference stacks and youth readership movement.",
    highlights: ["राष्ट्रभाषा प्रसार", "स्वातंत्र्यलढा वारसा", "ग्रंथ संग्रह"],
    badge: "राष्ट्रसेवा वारसा",
  },
];

// 2. संस्थापक ध्येयवादी युवक मंडळ (१ ऑगस्ट १९४५ — स्थापना)
const FOUNDING_MEMBERS_1945 = [
  { name: "श्री. गोविंदलाल जानू", role: "संस्थापक अग्रणी (१९४५)" },
  { name: "श्री. विश्वराव जाधव", role: "संस्थापक सदस्य (१९४५)" },
  { name: "श्री. रामचंद्रजी क्षीरसागर", role: "संस्थापक सदस्य (१९४५)" },
  { name: "श्री. विपत वहमवार", role: "संस्थापक सदस्य (१९४५)" },
  { name: "श्री. चंद्रगुप्त आर्य", role: "संस्थापक सदस्य (१९४५)" },
  { name: "श्री. के. बी. पाटील", role: "संस्थापक सदस्य (१९४५)" },
  { name: "श्री. प्र. गो. रामदासी", role: "संस्थापक सदस्य व शिक्षक (१९४५)" },
];

// 3. प्रारंभीचे समर्पित शिक्षक व ग्रंथसेवक (१९४५-१९५५)
const EARLY_TEACHERS = [
  { name: "प्र. गो. भावठाणकर", role: "समर्पित शिक्षक व मार्गदर्शक (१९४५-१९५५)" },
  { name: "ज्ञा. लु. खोपुसकर", role: "राष्ट्रभाषा वर्ग शिक्षक (१९४५-१९५५)" },
  { name: "विनायकराव जानवळकर", role: "वाचनालय मार्गदर्शक (१९४५-१९५५)" },
  { name: "प्र. गो. रामदासी", role: "संस्थापक शिक्षक व ग्रंथसेवक (१९४५-१९५५)" },
];

// 4. विद्यमान विश्वस्त मंडळ (वर्तमान धोरण समिती)
const CURRENT_TRUSTEES = [
  { name: "डॉ. शरद पांडुरंग हबाकर", role: "विद्यमान विश्वस्त" },
  { name: "श्री. रामचंद्र नरसदासजी संबर", role: "विद्यमान विश्वस्त" },
  { name: "श्री. भास्करराव झुंडीरामजी धर्मपाळे", role: "विद्यमान विश्वस्त" },
];

export default function TrusteesPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-stone-100 min-h-screen transition-colors pb-24"
      >
        <PageHeader
          title={isEn ? "Founding Trustees & Luminaries" : "पहिले विश्वस्त मंडळ व संस्थापक"}
          subtitle={
            isEn
              ? "The Visionary Pioneers & First Board of Trustees (Est. 1945 • Reg. 1962)"
              : "साहित्य निकेतन ग्रंथालयाची संस्थात्मक पायाभरणी करणारे पहिले विश्वस्त मंडळ व ध्येयवादी संस्थापक (स्थापना १९४५ • नोंदणी १९६२)"
          }
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* =========================================================
              ऐतिहासिक नोंदणी सनद सुवर्ण पट्टा (Registration Charter Hero)
              ========================================================= */}
          <section className="mt-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#800020] via-[#5C0017] to-[#3B000F] text-white p-8 sm:p-10 shadow-xl border border-[#B8860B]/30">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#B8860B]/10 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B8860B]/20 text-[#E5B869] border border-[#B8860B]/30 text-xs font-semibold tracking-wide">
                    <Landmark className="h-3.5 w-3.5" />
                    <span>सोसायटीज रजिस्ट्रेशन ॲक्ट, १८६० अंतर्गत सनद</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-gajraj text-[#FFFDF8] tracking-normal leading-snug">
                    पहिले विश्वस्त मंडळ (१९६२ — पायाभरणी)
                  </h2>

                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-marathi-body">
                    १ ऑगस्ट १९४५ रोजी स्वातंत्र्यलढ्याच्या प्रेरणेतून सुरू झालेल्या साहित्य निकेतन ग्रंथालयास <strong className="text-[#E5B869] font-bold">सोसायटीज रजिस्ट्रेशन ॲक्ट, १८६०</strong> अंतर्गत नोंदणी क्रमांक <span className="font-mono font-bold text-white bg-black/30 px-2 py-0.5 rounded border border-white/10">BHR/3/1962</span> अन्वये कायदेशीर व संस्थात्मक अधिष्ठान मिळाले. या ऐतिहासिक प्रक्रियेत खालील तीन महनीय विश्वस्तांनी संस्थेची पायाभरणी केली.
                  </p>
                </div>

                <div className="bg-black/25 backdrop-blur-xs rounded-xl p-5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#E5B869]">
                    <ShieldCheck className="h-5 w-5 shrink-0" />
                    <span className="text-xs uppercase tracking-widest font-bold">संस्थात्मक नोंदणी</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-300">
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-stone-400">नोंदणी क्रमांक:</span>
                      <span className="font-bold text-white font-mono">BHR/3/1962</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-stone-400">नोंदणी वर्ष:</span>
                      <span className="font-bold text-white">१९६२</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-stone-400">ब्रीदवाक्य:</span>
                      <span className="font-bold text-[#E5B869]">|| एक हृदय हो भारत जननी ||</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-400">वर्ग मान्यता:</span>
                      <span className="font-bold text-white">महाराष्ट्र शासन वर्ग 'अ'</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              पहिले विश्वस्त मंडळ (1962 — 3 Founding Trustees Cards)
              ========================================================= */}
          <section className="py-14">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#800020] dark:text-[#E5B869] uppercase tracking-widest block mb-2 font-mono">
                FOUNDING BOARD OF TRUSTEES · 1962
              </span>
              <h2 className="text-3xl font-bold font-gajraj text-stone-900 dark:text-stone-100">
                आद्य विश्वस्त — महनीय व्यक्तिमत्त्वे
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-marathi-body">
                ज्यांच्या दूरदृष्टी, निष्ठा आणि अविरत परिश्रमांतून साहित्य निकेतन ग्रंथालयाचा ज्ञानदीप अखंड तेवत राहिला
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FIRST_TRUSTEES_1962.map((trustee) => (
                <div
                  key={trustee.name}
                  className="flex flex-col h-full bg-white dark:bg-[#1A1215] rounded-2xl border border-amber-200/70 dark:border-[#332228] p-6 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Decorative gold ribbon badge */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300/50 dark:border-amber-800/60 text-[11px] font-bold">
                    {trustee.badge}
                  </div>

                  {/* Archival Framed Portrait */}
                  <div className="flex justify-center mb-6 mt-2">
                    <TiltCard
                      maxTilt={14}
                      scale={1.03}
                      glare={true}
                      glareOpacity={0.2}
                      className="w-40 h-48 rounded-xl bg-gradient-to-b from-[#FAF6F0] to-[#EFE7DA] dark:from-[#24171C] dark:to-[#170E12] border-2 border-[#B8860B]/40 flex flex-col items-center justify-center p-4 shadow-inner relative group-hover:border-[#B8860B] transition-colors"
                    >
                      <MotionSkeleton className="absolute inset-0 opacity-30 pointer-events-none rounded-xl" />
                      <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-[#800020]/10 dark:bg-amber-400/10 text-[#800020] dark:text-[#E5B869] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Users className="h-8 w-8" />
                        </div>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium tracking-wide">
                          ऐतिहासिक संदर्भ छायाचित्र
                        </span>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Trustee Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-gajraj text-stone-900 dark:text-stone-100 group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors">
                        {trustee.name}
                      </h3>
                      <div className="text-xs font-semibold text-[#800020] dark:text-[#E5B869] mt-0.5 font-marathi-heading">
                        {trustee.role}
                      </div>
                      <div className="text-xs font-medium text-amber-700 dark:text-amber-400/90 mt-1 pb-3 border-b border-stone-200 dark:border-stone-800">
                        {trustee.title}
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-marathi-body mt-3">
                        {trustee.description}
                      </p>
                    </div>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                      {trustee.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10.5px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 font-medium"
                        >
                          • {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              संस्थापक ध्येयवादी युवक मंडळ (1945 Founding Pioneers)
              ========================================================= */}
          <section className="py-12 border-t border-stone-200 dark:border-stone-800">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-2 font-mono">
                1 AUGUST 1945 · FOUNDING PIONEERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-gajraj text-stone-900 dark:text-stone-100">
                संस्थापक ध्येयवादी तरुण मंडळ (१९४५)
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 font-marathi-body">
                स्वातंत्र्यलढ्याच्या काळात साहित्यातून लोकजागृती करण्यासाठी १ ऑगस्ट १९४५ रोजी एकत्र आलेले तरुण संस्थापक
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FOUNDING_MEMBERS_1945.map((member, i) => (
                <div
                  key={member.name}
                  className="p-4 rounded-xl bg-white dark:bg-[#1A1215] border border-stone-200/80 dark:border-stone-800 flex items-center gap-3.5 hover:border-[#800020]/40 transition-colors shadow-xs"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#800020]/10 text-[#800020] dark:bg-amber-400/10 dark:text-[#E5B869] flex items-center justify-center font-bold text-sm shrink-0 font-mono">
                    0{i + 1}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-marathi-heading truncate">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 font-marathi-body truncate">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              प्रारंभीचे समर्पित शिक्षक व ग्रंथसेवक (1945-1955)
              ========================================================= */}
          <section className="py-12 border-t border-stone-200 dark:border-stone-800">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-2 font-mono">
                DEVOTED TEACHERS & EDUCATORS (1945–1955)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-gajraj text-stone-900 dark:text-stone-100">
                प्रारंभीचे समर्पित शिक्षक व ग्रंथसेवक
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 font-marathi-body">
                अल्पशा मानधनातून राष्ट्रभाषा हिंदीचे वर्ग चालवून व वाचनालय सांभाळून ग्रंथालयाची पायाभरणी करणारे शिक्षक
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EARLY_TEACHERS.map((teacher, i) => (
                <div
                  key={teacher.name}
                  className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/15 border border-amber-200/60 dark:border-amber-900/30 flex items-center gap-3.5 shadow-xs"
                >
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-marathi-heading truncate">
                      {teacher.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 font-marathi-body truncate">
                      {teacher.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              विद्यमान विश्वस्त मंडळ (Current Board of Trustees)
              ========================================================= */}
          <section className="py-12 border-t border-stone-200 dark:border-stone-800">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#800020] dark:text-[#E5B869] uppercase tracking-widest block mb-2 font-mono">
                CURRENT BOARD OF TRUSTEES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-gajraj text-stone-900 dark:text-stone-100">
                विद्यमान विश्वस्त मंडळ
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 font-marathi-body">
                संस्थेच्या परंपरा, मूल्ये आणि आधुनिक विकासाचे यशस्वी संचलन करणारे वर्तमान विश्वस्त
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {CURRENT_TRUSTEES.map((member) => (
                <div
                  key={member.name}
                  className="p-6 rounded-2xl bg-white dark:bg-[#1A1215] border border-stone-200/80 dark:border-stone-800 text-center flex flex-col items-center shadow-xs"
                >
                  <div className="h-14 w-14 rounded-full bg-[#800020]/10 text-[#800020] dark:bg-amber-400/10 dark:text-amber-300 flex items-center justify-center font-bold text-base mb-3">
                    <Users className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold font-gajraj text-stone-900 dark:text-stone-100">
                    {member.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-marathi-body mt-1">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              कार्यकारिणी मंडळ कडे जाण्याची लिंक (Link to Executive Committee)
              ========================================================= */}
          <section className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-800/40 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-1">
                <h3 className="text-lg font-bold font-gajraj text-stone-900 dark:text-stone-100">
                  विद्यमान कार्यकारिणी मंडळ (२०२३-२९)
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-marathi-body">
                  अध्यक्ष, उपाध्यक्ष, कार्यवाह व सर्व सन्माननीय कार्यकारिणी सदस्यांची माहिती पहा
                </p>
              </div>

              <Link
                href="/about#team"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white font-medium text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <span>कार्यकारिणी परिचय पहा</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
