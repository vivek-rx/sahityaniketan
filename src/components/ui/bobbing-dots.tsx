"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BobbingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
  duration?: number;
  count?: number;
  bounceHeight?: number;
}

/**
 * Standard, dignified loading spinner.
 * Replaces intrusive bouncing novelty animations with clean, professional iconography.
 */
export function BobbingDots({
  size = "md",
  className,
  ...props
}: BobbingDotsProps) {
  const sizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <Loader2 className={cn("animate-spin shrink-0 text-current", sizeMap[size])} />
    </div>
  );
}

export default BobbingDots;
