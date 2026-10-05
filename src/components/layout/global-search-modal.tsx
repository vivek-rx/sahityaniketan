"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  X,
  BookOpen,
  Scroll,
  PenTool,
  Newspaper,
  ChevronRight,
  FileText,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "books" | "manuscripts" | "authors" | "newspapers" | "articles";
  badge: string;
  shelf?: string;
  year?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SEARCH_DATABASE: SearchItem[] = [
  // Manuscripts & Heritage
  {
    id: "m1",
    title: "विवेकसिंधू (अंबाजोगाई हस्तलिखित प्रत)",
    subtitle: "आद्यकवि मुकुंदराज — मराठी भाषेतील आद्य तत्त्वज्ञान ग्रंथ",
    category: "manuscripts",
    badge: "आद्यग्रंथ ११८८",
    shelf: "कप्पा क्र. १ / दुर्मीळ कपाट",
    year: "शके ११८८",
    href: "/catalogue?category=manuscripts",
    icon: Scroll,
  },
  {
    id: "m2",
    title: "सचित्र पसोडी (४० फूट कापडी हस्तलिखित)",
    subtitle: "संत दासोपंत — जगातील अद्वितीय कापडी वाङ्मयीन चमत्कार",
    category: "manuscripts",
    badge: "कापडी हस्तलिखित",
    shelf: "विशेष संदर्भ दालन",
    year: "१६ वे शतक",
    href: "/catalogue?category=manuscripts",
    icon: Scroll,
  },
  {
    id: "m3",
    title: "पेशवेकालीन व शिवकालीन मोडी आज्ञापत्रे",
    subtitle: "मराठवाडा मुक्तीसंग्राम व ऐतिहासिक अस्सल सनदा",
    category: "manuscripts",
    badge: "मोडी दस्तऐवज",
    shelf: "कप्पा क्र. ३ / मोडी विभाग",
    year: "१७५०—१८५०",
    href: "/catalogue?category=manuscripts",
    icon: FileText,
  },

  // Books
  {
    id: "b1",
    title: "स्वामी",
    subtitle: "रणजित देसाई — थोरले माधवराव पेशवे यांच्या जीवनावरील ऐतिहासिक कादंबरी",
    category: "books",
    badge: "अभिजात कादंबरी",
    shelf: "कप्पा क्र. ६ / रॅक २",
    year: "१९६२",
    href: "/catalogue?query=स्वामी",
    icon: BookOpen,
  },
  {
    id: "b2",
    title: "पानिपत",
    subtitle: "विश्वास पाटील — १७६१ च्या पानिपत युद्धाची चित्तथरारक ऐतिहासिक गाथा",
    category: "books",
    badge: "इतिहास संदर्भ",
    shelf: "कप्पा क्र. ६ / रॅक ४",
    year: "१९८८",
    href: "/catalogue?query=पानिपत",
    icon: BookOpen,
  },
  {
    id: "b3",
    title: "ययाति",
    subtitle: "वि. स. खांडेकर — ज्ञानपीठ पुरस्कार प्राप्त मराठीतील पहिली कादंबरी",
    category: "books",
    badge: "ज्ञानपीठ विजेती",
    shelf: "कप्पा क्र. ५ / रॅक १",
    year: "१९५९",
    href: "/catalogue?query=ययाति",
    icon: BookOpen,
  },
  {
    id: "b4",
    title: "छावा",
    subtitle: "शिवाजी सावंत — छत्रपती संभाजी महाराज यांच्या बलिदानाची तेजस्वी चरित्रात्मक कादंबरी",
    category: "books",
    badge: "ऐतिहासिक चरित्र",
    shelf: "कप्पा क्र. ६ / रॅक ५",
    year: "१९७९",
    href: "/catalogue?query=छावा",
    icon: BookOpen,
  },
  {
    id: "b5",
    title: "१८५७ चे स्वातंत्र्यसमर",
    subtitle: "स्वातंत्र्यवीर विनायक दामोदर सावरकर — भारताचा पहिला स्वातंत्र्यलढा",
    category: "books",
    badge: "दुर्मिळ प्रत",
    shelf: "कप्पा क्र. ४ / रॅक २",
    year: "१९०९",
    href: "/catalogue?query=सावरकर",
    icon: BookOpen,
  },
  {
    id: "b6",
    title: "महाराष्ट्राचा समग्र इतिहास व भूगोल",
    subtitle: "डॉ. सदानंद मोरे / प्रा. खतीब — स्पर्धा परीक्षा व अभ्यासिका संदर्भ",
    category: "books",
    badge: "MPSC संदर्भ",
    shelf: "कप्पा क्र. १२ / रॅक ३",
    year: "२०२४",
    href: "/catalogue?category=competitive",
    icon: BookOpen,
  },

  // Authors
  {
    id: "a1",
    title: "आद्यकवि मुकुंदराज",
    subtitle: "मराठीतील आद्यग्रंथकार (विवेकसिंधू), अंबाजोगाई भूमी",
    category: "authors",
    badge: "आद्यकवि",
    href: "/catalogue?filter=authors&author=मुकुंदराज",
    icon: PenTool,
  },
  {
    id: "a2",
    title: "संत दासोपंत",
    subtitle: "पसोडीकार, गीतार्णव व अथांग आध्यात्मिक वाङ्मयकार (अंबाजोगाई)",
    category: "authors",
    badge: "संतकवी",
    href: "/catalogue?filter=authors&author=दासोपंत",
    icon: PenTool,
  },
  {
    id: "a3",
    title: "विश्वास पाटील",
    subtitle: "पानिपत, संभाजी, महानायक, झाडाझडती कादंबरीकार",
    category: "authors",
    badge: "कादंबरीकार",
    href: "/catalogue?filter=authors&author=विश्वास+पाटील",
    icon: PenTool,
  },
  {
    id: "a4",
    title: "पु. ल. देशपांडे",
    subtitle: "व्यक्ती आणि वल्ली, बटाट्याची चाळ, अपूर्वाई, ती फुलराणी",
    category: "authors",
    badge: "महाराष्ट्रभूषण",
    href: "/catalogue?filter=authors&author=पु+ल+देशपांडे",
    icon: PenTool,
  },

  // Newspapers
  {
    id: "n1",
    title: "लोकमत (मराठवाडा विशेष आवृत्ती)",
    subtitle: "दैनिक आगमन: सकाळी ६:४५, तळमजला वृत्तपत्र वाचक दालन",
    category: "newspapers",
    badge: "दैनिक वृत्तपत्र",
    shelf: "वृत्तपत्र दालन",
    href: "/#notice-board",
    icon: Newspaper,
  },
  {
    id: "n2",
    title: "सकाळ (बीड - छत्रपती संभाजीनगर)",
    subtitle: "दैनिक आगमन: सकाळी ७:००, अग्रलेख व स्थानिक घडामोडी",
    category: "newspapers",
    badge: "दैनिक वृत्तपत्र",
    shelf: "वृत्तपत्र दालन",
    href: "/#notice-board",
    icon: Newspaper,
  },
  {
    id: "n3",
    title: "लोकसत्ता (संपादकीय व चतुरंग)",
    subtitle: "दैनिक आगमन: सकाळी ७:१५, वैचारिक व साहित्यिक पुरवण्या",
    category: "newspapers",
    badge: "दैनिक वृत्तपत्र",
    shelf: "वृत्तपत्र दालन",
    href: "/#notice-board",
    icon: Newspaper,
  },
];

type FilterType = "all" | "books" | "manuscripts" | "authors" | "newspapers";

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setSelectedFilter("all");
    }
  }, [isOpen]);

  // Filter items in real time
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_DATABASE.filter((item) => {
      const matchesFilter = selectedFilter === "all" || item.category === selectedFilter;
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        (item.shelf && item.shelf.toLowerCase().includes(q))
      );
    });
  }, [query, selectedFilter]);

  // Handle Keyboard Navigation (ArrowUp, ArrowDown, Enter, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex].href);
        } else if (query.trim()) {
          handleSelect(`/catalogue?query=${encodeURIComponent(query.trim())}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, query, onClose]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 px-3 sm:px-4">
          {/* Transparent Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Exact Motion Command Palette Transparent Glass Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-[0_24px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white z-50"
          >
            {/* Top Omnibar Input */}
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
                placeholder="ग्रंथ, लेखक, हस्तलिखित शोधा..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-normal"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 rounded-md">
                ESC
              </kbd>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-transparent overflow-x-auto no-scrollbar text-xs">
              {[
                { id: "all", label: "सर्व दालने" },
                { id: "books", label: "पुस्तके" },
                { id: "manuscripts", label: "हस्तलिखिते" },
                { id: "authors", label: "लेखक" },
                { id: "newspapers", label: "वृत्तपत्रे" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(tab.id as FilterType);
                    setSelectedIndex(0);
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer relative",
                    selectedFilter === tab.id
                      ? "text-white bg-white/15 border border-white/20 shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Results List with Motion Shared-Layout Highlight */}
            <div className="max-h-[55vh] overflow-y-auto p-2 space-y-0.5">
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center text-zinc-400 space-y-2">
                  <Search className="h-8 w-8 mx-auto text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-200">
                    &apos;{query}&apos; साठी थेट संदर्भ सापडला नाही
                  </p>
                  <p className="text-xs text-zinc-500">
                    संपूर्ण ३९,९५३+ ग्रंथांच्या OPAC कॅटलॉगमध्ये शोधण्यासाठी Enter दाबा.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelect(`/catalogue?query=${encodeURIComponent(query.trim())}`)
                    }
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>संपूर्ण ग्रंथसूचीमध्ये शोधा</span>
                  </button>
                </div>
              ) : (
                <LayoutGroup id="global-search-highlight-group">
                  {filteredResults.map((item, idx) => {
                    const IconComp = item.icon;
                    const isSelected = selectedIndex === idx;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className="relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer group transition-colors"
                      >
                        {/* Shared-Layout Selection Highlight */}
                        {isSelected && (
                          <motion.div
                            layoutId="command-highlight"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl pointer-events-none"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}

                        <div className="relative z-10 flex items-center gap-3 min-w-0 pr-3">
                          <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white transition-colors">
                            <IconComp className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-white truncate">
                                {item.title}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 shrink-0">
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Right Metadata */}
                        <div className="relative z-10 flex items-center gap-2 shrink-0 text-right">
                          {item.shelf && (
                            <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                              {item.shelf}
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    );
                  })}
                </LayoutGroup>
              )}
            </div>

            {/* Footer Shortcut Legend (Transparent Frosted) */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ↓
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans hidden sm:inline">निवडण्यासाठी</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ↵
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans hidden sm:inline">उघडण्यासाठी</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ESC
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans hidden sm:inline">बंद करण्यासाठी</span>
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">
                {filteredResults.length} संदर्भ
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default GlobalSearchModal;
