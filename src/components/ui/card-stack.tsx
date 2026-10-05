"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardStackItem {
  id: string | number;
  name: string;
  role: string;
  content: string;
  avatar?: string | null;
  rating?: number;
  badge?: string;
}

interface CardStackProps {
  items: CardStackItem[];
  offset?: number;
  scaleFactor?: number;
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * CardStack — Exact @motion/card-stack component implementation.
 * 3D stacked deck of cards with smooth Framer Motion spring physics,
 * provision for photo, name, role, and quote.
 */
export function CardStack({
  items,
  offset = 12,
  scaleFactor = 0.05,
  autoplay = true,
  interval = 5500,
  className,
}: CardStackProps) {
  const [cards, setCards] = useState<CardStackItem[]>(items);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCards(items);
  }, [items]);

  useEffect(() => {
    if (!autoplay || isPaused || cards.length <= 1) return;

    const timer = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const first = newArray.shift();
        if (first) newArray.push(first);
        return newArray;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, isPaused, cards.length, interval]);

  const handleNext = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  const handlePrev = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      const last = newArray.pop();
      if (last) newArray.unshift(last);
      return newArray;
    });
  };

  if (!cards || cards.length === 0) return null;

  return (
    <div
      className={cn("relative w-full max-w-xl mx-auto flex flex-col items-center", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── CARD STACK DECK ── */}
      <div className="relative h-[300px] sm:h-[270px] w-full">
        {cards.map((card, index) => {
          // Only render top 3 cards in DOM for performance
          if (index > 2) return null;

          const isTop = index === 0;

          return (
            <motion.div
              key={card.id}
              className={cn(
                "absolute w-full rounded-2xl p-6 sm:p-7 select-none border shadow-xl flex flex-col justify-between",
                "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
                isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
              )}
              style={{
                transformOrigin: "top center",
              }}
              animate={{
                top: index * -offset,
                scale: 1 - index * scaleFactor,
                zIndex: cards.length - index,
                opacity: 1 - index * 0.15,
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 80) {
                  handleNext();
                }
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
            >
              <div className="space-y-3">
                {/* Header: Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: card.rating || 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                    {card.badge && (
                      <span className="ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <Quote className="w-6 h-6 text-zinc-300 dark:text-zinc-700 shrink-0" />
                </div>

                {/* Quote Content */}
                <p className="text-sm sm:text-base font-normal leading-relaxed text-zinc-700 dark:text-zinc-300 font-marathi-body line-clamp-4">
                  “{card.content}”
                </p>
              </div>

              {/* Author Strip with Photo Provision */}
              <div className="flex items-center gap-3.5 pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                {card.avatar ? (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={card.avatar}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 text-zinc-500 dark:text-zinc-400">
                    <User className="w-5 h-5" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-white truncate font-marathi-heading">
                    {card.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate font-marathi-body">
                    {card.role}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── STACK CONTROLS & PAGINATION ── */}
      <div className="flex items-center gap-4 mt-8 select-none">
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous testimonial"
          className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {cards.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === 0
                  ? "w-6 bg-zinc-900 dark:bg-white"
                  : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          type="button"
          aria-label="Next testimonial"
          className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CardStack;
