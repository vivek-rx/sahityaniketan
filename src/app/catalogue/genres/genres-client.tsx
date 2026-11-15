"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Library, Sparkles, BookOpen } from "lucide-react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { useLanguage } from "@/context/language-context";

export interface GenreGroup {
  category: string;
  count: number;
  covers: string[];
}

/** English display names for the seeded Marathi genres; new categories fall back gracefully. */
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

/** Choice-Awards-style rotating card gradients (maroon-first, warm parchment family). */
const CARD_STYLES = [
  "from-[#800020] via-[#93233B] to-[#4A050E] text-white",
  "from-amber-500 via-amber-600 to-orange-700 text-white",
  "from-[#7C3A46] via-[#8E4A56] to-[#521E28] text-white",
  "from-emerald-700 via-emerald-800 to-emerald-950 text-white",
  "from-rose-800 via-rose-900 to-[#4A050E] text-white",
  "from-[#B8860B] via-[#A0740A] to-[#6B4E06] text-white",
  "from-slate-800 via-slate-900 to-black text-white",
  "from-[#93334D] via-[#A54A63] to-[#5C1E30] text-white",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 210, damping: 22 },
  },
};

export function GenresClient({ groups }: { groups: GenreGroup[] }) {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";
  const t = (mr: string, hi: string, en: string) => (isEn ? en : isHi ? hi : mr);

  const totalBooks = groups.reduce((s, g) => s + g.count, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#120B0D] transition-colors">
        {/* ── Choice-Awards-style hero ── */}
        <section className="relative overflow-hidden pt-10 pb-6 px-4 sm:px-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-[#800020]/10 dark:bg-[#E5B869]/10 blur-3xl"
          />
          <div className="max-w-6xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#800020]/10 dark:bg-[#E5B869]/15 border border-[#800020]/20 dark:border-[#E5B869]/25 text-[11px] font-bold text-[#800020] dark:text-[#E5B869] mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t("वाचकांची निवड", "पाठकों की पसंद", "Readers' Choice")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black font-marathi-heading tracking-tight text-stone-900 dark:text-white leading-[1.05]"
            >
              {t(
                "ग्रंथश्रेणी २०२६",
                "पुस्तक श्रेणियाँ २०२६",
                "Book Genres 2026"
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto"
            >
              {t(
                "ग्रंथालयाच्या अभिलेखागारातील संग्रह विषयानुसार शोधा — प्रत्येक श्रेणीतील उपलब्ध ग्रंथ पाहा.",
                "लाइब्रेरी संग्रह को विषय के अनुसार खोजें — हर श्रेणी की उपलब्ध पुस्तकें देखें.",
                "Explore the library's archive by subject — see the books available in every category."
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22 }}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#231A1E] border border-[#E5DDD0] dark:border-stone-800 shadow-sm text-xs font-bold text-stone-700 dark:text-stone-200"
            >
              <Library className="w-4 h-4 text-[#800020] dark:text-[#E5B869]" />
              {groups.length} {t("श्रेणी", "श्रेणियाँ", "genres")} • {totalBooks}{" "}
              {t("ग्रंथ", "पुस्तकें", "books")}
            </motion.div>
          </div>
        </section>

        {/* ── Genre card grid (cover-centric, Choice-Awards style) ── */}
        <section className="px-4 sm:px-6 pb-20">
          {groups.length === 0 ? (
            <div className="max-w-lg mx-auto text-center py-24 space-y-4">
              <BookOpen className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600" />
              <h3 className="font-marathi-heading text-lg font-bold text-stone-700 dark:text-stone-300">
                {t("श्रेणी उपलब्ध नाहीत", "कोई श्रेणी उपलब्ध नहीं", "No genres available yet")}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t(
                  "ग्रंथ जोडल्यावर श्रेणी येथे दिसतील.",
                  "पुस्तक जोड़ने के बाद श्रेणियाँ यहाँ दिखेंगी.",
                  "Genres will appear here once books are added to the catalogue."
                )}
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {groups.map((g, idx) => {
                const style = CARD_STYLES[idx % CARD_STYLES.length];
                const en = EN_LABELS[g.category];
                return (
                  <motion.div key={g.category} variants={cardAnim} whileHover={{ y: -6 }} className="h-full">
                    <Link
                      href={`/catalogue?category=${encodeURIComponent(g.category)}`}
                      className={`group relative flex flex-col h-full overflow-hidden rounded-3xl bg-gradient-to-br ${style} p-5 shadow-sm hover:shadow-xl transition-shadow duration-300`}
                    >
                      {/* decorative arc */}
                      <div
                        aria-hidden
                        className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500"
                      />
                      <div
                        aria-hidden
                        className="absolute -bottom-14 -left-8 w-24 h-24 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* fanned covers */}
                      <div className="relative h-32 sm:h-36 mb-4 shrink-0">
                        {g.covers.length > 0 ? (
                          g.covers.map((cover, ci) => (
                            <motion.div
                              key={cover + ci}
                              className="absolute top-1/2 left-1/2 w-20 h-28 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden shadow-lg ring-1 ring-black/10 bg-white/80"
                              style={{
                                rotate: (ci - (g.covers.length - 1) / 2) * 9,
                                x: (ci - (g.covers.length - 1) / 2) * 22,
                                zIndex: ci,
                              }}
                              whileHover={{ scale: 1.08, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            >
                              <Image
                                src={cover}
                                alt=""
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </motion.div>
                          ))
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-white/40" />
                          </div>
                        )}
                      </div>

                      <h2 className="font-marathi-heading text-base sm:text-lg font-extrabold leading-snug">
                        {g.category}
                      </h2>
                      {en && (
                        <p className="text-[11px] font-medium text-white/70 mt-0.5">
                          {en}
                        </p>
                      )}

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-bold">
                          {g.count} {t("ग्रंथ", "पुस्तकें", "books")}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white/80 group-hover:text-white transition-colors">
                          {t("पहा", "देखें", "Browse")}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
