"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Vote, CheckCircle2, Loader2, Sparkles, BookOpen } from "lucide-react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { useLanguage } from "@/context/language-context";

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

/** English display names for Marathi book categories (mirrors the genres page map). */
const EN_LABELS: Record<string, string> = {
  "अभिजात कादंबरी": "Classic Novels",
  "पौराणिक व ऐतिहासिक": "Mythological & Historical",
  "ज्ञानपीठ सन्मानित साहित्य": "Jnanpith Honoured Works",
  "ऐतिहासिक कादंबरी": "Historical Novels",
  "आधुनिक मराठी साहित्य": "Modern Marathi Literature",
  "हिन्दी साहित्य": "Hindi Literature",
  "संस्कृत काव्य": "Sanskrit Poetry",
  "संतसाहित्य व आद्य ग्रंथ": "Sant Literature & Early Texts",
  "ज्ञानपीठ व साहित्य अकादमी": "Jnanpith & Sahitya Akademi",
  "विनोदी साहित्य": "Humour & Satire",
  "नाटक व काव्य": "Drama & Poetry",
  "विद्रोही व लोकसाहित्य": "Rebel & Folk Literature",
  "आत्मचरित्र": "Autobiography",
  "इतिहास व संशोधन": "History & Research",
  "स्पर्धा परीक्षा व करिअर": "Competitive Exams & Career",
};

const VOTER_KEY_STORE = "sn_awards_voter_key";
const VOTED_STORE = "sn_awards_voted";

/** Persistent anonymous voter identity (random, stored once). */
function getOrCreateVoterKey(): string {
  if (typeof window === "undefined") return "";
  let key = localStorage.getItem(VOTER_KEY_STORE);
  if (!key || key.length < 8) {
    key =
      "vk_" +
      Array.from(crypto.getRandomValues(new Uint8Array(12)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    localStorage.setItem(VOTER_KEY_STORE, key);
  }
  return key;
}

export default function AwardsClient() {
  const { language } = useLanguage();
  const [data, setData] = useState<AwardsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<Record<string, string>>({}); // category -> nomineeId
  const [votingNominee, setVotingNominee] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, Record<string, number>>>({}); // category -> nomineeId -> votes

  const t = useMemo(
    () => ({
      heroBadge:
        language === "mr"
          ? "वाचकांचा निवड पुरस्कार"
          : language === "hi"
            ? "पाठकों की पसंद पुरस्कार"
            : "Readers' Choice Awards",
      title:
        language === "mr"
          ? "साहित्य निकेतन वाचकांचे पुरस्कार २०२६"
          : language === "hi"
            ? "साहित्य निकेतन पाठक पुरस्कार २०२६"
            : "Sahitya Niketan Readers' Choice 2026",
      subtitle:
        language === "mr"
          ? "प्रत्येक श्रेणीतील आवडते पुस्तक तुम्ही ठरवा. एका श्रेणीत एकच मत — निवड अंतिम!"
          : language === "hi"
            ? "हर श्रेणी में आपकी पसंदीदा किताब चुनें। एक श्रेणी, एक वोट — चुनाव अंतिम है!"
            : "Pick your favourite book in each category. One vote per category — your choice is final!",
      closed:
        language === "mr"
          ? "मतदान बंद आहे. पुरस्कार जाहीर झाले आहेत!"
          : language === "hi"
            ? "मतदान बंद है। पुरस्कार घोषित हो चुके हैं!"
            : "Voting is closed. The winners have been announced!",
      totalVotes:
        language === "mr"
          ? "एकूण मते"
          : language === "hi"
            ? "कुल वोट"
            : "Total votes",
      voteBtn:
        language === "mr"
          ? "मत द्या"
          : language === "hi"
            ? "वोट करें"
            : "Vote",
      voting:
        language === "mr"
          ? "मतदान सुरू..."
          : language === "hi"
            ? "वोट हो रहा है..."
            : "Voting…",
      votedLabel:
        language === "mr"
          ? "तुमचे मत नोंदवले"
          : language === "hi"
            ? "आपका वोट दर्ज"
            : "Your pick",
      alreadyVoted:
        language === "mr"
          ? "तुम्ही या श्रेणीत मतदान केले आहे"
          : language === "hi"
            ? "आपने इस श्रेणी में वोट किया है"
            : "You already voted in this category",
      votes:
        language === "mr"
          ? "मते"
          : language === "hi"
            ? "वोट"
            : "votes",
      empty:
        language === "mr"
          ? "नामांकन लवकरच जाहीर होतील. थांबा!"
          : language === "hi"
            ? "नामांकन जल्द ही घोषित होंगे। रुकें!"
            : "Nominations will be announced soon. Stay tuned!",
      noCovers: language === "mr" ? "पुस्तक" : language === "hi" ? "पुस्तक" : "Book",
      browse:
        language === "mr"
          ? "संपूर्ण संग्रह पाहा"
          : language === "hi"
            ? "पूरा संग्रह देखें"
            : "Browse the full collection",
    }),
    [language]
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/awards", { cache: "no-store" });
      const json = await res.json();
      if (json.success) {
        setData(json);
        const tally: Record<string, Record<string, number>> = {};
        for (const cat of json.categories) {
          tally[cat.category] = {};
          for (const n of cat.nominees) {
            tally[cat.category][n.id] = n.votes;
          }
        }
        setCounts(tally);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Restore this browser's recorded picks
    try {
      const saved = JSON.parse(localStorage.getItem(VOTED_STORE) || "{}");
      if (saved && typeof saved === "object") setVoted(saved);
    } catch {}
  }, [load]);

  async function castVote(category: string, nomineeId: string) {
    if (!data?.votingOpen || voted[category]) return;
    setVotingNominee(nomineeId);
    try {
      const res = await fetch("/api/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomineeId, voterKey: getOrCreateVoterKey() }),
      });
      const json = await res.json();
      if (res.status === 409) {
        // Already voted server-side — treat as recorded for this browser too
        const next = { ...voted, [category]: nomineeId };
        setVoted(next);
        localStorage.setItem(VOTED_STORE, JSON.stringify(next));
        return;
      }
      if (json.success) {
        setCounts((prev) => ({
          ...prev,
          [category]: { ...prev[category], ...json.counts },
        }));
        const next = { ...voted, [category]: nomineeId };
        setVoted(next);
        localStorage.setItem(VOTED_STORE, JSON.stringify(next));
      }
    } finally {
      setVotingNominee(null);
    }
  }

  const isEn = language === "en";
  const catLabel = (c: string) =>
    isEn ? EN_LABELS[c] || c : c;

  const cardAnim = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, type: "spring" as const, stiffness: 180, damping: 20 },
    }),
  };

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] transition-colors pb-20"
      >
        {/* ─── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#2A050C] via-[#55000E] to-[#800020] text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, #E5B86955 0, transparent 45%), radial-gradient(circle at 80% 70%, #ffffff22 0, transparent 40%)",
            }}
          />
          <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#E5B869]/40 text-[#F4D98C] text-xs font-bold tracking-wide uppercase backdrop-blur-sm"
            >
              <Trophy className="h-4 w-4" />
              {t.heroBadge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/80"
            >
              {t.subtitle}
            </motion.p>
            {data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/25 text-xs font-semibold text-[#F4D98C]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t.totalVotes}: {data.totalVotes}
              </motion.div>
            )}
          </div>
        </section>

        <div className="section max-w-[1240px] mx-auto pt-10 px-4 sm:px-6">
          {!data?.votingOpen && data && (
            <div className="mb-10 p-4 rounded-2xl bg-amber-50 dark:bg-[#1E1418] border border-amber-300/70 dark:border-[#E5B869]/30 text-amber-800 dark:text-[#E5B869] text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {t.closed}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-[#800020] dark:text-[#E5B869]" />
            </div>
          ) : !data || data.categories.length === 0 ? (
            <div className="text-center py-24 text-stone-500 dark:text-stone-400">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-[#800020]/40 dark:text-[#E5B869]/30" />
              <p className="text-sm font-medium">{t.empty}</p>
            </div>
          ) : (
            <div className="space-y-14">
              {data.categories.map((cat, ci) => {
                const catCounts = counts[cat.category] || {};
                const totalInCat = Object.values(catCounts).reduce((a, b) => a + b, 0);
                const myPick = voted[cat.category];
                return (
                  <motion.section
                    key={cat.category}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    {/* Category heading */}
                    <div className="flex items-end justify-between gap-4 mb-6">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-[#FAF2E8] flex items-center gap-3">
                        <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-[#800020] to-[#E5B869] dark:from-[#E5B869] dark:to-[#800020]" />
                        {catLabel(cat.category)}
                      </h2>
                      {totalInCat > 0 && (
                        <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 shrink-0">
                          {totalInCat} {t.votes}
                        </span>
                      )}
                    </div>

                    {/* Nominee cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                      {cat.nominees.map((n, i) => {
                        const votes = catCounts[n.id] ?? 0;
                        const pct = totalInCat > 0 ? Math.round((votes / totalInCat) * 100) : 0;
                        const isMine = myPick === n.id;
                        const hasVotedHere = Boolean(myPick);
                        return (
                          <motion.div
                            key={n.id}
                            custom={i}
                            variants={cardAnim}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-40px" }}
                            className={`group relative rounded-2xl border p-3.5 flex flex-col items-center text-center transition-all ${
                              isMine
                                ? "border-[#800020] dark:border-[#E5B869] bg-white dark:bg-[#1E1418] shadow-[0_8px_24px_rgba(128,0,32,0.15)]"
                                : "border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] hover:border-[#800020]/50 dark:hover:border-[#E5B869]/50 hover:shadow-md"
                            }`}
                          >
                            {/* Cover */}
                            <Link
                              href={`/catalogue/${n.bookId}`}
                              className="w-24 sm:w-28 aspect-[2/3] rounded-lg overflow-hidden shadow-[2px_4px_12px_rgba(0,0,0,0.15)] bg-[#FAF8F5] dark:bg-[#180E11] relative mb-3 shrink-0 block"
                            >
                              {n.coverUrl ? (
                                <Image
                                  src={n.coverUrl}
                                  alt={isEn ? n.titleEn || n.title : n.title}
                                  fill
                                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                  sizes="112px"
                                />
                              ) : (
                                <div className="h-full w-full bg-gradient-to-br from-[#800020] to-[#550015] flex flex-col items-center justify-center p-2 text-white">
                                  <BookOpen className="h-5 w-5 text-[#E5B869] mb-1" />
                                  <span className="text-[9px] font-bold line-clamp-2 leading-tight">
                                    {isEn ? n.titleEn || n.title : n.title}
                                  </span>
                                </div>
                              )}
                              {isMine && (
                                <div className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-[#800020] dark:bg-[#E5B869] flex items-center justify-center shadow">
                                  <CheckCircle2 className="h-4 w-4 text-white dark:text-[#18080A]" />
                                </div>
                              )}
                            </Link>

                            {/* Meta */}
                            <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-[#FAF2E8] line-clamp-2 leading-snug">
                              {isEn ? n.titleEn || n.title : n.title}
                            </h3>
                            <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                              {isEn ? n.authorEn || n.author : n.author}
                            </p>

                            {/* Result bar (once any vote exists) */}
                            {totalInCat > 0 && (
                              <div className="w-full mt-3">
                                <div className="flex justify-between text-[10px] font-semibold text-stone-400 dark:text-stone-500 mb-1">
                                  <span>{pct}%</span>
                                  <span>
                                    {votes} {t.votes}
                                  </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-[#E5DDD0] dark:bg-[#332228] overflow-hidden">
                                  <motion.div
                                    className={`h-full rounded-full ${
                                      isMine
                                        ? "bg-gradient-to-r from-[#800020] to-[#E5B869]"
                                        : "bg-[#800020]/60 dark:bg-[#E5B869]/50"
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Vote button */}
                            <button
                              onClick={() => castVote(cat.category, n.id)}
                              disabled={!data?.votingOpen || hasVotedHere || votingNominee === n.id}
                              className={`mt-3 w-full py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                                isMine
                                  ? "bg-gradient-to-r from-[#800020] to-[#93233B] text-white dark:from-[#E5B869] dark:to-[#C9A227] dark:text-[#18080A]"
                                  : hasVotedHere
                                    ? "bg-[#FAF8F5] dark:bg-[#180E11] text-stone-400 dark:text-stone-500 border border-[#E5DDD0] dark:border-[#332228] cursor-not-allowed"
                                    : data?.votingOpen
                                      ? "bg-[#800020] text-white dark:bg-[#E5B869] dark:text-[#18080A] hover:opacity-90 shadow-xs"
                                      : "bg-[#FAF8F5] dark:bg-[#180E11] text-stone-400 dark:text-stone-500 border border-[#E5DDD0] dark:border-[#332228] cursor-not-allowed"
                              }`}
                            >
                              {votingNominee === n.id ? (
                                <>
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  {t.voting}
                                </>
                              ) : isMine ? (
                                <>
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  {t.votedLabel}
                                </>
                              ) : hasVotedHere ? (
                                t.alreadyVoted
                              ) : (
                                <>
                                  <Vote className="h-3.5 w-3.5" />
                                  {t.voteBtn}
                                </>
                              )}
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.section>
                );
              })}
            </div>
          )}

          {/* CTA to catalogue */}
          <div className="mt-16 text-center">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#800020] text-white dark:bg-[#E5B869] dark:text-[#18080A] text-sm font-bold hover:opacity-90 transition-opacity shadow-md"
            >
              <BookOpen className="h-4 w-4" />
              {t.browse}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
