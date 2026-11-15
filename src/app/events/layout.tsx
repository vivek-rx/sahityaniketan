import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { EventListSchema } from "@/components/seo/structured-data";
import { createPublicClient } from "@/lib/supabase/server";
import { LIBRARY_EVENTS } from "@/lib/data/library-events";

export const metadata: Metadata = buildPageMetadata({
  title: "कार्यक्रम व उपक्रम",
  description:
    "साहित्य निकेतन ग्रंथालयाचे व्याख्यान, साहित्य संमेलन, ग्रंथप्रदर्शन, वाचन चळवळ आणि स्पर्धा परीक्षा मार्गदर्शन उपक्रमांचे वेळापत्रक.",
  path: "/events",
  image: "/images/real/library_window.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाचा वाचन कक्ष",
});

export const revalidate = 600; // refresh event schema every 10 minutes

interface DbEvent {
  title: string;
  title_marathi?: string | null;
  description?: string | null;
  event_date: string | null;
  image_url?: string | null;
}

async function fetchEventsForSchema(): Promise<DbEvent[]> {
  try {
    const supabase = createPublicClient() as any;
    const { data, error } = await supabase
      .from("events")
      .select("title, title_marathi, description, event_date, image_url")
      .eq("is_archived", false)
      .order("event_date", { ascending: false })
      .limit(20);
    if (error || !data || data.length === 0) return [];
    return data as DbEvent[];
  } catch {
    return [];
  }
}

export default async function EventsLayout({ children }: { children: ReactNode }) {
  // DB first; when the events table is empty (seed-only deployment), fall back
  // to the curated static LIBRARY_EVENTS so AI surfaces still see real content.
  let events = await fetchEventsForSchema();
  if (events.length === 0) {
    events = LIBRARY_EVENTS.slice(0, 10).map((ev) => ({
      title: ev.title,
      title_marathi: null,
      description: ev.descriptionEn ?? ev.description,
      event_date: null, // static dates are display strings, not ISO
      image_url: ev.coverImage ?? null,
    }));
  }

  return (
    <>
      {events.length > 0 && (
        <EventListSchema
          events={events.map((ev) => ({
            title: ev.title,
            description: ev.description ?? undefined,
            date: ev.event_date,
            image: ev.image_url ?? undefined,
          }))}
        />
      )}
      {children}
    </>
  );
}
