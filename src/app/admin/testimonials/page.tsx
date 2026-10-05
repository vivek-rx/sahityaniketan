"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MessageSquareQuote,
  Star,
  User,
  RefreshCw,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminModal } from "@/components/admin/admin-modal";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type TestimonialItem,
} from "@/lib/actions/testimonials";
import { useAdminLanguage } from "@/context/admin-language-context";

export default function AdminTestimonialsPage() {
  const { lang, t } = useAdminLanguage();
  const isMr = lang === "mr";

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [avatar, setAvatar] = useState("");
  const [rating, setRating] = useState(5);
  const [badge, setBadge] = useState("");
  const [isActive, setIsActive] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials(false);
      setTestimonials(data || []);
    } catch (e) {
      console.error("Failed to load testimonials:", e);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setName("");
    setRole("");
    setContent("");
    setAvatar("");
    setRating(5);
    setBadge(isMr ? "वाचक प्रतिक्रिया" : "Community Review");
    setIsActive(true);
    setShowModal(true);
  };

  const openEdit = (item: TestimonialItem) => {
    setEditing(item);
    setName(item.name || "");
    setRole(item.role || "");
    setContent(item.content || "");
    setAvatar(item.avatar || "");
    setRating(item.rating || 5);
    setBadge(item.badge || "");
    setIsActive(item.is_active);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      alert(isMr ? "कृपया नाव व मनोगत भरा." : "Please provide name and testimonial content.");
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        await updateTestimonial(editing.id, {
          name: name.trim(),
          role: role.trim() || "वाचक",
          content: content.trim(),
          avatar: avatar.trim() || null,
          rating,
          badge: badge.trim() || undefined,
          is_active: isActive,
        });
      } else {
        await createTestimonial({
          name: name.trim(),
          role: role.trim() || "वाचक",
          content: content.trim(),
          avatar: avatar.trim() || null,
          rating,
          badge: badge.trim() || undefined,
          is_active: isActive,
        });
      }
      setShowModal(false);
      await loadData();
    } catch (err: any) {
      alert("Error saving testimonial: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, personName: string) => {
    if (!confirm(isMr ? `खात्री करा: "${personName}" यांचा अभिप्राय हटवायचा आहे का?` : `Delete testimonial by "${personName}"?`)) {
      return;
    }
    try {
      await deleteTestimonial(id);
      await loadData();
    } catch (err: any) {
      alert("Error deleting: " + (err?.message || "Unknown error"));
    }
  };

  const handleToggleActive = async (item: TestimonialItem) => {
    try {
      await updateTestimonial(item.id, { is_active: !item.is_active });
      await loadData();
    } catch (err: any) {
      alert("Error updating status: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AdminTopbar
        title={isMr ? "वाचक अभिप्राय व मनोगत व्यवस्थापन (Testimonials)" : "Reader Testimonials CMS"}
        subtitle={isMr ? "मुखपृष्ठावरील @motion/card-stack साठी वाचकांचे अनुभव, फोटो व नाव जोडा" : "Manage homepage card-stack testimonials with reader photo, name, and quotes"}
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-amber-500" />
              <span>{isMr ? "सक्रिय वाचक प्रतिक्रिया" : "All Reader Testimonials"}</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {isMr
                ? "येथे जोडलेले अभिप्राय मुखपृष्ठावर 3D Card Stack स्वरूपात आपोआप दिसतील."
                : "Quotes added here automatically cycle in the 3D Card Stack on the home screen."}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isMr ? "नवीन अभिप्राय जोडा" : "Add Testimonial"}</span>
            </button>
          </div>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            <p className="text-xs text-zinc-400">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 space-y-3">
            <MessageSquareQuote className="w-12 h-12 mx-auto text-zinc-400" />
            <h3 className="font-bold text-base text-zinc-700 dark:text-zinc-300">
              {isMr ? "कोणताही अभिप्राय उपलब्ध नाही" : "No testimonials added yet"}
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {isMr
                ? "वाचकांचे अनुभव जोडण्यासाठी वरील 'नवीन अभिप्राय जोडा' बटणावर क्लिक करा."
                : "Click the 'Add Testimonial' button above to feature the first reader quote."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-3">
                  {/* Top Bar: Rating, Badge & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleActive(item)}
                      title={item.is_active ? "Hide on Homepage" : "Show on Homepage"}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                        item.is_active
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {item.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{item.is_active ? "Live" : "Hidden"}</span>
                    </button>
                  </div>

                  {/* Quote Content */}
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic line-clamp-3">
                    “{item.content}”
                  </p>
                </div>

                {/* Author Strip & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    {item.avatar ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 bg-zinc-100">
                        <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 text-zinc-400">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
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

      {/* ── ADD / EDIT MODAL ── */}
      <AdminModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? (isMr ? "अभिप्राय संपादित करा" : "Edit Testimonial") : (isMr ? "नवीन वाचक अभिप्राय जोडा" : "Add New Testimonial")}
        subtitle={isMr ? "वाचकाचे नाव, फोटो, हुद्दा व अभिप्राय भरा" : "Fill reader photo, name, designation, and quote"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {/* Reader Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              {isMr ? "वाचकाचे / मान्यवराचे नाव *" : "Reader / Scholar Full Name *"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isMr ? "उदा. प्रा. डॉ. सदानंद मोरे / प्रतीक कुलकर्णी" : "e.g. Dr. Sadanand More / Pratik Kulkarni"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
            />
          </div>

          {/* Role / Designation */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              {isMr ? "पद / हुद्दा / वर्ग *" : "Role / Designation *"}
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder={isMr ? "उदा. ज्येष्ठ साहित्यिक / MPSC अभ्यासक / आजीवन सभासद" : "e.g. Research Scholar / MPSC Aspirant / Life Member"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
            />
          </div>

          {/* Photo URL Provision */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              {isMr ? "छायाचित्र URL (Photo / Avatar Provision)" : "Photo URL (Optional)"}
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder={isMr ? "/images/real/library_reading_hall.png किंवा https://..." : "/images/... or https://..."}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              {isMr ? "फोटो उपलब्ध नसल्यास आपोआप प्रोफाइल आयकॉन दिसेल." : "If left blank, an avatar initials placeholder will be rendered."}
            </p>
          </div>

          {/* Testimonial Quote Message */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              {isMr ? "वाचक मनोगत / अभिप्राय *" : "Testimonial Quote / Message *"}
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isMr ? "ग्रंथालयाविषयी वाचकाचे अनुभव व विचार..." : "What the reader says about the library..."}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white resize-none"
            />
          </div>

          {/* Rating & Badge */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                {isMr ? "रेटिंग (Stars)" : "Rating (Stars)"}
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none"
              >
                <option value={5}>★★★★★ (5 Stars)</option>
                <option value={4}>★★★★☆ (4 Stars)</option>
                <option value={3}>★★★☆☆ (3 Stars)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                {isMr ? "बॅज (Badge)" : "Badge"}
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="उदा. साहित्यिक तज्ज्ञ / वाचक"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none"
              >
              </input>
            </div>
          </div>

          {/* Live Checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="active-toggle"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer"
            />
            <label htmlFor="active-toggle" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
              {isMr ? "हा अभिप्राय मुखपृष्ठावरील Card Stack वर थेट प्रकाशित करा (Live)" : "Publish live on homepage Card Stack"}
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {isMr ? "रद्द करा" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isMr ? (editing ? "बदल जतन करा" : "प्रकाशित करा") : (editing ? "Save Changes" : "Publish")}</span>
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
