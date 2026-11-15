"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Loader2,
  BookOpen,
  Pin,
  PinOff,
  Archive,
  Send,
  CheckCircle2,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminModal } from "@/components/admin/admin-modal";
import {
  getAllPostsAdmin,
  createPost,
  updatePost,
  publishPost,
  archivePost,
  deletePost,
  togglePinPost,
} from "@/lib/actions/posts";
import type { Post } from "@/types/database";
import { useAdminLanguage } from "@/context/admin-language-context";

const CATEGORIES = ["announcement", "news", "event", "notice", "blog"] as const;
const STATUSES = ["draft", "published", "archived"] as const;
const LANGS = ["mr", "hi", "en"] as const;

const STATUS_STYLES: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  draft: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  archived: "bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20",
  scheduled: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

export default function AdminStoriesPage() {
  const { lang } = useAdminLanguage();
  const isMr = lang === "mr";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("blog");
  const [language, setLanguage] = useState<(typeof LANGS)[number]>("mr");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("draft");
  const [isPinned, setIsPinned] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPostsAdmin();
      setPosts(data);
    } catch (err: any) {
      setError(err?.message || (isMr ? "लोड करण्यात त्रुटी" : "Failed to load stories"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAdd = () => {
    setEditing(null);
    setTitle("");
    setSlug("");
    setCategory("blog");
    setLanguage("mr");
    setExcerpt("");
    setContent("");
    setThumbnail("");
    setTags("");
    setStatus("draft");
    setIsPinned(false);
    setError(null);
    setShowModal(true);
  };

  const openEdit = (post: Post) => {
    setEditing(post);
    setTitle(post.title || "");
    setSlug(post.slug || "");
    setCategory((post.category as any) || "blog");
    setLanguage((post.language as any) || "mr");
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    setThumbnail(post.thumbnail_url || "");
    setTags((post.tags || []).join(", "));
    setStatus((post.status as any) || "draft");
    setIsPinned(!!post.is_pinned);
    setError(null);
    setShowModal(true);
  };

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError(isMr ? "कृपया शीर्षक व मजकूर भरा." : "Please provide a title and content.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload: any = {
        title: title.trim(),
        slug: slug.trim() ? slugify(slug.trim()) : slugify(title.trim()),
        category,
        language,
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        thumbnail_url: thumbnail.trim() || null,
        tags: tags.trim() ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        status,
        is_pinned: isPinned,
        published_at:
          status === "published" && editing?.status !== "published"
            ? new Date().toISOString()
            : editing?.published_at ?? null,
        scheduled_at: null,
        author_email: editing?.author_email ?? null,
        views: editing?.views ?? 0,
      };
      if (editing) {
        await updatePost(editing.id, payload);
      } else {
        await createPost(payload as any);
      }
      setShowModal(false);
      await loadData();
    } catch (err: any) {
      setError("Error saving story: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: Post) => {
    if (!confirm(isMr ? `खात्री करा: "${post.title}" हटवायचा आहे का?` : `Delete story "${post.title}"?`)) return;
    try {
      await deletePost(post.id);
      await loadData();
    } catch (err: any) {
      setError("Error deleting: " + (err?.message || "Unknown error"));
    }
  };

  const handleStatus = async (post: Post, action: "publish" | "archive") => {
    try {
      if (action === "publish") await publishPost(post.id);
      else await archivePost(post.id);
      await loadData();
    } catch (err: any) {
      setError("Error updating status: " + (err?.message || "Unknown error"));
    }
  };

  const handlePin = async (post: Post) => {
    try {
      await togglePinPost(post.id, !post.is_pinned);
      await loadData();
    } catch (err: any) {
      setError("Error updating pin: " + (err?.message || "Unknown error"));
    }
  };

  const visible = posts.filter((p) => statusFilter === "all" || p.status === statusFilter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <AdminTopbar
        title={isMr ? "साहित्य संचित — लेख व्यवस्थापन" : "Sahitya Sanchit — Stories CMS"}
        subtitle={
          isMr
            ? "/stories व /news साठी लेख जोडा, प्रकाशित करा किंवा अभिलेखात ठेवा"
            : "Create, publish and archive stories for the /stories and /news pages"
        }
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>{isMr ? "सर्व लेख" : "All Stories"}</span>
              <span className="text-xs font-semibold text-slate-400">({posts.length})</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isMr
                ? "प्रकाशित लेख वेबसाइटवर /stories पर्सन्ट दिसतील."
                : "Published stories appear on the public /stories page."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {["all", ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 text-[11px] font-semibold capitalize transition-colors cursor-pointer ${
                    statusFilter === s
                      ? "bg-[#800020] text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {s === "all" ? (isMr ? "सर्व" : "All") : s}
                </button>
              ))}
            </div>

            <button
              onClick={loadData}
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
              <span>{isMr ? "नवीन लेख" : "New Story"}</span>
            </button>
          </div>
        </div>

        {/* Inline error */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-600 dark:text-red-400 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-xs font-bold hover:underline cursor-pointer">
              {isMr ? "बंद करा" : "Dismiss"}
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            <p className="text-xs text-slate-400">Loading stories...</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
            <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
              {isMr ? "कोणताही लेख नाही" : "No stories yet"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isMr
                ? "पहिला लेख जोडण्यासाठी वरील 'नवीन लेख' बटणावर क्लिक करा."
                : "Click 'New Story' above to publish the first article."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visible.map((post) => (
              <div
                key={post.id}
                className="relative rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  {/* Top bar: status, category, pin */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${STATUS_STYLES[post.status] || ""}`}>
                        {post.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 capitalize">
                        {post.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase">
                        {post.language}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePin(post)}
                      title={post.is_pinned ? "Unpin" : "Pin to top"}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        post.is_pinned
                          ? "text-[#800020] dark:text-amber-400 bg-[#800020]/10"
                          : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      }`}
                    >
                      {post.is_pinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Thumb + title */}
                  <div className="flex gap-3">
                    {post.thumbnail_url ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100">
                        <Image src={post.thumbnail_url} alt={post.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      {post.excerpt && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{post.excerpt}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer strip */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    <span>{post.views ?? 0} views</span>
                    {post.published_at && (
                      <span>
                        •{" "}
                        {new Date(post.published_at).toLocaleDateString(isMr ? "mr-IN" : "en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {post.status !== "published" && (
                      <button
                        onClick={() => handleStatus(post, "publish")}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                        title={isMr ? "प्रकाशित करा" : "Publish"}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    {post.status === "published" && (
                      <button
                        onClick={() => handleStatus(post, "archive")}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-500/10 transition-colors cursor-pointer"
                        title={isMr ? "अभिलेखात ठेवा" : "Archive"}
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(post)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor modal */}
      <AdminModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? (isMr ? "लेख संपादित करा" : "Edit Story") : isMr ? "नवीन लेख" : "New Story"}
        subtitle={isMr ? "प्रकाशित केल्यावर /stories वर दिसेल" : "Published stories appear on /stories"}
        size="lg"
      >
        <div className="space-y-4">
          {error && showModal && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isMr ? "शीर्षक *" : "Title *"}
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder={isMr ? "लेखाचे शीर्षक" : "Story title"}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                {LANGS.map((l) => (
                  <option key={l} value={l}>{l === "mr" ? "मराठी" : l === "hi" ? "हिंदी" : "English"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isMr ? "थोडक्यात (सारांश)" : "Excerpt"}
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder={isMr ? "कार्डवर दिसणारे संक्षिप्त वर्णन" : "Short description shown on the story card"}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isMr ? "मजकूर *" : "Content *"}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-2.5 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder={isMr ? "संपूर्ण लेख..." : "Full article text..."}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isMr ? "थंबनेल URL" : "Thumbnail URL"}
              </label>
              <input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                placeholder="/images/real/library_vintage_books.png"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isMr ? "टॅग्स (स्वल्पविरामाने)" : "Tags (comma separated)"}
              </label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                placeholder={isMr ? "वारसा, इतिहास" : "heritage, history"}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {isMr ? "स्लग (पर्यायी — रिकामे ठेवल्यास शीर्षकावरून)" : "Slug (optional — auto from title)"}
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-2.5 text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]"
              placeholder="my-story-slug"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="rounded border-slate-300 accent-[#800020] cursor-pointer"
              />
              {isMr ? "सुचना बॅनरवर शिखरावर दाखवा" : "Pin to top"}
            </label>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isMr ? "रद्द" : "Cancel"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{saving ? (isMr ? "जतन करत आहे..." : "Saving...") : isMr ? "जतन करा" : "Save Story"}</span>
              </button>
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
