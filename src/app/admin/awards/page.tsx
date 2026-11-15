"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  RefreshCw,
  Loader2,
  Trophy,
  Power,
  CheckCircle2,
  X,
  Search,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminModal } from "@/components/admin/admin-modal";
import {
  getAwardsAdmin,
  getNominationBooks,
  getBookCategories,
  addNominee,
  removeNominee,
  setVotingOpen,
  type AwardNomineeRow,
} from "@/lib/actions/awards";
import type { Book } from "@/types/database";
import { useAdminLanguage } from "@/context/admin-language-context";

export default function AdminAwardsPage() {
  const { lang } = useAdminLanguage();
  const isMr = lang === "mr";

  const [nominees, setNominees] = useState<AwardNomineeRow[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [votingOpen, setVotingOpenState] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Nomination form state
  const [bookQuery, setBookQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [noms, bks, cats] = await Promise.all([
        getAwardsAdmin(),
        getNominationBooks(),
        getBookCategories(),
      ]);
      setNominees(noms);
      setBooks(bks);
      setCategories(cats);
      if (cats.length > 0) setSelectedCategory((c) => c || cats[0]);
      // Voting toggle state comes back from the public API settings row;
      // read it from the nominees-free source: site_settings via a light read.
    } catch (err: any) {
      setError(err?.message || (isMr ? "लोड करण्यात त्रुटी" : "Failed to load"));
    } finally {
      setLoading(false);
    }
  };

  // Voting open state (public read, no auth needed)
  const loadVotingState = async () => {
    try {
      const res = await fetch("/api/awards", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setVotingOpenState(json.votingOpen);
    } catch {}
  };

  useEffect(() => {
    loadData();
    loadVotingState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredBooks = useMemo(() => {
    const q = bookQuery.trim().toLowerCase();
    if (!q) return books.slice(0, 30);
    return books
      .filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.title_marathi || "").toLowerCase().includes(q) ||
          (b.author || "").toLowerCase().includes(q)
      )
      .slice(0, 30);
  }, [books, bookQuery]);

  const openAdd = () => {
    setSelectedBook(null);
    setBookQuery("");
    setSelectedCategory(categories[0] || "");
    setError(null);
    setShowModal(true);
  };

  const handleAdd = async () => {
    if (!selectedBook || !selectedCategory) {
      setError(isMr ? "पुस्तक व श्रेणी निवडा." : "Pick a book and a category.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await addNominee(selectedBook.id, selectedCategory);
      setShowModal(false);
      setSelectedBook(null);
      await loadData();
    } catch (err: any) {
      setError(err?.message || "Error adding nominee");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row: AwardNomineeRow) => {
    const label = row.book?.title_marathi || row.book?.title || row.id;
    if (
      !confirm(
        isMr
          ? `खात्री करा: "${label}" हे नामांकन हटवायचे आहे का? (मते देखील हटतील)`
          : `Remove nominee "${label}"? (Its votes will be deleted too)`
      )
    )
      return;
    try {
      await removeNominee(row.id);
      await loadData();
    } catch (err: any) {
      setError("Error removing: " + (err?.message || "Unknown error"));
    }
  };

  const handleToggleVoting = async () => {
    setSaving(true);
    try {
      const next = !votingOpen;
      await setVotingOpen(next);
      setVotingOpenState(next);
    } catch (err: any) {
      setError("Error toggling voting: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  // Group nominees by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, AwardNomineeRow[]>();
    for (const n of nominees) {
      const list = map.get(n.category) || [];
      list.push(n);
      map.set(n.category, list);
    }
    return [...map.entries()];
  }, [nominees]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <AdminTopbar
        title={isMr ? "वाचकांचा निवड पुरस्कार — व्यवस्थापन" : "Readers' Choice Awards — Management"}
        subtitle={
          isMr
            ? "/awards साठी नामांकन जोडा आणि मतदान चालू/बंद करा"
            : "Manage nominations for /awards and open or close voting"
        }
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Voting toggle + refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>{isMr ? "नामांकने" : "Nominations"}</span>
              <span className="text-xs font-semibold text-slate-400">({nominees.length})</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isMr
                ? "नामांकने सार्वजनिक /awards पृष्ठावर दिसतील."
                : "Nominations appear on the public /awards page."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleToggleVoting}
              disabled={saving || votingOpen === null}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer ${
                votingOpen
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <Power className="w-4 h-4" />
              {votingOpen === null
                ? "…"
                : votingOpen
                  ? isMr
                    ? "मतदान चालू — बंद करा?"
                    : "Voting open — close it?"
                  : isMr
                    ? "मतदान बंद — चालू करा?"
                    : "Voting closed — open it?"}
            </button>

            <button
              onClick={() => {
                loadData();
                loadVotingState();
              }}
              disabled={loading}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isMr ? "नवीन नामांकन" : "New Nomination"}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-600 dark:text-red-400 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-xs font-bold hover:underline cursor-pointer">
              {isMr ? "बंद करा" : "Dismiss"}
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            <p className="text-xs text-slate-400">Loading…</p>
          </div>
        ) : nominees.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Trophy className="w-12 h-12 mx-auto text-slate-400" />
            <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
              {isMr ? "कोणतेही नामांकन नाही" : "No nominations yet"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isMr
                ? "'नवीन नामांकन' बटणावरून पहिले पुस्तक जोडा."
                : "Add the first nominated book via 'New Nomination'."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([category, rows]) => (
              <div
                key={category}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
              >
                <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-[#800020] to-[#E5B869]" />
                    {category}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {rows.length} {isMr ? "नामांकने" : "nominees"} •{" "}
                    {rows.reduce((a, r) => a + r.votes, 0)} {isMr ? "मते" : "votes"}
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rows.map((row) => (
                    <div key={row.id} className="px-5 py-3 flex items-center gap-3.5">
                      <div className="relative w-10 h-14 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
                        {row.book?.cover_url ? (
                          <Image
                            src={row.book.cover_url}
                            alt={row.book.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-[#800020] to-[#550015] flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-[#E5B869]" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {row.book?.title_marathi || row.book?.title || "—"}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {row.book?.author}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                        {row.votes} {isMr ? "मते" : "votes"}
                      </span>
                      <button
                        onClick={() => handleDelete(row)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                        title={isMr ? "हटवा" : "Remove"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nomination modal */}
      <AdminModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={isMr ? "नवीन नामांकन" : "New Nomination"}
        subtitle={isMr ? "पुस्तक निवडा व श्रेणी ठरवा" : "Pick a book and set its award category"}
        size="lg"
      >
        <div className="space-y-4">
          {error && showModal && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isMr ? "पुरस्कार श्रेणी *" : "Award category *"}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Book search */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isMr ? "पुस्तक शोधा *" : "Find a book *"}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={bookQuery}
                onChange={(e) => setBookQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                placeholder={isMr ? "पुस्तकाचे नाव किंवा लेखक…" : "Title or author…"}
              />
            </div>

            {selectedBook && (
              <div className="mt-2.5 flex items-center gap-3 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 line-clamp-1 flex-1">
                  {selectedBook.title_marathi || selectedBook.title} — {selectedBook.author}
                </span>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="mt-2.5 max-h-60 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBooks.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBook(b);
                    setBookQuery("");
                  }}
                  disabled={Boolean(selectedBook)}
                  className="w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <div className="relative w-7 h-10 rounded overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                    {b.cover_url ? (
                      <Image src={b.cover_url} alt={b.title} fill className="object-cover" sizes="28px" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {b.title_marathi || b.title}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {b.author} {b.category ? `• ${b.category}` : ""}
                    </p>
                  </div>
                </button>
              ))}
              {filteredBooks.length === 0 && (
                <p className="px-3 py-4 text-xs text-slate-400 text-center">
                  {isMr ? "कोणतेही पुस्तक सापडले नाही" : "No books match"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isMr ? "रद्द" : "Cancel"}
            </button>
            <button
              onClick={handleAdd}
              disabled={saving || !selectedBook}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
              <span>{saving ? (isMr ? "जतन करत आहे..." : "Adding...") : isMr ? "नामांकित करा" : "Add Nominee"}</span>
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
