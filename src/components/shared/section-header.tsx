"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  titleHindi?: string;
  subtitle?: string;
  align?: "left" | "center";
  accentColor?: "maroon" | "gold";
  className?: string;
  children?: React.ReactNode;
}

/**
 * SectionHeader — Reusable section title with clean architectural typography
 * The core visual rhythm element of every page
 */
export function SectionHeader({
  title,
  titleHindi,
  subtitle,
  align = "center",
  accentColor = "gold",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Accent line */}
      <div
        className={cn(
          accentColor === "gold" ? "gold-line" : "maroon-line",
          "mb-6",
          align === "center" && "mx-auto"
        )}
      />

      {/* Title */}
      <h2
        className="mb-3 font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100"
      >
        {title}
      </h2>

      {/* Hindi / Marathi subtitle */}
      {titleHindi && (
        <p
          className="mb-3 text-base font-marathi-body"
          style={{
            fontFamily: "var(--font-tiro-marathi), serif",
            color: "#8B151B",
          }}
        >
          {titleHindi}
        </p>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "text-base leading-relaxed",
            align === "center" && "mx-auto max-w-2xl"
          )}
          style={{ color: "var(--color-text-secondary)" }}
        >
          {subtitle}
        </p>
      )}

      {/* Optional children (e.g., tabs, filters) */}
      {children}
    </motion.div>
  );
}
