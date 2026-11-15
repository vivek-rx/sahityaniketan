"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, RefreshCw, Trash2, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminLoader } from "@/components/admin/admin-loader";
import { COMMITTEE_MEMBERS } from "@/lib/committee";
import {
  getCommitteePhotos,
  setCommitteePhoto,
  deleteCommitteePhoto,
} from "@/lib/actions/committee";
import { createClient } from "@/lib/supabase/client";
import { useAdminLanguage } from "@/context/admin-language-context";

/** Downscale to a portrait-friendly JPEG before upload (keeps storage small). */
async function compressToJpeg(file: File, maxSide = 800, quality = 0.85): Promise<Blob> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", quality)
    );
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export default function AdminCommitteePage() {
  const { lang } = useAdminLanguage();
  const isMr = lang === "mr";

  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [doneSlug, setDoneSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const loadPhotos = async () => {
    setLoading(true);
    try {
      setPhotos(await getCommitteePhotos());
    } catch {
      setPhotos({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleUpload = async (slug: string, file: File | undefined) => {
    if (!file) return;
    setError(null);
    setBusySlug(slug);
    setDoneSlug(null);
    try {
      const blob = await compressToJpeg(file);
      const supabase = createClient();
      const path = `team/${slug}.jpg`;
      let finalUrl = "";
      const up = await supabase.storage
        .from("cms-media")
        .upload(path, blob, { cacheControl: "3600", upsert: true, contentType: "image/jpeg" });
      if (up.error) {
        const fb = await supabase.storage
          .from("library")
          .upload(path, blob, { cacheControl: "3600", upsert: true, contentType: "image/jpeg" });
        if (fb.error) throw new Error(fb.error.message);
        finalUrl = supabase.storage.from("library").getPublicUrl(path).data.publicUrl;
      } else {
        finalUrl = supabase.storage.from("cms-media").getPublicUrl(path).data.publicUrl;
      }
      // Bust CDN cache on re-uploads
      finalUrl = `${finalUrl}${finalUrl.includes("?") ? "&" : "?"}v=${Date.now()}`;
      await setCommitteePhoto(slug, finalUrl);
      setPhotos((p) => ({ ...p, [slug]: finalUrl }));
      setDoneSlug(slug);
      setTimeout(() => setDoneSlug(null), 2500);
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setBusySlug(null);
      if (fileInputs.current[slug]) fileInputs.current[slug]!.value = "";
    }
  };

  const handleRemove = async (slug: string) => {
    setError(null);
    setBusySlug(slug);
    try {
      await deleteCommitteePhoto(slug);
      setPhotos((p) => {
        const next = { ...p };
        delete next[slug];
        return next;
      });
    } catch (e: any) {
      setError(e?.message || "Remove failed");
    } finally {
      setBusySlug(null);
    }
  };

  if (loading) return <AdminLoader label={isMr ? "छायाचित्रे लोड होत आहेत…" : "Loading portraits…"} />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <AdminTopbar
        title={isMr ? "कार्यकारिणी छायाचित्रे — व्यवस्थापन" : "Committee Portraits — Management"}
        subtitle={
          isMr
            ? "About पृष्ठावरील कार्यकारिणी मंडळ कार्डांसाठी छायाचित्रे अपलोड करा"
            : "Upload portraits for the Executive Committee cards on the About page"
        }
      />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Info strip */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-500" />
            <span>{isMr ? "सदस्य छायाचित्रे" : "Member Portraits"}</span>
            <span className="text-xs font-semibold text-slate-400">
              ({Object.keys(photos).length}/{COMMITTEE_MEMBERS.length})
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isMr
              ? "पोर्ट्रेट ओरिएंटेशन (उदा. 600×800) शिफारस केले आहे. अपलोडच्या वेळी चित्रे आपोआप कंप्रेस होतात. छायाचित्र नसलेले सदस्य 'Official Portrait' प्लेसहोल्डर दाखवतात."
              : "Portrait orientation (e.g. 600×800) recommended. Images are compressed automatically on upload. Members without a photo keep the 'Official Portrait' placeholder."}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={loadPhotos}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isMr ? "रीफ्रेश" : "Refresh"}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
            <XMark />
            <span>{error}</span>
          </div>
        )}

        {/* Member grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMMITTEE_MEMBERS.map((m) => {
            const url = photos[m.slug];
            const busy = busySlug === m.slug;
            const done = doneSlug === m.slug;
            return (
              <div
                key={m.slug}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4"
              >
                {/* Preview */}
                <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative">
                  {url ? (
                    <Image src={url} alt={m.nameEn} fill sizes="80px" className="object-cover object-top" unoptimized />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                      <Camera className="w-5 h-5" />
                      <span className="text-[9px] mt-1 font-medium">{isMr ? "छायाचित्र नाही" : "No photo"}</span>
                    </div>
                  )}
                  {busy && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                    </div>
                  )}
                </div>

                {/* Identity */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{m.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{m.nameEn}</p>
                  <p className="text-xs font-semibold text-[#800020] dark:text-amber-400 mt-0.5">
                    {isMr ? m.role : m.roleEn}
                  </p>

                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <input
                      ref={(el) => { fileInputs.current[m.slug] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUpload(m.slug, e.target.files?.[0])}
                    />
                    <button
                      onClick={() => fileInputs.current[m.slug]?.click()}
                      disabled={busy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#800020] hover:bg-[#66001A] text-white text-[11px] font-semibold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{url ? (isMr ? "बदला" : "Replace") : isMr ? "अपलोड" : "Upload"}</span>
                    </button>
                    {url && (
                      <button
                        onClick={() => handleRemove(m.slug)}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isMr ? "काढा" : "Remove"}</span>
                      </button>
                    )}
                    {done && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isMr ? "जतन झाले" : "Saved"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function XMark() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
