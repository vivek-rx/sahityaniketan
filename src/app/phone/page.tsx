"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneBottomNavBar,
  PhoneTabView,
  DEFAULT_PHONE_DESTINATIONS,
} from "@/components/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  Smartphone,
  Sliders,
  Check,
  Bell,
  Sparkles,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

export default function PhoneDemoPage() {
  const [variant, setVariant] = useState<"ios" | "material3" | "dock">("dock");
  const [badgeCount, setBadgeCount] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="mb-2">
              <Breadcrumbs />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 mt-1 flex items-center gap-2.5">
              <Smartphone className="h-7 w-7 text-[#800020] dark:text-rose-400" />
              Bottom Navigation Bar (Phone Tab Bar)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Interactive 3D Arc Dock · iOS UITabBar · Material 3 NavigationBar
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Style Variant Toggle */}
            <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setVariant("dock")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  variant === "dock"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Arc Dock
              </button>
              <button
                type="button"
                onClick={() => setVariant("ios")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  variant === "ios"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                iOS UITabBar
              </button>
              <button
                type="button"
                onClick={() => setVariant("material3")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  variant === "material3"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Material 3
              </button>
            </div>

            {/* Badge Count Toggle */}
            <div className="flex items-center gap-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="text-slate-400">Inbox Badge:</span>
              {[1, 3, 5, 12].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBadgeCount(num)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer ${
                    badgeCount === num
                      ? "bg-[#FF3B30] text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Verification Checkmarks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2 shadow-2xs">
            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">4 Equal Destinations</p>
              <p className="text-[11px] text-slate-400">Icon above short label</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2 shadow-2xs">
            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Tinted Active Tab</p>
              <p className="text-[11px] text-slate-400">Others muted</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2 shadow-2xs">
            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Inbox tabBarBadge</p>
              <p className="text-[11px] text-slate-400">.badge({badgeCount}) count badge</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2 shadow-2xs">
            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Zero Push Animation</p>
              <p className="text-[11px] text-slate-400">Instant screen switch</p>
            </div>
          </div>
        </div>

        {/* Center: Realistic iPhone Screen Simulator */}
        <div className="flex justify-center items-center py-4">
          <div className="relative w-full max-w-[390px] h-[780px] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-slate-800 border-4 border-slate-800">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            {/* iPhone Status Bar */}
            <div className="absolute top-5 inset-x-8 flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-200 z-30 select-none pointer-events-none">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <span className="w-4 h-2.5 rounded-xs border border-current flex items-center p-0.5">
                  <span className="w-full h-full bg-current rounded-3xs" />
                </span>
              </div>
            </div>

            {/* Inner Phone Display Container */}
            <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-[#FAF6F0] dark:bg-[#120B0D] flex flex-col pt-12">

              {/* Top Navigation Bar of the Mockup Screen */}
              <div className="px-5 py-3 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between shrink-0 bg-white/70 dark:bg-[#120B0D]/70 backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#800020] dark:text-[#E5B869]">
                    साहित्य निकेतन
                  </p>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-50">
                    {activeTab === "home" && "मुख्यपृष्ठ (Home)"}
                    {activeTab === "inbox" && "इनबॉक्स (Inbox)"}
                    {activeTab === "catalogue" && "ग्रंथसूची (Catalogue)"}
                    {activeTab === "profile" && "सभासद खाते (Profile)"}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {variant.toUpperCase()}
                </span>
              </div>

              {/* Screen Content: Instant Swapping without Any Push Animation */}
              <div className="flex-1 overflow-y-auto">
                <PhoneTabView
                  initialTabId={activeTab}
                  inboxBadgeCount={badgeCount}
                  variant={variant}
                />
              </div>

              {/* iPhone Home Indicator Clearance Overlay */}
              <div className="absolute bottom-1 inset-x-0 h-4 flex items-center justify-center pointer-events-none z-50">
                <div className="w-32 h-1 bg-black/40 dark:bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Implementation Summary */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">
            Web & Phone Standards Compliance:
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>
              <strong>Semantic Web Navigation</strong>: Uses <code className="text-[#800020]">&lt;nav aria-label=&quot;Bottom Navigation&quot;&gt;</code> with <code className="text-[#800020]">aria-current=&quot;page&quot;</code> on the active link.
            </li>
            <li>
              <strong>iOS Safe Area Clearance</strong>: Styled with <code className="text-[#800020]">padding-bottom: max(env(safe-area-inset-bottom, 0px), 8px)</code> ensuring icons and labels sit cleanly above the iPhone home indicator.
            </li>
            <li>
              <strong>Zero-Push TabView</strong>: Screen switcher above updates synchronously with zero horizontal translation or push/pop transitions, matching native UIKit <code className="text-[#800020]">UITabBarController</code> and SwiftUI <code className="text-[#800020]">TabView</code>.
            </li>
            <li>
              <strong>Accessible Inbox Badge</strong>: Notification badge includes <code className="text-[#800020]">aria-label=&quot;3 unread notifications&quot;</code> for screen readers and high contrast.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
