"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { UploadCloud, CheckCircle, Clipboard, X, MessageCircle } from "lucide-react";
import { BobbingDots } from "@/components/ui/bobbing-dots";
import { createClient } from "@/lib/supabase/client";

interface ImageDropzoneProps {
  onUploadSuccess?: (url: string) => void;
  className?: string;
  bucket?: string;
  label?: string;
  currentValue?: string;
  compact?: boolean;
  /** When true the zone listens for global paste events (Ctrl+V / ⌘+V) */
  enablePaste?: boolean;
}

export function ImageDropzone({
  onUploadSuccess,
  className = "",
  bucket = "cms-media",
  label = "प्रतिमा येथे ड्रॅग करा किंवा निवडा (Drag & Drop image to get Supabase link)",
  currentValue,
  compact = false,
  enablePaste = false,
}: ImageDropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pasteFlash, setPasteFlash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ─── Core upload ──────────────────────────────────────────── */
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("फक्त इमेज फाईल्स स्वीकारल्या जातात (Only images allowed)");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        const { error: fallbackError } = await supabase.storage
          .from("library")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (fallbackError) throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const finalUrl = publicUrlData?.publicUrl || "";
      setUploadedUrl(finalUrl);
      onUploadSuccess?.(finalUrl);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err?.message || "इमेज अपलोड अयशस्वी (Upload failed)");
    } finally {
      setIsUploading(false);
    }
  };

  /* ─── Drag & Drop ──────────────────────────────────────────── */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  /* ─── Clipboard Paste (global listener) ───────────────────── */
  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      if (!enablePaste) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            setPasteFlash(true);
            setTimeout(() => setPasteFlash(false), 600);
            handleFileUpload(file);
            break;
          }
        }
      }
    },
    [enablePaste] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (!enablePaste) return;
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [enablePaste, handlePaste]);

  /* ─── Render ───────────────────────────────────────────────── */
  return (
    <div className={`space-y-2 ${className}`}>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
          pasteFlash
            ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20 scale-[1.01]"
            : isDragging
              ? "border-[#991B1B] bg-[#991B1B]/5 scale-[1.01]"
              : "border-stone-300 dark:border-neutral-700 hover:border-stone-400 bg-stone-50 dark:bg-neutral-900/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-2 gap-2">
            <BobbingDots size="md" className="text-[#991B1B]" />
            <span className="text-xs text-stone-600 dark:text-stone-300 font-medium">
              Supabase मध्ये अपलोड होत आहे...
            </span>
          </div>
        ) : uploadedUrl ? (
          <div className="flex flex-col items-center justify-center py-1 space-y-1">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              अपलोड यशस्वी! लिंक तयार झाली.
            </span>
            <span className="text-[11px] font-mono text-stone-500 truncate max-w-xs">
              {uploadedUrl}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 space-y-1">
            <UploadCloud className="h-6 w-6 text-stone-500" />
            <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
              {label}
            </p>
            {enablePaste && (
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Clipboard className="h-3 w-3" />
                Ctrl+V / ⌘V ने WhatsApp फोटो थेट पेस्ट करा
              </p>
            )}
            <p className="text-[10px] text-stone-500">PNG, JPG, WebP, GIF (Max 10MB)</p>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
