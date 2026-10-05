"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Event } from "@/types/database";

interface EventCardProps {
  event: Event;
  className?: string;
  index?: number;
  variant?: "default" | "featured";
}

const statusStyles = {
  upcoming: {
    label: "Upcoming",
    bg: "rgba(184, 134, 11, 0.1)",
    color: "var(--color-gold-dark)",
  },
  ongoing: {
    label: "Happening Now",
    bg: "rgba(45, 90, 61, 0.12)",
    color: "var(--color-forest)",
  },
  past: {
    label: "Past Event",
    bg: "rgba(155, 142, 130, 0.1)",
    color: "var(--color-text-light)",
  },
  cancelled: {
    label: "Cancelled",
    bg: "rgba(107, 29, 42, 0.1)",
    color: "var(--color-maroon)",
  },
};

/**
 * EventCard — Displays event with banner, date, location, status
 */
export function EventCard({
  event,
  className,
  index = 0,
  variant = "default",
}: EventCardProps) {
  const statusKey = (event.status ?? "upcoming") as keyof typeof statusStyles;
  const status = statusStyles[statusKey] ?? statusStyles.upcoming;
  const eventDate = new Date(event.event_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Link
        href={`/events/${event.slug}`}
        className={cn(
          "heritage-card group block overflow-hidden p-0",
          variant === "featured" && "md:flex",
          className
        )}
      >
        {/* Banner */}
        <div
          className={cn(
            "relative overflow-hidden",
            variant === "featured"
              ? "aspect-[16/9] md:aspect-auto md:w-2/5"
              : "aspect-[16/9]"
          )}
          style={{ backgroundColor: "var(--color-cream)" }}
        >
          {event.banner_url ? (
            <Image
              src={event.banner_url}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, var(--color-cream), var(--color-sandstone-light))`,
              }}
            >
              <Calendar
                className="h-10 w-10"
                style={{ color: "var(--color-sandstone)" }}
                strokeWidth={1}
              />
            </div>
          )}

          {/* Date badge overlay */}
          <div className="absolute left-4 top-4">
            <div
              className="flex flex-col items-center rounded-sm px-3 py-2 text-center text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))",
              }}
            >
              <span className="text-lg font-semibold leading-none">
                {eventDate.getDate()}
              </span>
              <span className="text-[10px] tracking-wider uppercase">
                {eventDate.toLocaleString("en-IN", { month: "short" })}
              </span>
            </div>
          </div>

          {/* Status badge */}
          <div className="absolute right-3 top-3">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{
                backgroundColor: status.bg,
                color: status.color,
                backdropFilter: "blur(8px)",
              }}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={cn("p-5", variant === "featured" && "md:flex-1 md:p-6")}>
          <h3
            className="mb-2 line-clamp-2 text-[15px] font-bold font-heading leading-snug transition-colors group-hover:text-[var(--color-maroon)] text-stone-900 dark:text-stone-100"
          >
            {event.title}
          </h3>

          {event.description && (
            <p
              className="mb-3 line-clamp-2 text-[13px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {event.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-[12px]">
            <span
              className="flex items-center gap-1.5"
              style={{ color: "var(--color-text-light)" }}
            >
              <Calendar className="h-3 w-3" strokeWidth={1.5} />
              {formatDate(event.event_date, { month: "short" })}
            </span>

            {event.location && (
              <span
                className="flex items-center gap-1.5"
                style={{ color: "var(--color-text-light)" }}
              >
                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                {event.location}
              </span>
            )}
          </div>

          {variant === "featured" && (
            <div
              className="mt-4 flex items-center gap-1 text-[13px] font-medium transition-colors group-hover:text-[var(--color-maroon)]"
              style={{ color: "var(--color-gold)" }}
            >
              View Details
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
