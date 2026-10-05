"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Page mask wipe transition — mimics Motion+ page-mask-transitions
// Uses clip-path polygon animation (left-to-right reveal wipe)
const maskVariants: Variants = {
  initial: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    opacity: 1,
  },
  animate: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    opacity: 1,
    transition: {
      clipPath: {
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
      opacity: { duration: 0 },
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll restoration on route transition with Lenis synchronization
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <>
      {/* Sleek Golden-Burgundy Top Progress Sweep on route change */}
      <motion.div
        key={`sweep-${pathname}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: 0.3, delay: 0.4 },
        }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C5A059] via-[#FDE68A] to-[#800020] origin-left z-[99999] pointer-events-none"
      />

      {/* Mask-wipe page entrance (clip-path left→right reveal) */}
      <motion.div
        key={`page-${pathname}`}
        variants={maskVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex-1 flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
