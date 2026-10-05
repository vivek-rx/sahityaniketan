"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { LogoBrand } from "@/components/layout/logo-brand";
import { GoogleTranslateWidget } from "@/components/layout/google-translate-widget";
import { GlobalSearchModal } from "@/components/layout/global-search-modal";
import { NoiseBackground } from "@/components/ui/ambient-noise-background";
import { SiteStickyBanner } from "@/components/layout/site-sticky-banner";
import { ThemeToggleButton4 } from "@/components/ui/skiper-ui/skiper4";
import {
  Menu,
  Home,
  Search,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Info,
  History,
  Users,
  Milestone,
  Scroll,
  PenTool,
  Layers,
  Camera,
  Calendar,
  Award,
  FileText,
  Newspaper,
  BookMarked,
  Sparkles,
  UserCheck,
  Clock,
  Phone,
  MapPin,
  X,
  Landmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

interface NavDropdownItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface EditorialShowcase {
  image: string;
  badge: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
}

interface NavSection {
  title: string;
  items: NavDropdownItem[];
  showcase: EditorialShowcase;
}

function MegaMenuFlyout({
  section,
  isOpen,
  handleMouseEnter,
  handleMouseLeave,
  onClose,
}: {
  section: NavSection;
  isOpen: boolean;
  handleMouseEnter: (title: string) => void;
  handleMouseLeave: () => void;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }
      );
      const links = containerRef.current.querySelectorAll(".mega-menu-link");
      if (links.length > 0) {
        gsap.fromTo(
          links,
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.18, stagger: 0.025, ease: "power1.out", delay: 0.02 }
        );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 w-[600px] pt-1 z-50 pointer-events-auto"
      onMouseEnter={() => handleMouseEnter(section.title)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] border-t-2 border-t-[#800020] shadow-2xl overflow-hidden p-4 text-stone-900 dark:text-stone-100 grid grid-cols-12 gap-4">
        {/* LEFT COLUMN (7 Cols): Structured Navigation Links */}
        <div className="col-span-7 space-y-1">
          <span className="text-xs font-bold text-[#800020] dark:text-[#E5B869] uppercase tracking-wider block px-2 pb-1.5 font-marathi-heading">
            {section.title} — विभाग सूची
          </span>

          {section.items.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="mega-menu-link flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F3ECE3] dark:hover:bg-[#26161B] hover:text-[#800020] dark:hover:text-[#E5B869] transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-[#800020] dark:text-[#E5B869] group-hover:bg-[#800020] group-hover:text-white dark:group-hover:bg-[#E5B869] dark:group-hover:text-stone-950 transition-colors shrink-0 mt-0.5">
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] sm:text-[15px] font-bold font-marathi-heading leading-tight flex items-center justify-between">
                    <span>{item.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#800020] dark:text-[#E5B869]" />
                  </div>
                  <p className="text-[12px] text-stone-600 dark:text-stone-400 truncate mt-0.5 leading-normal">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* RIGHT COLUMN (5 Cols): Editorial Featured Showcase Card */}
        <div className="col-span-5 bg-[#FAF8F5] dark:bg-[#160E11] rounded-xl border border-[#E5DDD0] dark:border-[#332228] p-3.5 flex flex-col justify-between">
          <div>
            <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[#E5DDD0] dark:border-[#332228] mb-2.5">
              <Image
                src={section.showcase.image}
                alt={section.showcase.title}
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>

            <h4 className="font-marathi-heading font-extrabold text-[14px] sm:text-[14.5px] text-stone-900 dark:text-white leading-snug line-clamp-2">
              {section.showcase.title}
            </h4>
            <p className="text-[12px] text-stone-600 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
              {section.showcase.description}
            </p>
          </div>

          <Link
            href={section.showcase.href}
            onClick={onClose}
            className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-bold text-[#800020] dark:text-[#E5B869] hover:underline pt-2 border-t border-[#E5DDD0] dark:border-[#332228]"
          >
            <span>{section.showcase.ctaText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>("साहित्य निकेतन");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const compactBrandRef = useRef<HTMLAnchorElement>(null);
  const lastScrollY = useRef(0);
  const isNavHidden = useRef(false);

  // Performant Scroll Management: Reading Progress, Smooth Elevation & Smart Direction
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateScroll = (currentScrollY: number) => {
      // 1. Direct GPU-composited reading progress bar (zero JS tween allocation)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentScrollY / docHeight, 0), 1) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // 2. Scrolled state & compact brand reveal
      const scrolled = currentScrollY > 40;
      setIsScrolled((prev) => {
        if (prev !== scrolled) {
          if (compactBrandRef.current) {
            compactBrandRef.current.style.display = scrolled ? "inline-flex" : "none";
            compactBrandRef.current.style.opacity = scrolled ? "1" : "0";
            compactBrandRef.current.style.transform = scrolled ? "translateX(0) scale(1)" : "translateX(-12px) scale(0.95)";
          }
          return scrolled;
        }
        return prev;
      });

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // Global Keyboard Shortcut: ⌘K or Ctrl+K to open Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync theme with document class & localStorage on mount
  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isDark = savedTheme === "dark" || (typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
    setIsDarkMode(isDark);
  }, []);

  // Apply dark mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Don't show navbar on admin portal layout
  if (pathname?.startsWith("/admin")) return null;

  const isEn = language === "en";
  const isHi = language === "hi";

  // Curated Editorial Flyout Mega-Menus per user specification
  const navigationSections: NavSection[] = [
    {
      title: isEn ? "About" : isHi ? "साहित्य निकेतन" : "साहित्य निकेतन",
      items: [
        { 
          label: isEn ? "Introduction" : isHi ? "परिचय" : "परिचय", 
          href: "/about#intro", 
          icon: Info, 
          description: isEn ? "80 years of literary tradition and heritage" : isHi ? "८० वर्षों की ज्ञान परंपरा व कार्य" : "८० वर्षांची अखंड ज्ञानपरंपरा व कार्य" 
        },
        { 
          label: isEn ? "History (80 Yrs)" : isHi ? "इतिहास (८० वर्ष)" : "इतिहास (८० वर्षे)", 
          href: "/history", 
          icon: History, 
          description: isEn ? "Aug 1, 1945 — Amrit Mahotsav heritage saga" : isHi ? "१ अगस्त १९४५ — अमृत महोत्सव गौरवगाथा" : "१ ऑगस्ट १९४५ — अमृत महोत्सवी गौरवगाथा" 
        },
        { 
          label: isEn ? "Our Journey" : isHi ? "हमारी यात्रा" : "आमची वाटचाल", 
          href: "/history#timeline", 
          icon: Milestone, 
          description: isEn ? "Golden & Amrit jubilee milestones" : isHi ? "स्वर्ण व अमृत महोत्सव चरण" : "सुवर्ण व अमृत महोत्सवी टप्पे" 
        },
      ],
      showcase: {
        image: "/images/real/library_inauguration_plaque.png",
        badge: isEn ? "Founded 1 Aug 1945" : isHi ? "स्थापना १ अगस्त १९४५" : "स्थापना १ ऑगस्ट १९४५",
        title: isEn ? "Struggle Against Nizam Rule & Foundation" : isHi ? "निजामशाही के विरुद्ध संघर्ष और साहित्य निकेतन की स्थापना" : "निजामशाहीविरुद्धचा लढा आणि साहित्य निकेतनची स्थापना",
        description: isEn ? "Ignited by underground freedom fighters in Hyderabad Liberation Movement on Tilak Punyatithi." : isHi ? "हैदराबाद मुक्तिसंग्राम के राष्ट्रभक्तों द्वारा प्रज्वलित ज्ञानदीप." : "हैद्राबाद मुक्तिसंग्रामातील भूमिगत राष्ट्रभक्तांनी लोकमान्य टिळक पुण्यतिथीला लावलेले ज्ञानदीप.",
        href: "/history",
        ctaText: isEn ? "Explore History Gallery" : isHi ? "विशेष इतिहास दालन देखें" : "विशेष इतिहास दालन पहा",
      },
    },
    {
      title: isEn ? "Committee" : isHi ? "कार्यकारिणी" : "कार्यकारिणी",
      items: [
        { 
          label: isEn ? "Board of Trustees" : isHi ? "विश्वस्त मंडल" : "विश्वस्त मंडळ", 
          href: "/trustees", 
          icon: Users, 
          description: isEn ? "Respected trustees & governing council" : isHi ? "संस्था के आदरणीय ट्रस्टी व नीति समिति" : "संस्थेचे आदरणीय विश्वस्त व धोरण समिती" 
        },
        { 
          label: isEn ? "Office Bearers" : isHi ? "विद्यमान पदाधिकारी" : "विद्यमान पदाधिकारी", 
          href: "/about#team", 
          icon: Award, 
          description: isEn ? "President, Vice President, Secretary & Directors" : isHi ? "अध्यक्ष, उपाध्यक्ष, सचिव व निदेशक" : "अध्यक्ष, उपाध्यक्ष, कार्यवाह व संचालक" 
        },
        { 
          label: isEn ? "Staff & Librarians" : isHi ? "ग्रंथपाल व कर्मचारी" : "ग्रंथपाल व कर्मचारी", 
          href: "/about#team", 
          icon: BookOpen, 
          description: isEn ? "Section managers & reference assistants" : isHi ? "पुस्तकालय प्रबंधक व संदर्भ सहायक" : "दालन व्यवस्थापक व संदर्भ साहाय्यक" 
        },
        { 
          label: isEn ? "Founding Trustees & Luminaries" : isHi ? "पहिले विश्वस्त व संस्थापक" : "पहिले विश्वस्त व संस्थापक", 
          href: "/trustees", 
          icon: History, 
          description: isEn ? "1962 founding board & 1945 visionary pioneers" : isHi ? "१९६२ के प्रथम ट्रस्टी व १९४५ के संस्थापक" : "१९६२ चे पहिले विश्वस्त मंडळ व १९४५ चे संस्थापक" 
        },
      ],
      showcase: {
        image: "/images/real/library_signboard.png",
        badge: isEn ? "Democratic Governance" : isHi ? "लोकतांत्रिक प्रबंधन" : "लोकशाही व्यवस्थापन",
        title: isEn ? "Sahitya Niketan Board & Trustees" : isHi ? "साहित्य निकेतन नियामक व विश्वस्त मंडल" : "साहित्य निकेतन नियामक व विश्वस्त मंडळ",
        description: isEn ? "80 years of selfless knowledge service and transparent democratic administration." : isHi ? "८० वर्षों की निष्कलंक ज्ञानसेवा और पारदर्शी प्रशासन." : "८० वर्षांची निष्कलंक ज्ञानसेवा आणि लोकशाही मूल्यांवर आधारित पारदर्शी ग्रंथालय प्रशासन.",
        href: "/about#team",
        ctaText: isEn ? "Meet the Committee" : isHi ? "कार्यकारिणी परिचय देखें" : "कार्यकारिणी परिचय पहा",
      },
    },
    {
      title: isEn ? "Catalogue" : isHi ? "ग्रंथसंपदा" : "ग्रंथसंपदा",
      items: [
        { 
          label: isEn ? "Book Collection" : isHi ? "पुस्तक संग्रह" : "पुस्तक संग्रह", 
          href: "/catalogue", 
          icon: BookOpen, 
          description: isEn ? "39,953+ printed volume repository" : isHi ? "३९,९५३+ मुद्रित पुस्तकों का समृद्ध संग्रह" : "३९,९५३+ मुद्रित ग्रंथांचे समृद्ध दालन" 
        },
        { 
          label: isEn ? "Rare Manuscripts" : isHi ? "दुर्लभ ग्रंथ" : "दुर्मिळ ग्रंथ", 
          href: "/catalogue?category=manuscripts", 
          icon: Scroll, 
          description: isEn ? "Mukundraj, Dasopant & ancient pothis" : isHi ? "मुकुंदराज, दासोपंत व प्राचीन पोथियां" : "मुकुंदराज, दासोपंत व प्राचीन पोथ्या" 
        },
        { 
          label: isEn ? "Authors" : isHi ? "लेखक" : "लेखक", 
          href: "/catalogue?filter=authors", 
          icon: PenTool, 
          description: isEn ? "Classical, saint-poets & modern writers" : isHi ? "संतकवि, अभिजात व आधुनिक साहित्यकार" : "अभिजात, संतकवी व आधुनिक साहित्यिक" 
        },
        { 
          label: isEn ? "By Genre" : isHi ? "विषयानुसार" : "विषयानुसार", 
          href: "/catalogue?filter=genre", 
          icon: Layers, 
          description: isEn ? "History, novels, competitive exams & children" : isHi ? "इतिहास, उपन्यास, प्रतियोगी परीक्षा व बालविभाग" : "इतिहास, कादंबरी, स्पर्धापरीक्षा व बालविभाग" 
        },
      ],
      showcase: {
        image: "/images/real/library_vintage_books.png",
        badge: isEn ? "1188 CE Archive" : isHi ? "शके ११८८ संदर्भ" : "शके ११८८ संदर्भ",
        title: isEn ? "Adikavi Mukundraj — 'Vivekasindhu'" : isHi ? "आद्यकवि मुकुंदराज — 'विवेकसिंधु'" : "आद्यकवि मुकुंदराज — 'विवेकसिंधू'",
        description: isEn ? "Authentic historical references and preserved original manuscript in Compartment No. 1." : isHi ? "मराठी भाषा के आद्यग्रंथ का मूल ऐतिहासिक संदर्भ व हस्तलिखित कप्पा क्र. १ में संरक्षित." : "मराठी भाषेतील आद्यग्रंथाचे अस्सल ऐतिहासिक संदर्भ व हस्तलिखित कप्पा क्र. १ मध्ये जतन.",
        href: "/catalogue?category=manuscripts",
        ctaText: isEn ? "View Manuscript Archives" : isHi ? "हस्तलिखित संदर्भ देखें" : "हस्तलिखित संदर्भ पहा",
      },
    },
    {
      title: isEn ? "Heritage" : isHi ? "स्मृतियां" : "स्मृती",
      items: [
        { 
          label: isEn ? "Ambajogai Memories" : isHi ? "अंबाजोगाई की स्मृतियां" : "अंबाजोगाईच्या स्मृती", 
          href: "/ambajogai-smruti", 
          icon: Landmark, 
          description: isEn ? "Vintage photos, heritage buildings & movements" : isHi ? "पुराने छायाचित्र, धरोहर व आंदोलन" : "जुनी छायाचित्रे, वास्तू, साहित्यिक व चळवळी" 
        },
        { 
          label: isEn ? "Photo Archives" : isHi ? "चित्र दीर्घा" : "छायाचित्र संग्रह", 
          href: "/gallery", 
          icon: Camera, 
          description: isEn ? "Historic structures, vintage shelves & moments" : isHi ? "ऐतिहासिक धरोहर, पुरानी अलमारियां व क्षणचित्र" : "ऐतिहासिक वास्तू, जुनी कपाटे व क्षणचित्रे" 
        },
        { 
          label: isEn ? "Events & Programs" : isHi ? "कार्यक्रम" : "कार्यक्रम", 
          href: "/events", 
          icon: Calendar, 
          description: isEn ? "Book processions, lectures & reading circles" : isHi ? "ग्रंथडिंडी, व्याख्यान व वाचन कट्टा" : "ग्रंथदिंडी, व्याख्याने व वाचन कट्टा" 
        },
        { 
          label: isEn ? "Dignitaries" : isHi ? "मान्यवर" : "मान्यवर", 
          href: "/gallery?filter=dignitaries", 
          icon: Award, 
          description: isEn ? "Jnanpith laureates and literary visitors" : isHi ? "ज्ञानपीठ विजेता व साहित्यिक यात्राएं" : "ज्ञानपीठ विजेते व साहित्यिक भेटी" 
        },
        { 
          label: isEn ? "Historical Documents" : isHi ? "ऐतिहासिक दस्तावेज" : "ऐतिहासिक दस्तऐवज", 
          href: "/catalogue?category=manuscripts", 
          icon: FileText, 
          description: isEn ? "Charters, Modi script letters & decrees" : isHi ? "सनदें, मोडी पत्र व पुराने परिपत्र" : "सनदा, मोडी पत्रे व जुनी परिपत्रके" 
        },
      ],
      showcase: {
        image: "/images/real/library_signboard.png",
        badge: isEn ? "Heritage Festival" : isHi ? "धरोहर उत्सव" : "वारसा सोहळा",
        title: isEn ? "Marathi Language Day & Grand Book Dindi" : isHi ? "मराठी भाषा गौरव दिन व भव्य ग्रंथडिंडी" : "मराठी भाषा गौरव दिन व भव्य ग्रंथदिंडी",
        description: isEn ? "Historic palanquin procession of rare books through the streets of Ambajogai." : isHi ? "अंबाजोगाई की सड़कों पर पालकी में ऐतिहासिक ग्रंथों की भव्य यात्रा." : "अंबाजोगाईच्या रस्त्यांवरून पालखीतून निघालेली ऐतिहासिक ग्रंथांची मिरवणूक व वाचक मेळावा.",
        href: "/events",
        ctaText: isEn ? "View Event Photos" : isHi ? "कार्यक्रम छायाचित्र देखें" : "कार्यक्रम छायाचित्रे पहा",
      },
    },
    {
      title: isEn ? "Reading" : isHi ? "वाचन" : "वाचन",
      items: [
        { 
          label: isEn ? "Articles & Reviews" : isHi ? "लेख व समीक्षा" : "लेख", 
          href: "/stories?category=blog", 
          icon: FileText, 
          description: isEn ? "Literary essays & book reviews" : isHi ? "साहित्यिक विचार व पुस्तक समीक्षा" : "साहित्यिक विचार व ग्रंथ परीक्षण" 
        },
        { 
          label: isEn ? "News & Updates" : isHi ? "समाचार" : "बातम्या", 
          href: "/stories?category=news", 
          icon: Newspaper, 
          description: isEn ? "Library notifications & circulars" : isHi ? "पुस्तकालय समाचार व परिपत्र" : "ग्रंथालय घडामोडी व परिपत्रके" 
        },
        { 
          label: isEn ? "Stories & Memoirs" : isHi ? "कथा व संस्मरण" : "कथा / आठवणी", 
          href: "/stories?category=stories", 
          icon: Sparkles, 
          description: isEn ? "Reader memories and reflections" : isHi ? "पाठकों की स्मृतियां व अनुभव" : "वाचकांच्या आठवणी व अनुभव" 
        },
        { 
          label: isEn ? "Publications" : isHi ? "पुस्तकालय प्रकाशन" : "ग्रंथालयाचे प्रकाशन", 
          href: "/stories?category=publication", 
          icon: BookMarked, 
          description: isEn ? "Annual reports, journals & souvenirs" : isHi ? "वार्षिक प्रतिवेदन व स्मारिकाएं" : "वार्षिक अहवाल, नियतकालिके व स्मरणिका" 
        },
      ],
      showcase: {
        image: "/images/real/library_window.png",
        badge: isEn ? "Editorial Reflection" : isHi ? "संपादकीय चिंतन" : "संपादकीय चिंतन",
        title: isEn ? "Ambajogai's Scholarly Journey: Mukundraj to Digital Study Hall" : isHi ? "अंबाजोगाई की ज्ञानपरंपरा: मुकुंदराज से आधुनिक अभ्यासिका" : "अंबाजोगाईची ज्ञानपरंपरा: मुकुंदराज ते आधुनिक अभ्यासिका",
        description: isEn ? "From the cradle of ancient Marathi literature to today's air-conditioned competitive exam study complex." : isHi ? "प्राचीन मराठी साहित्य के उद्गम से आज की आधुनिक अभ्यासिका तक की यात्रा." : "प्राचीन मराठी भाषेचे उगमस्थान ते आजची वातानुकूलित अभ्यासिका या प्रवासाचा सखोल वेध.",
        href: "/stories",
        ctaText: isEn ? "Start Reading" : isHi ? "वाचन प्रारंभ करें" : "वाचन सुरू करा",
      },
    },
    {
      title: isEn ? "Visit Us" : isHi ? "भेंट दें" : "भेट द्या",
      items: [
        { 
          label: isEn ? "Membership" : isHi ? "सदस्यता" : "सभासदत्व", 
          href: "/membership", 
          icon: UserCheck, 
          description: isEn ? "Life, annual & study hall registration" : isHi ? "आजीवन, वार्षिक व अभ्यासिका पंजीकरण" : "आजीवन, वार्षिक व अभ्यासिका नोंदणी" 
        },
        { 
          label: isEn ? "Timings" : isHi ? "समय" : "वेळ", 
          href: "/contact#timings", 
          icon: Clock, 
          description: isEn ? "Open daily 8:00 AM – 8:30 PM" : isHi ? "प्रातः ८:०० से रात्रि ८:३० तक" : "सकाळी ८:०० ते रात्री ८:३० अखंड" 
        },
        { 
          label: isEn ? "Contact" : isHi ? "संपर्क" : "संपर्क", 
          href: "/contact", 
          icon: Phone, 
          description: isEn ? "Office, phone, email & assistance" : isHi ? "कार्यालय, फोन, ईमेल व सहायता" : "कार्यालय, फोन, ईमेल व साहाय्यता" 
        },
        { 
          label: isEn ? "Location" : isHi ? "स्थान" : "स्थान", 
          href: "/contact#location", 
          icon: MapPin, 
          description: isEn ? "Shukrawar Peth, Ambajogai" : isHi ? "शुक्रवार पेठ, अंबाजोगाई (जि. बीड)" : "शुक्रवार पेठ, अंबाजोगाई (जि. बीड)" 
        },
      ],
      showcase: {
        image: "/images/real/library_cupboards.png",
        badge: isEn ? "Direct Visit" : isHi ? "सीधे भेंट" : "थेट भेट",
        title: isEn ? "Sahitya Niketan Central Reading Complex" : isHi ? "साहित्य निकेतन मुख्य वाचन संकुल" : "साहित्य निकेतन मुख्य वाचन संकुल",
        description: isEn ? "Central library premises in Shukrawar Peth. Reading room open daily 8:00 AM to 8:30 PM." : isHi ? "शुक्रवार पेठ स्थित मुख्य वाचनालय। अध्ययन कक्ष प्रतिदिन प्रातः ८.०० से रात्रि ८.३० तक खुला।" : "शुक्रवार पेठेतील मुख्य वास्तू. वाचन कक्ष दररोज सकाळी ८.०० ते रात्री ८.३० या वेळेत खुला.",
        href: "/contact#location",
        ctaText: isEn ? "Map & Directions" : isHi ? "मानचित्र व दिशा-निर्देश" : "नकाशा व दिशादर्शन",
      },
    },
  ];

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <>
      <header className="w-full font-marathi-body relative z-50 transition-colors">
        {/* Site-wide Top Daily Announcement Banner */}
        <SiteStickyBanner />
        
        {/* ---------------------------------------------------
          1. Grand Heritage Masthead (Resting State: Visible when scrolled up)
         --------------------------------------------------- */}
        <div className="relative z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-3 sm:py-4">
          <div className="section relative z-50">
            {/* Mobile Top Row: Heritage stamp & Membership CTA */}
            <div className="flex sm:hidden items-center justify-between w-full pb-2 mb-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 font-marathi-body">
                स्थापना: १ ऑगस्ट १९४५ | वर्ग &apos;अ&apos;
              </span>

              <Link
                href="/membership"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#800020] hover:bg-[#66001A] text-white text-[12px] font-bold shadow-xs active:scale-95 transition-all border border-[#800020]"
              >
                <UserCheck className="h-3.5 w-3.5 text-[#E5B869]" />
                <span>{language === "en" ? "Join Library" : language === "hi" ? "सदस्यता" : "सभासद व्हा"}</span>
              </Link>
            </div>

            {/* Desktop & Tablet Masthead Row: Pure Centered Branding with Single CTA */}
            <div className="flex items-center justify-between gap-4">
              {/* Left spacer to keep logo perfectly centered */}
              <div className="hidden sm:block w-40 xl:w-44 shrink-0" />

              {/* Center: Grand Centered Heritage Logo */}
              <div className="flex-1 flex justify-center text-center py-1 sm:py-2">
                <LogoBrand colorScheme="light" align="center" size="2xl" />
              </div>

              {/* Right: Clean Membership CTA (Single source of language switcher is in the nav bar below) */}
              <div className="hidden sm:flex items-center justify-end gap-2.5 w-40 xl:w-44 shrink-0">
                <NoiseBackground
                  containerClassName="w-fit p-[1.5px] rounded-full mx-auto"
                  gradientColors={[
                    "rgb(128, 0, 32)",
                    "rgb(205, 155, 75)",
                    "rgb(90, 12, 22)",
                  ]}
                  noiseIntensity={0.06}
                  speed={0.03}
                >
                  <Link
                    href="/membership"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#800020] hover:bg-[#66001A] text-white text-[13.5px] font-bold shadow-xs hover:shadow-md transition-all whitespace-nowrap border border-[#E5B869]/40 active:scale-95 cursor-pointer"
                    title="सभासद व्हा / नोंदणी"
                  >
                    <UserCheck className="h-4 w-4 text-[#E5B869]" />
                    <span>{language === "en" ? "Join Library" : language === "hi" ? "सदस्यता लें" : "सभासद व्हा"}</span>
                  </Link>
                </NoiseBackground>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-full bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 ml-1 cursor-pointer"
                  aria-label="मेनू उघडा"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------
          2. Regal Navigation Bar (Sticky with GSAP-powered scroll dynamics)
         --------------------------------------------------- */}
        <nav
          ref={navRef}
          style={{
            backgroundColor: isScrolled
              ? (isDarkMode ? "#120B0D" : "#6B0F1A")
              : (isDarkMode ? "#1A0A0E" : "#800020"),
          }}
          className={cn(
            "sticky top-0 z-40 text-white transition-[background-color,border-color,box-shadow,padding] duration-300 will-change-transform",
            isScrolled
              ? "bg-[#6b0f1a] dark:bg-[#120b0d] border-b border-[#e5b869]/40 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]"
              : "bg-[#800020] dark:bg-[#1a0a0e] border-b border-[#b8860b]/40 shadow-xs"
          )}
        >
          {/* GSAP-driven Scroll Reading Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black/25 overflow-hidden pointer-events-none z-50">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-[#E5B869] via-[#FFF2CC] to-[#E5B869] shadow-[0_0_10px_rgba(229,184,105,0.9)] origin-left scale-x-0 will-change-transform"
            />
          </div>

          <div className="section">
            
            {/* -------------------------------------------------
                A. MOBILE VIEW (Rock-solid, zero layout shift)
               ------------------------------------------------- */}
            <div className="flex lg:hidden items-center justify-between gap-2 w-full py-2.5">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white border border-white/10 active:scale-95 transition-all select-none shrink-0"
                aria-label="मुखपृष्ठ"
              >
                <Home className="h-4 w-4 text-[#E5B869]" />
                <span className="text-xs font-bold font-marathi-heading">
                  {language === "en" ? "Home" : language === "hi" ? "मुख्यपृष्ठ" : "मुखपृष्ठ"}
                </span>
              </Link>

              <div className="flex items-center gap-1.5">
                <GoogleTranslateWidget
                  variant="compact"
                  direction="down"
                  showThemeToggle={false}
                />

                <ThemeToggleButton4
                  isDark={isDarkMode}
                  onToggle={() => setIsDarkMode(!isDarkMode)}
                  className="size-8 p-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-[#E5B869] border border-white/10"
                />

                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg bg-black/20 hover:bg-black/30 text-[#E5B869] border border-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label={language === "en" ? "Search" : language === "hi" ? "खोजें" : "शोध उघडा"}
                  title="ग्रंथ शोध"
                >
                  <Search className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg bg-black/20 hover:bg-black/30 text-white border border-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label="मेनू उघडा"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* -------------------------------------------------
                B. DESKTOP VIEW (Mega-Menus, Omnibox, OPAC)
               ------------------------------------------------- */}
            <div className="hidden lg:flex items-center justify-between gap-4 w-full">
              
              {/* Main Navigation Links with Editorial Mega-Menus */}
              <div className="flex items-center gap-1">
                
                {/* Compact Brand Badge (Revealed via GSAP on Scroll) */}
                <Link
                  href="/"
                  ref={compactBrandRef}
                  className="hidden items-center gap-2 pr-3.5 mr-1 border-r border-[#E5B869]/30 hover:opacity-90 transition-opacity select-none shrink-0"
                  style={{ opacity: 0, transform: "translateX(-12px) scale(0.95)" }}
                  aria-label="साहित्य निकेतन मुखपृष्ठ"
                >
                  <Image
                    src="/images/logo.png"
                    alt="Sahitya Niketan Logo"
                    width={26}
                    height={26}
                    className="h-6 w-6 object-contain shrink-0 drop-shadow-xs"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-marathi-heading font-black text-[14.5px] text-[#FAF2E8] tracking-wide whitespace-nowrap">
                      साहित्य निकेतन
                    </span>
                    <span className="text-[9.5px] font-semibold text-[#E5B869] tracking-wider uppercase">
                      स्था. १९४५
                    </span>
                  </div>
                </Link>

                {/* 1. मुखपृष्ठ */}
                <Link
                  href="/"
                  className={cn(
                    "px-3 xl:px-4 py-3.5 text-[14.5px] xl:text-[15.5px] font-bold font-marathi-heading tracking-wide transition-all flex items-center gap-1.5 relative whitespace-nowrap",
                    pathname === "/"
                      ? "text-[#E5B869] bg-black/20 border-b-2 border-[#E5B869]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span>{language === "en" ? "Home" : language === "hi" ? "मुख्यपृष्ठ" : "मुखपृष्ठ"}</span>
                </Link>

                {/* Dropdown Sections with Curated Editorial Flyout */}
                {navigationSections.map((section) => {
                  const isOpen = activeDropdown === section.title;

                  return (
                    <div
                      key={section.title}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(section.title)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(isOpen ? null : section.title)}
                        className={cn(
                          "px-3 xl:px-4 py-3.5 text-[14.5px] xl:text-[15.5px] font-bold font-marathi-heading tracking-wide transition-all flex items-center gap-1.5 cursor-pointer relative whitespace-nowrap",
                          isOpen
                            ? "bg-black/20 text-[#E5B869] border-b-2 border-[#E5B869]"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <span>{section.title}</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 opacity-90", isOpen && "rotate-180 text-[#E5B869]")} />
                      </button>

                      {/* Editorial Flyout Mega-Menu Container with GSAP transitions */}
                      <MegaMenuFlyout
                        section={section}
                        isOpen={isOpen}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        onClose={() => setActiveDropdown(null)}
                      />
                    </div>
                  );
                })}

              </div>

              {/* Right: Language Switcher + Clean minimal Search Icon */}
              <div className="flex items-center gap-2 pl-2">
                <GoogleTranslateWidget
                  variant="nav"
                  isDarkMode={isDarkMode}
                  onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                  direction="down"
                  showThemeToggle={true}
                />

                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg text-white/80 hover:text-[#E5B869] hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={language === "en" ? "Search" : language === "hi" ? "खोजें" : "ग्रंथालय शोध"}
                  title={language === "en" ? "Search (⌘K)" : language === "hi" ? "खोजें (⌘K)" : "ग्रंथालय शोध (⌘K)"}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>
        </nav>
      </header>

      {/* ---------------------------------------------------
        3. Mobile Drawer Navigation (Matching Exact Taxonomy)
       --------------------------------------------------- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden font-marathi-body">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="fixed inset-y-0 right-0 w-[300px] sm:w-[340px] bg-[#FAF8F5] dark:bg-[#1E1418] shadow-2xl border-l border-[#E5DDD0] dark:border-[#332228] flex flex-col z-10 animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-4 bg-[#800020] text-white flex items-center justify-between border-b border-[#B8860B]/40">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="साहित्य निकेतन ग्रंथालय"
                  width={42}
                  height={42}
                  className="h-10 w-10 object-contain shrink-0 rounded-full drop-shadow-sm"
                />
                <div>
                  <h3 className="font-gajraj text-base font-bold leading-tight">साहित्य निकेतन ग्रंथालय</h3>
                  <p className="text-[11px] text-[#E5B869] mt-0.5">शुक्रवार पेठ, अंबाजोगाई (स्था. १९४५)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md text-white/80 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Search inside Drawer */}
            <div className="p-3 border-b border-[#E5DDD0] dark:border-[#332228] bg-[#F3ECE3]/60 dark:bg-[#120B0D]/50">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] text-sm font-semibold text-stone-700 dark:text-stone-200 shadow-2xs cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                  <span>ग्रंथ व लेखक शोधा...</span>
                </div>
                <span className="text-xs font-mono text-stone-400">⌘K</span>
              </button>
            </div>

            {/* Language & Theme Selection inside Drawer */}
            <div className="px-3.5 py-2.5 border-b border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 font-marathi-heading">
                भाषा व देखावा / Language
              </span>
              <GoogleTranslateWidget
                variant="light"
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                direction="down"
              />
            </div>

            {/* Quick Action Shortcuts inside Drawer */}
            <div className="grid grid-cols-4 gap-1.5 px-3 py-2.5 border-b border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#160E11] text-center">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] flex flex-col items-center gap-1 font-bold text-stone-800 dark:text-stone-200 hover:border-[#800020] transition-colors"
              >
                <Home className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                <span className="text-[11px] font-marathi-heading">होम</span>
              </Link>
              <Link
                href="/catalogue"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] flex flex-col items-center gap-1 font-bold text-stone-800 dark:text-stone-200 hover:border-[#800020] transition-colors"
              >
                <BookOpen className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                <span className="text-[11px] font-marathi-heading">ग्रंथसूची</span>
              </Link>
              <Link
                href="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] flex flex-col items-center gap-1 font-bold text-stone-800 dark:text-stone-200 hover:border-[#800020] transition-colors"
              >
                <Camera className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
                <span className="text-[11px] font-marathi-heading">चित्रे</span>
              </Link>
              <Link
                href="/membership"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[#800020] text-white flex flex-col items-center gap-1 font-bold shadow-xs hover:bg-[#66001A] transition-colors"
              >
                <UserCheck className="h-4 w-4 text-[#E5B869]" />
                <span className="text-[11px] font-marathi-heading">सभासद</span>
              </Link>
            </div>

            {/* Accordion Menu List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              
              {/* मुखपृष्ठ */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-[#F3ECE3] dark:hover:bg-[#26161B] font-bold text-base font-marathi-heading"
              >
                <span>मुखपृष्ठ</span>
              </Link>

              {/* 5 Categories Accordion */}
              {navigationSections.map((section) => {
                const isOpen = openMobileAccordion === section.title;

                return (
                  <div key={section.title} className="rounded-lg border border-[#E5DDD0] dark:border-[#332228] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenMobileAccordion(isOpen ? null : section.title)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#FAF8F5] dark:bg-[#160E11] text-stone-900 dark:text-stone-100 font-bold text-[15px] font-marathi-heading cursor-pointer"
                    >
                      <span>{section.title}</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180 text-[#800020] dark:text-[#E5B869]")} />
                    </button>

                    {isOpen && (
                      <div className="p-1 space-y-0.5 bg-white dark:bg-[#1E1418]">
                        {section.items.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-stone-700 dark:text-stone-300 hover:bg-[#F3ECE3] dark:hover:bg-[#26161B] hover:text-[#800020] dark:hover:text-[#E5B869] font-medium text-sm"
                            >
                              <IconComponent className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-[#E5DDD0] dark:border-[#332228] bg-[#F3ECE3]/80 dark:bg-[#120B0D] flex items-center justify-between text-xs text-stone-500">
              <span>शुक्रवार पेठ, अंबाजोगाई (जि. बीड)</span>
              <Link href="/membership" onClick={() => setIsMobileMenuOpen(false)} className="text-[#800020] dark:text-[#E5B869] font-bold text-sm">
                सभासद व्हा
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* ---------------------------------------------------
        4. Omnibox "Spotlight" Search Modal
       --------------------------------------------------- */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
