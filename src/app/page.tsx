import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import {
  HeroCarousel,
  StatsSection,
  FeaturedBooksSection,
  HistoryTimelineSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home";
import { buildPageMetadata } from "@/lib/metadata";
import { SITE_NAME_MR } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE_NAME_MR} — स्थापना १ ऑगस्ट १९४५`,
  description:
    "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त साहित्य निकेतन सार्वजनिक ग्रंथालय, मंडई बाजार रोड, अंबाजोगाई. ३९,९५३ मुद्रित ग्रंथ, दुर्मीळ मोडी व संस्कृत हस्तलिखिते, संदर्भ कक्ष आणि अभ्यासिका दालन.",
  path: "/",
  absoluteTitle: true,
  image: "/images/real/library_vintage_books.png",
  imageAlt: "साहित्य निकेतन ग्रंथालय — दुर्मीळ ग्रंथ व हस्तलिखित दालन",
});

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10 min-h-screen bg-[#FAF8F5] dark:bg-[#120B0D] text-stone-900 dark:text-[#FAF2E8] shadow-[0_25px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-colors">
        {/* Page-level H1: visually hidden so the hero art direction stays intact */}
        <h1 className="sr-only">
          साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई — स्थापना १ ऑगस्ट १९४५
        </h1>

        {/* 1. Dynamic Database-driven Hero Banner (Admin controlled) */}
        <HeroCarousel />

        {/* 2. Monumental Typographic Moment: Founding Year १९४५ & Library Stats */}
        <StatsSection />

        {/* 3. Rare Manuscripts & Featured Book Collections */}
        <FeaturedBooksSection />

        {/* 4. The One Deliberate Animation Moment: The History Scroll-Timeline */}
        <HistoryTimelineSection />

        {/* 5. Voices of Our Community (@motion/card-stack) */}
        <TestimonialsSection />

        {/* 6. Membership Invitation & Reader Welcome CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
