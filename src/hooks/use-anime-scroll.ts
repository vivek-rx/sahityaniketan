/**
 * useAnimeScroll — Anime.js v4 scroll-reveal hook for Sahitya Niketan
 *
 * Uses anime.js v4 named exports (animate, stagger) with IntersectionObserver
 * to trigger smooth staggered reveal animations when elements enter viewport.
 * Designed to complement (not replace) framer-motion.
 *
 * Presets:
 *   "fade-up"    — translate Y + opacity reveal
 *   "fade-in"    — opacity only
 *   "fade-left"  — slide from left
 *   "fade-right" — slide from right
 *   "scale-up"   — scale from 0.92 + opacity
 *   "stagger"    — staggered children reveal
 */

"use client";

import { useRef, useEffect, RefObject } from "react";
import { animate, stagger } from "animejs";

type AnimePreset =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "stagger";

interface AnimeScrollOptions {
  threshold?: number;
  delay?: number;
  repeat?: boolean;
  staggerDelay?: number;
  duration?: number;
  childrenSelector?: string;
}

export function useAnimeScroll<T extends HTMLElement = HTMLDivElement>(
  preset: AnimePreset = "fade-up",
  options: AnimeScrollOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const hasAnimated = useRef(false);

  const {
    threshold = 0.12,
    delay = 0,
    repeat = false,
    staggerDelay = 80,
    duration = 700,
    childrenSelector = ":scope > *",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getTargets = (): HTMLElement[] => {
      if (preset === "stagger") {
        return Array.from(el.querySelectorAll(childrenSelector)) as HTMLElement[];
      }
      return [el];
    };

    const targets = getTargets();
    if (targets.length === 0) return;

    // Respect user's motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    // If already in viewport on mount, do not hide to prevent flickering
    if (isAlreadyVisible) {
      hasAnimated.current = true;
      return;
    }

    applyInitialState(targets, preset);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!repeat && hasAnimated.current) return;
            hasAnimated.current = true;
            playAnimation(targets, preset, { delay, duration, staggerDelay });
            if (!repeat) observer.unobserve(el);
          } else if (repeat) {
            applyInitialState(targets, preset);
            hasAnimated.current = false;
          }
        });
      },
      { threshold, rootMargin: "0px 0px 50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [preset, threshold, delay, repeat, staggerDelay, duration, childrenSelector]);

  return ref;
}

function applyInitialState(targets: HTMLElement[], preset: AnimePreset): void {
  targets.forEach((t) => {
    t.style.willChange = "transform, opacity";
    switch (preset) {
      case "fade-up":
        t.style.opacity = "0";
        t.style.transform = "translateY(24px)";
        break;
      case "fade-in":
        t.style.opacity = "0";
        break;
      case "fade-left":
        t.style.opacity = "0";
        t.style.transform = "translateX(-24px)";
        break;
      case "fade-right":
        t.style.opacity = "0";
        t.style.transform = "translateX(24px)";
        break;
      case "scale-up":
        t.style.opacity = "0";
        t.style.transform = "scale(0.96)";
        break;
      case "stagger":
        t.style.opacity = "0";
        t.style.transform = "translateY(16px)";
        break;
    }
  });
}

function playAnimation(
  targets: HTMLElement[],
  preset: AnimePreset,
  opts: { delay: number; duration: number; staggerDelay: number }
): void {
  const easing = "outExpo";

  const delayVal =
    preset === "stagger"
      ? stagger(opts.staggerDelay, { start: opts.delay })
      : opts.delay;

  const onComplete = () => {
    targets.forEach((t) => {
      t.style.willChange = "";
    });
  };

  switch (preset) {
    case "fade-up":
      animate(targets, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: opts.duration,
        ease: easing,
        delay: delayVal,
        onComplete,
      });
      break;
    case "stagger":
      animate(targets, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: opts.duration,
        ease: easing,
        delay: delayVal,
        onComplete,
      });
      break;
    case "fade-in":
      animate(targets, {
        opacity: [0, 1],
        duration: opts.duration,
        ease: easing,
        delay: delayVal,
        onComplete,
      });
      break;
    case "fade-left":
      animate(targets, {
        opacity: [0, 1],
        translateX: [-24, 0],
        duration: opts.duration,
        ease: easing,
        delay: delayVal,
        onComplete,
      });
      break;
    case "fade-right":
      animate(targets, {
        opacity: [0, 1],
        translateX: [24, 0],
        duration: opts.duration,
        ease: easing,
        delay: delayVal,
        onComplete,
      });
      break;
    case "scale-up":
      animate(targets, {
        opacity: [0, 1],
        scale: [0.96, 1],
        duration: opts.duration,
        ease: easing,
        delay: delayVal,
        onComplete,
      });
      break;
  }
}


/**
 * Helper to animate a number counter smoothly using anime.js
 */
export function animeCounter(
  element: HTMLElement,
  from: number,
  to: number,
  duration = 1800,
  formatter?: (val: number) => string
) {
  const obj = { val: from };
  return animate(obj, {
    val: to,
    duration,
    ease: "outExpo",
    onUpdate: () => {
      element.textContent = formatter
        ? formatter(Math.round(obj.val))
        : Math.round(obj.val).toLocaleString();
    },
  });
}
