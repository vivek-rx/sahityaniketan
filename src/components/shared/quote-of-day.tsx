"use client";

import { motion } from "framer-motion";
import type { Quote as QuoteType } from "@/types/database";

interface QuoteOfDayProps {
  quote: QuoteType;
}

/**
 * QuoteOfDay — Clean, modern daily quote display
 */
export function QuoteOfDay({ quote }: QuoteOfDayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="mx-auto max-w-3xl"
    >
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FFFDF9] dark:bg-[#180305] p-6 sm:p-8 shadow-xs">
        <div className="text-center">
          {/* Sanskrit / Hindi / Marathi quote */}
          {quote.quote_text_hi && (
            <p
              className="mb-4 text-xl leading-relaxed sm:text-2xl font-marathi-heading font-bold text-[#800020] dark:text-[#E5B869]"
            >
              {quote.quote_text_hi}
            </p>
          )}

          {/* English quote */}
          <p
            className="mb-6 text-base leading-relaxed italic sm:text-lg text-stone-700 dark:text-stone-300 font-marathi-body"
          >
            &ldquo;{quote.quote_text}&rdquo;
          </p>

          {/* Decorative line */}
          <div
            className="gold-line mx-auto mb-4"
            style={{ width: 32 }}
          />

          {/* Author */}
          <p
            className="text-[13px] font-bold tracking-wide font-marathi-heading text-stone-900 dark:text-stone-100"
          >
            — {quote.author_name}
          </p>

          {quote.source && (
            <p
              className="mt-1 text-[11px] tracking-wider uppercase"
              style={{ color: "var(--color-text-light)" }}
            >
              {quote.source}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
