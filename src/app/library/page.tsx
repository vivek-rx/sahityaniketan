"use client";

import { useState } from "react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import {
  BookOpen,
  ShieldCheck,
  Layers,
  Landmark,
  Clock,
  Users,
  Newspaper,
  Laptop,
  Sparkles,
  LayoutList,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { ExpandOnHoverList, type ExpandListItem } from "@/components/ui/expand-on-hover-list";

interface ReadingRoom {
  id: string;
  title: { mr: string; hi: string; en: string };
  subtitle: { mr: string; hi: string; en: string };
  desc: { mr: string; hi: string; en: string };
  timing: { mr: string; hi: string; en: string };
  icon: typeof BookOpen;
  color: string;
  image?: string;
}

const READING_ROOMS: ReadingRoom[] = [
  {
    id: "r1",
    title: { mr: "मुख्य ग्रंथ वितरण व संदर्भ दालन", hi: "मुख्य ग्रन्थ वितरण एवं संदर्भ कक्ष", en: "Main Lending & Reference Hall" },
    subtitle: { mr: "३९,९५३ मराठी, हिंदी, संस्कृत व इंग्रजी ग्रंथ", hi: "३९,९५३ मराठी, हिन्दी, संस्कृत व अंग्रेजी ग्रन्थ", en: "39,953 Curated Multilingual Volumes" },
    desc: {
      mr: "साहित्य निकेतनचे मुख्य ग्रंथ दालन जेथे कादंबरी, कथा, कविता, इतिहास, तत्त्वज्ञान व चरित्रांचा समृद्ध संग्रह वाचकांसाठी खुला आहे. मुक्तद्वार ग्रंथालयाद्वारे वाचक स्वतः पुस्तके निवडून अभ्यासू शकतात.",
      hi: "साहित्य निकेतन का मुख्य ग्रन्थ अनुभाग जहाँ उपन्यास, कविता, इतिहास, दर्शन एवं जीवनियों का समृद्ध संग्रह उपलब्ध है।",
      en: "The heart of Sahitya Niketan housing classics across Marathi literature, history, philosophy, poetry, and global thought.",
    },
    timing: { mr: "सकाळी ८:०० ते रात्री ८:३०", hi: "प्रातः ८:०० से रात्रि ८:३०", en: "8:00 AM – 8:30 PM" },
    icon: Landmark,
    color: "bg-[#800020]/10 text-[#800020]",
    image: "/images/real/library_cupboards.webp",
  },
  {
    id: "r2",
    title: { mr: "स्पर्धा परीक्षा शांत अभ्यासिका", hi: "प्रतियोगी परीक्षा शांत अध्ययन कक्ष", en: "Competitive Exams Silent Study Hall" },
    subtitle: { mr: "MPSC, UPSC, बँकिंग व पोलीस भरती तयारी", hi: "MPSC, UPSC एवं प्रतियोगी परीक्षा तैयारी", en: "Dedicated 200+ Seating Civil Services Wing" },
    desc: {
      mr: "अंबाजोगाई व ग्रामीण भागातील होतकरू विद्यार्थ्यांसाठी २००+ आसनक्षमतेची पूर्णतः शांत, वातानुकूलित अभ्यासिका. दर्जेदार संदर्भग्रंथ, चालू घडामोडी आणि मासिके येथे उपलब्ध आहेत.",
      hi: "ग्रामीण व स्थानीय विद्यार्थियों हेतु २००+ सीट क्षमता युक्त वातानुकूलित शांत अध्ययन कक्ष।",
      en: "Dedicated quiet zone for rural youth and civil service aspirants equipped with high-speed internet and reference compilations.",
    },
    timing: { mr: "सकाळी ६:०० ते रात्री १०:००", hi: "प्रातः ६:०० से रात्रि १०:००", en: "6:00 AM – 10:00 PM" },
    icon: Laptop,
    color: "bg-[#800020]/10 text-[#800020]",
    image: "/images/real/library_window.webp",
  },
  {
    id: "r3",
    title: { mr: "दैनिक वर्तमानपत्र व नियतकालिक दालन", hi: "दैनिक समाचार पत्र एवं पत्रिका अनुभाग", en: "Daily Periodicals & Newspaper Hall" },
    subtitle: { mr: "२०+ राष्ट्रीय व प्रादेशिक वृत्तपत्रे", hi: "२०+ राष्ट्रीय एवं क्षेत्रीय समाचार पत्र", en: "Over 20 Daily Regional & National Dailies" },
    desc: {
      mr: "सकाळी ७:०० वाजल्यापासून सर्व नागरिकांसाठी विनामूल्य खुले. दैनिक वृत्तपत्रे, साप्ताहिक व मासिक नियतकालिके वाचनालयात उपलब्ध.",
      hi: "प्रातः ७:०० बजे से सभी नागरिकों के लिए खुला। प्रमुख दैनिक समाचार पत्र एवं पत्रिकाएं उपलब्ध।",
      en: "Public newspaper and periodicals section open daily to all visitors from 7:00 AM.",
    },
    timing: { mr: "सकाळी ७:०० ते रात्री ८:३० (दररोज)", hi: "प्रातः ७:०० से रात्रि ८:३० (दैनिक)", en: "7:00 AM – 8:30 PM Daily" },
    icon: Newspaper,
    color: "bg-[#800020]/10 text-[#800020]",
    image: "/images/real/library_signboard.webp",
  },
  {
    id: "r4",
    title: { mr: "दुर्मीळ मोडी लिपी व संस्कृत हस्तलिखित कक्ष", hi: "दुर्लभ मोडी लिपि व संस्कृत पाण्डुलिपि कक्ष", en: "Rare Modi & Sanskrit Manuscript Vault" },
    subtitle: { mr: "५००+ प्राचीन कागदपत्रे व तालपत्र ग्रंथ", hi: "५००+ प्राचीन ऐतिहासिक दस्तावेज", en: "Climate-Controlled Archival Sanctuary" },
    desc: {
      mr: "अंबाजोगाई, मराठवाडा मुक्तिसंग्राम आणि संत परंपरेतील ५००+ ऐतिहासिक मोडी पत्रव्यवहार, दस्तऐवज आणि प्राचीन संस्कृत हस्तलिखितांचे तापमान-नियंत्रित जतन कक्ष.",
      hi: "अंबाजोगाई एवं मराठवाड़ा के ५००+ ऐतिहासिक मोडी दस्तावेज व प्राचीन संस्कृत पाण्डुलिपियों का संरक्षण।",
      en: "Specialized archival room housing centuries-old Modi script documents, historical firmans, and Sanskrit palm-leaf manuscripts.",
    },
    timing: { mr: "सकाळी १०:०० ते सायंकाळी ५:०० (पूर्वपरवानगीने)", hi: "प्रातः १०:०० से सायं ५:०० (अनुमति द्वारा)", en: "10:00 AM – 5:00 PM (By Appointment)" },
    icon: BookOpen,
    color: "bg-[#800020]/10 text-[#800020]",
    image: "/images/real/library_vintage_books.webp",
  },
  {
    id: "r5",
    title: { mr: "बाल व किशोर वाचनालय (बालमित्र कट्टा)", hi: "बाल एवं किशोर वाचनालय", en: "Children's & Youth Reading Room" },
    subtitle: { mr: "पंचतंत्र, इसापनीती, बालकथा व विज्ञान", hi: "पंचतंत्र, ईसप नीति एवं बाल साहित्य", en: "Creative Space for Young Minds (Ages 3-14)" },
    desc: {
      mr: "लहान मुलांमध्ये वाचनाची आवड निर्माण करण्यासाठी रंगीबेरंगी चित्रांची पुस्तके, संस्कारकथा, विज्ञान खेळ आणि दर रविवारी 'बाल वाचन कट्टा' कथाकथन उपक्रम.",
      hi: "बच्चों में पठन संस्कृति विकसित करने हेतु सचित्र पुस्तकें, पंचतंत्र कथाएं एवं रविवार बाल वाचन मंच।",
      en: "Enchanting space with illustrated storybooks, science comics, and Sunday interactive storytelling sessions.",
    },
    timing: { mr: "दुपारी २:०० ते रात्री ८:००", hi: "अपराह्न २:०० से रात्रि ८:००", en: "2:00 PM – 8:00 PM" },
    icon: Users,
    color: "bg-[#800020]/10 text-[#800020]",
    image: "/images/real/library_savarkar_portrait.webp",
  },
  {
    id: "r6",
    title: { mr: "डिजिटल कॅटलॉग व संगणक कक्ष", hi: "डिजिटल कैटलॉग एवं कम्प्यूटर कक्ष", en: "Digital Catalogue & Computer Centre" },
    subtitle: { mr: "ऑनलाइन संदर्भ व ई-ग्रंथ शोध", hi: "ऑनलाइन संदर्भ एवं ग्रन्थ शोध", en: "Online Reference & OPAC Catalogue" },
    desc: {
      mr: "वाचकांसाठी संगणक सुविधा, इंटरनेट आणि ३९,९५३+ ग्रंथांचा ऑनलाइन कॅटलॉग शोधण्यासाठी अभ्यास कक्ष.",
      hi: "पाठकों हेतु कम्प्यूटर सुविधा, इंटरनेट एवं सम्पूर्ण ग्रन्थ सूची खोजने का अध्ययन कक्ष।",
      en: "Equipped with dedicated workstations providing scholars seamless digital access to the catalogue and reference archives.",
    },
    timing: { mr: "सकाळी ९:०० ते सायंकाळी ७:००", hi: "प्रातः ९:०० से सायं ७:००", en: "9:00 AM – 7:00 PM" },
    icon: ShieldCheck,
    color: "bg-[#800020]/10 text-[#800020]",
    image: "/images/real/library_inauguration_plaque.webp",
  },
];

export default function LibraryOverviewPage() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const serials = language === "en" 
    ? ["01", "02", "03", "04", "05", "06"]
    : ["०१", "०२", "०३", "०४", "०५", "०६"];

  const expandItems: ExpandListItem[] = READING_ROOMS.map((room, idx) => ({
    id: room.id,
    serialNumber: serials[idx],
    title: room.title[language] || room.title.mr,
    subtitle: room.subtitle[language] || room.subtitle.mr,
    description: room.desc[language] || room.desc.mr,
    timing: room.timing[language] || room.timing.mr,
    image: room.image,
    badge: language === "en" ? "Curated Wing" : "विशेष दालन",
    link: "/membership",
    linkText: language === "en" ? "Membership & Access" : language === "hi" ? "सदस्यता नियम देखें" : "दालन प्रवेश व सदस्यता",
  }));

  return (
    <>
      <Navbar />
      <main id="main-content" className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors pb-20">
        <PageHeader
          title={
            language === "mr"
              ? "ग्रंथालय दालने व वाचन कक्ष"
              : language === "hi"
              ? "पुस्तकालय अनुभाग एवं वाचनालय"
              : "Library Sections & Reading Rooms"
          }
          subtitle={
            language === "mr"
              ? "प्रत्यक्ष वाचन कक्ष, स्पर्धा परीक्षा अभ्यासिका, वृत्तपत्र दालन आणि दुर्मीळ हस्तलिखित जतन कक्ष"
              : language === "hi"
              ? "प्रत्यक्ष वाचनालय, प्रतियोगी परीक्षा अध्ययन कक्ष एवं दुर्लभ पाण्डुलिपि संरक्षण विभाग"
              : "Explore our physical reading spaces, competitive exam study hall, newspaper pavilion, and rare archives."
          }
        />

        <section className="section py-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* View Mode Toggle Switch */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                {language === "en" ? "Interactive Room Guide" : "सर्व वाचन दालने व कक्ष"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                {language === "en"
                  ? "Hover or click on any section to preview details and timings"
                  : "दालनावर कर्सर नेऊन किंवा क्लिक करून सविस्तर माहिती व वेळ पहा"}
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#800020] text-white shadow-xs"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                <LayoutList className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {language === "en" ? "List View" : "यादी"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#800020] text-white shadow-xs"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {language === "en" ? "Grid View" : "ग्रिड"}
                </span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: EXPAND ON HOVER LIST (DEFAULT) */}
          {viewMode === "list" ? (
            <div className="bg-white dark:bg-stone-900/60 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-xs">
              <ExpandOnHoverList items={expandItems} defaultOpenIndex={0} />
            </div>
          ) : (
            /* VIEW MODE 2: CLASSIC GRID CARDS */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {READING_ROOMS.map((room) => {
                const IconComp = room.icon;
                return (
                  <div
                    key={room.id}
                    className="bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#800020] dark:hover:border-[#E5B869] transition-all group"
                  >
                    <div>
                      {room.image && (
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 border border-[#E5DDD0] dark:border-[#332228]">
                          <Image
                            src={room.image}
                            alt={room.title[language] || room.title.mr}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`h-10 w-10 rounded-xl ${room.color} dark:bg-[#800020]/25 dark:text-[#E5B869] flex items-center justify-center`}
                        >
                          <IconComp className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-[#180E11] px-2 py-0.5 rounded border border-[#E5DDD0] dark:border-[#332228]">
                          ROOM #{room.id.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-marathi-heading text-lg font-bold text-gray-900 dark:text-[#FAF2E8] leading-snug group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors mb-1">
                        {room.title[language] || room.title.mr}
                      </h3>

                      <p className="text-xs font-semibold text-[#800020] dark:text-[#E5B869] mb-2">
                        {room.subtitle[language] || room.subtitle.mr}
                      </p>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {room.desc[language] || room.desc.mr}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E5DDD0] dark:border-[#332228] flex items-center justify-between text-xs">
                      <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                        <span>{room.timing[language] || room.timing.mr}</span>
                      </span>

                      <Link
                        href="/membership"
                        className="font-bold text-[#800020] dark:text-[#E5B869] hover:underline"
                      >
                        {language === "mr"
                          ? "दालन नियम"
                          : language === "hi"
                          ? "नियम देखें"
                          : "Rules"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
