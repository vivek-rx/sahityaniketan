"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Bell,
  Search,
  User,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import Dock from "@/components/ui/dock";

/**
 * MobileBottomNav — Mobile Dock Navigation
 * - Floating arc-illusion dock with 3D perspective tilt
 * - Spring scale and rotation on touch/hover
 * - Glowing active ring and indicator dot
 * - Padded for iPhone home indicator with safe-area-inset-bottom
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
      label: language === "mr" ? "मुख्य" : language === "hi" ? "होम" : "Home",
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      icon: BookOpen,
      label: language === "mr" ? "ग्रंथसूची" : language === "hi" ? "ग्रंथसूची" : "Catalogue",
      onClick: () => router.push("/catalogue"),
      isActive: pathname.startsWith("/catalogue"),
    },
    {
      icon: Bell,
      label: language === "mr" ? "सूचना" : language === "hi" ? "सूचनाएं" : "Notices",
      onClick: () => router.push("/news"),
      isActive: pathname.startsWith("/news") || pathname.startsWith("/notices"),
    },
    {
      icon: Search,
      label: language === "mr" ? "इतिहास" : language === "hi" ? "इतिहास" : "History",
      onClick: () => router.push("/history"),
      isActive: pathname.startsWith("/history"),
    },
    {
      icon: User,
      label: language === "mr" ? "सदस्यत्व" : language === "hi" ? "सदस्यता" : "Membership",
      onClick: () => router.push("/membership"),
      isActive: pathname.startsWith("/membership"),
    },
  ];

  const currentActive = items.find((item) => item.isActive)?.label ?? items[0].label;

  return (
    <div
      role="navigation"
      aria-label="Mobile Dock Navigation"
      className="fixed bottom-3 inset-x-0 z-50 lg:hidden pointer-events-none flex justify-center px-4"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0px)",
      }}
    >
      <div className="pointer-events-auto">
        <Dock items={items} activeLabel={currentActive} className="py-0" />
      </div>
    </div>
  );
}

export default MobileBottomNav;
