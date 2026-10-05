"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpandListItem {
  id: string;
  serialNumber: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  timing?: string;
  badge?: string;
  link?: string;
  linkText?: string;
}

export interface ExpandOnHoverListProps {
  items: ExpandListItem[];
  defaultOpenIndex?: number;
  className?: string;
  openColor?: string; // Color when expanded
  closeColor?: string; // Color when collapsed
  dividerColor?: string;
}

export function ExpandOnHoverList({
  items,
  defaultOpenIndex = 0,
  className = "",
  openColor = "#800020",
  dividerColor = "border-stone-200 dark:border-stone-800",
}: ExpandOnHoverListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("w-full divide-y", dividerColor, className)}>
      {items.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={item.id || index}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(isOpen ? null : index)}
            className="group py-5 sm:py-6 cursor-pointer transition-colors duration-200 select-none"
          >
            {/* Header row: Number + Title + Arrow */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                {/* Serial Number */}
                <span
                  className={cn(
                    "text-xs sm:text-sm font-black tracking-widest transition-colors duration-200 shrink-0 w-8",
                    isOpen
                      ? "text-[#800020] dark:text-[#E5B869]"
                      : "text-stone-400 dark:text-stone-600 group-hover:text-stone-700 dark:group-hover:text-stone-300"
                  )}
                >
                  {item.serialNumber}
                </span>

                {/* Title & Subtitle */}
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "text-lg sm:text-2xl font-bold tracking-tight transition-colors duration-200 truncate",
                      isOpen
                        ? "text-[#800020] dark:text-[#E5B869]"
                        : "text-stone-800 dark:text-stone-200 group-hover:text-[#800020] dark:group-hover:text-[#E5B869]"
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.subtitle && !isOpen && (
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Indicator Icon */}
              <div
                className={cn(
                  "h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300",
                  isOpen
                    ? "bg-[#800020] text-white border-[#800020] dark:bg-[#E5B869] dark:text-[#3A050B] dark:border-[#E5B869] rotate-45"
                    : "border-stone-300 dark:border-stone-700 text-stone-500 group-hover:border-stone-400 group-hover:text-stone-800 dark:group-hover:text-stone-200"
                )}
              >
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300" />
              </div>
            </div>

            {/* Expandable Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 sm:pt-6 pl-0 sm:pl-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Image Preview if available */}
                    {item.image && (
                      <div className="md:col-span-5 relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        {item.badge && (
                          <div className="absolute top-3 left-3 bg-[#800020]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            <span>{item.badge}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content Column */}
                    <div
                      className={cn(
                        "space-y-4 flex flex-col justify-between",
                        item.image ? "md:col-span-7" : "md:col-span-12"
                      )}
                    >
                      <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {item.timing && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300">
                            <Clock className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
                            <span>{item.timing}</span>
                          </div>
                        )}

                        {item.link && (
                          <Link
                            href={item.link}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                          >
                            <span>{item.linkText || "सविस्तर माहिती पहा"}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default ExpandOnHoverList;
