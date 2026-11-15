"use client";

import Image from "next/image";
import { useAdminLanguage } from "@/context/admin-language-context";
import { cn } from "@/lib/utils";

/**
 * Branded CMS loading state: spinning maroon→gold conic ring around the
 * library logo, with a bilingual status line. Replaces the plain grey
 * Loader2 spinners on admin pages.
 */
export function AdminLoader({ label, className }: { label?: string; className?: string }) {
  const { lang } = useAdminLanguage();
  const text =
    label ?? (lang === "mr" ? "लोड करत आहे..." : "Loading...");

  return (
    <div className={cn("flex flex-col items-center justify-center py-20 space-y-5", className)}>
      <div className="relative h-20 w-20">
        {/* Spinning conic gradient ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 0deg, #800020 0deg, #93233B 90deg, #E5B869 200deg, rgba(229,184,105,0.15) 260deg, rgba(128,0,32,0.08) 360deg)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 5px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 5px))",
            animationDuration: "1.1s",
          }}
        />
        {/* Logo core */}
        <div className="absolute inset-2 rounded-full bg-white dark:bg-slate-900 shadow-inner flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain rounded-full"
          />
        </div>
      </div>
      <p className="text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}
