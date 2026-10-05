"use client";

import React, { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Convert English digits to Marathi/Devanagari digits
function toDevanagariDigits(str: string): string {
  const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return str.replace(/[0-9]/g, (w) => devanagariDigits[+w]);
}

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  shouldStart: boolean;
  isDevanagari?: boolean;
  className?: string;
}

export function AnimatedNumber({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = true,
  shouldStart,
  isDevanagari = false,
  className = "",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState("0");
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) return;
    if (raf.current) cancelAnimationFrame(raf.current);

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = easeOutExpo(progress);
      const current = eased * end;

      let formatted = separator
        ? Math.round(current).toLocaleString("en-IN")
        : current.toFixed(decimals);

      if (isDevanagari) {
        formatted = toDevanagariDigits(formatted);
      }

      setDisplay(formatted);

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [shouldStart, end, duration, decimals, separator, isDevanagari]);

  return (
    <span
      className={className}
      style={{
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export interface StatItemData {
  value: number;
  label: string;
  sublabel?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface FramerStatsProps {
  stats: StatItemData[];
  duration?: number;
  separator?: boolean;
  triggerOnView?: boolean;
  divider?: boolean;
  isDevanagari?: boolean;
  className?: string;
}

export function FramerStatsSection({
  stats,
  duration = 2,
  separator = true,
  triggerOnView = true,
  divider = true,
  isDevanagari = false,
  className = "",
}: FramerStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) {
      setStarted(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-center w-full ${className}`}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center justify-center text-center p-4 group"
        >
          {divider && i > 0 && (
            <div className="hidden md:block absolute left-0 top-[15%] h-[70%] w-[1px] bg-stone-300/60 dark:bg-stone-700/60" />
          )}

          <AnimatedNumber
            end={stat.value}
            duration={duration}
            prefix={stat.prefix ?? ""}
            suffix={stat.suffix ?? ""}
            decimals={stat.decimals ?? 0}
            separator={separator}
            shouldStart={started}
            isDevanagari={isDevanagari}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6B0F1A] dark:text-[#E5B869] tracking-tight group-hover:scale-105 transition-transform duration-300"
          />

          <span className="mt-2.5 text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 leading-snug">
            {stat.label}
          </span>

          {stat.sublabel && (
            <span className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              {stat.sublabel}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default FramerStatsSection;
