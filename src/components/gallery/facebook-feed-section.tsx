"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FacebookIcon } from "@/components/ui/icons";
import { ExternalLink, RefreshCw, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const FB_PAGE_URL =
  "https://www.facebook.com/p/%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF-%E0%A4%A8%E0%A4%BF%E0%A4%95%E0%A5%87%E0%A4%A4%E0%A4%A8-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%82%E0%A4%A5%E0%A4%BE%E0%A4%B2%E0%A4%AF-%E0%A4%85%E0%A4%82%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A5%8B%E0%A4%97%E0%A4%BE%E0%A4%88-100083041525325/";

const FB_PLUGIN_SRC = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_PAGE_URL
)}&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=`;

export function FacebookFeedSection() {
  const { language } = useLanguage();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  const isEn = language === "en";
  const isHi = language === "hi";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 font-marathi-body">
      {/* Intro Top Callout Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 rounded-2xl bg-gradient-to-r from-[#1877F2]/10 via-[#800020]/5 to-[#D4A373]/15 dark:from-[#1877F2]/20 dark:via-[#331118] dark:to-[#D4A373]/10 border border-[#1877F2]/30 dark:border-[#1877F2]/40 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1877F2] text-white shadow-sm">
              <FacebookIcon className="w-3.5 h-3.5 fill-current" />
              <span>
                {isEn ? "Official Facebook Page" : isHi ? "आधिकारिक फेसबुक पृष्ठ" : "अधिकृत फेसबुक पृष्ठ"}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isEn ? "Live Feed" : isHi ? "लाइव फीड" : "थेट प्रवाह"}</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-marathi-heading text-stone-900 dark:text-[#FAF2E8]">
            {isEn
              ? "Sahitya Niketan Daily Moments & Activities"
              : isHi
              ? "साहित्य निकेतन के दैनिक छायाचित्र एवं गतिविधियाँ"
              : "साहित्य निकेतनचे दैनंदिन क्षणचित्रे व उपक्रम"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {isEn
              ? "Live moments from ongoing library programs, exhibitions, and reader sessions directly from our Facebook page."
              : isHi
              ? "पुस्तकालय के चालू कार्यक्रम, ग्रन्थ प्रदर्शनी, एवं वाचक मंच के ताजे छायाचित्र सीधे फेसबुक से।"
              : "ग्रंथालयातील चालू कार्यक्रम, ग्रंथ प्रदर्शन आणि वाचक कट्ट्याचे ताजे क्षणचित्रे थेट फेसबुकवरून."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/80 transition-colors cursor-pointer shadow-xs font-marathi-body"
            title={isEn ? "Refresh feed" : isHi ? "फीड रिफ्रेश करें" : "फीड रिफ्रेश करा"}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isEn ? "Refresh" : isHi ? "रिफ्रेश" : "रिफ्रेश"}</span>
          </button>

          <a
            href={FB_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-md hover:shadow-lg transition-all cursor-pointer group font-marathi-body"
          >
            <span>{isEn ? "Visit Facebook Page" : isHi ? "फेसबुक पेज देखें" : "फेसबुक पेजला भेट द्या"}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>

      {/* Main Centered Live Stream Showcase */}
      <div className="flex justify-center">
        <div className="w-full max-w-[540px] rounded-2xl overflow-hidden border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl transition-all relative">
          {/* Window Header bar */}
          <div className="px-4 py-3 bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-bold text-stone-600 dark:text-stone-400 font-mono ml-2">
                facebook.com/sahityaniketan
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-semibold font-marathi-body">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] animate-ping" />
              <span>{isEn ? "Live" : isHi ? "लाइव" : "लाइव्ह"}</span>
            </div>
          </div>

          {/* Iframe Loading Skeleton */}
          {!iframeLoaded && (
            <div className="w-full h-[650px] sm:h-[750px] flex flex-col items-center justify-center p-8 bg-stone-50 dark:bg-stone-900/60 text-center space-y-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2]">
                  <FacebookIcon className="w-7 h-7 fill-current" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-stone-800 dark:text-stone-200 font-marathi-heading">
                  {isEn
                    ? "Loading Live Feed..."
                    : isHi
                    ? "लाइव फीड लोड हो रही है..."
                    : "फेसबुक लाइव्ह फीड लोड होत आहे..."}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs font-marathi-body">
                  {isEn
                    ? "Connecting to the official Sahitya Niketan Facebook page."
                    : isHi
                    ? "साहित्य निकेतन के आधिकारिक फेसबुक पृष्ठ से सीधा संपर्क स्थापित किया जा रहा है।"
                    : "साहित्य निकेतनचे अधिकृत फेसबुक पृष्ठ थेट जोडले जात आहे."}
                </p>
              </div>
              <div className="w-36 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#1877F2] rounded-full animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>
          )}

          {/* Facebook Page Plugin Iframe */}
          <div className={`w-full overflow-hidden flex justify-center bg-white ${!iframeLoaded ? "hidden" : "block"}`}>
            <iframe
              key={iframeKey}
              src={FB_PLUGIN_SRC}
              width="500"
              height="800"
              style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Sahitya Niketan Facebook Live Feed"
              onLoad={() => setIframeLoaded(true)}
              className="w-full min-h-[750px] max-w-full"
            />
          </div>

          {/* Clean Direct Link Footer */}
          <div className="px-4 py-3 bg-stone-50 dark:bg-stone-950/80 border-t border-stone-200 dark:border-stone-800 text-center">
            <a
              href={FB_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#1877F2] hover:underline inline-flex items-center gap-1.5 font-marathi-body"
            >
              <FacebookIcon className="w-3.5 h-3.5 fill-current" />
              <span>
                {isEn
                  ? "Open Sahitya Niketan on Facebook"
                  : isHi
                  ? "साहित्य निकेतन सीधे फेसबुक पर खोलें"
                  : "साहित्य निकेतन थेट फेसबुकवर उघडा"}
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
