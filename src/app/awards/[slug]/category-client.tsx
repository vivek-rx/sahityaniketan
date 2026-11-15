"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Vote, CheckCircle2, Loader2, ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { useLanguage } from "@/context/language-context";
import { categoryToSlug, slugToCategory, CATEGORY_EN_LABELS } from "@/lib/awards-slugs";

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

export default function CategoryClient({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";

  const [data, setData] = useState<AwardsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<Record<string, string>>({}); // category -> nomineeId
  const [votingNominee, setVotingNominee] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const category = useMemo(() => slugToCategory(slug), [slug]);

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
      if (saved && typeof saved === "object") setVoted(saved);
    } catch {}
  }, [load]);

  const t = {
    allCategories: isEn ? "All Categories" : isHi ? "सभी श्रेणियाँ" : "सर्व श्रेणी",
    nominees: isEn ? "Nominees" : isHi ? "नामांकित" : "नामांकित",
    vote: isEn ? "Vote" : isHi ? "वोट करें" : "मत द्या",
    voting: isEn ? "Voting…" : isHi ? "वोट हो रहा है…" : "मतदान सुरू…",
    yourPick: isEn ? "Your Pick" : isHi ? "आपकी पसंद" : "तुमची निवड",
    already: isEn ? "You already voted in this category" : isHi ? "आपने इस श्रेणी में वोट कर दिया है" : "तुम्ही या श्रेणीत आधीच मतदान केले आहे",
    closed: isEn ? "Voting is closed for this category" : isHi ? "इस श्रेणी के लिए मतदान बंद है" : "या श्रेणीतील मतदान बंद आहे",
    comingSoon: isEn ? "Nominees will be announced soon. Stay tuned!" : isHi ? "नामांकन जल्द ही घोषित होंगे। रुकें!" : "नामांकन लवकरच जाहीर होतील. थांबा!",
    votes: isEn ? "votes" : isHi ? "वोट" : "मते",
    next: isEn ? "Next category" : isHi ? "अगली श्रेणी" : "पुढील श्रेणी",
  };

  const catData = data?.categories.find((c) => c.category === category) || null;
  const nominees = catData?.nominees || [];
  const myVote = category ? voted[category] : undefined;
  const catTotal = nominees.reduce((sum, n) => sum + n.votes, 0);
  const winnerId =
    !data?.votingOpen && nominees.length > 0
      ? nominees.reduce((a, b) => (b.votes > a.votes ? b : a), nominees[0]).id
      : null;

  const catLabel = (c: string) => (isEn ? CATEGORY_EN_LABELS[c] || c : c);

  async function castVote(nomineeId: string) {
    if (!category || !data?.votingOpen || voted[category]) return;
    setVotingNominee(nomineeId);
    setError(null);
    try {
      const res = await fetch("/api/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomineeId, voterKey: getOrCreateVoterKey() }),
      });
      const json = await res.json();
      if (res.status === 409) {
        const existing = nominees.find((n) => n.id === json?.nomineeId)?.id || nomineeId;
        const next = { ...voted, [category]: existing };
        setVoted(next);
        localStorage.setItem(VOTED_STORE, JSON.stringify(next));
        return;
      }
      if (!json.success) {
        setError(json.error || "Vote failed");
        return;
      }
      // Update tally from server truth, then re-read payload for counts
      const next = { ...voted, [category]: nomineeId };
      setVoted(next);
      localStorage.setItem(VOTED_STORE, JSON.stringify(next));
      await load();
    } catch {
      setError("Vote failed — please retry");
    } finally {
      setVotingNominee(null);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] bg-[#FAF8F5] dark:bg-[#120B0D] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#800020]" />
            <p className="text-xs text-stone-500 font-medium">{t.nominees}…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors">
        {/* ─── Masthead strip ─── */}
        <div className="bg-gradient-to-r from-[#3A040B] via-[#55000E] to-[#800020] text-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
            <Link
              href="/awards"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-[#E5B869] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.allCategories}
            </Link>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#E5B869]/40 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#F4D98C]" />
              </div>
              <div>
                <h1 className="font-marathi-heading text-xl sm:text-2xl font-black leading-tight">
                  {category ? catLabel(category) : "—"}
                </h1>
                <p className="text-[11px] text-white/70">
                  {isEn ? "Sahitya Niketan Choice Awards" : isHi ? "साहित्य निकेतन पाठक पुरस्कार" : "साहित्य निकेतन वाचकांचे पुरस्कार"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
          {/* ─── Sidebar: all categories ─── */}
          <aside className="lg:w-60 shrink-0">
            <div className="rounded-2xl bg-white dark:bg-[#220508] border border-stone-200 dark:border-[#4A1217] p-4 lg:sticky lg:top-24">
              <Link
                href="/awards"
                className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-100 dark:border-[#3A040B] font-marathi-heading font-bold text-sm text-stone-900 dark:text-[#FAF2E8] hover:text-[#800020] dark:hover:text-[#E5B869] transition-colors"
              >
                <Trophy className="w-4 h-4 text-[#800020] dark:text-[#E5B869]" />
                {isEn ? "Choice Awards 2026" : isHi ? "चॉइस अवार्ड्स २०२६" : "निवड पुरस्कार २०२६"}
              </Link>
              <nav className="space-y-0.5 max-h-[420px] overflow-y-auto">
                {(data?.categories || []).map((c) => {
                  const active = c.category === category;
                  const hasVoted = Boolean(voted[c.category]);
                  return (
                    <Link
                      key={c.category}
                      href={`/awards/${categoryToSlug(c.category)}`}
                      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        active
                          ? "bg-[#800020] text-white"
                          : "text-stone-600 dark:text-[#D5C2B4] hover:bg-stone-100 dark:hover:bg-[#2A050C] hover:text-[#800020] dark:hover:text-[#E5B869]"
                      }`}
                    >
                      <span className="truncate">{catLabel(c.category)}</span>
                      {hasVoted && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ─── Nominee grid ─── */}
          <section className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="font-marathi-heading text-lg sm:text-xl font-bold text-stone-900 dark:text-[#FAF2E8]">
                {t.nominees}
                {catData && (
                  <span className="text-sm font-medium text-stone-400 dark:text-[#B8A699]"> ({catData.nominees.length})</span>
                )}
              </h2>
              {myVote && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.yourPick}
                </span>
              )}
            </div>

            {(myVote || !data?.votingOpen) && error === null && null}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs font-semibold text-red-700 dark:text-red-300">
                {error}
              </div>
            )}
            {!data?.votingOpen && (
              <div className="mb-6 p-3.5 rounded-xl bg-stone-100 dark:bg-[#2A050C] border border-stone-200 dark:border-[#4A1217] text-xs font-semibold text-stone-500 dark:text-[#B8A699] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {t.closed}
              </div>
            )}
            {myVote && data?.votingOpen && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {t.already}
              </div>
            )}

            {!catData || nominees.length === 0 ? (
              <div className="rounded-2xl bg-white dark:bg-[#220508] border border-stone-200 dark:border-[#4A1217] p-14 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-stone-300 dark:text-[#5A141A]" />
                <p className="mt-4 text-sm text-stone-500 dark:text-[#B8A699] font-medium">{t.comingSoon}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
                {nominees.map((n, idx) => {
                  const chosen = myVote === n.id;
                  const pct = catTotal > 0 ? Math.round((n.votes / catTotal) * 100) : 0;
                  const showResults = Boolean(myVote) || !data?.votingOpen;
                  const isWinner = winnerId === n.id;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
                      className={`rounded-2xl bg-white dark:bg-[#220508] border p-3 flex flex-col transition-all ${
                        chosen
                          ? "border-[#E5B869] ring-2 ring-[#E5B869]/40 shadow-md"
                          : isWinner
                            ? "border-[#800020]/60 shadow-md"
                            : "border-stone-200 dark:border-[#4A1217] shadow-xs"
                      }`}
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-stone-100 dark:bg-[#2A050C] border border-stone-200/70 dark:border-[#3A040B] mb-3">
                        {n.coverUrl ? (
                          <Image
                            src={n.coverUrl}
                            alt={`${isEn ? n.titleEn || n.title : n.title} — ${isEn ? n.authorEn || n.author : n.author}`}
                            fill
                            sizes="(max-width: 640px) 45vw, 200px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-300 dark:text-[#5A141A] p-2 text-center">
                            <BookOpen className="w-8 h-8" />
                            <span className="text-[10px] mt-1.5 font-semibold text-stone-400 dark:text-[#B8A699] leading-tight">
                              {isEn ? n.titleEn || n.title : n.title}
                            </span>
                          </div>
                        )}
                        {isWinner && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#800020] text-white text-[9px] font-black uppercase tracking-wider shadow">
                            {isEn ? "Winner" : isHi ? "विजेता" : "विजेता"}
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-bold text-stone-900 dark:text-[#FAF2E8] leading-snug line-clamp-2 font-marathi-heading">
                        {isEn ? n.titleEn || n.title : n.title}
                      </p>
                      <p className="text-[10px] text-stone-500 dark:text-[#B8A699] mt-0.5 truncate font-marathi-body">
                        {isEn ? n.authorEn || n.author : n.author}
                      </p>

                      {showResults && (
                        <div className="mt-2">
                          <div className="h-1.5 rounded-full bg-stone-100 dark:bg-[#2A050C] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className={`h-full rounded-full ${chosen ? "bg-[#E5B869]" : "bg-[#800020]/70"}`}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[10px] font-semibold text-stone-400 dark:text-[#B8A699]">
                            <span>{pct}%</span>
                            <span>
                              {n.votes.toLocaleString(isEn ? "en-IN" : "mr-IN")} {t.votes}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-auto pt-2.5">
                        {chosen ? (
                          <span className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#E5B869] text-[#3A040B] text-xs font-black">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {t.yourPick}
                          </span>
                        ) : data?.votingOpen && !myVote ? (
                          <button
                            onClick={() => castVote(n.id)}
                            disabled={votingNominee !== null}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#800020] hover:bg-[#66001A] text-white text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 cursor-pointer"
                          >
                            {votingNominee === n.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Vote className="w-3.5 h-3.5" />
                            )}
                            <span>{votingNominee === n.id ? t.voting : t.vote}</span>
                          </button>
                        ) : (
                          <span className="w-full inline-flex items-center justify-center py-2 rounded-lg bg-stone-100 dark:bg-[#2A050C] text-stone-400 dark:text-[#B8A699] text-xs font-bold">
                            {t.vote}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Prev / Next category */}
            {data && data.categories.length > 1 && (
              <div className="mt-10 flex items-center justify-between gap-4">
                {(() => {
                  const idx = data.categories.findIndex((c) => c.category === category);
                  const prev = idx > 0 ? data.categories[idx - 1] : null;
                  const next = idx >= 0 && idx < data.categories.length - 1 ? data.categories[idx + 1] : null;
                  return (
                    <>
                      <div>
                        {prev && (
                          <Link
                            href={`/awards/${categoryToSlug(prev.category)}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-[#B8A699] hover:text-[#800020] dark:hover:text-[#E5B869] transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                            {catLabel(prev.category)}
                          </Link>
                        )}
                      </div>
                      <div>
                        {next && (
                          <Link
                            href={`/awards/${categoryToSlug(next.category)}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-[#B8A699] hover:text-[#800020] dark:hover:text-[#E5B869] transition-colors"
                          >
                            {t.next}: {catLabel(next.category)}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
