"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Inbox,
  BookOpen,
  User,
  Search,
  Bell,
  type LucideIcon,
} from "lucide-react";

import Dock from "@/components/ui/dock";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES & INTERFACES
   ───────────────────────────────────────────────────────────────────────────── */
export interface TabDestination {
  id: string;
  label: string;
  shortLabel?: string;
  href?: string;
  icon: LucideIcon;
  badgeCount?: number;
  screen?: React.ReactNode;
}

export interface PhoneBottomNavBarProps {
  /** Optional active tab ID when controlled externally */
  activeTabId?: string;
  /** Callback fired when a tab is selected */
  onTabChange?: (tabId: string) => void;
  /** Badge count for Inbox (defaults to 3) */
  inboxBadgeCount?: number;
  /** Custom destination list (defaults to the 4 canonical equal-importance tabs) */
  destinations?: TabDestination[];
  /** Visual variant: 'ios' (UITabBar), 'material3' (NavigationBar), or 'dock' (Arc Dock) */
  variant?: "ios" | "material3" | "dock";
  /** Optional className for outer container */
  className?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   DEFAULT 4 CANONICAL DESTINATIONS
   Equal importance, icon above short label, Inbox badge
   ───────────────────────────────────────────────────────────────────────────── */
export const DEFAULT_PHONE_DESTINATIONS: TabDestination[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    href: "/",
    icon: Home,
  },
  {
    id: "inbox",
    label: "Inbox",
    shortLabel: "Inbox",
    href: "/news",
    icon: Inbox,
    badgeCount: 3,
  },
  {
    id: "catalogue",
    label: "Catalogue",
    shortLabel: "Catalogue",
    href: "/catalogue",
    icon: BookOpen,
  },
  {
    id: "profile",
    label: "Profile",
    shortLabel: "Profile",
    href: "/membership",
    icon: User,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PHONE BOTTOM NAVIGATION BAR COMPONENT
   - Fixed to bottom of screen
   - 4 destinations of equal importance (icon above short label)
   - Selected tab tinted, others muted
   - Count badge on Inbox (tabBarBadge / .badge(_:))
   - Semantic <nav> of links with aria-current="page" on active item
   - env(safe-area-inset-bottom) padding to clear iPhone home indicator
   ───────────────────────────────────────────────────────────────────────────── */
export function PhoneBottomNavBar({
  activeTabId,
  onTabChange,
  inboxBadgeCount = 3,
  destinations = DEFAULT_PHONE_DESTINATIONS,
  variant = "ios",
  className = "",
}: PhoneBottomNavBarProps) {
  const pathname = usePathname();

  // Internal active tab calculation
  const determineActiveTab = (): string => {
    if (activeTabId) return activeTabId;
    if (!pathname) return destinations[0]?.id || "home";

    // Match by exact href or starting path
    const matched = destinations.find((dest) => {
      if (!dest.href) return false;
      if (dest.href === "/") return pathname === "/";
      return pathname.startsWith(dest.href);
    });

    return matched?.id || destinations[0]?.id || "home";
  };

  const currentTab = determineActiveTab();

  if (variant === "dock") {
    const dockItems = destinations.slice(0, 5).map((d) => ({
      icon: d.icon,
      label: d.shortLabel || d.label,
      onClick: () => {
        onTabChange?.(d.id);
      },
      href: d.href,
    }));
    const activeItem = destinations.find((d) => d.id === currentTab);
    return (
      <div
        className={`fixed bottom-3 inset-x-0 z-50 pointer-events-none flex justify-center px-4 ${className}`}
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0px)",
        }}
      >
        <div className="pointer-events-auto">
          <Dock
            items={dockItems}
            activeLabel={activeItem ? activeItem.shortLabel || activeItem.label : undefined}
            className="py-0"
          />
        </div>
      </div>
    );
  }

  return (
    <nav
      role="navigation"
      aria-label="Bottom Navigation"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)",
      }}
      className={`fixed bottom-0 inset-x-0 z-50 select-none ${
        variant === "ios"
          ? "bg-white/90 dark:bg-[#120B0D]/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/10 shadow-[0_-1px_3px_rgba(0,0,0,0.04)]"
          : "bg-[#F3EDF7] dark:bg-[#211F26] border-t border-slate-200 dark:border-slate-800 shadow-lg"
      } ${className}`}
    >
      {/* Tab Items: 4 Destinations of Equal Importance (flex-1 / grid-cols-4) */}
      <ul className="grid grid-cols-4 items-stretch h-12 sm:h-14 max-w-md mx-auto list-none p-0 m-0">
        {destinations.slice(0, 4).map((dest) => {
          const Icon = dest.icon;
          const isActive = currentTab === dest.id;
          const isInbox = dest.id === "inbox";
          const count = isInbox ? (dest.badgeCount ?? inboxBadgeCount) : dest.badgeCount;

          const content = (
            <div className="flex flex-col items-center justify-center w-full h-full py-1 text-center relative group">
              {/* Material 3 active pill background */}
              {variant === "material3" && isActive && (
                <div
                  aria-hidden="true"
                  className="absolute top-1.5 h-7 w-12 sm:w-14 rounded-full bg-[#800020]/15 dark:bg-[#E5B869]/20 -z-0"
                />
              )}

              {/* Icon Container with relative position for Badge */}
              <div className="relative z-10 flex items-center justify-center">
                <Icon
                  strokeWidth={isActive ? 2.3 : 1.8}
                  className={`h-5 w-5 transition-transform duration-150 ${
                    isActive
                      ? "text-[#800020] dark:text-[#E5B869] scale-105"
                      : "text-slate-400 dark:text-stone-400 group-hover:text-slate-600 dark:group-hover:text-stone-300"
                  }`}
                  aria-hidden="true"
                />

                {/* Count Badge on Inbox (tabBarBadge / .badge(_:)) */}
                {count !== undefined && count > 0 && (
                  <span
                    aria-label={`${count} unread notifications`}
                    className="absolute -top-1 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#FF3B30] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs border-2 border-white dark:border-[#120B0D] leading-none"
                  >
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </div>

              {/* Short Label below Icon */}
              <span
                className={`relative z-10 text-[10px] tracking-tight mt-0.5 leading-none transition-colors duration-150 ${
                  isActive
                    ? "text-[#800020] dark:text-[#E5B869] font-bold"
                    : "text-slate-400 dark:text-stone-400 font-medium"
                }`}
              >
                {dest.shortLabel || dest.label}
              </span>
            </div>
          );

          return (
            <li key={dest.id} className="flex">
              {dest.href ? (
                <Link
                  href={dest.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    if (onTabChange) {
                      onTabChange(dest.id);
                    }
                  }}
                  className="w-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-lg transition-colors cursor-pointer"
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onTabChange?.(dest.id)}
                  className="w-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-lg transition-colors cursor-pointer"
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PHONE TAB VIEW (SWIFTUI TABVIEW / UITABBARCONTROLLER REPLICA)
   - Holds 4 destinations
   - Switches the screen above WITHOUT any push or slide animation
   - Instant zero-latency tab swap
   ───────────────────────────────────────────────────────────────────────────── */
export interface PhoneTabViewProps {
  initialTabId?: string;
  inboxBadgeCount?: number;
  destinations?: TabDestination[];
  variant?: "ios" | "material3" | "dock";
  className?: string;
}

export function PhoneTabView({
  initialTabId = "home",
  inboxBadgeCount = 3,
  destinations,
  variant = "ios",
  className = "",
}: PhoneTabViewProps) {
  const [activeTab, setActiveTab] = useState(initialTabId);

  // Default rich screens if none provided
  const tabScreens: Record<string, React.ReactNode> = {
    home: (
      <div className="p-4 space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#800020] to-[#5a0016] text-white p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#E5B869] uppercase tracking-wider">
            साहित्य निकेतन ग्रंथालय
          </p>
          <h2 className="text-xl font-black mt-1">Home Screen</h2>
          <p className="text-xs text-white/80 mt-1">
            Welcome to the library portal. 39,953+ rare books and historical manuscripts.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">Total Books</span>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">39,953</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">Founded</span>
            <p className="text-2xl font-black text-[#800020] dark:text-rose-400 mt-1">1945</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Featured Reading Hall</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Open daily for research scholars, MPSC students, and passionate readers.
          </p>
        </div>
      </div>
    ),
    inbox: (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Inbox</h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FF3B30] text-white">
            {inboxBadgeCount} Unread
          </span>
        </div>

        {[
          {
            title: "वाचन प्रेरणा दिन विशेष परिपत्रक",
            desc: "डॉ. ए. पी. जे. अब्दुल कलाम जयंतीनिमित्त वाचन कट्टा कार्यक्रम...",
            time: "10m ago",
            unread: true,
          },
          {
            title: "नवीन ग्रंथ आगमन: ऑगस्ट २०२६",
            desc: "इतिहास व सामाजिक शास्त्रांमधील २५० नवीन ग्रंथ समाविष्ट...",
            time: "2h ago",
            unread: true,
          },
          {
            title: "वार्षिक सभासदत्व नूतनीकरण सूचना",
            desc: "आपले सभासदत्व चालू ठेवण्यासाठी कृपया ग्रंथालयात संपर्क साधा...",
            time: "1d ago",
            unread: true,
          },
          {
            title: "साहित्य निकेतन मासिक पत्रिका",
            desc: "मागील महिन्यातील साहित्यिक कार्यक्रमांचा गोषवारा...",
            time: "3d ago",
            unread: false,
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-xl border transition-all ${
              item.unread
                ? "bg-white dark:bg-slate-900 border-[#800020]/30 shadow-xs"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                {item.unread && <span className="h-2 w-2 rounded-full bg-[#FF3B30]" />}
                {item.title}
              </h4>
              <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    ),
    catalogue: (
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Library Catalogue</h2>
          <p className="text-xs text-slate-500">Search over 39,953 printed books & rare manuscripts</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search title, author or subject..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#800020]"
          />
        </div>

        <div className="space-y-2">
          {[
            { title: "विवेकसिंधू", author: "आद्यकवी मुकुंदराज", year: "११व्या शतक", lang: "मराठी" },
            { title: "दासोपंत पासोडी", author: "संत दासोपंत", year: "१६व्या शतक", lang: "मराठी" },
            { title: "हैदराबाद मुक्ती लढा", author: "अनंत भालेराव", year: "१९८२", lang: "मराठी" },
          ].map((book, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{book.title}</h4>
                <p className="text-[11px] text-slate-400">{book.author} · {book.year}</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                {book.lang}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    profile: (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="h-12 w-12 rounded-full bg-[#800020] text-white flex items-center justify-center font-bold text-base">
            SN
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">साहित्य निकेतन वाचक</h3>
            <p className="text-xs text-slate-400">सभासद क्र. #SN-4920</p>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="p-3.5 flex items-center justify-between font-bold text-slate-700 dark:text-slate-200">
            <span>सध्या घेतलेली पुस्तके</span>
            <span className="text-[#800020]">२ पुस्तके</span>
          </div>
          <div className="p-3.5 flex items-center justify-between font-bold text-slate-700 dark:text-slate-200">
            <span>वाचलेली पुस्तके</span>
            <span>२८ पुस्तके</span>
          </div>
          <div className="p-3.5 flex items-center justify-between font-bold text-slate-700 dark:text-slate-200">
            <span>सभासदत्व मुदत</span>
            <span className="text-emerald-600">३१ मार्च २०२७</span>
          </div>
        </div>
      </div>
    ),
  };

  const currentDestinations = destinations || DEFAULT_PHONE_DESTINATIONS;

  return (
    <div className={`relative flex flex-col w-full h-full min-h-screen bg-[#F8F9FA] dark:bg-slate-950 font-sans ${className}`}>
      {/* 
        SWITCH THE SCREEN ABOVE WITHOUT ANY PUSH ANIMATION
        Instant display switch without push/slide transitions
      */}
      <main
        className="flex-1 overflow-y-auto"
        style={{
          // Pad bottom to clear tab bar + iPhone home indicator
          paddingBottom: "calc(3.5rem + max(env(safe-area-inset-bottom, 0px), 12px))",
        }}
      >
        {currentDestinations.map((dest) => {
          const isSelected = activeTab === dest.id;
          // Keep mounted or instant swap with NO animation
          return (
            <div
              key={dest.id}
              role="tabpanel"
              id={`tabpanel-${dest.id}`}
              aria-labelledby={`tab-${dest.id}`}
              hidden={!isSelected}
              style={{ display: isSelected ? "block" : "none" }}
            >
              {dest.screen || tabScreens[dest.id] || (
                <div className="p-6 text-center text-sm text-slate-400">
                  {dest.label} Screen
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* Fixed Bottom Tab Bar */}
      <PhoneBottomNavBar
        activeTabId={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
        inboxBadgeCount={inboxBadgeCount}
        destinations={currentDestinations}
        variant={variant}
      />
    </div>
  );
}
