"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/context/language-context";

/**
 * Cookie-consent card (adapted from Uiverse.io by ilkhoeri).
 * Trilingual chrome; consent stored in localStorage ("sn_cookie_consent").
 * Accepting also enables the client-side preference cookie that powers the
 * faster repeat visits (language, wishlist and reading-list persistence).
 */
const CONSENT_KEY = "sn_cookie_consent";

export function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && !localStorage.getItem(CONSENT_KEY)) {
      // gentle delay so it never blocks the first paint or CLS measurement
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    // 1-year preference cookie for faster personalised repeat visits
    document.cookie = `sn_consent=accepted; max-age=31536000; path=/; samesite=lax`;
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem(CONSENT_KEY, "dismissed");
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  const t = {
    title:
      language === "en"
        ? "Your privacy is important to us"
        : language === "hi"
          ? "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है"
          : "आपली गोपनीयता आमच्यासाठी महत्त्वाची आहे",
    body:
      language === "en"
        ? "We use cookies to make the website faster and to remember your language, wishlist and reading-list between visits."
        : language === "hi"
          ? "वेबसाइट को तेज़ बनाने और आपकी भाषा, विशलिस्ट व वाचन-सूची याद रखने के लिए हम कुकीज़ का उपयोग करते हैं।"
          : "वेबसाइट जलद करण्यासाठी आणि आपली भाषा, विशलिस्ट व वाचन-यादी लक्षात ठेवण्यासाठी आम्ही कुकीज वापरतो.",
    policy:
      language === "en"
        ? "Privacy Policy"
        : language === "hi"
          ? "गोपनीयता नीति"
          : "गोपनीयता धोरण",
    more:
      language === "en"
        ? "More Options"
        : language === "hi"
          ? "अधिक विकल्प"
          : "अधिक पर्याय",
    accept:
      language === "en" ? "Accept" : language === "hi" ? "स्वीकारें" : "स्वीकारा",
  };

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="fixed bottom-5 left-5 z-[60] w-[calc(100vw-2.5rem)] max-w-[320px] rounded-2xl bg-white dark:bg-[#1E1418] [box-shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] border border-[#E5DDD0] dark:border-[#332228] animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex flex-col items-start justify-between pt-9 px-6 pb-6 relative">
        <span className="absolute -top-6 left-6 h-12 w-12 rounded-2xl bg-[#800020] dark:bg-[#5E0017] border border-[#E5B869]/50 shadow-md flex items-center justify-center">
          <Cookie className="h-5 w-5 text-[#E5B869]" />
        </span>

        <h5 className="text-sm font-semibold mb-2 text-left mr-auto text-stone-700 dark:text-stone-200 font-marathi-heading">
          {t.title}
        </h5>

        <p className="w-full mb-4 text-xs leading-relaxed text-stone-600 dark:text-stone-400 text-left font-marathi-body">
          {t.body}{" "}
          <Link
            href="/privacy"
            className="font-semibold text-[#800020] dark:text-[#E5B869] underline underline-offset-2 hover:text-[#66001A] dark:hover:text-[#FAF2E8] transition-colors"
          >
            {t.policy}
          </Link>
        </p>

        <div className="flex w-full items-center justify-between gap-3">
          <button
            type="button"
            onClick={dismiss}
            className="text-xs font-semibold text-stone-500 dark:text-stone-400 hover:underline underline-offset-2 cursor-pointer font-marathi-body"
          >
            {t.more}
          </button>
          <button
            type="button"
            onClick={accept}
            className="py-2 px-6 text-xs font-semibold rounded-lg transition-colors bg-[#E5B869] text-[#4A000E] hover:bg-[#800020] hover:text-white cursor-pointer font-marathi-body"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
