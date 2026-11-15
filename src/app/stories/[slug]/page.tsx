"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, Breadcrumbs } from "@/components/layout";
import {
  Calendar,
  Eye,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  MessageCircle,
  BookOpen,
  User,
} from "lucide-react";
import { FacebookIcon } from "@/components/ui/icons";
import { useLanguage } from "@/context/language-context";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";
import { getPostBySlug } from "@/lib/actions/posts";
import { SITE_URL } from "@/lib/site";
import type { Post } from "@/types/database";
import { BobbingDots } from "@/components/ui/bobbing-dots";

;

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { language } = useLanguage();

const [story, setStory] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadStory() {
      if (!slug) return;
      try {
        const data = await getPostBySlug(slug);
        setStory(data || null);
      } catch (err) {
        setStory(null);
      } finally {
        setLoading(false);
      }
    }
    loadStory();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="min-h-[60vh] flex items-center justify-center font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D]">
          <div className="text-center space-y-4">
            <BobbingDots size="lg" className="text-[#800020] dark:text-[#E5B869] mx-auto" />
            <p className="text-xs text-stone-500 dark:text-stone-400">लेख उघडत आहे...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!story) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="min-h-[60vh] flex items-center justify-center font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] p-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-8 space-y-4">
            <BookOpen className="h-10 w-10 text-stone-400 mx-auto" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              {language === "en" ? "Article Not Found" : language === "hi" ? "लेख नहीं मिला" : "लेख सापडला नाही"}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {language === "en"
                ? "This article may be unpublished or its address may have changed."
                : language === "hi"
                  ? "यह लेख अप्रकाशित हो सकता है या उसका पता बदल गया होगा।"
                  : "हा लेख अप्रकाशित असू शकतो किंवा त्याचा पत्ता बदलला गेला आहे."}
            </p>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-lg bg-[#800020] text-white px-4 py-2 text-xs font-bold hover:bg-[#66001A] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{language === "en" ? "Back to All Articles" : language === "hi" ? "सभी लेखों पर वापस" : "सर्व लेखांकडे परत जा"}</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : `${SITE_URL}/stories/${slug}`;
  const dateStr = story.published_at
    ? new Date(story.published_at).toLocaleDateString("mr-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "अद्ययावत";

  // 3-line teaser formulation for Facebook sharing
  const teaserText = story.excerpt || (story.content ? story.content.slice(0, 180) : "");
  const fbShareCaption = `${story.title}\n\n${teaserText}\n\n📖 खालील लिंकवर क्लिक करून संपूर्ण लेख वाचा:\n${currentUrl}`;

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(fbShareCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(fbShareCaption)}`;
    window.open(fbUrl, "_blank", "width=640,height=550");
  };

  const shareToWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fbShareCaption)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] transition-colors py-8 sm:py-12">
        <div className="section max-w-4xl mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <Breadcrumbs
              items={[
                { label: "वाचन व लेख", href: "/stories" },
                { label: story.title },
              ]}
            />
            <Link
              href="/stories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-[#800020] dark:hover:text-[#E5B869] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>सर्व लेख</span>
            </Link>
          </div>

          {/* Article Header Card */}
          <div className="bg-white dark:bg-[#1E1418] rounded-3xl border border-[#E5DDD0] dark:border-[#332228] shadow-sm overflow-hidden mb-8">
            {/* Cover Image */}
            <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full bg-stone-100 dark:bg-stone-800">
              <Image
                src={story.thumbnail_url || "/images/real/library_vintage_books.png"}
                alt={story.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 text-white">
                <span className="rounded-full bg-[#800020] text-white px-3 py-1 text-xs font-bold shadow-xs inline-block mb-2">
                  {story.category === "blog" ? "साहित्य विचार" : "ग्रंथालय रोजनिशी"}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight font-marathi-heading drop-shadow-md">
                  {story.title}
                </h1>
              </div>
            </div>

            {/* Meta Strip */}
            <div className="p-4 sm:px-8 border-b border-[#E5DDD0] dark:border-[#332228] flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-4 w-4 text-[#B8860B] dark:text-[#E5B869]" />
                  <span>{dateStr}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{story.views || 1} वाचकांनी वाचले</span>
                </span>
              </div>

              {/* Share Trigger Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={shareToWhatsApp}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  title="Share to WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>व्हॉट्सॲप</span>
                </button>

                <button
                  onClick={shareToFacebook}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  title="Share to Facebook"
                >
                  <FacebookIcon className="h-3.5 w-3.5 fill-current" />
                  <span>फेसबुक</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#25181C] hover:bg-[#800020]/10 text-stone-700 dark:text-stone-200 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                  title="Copy link"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "लिंक कॉपी झाली!" : "लिंक कॉपी करा"}</span>
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-6 sm:p-10 space-y-6 text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base font-marathi-body">
              {story.excerpt && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#800020]/5 dark:bg-[#800020]/20 border-l-4 border-[#800020] text-stone-800 dark:text-[#FAF2E8] text-sm sm:text-base font-medium italic">
                  {story.excerpt}
                </div>
              )}

              <div className="whitespace-pre-line space-y-4">
                {story.content || "लेखाचा तपशील लवकरच अद्ययावत केला जाईल."}
              </div>
            </div>

            {/* Bottom Sharing Callout Card */}
            <div className="m-6 sm:m-10 p-5 rounded-2xl bg-[#F3ECE3] dark:bg-[#180E11] border border-[#E5DDD0] dark:border-[#332228] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                  {language === "en" ? "Share this article" : language === "hi" ? "यह लेख साझा करें" : "हा लेख इतरांसोबत शेअर करा"}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {language === "en"
                    ? "Spread the wealth of literature and knowledge with fellow readers."
                    : language === "hi"
                    ? "साहित्य एवं अध्ययन प्रेमियों के साथ ज्ञान का यह प्रवाह साझा करें।"
                    : "ज्ञान व वाचन संस्कृतीचा हा वारसा आपल्या मित्र-परिवारासोबत नक्की शेअर करा."}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
                <button
                  onClick={shareToWhatsApp}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white px-3.5 py-2 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{language === "en" ? "WhatsApp" : "व्हॉट्सॲप"}</span>
                </button>
                <button
                  onClick={shareToFacebook}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white px-3.5 py-2 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <FacebookIcon className="h-4 w-4 fill-current" />
                  <span>{language === "en" ? "Facebook" : "फेसबुक"}</span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] hover:bg-[#800020]/10 text-stone-700 dark:text-stone-200 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? (language === "en" ? "Copied!" : "कॉपी झाली!") : (language === "en" ? "Copy Link" : "लिंक कॉपी")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
