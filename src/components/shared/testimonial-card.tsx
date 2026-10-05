"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/database";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  index?: number;
}

/**
 * TestimonialCard — Elegant quote card for member testimonials
 */
export function TestimonialCard({
  testimonial,
  className,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn("heritage-card relative", className)}
    >
      {/* Quote icon */}
      <Quote
        className="absolute right-5 top-5 h-8 w-8"
        style={{ color: "var(--color-gold-light)", opacity: 0.2 }}
        strokeWidth={1}
      />

      {/* Quote text */}
      <p
        className="relative mb-6 text-[15px] leading-relaxed italic"
        style={{ color: "var(--color-text-secondary)" }}
      >
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {testimonial.photo_url ? (
          <Image
            src={testimonial.photo_url}
            alt={testimonial.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white"
            style={{
              background: "linear-gradient(135deg, var(--color-maroon), var(--color-maroon-light))",
            }}
          >
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p
            className="text-[14px] font-bold font-heading text-stone-900 dark:text-stone-100"
          >
            {testimonial.name}
          </p>
          {testimonial.designation && (
            <p
              className="text-[12px]"
              style={{ color: "var(--color-text-light)" }}
            >
              {testimonial.designation}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
