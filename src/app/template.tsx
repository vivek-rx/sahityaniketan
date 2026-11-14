"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Page transition: compositor-only opacity fade.
 * The old full-page clip-path "mask wipe" repainted the entire page on every
 * navigation and was the single biggest source of jank on low-end phones;
 * an opacity fade is GPU-composited and near-free.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll restoration on route transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      {/* Slim golden-burgundy top progress sweep on route change (transform-only) */}
      <motion.div
        key={`sweep-${pathname}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: 0.25, delay: 0.3 },
        }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C5A059] via-[#FDE68A] to-[#800020] origin-left z-[60] pointer-events-none"
      />

      {/* Quick compositor-only fade-in on route change */}
      <motion.div
        key={`page-${pathname}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full flex-1 flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
