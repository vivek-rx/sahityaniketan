"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Video,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";
import { getCarouselSlides } from "@/lib/actions/carousel";
import { OptimizedVideoPlayer } from "@/components/ui/optimized-video-player";

interface CarouselSlide {
  id: string;
  type: "photo" | "video";
  title: string;
  titleMarathi: string;
  titleHindi?: string;
  subtitle: string;
  subtitleMarathi: string;
  subtitleHindi?: string;
  date: string;
  dateEn?: string;
  location: string;
  locationEn?: string;
  image: string;
  youtubeId?: string;
  tagMarathi: string;
  tagHindi: string;
  tagEn: string;
  tagBg: string;
  buttonText?: string;
  buttonLink?: string;
}

function extractYoutubeId(url: string) {
  if (!url) return undefined;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
}

export function HeroCarousel() {
  const { language } = useLanguage();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicSlides() {
      try {
        const dbSlides = await getCarouselSlides(true);
        if (dbSlides && dbSlides.length > 0) {
          const mapped: CarouselSlide[] = dbSlides.map((s: any, idx: number) => {
            const isVideo = !!(s.button_link?.includes("youtube") || s.button_link?.includes("vimeo") || s.image_url?.includes("youtube") || s.image_url?.includes("youtu.be"));
            const ytId = extractYoutubeId(s.button_link || s.image_url || "");

            // Filter out random unsplash placeholders
            let slideImageUrl = s.image_url;
            if (!slideImageUrl || slideImageUrl.includes("unsplash") || slideImageUrl.includes("/events/")) {
              slideImageUrl = idx % 2 === 0 ? "/images/real/library_signboard.png" : "/images/real/library_cupboards.png";
            }
            if (s.image_url && extractYoutubeId(s.image_url)) {
              slideImageUrl = `https://img.youtube.com/vi/${extractYoutubeId(s.image_url)}/hqdefault.jpg`;
            }

            return {
              id: s.id || `db-slide-${idx}`,
              type: (isVideo || ytId) ? "video" : "photo",
              title: s.title,
              titleMarathi: s.title,
              subtitle: s.subtitle || "",
              subtitleMarathi: s.subtitle || "",
              date: "साहित्य निकेतन ग्रंथालय",
              location: "अंबाजोगाई",
              image: slideImageUrl,
              youtubeId: ytId || (isVideo ? "vB39xHj_Rmg" : undefined),
              tagMarathi: s.button_text || (isVideo ? "माहितीपट" : "विशेष सोहळा"),
              tagHindi: s.button_text || (isVideo ? "वृत्तचित्र" : "विशेष आयोजन"),
              tagEn: s.button_text || (isVideo ? "Documentary" : "Special Event"),
              tagBg: idx % 2 === 0 ? "bg-[#800020]" : "bg-[#BF4B1A]",
              buttonText: s.button_text,
              buttonLink: s.button_link || "/events",
            };
          });
          setSlides(mapped);
        } else {
          setSlides([]);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic carousel slides:", err);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicSlides();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 35,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Omit carousel if no real slides exist in database
  if (loading || slides.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-transparent py-5 sm:py-7 font-marathi-body transition-colors">
      <div className="section">
        {/* Untitled UI Style Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading">
              {language === "mr"
                ? "साहित्य निकेतन वार्ता व उपक्रम"
                : language === "hi"
                  ? "साहित्य निकेतन समाचार व उपक्रम"
                  : "Library News & Cultural Initiatives"}
            </h2>
          </div>

          {/* Untitled UI Navigation Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              href="/events"
              className="text-xs font-bold text-[#C0392B] dark:text-[#E8B830] hover:underline flex items-center gap-1 mr-2 transition-colors font-marathi-body"
            >
              <span>
                {language === "mr"
                  ? "सर्व उपक्रम"
                  : language === "hi"
                    ? "सभी कार्यक्रम"
                    : "View All"}
              </span>
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={scrollNext}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Untitled UI Carousel Card Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex transform-gpu will-change-transform">
              {slides.map((slide, idx) => {
                const tagText = language === "mr" ? slide.tagMarathi : language === "hi" ? slide.tagHindi || slide.tagMarathi : slide.tagEn || slide.tagMarathi;
                const titleText = language === "mr" ? slide.titleMarathi : language === "hi" ? slide.titleHindi || slide.titleMarathi : slide.title;
                const subtitleText = language === "mr" ? slide.subtitleMarathi : language === "hi" ? slide.subtitleHindi || slide.subtitleMarathi : slide.subtitle;
                const dateText = language === "en" ? slide.dateEn || slide.date : slide.date;
                const locationText = language === "en" ? slide.locationEn || slide.location : slide.location;

                return (
                  <div
                    key={slide.id}
                    className="flex-[0_0_100%] min-w-0 relative min-h-[300px] sm:min-h-[380px] md:min-h-[420px] aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.4/1]"
                  >
                    <Image
                      src={slide.image}
                      alt={titleText}
                      fill
                      sizes="100vw"
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover object-center transform-gpu will-change-transform transition-transform duration-700"
                    />

                    {/* Clean Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                    {/* Slide Content Box */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white z-10">
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: selectedIndex === idx ? 1 : 0, y: selectedIndex === idx ? 0 : 15 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-full bg-[#C0392B] px-3 py-0.5 text-[11px] font-bold text-white font-marathi-body shadow-xs"
                          >
                            {tagText}
                          </span>

                          <span className="flex items-center gap-1 text-[11px] text-gray-200 font-marathi-body bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10">
                            <Calendar className="h-3 w-3 text-[#E8B830]" />
                            <span>{dateText}</span>
                          </span>

                          <span className="flex items-center gap-1 text-[11px] text-gray-200 font-marathi-body bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10 hidden md:flex">
                            <MapPin className="h-3 w-3 text-[#FF8A80]" />
                            <span>{locationText}</span>
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight font-marathi-heading drop-shadow-md">
                          {titleText}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed font-marathi-body">
                          {subtitleText}
                        </p>
                      </motion.div>

                      {/* Untitled UI Style Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: selectedIndex === idx ? 1 : 0, scale: selectedIndex === idx ? 1 : 0.95 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="shrink-0 flex items-center gap-2.5"
                      >
                        {slide.type === "video" ? (
                          <button
                            onClick={() =>
                              setActiveVideoUrl(
                                `https://www.youtube.com/embed/${slide.youtubeId || "D-ktRXhUL30"}?autoplay=1`
                              )
                            }
                            className="flex items-center gap-2 rounded-lg bg-[#C0392B] hover:bg-[#A93226] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer font-marathi-body"
                          >
                            <Play className="h-3.5 w-3.5 fill-white" />
                            <span>
                              {language === "mr"
                                ? "माहितीपट पाहा"
                                : language === "hi"
                                  ? "वृत्तचित्र देखें"
                                  : "Watch Feature"}
                            </span>
                          </button>
                        ) : (
                          <Link
                            href={slide.buttonLink || "/events"}
                            className="flex items-center gap-2 rounded-lg bg-[#C0392B] hover:bg-[#A93226] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer font-marathi-body"
                          >
                            <BookOpen className="h-3.5 w-3.5 text-[#FFD9CC]" />
                            <span>
                              {slide.buttonText || (language === "mr"
                                ? "सविस्तर माहिती"
                                : language === "hi"
                                  ? "विस्तृत जानकारी"
                                  : "Read Story")}
                            </span>
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Untitled UI Progress Indicators (Centered at bottom) */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === idx
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
            <span className="text-[10px] font-mono text-white/80 ml-1.5 pl-1.5 border-l border-white/20">
              0{selectedIndex + 1} / 0{scrollSnaps.length || 4}
            </span>
          </div>
        </div>
      </div>

      {/* YouTube / Adaptive Video Modal Player */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
            <div className="relative aspect-video w-full">
              <OptimizedVideoPlayer
                videoUrl={activeVideoUrl}
                thumbnailUrl="/images/real/library_cupboards.png"
                title={language === "mr" ? "साहित्य निकेतन माहितीपट" : language === "hi" ? "साहित्य निकेतन वृत्तचित्र" : "Sahitya Niketan Documentary"}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
