import { Navbar, Footer } from "@/components/layout";
import {
  HeroCarousel,
  LibraryEventsCarousel,
  StatsSection,
  FeaturedBooksSection,
  HistoryTimelineSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home";

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10 min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-colors">
        {/* 1. Dynamic Database-driven Banner (Admin controlled, gracefully hidden when empty) */}
        <HeroCarousel />

        {/* 2. Grand Library Events & Heritage Carousel */}
        <LibraryEventsCarousel />

        {/* 3. Monumental Typographic Moment: Founding Year १९४५ & Library Stats */}
        <StatsSection />

        {/* 4. Rare Manuscripts & Featured Book Collections */}
        <FeaturedBooksSection />

        {/* 5. The One Deliberate Animation Moment: The History Scroll-Timeline */}
        <HistoryTimelineSection />

        {/* 6. Voices of Our Community (@motion/card-stack) */}
        <TestimonialsSection />

        {/* 7. Membership Invitation & Reader Welcome CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
