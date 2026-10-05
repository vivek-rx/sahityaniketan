"use client";

import React from "react";

/**
 * SmoothScrollProvider — Native Hardware-Accelerated Scrolling
 * Lenis synthetic scroll interception has been replaced with native browser momentum scrolling,
 * eliminating all scroll lag, hitching, and touch/wheel latency across mobile and desktop.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

