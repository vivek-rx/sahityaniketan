"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Vote, Clock, BookOpen, ChevronRight } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { useLanguage } from "@/context/language-context";
import { categoryToSlug, CATEGORY_EN_LABELS } from "@/lib/awards-slugs";

type Nominee = {
  id: string;
  bookId: string;
  title: string;
  titleEn?: string;
  author: string;
  authorEn?: string;
  coverUrl: string | null;
  votes: number;
};

type AwardsPayload = {
  success: boolean;
  year: number;
  votingOpen: boolean;
  totalVotes: number;
  categories: Array<{ category: string; nominees: Nominee[] }>;
};

const VOTER_KEY_STORE = "sn_awards_voter_key";
const VOTED_STORE = "sn_awards_voted";

export default function AwardsClient() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";
  const [data, setData] = useState<AwardsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [votedCount, setVotedCount] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/awards", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setData(json);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    try {
      const saved = JSON.parse(localStorage.getItem(VOTED_STORE) || "{}");
      if (saved && typeof saved === "object") {
        setVotedCount(Object.keys(saved).length);
      }
    } catch {}
  }, [load]);

  const t = {
    badge: isEn ? "Readers' Choice Awards" : isHi ? "पाठकों की पसंद पुरस्कार" : "वाचकांचा निवड पुरस्कार",
    title: isEn
      ? "Sahitya Niketan Choice Awards 2026"
      : isHi
        ? "साहित्य निकेतन पाठक पुरस्कार २०२६"
        : "साहित्य निकेतन वाचकांचे पुरस्कार २०२६",
    subtitle: isEn
      ? "Here are the library's most loved books. Vote now for your favourites — the readers decide the winners!"
      : isHi
        ? "ये हैं पुस्तकालय की सबसे प्रिय किताबें। अपनी पसंद के लिए वोट करें — विजेता पाठक तय करते हैं!"
        : "ग्रंथालयातील सर्वाधिक प्रिय ग्रंथ येथे आहेत. आवडत्या ग्रंथासाठी मतदान करा — विजेते वाचक ठरवतात!",
    cta: isEn ? "Vote Now" : isHi ? "अभी वोट करें" : "आता मतदान करा",
    votingOpen: isEn ? "Voting Open" : isHi ? "मतदान चालू" : "मतदान सुरू",
    votingClosed: isEn ? "Voting Closed" : isHi ? "मतदान बंद" : "मतदान बंद",
    votesCast: isEn ? "Votes Cast" : isHi ? "वोट डाले गए" : "मते नोंदवली",
    categories: isEn ? "Categories" : isHi ? "श्रेणियाँ" : "श्रेणी",
    categoriesSub: isEn
      ? "One vote per category. Your pick is final!"
      : isHi
        ? "प्रति श्रेणी एक वोट। आपकी पसंद अंतिम है!"
        : "प्रत्येक श्रेणीसाठी एकच मत. निवड अंतिम!",
    comingSoon: isEn ? "Nominees coming soon" : isHi ? "नामांकन जल्द आ रहे हैं" : "नामांकन लवकरच",
    votedIn: isEn ? "Voted" : isHi ? "वोट किया" : "मतदान",
    schedule: isEn ? "Voting Schedule" : isHi ? "मतदान कार्यक्रम" : "मतदान वेळापत्रक",
    rules: isEn ? "Rules & Eligibility" : isHi ? "नियम व पात्रता" : "नियम व पात्रता",
  };

  const catLabel = (c: string) => (isEn ? CATEGORY_EN_LABELS[c] || c : c);
  const totalVotes = data?.totalVotes ?? 0;
  const votingOpen = data?.votingOpen ?? false;

  // Goodreads-style full roster: all canonical categories always show on the
  // landing grid (empty ones as "coming soon"), payload supplies nominees.
  const displayCategories = Object.keys(CATEGORY_EN_LABELS).map((mr) => ({
    category: mr,
    nominees: data?.categories.find((c) => c.category === mr)?.nominees || [],
  }));

  return (
    <>
      <Navbar />

      {/* ─── Masthead Hero (Goodreads-choice-awards style, brand palette) ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#3A040B] via-[#55000E] to-[#800020] text-white">
        {/* Decorative gold rays */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 0deg at 50% 120%, #E5B869 0deg 6deg, transparent 6deg 14deg)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#E5B869]/40 text-[#F4D98C] text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Trophy className="w-4 h-4" />
            <span>{t.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-marathi-heading text-3xl sm:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mx-auto text-white"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            {votingOpen ? (
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E5B869] hover:bg-[#F4D98C] text-[#3A040B] text-sm sm:text-base font-black shadow-lg shadow-black/30 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <Vote className="w-5 h-5" />
                <span>{t.cta}</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 text-white/70 text-sm font-bold border border-white/20">
                <Clock className="w-5 h-5" />
                <span>{t.votingClosed}</span>
              </span>
            )}

            <div className="flex items-center gap-5 text-xs sm:text-sm text-white/80">
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${votingOpen ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
                />
                <span className="font-bold">{votingOpen ? t.votingOpen : t.votingClosed}</span>
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span>
                <span className="font-black text-[#F4D98C] text-base">{totalVotes.toLocaleString(isEn ? "en-IN" : "mr-IN")}</span>{" "}
                {t.votesCast}
              </span>
              {votedCount > 0 && (
                <>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span>
                    {isEn
                      ? `You voted in ${votedCount}`
                      : isHi
                        ? `आपने ${votedCount} में वोट किया`
                        : `तुम्ही ${votedCount} श्रेणींत मतदान केले`}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Gold divider */}
        <div className="h-1 bg-gradient-to-r from-[#E5B869]/0 via-[#E5B869] to-[#E5B869]/0" />
      </section>

      <main className="bg-[#FAF8F5] dark:bg-[#120B0D] transition-colors">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* ─── Categories ─── */}
          <div id="categories" className="scroll-mt-24 text-center mb-10">
            <h2 className="font-marathi-heading text-2xl sm:text-3xl font-black text-stone-900 dark:text-[#FAF2E8]">
              {t.categories}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-[#B8A699] mt-2">{t.categoriesSub}</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-2xl bg-white dark:bg-[#220508] border border-stone-200 dark:border-[#4A1217] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayCategories.map((cat, idx) => {
                const nominees = cat.nominees || [];
                const covers = nominees.filter((n) => n.coverUrl).slice(0, 3);
                const slug = categoryToSlug(cat.category);
                return (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                  >
                    <Link
                      href={`/awards/${slug}`}
                      className={`group block h-full rounded-2xl bg-white dark:bg-[#220508] border shadow-xs transition-all duration-300 p-6 ${
                        nominees.length > 0
                          ? "border-stone-200 dark:border-[#4A1217] hover:shadow-lg hover:border-[#800020]/40 dark:hover:border-[#E5B869]/40"
                          : "border-stone-200/60 dark:border-[#3A040B] opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3
                          className={`font-marathi-heading text-base sm:text-lg font-bold transition-colors ${
                            nominees.length > 0
                              ? "text-stone-900 dark:text-[#FAF2E8] group-hover:text-[#800020] dark:group-hover:text-[#E5B869]"
                              : "text-stone-400 dark:text-[#B8A699]"
                          }`}
                        >
                          {catLabel(cat.category)}
                        </h3>
                        {nominees.length > 0 && (
                          <ChevronRight className="w-4 h-4 text-stone-300 dark:text-[#5A141A] group-hover:text-[#800020] dark:group-hover:text-[#E5B869] group-hover:translate-x-1 transition-all" />
                        )}
                      </div>

                      {covers.length > 0 ? (
                        <div className="flex items-end justify-center gap-2 h-28">
                          {covers.map((n, ci) => (
                            <div
                              key={n.id}
                              className={`relative w-[72px] h-[104px] rounded-md overflow-hidden shadow-md border border-stone-200 dark:border-[#3A040B] bg-stone-100 dark:bg-[#2A050C] ${
                                ci === 1 ? "z-10 scale-110 -mb-1" : "opacity-90 group-hover:opacity-100"
                              } transition-all duration-300 group-hover:-translate-y-1`}
                              style={{ transitionDelay: `${ci * 40}ms` }}
                            >
                              <Image
                                src={n.coverUrl!}
                                alt={isEn ? n.titleEn || n.title : n.title}
                                fill
                                sizes="72px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 h-28 text-stone-300 dark:text-[#5A141A]">
                          <BookOpen className="w-10 h-10" />
                          <span className="text-xs font-medium text-stone-400 dark:text-[#B8A699]">
                            {t.comingSoon}
                          </span>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-[#3A040B] flex items-center justify-between text-[11px]">
                        <span className="text-stone-400 dark:text-[#B8A699]">
                          {nominees.length}{" "}
                          {isEn ? "nominees" : isHi ? "नामांकित" : "नामांकित"}
                        </span>
                        {nominees.length > 0 ? (
                          votingOpen ? (
                            <span className="inline-flex items-center gap-1 font-bold text-[#800020] dark:text-[#E5B869]">
                              <Vote className="w-3.5 h-3.5" />
                              {t.cta}
                            </span>
                          ) : (
                            <span className="font-semibold text-stone-400">{t.votingClosed}</span>
                          )
                        ) : (
                          <span className="font-semibold text-stone-300 dark:text-[#5A141A]">
                            {isEn ? "Soon" : isHi ? "जल्द" : "लवकरच"}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* ─── Voting Schedule ─── */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="rounded-2xl bg-white dark:bg-[#220508] border border-stone-200 dark:border-[#4A1217] p-6 sm:p-8 shadow-xs">
              <h3 className="font-marathi-heading text-lg font-bold text-stone-900 dark:text-[#FAF2E8] mb-5 text-center">
                {t.schedule}
              </h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-stone-100 dark:divide-[#3A040B]">
                  <tr>
                    <td className="py-3 font-semibold text-stone-700 dark:text-[#D5C2B4]">
                      {isEn ? "Voting Round" : isHi ? "मतदान" : "मतदान फेरी"}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          votingOpen
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                            : "bg-stone-100 dark:bg-[#2A050C] text-stone-500 dark:text-[#B8A699]"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${votingOpen ? "bg-emerald-500" : "bg-stone-400"}`} />
                        {votingOpen ? t.votingOpen : t.votingClosed}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-stone-700 dark:text-[#D5C2B4]">
                      {isEn ? "Total Votes Cast" : isHi ? "कुल वोट" : "एकूण मते"}
                    </td>
                    <td className="py-3 text-right font-black text-[#800020] dark:text-[#E5B869]">
                      {totalVotes.toLocaleString(isEn ? "en-IN" : "mr-IN")}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-stone-700 dark:text-[#D5C2B4]">
                      {isEn ? "Winners" : isHi ? "विजेता" : "विजेते"}
                    </td>
                    <td className="py-3 text-right text-stone-500 dark:text-[#B8A699] text-xs">
                      {isEn
                        ? "Announced when voting closes"
                        : isHi
                          ? "मतदान बंद होने पर घोषित"
                          : "मतदान बंद झाल्यावर जाहीर"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Rules */}
            <div className="mt-6 rounded-2xl bg-white dark:bg-[#220508] border border-stone-200 dark:border-[#4A1217] p-6 sm:p-8 shadow-xs">
              <h3 className="font-marathi-heading text-lg font-bold text-stone-900 dark:text-[#FAF2E8] mb-4">
                {t.rules}
              </h3>
              <ul className="space-y-2.5 text-sm text-stone-600 dark:text-[#D5C2B4] leading-relaxed">
                <li className="flex gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800020] dark:bg-[#E5B869] mt-2 shrink-0" />
                  {isEn
                    ? "One vote per category, open to every visitor. No account needed."
                    : isHi
                      ? "प्रति श्रेणी एक वोट, हर आगंतुक के लिए खुला। कोई खाता ज़रूरी नहीं।"
                      : "प्रत्येक श्रेणीसाठी एकच मत, सर्वांसाठी खुले. खात्याची गरज नाही."}
                </li>
                <li className="flex gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800020] dark:bg-[#E5B869] mt-2 shrink-0" />
                  {isEn
                    ? "Your vote is final — a category cannot be changed once voted."
                    : isHi
                      ? "आपका वोट अंतिम है — वोट करने के बाद श्रेणी बदली नहीं जा सकती।"
                      : "मत अंतिम — एकदा मतदान झाल्यावर श्रेणी बदलता येत नाही."}
                </li>
                <li className="flex gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800020] dark:bg-[#E5B869] mt-2 shrink-0" />
                  {isEn
                    ? "Nominees are curated by the library from its printed collection."
                    : isHi
                      ? "नामांकन पुस्तकालय के मुद्रित संग्रह से चुने गए हैं।"
                      : "नामांकने ग्रंथालयाच्या मुद्रित संग्रहातून निवडलेली आहेत."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
