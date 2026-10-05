"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Megaphone,
  Layers,
  Image as ImageIcon,
  BookOpen,
  ExternalLink,
  Save,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  UploadCloud,
  Bell,
  Clock,
  MessageCircle,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  Database,
  ShieldCheck,
  Activity,
  FileImage,
  Sparkles,
  ArrowRight,
  FolderPlus,
  X,
  Copy,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminModal } from "@/components/admin/admin-modal";
import { BobbingDots } from "@/components/ui/bobbing-dots";
import { useAdminLanguage } from "@/context/admin-language-context";
import { createClient } from "@/lib/supabase/client";
import {
  getDailyAnnouncement,
  updateDailyAnnouncement,
  DailyAnnouncementData,
} from "@/lib/actions/daily-announcement";
import {
  getCarouselSlides,
  toggleSlideActive,
  createSlide,
} from "@/lib/actions/carousel";
import {
  getAlbums,
  createAlbum,
  addGalleryItem,
} from "@/lib/actions/gallery";
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "@/lib/actions/notices";
import { getAuditLog } from "@/lib/actions/audit";
import type { Notice, CarouselSlide, GalleryAlbum, AuditLog } from "@/types/database";

export default function AdminDashboardPage() {
  const { lang, t } = useAdminLanguage();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* Auth & Session */
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [lastSignIn, setLastSignIn] = useState<string | null>(null);

  /* Live Data Feeds */
  const [banner, setBanner] = useState<DailyAnnouncementData | null>(null);
  const [bannerText, setBannerText] = useState("");
  const [bannerPriority, setBannerPriority] = useState<"urgent" | "high" | "normal">("high");
  const [savingBanner, setSavingBanner] = useState(false);
  const [bannerSaved, setBannerSaved] = useState(false);

  const [notices, setNotices] = useState<Notice[]>([]);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  /* Quick Notice Modal */
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticePriority, setNoticePriority] = useState<"urgent" | "high" | "normal" | "low">("normal");
  const [noticeActive, setNoticeActive] = useState(true);
  const [savingNotice, setSavingNotice] = useState(false);

  /* Quick Album Modal */
  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumCategory, setAlbumCategory] = useState("Events");
  const [savingAlbum, setSavingAlbum] = useState(false);

  /* WhatsApp Media Ingestion Station */
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [mediaTarget, setMediaTarget] = useState<"gallery" | "carousel" | "notice">("gallery");
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("");
  const [customAlbumTitle, setCustomAlbumTitle] = useState<string>("");
  const [mediaCaption, setMediaCaption] = useState<string>("");
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaSuccess, setMediaSuccess] = useState<string | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Load all data ─────────────────────────────────────────── */
  const loadDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [ann, slideList, albumList, noticeList, logs] = await Promise.all([
        getDailyAnnouncement().catch(() => null),
        getCarouselSlides(false).catch(() => []),
        getAlbums(false).catch(() => []),
        getNotices(false).catch(() => []),
        getAuditLog(10).catch(() => []),
      ]);

      if (ann) {
        setBanner(ann);
        setBannerText(ann.text || "");
        setBannerPriority(ann.priority || "high");
      }

      setSlides(Array.isArray(slideList) ? slideList : []);
      const validAlbums = Array.isArray(albumList) ? albumList : [];
      setAlbums(validAlbums);
      if (validAlbums.length > 0 && !selectedAlbumId) {
        setSelectedAlbumId(validAlbums[0].id);
      }
      setNotices(Array.isArray(noticeList) ? noticeList : []);
      setAuditLogs(Array.isArray(logs) ? logs : []);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedAlbumId]);

  useEffect(() => {
    loadDashboardData();

    // Fetch user info
    createClient().auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setAdminEmail(data.user.email);
        const prefix = data.user.email.split("@")[0];
        const formatted = prefix
          .replace(/[0-9._-]/g, " ")
          .split(" ")
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .slice(0, 2)
          .join(" ");
        setAdminName(formatted || prefix);
      }
      if (data.user?.last_sign_in_at) {
        setLastSignIn(
          new Date(data.user.last_sign_in_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
          })
        );
      }
    });
  }, [loadDashboardData]);

  /* ── Clipboard Paste Listener for WhatsApp Intake ─────────── */
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            // Scroll smoothly to dropzone
            document.getElementById("media-intake-section")?.scrollIntoView({ behavior: "smooth" });
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  /* ── File Selection & Preview ──────────────────────────────── */
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setMediaError(lang === "mr" ? "कृपया केवळ फोटो फाईल निवडा." : "Please select an image file.");
      return;
    }
    setDroppedFile(file);
    setMediaError(null);
    setMediaSuccess(null);
    if (!mediaCaption) {
      setMediaCaption(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
    }
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearSelectedFile = () => {
    setDroppedFile(null);
    setFilePreview(null);
    setMediaCaption("");
    setMediaError(null);
    setMediaSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ── Open WhatsApp Web in Side Window ──────────────────────── */
  const openWhatsAppWeb = () => {
    window.open(
      "https://web.whatsapp.com",
      "WhatsAppWebPopup",
      "width=1100,height=800,menubar=no,toolbar=no,location=no,status=no"
    );
  };

  /* ── Upload & Process WhatsApp Media ───────────────────────── */
  const handleUploadMedia = async () => {
    if (!droppedFile) return;
    setUploadingMedia(true);
    setMediaError(null);
    setMediaSuccess(null);

    try {
      const supabase = createClient();
      const ext = droppedFile.name.split(".").pop() || "jpg";
      const fileName = `whatsapp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("cms-media")
        .upload(filePath, droppedFile, { cacheControl: "3600", upsert: true });

      let publicUrl = "";
      if (uploadError) {
        // Fallback to library bucket
        const { error: fallbackError } = await supabase.storage
          .from("library")
          .upload(filePath, droppedFile, { cacheControl: "3600", upsert: true });
        if (fallbackError) throw new Error(fallbackError.message);
        publicUrl = supabase.storage.from("library").getPublicUrl(filePath).data.publicUrl;
      } else {
        publicUrl = supabase.storage.from("cms-media").getPublicUrl(filePath).data.publicUrl;
      }

      if (!publicUrl) throw new Error("Could not retrieve public URL for uploaded file.");

      // Route to destination
      if (mediaTarget === "gallery") {
        let targetAlbumId = selectedAlbumId;
        // If creating new album on the fly
        if (!targetAlbumId && customAlbumTitle.trim()) {
          const newAlbum = await createAlbum({
            title: customAlbumTitle.trim(),
            description: "Uploaded via WhatsApp intake",
            category: "Events",
            cover_url: publicUrl,
            is_archived: false,
            display_order: 0,
            is_featured: false,
            event_id: null,
          });
          targetAlbumId = newAlbum.id;
        } else if (!targetAlbumId) {
          // If no album exists at all, create default album
          const defaultAlbum = await createAlbum({
            title: "ग्रंथालय कार्यक्रम व उपक्रम (WhatsApp)",
            description: "WhatsApp द्वारे प्राप्त छायाचित्रे",
            category: "Events",
            cover_url: publicUrl,
            is_archived: false,
            display_order: 0,
            is_featured: false,
            event_id: null,
          });
          targetAlbumId = defaultAlbum.id;
        }

        await addGalleryItem({
          album_id: targetAlbumId,
          type: "photo",
          url: publicUrl,
          caption: mediaCaption.trim() || droppedFile.name,
          thumbnail_url: null,
          display_order: 0,
        });

        setMediaSuccess(
          lang === "mr"
            ? "छायाचित्र यशस्वीरित्या गॅलरी अल्बममध्ये जोडले गेले!"
            : "Photo successfully published to Gallery Album!"
        );
      } else if (mediaTarget === "carousel") {
        await createSlide({
          title: mediaCaption.trim() || "साहित्य निकेतन ग्रंथालय",
          subtitle: "नवीन छायाचित्र",
          image_url: publicUrl,
          button_text: "अधिक माहिती",
          button_link: "/gallery",
          display_order: 0,
          is_active: true,
          scheduled_at: null,
        });

        setMediaSuccess(
          lang === "mr"
            ? "छायाचित्र मुखपृष्ठ बॅनर स्लाइड म्हणून जोडले गेले!"
            : "Photo published as Homepage Hero Slide!"
        );
      } else if (mediaTarget === "notice") {
        await createNotice({
          title: mediaCaption.trim() || "नवीन परिपत्रक / सूचना",
          content: `सोबतचे परिपत्रक पहा: [छायाचित्र उघडा](${publicUrl})`,
          priority: "high",
          type: "general",
          is_active: true,
          expires_at: null,
          created_by: adminEmail || "admin",
        });

        setMediaSuccess(
          lang === "mr"
            ? "परिपत्रक यशस्वीरित्या नोटीस बोर्डवर प्रकाशित केले गेले!"
            : "Notice published with WhatsApp image flyer!"
        );
      }

      // Reset and refresh
      clearSelectedFile();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sahitya-admin-update"));
      }
      await loadDashboardData(true);
    } catch (err: any) {
      console.error("Media intake error:", err);
      setMediaError(err?.message || (lang === "mr" ? "अपलोड करताना त्रुटी आली." : "Upload error."));
    } finally {
      setUploadingMedia(false);
    }
  };

  /* ── Banner Actions ────────────────────────────────────────── */
  const handleToggleBanner = async () => {
    if (!banner) return;
    try {
      const updated = await updateDailyAnnouncement({ isActive: !banner.isActive });
      setBanner(updated);
    } catch {
      alert(lang === "mr" ? "स्थिती बदलताना त्रुटी आली." : "Error toggling status.");
    }
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerText.trim()) return;
    setSavingBanner(true);
    try {
      const updated = await updateDailyAnnouncement({
        text: bannerText.trim(),
        priority: bannerPriority,
        isActive: true,
      });
      setBanner(updated);
      setBannerSaved(true);
      setTimeout(() => setBannerSaved(false), 3000);
    } catch {
      alert(lang === "mr" ? "सूचना सेव्ह करताना त्रुटी आली." : "Error saving announcement.");
    } finally {
      setSavingBanner(false);
    }
  };

  /* ── Direct Notice Status Toggle ───────────────────────────── */
  const handleToggleNotice = async (n: Notice) => {
    const newStatus = !n.is_active;
    // Optimistic update
    setNotices((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, is_active: newStatus } : item))
    );
    try {
      await updateNotice(n.id, { is_active: newStatus });
    } catch (err) {
      console.error("Failed to toggle notice status:", err);
      loadDashboardData(true);
    }
  };

  /* ── Direct Slide Status Toggle ────────────────────────────── */
  const handleToggleSlide = async (s: CarouselSlide) => {
    const newStatus = !s.is_active;
    setSlides((prev) =>
      prev.map((item) => (item.id === s.id ? { ...item, is_active: newStatus } : item))
    );
    try {
      await toggleSlideActive(s.id, newStatus);
    } catch (err) {
      console.error("Failed to toggle slide:", err);
      loadDashboardData(true);
    }
  };

  /* ── Notice Modal Handler ──────────────────────────────────── */
  const openNewNoticeModal = () => {
    setEditingNotice(null);
    setNoticeTitle("");
    setNoticeContent("");
    setNoticePriority("normal");
    setNoticeActive(true);
    setNoticeModalOpen(true);
  };

  const openEditNoticeModal = (n: Notice) => {
    setEditingNotice(n);
    setNoticeTitle(n.title);
    setNoticeContent(n.content || "");
    setNoticePriority(n.priority || "normal");
    setNoticeActive(n.is_active);
    setNoticeModalOpen(true);
  };

  const handleSaveNotice = async () => {
    if (!noticeTitle.trim()) return;
    setSavingNotice(true);
    try {
      if (editingNotice) {
        await updateNotice(editingNotice.id, {
          title: noticeTitle.trim(),
          content: noticeContent.trim() || null,
          priority: noticePriority,
          is_active: noticeActive,
        });
      } else {
        await createNotice({
          title: noticeTitle.trim(),
          content: noticeContent.trim() || null,
          priority: noticePriority,
          type: "general",
          is_active: noticeActive,
          expires_at: null,
          created_by: adminEmail || "admin",
        });
      }
      setNoticeModalOpen(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sahitya-admin-update"));
      }
      await loadDashboardData(true);
    } catch (err: any) {
      alert(err?.message || "Error saving notice");
    } finally {
      setSavingNotice(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm(lang === "mr" ? "ही नोटीस नक्की हटवायची आहे का?" : "Delete this notice?")) return;
    try {
      await deleteNotice(id);
      setNotices((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete notice:", err);
    }
  };

  /* ── Album Modal Handler ───────────────────────────────────── */
  const handleSaveAlbum = async () => {
    if (!albumTitle.trim()) return;
    setSavingAlbum(true);
    try {
      const created = await createAlbum({
        title: albumTitle.trim(),
        category: albumCategory,
        description: null,
        cover_url: null,
        is_archived: false,
        display_order: albums.length,
        is_featured: false,
        event_id: null,
      });
      setAlbums((prev) => [created, ...prev]);
      setSelectedAlbumId(created.id);
      setAlbumModalOpen(false);
      setAlbumTitle("");
    } catch (err: any) {
      alert(err?.message || "Error creating album");
    } finally {
      setSavingAlbum(false);
    }
  };

  const activeNoticesCount = notices.filter((n) => n.is_active).length;
  const activeSlidesCount = slides.filter((s) => s.is_active).length;
  const urgentNoticesCount = notices.filter((n) => n.is_active && n.priority === "urgent").length;

  return (
    <>
      <AdminTopbar
        title={lang === "mr" ? "प्रशासकीय नियंत्रण कक्ष" : "Admin Operations Dashboard"}
        subtitle={lang === "mr" ? "साहित्य निकेतन ग्रंथालय • अंबाजोगाई" : "Sahitya Niketan Library Management"}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">

        {/* ── 1. EXECUTIVE STATUS & QUICK ACTIONS HEADER ──────────── */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="साहित्य निकेतन ग्रंथालय"
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain rounded-full drop-shadow-md border border-[#800020]/20"
                />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                    {adminName || "साहित्य निकेतन प्रशासक"}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#800020]/10 text-[#800020] dark:bg-rose-950/50 dark:text-rose-300 border border-[#800020]/20">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {lang === "mr" ? "मुख्य प्रशासक" : "Super Admin"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    {lang === "mr" ? "डेटाबेस जोडलेले" : "Supabase Live"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {adminEmail || "sahityaniketanabajogai@gmail.com"}
                  {lastSignIn && ` · ${lang === "mr" ? "सक्रिय सत्र" : "Last login"}: ${lastSignIn}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                onClick={() => loadDashboardData(true)}
                disabled={loading || refreshing}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                title={lang === "mr" ? "माहिती ताजी करा" : "Refresh Dashboard"}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-[#800020]" : ""}`} />
                <span>{refreshing ? (lang === "mr" ? "ताजे होत आहे..." : "Refreshing...") : (lang === "mr" ? "ताजे करा" : "Refresh")}</span>
              </button>

              <button
                onClick={openNewNoticeModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{lang === "mr" ? "नवीन नोटीस" : "New Notice"}</span>
              </button>

              <button
                onClick={() => setAlbumModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 transition-colors cursor-pointer"
              >
                <FolderPlus className="h-4 w-4 text-[#800020] dark:text-rose-400" />
                <span>{lang === "mr" ? "नवीन अल्बम" : "New Album"}</span>
              </button>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
              >
                <span>{lang === "mr" ? "थेट संकेतस्थळ" : "View Site"}</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. CORE OPERATIONAL METRICS ("SHOWING ALL THINGS") ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Books / Catalogue */}
          <Link
            href="/catalogue"
            target="_blank"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#800020]/40 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#800020] inline-flex items-center gap-1">
                {lang === "mr" ? "सूची पहा" : "Browse"} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50">
              39,953+
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
              {lang === "mr" ? "ग्रंथालय ग्रंथसूची" : "Library Books Catalog"}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {lang === "mr" ? "मराठी, हिंदी व इंग्रजी दुर्मीळ साहित्य" : "Catalogued collection"}
            </div>
          </Link>

          {/* Notices */}
          <Link
            href="/admin/noticeboard"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#800020]/40 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#800020] dark:text-rose-400 flex items-center justify-center font-bold">
                <Megaphone className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#800020] inline-flex items-center gap-1">
                {lang === "mr" ? "व्यवस्थापन" : "Manage"} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50">
                {activeNoticesCount}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                / {notices.length} {lang === "mr" ? "एकूण" : "total"}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
              {lang === "mr" ? "सक्रिय परिपत्रके व सूचना" : "Active Public Notices"}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {urgentNoticesCount > 0 ? (
                <span className="text-rose-600 font-bold">{urgentNoticesCount} {lang === "mr" ? "तातडीची सूचना" : "urgent active"}</span>
              ) : (
                lang === "mr" ? "सूचना फलकावर थेट सुरू" : "Published on noticeboard"
              )}
            </div>
          </Link>

          {/* Gallery Albums */}
          <Link
            href="/admin/gallery"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#800020]/40 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
                <ImageIcon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#800020] inline-flex items-center gap-1">
                {lang === "mr" ? "दालन उघडा" : "Gallery"} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50">
              {albums.length}
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
              {lang === "mr" ? "छायाचित्र अल्बम्स" : "Photo Gallery Albums"}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {lang === "mr" ? "कार्यक्रम व ऐतिहासिक संग्रह" : "Event & archives photo sets"}
            </div>
          </Link>

          {/* Carousel Slides */}
          <Link
            href="/admin/carousel"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#800020]/40 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#800020] inline-flex items-center gap-1">
                {lang === "mr" ? "संपादित करा" : "Edit"} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50">
                {activeSlidesCount}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                / {slides.length} {lang === "mr" ? "स्लाइड्स" : "slides"}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
              {lang === "mr" ? "मुखपृष्ठ बॅनर स्लाइड्स" : "Homepage Hero Slides"}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {lang === "mr" ? "मुख्य पानावर थेट दर्शविले" : "Active on homepage hero"}
            </div>
          </Link>
        </section>

        {/* ── 3. LIVE STICKY DAILY ANNOUNCEMENT CONTROLLER ─────────── */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-200/90 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="h-9 w-9 rounded-xl bg-[#800020]/10 text-[#800020] dark:bg-rose-950/50 dark:text-rose-300 flex items-center justify-center shrink-0">
                <Bell className="h-4.5 w-4.5" />
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>{lang === "mr" ? "दैनिक महत्त्वाची सूचना (थेट संकेतस्थळ बॅनर)" : "Daily Sticky Announcement (Live Marquee)"}</span>
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === "mr"
                    ? "सर्व अभ्यागत व वाचकांना मुख्य संकेतस्थळाच्या शीर्षस्थानी थेट दिसणारा संदेश"
                    : "The headline broadcast ribbon shown at the top of sahityaniketan.org"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  banner?.isActive
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                    : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${banner?.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                {banner?.isActive ? (lang === "mr" ? "संकेतस्थळावर थेट सुरू" : "Live on Site") : (lang === "mr" ? "तात्पुरती बंद" : "Paused")}
              </span>

              <button
                type="button"
                onClick={handleToggleBanner}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                {banner?.isActive ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5 text-slate-500" />
                    <span>{lang === "mr" ? "बंद करा" : "Pause"}</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{lang === "mr" ? "सुरू करा" : "Publish Live"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Preview Strip */}
          {banner?.isActive && bannerText && (
            <div className="bg-[#800020] text-white px-5 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="bg-[#E5B869] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                  {bannerPriority === "urgent" ? (lang === "mr" ? "तातडीची सूचना" : "Urgent") : (lang === "mr" ? "दैनिक सूचना" : "Notice")}
                </span>
                <span className="truncate">{bannerText}</span>
              </div>
              <span className="text-[11px] opacity-75 shrink-0 hidden md:inline">
                {lang === "mr" ? "← अभ्यागतांना असे दिसते" : "← Live visitor preview"}
              </span>
            </div>
          )}

          {/* Inline Edit Form */}
          <form onSubmit={handleSaveBanner} className="p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="banner-text-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {lang === "mr" ? "संदेश मजकूर संपादित करा:" : "Edit Announcement Text:"}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    {bannerText.length} {lang === "mr" ? "अक्षरे" : "chars"}
                  </span>
                  <select
                    value={bannerPriority}
                    onChange={(e: any) => setBannerPriority(e.target.value)}
                    className="text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  >
                    <option value="high">{lang === "mr" ? "सामान्य दैनिक सूचना" : "Daily Broadcast"}</option>
                    <option value="urgent">{lang === "mr" ? "तातडीची / महत्त्वाची सूचना" : "Urgent Alert"}</option>
                  </select>
                </div>
              </div>

              <textarea
                id="banner-text-input"
                rows={2}
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder={lang === "mr" ? "उदा. वाचन प्रेरणा दिनानिमित्त विशेष व्याख्यानमालेचे आयोजन करण्यात आले आहे..." : "Enter announcement text..."}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={savingBanner || !bannerText.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingBanner ? <BobbingDots size="sm" className="text-white" /> : <Save className="h-4 w-4" />}
                  <span>{savingBanner ? (lang === "mr" ? "सेव्ह होत आहे..." : "Saving...") : (lang === "mr" ? "बदल सेव्ह करा" : "Update Announcement")}</span>
                </button>

                {bannerSaved && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    {lang === "mr" ? "संकेतस्थळावर अद्ययावत झाले!" : "Updated on website!"}
                  </span>
                )}
              </div>

              <Link
                href="/admin/noticeboard"
                className="text-xs font-bold text-[#800020] dark:text-rose-400 hover:underline inline-flex items-center gap-1"
              >
                <span>{lang === "mr" ? "सर्व परिपत्रके उघडा" : "All Notices"} ({notices.length})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </form>
        </section>

        {/* ── 4. WHATSAPP MEDIA INTAKE & DIRECT UPLOAD STATION ─────── */}
        <section
          id="media-intake-section"
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-[#25D366]/10 text-[#128C7E] dark:text-[#25D366] flex items-center justify-center shrink-0 font-black">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
                  {lang === "mr" ? "WhatsApp थेट छायाचित्रे व परिपत्रक आयात केंद्र" : "WhatsApp Direct Media Intake Station"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === "mr"
                    ? "व्हॉट्सॲपवरून फोटो कॉपी करून थेट येथे पेस्ट करा (Ctrl+V) किंवा ड्रॅग करा"
                    : "Copy photos from WhatsApp and paste directly (Ctrl+V) or drag & drop to publish"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openWhatsAppWeb}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{lang === "mr" ? "WhatsApp Web उघडा" : "Open WhatsApp Web"}</span>
                <ExternalLink className="h-3 w-3 opacity-75" />
              </button>
            </div>
          </div>

          {/* Workflow Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <span className="h-6 w-6 rounded-full bg-[#800020] text-white text-[11px] font-black flex items-center justify-center shrink-0">1</span>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                {lang === "mr" ? "WhatsApp Web उघडा व फोटो कॉपी (Copy) करा अथवा डाउनलोड करा." : "Open WhatsApp Web & copy (Ctrl+C) or download event photos."}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <span className="h-6 w-6 rounded-full bg-[#800020] text-white text-[11px] font-black flex items-center justify-center shrink-0">2</span>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                {lang === "mr" ? "खालील बॉक्समध्ये थेट Ctrl+V पेस्ट करा किंवा फाईल ओढून आणा." : "Paste (Ctrl+V) directly into the box below or drag files."}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <span className="h-6 w-6 rounded-full bg-[#800020] text-white text-[11px] font-black flex items-center justify-center shrink-0">3</span>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                {lang === "mr" ? "गॅलरी, मुखपृष्ठ किंवा नोटीस निवडून 'संकेतस्थळावर अपलोड करा'." : "Pick Gallery, Slide or Notice & click 'Publish to Website'."}
              </p>
            </div>
          </div>

          {/* Drag & Drop / Paste Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const files = e.dataTransfer.files;
              if (files && files.length > 0) handleFileSelect(files[0]);
            }}
            onClick={() => { if (!droppedFile) fileInputRef.current?.click(); }}
            className={`relative rounded-2xl border-2 border-dashed p-6 transition-all text-center ${
              isDragOver
                ? "border-[#800020] bg-[#800020]/5 scale-[1.005]"
                : droppedFile
                  ? "border-emerald-300 bg-emerald-50/20 dark:bg-emerald-950/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) handleFileSelect(files[0]);
              }}
            />

            {!droppedFile ? (
              <div className="py-4 space-y-2">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-[#800020]/10 text-[#800020] dark:bg-rose-950/40 dark:text-rose-400 flex items-center justify-center">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {lang === "mr" ? "फोटो येथे ड्रॅग करा किंवा Ctrl+V पेस्ट करा" : "Drop image here or press Ctrl+V to paste from WhatsApp"}
                </div>
                <p className="text-xs text-slate-400">
                  {lang === "mr" ? "किंवा संगणकावरून फाईल निवडण्यासाठी येथे क्लिक करा (JPG, PNG, WEBP)" : "or click to browse from device (JPG, PNG, WEBP)"}
                </p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                {/* Preview Thumbnail */}
                <div className="flex items-center gap-4">
                  {filePreview && (
                    <img
                      src={filePreview}
                      alt="WhatsApp Media Preview"
                      className="h-24 w-24 object-cover rounded-xl border border-slate-200 shadow-xs shrink-0"
                    />
                  )}
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-md mb-1">
                      <Check className="h-3 w-3" />
                      {lang === "mr" ? "फोटो निवडला आहे" : "Image Captured"}
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-xs">
                      {droppedFile.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {(droppedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                {/* Target Configuration & Direct Upload Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {lang === "mr" ? "कुठे प्रकाशित करायचे?" : "Publish Target"}
                    </label>
                    <select
                      value={mediaTarget}
                      onChange={(e: any) => setMediaTarget(e.target.value)}
                      className="text-xs font-bold border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      <option value="gallery">📁 {lang === "mr" ? "छायाचित्र दालन" : "Photo Gallery Album"}</option>
                      <option value="carousel">🎞️ {lang === "mr" ? "मुखपृष्ठ बॅनर" : "Homepage Hero Slide"}</option>
                      <option value="notice">📢 {lang === "mr" ? "परिपत्रक नोटीस" : "Noticeboard Flyer"}</option>
                    </select>
                  </div>

                  {mediaTarget === "gallery" && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {lang === "mr" ? "अल्बम निवडा" : "Select Album"}
                      </label>
                      {albums.length > 0 ? (
                        <select
                          value={selectedAlbumId}
                          onChange={(e) => setSelectedAlbumId(e.target.value)}
                          className="text-xs font-bold border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 max-w-[180px]"
                        >
                          {albums.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={customAlbumTitle}
                          onChange={(e) => setCustomAlbumTitle(e.target.value)}
                          placeholder={lang === "mr" ? "नवीन अल्बमचे नाव..." : "New Album Title..."}
                          className="text-xs border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        />
                      )}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {lang === "mr" ? "शीर्षक / कॅप्शन" : "Title / Caption"}
                    </label>
                    <input
                      type="text"
                      value={mediaCaption}
                      onChange={(e) => setMediaCaption(e.target.value)}
                      placeholder={lang === "mr" ? "छायाचित्राचे नाव..." : "Photo caption..."}
                      className="text-xs border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 w-full sm:w-44"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={handleUploadMedia}
                      disabled={uploadingMedia}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      {uploadingMedia ? <BobbingDots size="sm" className="text-white" /> : <UploadCloud className="h-4 w-4" />}
                      <span>{uploadingMedia ? (lang === "mr" ? "अपलोड होत आहे..." : "Publishing...") : (lang === "mr" ? "संकेतस्थळावर प्रकाशित करा" : "Publish to Site")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={clearSelectedFile}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      title={lang === "mr" ? "रद्द करा" : "Cancel"}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feedback messages */}
          {mediaSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{mediaSuccess}</span>
            </div>
          )}
          {mediaError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>{mediaError}</span>
            </div>
          )}
        </section>

        {/* ── 5. MAIN DASHBOARD GRIDS: "SHOWING ALL THE THINGS" ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT COLUMN (7 COLS): RECENT NOTICES & HERO SLIDES ── */}
          <div className="lg:col-span-7 space-y-8">

            {/* A. Recent Notices Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-[#800020] dark:text-rose-400 flex items-center justify-center font-bold">
                    <Megaphone className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                      {lang === "mr" ? "ताजी परिपत्रके व नोटीस फलक" : "Live Notices & Circulars"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {notices.length} {lang === "mr" ? "परिपत्रके नोंदली आहेत" : "notices in library database"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openNewNoticeModal}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#800020]/10 hover:bg-[#800020]/20 text-[#800020] dark:text-rose-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{lang === "mr" ? "नोटीस जोडा" : "Add"}</span>
                  </button>
                  <Link
                    href="/admin/noticeboard"
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 p-1.5"
                    title={lang === "mr" ? "सर्व परिपत्रके पहा" : "Manage All"}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {notices.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    {lang === "mr" ? "कोणतीही नोटीस उपलब्ध नाही." : "No notices found in database."}
                  </div>
                ) : (
                  notices.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className="p-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {n.priority === "urgent" && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                              {lang === "mr" ? "तातडीची" : "Urgent"}
                            </span>
                          )}
                          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate block">
                            {n.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(n.created_at).toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          {n.content && (
                            <span className="truncate max-w-[200px] text-slate-500 hidden sm:inline">
                              · {n.content}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Live Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => handleToggleNotice(n)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            n.is_active ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"
                          }`}
                          title={n.is_active ? (lang === "mr" ? "सक्रिय (बंद करण्यासाठी क्लिक करा)" : "Active (click to pause)") : (lang === "mr" ? "बंद (सुरू करण्यासाठी क्लिक करा)" : "Inactive (click to activate)")}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              n.is_active ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => openEditNoticeModal(n)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          title={lang === "mr" ? "संपादित करा" : "Edit"}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteNotice(n.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                          title={lang === "mr" ? "हटवा" : "Delete"}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notices.length > 5 && (
                <div className="p-3 bg-slate-50/50 dark:bg-slate-800/30 text-center border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href="/admin/noticeboard"
                    className="text-xs font-bold text-[#800020] dark:text-rose-400 hover:underline"
                  >
                    {lang === "mr" ? `सर्व ${notices.length} परिपत्रके व्यवस्थापित करा →` : `View all ${notices.length} notices →`}
                  </Link>
                </div>
              )}
            </div>

            {/* B. Active Homepage Carousel Slides Strip */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
                    <Layers className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                      {lang === "mr" ? "सक्रिय मुखपृष्ठ बॅनर स्लाइड्स" : "Active Homepage Hero Carousel"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {slides.length} {lang === "mr" ? "स्लाइड्स नोंदविल्या आहेत" : "slides in homepage hero pool"}
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/carousel"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>{lang === "mr" ? "स्लाइड्स व्यवस्थापन" : "Manage"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="p-5">
                {slides.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    {lang === "mr" ? "कोणतीही स्लाइड उपलब्ध नाही." : "No slides created yet."}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {slides.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {s.image_url ? (
                            <img
                              src={s.image_url}
                              alt={s.title}
                              className="h-12 w-20 object-cover rounded-lg border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="h-12 w-20 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                              <FileImage className="h-5 w-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                              {s.title}
                            </h4>
                            {s.subtitle && (
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                {s.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            s.is_active
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                          }`}>
                            {s.is_active ? (lang === "mr" ? "सुरू" : "Active") : (lang === "mr" ? "बंद" : "Paused")}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleToggleSlide(s)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              s.is_active ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                s.is_active ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN (5 COLS): ALBUMS, AUDIT LOG & PUBLIC LINKS ── */}
          <div className="lg:col-span-5 space-y-8">

            {/* C. Photo Gallery Albums Grid */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <ImageIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                      {lang === "mr" ? "छायाचित्र दालन अल्बम्स" : "Photo Gallery Albums"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {albums.length} {lang === "mr" ? "अल्बम्स तयार आहेत" : "albums published"}
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/gallery"
                  className="text-xs font-bold text-[#800020] dark:text-rose-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{lang === "mr" ? "गॅलरी CMS" : "Full CMS"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="p-5 space-y-3">
                {albums.length === 0 ? (
                  <div className="text-center py-6 space-y-3">
                    <p className="text-xs text-slate-400">
                      {lang === "mr" ? "सध्या कोणताही अल्बम उपलब्ध नाही." : "No photo albums created yet."}
                    </p>
                    <button
                      onClick={() => setAlbumModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#800020] text-white text-xs font-bold shadow-xs hover:bg-[#66001a] cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{lang === "mr" ? "पहिला अल्बम तयार करा" : "Create First Album"}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {albums.slice(0, 4).map((alb) => (
                      <Link
                        key={alb.id}
                        href="/admin/gallery"
                        className="group flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {alb.cover_url ? (
                            <img
                              src={alb.cover_url}
                              alt={alb.title}
                              className="h-10 w-10 object-cover rounded-lg border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                              <ImageIcon className="h-5 w-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#800020]">
                              {alb.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {alb.category || "Events"} · {new Date(alb.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#800020] transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* D. Recent Operational Audit Log */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                    <Activity className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                      {lang === "mr" ? "प्रशासकीय कार्य नोंदी (Audit Trail)" : "Administrative Activity Log"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {lang === "mr" ? "अलीकडील बदल व सुरक्षा नोंदी" : "Recent system modifications"}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Live
                </span>
              </div>

              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                {auditLogs.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    {lang === "mr" ? "कोणतीही नोंद उपलब्ध नाही." : "No audit entries recorded yet."}
                  </div>
                ) : (
                  auditLogs.slice(0, 6).map((log) => {
                    const actionColor =
                      log.action === "delete"
                        ? "text-rose-600 bg-rose-50 dark:bg-rose-950/50"
                        : log.action === "create"
                          ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50"
                          : "text-amber-700 bg-amber-50 dark:bg-amber-950/50";

                    return (
                      <div key={log.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${actionColor}`}>
                              {log.action}
                            </span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                              {log.resource_title || log.resource_type}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">
                            {log.actor_email}
                          </p>
                        </div>

                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* E. Public Verification Links */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                {lang === "mr" ? "सार्वजनिक पृष्ठे थेट तपासा" : "Public Verification Links"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/", label: lang === "mr" ? "मुख्य पृष्ठ" : "Homepage" },
                  { href: "/catalogue", label: lang === "mr" ? "ग्रंथसूची" : "Catalogue" },
                  { href: "/events", label: lang === "mr" ? "कार्यक्रम" : "Events" },
                  { href: "/gallery", label: lang === "mr" ? "गॅलरी" : "Gallery" },
                  { href: "/membership", label: lang === "mr" ? "सभासदत्व" : "Membership" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#800020] hover:border-[#800020]/30 transition-all shadow-2xs"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* ── MODAL: CREATE / EDIT NOTICE ─────────────────────────── */}
      <AdminModal
        open={noticeModalOpen}
        onClose={() => setNoticeModalOpen(false)}
        title={editingNotice ? (lang === "mr" ? "परिपत्रक / नोटीस संपादित करा" : "Edit Notice") : (lang === "mr" ? "नवीन परिपत्रक / नोटीस जोडा" : "Create New Notice")}
        subtitle={lang === "mr" ? "सूचना फलक व मुख्य संकेतस्थळावर तात्काळ दिसेल" : "Will appear on the public noticeboard immediately"}
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              type="button"
              onClick={() => setNoticeModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
            >
              {lang === "mr" ? "रद्द करा" : "Cancel"}
            </button>
            <button
              type="button"
              onClick={handleSaveNotice}
              disabled={savingNotice || !noticeTitle.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {savingNotice ? <BobbingDots size="sm" className="text-white" /> : <Save className="h-4 w-4" />}
              <span>{savingNotice ? (lang === "mr" ? "सेव्ह होत आहे..." : "Saving...") : (lang === "mr" ? "प्रकाशित करा" : "Publish Notice")}</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {lang === "mr" ? "नोटीस शीर्षक *" : "Notice Title *"}
            </label>
            <input
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder={lang === "mr" ? "उदा. ग्रंथालय सभासद नोंदणी सुरू..." : "Enter notice headline..."}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {lang === "mr" ? "तपशील / मजकूर" : "Content / Description"}
            </label>
            <textarea
              rows={4}
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              placeholder={lang === "mr" ? "नोटीसचा सविस्तर मजकूर येथे लिहा..." : "Detailed notice content..."}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {lang === "mr" ? "प्राधान्य" : "Priority"}
              </label>
              <select
                value={noticePriority}
                onChange={(e: any) => setNoticePriority(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              >
                <option value="normal">{lang === "mr" ? "सर्वसाधारण" : "Normal"}</option>
                <option value="high">{lang === "mr" ? "महत्त्वाची" : "High"}</option>
                <option value="urgent">{lang === "mr" ? "तातडीची" : "Urgent Alert"}</option>
              </select>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-4 pt-6">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {lang === "mr" ? "संकेतस्थळावर थेट सुरू ठेवा" : "Active on Website"}
              </label>
              <input
                type="checkbox"
                checked={noticeActive}
                onChange={(e) => setNoticeActive(e.target.checked)}
                className="h-5 w-5 rounded text-[#800020] focus:ring-[#800020]"
              />
            </div>
          </div>
        </div>
      </AdminModal>

      {/* ── MODAL: CREATE NEW ALBUM ─────────────────────────────── */}
      <AdminModal
        open={albumModalOpen}
        onClose={() => setAlbumModalOpen(false)}
        title={lang === "mr" ? "नवीन छायाचित्र अल्बम तयार करा" : "Create New Photo Album"}
        subtitle={lang === "mr" ? "कार्यक्रमांची छायाचित्रे एकत्रितपणे दालनात दाखवण्यासाठी" : "Group photos under a new event or collection"}
        size="md"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              type="button"
              onClick={() => setAlbumModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
            >
              {lang === "mr" ? "रद्द करा" : "Cancel"}
            </button>
            <button
              type="button"
              onClick={handleSaveAlbum}
              disabled={savingAlbum || !albumTitle.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {savingAlbum ? <BobbingDots size="sm" className="text-white" /> : <Save className="h-4 w-4" />}
              <span>{savingAlbum ? (lang === "mr" ? "तयार होत आहे..." : "Creating...") : (lang === "mr" ? "अल्बम तयार करा" : "Create Album")}</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {lang === "mr" ? "अल्बम शीर्षक *" : "Album Title *"}
            </label>
            <input
              type="text"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              placeholder={lang === "mr" ? "उदा. ग्रंथालय वर्धापन दिन सोहळा २०२४..." : "Enter album name..."}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {lang === "mr" ? "वर्गवारी" : "Category"}
            </label>
            <select
              value={albumCategory}
              onChange={(e) => setAlbumCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              <option value="Events">{lang === "mr" ? "कार्यक्रम व सोहळे" : "Events"}</option>
              <option value="Historical">{lang === "mr" ? "ऐतिहासिक व दुर्मीळ संग्रह" : "Historical"}</option>
              <option value="Celebrations">{lang === "mr" ? "उत्सव व जयंती" : "Celebrations"}</option>
              <option value="General">{lang === "mr" ? "सर्वसाधारण" : "General"}</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </>
  );
}
