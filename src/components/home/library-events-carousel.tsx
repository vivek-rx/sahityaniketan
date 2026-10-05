"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, Calendar } from "lucide-react";
import { LIBRARY_EVENTS, type LibraryEvent } from "@/lib/data/library-events";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";
import { useLanguage } from "@/context/language-context";
import { ClipDiv } from "@/components/ui/skiper-ui/skiper66";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41";

export function LibraryEventsCarousel() {
  const router = useRouter();
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = LIBRARY_EVENTS.length;
  const currentEvent: LibraryEvent = LIBRARY_EVENTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Automatic slide rotation every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const navigateToGallery = (eventId: string) => {
    router.push(`/gallery?event=${eventId}`);
  };

  return (
    <section
      id="bannerCarousel"
      aria-label="ग्रंथालय कार्यक्रम व उपक्रम दालन"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors"
    >
      {/* Subtle Progressive Edge Blurs */}
      <ProgressiveBlur position="top" height="48px" blurAmount="4px" className="opacity-30" />
      <ProgressiveBlur position="bottom" height="48px" blurAmount="4px" className="opacity-30" />

      <div className="relative max-w-[1480px] mx-auto px-3.5 sm:px-6 lg:px-10 py-6 sm:py-10 min-h-[380px] flex flex-col justify-between">
        {/* Main 2-Column Content Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1"
          >

            {/* Left Column: Event Information in Natural Marathi */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              {/* Quiet Editorial Category & Date (No eyebrow pill badge) */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-marathi-body text-[#6B0F1A] dark:text-[#C5A059]">
                <span className="font-bold">{currentEvent.category}</span>
                <span className="text-[#4A4440] dark:text-[#D5C0AE] font-medium">— {currentEvent.date}</span>
              </div>

              {/* Event Title */}
              <h2
                onClick={() => navigateToGallery(currentEvent.id)}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-[#FAF2E8] leading-tight font-marathi-heading hover:text-[#800020] dark:hover:text-[#E5B869] transition-colors cursor-pointer"
              >
                {currentEvent.title}
              </h2>

              {/* Event Description */}
              <p className="text-sm sm:text-base text-stone-700 dark:text-[#D5C2B4] leading-relaxed font-marathi-body line-clamp-4">
                {currentEvent.description}
              </p>

              {/* Action: Click to load all photos of the event in gallery */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/gallery?event=${currentEvent.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#800020] hover:bg-[#66001A] text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <Camera className="h-4 w-4 text-[#E5B869]" />
                  <span>
                    {language === "en"
                      ? `View Photos (${currentEvent.photos.length})`
                      : language === "hi"
                      ? `छायाचित्र देखें (${currentEvent.photos.length})`
                      : `या कार्यक्रमाची छायाचित्रे पहा (${currentEvent.photos.length})`}
                  </span>
                </Link>

                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all shadow-2xs"
                >
                  <span>
                    {language === "en" ? "All Event Galleries" : language === "hi" ? "सभी कार्यक्रम गैलरी" : "सर्व कार्यक्रम गॅलरी"}
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Event Photograph with ClipDiv Custom Mask */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <Link
                href={`/gallery?event=${currentEvent.id}`}
                className="w-full max-w-lg cursor-pointer block group"
                title={`${currentEvent.title} — छायाचित्रे पहा`}
              >
                <ClipDiv
                  imgSrc={currentEvent.coverImage}
                  alt={currentEvent.title}
                  className="aspect-[4/3] w-full rounded-2xl shadow-md group-hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center justify-between text-white text-xs font-bold w-full">
                    <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      <Camera className="h-3.5 w-3.5 text-[#E5B869]" />
                      <span>{currentEvent.photos.length} छायाचित्रे</span>
                    </span>
                    <span className="text-[#E5B869] group-hover:underline flex items-center gap-1">
                      <span>गॅलरी उघडा</span>
                    </span>
                  </div>
                </ClipDiv>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Bottom Controls & Indicators Matching Nagar Vachanalay */}
        <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="मागील कार्यक्रम"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 hover:bg-zinc-100 shadow-2xs transition-all cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Bar / Dash Indicators */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {LIBRARY_EVENTS.map((event, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`कार्यक्रम क्रमांक ${index + 1}: ${event.title}`}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 sm:w-10 bg-[#800020] dark:bg-[#E5B869]"
                      : "w-3 sm:w-4 bg-[#800020]/25 dark:bg-[#E5B869]/30 hover:bg-[#800020]/50"
                  }`}
                />
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="पुढील कार्यक्रम"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] text-stone-700 dark:text-stone-300 hover:text-[#800020] dark:hover:text-[#E5B869] hover:border-[#800020] shadow-2xs transition-all cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
