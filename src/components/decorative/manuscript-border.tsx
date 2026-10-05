import React from "react";
import { cn } from "@/lib/utils";

interface ManuscriptBorderProps {
  className?: string;
  children: React.ReactNode;
  variant?: "simple" | "ornate";
}

export function ManuscriptBorder({ className, children }: ManuscriptBorderProps) {
  return (
    <div className={cn("rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#FFFDF9] dark:bg-[#180305] p-6 sm:p-8 shadow-xs", className)}>
      {children}
    </div>
  );
}
