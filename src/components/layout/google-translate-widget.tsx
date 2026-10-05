"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { ThemeToggleButton4 } from "@/components/ui/skiper-ui/skiper4";

export type LangCode = "mr" | "en" | "hi";

export interface LangOption {
  code: LangCode;
  label: string;
  nativeLabel: string;
}

export const LANGS: LangOption[] = [
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "en", label: "English", nativeLabel: "English" },
];

interface Props {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  direction?: "up" | "down";
  align?: "left" | "right";
  className?: string;
  variant?: "light" | "nav" | "compact";
  showThemeToggle?: boolean;
}

export function GoogleTranslateWidget({
  isDarkMode,
  onToggleTheme,
  direction = "down",
  align = "right",
  className,
  variant = "light",
  showThemeToggle = true,
}: Props) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active: LangCode =
    language === "hi" || language === "en" || language === "mr"
      ? language
      : "mr";

  /* ── Sync active language from localStorage on mount ── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sn_language") as LangCode | null;
      if (saved && (saved === "en" || saved === "hi" || saved === "mr") && saved !== language) {
        setLanguage(saved);
      }
      // Clean up any stale Google Translate cookies and DOM classes
      const hostname = window.location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      document.documentElement.classList.remove("translated-ltr", "translated-rtl");
    }
  }, []);

  /* ── Close on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Native Language Change (Instant React State + LocalStorage) ── */
  const selectLanguage = (lang: LangOption) => {
    setLanguage(lang.code);
    setOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("sn_language", lang.code);
      document.documentElement.lang = lang.code;
    }
  };

  const current = LANGS.find((l) => l.code === active) || LANGS[0];

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex items-center", open && "z-[9999]", className)}
      style={{ zIndex: open ? 9999 : undefined }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TRIGGER BUTTON VARIANTS
          ───────────────────────────────────────────────────────────── */}
      {variant === "nav" ? (
        /* Nav Bar Variant: Deep Burgundy / Dark frosted glass with Gold accents */
        <div className="inline-flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-inner select-none",
              open
                ? "bg-black/45 text-amber-300 border border-amber-400/80"
                : "bg-black/25 hover:bg-black/40 text-white/95 hover:text-white border border-white/20 hover:border-[#E5B869]/80"
            )}
            aria-expanded={open}
            aria-label="भाषा निवडा / Change Language"
            title="भाषा निवडा / Change Language"
          >
            <Languages className="h-3.5 w-3.5 text-[#E5B869] shrink-0" />
            <span className="font-marathi-heading tracking-wide text-[13px]">{current.nativeLabel}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-[#E5B869] transition-transform duration-200",
                open ? "rotate-180" : ""
              )}
            />
          </button>

          {showThemeToggle && onToggleTheme && (
            <ThemeToggleButton4
              isDark={isDarkMode}
              onToggle={onToggleTheme}
              className="size-7 p-1 text-white/80 hover:text-white bg-black/25 hover:bg-black/40 border border-white/15"
            />
          )}
        </div>
      ) : variant === "compact" ? (
        /* Compact Variant: Mobile navbar buttons */
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "rounded-xl px-2 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-inner select-none shrink-0",
            open
              ? "bg-black/40 text-amber-300 border border-amber-400"
              : "bg-black/25 hover:bg-black/40 text-white border border-white/20 active:scale-95"
          )}
          aria-expanded={open}
          aria-label="भाषा निवडा"
          title="भाषा निवडा"
        >
          <Languages className="h-3 w-3 text-[#E5B869] shrink-0" />
          <span className="font-marathi-heading text-[11.5px] font-bold">{current.nativeLabel}</span>
          <ChevronDown
            className={cn(
              "h-3 w-3 text-[#E5B869] transition-transform",
              open ? "rotate-180" : ""
            )}
          />
        </button>
      ) : (
        /* Light Variant: Masthead, Modals, Drawers */
        <div className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-[#1E1418] border border-gray-200/90 dark:border-neutral-800 p-1 shadow-xs hover:shadow-sm transition-all select-none">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "rounded-full px-3 py-1 text-xs sm:text-[13px] font-bold transition-colors cursor-pointer flex items-center gap-1.5",
              open
                ? "bg-[#800020]/15 dark:bg-[#E5B869]/20 text-[#800020] dark:text-[#E5B869]"
                : "bg-gray-100/90 dark:bg-neutral-800 text-stone-800 dark:text-neutral-200 hover:bg-gray-200/70 dark:hover:bg-neutral-700"
            )}
            aria-expanded={open}
            aria-label="भाषा बदला / Change Language"
          >
            <Languages className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869] shrink-0" />
            <span className="font-marathi-heading font-bold">{current.nativeLabel}</span>
            <ChevronDown
              className={cn(
                "h-3 w-3 text-stone-500 transition-transform",
                open ? "rotate-180" : ""
              )}
            />
          </button>

          {showThemeToggle && onToggleTheme && (
            <ThemeToggleButton4
              isDark={isDarkMode}
              onToggle={onToggleTheme}
              className="size-7 p-1 text-gray-700 hover:text-gray-900 dark:text-amber-300 hover:bg-gray-100 dark:hover:bg-neutral-800 border border-transparent"
            />
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING DROPDOWN MENU
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: direction === "up" ? -6 : 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === "up" ? -4 : 4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute w-52 sm:w-56 rounded-2xl p-2.5 shadow-2xl z-[9999] select-none",
              align === "left" ? "left-0" : "right-0",
              direction === "up" ? "bottom-full mb-2" : "top-full mt-2",
              variant === "nav"
                ? "bg-[#1E1418] text-white border border-[#332228] shadow-black/80"
                : "bg-white dark:bg-[#1E1418] text-stone-900 dark:text-white border border-gray-200 dark:border-[#332228] shadow-black/20"
            )}
          >
            <div className="px-2 pt-1 pb-2 border-b border-white/10 dark:border-[#332228] mb-1">
              <span className="text-[10px] font-bold text-stone-400 dark:text-stone-400 tracking-wider uppercase block font-marathi-heading">
                भाषा निवडा / Select Language
              </span>
            </div>

            <div className="space-y-1">
              {LANGS.map((lang) => {
                const isSelected = active === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => selectLanguage(lang)}
                    className={cn(
                      "w-full rounded-xl px-3 py-2 text-left text-sm transition-all flex items-center justify-between cursor-pointer",
                      variant === "nav"
                        ? isSelected
                          ? "bg-[#800020] text-white font-bold"
                          : "text-stone-300 hover:bg-white/10 hover:text-white font-medium"
                        : isSelected
                          ? "bg-[#800020]/10 dark:bg-[#800020]/30 text-[#800020] dark:text-[#E5B869] font-bold"
                          : "text-stone-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-marathi-heading font-semibold text-sm">{lang.nativeLabel}</span>
                      <span className="text-xs text-stone-400 dark:text-stone-500 font-normal">({lang.label})</span>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-[#E5B869] stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Convenient alias
export const LanguageSwitcher = GoogleTranslateWidget;
export const LanguageDropdown = GoogleTranslateWidget;
