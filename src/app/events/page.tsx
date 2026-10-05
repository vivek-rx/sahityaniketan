"use client";

import { useEffect, useState } from "react";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { Calendar, MapPin, Clock, Users, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { getEvents } from "@/lib/actions/events";
import { EventRSVPModal } from "@/components/events/event-rsvp-modal";
import { BobbingDots } from "@/components/ui/bobbing-dots";
import { EventGridSkeleton } from "@/components/ui/loader-skeleton";

interface LiteraryEvent {
  id: string;
  title: { mr: string; hi: string; en: string };
  date: { mr: string; hi: string; en: string };
  time: { mr: string; hi: string; en: string };
  venue: { mr: string; hi: string; en: string };
  category: { mr: string; hi: string; en: string };
  desc: { mr: string; hi: string; en: string };
  speaker: { mr: string; hi: string; en: string };
  isFeatured?: boolean;
}

export default function EventsPage() {
  const { language } = useLanguage();
  const [eventsList, setEventsList] = useState<LiteraryEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRsvpEvent, setSelectedRsvpEvent] = useState<LiteraryEvent | null>(null);

  useEffect(() => {
    async function fetchDynamicEvents() {
      setIsLoading(true);
      try {
        const dbEvents = await getEvents();
        if (dbEvents && dbEvents.length > 0) {
          const mapped: LiteraryEvent[] = dbEvents.map((ev: any, idx: number) => ({
            id: ev.id || `db-event-${idx}`,
            isFeatured: !ev.is_archived,
            title: { mr: ev.title, hi: ev.title, en: ev.title },
            date: { mr: ev.event_date || "लवकरच", hi: ev.event_date || "शीघ्र ही", en: ev.event_date || "Coming Soon" },
            time: { mr: ev.event_time || "सायंकाळी", hi: ev.event_time || "सायं", en: ev.event_time || "Evening" },
            venue: { mr: ev.venue || "साहित्य निकेतन ग्रंथालय, अंबाजोगाई", hi: ev.venue || "साहित्य निकेतन ग्रन्थालय, अंबाजोगाई", en: ev.venue || "Sahitya Niketan Library, Ambajogai" },
            category: { mr: ev.event_type || "कार्यक्रम", hi: ev.event_type || "कार्यक्रम", en: ev.event_type || "Event" },
            speaker: { mr: "साहित्य निकेतन आयोजक", hi: "साहित्य निकेतन आयोजक", en: "Organizers" },
            desc: { mr: ev.description || ev.title, hi: ev.description || ev.title, en: ev.description || ev.title },
          }));
          setEventsList(mapped);
        } else {
          setEventsList([]);
        }
      } catch (err) {
        console.error("Failed to load dynamic events:", err);
        setEventsList([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDynamicEvents();
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors">
        <PageHeader
          title={
            language === "mr"
              ? "साहित्यिक व सांस्कृतिक कार्यक्रम"
              : language === "hi"
                ? "साहित्यिक एवं सांस्कृतिक कार्यक्रम"
                : "Literary & Cultural Events"
          }
          subtitle={
            language === "mr"
              ? "व्याख्यानमाला, कवी संमेलने, बाल वाचन कट्टा आणि मोडी लिपी प्रशिक्षण कार्यशाळा"
              : language === "hi"
                ? "व्याख्यानमाला, कवि सम्मेलन, बाल वाचन मंच एवं मोडी लिपि कार्यशाला"
                : "Participate in annual memorial lectures, poetry meets, and archival training workshops."
          }
        />

        <section className="section py-12">
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs text-[#800020] dark:text-[#E5B869] font-bold">
                <span className="h-2 w-2 rounded-full bg-[#800020] dark:bg-[#E5B869] animate-pulse" />
                <span>{language === "mr" ? "कार्यक्रम लोड होत आहेत..." : language === "hi" ? "कार्यक्रम लोड हो रहे हैं..." : "Loading scheduled events..."}</span>
              </div>
              <EventGridSkeleton count={6} />
            </div>
          ) : eventsList.length === 0 ? (
            <div className="rounded-3xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] p-10 sm:p-14 text-center max-w-2xl mx-auto my-6 space-y-4 shadow-xs">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-[#800020]/10 dark:bg-[#800020]/25 text-[#800020] dark:text-[#E5B869] flex items-center justify-center">
                <Calendar className="h-8 w-8" />
              </div>
              <h4 className="font-marathi-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#FAF2E8]">
                {language === "mr"
                  ? "सध्या आगामी कार्यक्रम लवकरच जाहीर केले जातील"
                  : language === "hi"
                    ? "आगामी कार्यक्रम शीघ्र ही घोषित किए जाएंगे"
                    : "Upcoming Events Will Be Announced Soon"}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-marathi-body max-w-md mx-auto">
                {language === "mr"
                  ? "साहित्य निकेतन ग्रंथालयाच्या वतीने आयोजित व्याख्यानमाला, कवी संमेलन आणि वाचक कट्टा यांसंबंधीची अधिकृत माहिती येथे प्रसिद्ध केली जाईल."
                  : language === "hi"
                    ? "साहित्य निकेतन ग्रन्थालय द्वारा आयोजित व्याख्यानमाला, कवि सम्मेलन एवं वाचक सत्र की घोषणा यहां उपलब्ध होगी।"
                    : "Schedules for upcoming memorial lectures, literary meets, and cultural workshops will be published here directly from the library desk."}
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800020] text-white text-xs font-bold hover:bg-[#66001A] transition-all shadow-xs"
                >
                  <span>{language === "mr" ? "कार्यक्रमासाठी संपर्क साधा" : language === "hi" ? "कार्यक्रम हेतु संपर्क करें" : "Inquire with Library Desk"}</span>
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5DDD0] dark:border-[#332228] hover:bg-[#F3ECE3] dark:hover:bg-[#180E11] text-stone-800 dark:text-stone-200 text-xs font-bold transition-all"
                >
                  <span>{language === "mr" ? "ग्रंथालय सभासद व्हा" : language === "hi" ? "ग्रन्थालय सदस्य बनें" : "Become a Member"}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsList.map((event) => (
                <div
                  key={event.id}
                  className={`bg-white dark:bg-[#1E1418] rounded-2xl border p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all ${event.isFeatured
                      ? "border-[#800020] dark:border-[#E5B869] ring-1 ring-[#800020]/20 dark:ring-[#E5B869]/20"
                      : "border-[#E5DDD0] dark:border-[#332228]"
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-[#800020]/10 dark:bg-[#800020]/25 px-3 py-1 text-[11px] font-bold text-[#800020] dark:text-[#E5B869]">
                        {event.category[language]}
                      </span>
                      {event.isFeatured && (
                        <span className="rounded-full bg-[#800020] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                          {language === "mr" ? "प्रमुख कार्यक्रम" : language === "hi" ? "प्रमुख आयोजन" : "Featured"}
                        </span>
                      )}
                    </div>

                    <h3 className="font-marathi-heading text-lg font-bold text-gray-900 dark:text-[#FAF2E8] leading-snug mb-2 hover:text-[#800020] dark:hover:text-[#E5B869] transition-colors">
                      {event.title[language]}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                      {event.desc[language]}
                    </p>

                    <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 bg-[#FAF8F5] dark:bg-[#180E11] p-3 rounded-xl border border-[#E5DDD0] dark:border-[#332228] mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869] shrink-0" />
                        <span className="font-medium">{event.date[language]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869] shrink-0" />
                        <span>{event.time[language]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869] shrink-0" />
                        <span>{event.venue[language]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#800020] dark:text-[#E5B869]">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        <span>{event.speaker[language]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5DDD0] dark:border-[#332228] flex items-center justify-between text-xs">
                    <span className="text-stone-500 dark:text-stone-400">
                      {language === "mr" ? "प्रवेश विनामूल्य" : language === "hi" ? "प्रवेश निःशुल्क" : "Free Admission"}
                    </span>
                    <button
                      onClick={() => setSelectedRsvpEvent(event)}
                      className="font-bold text-white bg-[#800020] hover:bg-[#66001A] px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-xs hover:shadow-md active:scale-95"
                    >
                      <span>{language === "mr" ? "सीट आरक्षित करा" : language === "hi" ? "सीट आरक्षित करें" : "Reserve Seat"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RSVP Modal */}
        {selectedRsvpEvent && (
          <EventRSVPModal
            eventTitle={selectedRsvpEvent.title[language]}
            eventDate={selectedRsvpEvent.date[language]}
            eventTime={selectedRsvpEvent.time[language]}
            venue={selectedRsvpEvent.venue[language]}
            isOpen={!!selectedRsvpEvent}
            onClose={() => setSelectedRsvpEvent(null)}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
