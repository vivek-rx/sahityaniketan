"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Image as ImageIcon,
  Star,
  Edit2,
  Video,
  Upload,
  Trash2,
  UploadCloud,
  CheckCircle2,
  X,
  FolderPlus,
  RefreshCw,
  Clipboard,
  MessageCircle,
} from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";
import { BobbingDots } from "@/components/ui/bobbing-dots";
import { AdminModal } from "@/components/admin/admin-modal";
import { useAdminLanguage } from "@/context/admin-language-context";
import {
  getAlbums,
  createAlbum,
  updateAlbum,
  archiveAlbum,
  deleteAlbum,
  addGalleryItem,
  addGalleryItemsBulk,
  deleteGalleryItem,
  deleteGalleryItemsBulk,
  getAlbumWithItems,
} from "@/lib/actions/gallery";
import { createClient } from "@/lib/supabase/client";
import type { GalleryAlbum, GalleryItem } from "@/types/database";

type AlbumCategory = "Events" | "Library" | "Heritage" | "General";

const CATEGORY_COLORS: Record<string, string> = {
  Events: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  Library: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
  Heritage: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  General: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

interface PendingUploadFile {
  id: string;
  file: File;
  previewUrl: string;
}

export default function AdminGalleryPage() {
  const { lang, t } = useAdminLanguage();
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);

  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [albumItems, setAlbumItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryAlbum | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  // Form State for Album
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<AlbumCategory>("Events");
  const [coverUrl, setCoverUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  // Form State for Single Media (Video / Photo URL)
  const [mediaType, setMediaType] = useState<"photo" | "video">("photo");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaCaption, setMediaCaption] = useState("");

  // Bulk Upload State
  const [bulkAlbumId, setBulkAlbumId] = useState<string>("");
  const [pendingFiles, setPendingFiles] = useState<PendingUploadFile[]>([]);
  const [pastedUrls, setPastedUrls] = useState<string>("");
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ current: number; total: number } | null>(null);
  const [bulkSuccessMsg, setBulkSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // WhatsApp Paste State
  const [waFlash, setWaFlash] = useState(false);
  const [waPasteCount, setWaPasteCount] = useState(0);


  // Bulk Selection inside Media Modal
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAlbums(true);
      setAlbums(data || []);
      if (data && data.length > 0 && !bulkAlbumId) {
        setBulkAlbumId(data[0].id);
      }
    } catch (e) {
      console.error("Failed to load gallery albums", e);
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
    setCategory("Events");
    setCoverUrl("");
    setFeatured(false);
    setShowModal(true);
  };

  const openEdit = (a: any) => {
    setEditing(a);
    setTitle(a.title);
    setCategory((a.category as AlbumCategory) || "Events");
    setCoverUrl(a.cover_url || "");
    setFeatured(a.is_featured || false);
    setShowModal(true);
  };

  const openMediaModal = async (album: any) => {
    setSelectedAlbum(album);
    setMediaUrl("");
    setMediaCaption("");
    setMediaType("photo");
    setSelectedItemIds([]);
    setShowMediaModal(true);

    try {
      const fullAlbum = await getAlbumWithItems(album.id);
      if (fullAlbum && fullAlbum.gallery_items) {
        setAlbumItems(fullAlbum.gallery_items);
      } else {
        setAlbumItems([]);
      }
    } catch (e) {
      console.error("Failed to fetch album items", e);
    }
  };

  const openBulkUpload = (albumId?: string) => {
    if (albumId) {
      setBulkAlbumId(albumId);
    } else if (albums.length > 0 && !bulkAlbumId) {
      setBulkAlbumId(albums[0].id);
    }
    setPendingFiles([]);
    setPastedUrls("");
    setBulkProgress(null);
    setBulkSuccessMsg(null);
    setShowBulkUploadModal(true);
  };

  const handleSaveAlbum = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await updateAlbum(editing.id, {
          title,
          category,
          cover_url: coverUrl || null,
          is_featured: featured,
        });
      } else {
        const created = await createAlbum({
          title,
          description: null,
          cover_url: coverUrl || null,
          event_id: null,
          category,
          is_featured: featured,
          is_archived: false,
          display_order: albums.length,
        });
        if (created?.id) {
          setBulkAlbumId(created.id);
        }
      }
      setShowModal(false);
      await loadData();
    } catch (e) {
      alert((lang === "mr" ? "अल्बम जतन करताना त्रुटी आली: " : "Error saving album: ") + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  // Handle single media add
  const handleAddMedia = async () => {
    if (!mediaUrl.trim() || !selectedAlbum) return;
    setSaving(true);
    try {
      await addGalleryItem({
        album_id: selectedAlbum.id,
        type: mediaType,
        url: mediaUrl.trim(),
        thumbnail_url: null,
        caption: mediaCaption.trim() || null,
        display_order: albumItems.length,
      });

      if (!selectedAlbum.cover_url && mediaType === "photo") {
        await updateAlbum(selectedAlbum.id, { cover_url: mediaUrl.trim() });
      }

      setMediaUrl("");
      setMediaCaption("");
      const fullAlbum = await getAlbumWithItems(selectedAlbum.id);
      if (fullAlbum && fullAlbum.gallery_items) {
        setAlbumItems(fullAlbum.gallery_items);
      }
      await loadData();
    } catch (e) {
      alert((lang === "mr" ? "फोटो/व्हिडिओ जोडताना त्रुटी आली: " : "Error adding media: ") + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  // Handle single media delete
  const handleDeleteMedia = async (itemId: string) => {
    const confirmMsg = lang === "mr" ? "हे छायाचित्र नक्की हटवायचे आहे का?" : "Are you sure you want to delete this photo?";
    if (!confirm(confirmMsg)) return;
    try {
      await deleteGalleryItem(itemId);
      setAlbumItems((prev) => prev.filter((i) => i.id !== itemId));
      await loadData();
    } catch (e) {
      alert((lang === "mr" ? "हटवताना त्रुटी आली: " : "Error deleting: ") + (e as Error).message);
    }
  };

  // Handle bulk media delete inside album viewer
  const handleBulkDeleteSelected = async () => {
    if (!selectedItemIds.length) return;
    const confirmMsg = lang === "mr"
      ? `नक्की निवडलेली ${selectedItemIds.length} छायाचित्रे हटवायची आहेत का?`
      : `Are you sure you want to delete ${selectedItemIds.length} selected photos?`;
    if (!confirm(confirmMsg)) return;

    setBulkDeleting(true);
    try {
      await deleteGalleryItemsBulk(selectedItemIds);
      setAlbumItems((prev) => prev.filter((i) => !selectedItemIds.includes(i.id)));
      setSelectedItemIds([]);
      await loadData();
    } catch (e) {
      alert((lang === "mr" ? "बल्क डिलीट करताना त्रुटी आली: " : "Error during bulk delete: ") + (e as Error).message);
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedItemIds.length === albumItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(albumItems.map((item) => item.id));
    }
  };

  // File selection for bulk upload
  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const newFiles: PendingUploadFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newFiles.push({
          id: `${file.name}_${Date.now()}_${Math.random()}`,
          file,
          previewUrl: URL.createObjectURL(file),
        });
      }
    });

    setPendingFiles((prev) => [...prev, ...newFiles]);
  };

  const removePendingFile = (id: string) => {
    setPendingFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  // Execute Bulk Upload to Supabase Storage + Database
  const handleExecuteBulkUpload = async () => {
    if (!bulkAlbumId) {
      alert(lang === "mr" ? "कृपया आधी अल्बम निवडा!" : "Please select an album first!");
      return;
    }

    const urlList = pastedUrls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.startsWith("http"));

    const totalToUpload = pendingFiles.length + urlList.length;
    if (totalToUpload === 0) {
      alert(lang === "mr" ? "कृपया किमान १ फोटो फाईल किंवा URL जोडा." : "Please select at least 1 photo file or paste a URL.");
      return;
    }

    setBulkUploading(true);
    setBulkProgress({ current: 0, total: totalToUpload });
    setBulkSuccessMsg(null);

    const itemsToInsert: {
      album_id: string;
      type: "photo" | "video";
      url: string;
      caption: string | null;
      thumbnail_url: string | null;
      display_order: number;
    }[] = [];

    const supabase = createClient();
    let completedCount = 0;

    try {
      // 1. Upload files to Supabase Storage
      for (const item of pendingFiles) {
        const file = item.file;
        const ext = file.name.split(".").pop() || "jpg";
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("cms-media")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        let finalUrl = "";
        if (uploadError) {
          // Fallback to library bucket
          const { error: fallbackError } = await supabase.storage
            .from("library")
            .upload(filePath, file, { cacheControl: "3600", upsert: true });

          if (fallbackError) {
            console.error("Upload error for file:", file.name, fallbackError);
            continue;
          }
          finalUrl = supabase.storage.from("library").getPublicUrl(filePath).data.publicUrl;
        } else {
          finalUrl = supabase.storage.from("cms-media").getPublicUrl(filePath).data.publicUrl;
        }

        if (finalUrl) {
          itemsToInsert.push({
            album_id: bulkAlbumId,
            type: "photo",
            url: finalUrl,
            caption: file.name.replace(/\.[^/.]+$/, ""),
            thumbnail_url: null,
            display_order: itemsToInsert.length,
          });
        }

        completedCount++;
        setBulkProgress({ current: completedCount, total: totalToUpload });
      }

      // 2. Add pasted URLs
      for (const url of urlList) {
        itemsToInsert.push({
          album_id: bulkAlbumId,
          type: "photo",
          url,
          caption: null,
          thumbnail_url: null,
          display_order: itemsToInsert.length,
        });
        completedCount++;
        setBulkProgress({ current: completedCount, total: totalToUpload });
      }

      // 3. Insert all records in bulk
      if (itemsToInsert.length > 0) {
        await addGalleryItemsBulk(itemsToInsert);

        // If target album has no cover image, set the first uploaded photo as cover
        const targetAlbum = albums.find((a) => a.id === bulkAlbumId);
        if (targetAlbum && !targetAlbum.cover_url && itemsToInsert[0]?.url) {
          await updateAlbum(bulkAlbumId, { cover_url: itemsToInsert[0].url });
        }
      }

      setBulkSuccessMsg(
        lang === "mr"
          ? `यशस्वी! एकूण ${itemsToInsert.length} छायाचित्रे अल्बममध्ये जोडली गेली.`
          : `Success! ${itemsToInsert.length} photos added to the album.`
      );
      setPendingFiles([]);
      setPastedUrls("");
      await loadData();

      // Auto close after 2.5 seconds
      setTimeout(() => {
        setShowBulkUploadModal(false);
        setBulkSuccessMsg(null);
      }, 2500);
    } catch (err: any) {
      console.error("Bulk upload failed:", err);
      alert((lang === "mr" ? "बल्क अपलोड दरम्यान त्रुटी आली: " : "Error during bulk upload: ") + (err?.message || "Error"));
    } finally {
      setBulkUploading(false);
    }
  };

  const toggleFeatured = async (album: any) => {
    try {
      await updateAlbum(album.id, { is_featured: !album.is_featured });
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    const confirmMsg = lang === "mr"
      ? "हा संपूर्ण अल्बम आणि त्यातील सर्व छायाचित्रे कायमची हटवायची आहेत का?"
      : "Are you sure you want to permanently delete this album and all its photos?";
    if (!confirm(confirmMsg)) return;
    try {
      await deleteAlbum(id);
      await loadData();
    } catch (e) {
      alert((lang === "mr" ? "अल्बम हटवताना त्रुटी आली: " : "Error deleting album: ") + (e as Error).message);
    }
  };

  const shown = albums.filter((a) => (activeTab === "active" ? !a.is_archived : a.is_archived));

  return (
    <>
      <AdminTopbar
        title={t.galleryPageTitle}
        subtitle={t.galleryPageSubtitle}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
        {/* ========================================================
            PAGE HEADER & PRIMARY CMS ACTIONS
           ======================================================== */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {t.galleryPageTitle}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {t.galleryPageSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* BULK UPLOAD BUTTON (PRIMARY EMPHASIZED) */}
            <button
              onClick={() => openBulkUpload()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white px-5 py-3 text-sm sm:text-base font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <UploadCloud className="h-5 w-5" />
              <span>{t.galleryBulkBtn}</span>
            </button>

            {/* NEW ALBUM BUTTON */}
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-3 text-sm sm:text-base font-bold transition-all cursor-pointer border border-slate-300 dark:border-slate-700"
            >
              <FolderPlus className="h-5 w-5 text-[#800020] dark:text-rose-400" />
              <span>{t.galleryNewAlbumBtn}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB FILTER & REFRESH
           ======================================================== */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex gap-2">
            {(["active", "archived"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm sm:text-base font-bold border-b-2 -mb-[9px] cursor-pointer transition-colors ${
                  activeTab === tab
                    ? "border-[#800020] text-[#800020] dark:text-rose-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400"
                }`}
              >
                {tab === "active" ? `${t.tabActiveAlbums} (${albums.filter((a) => !a.is_archived).length})` : t.tabArchivedAlbums}
              </button>
            ))}
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>{t.refreshBtn}</span>
          </button>
        </div>

        {/* ========================================================
            ALBUM GRID
           ======================================================== */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <BobbingDots size="lg" className="text-[#800020]" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">{t.loadingAlbums}</p>
          </div>
        ) : shown.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <ImageIcon className="h-12 w-12 mx-auto text-slate-300" />
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">{t.noAlbumsFound}</p>
            <p className="text-sm text-slate-500">{t.noAlbumsHint}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shown.map((album) => {
              const itemsCount = album.gallery_items?.[0]?.count ?? 0;

              return (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Thumbnail */}
                    <div className="h-48 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                      {album.cover_url ? (
                        <img
                          src={album.cover_url}
                          alt={album.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-slate-700" />
                      )}

                      {album.is_featured && (
                        <div className="absolute top-2.5 right-2.5 bg-amber-400 text-amber-950 text-xs font-black rounded-lg px-2.5 py-1 flex items-center gap-1 shadow-sm">
                          <Star className="h-3.5 w-3.5 fill-current" /> {t.featuredBadge}
                        </div>
                      )}

                      {/* Quick Bulk Upload Trigger on Hover */}
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                        <button
                          onClick={() => openBulkUpload(album.id)}
                          className="w-full py-2 px-3 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <UploadCloud className="h-4 w-4" />
                          <span>{lang === "mr" ? "येथे बल्क फोटो जोडा" : "Upload Bulk Photos Here"}</span>
                        </button>
                        <button
                          onClick={() => openMediaModal(album)}
                          className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <ImageIcon className="h-4 w-4 text-[#800020]" />
                          <span>{lang === "mr" ? "सर्व फोटो पहा व बदला" : "View & Manage All Photos"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-snug flex-1">
                          {album.title}
                        </h3>
                        <span
                          className={`text-xs font-bold rounded-md px-2.5 py-0.5 shrink-0 ${
                            CATEGORY_COLORS[album.category] || CATEGORY_COLORS.General
                          }`}
                        >
                          {album.category || "General"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                          <ImageIcon className="h-4 w-4 text-[#800020]" /> {itemsCount} {t.itemsLabel}
                        </span>
                        <span className="text-xs">
                          {new Date(album.created_at).toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="border-t border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-800/40">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(album)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#800020] cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span>{t.btnEdit}</span>
                      </button>
                      <button
                        onClick={() => openBulkUpload(album.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#800020] hover:underline cursor-pointer"
                      >
                        <UploadCloud className="h-3.5 w-3.5" />
                        <span>{t.btnManageMedia}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleFeatured(album)}
                        title={album.is_featured ? (lang === "mr" ? "मुख्य दालनातून काढा" : "Unfeature") : (lang === "mr" ? "मुख्य दालनात दाखवा" : "Feature")}
                        className={`p-1.5 rounded-lg hover:bg-amber-100 transition-colors ${
                          album.is_featured ? "text-amber-500" : "text-slate-400"
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAlbum(album.id)}
                        title={t.btnDelete}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================
          MODAL 1: BULK PICTURE UPLOAD (LARGE, SPACIOUS, EASY)
         ======================================================== */}
      <AdminModal
        open={showBulkUploadModal}
        onClose={() => !bulkUploading && setShowBulkUploadModal(false)}
        title={t.bulkModalTitle}
        size="lg"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {pendingFiles.length > 0 ? `${t.bulkSelectedCount}: ${pendingFiles.length}` : ""}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowBulkUploadModal(false)}
                disabled={bulkUploading}
                className="rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer disabled:opacity-50"
              >
                {t.cancelBtn}
              </button>

              <button
                type="button"
                onClick={handleExecuteBulkUpload}
                disabled={bulkUploading || (pendingFiles.length === 0 && !pastedUrls.trim())}
                className="rounded-xl bg-[#800020] hover:bg-[#66001a] text-white px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                {bulkUploading ? (
                  <>
                    <BobbingDots size="sm" className="text-white" />
                    <span>{t.bulkUploadingBtn}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-5 w-5" />
                    <span>{t.bulkUploadBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-5">
          {/* Target Album Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.bulkSelectAlbumLabel}
            </label>
            <select
              value={bulkAlbumId}
              onChange={(e) => setBulkAlbumId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base font-medium text-slate-900 dark:text-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              {albums.map((a) => (
                <option key={a.id} value={a.id}>
                  📁 {a.title} ({a.category || "General"})
                </option>
              ))}
            </select>
          </div>

          {/* Success Message Banner */}
          {bulkSuccessMsg && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <p className="text-sm font-bold">{bulkSuccessMsg}</p>
            </div>
          )}

          {/* Upload Progress Bar */}
          {bulkProgress && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{t.bulkProgressLabel}</span>
                <span>
                  {bulkProgress.current} / {bulkProgress.total} (
                  {Math.round((bulkProgress.current / bulkProgress.total) * 100)}%)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#800020] transition-all duration-300"
                  style={{
                    width: `${Math.round((bulkProgress.current / bulkProgress.total) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Drag & Drop Multiple Files Area */}
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.bulkSelectFilesLabel}
            </label>

            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFilesSelected(e.dataTransfer.files);
              }}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#800020] dark:hover:border-rose-400 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100/70 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all space-y-2"
            >
              <div className="h-12 w-12 rounded-full bg-[#800020]/10 text-[#800020] dark:bg-rose-950/40 dark:text-rose-300 mx-auto flex items-center justify-center">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                {t.bulkDragDropText}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.bulkDragDropHint}
              </p>
            </div>
          </div>

          {/* Selected Files Preview Grid */}
          {pendingFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.bulkSelectedCount} ({pendingFiles.length}):
                </span>
                <button
                  type="button"
                  onClick={() => setPendingFiles([])}
                  className="text-xs text-red-600 font-bold hover:underline"
                >
                  {t.bulkClearAll}
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-56 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                {pendingFiles.map((pf) => (
                  <div key={pf.id} className="relative group rounded-lg overflow-hidden border border-slate-200 shadow-2xs aspect-square bg-slate-900">
                    <img src={pf.previewUrl} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePendingFile(pf.id)}
                      className="absolute top-1 right-1 h-5 w-5 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xs"
                      title={t.btnDelete}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── WHATSAPP WEB PASTE ZONE ─────────────────────────── */}
          <div
            className={`relative rounded-2xl border-2 transition-all duration-200 overflow-hidden cursor-text ${
              waFlash
                ? "border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20"
                : "border-dashed border-[#25D366]/60 bg-[#25D366]/5 hover:border-[#25D366] hover:bg-[#25D366]/10"
            }`}
            onPaste={(e) => {
              const items = e.clipboardData?.items;
              if (!items) return;
              const newFiles: PendingUploadFile[] = [];
              for (const item of Array.from(items)) {
                if (item.type.startsWith("image/")) {
                  const file = item.getAsFile();
                  if (file) {
                    newFiles.push({
                      id: `paste_${Date.now()}_${Math.random()}`,
                      file,
                      previewUrl: URL.createObjectURL(file),
                    });
                  }
                }
              }
              if (newFiles.length > 0) {
                setWaFlash(true);
                setWaPasteCount((c) => c + newFiles.length);
                setTimeout(() => setWaFlash(false), 700);
                setPendingFiles((prev) => [...prev, ...newFiles]);
              }
            }}
            tabIndex={0}
          >
            {/* Header strip */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#25D366]/10 border-b border-[#25D366]/20">
              <span className="h-8 w-8 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4 text-white fill-white" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {lang === "mr" ? "WhatsApp वेब वरून थेट पेस्ट करा" : "Paste directly from WhatsApp Web"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === "mr"
                    ? "फोटो उजवा-क्लिक करा → Copy Image → येथे Ctrl+V"
                    : "Right-click photo → Copy Image → Ctrl+V here"}
                </p>
              </div>
              {waPasteCount > 0 && (
                <span className="shrink-0 bg-[#25D366] text-white text-xs font-black px-2.5 py-1 rounded-full">
                  +{waPasteCount} {lang === "mr" ? "पेस्ट" : "pasted"}
                </span>
              )}
            </div>

            {/* Paste target + keyboard hint */}
            <div className="flex flex-col items-center justify-center gap-2 py-4 px-4 text-center">
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-black text-slate-700 dark:text-slate-200 shadow-xs font-mono">Ctrl</kbd>
                <span className="text-slate-400 font-black text-sm">+</span>
                <kbd className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-black text-slate-700 dark:text-slate-200 shadow-xs font-mono">V</kbd>
                <span className="text-slate-500 text-xs font-bold">
                  {lang === "mr" ? "— येथे क्लिक करा, मग पेस्ट करा" : "— click here first, then paste"}
                </span>
              </div>
              {waFlash && (
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ✅ {lang === "mr" ? "फोटो मिळाला! खाली दिसेल." : "Got it! Photo added to queue."}
                </p>
              )}
            </div>

            {/* 3-step guide */}
            <div className="grid grid-cols-3 gap-2 px-4 pb-4">
              {[
                {
                  step: "1",
                  textEn: "Open web.whatsapp.com",
                  textMr: "web.whatsapp.com उघडा",
                },
                {
                  step: "2",
                  textEn: "Right-click photo → Copy Image",
                  textMr: "फोटोवर उजवा-क्लिक → Copy Image",
                },
                {
                  step: "3",
                  textEn: "Click this box → Ctrl+V",
                  textMr: "या बॉक्सवर क्लिक → Ctrl+V",
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-2 bg-white/70 dark:bg-slate-800/50 rounded-xl p-2.5">
                  <span className="h-5 w-5 rounded-full bg-[#25D366] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                    {s.step}
                  </span>
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-snug">
                    {lang === "mr" ? s.textMr : s.textEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Option 2: Paste Multiple Image URLs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t.bulkPasteUrlsLabel}
            </label>
            <textarea
              rows={2}
              value={pastedUrls}
              onChange={(e) => setPastedUrls(e.target.value)}
              placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#800020]"
            />
          </div>
        </div>
      </AdminModal>


      {/* ========================================================
          MODAL 2: NEW / EDIT ALBUM
         ======================================================== */}
      <AdminModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? t.albumModalEditTitle : t.albumModalNewTitle}
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
              onClick={handleSaveAlbum}
              disabled={saving}
              className="rounded-xl bg-[#800020] hover:bg-[#66001a] text-white px-6 py-2.5 text-sm sm:text-base font-bold cursor-pointer disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {saving && <BobbingDots size="sm" className="text-white" />}
              <span>{editing ? t.albumSaveBtn : t.albumCreateBtn}</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.albumTitleLabel}
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.albumTitlePlaceholder}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.albumCategoryLabel}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as AlbumCategory)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base text-slate-900 dark:text-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              <option value="Events">{t.catEvents}</option>
              <option value="Library">{t.catLibrary}</option>
              <option value="Heritage">{t.catHeritage}</option>
              <option value="General">{t.catGeneral}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {t.albumCoverLabel}
            </label>
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder={t.albumCoverPlaceholder}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded accent-[#800020]"
            />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {t.albumFeaturedLabel}
            </span>
          </label>
        </div>
      </AdminModal>

      {/* ========================================================
          MODAL 3: MANAGE ALBUM MEDIA & BULK DELETE
         ======================================================== */}
      <AdminModal
        open={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        title={selectedAlbum ? `${t.mediaModalTitle} — ${selectedAlbum.title}` : t.mediaModalTitle}
        size="lg"
      >
        <div className="space-y-6">
          {/* Quick link to bulk upload to this album */}
          <div className="p-4 rounded-xl bg-[#800020]/5 dark:bg-rose-950/20 border border-[#800020]/20 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t.mediaQuickBulkPrompt}
              </p>
              <p className="text-xs text-slate-500">
                {t.mediaQuickBulkHint}
              </p>
            </div>
            <button
              onClick={() => {
                setShowMediaModal(false);
                openBulkUpload(selectedAlbum?.id);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <UploadCloud className="h-4 w-4" />
              <span>{t.mediaQuickBulkBtn}</span>
            </button>
          </div>

          {/* Add Single Photo/Video URL */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#800020]" />
              <span>{t.mediaAddSingleTitle}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{t.mediaTypeLabel}</label>
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold"
                >
                  <option value="photo">{t.mediaTypePhoto}</option>
                  <option value="video">{t.mediaTypeVideo}</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {mediaType === "video" ? "YouTube Video Embed / URL *" : t.mediaUrlLabel}
                </label>
                <input
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder={mediaType === "video" ? "https://www.youtube.com/embed/..." : "https://..."}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button
                onClick={handleAddMedia}
                disabled={saving || !mediaUrl.trim()}
                className="rounded-xl bg-slate-900 hover:bg-black text-white px-4 py-2 text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {saving && <BobbingDots size="sm" className="text-white" />}
                <span>{t.mediaAddBtn}</span>
              </button>
            </div>
          </div>

          {/* Album Photos List with Bulk Selection */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                {t.mediaItemsListTitle} ({albumItems.length})
              </h4>

              {albumItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleSelectAll}
                    className="text-xs font-bold text-slate-700 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
                  >
                    {selectedItemIds.length === albumItems.length ? t.mediaDeselectAll : t.mediaSelectAll}
                  </button>

                  {selectedItemIds.length > 0 && (
                    <button
                      type="button"
                      onClick={handleBulkDeleteSelected}
                      disabled={bulkDeleting}
                      className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>{selectedItemIds.length} {t.mediaDeleteSelected}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {albumItems.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center">
                {t.mediaEmptyNotice}
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
                {albumItems.map((item) => {
                  const isSelected = selectedItemIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`relative group rounded-xl overflow-hidden border ${
                        isSelected
                          ? "border-red-500 ring-2 ring-red-500"
                          : "border-slate-200 dark:border-slate-700"
                      } aspect-square bg-slate-950 flex flex-col justify-between`}
                    >
                      {item.type === "video" ? (
                        <div className="w-full h-full flex items-center justify-center text-purple-400">
                          <Video className="h-10 w-10" />
                        </div>
                      ) : (
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                      )}

                      {/* Select Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          setSelectedItemIds((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id]
                          );
                        }}
                        className="absolute top-2 left-2 h-4 w-4 rounded accent-red-600 z-10 cursor-pointer"
                      />

                      {/* Delete Single Button */}
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
                        title={t.btnDelete}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      {item.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1 text-[11px] text-white truncate text-center">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </AdminModal>
    </>
  );
}
