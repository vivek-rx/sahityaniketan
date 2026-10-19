"use client";

import { useEffect, useState } from "react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { Bell, Calendar, Pin, FileText, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { getPosts } from "@/lib/actions/posts";
import { getNotices } from "@/lib/actions/notices";
import { BobbingDots } from "@/components/ui/bobbing-dots";
import { BlogGridSkeleton } from "@/components/ui/loader-skeleton";

interface NewsItem {
  id: string;
  title: { mr: string; hi: string; en: string };
  date: { mr: string; hi: string; en: string };
  category: { mr: string; hi: string; en: string };
  isPinned?: boolean;
  content: { mr: string; hi: string; en: string };
}

const DEFAULT_NEWS_ITEMS: NewsItem[] = [
  {
    id: "notice-study-timings",
    isPinned: true,
    title: {
      mr: "वातानुकूलित अभ्यासिका व वाचनालय वेळ सूचना (२०२६)",
      hi: "वातानुकूलित अध्ययन कक्ष एवं वाचनालय समय सूचना (२०२६)",
      en: "AC Study Wing & Daily Reading Hall Schedule Notice (2026)",
    },
    date: {
      mr: "अधिकृत परिपत्रक",
      hi: "आधिकारिक परिपत्र",
      en: "Official Circular",
    },
    category: {
      mr: "महत्त्वाची सूचना",
      hi: "महत्वपूर्ण सूचना",
      en: "Important Notice",
    },
    content: {
      mr: "सर्व वाचक व विद्यार्थ्यांच्या माहितीस्तव, ग्रंथालयाचे दैनिक वृत्तपत्र दालन सकाळी ७:०० ते रात्री ८:३० वाजेपर्यंत सुरू राहील. वातानुकूलित अभ्यासिका सकाळी ६:०० ते रात्री १०:०० पर्यंत सुरू असून, स्पर्धा परीक्षा संदर्भ पुस्तकांचा लाभ घेण्याचे आवाहन करण्यात येत आहे.",
      hi: "समस्त पाठकों एवं विद्यार्थियों की जानकारी हेतु, ग्रन्थालय का दैनिक समाचार पत्र कक्ष प्रातः ७:०० से रात्रि ८:३० तक खुला रहेगा। वातानुकूलित अध्ययन कक्ष प्रातः ६:०० से रात्रि १०:०० तक संचालित है।",
      en: "For the attention of all patrons and students, the Daily Reading Hall operates from 7:00 AM to 8:30 PM. The Air-Conditioned Study Wing remains open from 6:00 AM to 10:00 PM with dedicated reference desks for civil service aspirants.",
    },
  },
  {
    id: "notice-catalogue-update",
    isPinned: false,
    title: {
      mr: "३९,९५३+ ग्रंथसंपदा ऑनलाइन शोध व संगणकीकरण पूर्तता",
      hi: "३९,९५३+ ग्रन्थ संग्रह ऑनलाइन खोज एवं कम्प्यूटरीकरण पूर्ण",
      en: "39,953+ Volumes Complete Digitization & Online Catalogue Live",
    },
    date: {
      mr: "अद्ययावत नोंदणी",
      hi: "अद्यतन पंजीकरण",
      en: "Recent Update",
    },
    category: {
      mr: "ग्रंथसंपदा",
      hi: "ग्रन्थ धरोहर",
      en: "Catalogue",
    },
    content: {
      mr: "साहित्य निकेतन ग्रंथालयातील सर्व ३९,९५३ मुद्रित ग्रंथांचे वर्गीकरण संगणकीय डेटाबेसमध्ये समाविष्ट करण्यात आले आहे. वाचक आता लेखक, शीर्षक आणि विषयवार ऑनलाइन कॅटलॉग शोधू शकतात.",
      hi: "साहित्य निकेतन पुस्तकालय के समस्त ३९,९५३ मुद्रित ग्रन्थों का वर्गीकरण डिजिटल डेटाबेस में सुरक्षित कर दिया गया है। पाठक अब ऑनलाइन कैटलॉग से अपनी पसंदीदा पुस्तकें खोज सकते हैं।",
      en: "The entire inventory of 39,953 printed books at Sahitya Niketan is now digitized and searchable. Patrons and researchers can explore records by title, author, and subject in the public catalogue.",
    },
  },
  {
    id: "notice-modi-workshop",
    isPinned: false,
    title: {
      mr: "मोडी लिपी व ऐतिहासिक दस्तऐवज वाचन कार्यशाळा",
      hi: "मोडी लिपि एवं ऐतिहासिक दस्तावेज वाचन कार्यशाला",
      en: "Modi Script & Archival Manuscript Reading Workshop",
    },
    date: {
      mr: "आगामी उपक्रम",
      hi: "आगामी आयोजन",
      en: "Upcoming Event",
    },
    category: {
      mr: "कार्यशाळा",
      hi: "कार्यशाला",
      en: "Workshop",
    },
    content: {
      mr: "इतिहास संशोधक आणि पदव्युत्तर विद्यार्थ्यांसाठी ग्रंथालयाच्या दुर्मीळ हस्तलिखित दालनात १० दिवसीय मोडी लिपी वाचन कार्यशाळा आयोजित करण्यात येत आहे. प्रवेश विनामूल्य असून ग्रंथालय कार्यालयात नाव नोंदणी करावी.",
      hi: "इतिहास शोधकर्ताओं एवं छात्रों हेतु ग्रन्थालय के दुर्लभ पाण्डुलिपि कक्ष में १० दिवसीय मोडी लिपि वाचन कार्यशाला आयोजित की जा रही है। प्रवेश निःशुल्क है।",
      en: "A 10-day hands-on Modi Script reading and archival preservation workshop is being organized for research scholars and students. Admission is complimentary upon registration at the front desk.",
    },
  },
];

export default function NewsPage() {
  const { language } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsItem[]>(DEFAULT_NEWS_ITEMS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicNews() {
      setIsLoading(true);
      try {
        const [dbPosts, dbNotices] = await Promise.all([getPosts(), getNotices()]);
        const mapped: NewsItem[] = [];

        if (dbNotices && dbNotices.length > 0) {
          dbNotices.forEach((n: any, idx: number) => {
            mapped.push({
              id: n.id || `notice-${idx}`,
              isPinned: n.priority === "pinned" || n.priority === "urgent",
              title: { mr: n.title, hi: n.title, en: n.title },
              date: {
                mr: n.created_at ? new Date(n.created_at).toLocaleDateString("mr-IN") : "ताजी सूचना",
                hi: n.created_at ? new Date(n.created_at).toLocaleDateString("hi-IN") : "ताजी सूचना",
                en: n.created_at ? new Date(n.created_at).toLocaleDateString("en-IN") : "Recent Notice",
              },
              category: { mr: n.category || "सूचना", hi: n.category || "सूचना", en: n.category || "Notice" },
              content: { mr: n.content, hi: n.content, en: n.content },
            });
          });
        }

        if (dbPosts && dbPosts.length > 0) {
          dbPosts.forEach((p: any, idx: number) => {
            mapped.push({
              id: p.id || `post-${idx}`,
              isPinned: p.is_pinned,
              title: { mr: p.title, hi: p.title, en: p.title },
              date: {
                mr: p.published_at ? new Date(p.published_at).toLocaleDateString("mr-IN") : "अद्यतन",
                hi: p.published_at ? new Date(p.published_at).toLocaleDateString("hi-IN") : "अद्यतन",
                en: p.published_at ? new Date(p.published_at).toLocaleDateString("en-IN") : "Update",
              },
              category: { mr: p.category || "बातमी", hi: p.category || "समाचार", en: p.category || "News" },
              content: { mr: p.content || p.excerpt || p.title, hi: p.content || p.excerpt || p.title, en: p.content || p.excerpt || p.title },
            });
          });
        }

        setNewsItems(mapped.length > 0 ? mapped : DEFAULT_NEWS_ITEMS);
      } catch (err) {
        console.error("Failed to load dynamic news/notices:", err);
        setNewsItems(DEFAULT_NEWS_ITEMS);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDynamicNews();
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors">
        <PageHeader
          title={
            language === "mr"
              ? "बातम्या, परिपत्रके व सूचना"
              : language === "hi"
                ? "समाचार, सूचनाएं एवं परिपत्र"
                : "Library News & Official Notices"
          }
          subtitle={
            language === "mr"
              ? "ग्रंथालयातील उपक्रम, नवीन ग्रंथ आगमन, व्याख्यानमाला आणि महत्त्वाच्या घोषणा"
              : language === "hi"
                ? "पुस्तकालय की गतिविधियां, नवीन पुस्तक आगमन, व्याख्यानमाला एवं प्रमुख घोषणाएं"
                : "Stay informed with the latest happenings, new arrivals, lecture series, and library updates."
          }
        />

        <section className="section py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-[#800020] dark:text-[#E5B869] font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#800020] dark:bg-[#E5B869] animate-pulse" />
                  <span>{language === "mr" ? "बातम्या व परिपत्रके लोड होत आहेत..." : language === "hi" ? "सूचनाएं लोड हो रही हैं..." : "Loading announcements..."}</span>
                </div>
                <BlogGridSkeleton count={4} />
              </div>
            ) : newsItems.length === 0 ? (
              <div className="rounded-3xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] p-10 sm:p-14 text-center max-w-2xl mx-auto my-6 space-y-4 shadow-xs">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] flex items-center justify-center">
                  <Bell className="h-8 w-8" />
                </div>
                <h4 className="font-marathi-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "mr"
                    ? "सध्या कोणतीही नवीन सूचना अथवा परिपत्रक नाही"
                    : language === "hi"
                      ? "वर्तमान में कोई नई सूचना अथवा परिपत्र नहीं है"
                      : "No New Notices or Circulars at this Moment"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-[#D5C0AE] leading-relaxed font-marathi-body max-w-md mx-auto">
                  {language === "mr"
                    ? "ग्रंथालयाचे सर्व विभाग नियमित वेळेनुसार सुरू आहेत. नवीन परिपत्रके अथवा घोषणा थेट ग्रंथालय प्रशासनाकडून येथे प्रसिद्ध केल्या जातील."
                    : language === "hi"
                      ? "ग्रन्थालय के सभी विभाग नियमित समयानुसार संचालित हैं। नवीन सूचनाएं यहां प्रकाशित की जाएंगी।"
                      : "All library reading halls and study wings are operating as per regular schedules. Official announcements will appear here."}
                </p>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] text-white text-xs font-bold hover:bg-[#66001A] transition-all shadow-xs"
                  >
                    <span>{language === "mr" ? "ग्रंथालय संपर्क कक्ष" : language === "hi" ? "ग्रन्थालय संपर्क" : "Contact Library Desk"}</span>
                  </Link>
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5DDD0] dark:border-[#332228] hover:bg-[#800020]/5 dark:hover:bg-[#800020]/20 text-gray-800 dark:text-gray-200 text-xs font-bold transition-all"
                  >
                    <span>{language === "mr" ? "ग्रंथ कॅटलॉग पहा" : language === "hi" ? "ग्रन्थ कैटलॉग देखें" : "Browse Catalogue"}</span>
                  </Link>
                </div>
              </div>
            ) : (
              newsItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl p-6 sm:p-7 border transition-all shadow-xs hover:shadow-md bg-white dark:bg-[#1E1418] ${item.isPinned
                      ? "border-[#800020] dark:border-[#E5B869] ring-1 ring-[#800020]/20 dark:ring-[#E5B869]/20"
                      : "border-[#E5DDD0] dark:border-[#332228]"
                    }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {item.isPinned && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#800020] px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs">
                          <Pin className="h-3 w-3" />
                          <span>{language === "mr" ? "महत्त्वाचे" : language === "hi" ? "महत्वपूर्ण" : "Pinned"}</span>
                        </span>
                      )}
                      <span className="rounded-full bg-[#800020]/10 dark:bg-[#800020]/25 border border-[#800020]/20 dark:border-[#800020]/40 px-3 py-0.5 text-[11px] font-semibold text-[#800020] dark:text-[#E5B869]">
                        {item.category[language]}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-[#B8A699]">
                      <Calendar className="h-3.5 w-3.5 text-[#B8860B] dark:text-[#E5B869]" />
                      <span>{item.date[language]}</span>
                    </div>
                  </div>

                  <h3 className="font-marathi-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-[#FAF2E8] leading-snug mb-2">
                    {item.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-[#D5C2B4] leading-relaxed mb-4">
                    {item.content[language]}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E5DDD0] dark:border-[#332228] text-xs">
                    <span className="text-stone-500 dark:text-[#B8A699] flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                      <span>साहित्य निकेतन ग्रंथालय, अंबाजोगाई (जि. बीड)</span>
                    </span>

                    <Link
                      href="/contact"
                      className="font-bold text-[#800020] dark:text-[#E5B869] hover:underline flex items-center gap-1"
                    >
                      <span>{language === "mr" ? "सविस्तर माहिती" : language === "hi" ? "विस्तृत जानकारी" : "Read More"}</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
