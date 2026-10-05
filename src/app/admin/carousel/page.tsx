"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, GripVertical, Eye, EyeOff, Edit2, Trash2, Layers, RefreshCw, ExternalLink, Loader2 } from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminModal } from "@/components/admin/admin-modal";
import { getCarouselSlides, createSlide, updateSlide, deleteSlide, toggleSlideActive } from "@/lib/actions/carousel";
import { useAdminLanguage } from "@/context/admin-language-context";
import type { CarouselSlide } from "@/types/database";

export default function AdminCarouselPage() {
  const { lang, t } = useAdminLanguage();
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // Form State
  const [heading, setHeading] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const loadSlidesData = async () => {
    setLoading(true);
    try {
      const data = await getCarouselSlides(false);
      setSlides(data || []);
    } catch (e) {
      console.error("Failed to load carousel slides", e);
      setSlides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlidesData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setHeading("");
    setSubtitle("");
    setButtonText("");
    setButtonUrl("");
    setImageUrl("");
    setIsActive(true);
    setShowModal(true);
  };

  const openEdit = (s: any) => {
    setEditing(s);
    setHeading(s.title || "");
    setSubtitle(s.subtitle || "");
    setButtonText(s.button_text || "");
    setButtonUrl(s.button_link || "");
    setImageUrl(s.image_url || "");
    setIsActive(s.is_active !== false);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!heading.trim() || !imageUrl.trim()) {
      alert(lang === "mr" ? "कृपया मुख्य मथळा आणि फोटो URL प्रविष्ट करा." : "Please provide a headline and image URL.");
      return;
    }

    setSaving(true);
    try {
      if (editing && !editing.is_default) {
        await updateSlide(editing.id, {
          title: heading.trim(),
          subtitle: subtitle.trim() || null,
          button_text: buttonText.trim() || null,
          button_link: buttonUrl.trim() || null,
          image_url: imageUrl.trim(),
          is_active: isActive,
        });
      } else {
        await createSlide({
          title: heading.trim(),
          subtitle: subtitle.trim() || null,
          button_text: buttonText.trim() || null,
          button_link: buttonUrl.trim() || null,
          image_url: imageUrl.trim(),
          is_active: isActive,
          scheduled_at: null,
          display_order: slides.length,
        });
      }
      setShowModal(false);
      await loadSlidesData();
    } catch (e) {
      alert((lang === "mr" ? "स्लाइड जतन करताना त्रुटी आली: " : "Error saving slide: ") + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      await toggleSlideActive(id, !current);
      await loadSlidesData();
    } catch (e) {
      alert((lang === "mr" ? "स्थिती बदलताना त्रुटी आली: " : "Error updating status: ") + (e as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmMsg = lang === "mr" ? "ही स्लाइड कायमची हटवायची आहे का?" : "Are you sure you want to permanently delete this slide?";
    if (!confirm(confirmMsg)) return;
    try {
      await deleteSlide(id);
      await loadSlidesData();
    } catch (e) {
      alert((lang === "mr" ? "हटवताना त्रुटी आली: " : "Error deleting slide: ") + (e as Error).message);
    }
  };

  const activeCount = slides.filter((s) => s.is_active !== false).length;

  return (
    <>
      <AdminTopbar
        title={t.carouselPageTitle}
        subtitle={`${activeCount} ${t.carouselCountLabel}`}
      />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
        {/* Header Action Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {t.carouselPageTitle}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.carouselPageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadSlidesData}
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
              <span>{t.carouselAddBtn}</span>
            </button>
          </div>
        </div>

        {/* Slides List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#800020] dark:text-[#E5B869]" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {lang === "mr" ? "स्लाइड्स लोड होत आहेत..." : "Loading slides..."}
            </p>
          </div>
        ) : slides.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <Layers className="h-12 w-12 mx-auto text-slate-300" />
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">{t.carouselNoSlides}</p>
            <p className="text-sm text-slate-500">
              {lang === "mr" ? "नवीन स्लाइड जोडण्यासाठी वरील बटणावर क्लिक करा." : "Click the button above to add your first slide."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {slides.map((slide, idx) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`rounded-2xl border bg-white dark:bg-slate-900 transition-all overflow-hidden ${
                  slide.is_active !== false
                    ? "border-slate-200 dark:border-slate-800 shadow-xs"
                    : "border-slate-200/60 dark:border-slate-800/60 opacity-60 bg-slate-50/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6">
                  {/* Order & Thumbnail */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-black text-slate-400 w-6 text-center">
                      #{idx + 1}
                    </span>
                    <div className="h-24 w-40 sm:h-28 sm:w-48 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 relative">
                      {slide.image_url ? (
                        <img
                          src={slide.image_url}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Slide Content */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 truncate">
                        {slide.title}
                      </h3>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          slide.is_active !== false
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {slide.is_active !== false ? t.carouselActiveBadge : t.carouselInactiveBadge}
                      </span>
                    </div>

                    {slide.subtitle && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                        {slide.subtitle}
                      </p>
                    )}

                    {slide.button_text && (
                      <p className="text-xs font-bold text-[#800020] dark:text-rose-400 flex items-center gap-1">
                        <span>बटण: {slide.button_text}</span>
                        {slide.button_link && (
                          <span className="text-slate-400 font-normal truncate max-w-[200px]">
                            ({slide.button_link})
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => openEdit(slide)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>{t.btnEdit}</span>
                    </button>

                    <button
                      onClick={() => handleToggleActive(slide.id, slide.is_active !== false)}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-300 cursor-pointer"
                      title={slide.is_active !== false ? t.toggleHide : t.toggleShow}
                    >
                      {slide.is_active !== false ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(slide.id)}
                      className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer"
                      title={t.btnDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Slide Modal */}
      <AdminModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? t.carouselModalEditTitle : t.carouselModalNewTitle}
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              onClick={() => setShowModal(false)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {t.cancelBtn}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-[#800020] hover:bg-[#66001a] text-white px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin text-white" />}
              <span>{t.carouselSaveBtn}</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4 font-sans">
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.carouselHeadingLabel}
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder={t.carouselHeadingPlaceholder}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.carouselSubtitleLabel}
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder={t.carouselSubtitlePlaceholder}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                {t.carouselButtonTextLabel}
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="e.g. ग्रंथसूची शोधा"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                {t.carouselButtonUrlLabel}
              </label>
              <input
                type="text"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                placeholder="e.g. /catalogue"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.carouselImageLabel}
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
            {/* Quick Authentic Photo Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[11px] text-slate-500 font-medium">
                {lang === "mr" ? "अधिकृत छायाचित्रे:" : "Library Presets:"}
              </span>
              {[
                { label: "फलक", url: "/images/real/library_signboard.png" },
                { label: "कपाटे", url: "/images/real/library_cupboards.png" },
                { label: "दुर्मीळ ग्रंथ", url: "/images/real/library_vintage_books.png" },
                { label: "शिलालेख", url: "/images/real/library_inauguration_plaque.png" },
              ].map((p) => (
                <button
                  type="button"
                  key={p.url}
                  onClick={() => setImageUrl(p.url)}
                  className="px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-[#800020] hover:text-white transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              id="slide_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded accent-[#800020]"
            />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {t.carouselActiveCheckLabel}
            </span>
          </label>
        </div>
      </AdminModal>
    </>
  );
}
