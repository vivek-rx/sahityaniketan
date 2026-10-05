"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Eye,
  EyeOff,
  RefreshCw,
  FileText,
  AlertCircle,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminModal } from "@/components/admin/admin-modal";
import { BobbingDots } from "@/components/ui/bobbing-dots";
import { useAdminLanguage } from "@/context/admin-language-context";
import {
  getNotices,
  createNotice,
  deleteNotice,
  updateNotice,
} from "@/lib/actions/notices";
import type { Notice } from "@/types/database";

export default function AdminNoticeboardPage() {
  const { lang, t } = useAdminLanguage();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<"urgent" | "high" | "normal" | "low">("normal");
  const [isActive, setIsActive] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const dbNotices = await getNotices(false);
      setNotices(dbNotices || []);
    } catch (err) {
      console.error("Failed to load notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setPriority("normal");
    setIsActive(true);
    setShowModal(true);
  };

  const openEdit = (n: Notice) => {
    setEditing(n);
    setTitle(n.title);
    setContent(n.content || "");
    setPriority(n.priority || "normal");
    setIsActive(n.is_active !== false);
    setShowModal(true);
  };

  const handleSaveNotice = async () => {
    if (!title.trim()) {
      alert(lang === "mr" ? "कृपया नोटीसचे शीर्षक प्रविष्ट करा." : "Please provide a notice title.");
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        await updateNotice(editing.id, {
          title: title.trim(),
          content: content.trim() || null,
          priority,
          is_active: isActive,
        });
      } else {
        await createNotice({
          title: title.trim(),
          content: content.trim() || null,
          priority,
          type: "general",
          is_active: isActive,
          expires_at: null,
          created_by: null,
        });
      }
      setShowModal(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sahitya-admin-update"));
      }
      await loadData();
    } catch (err) {
      alert((lang === "mr" ? "सूचना जतन करताना त्रुटी आली: " : "Error saving notice: ") + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleNotice = async (notice: Notice) => {
    try {
      await updateNotice(notice.id, { is_active: !notice.is_active });
      await loadData();
    } catch (err) {
      alert((lang === "mr" ? "स्थिती बदलण्यात त्रुटी आली: " : "Error updating status: ") + (err as Error).message);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    const confirmMsg = lang === "mr" ? "ही सूचना कायमची हटवायची आहे का?" : "Are you sure you want to permanently delete this notice?";
    if (!confirm(confirmMsg)) return;
    try {
      await deleteNotice(id);
      await loadData();
    } catch (err) {
      alert((lang === "mr" ? "हटवताना त्रुटी आली: " : "Error deleting notice: ") + (err as Error).message);
    }
  };

  const PRIORITY_BADGES: Record<string, { label: string; color: string }> = {
    urgent: {
      label: t.noticePriorityUrgent,
      color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300",
    },
    high: {
      label: t.noticePriorityHigh,
      color: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
    },
    normal: {
      label: t.noticePriorityNormal,
      color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300",
    },
    low: {
      label: t.noticePriorityLow,
      color: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300",
    },
  };

  const activeCount = notices.filter((n) => n.is_active !== false).length;

  return (
    <>
      <AdminTopbar
        title={t.noticePageTitle}
        subtitle={`${activeCount} ${lang === "mr" ? "सक्रिय सूचना" : "active notices"}`}
      />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
        {/* Header Action Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {t.noticePageTitle}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.noticePageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>{t.refreshBtn}</span>
            </button>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white px-5 py-2.5 text-sm sm:text-base font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus className="h-5 w-5" />
              <span>{t.noticeAddBtn}</span>
            </button>
          </div>
        </div>

        {/* Notices List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <BobbingDots size="lg" className="text-[#800020]" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {lang === "mr" ? "परिपत्रके लोड होत आहेत..." : "Loading notices..."}
            </p>
          </div>
        ) : notices.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <FileText className="h-12 w-12 mx-auto text-slate-300" />
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">{t.noticeNoNotices}</p>
            <p className="text-sm text-slate-500">
              {lang === "mr" ? "नवीन नोटीस जोडण्यासाठी वरील बटणावर क्लिक करा." : "Click the button above to add a new notice."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((n) => {
              const priorityInfo = PRIORITY_BADGES[n.priority || "normal"] || PRIORITY_BADGES.normal;

              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border bg-white dark:bg-slate-900 transition-all p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    n.is_active !== false
                      ? "border-slate-200 dark:border-slate-800 shadow-xs"
                      : "border-slate-200/60 dark:border-slate-800/60 opacity-60 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                          {n.title}
                        </h3>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${priorityInfo.color}`}
                        >
                          {priorityInfo.label}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            n.is_active !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {n.is_active !== false ? (lang === "mr" ? "सक्रिय" : "Active") : (lang === "mr" ? "बंद" : "Inactive")}
                        </span>
                      </div>

                      {n.content && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {n.content}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {new Date(n.created_at).toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => openEdit(n)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>{t.btnEdit}</span>
                    </button>

                    <button
                      onClick={() => handleToggleNotice(n)}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-300 cursor-pointer"
                      title={n.is_active !== false ? t.toggleHide : t.toggleShow}
                    >
                      {n.is_active !== false ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer"
                      title={t.btnDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Notice Modal */}
      <AdminModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? t.noticeModalEditTitle : t.noticeModalNewTitle}
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              onClick={() => setShowModal(false)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {t.cancelBtn}
            </button>
            <button
              onClick={handleSaveNotice}
              disabled={saving}
              className="rounded-xl bg-[#800020] hover:bg-[#66001a] text-white px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {saving && <BobbingDots size="sm" className="text-white" />}
              <span>{t.noticeSaveBtn}</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4 font-sans">
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.noticeTitleLabel}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.noticeTitlePlaceholder}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.noticeContentLabel}
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.noticeContentPlaceholder}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3.5 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.noticePriorityLabel}
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base text-slate-900 dark:text-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              <option value="normal">{t.noticePriorityNormal}</option>
              <option value="high">{t.noticePriorityHigh}</option>
              <option value="urgent">{t.noticePriorityUrgent}</option>
              <option value="low">{t.noticePriorityLow}</option>
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded accent-[#800020]"
            />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {t.noticeActiveCheckLabel}
            </span>
          </label>
        </div>
      </AdminModal>
    </>
  );
}
