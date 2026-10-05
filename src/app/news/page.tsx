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

export default function NewsPage() {
  const { language } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
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

        setNewsItems(mapped);
      } catch (err) {
        console.error("Failed to load dynamic news/notices:", err);
        setNewsItems([]);
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
