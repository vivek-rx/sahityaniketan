"use client";

import React, { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ImageDropCard — drag & drop image upload card for the admin gallery
 * (adapted from Uiverse.io by Yaya12085, recoloured to the site palette:
 * maroon #800020 instead of royalblue).
 *
 * Layout: a dashed-border header box (icon + hint) above a solid footer bar
 * (circular icon + browse text). Clicking anywhere opens the file picker;
 * dragging files over it highlights the dashed border.
 */
interface ImageDropCardProps {
  /** header line: what to do ("Drag and Drop here") */
  hint: string;
  /** small line under the hint */
  subhint?: string;
  /** footer bar text: the browse action ("Select Photos") */
  label: string;
  onFiles: (files: FileList | null) => void;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ImageDropCard({
  hint,
  subhint,
  label,
  onFiles,
  multiple = true,
  disabled = false,
  className,
}: ImageDropCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-2 rounded-xl p-2.5 bg-[#800020]/[0.04] dark:bg-white/[0.03] border border-[#E5DDD0]/60 dark:border-[#332228]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Header: dashed drop box */}
      <div
        onClick={openPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex-1 min-h-[180px] sm:min-h-[220px] w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 text-center px-4 py-6 cursor-pointer transition-colors",
          dragging
            ? "border-[#800020] bg-[#800020]/[0.06] dark:border-[#E5B869]"
            : "border-[#800020]/40 hover:border-[#800020] dark:border-rose-500/40 dark:hover:border-rose-400"
        )}
      >
        <div className="h-16 w-16 rounded-full bg-[#800020]/10 text-[#800020] dark:bg-rose-950/40 dark:text-rose-300 flex items-center justify-center shrink-0">
          <CloudUpload className="h-8 w-8" />
        </div>
        <p className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 font-marathi-body">
          {hint}
        </p>
        {subhint && (
          <p className="text-xs text-stone-500 dark:text-stone-400 font-marathi-body">
            {subhint}
          </p>
        )}
      </div>

      {/* Footer bar: circular icon + browse label */}
      <button
        type="button"
        onClick={openPicker}
        className={cn(
          "w-full h-11 px-3 rounded-xl flex items-center gap-2.5 bg-[#800020]/[0.07] dark:bg-white/[0.06] hover:bg-[#800020]/[0.12] dark:hover:bg-white/10 text-stone-800 dark:text-stone-200 cursor-pointer transition-colors font-marathi-body"
        )}
      >
        <span className="h-7 w-7 shrink-0 rounded-full bg-[#800020]/15 text-[#800020] dark:bg-rose-950/50 dark:text-rose-300 flex items-center justify-center shadow-sm">
          <CloudUpload className="h-4 w-4" />
        </span>
        <p className="flex-1 text-center text-sm font-bold">{label}</p>
      </button>

      <input
        type="file"
        ref={inputRef}
        multiple={multiple}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onFiles(e.target.files);
          e.target.value = ""; // allow re-selecting the same file
        }}
      />
    </div>
  );
}
