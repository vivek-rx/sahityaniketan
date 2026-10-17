"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  IconCloudUpload,
  IconDownload,
  IconX,
  IconCheck,
  IconPhoto,
  IconTrash,
  IconCopy,
  IconClipboard,
} from "@tabler/icons-react";
import { BobbingDots } from "@/components/ui/bobbing-dots";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import classes from "./DropzoneButton.module.css";

// ── Mantine Compatible Primitives & MIME_TYPES ──

export const MIME_TYPES = {
  pdf: "application/pdf",
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  images: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml", "image/*"],
} as const;

export function useMantineTheme() {
  return {
    colors: {
      blue: ["#e7f5ff", "#d0ebff", "#a5d8ff", "#74c0fc", "#4dabf7", "#339af0", "#228be6", "#1c7ed6", "#1971c2", "#1864ab"],
      red: ["#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#fa5252", "#f03e3e", "#e03131", "#c92a2a"],
      green: ["#ebfbee", "#d3f9d8", "#b2f2bb", "#8ce99a", "#69db7c", "#51cf66", "#40c057", "#37b24d", "#2f9e44", "#2b8a3e"],
    },
  };
}

export function Group({
  justify = "center",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { justify?: "center" | "start" | "end" | "between" }) {
  const justifyClass =
    justify === "center"
      ? "justify-center"
      : justify === "start"
      ? "justify-start"
      : justify === "end"
      ? "justify-end"
      : "justify-between";

  return (
    <div className={cn("flex items-center gap-3", justifyClass, className)} {...props}>
      {children}
    </div>
  );
}

export function Text({
  ta,
  fw,
  fz,
  mt,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ta?: "center" | "left" | "right";
  fw?: number | string;
  fz?: "xs" | "sm" | "md" | "lg" | "xl";
  mt?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  const alignClass = ta === "center" ? "text-center" : ta === "right" ? "text-right" : "text-left";
  const weightClass = fw === 700 || fw === "bold" ? "font-bold" : "font-normal";
  const sizeClass =
    fz === "lg" ? "text-base sm:text-lg" : fz === "sm" ? "text-xs sm:text-sm" : fz === "xs" ? "text-xs" : "text-sm";
  const marginClass = mt === "xl" ? "mt-4" : mt === "lg" ? "mt-3" : mt === "md" ? "mt-2" : "";

  return (
    <p className={cn(alignClass, weightClass, sizeClass, marginClass, className)} {...props}>
      {children}
    </p>
  );
}

export function Button({
  className,
  size,
  radius,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <button type="button" className={cn(classes.control, className)} {...props}>
      {children}
    </button>
  );
}

// ── Dropzone Subcomponents ──

interface DropzoneStatusContextType {
  status: "idle" | "accept" | "reject";
}

const DropzoneStatusContext = React.createContext<DropzoneStatusContextType>({
  status: "idle",
});

function DropzoneAccept({ children }: { children: React.ReactNode }) {
  const { status } = React.useContext(DropzoneStatusContext);
  if (status !== "accept") return null;
  return <>{children}</>;
}

function DropzoneReject({ children }: { children: React.ReactNode }) {
  const { status } = React.useContext(DropzoneStatusContext);
  if (status !== "reject") return null;
  return <>{children}</>;
}

function DropzoneIdle({ children }: { children: React.ReactNode }) {
  const { status } = React.useContext(DropzoneStatusContext);
  if (status !== "idle") return null;
  return <>{children}</>;
}

// ── Dropzone Container ──

export interface DropzoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  openRef?: React.RefObject<(() => void) | null>;
  onDrop?: ((files: File[]) => void) | React.DragEventHandler<HTMLDivElement>;
  accept?: readonly string[] | string[];
  maxSize?: number;
  radius?: string;
  status?: "idle" | "accept" | "reject";
}

export function DropzoneRoot({
  children,
  openRef,
  onDrop,
  className,
  accept,
  maxSize,
  status = "idle",
  ...props
}: DropzoneProps) {
  const handleContainerDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!onDrop) return;
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      (onDrop as any)(files);
    } else {
      (onDrop as any)(e);
    }
  };

  return (
    <DropzoneStatusContext.Provider value={{ status }}>
      <div
        className={cn(classes.dropzone, className)}
        onDrop={handleContainerDrop}
        {...props}
      >
        {children}
      </div>
    </DropzoneStatusContext.Provider>
  );
}

export const Dropzone = Object.assign(DropzoneRoot, {
  Accept: DropzoneAccept,
  Reject: DropzoneReject,
  Idle: DropzoneIdle,
});

// ── Complete DropzoneButton Component for Carousel, Gallery & Events ──

export interface DropzoneButtonProps {
  onUploadSuccess?: (url: string) => void;
  onDrop?: (files: File[]) => void;
  currentValue?: string;
  onClear?: () => void;
  bucket?: string;
  accept?: readonly string[] | string[];
  maxSize?: number; // In bytes (default 10MB)
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  enablePaste?: boolean;
  multiple?: boolean;
}

export function DropzoneButton({
  onUploadSuccess,
  onDrop,
  currentValue,
  onClear,
  bucket = "cms-media",
  accept = MIME_TYPES.images,
  maxSize = 10 * 1024 * 1024, // 10MB
  title = "प्रतिमा येथे ड्रॅग करा (Drop image here)",
  description = "PNG, JPG, WebP, GIF स्वीकारले जातील (कमाल आकार 10MB). WhatsApp वरून थेट Ctrl+V पेस्ट देखील समर्थित आहे.",
  buttonText = "फोटो निवडा (Select files)",
  className,
  enablePaste = true,
  multiple = false,
}: DropzoneButtonProps) {
  const theme = useMantineTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef<(() => void) | null>(null);

  const [dragStatus, setDragStatus] = useState<"idle" | "accept" | "reject">("idle");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(currentValue || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pasting, setPasting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync external currentValue changes
  useEffect(() => {
    if (currentValue !== undefined) {
      setUploadedUrl(currentValue || null);
    }
  }, [currentValue]);

  // Bind openRef to trigger native file input
  useEffect(() => {
    openRef.current = () => fileInputRef.current?.click();
  }, []);

  /* ── Core Upload Handler ── */
  const handleFileUpload = async (file: File) => {
    if (maxSize && file.size > maxSize) {
      setErrorMessage(`फाईलचा आकार खूप मोठा आहे (Max size: ${Math.round(maxSize / (1024 * 1024))}MB)`);
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage(null);
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      // Upload to target bucket with fallback to 'library' bucket
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        const { error: fallbackError } = await supabase.storage
          .from("library")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });
        if (fallbackError) throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      const finalUrl = publicUrlData?.publicUrl || "";

      setUploadedUrl(finalUrl);
      onUploadSuccess?.(finalUrl);
    } catch (err: any) {
      console.error("Dropzone upload failed:", err);
      setErrorMessage(err?.message || "प्रतिमा अपलोड अयशस्वी झाली (Upload failed)");
    } finally {
      setIsUploading(false);
    }
  };

  /* ── Drag & Drop Handlers ── */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) {
      setDragStatus("accept");
    } else {
      setDragStatus("reject");
    }
  };

  const handleDragLeave = () => {
    setDragStatus("idle");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragStatus("idle");

    const files = Array.from(e.dataTransfer.files);
    if (!files || files.length === 0) return;

    if (onDrop) {
      onDrop(files);
    }

    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  /* ── Clipboard Paste (WhatsApp Web / Screenshot paste) ── */
  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      if (!enablePaste) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            setPasting(true);
            setTimeout(() => setPasting(false), 800);
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

  const handleCopyUrl = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRemove = () => {
    setUploadedUrl(null);
    onClear?.();
    onUploadSuccess?.("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={cn(classes.wrapper, className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={Array.isArray(accept) ? accept.join(",") : "image/*"}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length > 0) {
            if (onDrop) onDrop(files);
            handleFileUpload(files[0]);
          }
        }}
      />

      {/* ── State 1: Image already uploaded or provided (Interactive Preview Card) ── */}
      {uploadedUrl && !isUploading ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-4 transition-all">
          <div className="relative h-24 w-32 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <img
              src={uploadedUrl}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
              <IconCheck size={12} stroke={3} />
            </span>
          </div>

          <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left w-full">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <IconCheck size={15} />
              <span>प्रतिमा यशस्वीरित्या जोडली (Ready & Linked)</span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 truncate max-w-sm">
              {uploadedUrl}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconCopy size={13} />
                <span>{copied ? "कॉपी झाले! (Copied)" : "Copy URL"}</span>
              </button>
              <button
                type="button"
                onClick={() => openRef.current?.()}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconPhoto size={13} />
                <span>बदला (Replace)</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconTrash size={13} />
                <span>काढून टाका (Remove)</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── State 2: Mantine Dropzone Interface (Idle, Dragging, or Uploading) ── */
        <>
          <Dropzone
            openRef={openRef}
            status={dragStatus}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => openRef.current?.()}
            data-accept={dragStatus === "accept" || undefined}
            data-reject={dragStatus === "reject" || undefined}
            data-pasting={pasting || undefined}
            aria-label="Drop files here"
          >
            <div style={{ pointerEvents: "none" }}>
              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-4 gap-2">
                  <BobbingDots size="md" className="text-[#00657E]" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Supabase क्लाउडवर अपलोड होत आहे...
                  </p>
                  <p className="text-xs text-slate-400">कृपया थोडा वेळ प्रतीक्षा करा</p>
                </div>
              ) : (
                <>
                  <Group justify="center">
                    <Dropzone.Accept>
                      <IconDownload size={48} color={theme.colors.blue[6]} stroke={1.6} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX size={48} color={theme.colors.red[6]} stroke={1.6} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconCloudUpload size={48} stroke={1.6} className={classes.icon} />
                    </Dropzone.Idle>
                  </Group>

                  <Text ta="center" fw={700} fz="lg" mt="lg" className="text-slate-800 dark:text-slate-100">
                    <Dropzone.Accept>प्रतिमा येथे सोडा (Drop files here)</Dropzone.Accept>
                    <Dropzone.Reject>फक्त १० MB पेक्षा कमी आकाराची इमेज</Dropzone.Reject>
                    <Dropzone.Idle>{title}</Dropzone.Idle>
                  </Text>

                  <Text className={classes.description}>{description}</Text>

                  {enablePaste && (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">
                      <IconClipboard size={13} />
                      <span>WhatsApp वरून कॉपी केलेला फोटो येथे थेट Ctrl+V ने पेस्ट करा</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </Dropzone>

          {/* Overlapping Mantine Action Button at bottom */}
          {!isUploading && (
            <Button
              className={classes.control}
              size="md"
              radius="xl"
              onClick={() => openRef.current?.()}
            >
              {buttonText}
            </Button>
          )}
        </>
      )}

      {errorMessage && (
        <p className="text-xs font-bold text-red-600 dark:text-red-400 text-center mt-3">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default DropzoneButton;
