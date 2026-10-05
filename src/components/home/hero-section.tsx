"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";
import { BobbingDots } from "@/components/ui/bobbing-dots";

export function HeroSection() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      image: "/images/real/library_vintage_books.png",
      alt: "साहित्य निकेतन ग्रंथालय — दुर्मीळ ग्रंथ व हस्तलिखित दालन",
      tag: language === "en" ? "Rare Manuscripts & Archives" : "दुर्मीळ हस्तलिखिते व ग्रंथसंग्रह",
      title: language === "en" ? "Centuries-Old Literary Archives" : "दुर्मीळ ग्रंथ व हस्तलिखित दालन",
      desc: language === "en" ? "Mukundraj's Vivekasindhu, Dasopant Pasodi and historic reference treasures" : "आद्यकवि मुकुंदराज विवेकसिंधू, संत दासोपंत पसोडी व शतवार्षिक ग्रंथांचे जतन",
    },
    {
      image: "/images/real/library_cupboards.png",
      alt: "साहित्य निकेतन ग्रंथालय — ऐतिहासिक सागवानी कपाटे व वाचन दालने",
      tag: language === "en" ? "Heritage Reference Stacks" : "ऐतिहासिक सागवानी ग्रंथकपाटे",
      title: language === "en" ? "Central Institutional Holdings" : "स्वातंत्र्यपूर्व काळातील मुद्रित दालने",
      desc: language === "en" ? "Teakwood cabinets housing over 39,953 classical books and documents" : "शुक्रवार पेठेतील मध्यवर्ती वास्तूत कार्यरत सार्वजनिक ग्रंथालय संग्रह",
    },
    {
      image: "/images/real/library_inauguration_plaque.png",
      alt: "साहित्य निकेतन ग्रंथालय — अधिकृत उद्घाटन शिलालेख १ ऑगस्ट १९४५",
      tag: language === "en" ? "Founding Inscription (1945)" : "संस्थापना शिलालेख (१९४५)",
      title: language === "en" ? "Inaugurated 1 August 1945" : "स्थापना १ ऑगस्ट १९४५ रोजी",
      desc: language === "en" ? "Founded amidst the historic Hyderabad liberation struggle movement" : "मराठवाडा मुक्ती संग्राम आणि भाषा संवर्धन चळवळीतील ऐतिहासिक वास्तू",
    },
    {
      image: "/images/real/library_window.png",
      alt: "साहित्य निकेतन ग्रंथालय — शांत व वातानुकूलित अभ्यासिका",
      tag: language === "en" ? "Study Wing & Reading Hall" : "शांत अभ्यासिका दालन",
      title: language === "en" ? "Dedicated Center for Higher Studies" : "स्पर्धा परीक्षा व उच्च संशोधन अभ्यासिका",
      desc: language === "en" ? "Air-conditioned study wing with modern amenities for rural aspirants" : "विद्यार्थी व संशोधकांसाठी २०० आसनक्षमतेची वातानुकूलित अभ्यासिका",
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, heroSlides.length]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      router.push(`/catalogue?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section className="relative bg-[#FAF8F5] dark:bg-[#120B0D] border-b border-[#E5DDD0] dark:border-[#332228] pt-6 pb-10 sm:pb-12 transition-colors font-marathi-body">


      <div className="section">
        {/* Main Grid: Left Story & Search, Right Authentic Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8">
          
          {/* Left Column (7 cols): Heading, Tagline, Search, Filters */}
          <div className="lg:col-span-7 space-y-3.5">
            <div>
              <h1 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-[#FAF2E8] leading-tight">
                साहित्य निकेतन{" "}
                <span className="text-[#800020] dark:text-[#E5B869]">
                  सार्वजनिक ग्रंथालय, अंबाजोगाई
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium mt-1.5 leading-relaxed">
                महाराष्ट्र शासन मान्यताप्राप्त वर्ग &apos;अ&apos; सार्वजनिक ग्रंथालय (स्थापना: १ ऑगस्ट १९४५). शुक्रवार पेठ, अंबाजोगाई, जिल्हा बीड.
              </p>
            </div>

            {/* High-Utility Institutional Search Bar */}
            <form onSubmit={handleHeroSearch} className="pt-1">
              <div className="relative flex items-center bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] rounded-2xl p-1 shadow-2xs focus-within:border-[#800020] dark:focus-within:border-[#E5B869] transition-all">
                <Search className="h-4 w-4 text-[#800020] dark:text-[#E5B869] shrink-0 ml-3 mr-2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ग्रंथाचे नाव, लेखक, विषय किंवा कपाट क्रमांक शोधा... (उदा. विवेकसिंधू, पानिपत)"
                  className="w-full bg-transparent py-2 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-85"
                >
                  {isSearching ? (
                    <BobbingDots size="sm" className="text-white" duration={0.8} />
                  ) : (
                    <Search className="h-3.5 w-3.5" />
                  )}
                  <span>{isSearching ? "शोधत आहे..." : "शोधा"}</span>
                </button>
              </div>
            </form>

            {/* Quick Catalog Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs">
              <span className="font-bold text-stone-700 dark:text-stone-300 text-[11px] mr-1">द्रुत दालने:</span>
              {[
                { label: "मराठी अभिजात", href: "/catalogue?category=marathi" },
                { label: "संतसाहित्य व मोडी", href: "/catalogue?category=bhakti" },
                { label: "मुकुंदराज विवेकसिंधू", href: "/catalogue?query=Mukundraj" },
                { label: "इतिहास व संशोधन", href: "/catalogue?category=history" },
                { label: "MPSC अभ्यासिका", href: "/catalogue?category=competitive" },
              ].map((filter) => (
                <Link
                  key={filter.label}
                  href={filter.href}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E1418] hover:bg-stone-50 dark:hover:bg-[#281A20] text-stone-700 dark:text-stone-300 text-[11px] font-semibold border border-[#E5DDD0] dark:border-[#332228] transition-colors"
                >
                  {filter.label}
                </Link>
              ))}
            </div>


          </div>

          {/* Right Column (5 cols): Archival Library Photo Carousel */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl border border-[#E5DDD0] dark:border-[#332228] shadow-2xs bg-stone-900 overflow-hidden relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroSlides[activeSlide].image}
                      alt={heroSlides[activeSlide].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Caption Bar with Direct Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-between p-4 text-white pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-black/75 text-[10px] font-mono tracking-wider font-semibold text-amber-200 border border-white/20">
                      {heroSlides[activeSlide].tag}
                    </span>

                    <span className="text-[10px] font-mono text-white/80 bg-black/50 px-2 py-0.5 rounded">
                      {activeSlide + 1} / {heroSlides.length}
                    </span>
                  </div>

                  <div className="pointer-events-auto">
                    <h3 className="font-marathi-heading text-sm sm:text-base font-bold text-white leading-tight">
                      {heroSlides[activeSlide].title}
                    </h3>
                    <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                      {heroSlides[activeSlide].desc}
                    </p>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/20">
                      <div className="flex items-center gap-1">
                        {heroSlides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSlide(idx)}
                            className={cn(
                              "h-1 rounded-full transition-all cursor-pointer",
                              activeSlide === idx ? "w-5 bg-amber-400" : "w-1.5 bg-white/40"
                            )}
                            aria-label={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                          className="h-6 w-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white border border-white/20 cursor-pointer"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                          className="h-6 w-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white border border-white/20 cursor-pointer"
                          aria-label="Next"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
