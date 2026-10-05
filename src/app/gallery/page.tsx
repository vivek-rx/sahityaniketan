"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Footer, Breadcrumbs } from "@/components/layout";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Layers,
  Images,
  ArrowRight
} from "lucide-react";
import { LIBRARY_EVENTS, type LibraryEvent } from "@/lib/data/library-events";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";
import { BobbingDots } from "@/components/ui/bobbing-dots";

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventParam = searchParams.get("event");

  const [activeModalEvent, setActiveModalEvent] = useState<LibraryEvent | null>(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);

  // Automatically open modal when navigated with ?event=...
  useEffect(() => {
    if (eventParam) {
      const found = LIBRARY_EVENTS.find((e) => e.id === eventParam || e.slug === eventParam);
      if (found) {
        setActiveModalEvent(found);
        setCurrentPhotoIdx(0);
      }
    }
  }, [eventParam]);

  const openGalleryModal = (event: LibraryEvent) => {
    setActiveModalEvent(event);
    setCurrentPhotoIdx(0);
  };

  const closeGalleryModal = () => {
    setActiveModalEvent(null);
    setCurrentPhotoIdx(0);
    // Remove query param without reload if present
    if (eventParam) {
      router.push("/gallery", { scroll: false });
    }
  };

  const nextPhoto = () => {
    if (!activeModalEvent || activeModalEvent.photos.length <= 1) return;
    setCurrentPhotoIdx((prev) => (prev + 1) % activeModalEvent.photos.length);
  };

  const prevPhoto = () => {
    if (!activeModalEvent || activeModalEvent.photos.length <= 1) return;
    setCurrentPhotoIdx((prev) => (prev - 1 + activeModalEvent.photos.length) % activeModalEvent.photos.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalEvent) return;
      if (e.key === "Escape") closeGalleryModal();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalEvent, currentPhotoIdx]);

  return (
    <>
      {/* ===================== PAGE HEADER BANNER ===================== */}
      <div className="relative py-12 md:py-16 text-center overflow-hidden border-b border-zinc-800 bg-zinc-950">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/real/marathi_books_display.png"
            alt="Marathi Literary Archives"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] scale-[1.02] opacity-85 dark:opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/60" />
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[140px] space-y-3">
          <div className="flex justify-center">
            <Breadcrumbs variant="glass" />
          </div>

          {/* Page Title */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-marathi-heading tracking-wide drop-shadow-sm">
            छायाचित्र दालन
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-marathi-body max-w-xl mx-auto">
            साहित्य निकेतन सार्वजनिक ग्रंथालयाचे वार्षिक व्याख्यानमाला, पुरस्कार सोहळे व वाचन उपक्रम.
          </p>
        </div>
      </div>

      {/* ===================== GALLERY SECTION ===================== */}
      {/* 3-Column Event Album Grid matching nagarvachanalay.org row g-4 event-card */}
      <section className="py-12 md:py-16 bg-[#FAF8F5] dark:bg-[#120B0D] transition-colors font-marathi-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {LIBRARY_EVENTS.map((event) => (
              <div
                key={event.id}
                onClick={() => openGalleryModal(event)}
                className="group h-full flex flex-col rounded-2xl bg-white dark:bg-[#1E1418] border border-[#D4A373]/40 dark:border-[#D4A373]/25 shadow-sm hover:shadow-xl hover:border-[#B8860B] dark:hover:border-[#E5B869] hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Fixed height image container: 280px (exact match to nagarvachanalay .img-container) */}
                <div className="relative h-[280px] w-full overflow-hidden bg-stone-900">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />

                  {/* Dark subtle gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-40 group-hover:opacity-60 transition-opacity" />

                  {/* Photo count pill */}
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/75 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#E5B869] border border-[#E5B869]/30 flex items-center gap-1.5 shadow-md">
                    <Images className="h-3.5 w-3.5" />
                    <span>{event.photos.length} छायाचित्रे</span>
                  </div>

                  {/* Category badge top left */}
                  <div className="absolute top-3 left-3 rounded-md bg-[#800020] text-white px-2.5 py-1 text-xs font-bold shadow-md">
                    {event.category}
                  </div>
                </div>

                {/* Card Body: Title, Date, Description */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-[#B8A699]">
                      <Calendar className="h-3.5 w-3.5 text-[#B8860B] dark:text-[#E5B869]" />
                      <span>{event.date}</span>
                    </div>

                    <h4 className="font-bold text-lg sm:text-xl text-stone-900 dark:text-[#FAF2E8] font-marathi-heading leading-snug group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors line-clamp-2">
                      {event.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-[#D5C2B4] line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* View Album Link */}
                  <div className="pt-3 border-t border-[#E5DDD0] dark:border-[#332228] flex items-center justify-between text-xs font-bold text-[#800020] dark:text-[#E5B869]">
                    <span className="group-hover:underline">सर्व छायाचित्रे पहा</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MODAL GALLERY SHOWCASE ===================== */}
      {/* Exact match to nagarvachanalay.org #galleryModal with carousel and full description block */}
      <AnimatePresence>
        {activeModalEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
            onClick={closeGalleryModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4A373] bg-[#0A1A2A]"
              style={{
                backgroundImage: "linear-gradient(rgba(10, 26, 42, 0.95), rgba(18, 38, 62, 0.98))",
              }}
            >
              {/* Modal Header: Fixed top */}
              <div className="flex-shrink-0 bg-[#0A1A2A] px-5 py-4 border-b border-[#D4A373]/40 flex items-center justify-between gap-4">
                <h5 className="text-base sm:text-lg font-bold text-[#D4A373] font-marathi-heading leading-tight line-clamp-1">
                  {activeModalEvent.photos[currentPhotoIdx]?.caption || activeModalEvent.title}
                </h5>

                <button
                  type="button"
                  onClick={closeGalleryModal}
                  className="rounded-full p-1.5 text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="दालन बंद करा"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body: Photo Carousel Display */}
              <div className="relative flex-1 bg-black/40 flex items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[420px] max-h-[55vh]">
                {/* Main Photo (fit contain so aspect ratio stays exact) */}
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={activeModalEvent.photos[currentPhotoIdx]?.url || activeModalEvent.coverImage}
                    alt={activeModalEvent.photos[currentPhotoIdx]?.caption || activeModalEvent.title}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    priority
                  />
                </div>

                {/* Photo Counter Pill */}
                <div className="absolute top-4 left-4 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#E5B869] border border-[#E5B869]/30">
                  {currentPhotoIdx + 1} / {activeModalEvent.photos.length}
                </div>

                {/* Left Navigation Arrow */}
                {activeModalEvent.photos.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-[#D4A373] hover:bg-[#E5B869] text-[#0A1A2A] p-2.5 sm:p-3 shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    aria-label="मागील छायाचित्र"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {activeModalEvent.photos.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextPhoto();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-[#D4A373] hover:bg-[#E5B869] text-[#0A1A2A] p-2.5 sm:p-3 shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    aria-label="पुढील छायाचित्र"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                )}

                {/* Thumbnail Dots Bar */}
                {activeModalEvent.photos.length > 1 && (
                  <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-10">
                    {activeModalEvent.photos.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPhotoIdx(idx);
                        }}
                        className={`h-2 transition-all rounded-full cursor-pointer ${
                          idx === currentPhotoIdx
                            ? "w-6 bg-[#D4A373]"
                            : "w-2 bg-white/40 hover:bg-white/70"
                        }`}
                        aria-label={`छायाचित्र क्रमांक ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Description Wrapper: Exactly matching nagarvachanalay #modalDescWrapper */}
              <div className="flex-shrink-0 bg-[#0A1A2A]/95 text-white border-t border-[#D4A373]/40 p-4 sm:p-5 rounded-b-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-[#D4A373] font-bold">
                  <span>{activeModalEvent.title}</span>
                  <span>{activeModalEvent.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-marathi-body whitespace-pre-line">
                  {activeModalEvent.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-sm font-bold text-[#800020] dark:text-[#E5B869]">
              <BobbingDots size="lg" className="text-[#800020] dark:text-[#E5B869]" />
              <span>छायाचित्र दालन लोड होत आहे...</span>
            </div>
          }
        >
          <GalleryContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
