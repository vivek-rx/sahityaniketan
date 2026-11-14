"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Newspaper,
  History,
  UserCheck,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

/**
 * MobileBottomNav — flat, brand-consistent bottom navigation.
 *
 * The old floating white "dock" pill clashed with the heritage palette,
 * used the wrong icons (a search icon for History), hid labels behind
 * tooltips that don't work on touch, and ran framer-motion springs plus a
 * backdrop-blur layer permanently composited over scrolling content.
 * This is a plain flat bar: no animation loop, no blur, real labels.
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();

  // Don't render on admin portal or login
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  const items = [
    {
      icon: Home,
      label: language === "en" ? "Home" : language === "hi" ? "होम" : "मुखपृष्ठ",
      href: "/",
      isActive: pathname === "/",
    },
    {
      icon: BookOpen,
      label: language === "en" ? "Catalogue" : language === "hi" ? "ग्रन्थसूची" : "ग्रंथसूची",
      href: "/catalogue",
      isActive: pathname.startsWith("/catalogue"),
    },
    {
      icon: Newspaper,
      label: language === "en" ? "News" : language === "hi" ? "समाचार" : "बातम्या",
      href: "/news",
      isActive: pathname.startsWith("/news") || pathname.startsWith("/notices"),
    },
    {
      icon: History,
      label: language === "en" ? "History" : language === "hi" ? "इतिहास" : "इतिहास",
      href: "/history",
      isActive: pathname.startsWith("/history"),
    },
    {
      icon: UserCheck,
      label: language === "en" ? "Join" : language === "hi" ? "सदस्यता" : "सभासद व्हा",
      href: "/membership",
      isActive: pathname.startsWith("/membership"),
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-[#E5B869]/25 bg-[#6B0F1A] dark:bg-[#160E11]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-5 max-w-xl mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => router.push(item.href)}
              aria-current={item.isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 h-14 cursor-pointer select-none transition-colors",
                item.isActive
                  ? "text-[#E5B869]"
                  : "text-white/80 hover:text-white active:text-[#E5B869]"
              )}
            >
              {item.isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-[#E5B869]"
                />
              )}
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold font-marathi-heading leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
