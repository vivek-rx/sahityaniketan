"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

interface LanguageDropdownProps {
  className?: string;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  direction?: "up" | "down";
}

interface LanguageOption {
  code: "mr" | "hi" | "en";
  label: string;
  nativeLabel: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "en", label: "English", nativeLabel: "English" },
];

export function LanguageDropdown({
  className,
  isDarkMode,
  onToggleTheme,
  direction = "down",
}: LanguageDropdownProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentLanguage =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      {/* -------------------------------------------------------------
          Dribbble Replica Dropdown Card (Floating Menu)
         ------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: direction === "up" ? -6 : 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === "up" ? -4 : 4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 w-60 sm:w-64 rounded-[26px] bg-white dark:bg-[#1E1E1E] p-3.5 shadow-2xl shadow-black/15 dark:shadow-black/70 border border-gray-100 dark:border-neutral-800 z-50 select-none",
              direction === "up" ? "bottom-full mb-2.5" : "top-full mt-2.5"
            )}
          >
            {/* Header label */}
            <div className="px-3 pt-1 pb-2">
              <span className="text-[11px] font-bold text-gray-400 dark:text-neutral-400 tracking-wider uppercase">
                Select Language
              </span>
            </div>

            {/* Language list options (Exact replica: no flags, checkmark on selected) */}
            <div className="space-y-1">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                      const langPair = `/mr/${lang.code}`;
                      if (lang.code === "mr") {
                        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname};`;
                      } else {
                        document.cookie = `googtrans=${encodeURIComponent(langPair)}; path=/`;
                        document.cookie = `googtrans=${encodeURIComponent(langPair)}; path=/; domain=${location.hostname}`;
                      }
                      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
                      if (combo) {
                        combo.value = lang.code;
                        combo.dispatchEvent(new Event("change"));
                      }
                    }}
                    className={cn(
                      "w-full rounded-2xl px-3.5 py-2.5 text-left text-sm transition-all flex items-center justify-between cursor-pointer",
                      isSelected
                        ? "bg-[#F3F4F6] dark:bg-[#2A2A2A] text-gray-950 dark:text-white font-semibold"
                        : "text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/60 font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {lang.nativeLabel}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="h-4 w-4 text-gray-900 dark:text-white stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
          Clean Trigger Pill (No 'i' icon)
         ------------------------------------------------------------- */}
      <div className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-[#1E1E1E] border border-gray-200/90 dark:border-neutral-800 p-1 shadow-2xs hover:shadow-xs transition-all">
        {/* Selected language button (opens dropdown) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full px-3 py-1 text-xs sm:text-[13px] font-bold transition-colors cursor-pointer flex items-center gap-1",
            isOpen
              ? "bg-gray-200/80 dark:bg-neutral-700 text-gray-950 dark:text-white"
              : "bg-gray-100/90 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 hover:bg-gray-200/70 dark:hover:bg-neutral-700"
          )}
          aria-expanded={isOpen}
          aria-label="Change language"
        >
          <span>{currentLanguage.nativeLabel}</span>
        </button>

        {/* Theme toggle icon (sun / moon) */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1 rounded-full text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
            aria-label="Toggle color theme"
          >
            {isDarkMode ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
