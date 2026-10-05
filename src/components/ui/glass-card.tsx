"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "amber-kumkum" | "gold" | "kumkum" | "purple" | "amber-teal" | "teal";
  hoverScale?: boolean;
}

export function GlassCard({
  children,
  className = "",
  glowColor = "amber-kumkum",
  hoverScale = true,
  ...props
}: GlassCardProps) {
  const glowStyles = {
    "amber-kumkum": "from-amber-500/10 via-white/90 to-red-600/10 dark:from-amber-500/10 dark:via-slate-900/95 dark:to-red-600/10 border-amber-300/40 dark:border-slate-800 hover:border-amber-400/70 shadow-amber-500/5",
    gold: "from-amber-500/15 via-white/90 to-yellow-500/15 dark:from-amber-500/10 dark:via-slate-900/95 dark:to-yellow-500/10 border-amber-400/50 dark:border-amber-500/20 hover:border-amber-400 shadow-amber-500/10",
    kumkum: "from-red-600/15 via-white/90 to-amber-500/15 dark:from-red-600/10 dark:via-slate-900/95 dark:to-amber-500/10 border-red-300/50 dark:border-red-500/20 hover:border-red-400 shadow-red-500/10",
    purple: "from-purple-500/15 via-white/90 to-indigo-500/15 dark:from-purple-500/10 dark:via-slate-900/95 dark:to-indigo-500/10 border-purple-400/50 dark:border-purple-500/20 hover:border-purple-400 shadow-purple-500/10",
    "amber-teal": "from-amber-500/10 via-white/90 to-red-600/10 dark:from-amber-500/10 dark:via-slate-900/95 dark:to-red-600/10 border-amber-300/40 dark:border-slate-800 hover:border-amber-400/70 shadow-amber-500/5",
    teal: "from-red-600/15 via-white/90 to-amber-500/15 dark:from-red-600/10 dark:via-slate-900/95 dark:to-amber-500/10 border-red-300/50 dark:border-red-500/20 hover:border-red-400 shadow-red-500/10",
  };

  return (
    <motion.div
      whileHover={hoverScale ? { y: -6, scale: 1.01 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br backdrop-blur-xl border p-6 shadow-xl transition-all duration-500 group font-marathi-body",
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Ambient Top Glow Spot */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-amber-400/20 to-red-500/15 blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      
      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
