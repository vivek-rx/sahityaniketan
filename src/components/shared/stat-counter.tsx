"use client";

import { useIntersection, useAnimatedCounter } from "@/hooks";
import { formatIndianNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * StatCounter — Animated number counter with scroll trigger
 * Used in the statistics section of the homepage
 */
export function StatCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  className,
}: StatCounterProps) {
  const [ref, isVisible] = useIntersection({ threshold: 0.3 });
  const count = useAnimatedCounter(value, 2000, isVisible);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-2 text-center",
        className
      )}
    >
      <span
        className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-heading text-[#800020] dark:text-[#E5B869]"
      >
        {prefix}
        {formatIndianNumber(count)}
        {suffix}
      </span>
      <span
        className="text-xs font-medium tracking-[0.2em] uppercase"
        style={{ color: "var(--color-text-light)" }}
      >
        {label}
      </span>
    </div>
  );
}
