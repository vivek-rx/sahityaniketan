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
import { useLanguage } from "@/context/language-context";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Trilingual string bundle: [marathi, hindi, english] */
type L3 = [string, string, string];

interface SearchItem {
  id: string;
  title: L3;
  subtitle: L3;
  category: "books" | "manuscripts" | "authors" | "newspapers" | "articles";
  badge: L3;
  shelf?: L3;
  year?: L3;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SEARCH_DATABASE: SearchItem[] = [
  // Manuscripts & Heritage
  {
    id: "m1",
    title: [
      "विवेकसिंधू (अंबाजोगाई हस्तलिखित प्रत)",
      "विवेकसिंधू (अंबाजोगाई हस्तलिखित प्रत)",
      "Vivekasindhu (Ambajogai Manuscript Copy)",
    ],
    subtitle: [
      "आद्यकवि मुकुंदराज — मराठी भाषेतील आद्य तत्त्वज्ञान ग्रंथ",
      "आद्यकवि मुकुंदराज — मराठी भाषा का आद्य दार्शनिक ग्रंथ",
      "Aadyakavi Mukundraj — the first philosophical classic of the Marathi language",
    ],
    category: "manuscripts",
    badge: ["आद्यग्रंथ ११८८", "आद्यग्रंथ ११८८", "First Classic · 1188"],
    shelf: ["कप्पा क्र. १ / दुर्मीळ कपाट", "शैल्फ क्र. १ / दुर्लभ कपाट", "Shelf 1 / Rare Case"],
    year: ["शके ११८८", "शक ११८८", "Shaka 1188"],
    href: "/catalogue?category=manuscripts",
    icon: Scroll,
  },
  {
    id: "m2",
    title: [
      "सचित्र पसोडी (४० फूट कापडी हस्तलिखित)",
      "सचित्र पसोडी (४० फीट कापड़ हस्तलिखित)",
      "Illustrated Pasodi (40-foot Cloth Manuscript)",
    ],
    subtitle: [
      "संत दासोपंत — जगातील अद्वितीय कापडी वाङ्मयीन चमत्कार",
      "संत दासोपंत — विश्व का अद्वितीय कापड़ वाङ्मय चमत्कार",
      "Sant Dasopant — the world's unique cloth-scripture marvel",
    ],
    category: "manuscripts",
    badge: ["कापडी हस्तलिखित", "कापड़ हस्तलिखित", "Cloth Manuscript"],
    shelf: ["विशेष संदर्भ दालन", "विशेष संदर्भ विभाग", "Special Reference Wing"],
    year: ["१६ वे शतक", "१६वीं शताब्दी", "16th Century"],
    href: "/catalogue?category=manuscripts",
    icon: Scroll,
  },
  {
    id: "m3",
    title: [
      "पेशवेकालीन व शिवकालीन मोडी आज्ञापत्रे",
      "पेशवा कालीन एवं शिवकालीन मोडी आज्ञापत्र",
      "Modi Order Scrolls (Peshwa & Shivaji Era)",
    ],
    subtitle: [
      "मराठवाडा मुक्तीसंग्राम व ऐतिहासिक अस्सल सनदा",
      "मराठवाडा मुक्ति संग्राम एवं ऐतिहासिक असली सनदें",
      "Marathwada liberation-struggle records and authentic historical deeds",
    ],
    category: "manuscripts",
    badge: ["मोडी दस्तऐवज", "मोडी दस्तावेज़", "Modi Documents"],
    shelf: ["कप्पा क्र. ३ / मोडी विभाग", "शैल्फ क्र. ३ / मोडी विभाग", "Shelf 3 / Modi Section"],
    year: ["१७५०—१८५०", "१७५०—१८५०", "1750–1850"],
    href: "/catalogue?category=manuscripts",
    icon: FileText,
  },

  // Books
  {
    id: "b1",
    title: ["स्वामी", "स्वामी", "Swami"],
    subtitle: [
      "रणजित देसाई — थोरले माधवराव पेशवे यांच्या जीवनावरील ऐतिहासिक कादंबरी",
      "रणजित देसाई — थोरले माधवराव पेशवे के जीवन पर ऐतिहासिक उपन्यास",
      "Ranjit Desai — the historical novel on the life of Madhavrao Peshwa I",
    ],
    category: "books",
    badge: ["अभिजात कादंबरी", "अभिजात उपन्यास", "Classic Novel"],
    shelf: ["कप्पा क्र. ६ / रॅक २", "शैल्फ क्र. ६ / रैक २", "Shelf 6 / Rack 2"],
    year: ["१९६२", "१९६२", "1962"],
    href: "/catalogue?query=स्वामी",
    icon: BookOpen,
  },
  {
    id: "b2",
    title: ["पानिपत", "पानिपत", "Panipat"],
    subtitle: [
      "विश्वास पाटील — १७६१ च्या पानिपत युद्धाची चित्तथरारक ऐतिहासिक गाथा",
      "विश्वास पाटील — १७६१ के पानिपत युद्ध की रोमांचक ऐतिहासिक गाथा",
      "Vishwas Patil — a gripping historical saga of the 1761 Battle of Panipat",
    ],
    category: "books",
    badge: ["इतिहास संदर्भ", "इतिहास संदर्भ", "Historical Reference"],
    shelf: ["कप्पा क्र. ६ / रॅक ४", "शैल्फ क्र. ६ / रैक ४", "Shelf 6 / Rack 4"],
    year: ["१९८८", "१९८८", "1988"],
    href: "/catalogue?query=पानिपत",
    icon: BookOpen,
  },
  {
    id: "b3",
    title: ["ययाति", "ययाति", "Yayati"],
    subtitle: [
      "वि. स. खांडेकर — ज्ञानपीठ पुरस्कार प्राप्त मराठीतील पहिली कादंबरी",
      "वि. स. खांडेकर — ज्ञानपीठ पुरस्कार प्राप्त मराठी की पहली उपन्यास",
      "V. S. Khandekar — the first Marathi novel to win the Jnanpith Award",
    ],
    category: "books",
    badge: ["ज्ञानपीठ विजेती", "ज्ञानपीठ विजेता", "Jnanpith Winner"],
    shelf: ["कप्पा क्र. ५ / रॅक १", "शैल्फ क्र. ५ / रैक १", "Shelf 5 / Rack 1"],
    year: ["१९५९", "१९५९", "1959"],
    href: "/catalogue?query=ययाति",
    icon: BookOpen,
  },
  {
    id: "b4",
    title: ["छावा", "छावा", "Chhava"],
    subtitle: [
      "शिवाजी सावंत — छत्रपती संभाजी महाराज यांच्या बलिदानाची तेजस्वी चरित्रात्मक कादंबरी",
      "शिवाजी सावंत — छत्रपति संभाजी महाराज के बलिदान की तेजस्वी चरित्रात्मक उपन्यास",
      "Shivaji Sawant — the blazing biographical novel of Chhatrapati Sambhaji Maharaj",
    ],
    category: "books",
    badge: ["ऐतिहासिक चरित्र", "ऐतिहासिक चरित्र", "Historical Biography"],
    shelf: ["कप्पा क्र. ६ / रॅक ५", "शैल्फ क्र. ६ / रैक ५", "Shelf 6 / Rack 5"],
    year: ["१९७९", "१९७९", "1979"],
    href: "/catalogue?query=छावा",
    icon: BookOpen,
  },
  {
    id: "b5",
    title: ["१८५७ चे स्वातंत्र्यसमर", "१८५७ का स्वतंत्रता संग्राम", "1857: The First War of Independence"],
    subtitle: [
      "स्वातंत्र्यवीर विनायक दामोदर सावरकर — भारताचा पहिला स्वातंत्र्यलढा",
      "स्वातंत्र्यवीर विनायक दामोदर सावरकर — भारत का पहला स्वतंत्रता संग्राम",
      "Swatantryaveer Vinayak Damodar Savarkar — India's first war of independence",
    ],
    category: "books",
    badge: ["दुर्मिळ प्रत", "दुर्लभ प्रति", "Rare Edition"],
    shelf: ["कप्पा क्र. ४ / रॅक २", "शैल्फ क्र. ४ / रैक २", "Shelf 4 / Rack 2"],
    year: ["१९०९", "१९०९", "1909"],
    href: "/catalogue?query=सावरकर",
    icon: BookOpen,
  },
  {
    id: "b6",
    title: [
      "महाराष्ट्राचा समग्र इतिहास व भूगोल",
      "महाराष्ट्र का समग्र इतिहास एवं भूगोल",
      "Comprehensive History & Geography of Maharashtra",
    ],
    subtitle: [
      "डॉ. सदानंद मोरे / प्रा. खतीब — स्पर्धा परीक्षा व अभ्यासिका संदर्भ",
      "डॉ. सदानंद मोरे / प्रा. खतीब — प्रतियोगी परीक्षा एवं अध्ययन संदर्भ",
      "Dr. Sadanand More / Prof. Khatib — competitive-exam and study-hall reference",
    ],
    category: "books",
    badge: ["MPSC संदर्भ", "MPSC संदर्भ", "MPSC Reference"],
    shelf: ["कप्पा क्र. १२ / रॅक ३", "शैल्फ क्र. १२ / रैक ३", "Shelf 12 / Rack 3"],
    year: ["२०२४", "२०२४", "2024"],
    href: "/catalogue?category=competitive",
    icon: BookOpen,
  },

  // Authors
  {
    id: "a1",
    title: ["आद्यकवि मुकुंदराज", "आद्यकवि मुकुंदराज", "Aadyakavi Mukundraj"],
    subtitle: [
      "मराठीतील आद्यग्रंथकार (विवेकसिंधू), अंबाजोगाई भूमी",
      "मराठी के आद्यग्रंथकार (विवेकसिंधू), अंबाजोगाई भूमि",
      "Author of the first Marathi classic (Vivekasindhu), from Ambajogai",
    ],
    category: "authors",
    badge: ["आद्यकवि", "आद्यकवि", "First Poet"],
    href: "/catalogue?filter=authors&author=मुकुंदराज",
    icon: PenTool,
  },
  {
    id: "a2",
    title: ["संत दासोपंत", "संत दासोपंत", "Sant Dasopant"],
    subtitle: [
      "पसोडीकार, गीतार्णव व अथांग आध्यात्मिक वाङ्मयकार (अंबाजोगाई)",
      "पसोडीकार, गीतार्णव एवं अथांग आध्यात्मिक वाङ्मयकार (अंबाजोगाई)",
      "Author of Pasodi, Gitarnav and vast mystical verse (Ambajogai)",
    ],
    category: "authors",
    badge: ["संतकवी", "संतकवि", "Saint Poet"],
    href: "/catalogue?filter=authors&author=दासोपंत",
    icon: PenTool,
  },
  {
    id: "a3",
    title: ["विश्वास पाटील", "विश्वास पाटील", "Vishwas Patil"],
    subtitle: [
      "पानिपत, संभाजी, महानायक, झाडाझडती कादंबरीकार",
      "पानिपत, संभाजी, महानायक, झाडाझडती उपन्यासकार",
      "Novelist of Panipat, Sambhaji, Mahanayak and Jhadajhadati",
    ],
    category: "authors",
    badge: ["कादंबरीकार", "उपन्यासकार", "Novelist"],
    href: "/catalogue?filter=authors&author=विश्वास+पाटील",
    icon: PenTool,
  },
  {
    id: "a4",
    title: ["पु. ल. देशपांडे", "पु. ल. देशपांडे", "P. L. Deshpande"],
    subtitle: [
      "व्यक्ती आणि वल्ली, बटाट्याची चाळ, अपूर्वाई, ती फुलराणी",
      "व्यक्ती आणि वल्ली, बटाट्याची चाळ, अपूर्वाई, ती फुलराणी",
      "Vyakti ani Valli, Batatyachi Chal, Apurvai, Ti Phulrani",
    ],
    category: "authors",
    badge: ["महाराष्ट्रभूषण", "महाराष्ट्रभूषण", "Maharashtra Bhushan"],
    href: "/catalogue?filter=authors&author=पु+ल+देशपांडे",
    icon: PenTool,
  },

  // Newspapers
  {
    id: "n1",
    title: ["लोकमत (मराठवाडा विशेष आवृत्ती)", "लोकमत (मराठवाडा विशेष संस्करण)", "Lokmat (Marathwada Edition)"],
    subtitle: [
      "दैनिक आगमन: सकाळी ६:४५, तळमजला वृत्तपत्र वाचक दालन",
      "दैनिक आगमन: सुबह ६:४५, भूतल वृत्तपत्र वाचन विभाग",
      "Daily arrival: 6:45 AM, ground-floor newspaper reading wing",
    ],
    category: "newspapers",
    badge: ["दैनिक वृत्तपत्र", "दैनिक समाचार पत्र", "Daily Newspaper"],
    shelf: ["वृत्तपत्र दालन", "समाचार पत्र विभाग", "Newspaper Wing"],
    href: "/#notice-board",
    icon: Newspaper,
  },
  {
    id: "n2",
    title: ["सकाळ (बीड - छत्रपती संभाजीनगर)", "सकाळ (बीड - छत्रपति संभाजीनगर)", "Sakal (Beed – Chh. Sambhajinagar)"],
    subtitle: [
      "दैनिक आगमन: सकाळी ७:००, अग्रलेख व स्थानिक घडामोडी",
      "दैनिक आगमन: सुबह ७:००, एडिटोरियल एवं स्थानीय गतिविधियाँ",
      "Daily arrival: 7:00 AM, editorials and local coverage",
    ],
    category: "newspapers",
    badge: ["दैनिक वृत्तपत्र", "दैनिक समाचार पत्र", "Daily Newspaper"],
    shelf: ["वृत्तपत्र दालन", "समाचार पत्र विभाग", "Newspaper Wing"],
    href: "/#notice-board",
    icon: Newspaper,
  },
  {
    id: "n3",
    title: ["लोकसत्ता (संपादकीय व चतुरंग)", "लोकसत्ता (संपादकीय एवं चतुरंग)", "Loksatta (Editorial & Chaturang)"],
    subtitle: [
      "दैनिक आगमन: सकाळी ७:१५, वैचारिक व साहित्यिक पुरवण्या",
      "दैनिक आगमन: सुबह ७:१५, वैचारिक एवं साहित्यिक परिशिष्ट",
      "Daily arrival: 7:15 AM, thought and literary supplements",
    ],
    category: "newspapers",
    badge: ["दैनिक वृत्तपत्र", "दैनिक समाचार पत्र", "Daily Newspaper"],
    shelf: ["वृत्तपत्र दालन", "समाचार पत्र विभाग", "Newspaper Wing"],
    href: "/#notice-board",
    icon: Newspaper,
  },
];

type FilterType = "all" | "books" | "manuscripts" | "authors" | "newspapers";

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const idx = language === "en" ? 2 : language === "hi" ? 1 : 0;
  const pick = (t: L3) => t[idx];
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

  // Filter items in real time. Matches against ALL three language variants of
  // each entry, so typing "swami" or "स्वामी" finds the same record in any UI
  // language.
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_DATABASE.filter((item) => {
      const matchesFilter = selectedFilter === "all" || item.category === selectedFilter;
      if (!matchesFilter) return false;
      if (!q) return true;
      const haystacks = [...item.title, ...item.subtitle, item.badge.join(" ")];
      if (item.shelf) haystacks.push(item.shelf.join(" "));
      if (item.year) haystacks.push(item.year.join(" "));
      return haystacks.some((h) => h.toLowerCase().includes(q));
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

  const FILTER_TABS: { id: FilterType; label: L3 }[] = [
    { id: "all", label: ["सर्व दालने", "सभी विभाग", "All Sections"] },
    { id: "books", label: ["पुस्तके", "पुस्तकें", "Books"] },
    { id: "manuscripts", label: ["हस्तलिखिते", "हस्तलिखित", "Manuscripts"] },
    { id: "authors", label: ["लेखक", "लेखक", "Authors"] },
    { id: "newspapers", label: ["वृत्तपत्रे", "समाचार पत्र", "Newspapers"] },
  ];

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
                placeholder={
                  language === "en"
                    ? "Search books, authors, manuscripts..."
                    : language === "hi"
                      ? "ग्रंथ, लेखक, हस्तलिखित खोजें..."
                      : "ग्रंथ, लेखक, हस्तलिखित शोधा..."
                }
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-normal"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={language === "en" ? "Clear search" : language === "hi" ? "खोज साफ़ करें" : "शोध मोकळा करा"}
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
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(tab.id);
                    setSelectedIndex(0);
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer relative whitespace-nowrap",
                    selectedFilter === tab.id
                      ? "text-white bg-white/15 border border-white/20 shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  {pick(tab.label)}
                </button>
              ))}
            </div>

            {/* Results List with Motion Shared-Layout Highlight */}
            <div className="max-h-[55vh] overflow-y-auto p-2 space-y-0.5">
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center text-zinc-400 space-y-2">
                  <Search className="h-8 w-8 mx-auto text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-200">
                    {language === "en"
                      ? `No direct match for '${query}'`
                      : language === "hi"
                        ? `'${query}' के लिए कोई सीधा संदर्भ नहीं मिला`
                        : `'${query}' साठी थेट संदर्भ सापडला नाही`}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {language === "en"
                      ? "Press Enter to search the online catalogue."
                      : language === "hi"
                        ? "ऑनलाइन ग्रंथ सूची में खोजने के लिए Enter दबाएँ."
                        : "ऑनलाइन ग्रंथसूचीत शोधण्यासाठी Enter दाबा."}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelect(`/catalogue?query=${encodeURIComponent(query.trim())}`)
                    }
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>
                      {language === "en"
                        ? "Search the full catalogue"
                        : language === "hi"
                          ? "संपूर्ण ग्रंथ सूची में खोजें"
                          : "संपूर्ण ग्रंथसूचीमध्ये शोधा"}
                    </span>
                  </button>
                </div>
              ) : (
                <LayoutGroup id="global-search-highlight-group">
                  {filteredResults.map((item, idx2) => {
                    const IconComp = item.icon;
                    const isSelected = selectedIndex === idx2;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        onMouseEnter={() => setSelectedIndex(idx2)}
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
                                {pick(item.title)}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 shrink-0">
                                {pick(item.badge)}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 truncate mt-0.5">
                              {pick(item.subtitle)}
                            </p>
                          </div>
                        </div>

                        {/* Right Metadata */}
                        <div className="relative z-10 flex items-center gap-2 shrink-0 text-right">
                          {item.shelf && (
                            <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                              {pick(item.shelf)}
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
                  <span className="ml-1 text-zinc-400 font-sans hidden sm:inline">
                    {language === "en" ? "to select" : language === "hi" ? "चुनने के लिए" : "निवडण्यासाठी"}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ↵
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans hidden sm:inline">
                    {language === "en" ? "to open" : language === "hi" ? "खोलने के लिए" : "उघडण्यासाठी"}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 rounded text-[10px]">
                    ESC
                  </kbd>
                  <span className="ml-1 text-zinc-400 font-sans hidden sm:inline">
                    {language === "en" ? "to close" : language === "hi" ? "बंद करने के लिए" : "बंद करण्यासाठी"}
                  </span>
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">
                {filteredResults.length}{" "}
                {language === "en" ? "results" : language === "hi" ? "परिणाम" : "संदर्भ"}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default GlobalSearchModal;
