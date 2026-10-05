"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BobbingDots } from "@/components/ui/bobbing-dots";

export interface LoadingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "line-simple" | "line-spinner" | "dot-circle" | "bobbing-dots";
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function LoadingIndicator({
  type = "bobbing-dots",
  size = "md",
  label,
  className,
  ...props
}: LoadingIndicatorProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const borderSizeMap = {
    sm: "border-2",
    md: "border-2.5",
    lg: "border-3",
  };

  const textSizeMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2.5 text-[#C0392B] dark:text-[#E8B830]", className)}
      {...props}
    >
      {type === "line-simple" && (
        <div
          className={cn(
            "rounded-full border-solid border-[#C0392B]/20 dark:border-[#E8B830]/20 border-t-[#C0392B] dark:border-t-[#E8B830] animate-spin",
            sizeMap[size],
            borderSizeMap[size]
          )}
        />
      )}

      {type === "line-spinner" && (
        <svg
          className={cn("animate-spin text-[#C0392B] dark:text-[#E8B830]", sizeMap[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {type === "dot-circle" && (
        <div className={cn("relative flex items-center justify-center", sizeMap[size])}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C0392B]/40 dark:bg-[#E8B830]/40 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C0392B] dark:bg-[#E8B830]" />
        </div>
      )}

      {type === "bobbing-dots" && (
        <BobbingDots size={size} className="text-current" />
      )}

      {label && (
        <span className={cn("font-medium text-gray-700 dark:text-slate-300 font-marathi-body", textSizeMap[size])}>
          {label}
        </span>
      )}
    </div>
  );
}

export default LoadingIndicator;
