"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, X, CornerDownLeft, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommandPaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  onSelect?: () => void;
  href?: string;
}

export interface CommandPaletteCategory {
  id: string;
  label: string;
}

interface CommandPaletteContextType {
  query: string;
  setQuery: (q: string) => void;
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
  onClose: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | null>(null);

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  items: CommandPaletteItem[];
  categories?: CommandPaletteCategory[];
  onSelect?: (item: CommandPaletteItem) => void;
  emptyText?: string;
  footerNote?: string;
  className?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  placeholder = "Type a command or search...",
  items,
  categories = [],
  onSelect,
  emptyText = "No results found.",
  footerNote = "Command Palette",
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || !item.category || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    });
  }, [items, query, selectedCategory]);

  // Reset & focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCategory("all");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
          const item = filteredItems[selectedIndex];
          if (item.onSelect) item.onSelect();
          if (onSelect) onSelect(item);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, onSelect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-4">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={cn(
              "relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-[0_24px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white z-50",
              className
            )}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 bg-transparent">
              <Search className="h-5 w-5 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-normal"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 rounded-md">
                ESC
              </kbd>
            </div>

            {/* Category Filter Pills (if provided) */}
            {categories.length > 0 && (
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-transparent overflow-x-auto no-scrollbar text-xs">
                {categories.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(tab.id);
                      setSelectedIndex(0);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer relative",
                      selectedCategory === tab.id
                        ? "text-white bg-white/15 border border-white/20 shadow-xs"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Results List with Motion Shared-Layout Highlight */}
            <div className="max-h-[55vh] overflow-y-auto p-2 space-y-0.5">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 space-y-2">
                  <Search className="h-8 w-8 mx-auto text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-300">{emptyText}</p>
                </div>
              ) : (
                <LayoutGroup id="command-palette-group">
                  {filteredItems.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    const IconComp = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.onSelect) item.onSelect();
                          if (onSelect) onSelect(item);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className="relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer group transition-colors"
                      >
                        {/* Motion Shared-Layout Selection Highlight */}
                        {isSelected && (
                          <motion.div
                            layoutId="command-highlight"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl pointer-events-none"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}

                        <div className="relative z-10 flex items-center gap-3 min-w-0 pr-3">
                          {IconComp && (
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white transition-colors">
                              <IconComp className="h-4 w-4" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-white truncate">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <p className="text-xs text-zinc-400 truncate mt-0.5">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 shrink-0">
                          {item.shortcut && (
                            <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                              {item.shortcut}
                            </span>
                          )}
                          <CornerDownLeft className="h-3.5 w-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    );
                  })}
                </LayoutGroup>
              )}
            </div>

            {/* Transparent Footer Legend */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ↓
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans">Navigate</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ↵
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans">Select</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ESC
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans">Close</span>
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">{footerNote}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
