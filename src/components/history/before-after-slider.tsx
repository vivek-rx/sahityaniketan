"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal, Calendar, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeYear?: string;
  afterYear?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage = "/images/real/library_inauguration_plaque.png",
  afterImage = "/images/real/library_signboard.png",
  beforeLabel = "१९४५: मूळ ऐतिहासिक स्थापना शिलालेख (Founding Inscription)",
  afterLabel = "२०२६: आधुनिक ग्रंथालय दर्शनी फलक व वास्तू (Library Entrance)",
  beforeYear = "१ ऑगस्ट १९४५",
  afterYear = "आज (८०+ वर्षे)",
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Interactive Slider Canvas */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-[#B8860B]/40 cursor-ew-resize select-none bg-stone-900 group"
      >
        {/* AFTER IMAGE (Underneath - Modern 2026) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover pointer-events-none"
            priority
          />
          {/* After Tag */}
          <div className="absolute bottom-5 right-5 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold font-marathi-body shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* BEFORE IMAGE (Clipped overlay - Vintage 1945) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover pointer-events-none filter sepia-[0.25]"
              priority
            />
            {/* Before Tag */}
            <div className="absolute bottom-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-[#120B0D]/85 backdrop-blur-md border border-[#E5B869]/30 text-[#E5B869] text-xs font-bold font-marathi-body shadow-lg flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-[#E5B869]" />
              <span>{beforeLabel}</span>
            </div>
          </div>
        </div>

        {/* DRAG HANDLE DIVIDER */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-[#1E1418] border-2 border-[#B8860B] shadow-xl flex items-center justify-center text-[#800020] dark:text-[#E5B869] transition-transform group-hover:scale-110">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Instruction badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-[11px] font-semibold flex items-center gap-1.5 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#E5B869]" />
          <span>तुलनेसाठी डावीकडे-उजवीकडे सरकवा</span>
        </div>
      </div>

      {/* Explanatory Caption */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 dark:text-stone-300 font-marathi-body px-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C0392B]" />
          <span className="font-bold text-stone-800 dark:text-stone-100">
            {beforeYear} — {afterYear}
          </span>
          <span>— एकाच परिसरातील वास्तुस्थितीचे ऐतिहासिक स्थित्यंतर</span>
        </div>
        <div className="text-[11px] text-stone-500">
          छायाचित्र संदर्भ: साहित्य निकेतन ग्रंथालय अभिलेखागार
        </div>
      </div>
    </div>
  );
}
