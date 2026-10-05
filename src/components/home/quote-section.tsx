"use client";

import { SectionHeader, QuoteOfDay } from "@/components/shared";

interface Quote {
  id: string;
  quote_text: string;
  quote_text_hi?: string | null;
  author_name: string;
  source?: string | null;
  display_date?: string | null;
  is_active: boolean;
  created_at: string;
}

export function QuoteSection({ quote }: { quote?: Quote | null }) {
  if (!quote) return null;

  return (
    <section
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="section relative">
        <SectionHeader
          title="Quote of the Day"
          titleHindi="आजचा विचार"
        />
        <QuoteOfDay quote={quote} />
      </div>
    </section>
  );
}
