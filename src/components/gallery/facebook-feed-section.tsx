"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FacebookIcon } from "@/components/ui/icons";
import { ExternalLink, RefreshCw, Sparkles, ShieldAlert, Heart, Calendar, ArrowUpRight } from "lucide-react";

const FB_PAGE_URL =
  "https://www.facebook.com/p/%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF-%E0%A4%A8%E0%A4%BF%E0%A4%95%E0%A5%87%E0%A4%A4%E0%A4%A8-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%82%E0%A4%A5%E0%A4%BE%E0%A4%B2%E0%A4%AF-%E0%A4%85%E0%A4%82%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A5%8B%E0%A4%97%E0%A4%BE%E0%A4%88-100083041525325/";

const FB_PLUGIN_SRC = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_PAGE_URL
)}&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=`;

export function FacebookFeedSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 font-marathi-body">
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
              <span>अधिकृत फेसबुक पृष्ठ</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>थेट प्रवाह (Live Stream)</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-marathi-heading text-stone-900 dark:text-[#FAF2E8]">
            साहित्य निकेतनचे दैनंदिन फोटो व उपक्रम
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            ग्रंथालयातील चालू कार्यक्रम, ग्रंथ प्रदर्शन, मोडी लिपी कार्यशाळा आणि वाचक कट्ट्याचे ताजे फोटो व व्हिडिओ थेट फेसबुकवरून येथे प्रदर्शित होतात.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/80 transition-colors cursor-pointer shadow-xs"
            title="फीड रिफ्रेश करा"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>रिफ्रेश</span>
          </button>

          <a
            href={FB_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>फेसबुक पेजला भेट द्या</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>

      {/* Main Grid: Feed on Left/Center + Information Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Embedded Facebook Feed Container */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-[540px] rounded-2xl overflow-hidden border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl transition-all relative">
            {/* Window-like Header bar */}
            <div className="px-4 py-3 bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-bold text-stone-600 dark:text-stone-400 font-marathi-heading ml-2">
                  facebook.com/sahityaniketan
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] animate-ping" />
                <span>लाइव्ह</span>
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
                  <p className="font-bold text-sm text-stone-800 dark:text-stone-200">
                    फेसबुक लाइव्ह फीड लोड होत आहे...
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                    साहित्य निकेतनचे अधिकृत फेसबुक पृष्ठ थेट जोडले जात आहे.
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

            {/* Bottom Notice & Direct Fallback Bar */}
            <div className="px-4 py-3 bg-stone-50 dark:bg-stone-950/80 border-t border-stone-200 dark:border-stone-800 text-center">
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                फीड दिसत नसल्यास ब्राऊझरचे ॲड-ब्लॉकर बंद करा किंवा{" "}
                <a
                  href={FB_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1877F2] hover:underline inline-flex items-center gap-0.5"
                >
                  थेट फेसबुकवर उघडा
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Information, Follow benefits & Highlights */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Official Page Bio Card */}
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#800020] text-white flex items-center justify-center font-bold text-lg font-gajraj shadow-sm">
                सा
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-white font-marathi-heading">
                  साहित्य निकेतन ग्रंथालय
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  अंबाजोगाई • स्था. १९४५ • 'अ' वर्ग मान्यता
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-b border-stone-100 dark:border-stone-800 py-3">
              मराठवाड्यातील एक अग्रगण्य व ८० वर्षांची समृद्ध परंपरा असलेले सार्वजनिक ग्रंथालय. ग्रंथालयाचे सर्व कार्यक्रम, व्याख्यानमाला आणि स्पर्धांचे क्षणचित्रे येथे नियमित प्रसिद्ध केली जातात.
            </p>

            <a
              href={FB_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#1877F2] hover:bg-[#166FE5] transition-colors shadow-sm"
            >
              <FacebookIcon className="w-4 h-4 fill-current" />
              <span>फेसबुकवर फॉलो करा (Follow)</span>
            </a>
          </div>

          {/* Feature Highlights Card */}
          <div className="rounded-2xl border border-[#D4A373]/40 dark:border-[#D4A373]/20 bg-[#FAF8F5] dark:bg-[#181114] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#800020] dark:text-[#E5B869] font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <h4>फेसबुकवर काय पाहायला मिळते?</h4>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#B8860B] mt-0.5 shrink-0" />
                <span>
                  <strong>तात्काळ कार्यक्रम अपडेट्स:</strong> दर आठवड्याला होणारे कवी संमेलन, व्याख्यानमाला आणि जयंती सोहळ्यांचे थेट वृत्तांत.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-[#800020] dark:text-rose-400 mt-0.5 shrink-0" />
                <span>
                  <strong>वाचक व विद्यार्थ्यांचे अनुभव:</strong> अभ्यासिका, बाल वाचन कट्टा आणि स्पर्धा परीक्षा मार्गदर्शन वर्गातील छायाचित्रे.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  <strong>नवीन ग्रंथ आगमन:</strong> ग्रंथालयात नव्याने दाखल झालेल्या दर्जेदार पुस्तकांची माहिती व कव्हर फोटो.
                </span>
              </li>
            </ul>
          </div>

          {/* Privacy & Adblock Note */}
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-4 text-xs text-stone-500 dark:text-stone-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-stone-700 dark:text-stone-300">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>तांत्रिक टीप (Technical Note)</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              काही ब्राऊझर्समध्ये (Brave, Firefox किंवा AdBlocker सक्रिय असल्यास) फेसबुक विजेट लोड होण्यास अडचण येऊ शकते. अशा वेळी वरील 'फेसबुक पेजला भेट द्या' बटण वापरून थेट फेसबुक ॲपमध्ये सर्व पोस्ट्स पाहता येतील.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
