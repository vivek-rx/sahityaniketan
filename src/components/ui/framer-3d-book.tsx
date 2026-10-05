"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";

interface Framer3DBookProps {
  title: string;
  author: string;
  coverImage?: string;
  isbn?: string;
  callNumber?: string;
  shelf?: string;
  category?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

// Curated library binding color themes (Cloth & Leather tones)
const BINDING_THEMES = [
  {
    bg: "from-[#4A0E17] via-[#661623] to-[#30080E]", // Heritage Maroon
    border: "border-amber-300/50",
    accent: "text-amber-200",
    pillBg: "bg-amber-950/70 border-amber-400/40 text-amber-200",
  },
  {
    bg: "from-[#0A2647] via-[#144272] to-[#061830]", // Prussian Navy
    border: "border-amber-200/50",
    accent: "text-sky-200",
    pillBg: "bg-sky-950/70 border-sky-400/40 text-sky-200",
  },
  {
    bg: "from-[#0B3B24] via-[#145A32] to-[#072416]", // Forest Emerald
    border: "border-emerald-200/50",
    accent: "text-emerald-200",
    pillBg: "bg-emerald-950/70 border-emerald-400/40 text-emerald-200",
  },
  {
    bg: "from-[#38184C] via-[#522370] to-[#250E34]", // Classical Plum
    border: "border-purple-200/50",
    accent: "text-purple-200",
    pillBg: "bg-purple-950/70 border-purple-400/40 text-purple-200",
  },
  {
    bg: "from-[#4E2A06] via-[#6E3C09] to-[#321A02]", // Vintage Ochre
    border: "border-amber-300/50",
    accent: "text-amber-100",
    pillBg: "bg-amber-950/70 border-amber-400/40 text-amber-200",
  },
];

/**
 * Framer 3D Interactive Book Component
 * Features realistic 3D spine creases, gloss reflections, page-turn paper preview,
 * and an authentic, publication-quality typographic library hardcover binding.
 * Completely free of AI-generated stock covers.
 */
export function Framer3DBook({
  title,
  author,
  coverImage,
  isbn,
  callNumber,
  shelf,
  category,
  width = 200,
  height = 305,
  className = "",
  onClick,
}: Framer3DBookProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Deterministic binding palette based on book title
  const theme = useMemo(() => {
    let hash = 0;
    const str = title + (category || "");
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % BINDING_THEMES.length;
    return BINDING_THEMES[idx];
  }, [title, category]);

  // Determine if there is a genuine external cover (e.g. real Open Library / uploaded URL)
  const isRealExternalCover = useMemo(() => {
    if (!coverImage || coverImage.trim() === "") return false;
    // Reject any old AI book image paths
    if (coverImage.includes("book_") || coverImage.includes("manuscript_") || coverImage.includes("placeholder")) {
      return false;
    }
    return coverImage.startsWith("http") || coverImage.startsWith("/images/real/");
  }, [coverImage]);

  const handleImageError = () => {
    setImageError(true);
  };

  const showTypographicCover = !isRealExternalCover || imageError;

  return (
    <div
      onClick={(e) => {
        setIsHovered((prev) => !prev);
        onClick?.();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

      className={`relative cursor-pointer select-none transition-all duration-500 ease-out flex items-center justify-center max-w-full ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: "1200px",
      }}
    >
      {/* 3D Book Container */}
      <motion.div
        className="relative w-full h-full rounded-md transform-gpu"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 4px 8px rgba(0, 0, 0, 0.25), 0px 12px 24px rgba(0, 0, 0, 0.22), 0px 24px 36px rgba(0, 0, 0, 0.18)"
            : "0px 2px 8px rgba(0, 0, 0, 0.14)",
        }}
        animate={{
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
      >
        {/* Inside Paper Page (revealed when cover opens on hover) */}
        <div
          className="absolute inset-0 rounded-r-md p-3 sm:p-5 flex flex-col items-center justify-center text-center overflow-hidden z-0 font-marathi-body border border-gray-200"
          style={{
            background: "linear-gradient(239deg, rgb(255, 255, 255) 0%, rgb(238, 234, 226) 100%)",
          }}
        >
          {/* Subtle Red Margin Line */}
          <div className="absolute inset-y-0 left-2.5 sm:left-3 w-[1px] bg-red-300/50" />
          
          <div className="space-y-1.5 sm:space-y-2 max-w-[90%] z-10">
            <span className="text-[7.5px] sm:text-[9.5px] font-extrabold tracking-widest text-[#00657E] uppercase block font-marathi-body">
              साहित्य निकेतन ग्रंथालय
            </span>
            <h4 className="text-xs sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 sm:line-clamp-3 font-marathi-heading">
              {title}
            </h4>
            <div className="h-0.5 w-6 sm:w-8 bg-[#ED6923] mx-auto rounded-full" />
            <p className="text-[9px] sm:text-xs text-gray-600 font-semibold line-clamp-1 sm:line-clamp-2 font-marathi-body">
              {author}
            </p>
            {callNumber && (
              <span className="inline-block mt-1 sm:mt-2 font-mono text-[7.5px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded bg-gray-100 border border-gray-300 text-gray-700">
                {callNumber}
              </span>
            )}
          </div>
        </div>

        {/* Front Cover (swings open -70 deg on hover) */}
        <motion.div
          className="absolute inset-0 rounded-r-md overflow-hidden z-10 shadow-md origin-left transform-gpu"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: isHovered ? -70 : 0,
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        >
          {/* Authentic Library Hardcover Typographic Binding */}
          {showTypographicCover ? (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${theme.bg} p-2.5 sm:p-4 flex flex-col justify-between text-white font-marathi-body select-none`}
            >
              {/* Outer & Inner Embossed Gold Foil Border */}
              <div className={`absolute inset-1.5 sm:inset-2 border ${theme.border} rounded pointer-events-none`} />
              <div className="absolute inset-2.5 sm:inset-3 border border-amber-300/20 rounded pointer-events-none" />

              {/* Header: Library Institutional Emblem */}
              <div className="relative z-10 pt-0.5 sm:pt-1 text-center">
                <div className="flex items-center justify-center gap-1 text-[7.5px] sm:text-[9px] font-bold text-amber-200/90 tracking-widest uppercase">
                  <span>✦</span>
                  <span>साहित्य निकेतन</span>
                  <span>✦</span>
                </div>
                <span className="text-[6.5px] sm:text-[7.5px] text-amber-300/70 tracking-wider block">अंबाजोगाई</span>
              </div>

              {/* Center: Book Title & Author in Classical Lettering */}
              <div className="relative z-10 my-auto py-1 sm:py-2 text-center px-1">
                <h4 className="font-marathi-heading text-xs sm:text-base font-extrabold text-amber-100 leading-snug drop-shadow-sm line-clamp-2 sm:line-clamp-3">
                  {title}
                </h4>
                <div className="h-[1px] w-8 sm:w-10 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent mx-auto my-1 sm:my-2" />
                <p className={`font-marathi-body text-[8.5px] sm:text-[11px] font-semibold ${theme.accent} line-clamp-1 sm:line-clamp-2`}>
                  {author}
                </p>
              </div>

              {/* Bottom: Library Accession / Call Number Bar */}
              <div className="relative z-10 pb-0.5 sm:pb-1 text-center">
                <div
                  className={`inline-block border px-1.5 sm:px-2 py-0.5 rounded text-[7px] sm:text-[9px] font-mono tracking-tight ${theme.pillBg}`}
                >
                  {callNumber || isbn || "वर्ग 'अ' संग्रह"}
                </div>
                <span className="text-[6.5px] sm:text-[7.5px] text-amber-200/60 block mt-0.5 sm:mt-1 tracking-wider">
                  सार्वजनिक वाचनालय
                </span>
              </div>
            </div>
          ) : (
            <Image
              src={coverImage!}
              alt={title}
              fill
              sizes={`${width}px`}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              loading="lazy"
              onError={handleImageError}
              className="object-cover object-center w-full h-full"
              priority={false}
            />
          )}

          {/* Realistic Book Spine Crease & Shadow Overlay */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[20px] pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.45) 0%, rgba(255, 255, 255, 0.4) 22%, rgba(0, 0, 0, 0.35) 42%, rgba(255, 255, 255, 0.3) 50%, rgba(0, 0, 0, 0.2) 75%, rgba(255, 255, 255, 0) 100%)",
              opacity: 0.5,
            }}
          />

          {/* Diagonal Book Cover Gloss Reflection Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(35deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.15) 100%)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
