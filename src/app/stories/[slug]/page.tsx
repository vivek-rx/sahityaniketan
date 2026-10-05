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
import type { Post } from "@/types/database";
import { BobbingDots } from "@/components/ui/bobbing-dots";

const DEFAULT_MAP: Record<string, any> = {
  "ambajogai-literary-heritage-mukundraj-dasopant": {
    id: "default-1",
    title: "अंबाजोगाईची ज्ञानसाधना: आद्यकवी मुकुंदराज व संत दासोपंतांचा समृद्ध वारसा",
    slug: "ambajogai-literary-heritage-mukundraj-dasopant",
    category: "blog",
    thumbnail_url: "/images/real/library_vintage_books.png",
    excerpt: "अंबाजोगाई ही मराठी साहित्याची पावन जन्मभूमी मानली जाते. याच मातीत आद्यकवी मुकुंदराज यांनी मराठीतील पहिला ग्रंथ विवेकसिंधू लिहिला. संत दासोपंतांच्या पदस्पर्शाने पुनीत झालेल्या या साहित्यनगरीत ग्रंथ चळवळ कशी बहरली याचा हा विशेष मागोवा...",
    content: `अंबाजोगाई ही मराठी भाषेची आणि साहित्याची अधिकृत जन्मभूमी मानली जाते. इसवी सनाच्या १२ व्या शतकात आद्यकवी मुकुंदराज यांनी याच पावन भूमीत मराठीतील पहिला तत्त्वज्ञानपर ग्रंथ 'विवेकसिंधू' लिहिला आणि मराठीला ज्ञानभाषेचा अद्वितीय दर्जा मिळवून दिला.

त्यानंतर संत दासोपंतांनी अखंड साहित्यसाधना करून सव्वा लाख पदांची रचना केली. त्यांची 'पासोडी' ही वस्त्रग्रंथ निर्मिती जगभरातील संशोधकांसाठी आजही अभ्यासाचा विषय आहे.

याच महान परंपरेचे जतन आणि संवर्धन करण्याचे पवित्र कार्य साहित्य निकेतन ग्रंथालय गेल्या ८०+ वर्षांपासून अविरतपणे करत आहे. ग्रंथालयात उपलब्ध असलेले प्राचीन संदर्भग्रंथ, मोडी लिपीतील ऐतिहासिक कागदपत्रे आणि मराठी साहित्याचा खजिना नव्या पिढीला प्रेरणा देत आहे.

वाचन संस्कृती ही समाजाची वैचारिक ताकद असते. साहित्य निकेतन ग्रंथालयाचे मुक्तद्वार दालन, स्पर्धा परीक्षा अभ्यासिका आणि बाल वाचन कट्टा या त्रिसूत्रीतून ही संस्कृती सातत्याने वृद्धिंगत होत आहे.`,
    published_at: "2026-09-17T12:51:12.436Z",
    views: 142,
  },
  "80-years-of-sahitya-niketan-ambajogai": {
    id: "default-2",
    title: "वाचन संस्कृतीची ८० वर्षे: १ ऑगस्ट १९४५ पासूनचा गौरवशाली ग्रंथालय प्रवास",
    slug: "80-years-of-sahitya-niketan-ambajogai",
    category: "news",
    thumbnail_url: "/images/real/library_inauguration_plaque.png",
    excerpt: "१ ऑगस्ट १९४५ रोजी स्थापन झालेले साहित्य निकेतन ग्रंथालय आज मराठवाड्यातील अग्रगण्य सार्वजनिक वाचनालय ठरले आहे. ३९,९५३ ग्रंथांचा अमूल्य संग्रह आणि स्पर्धा परीक्षा अभ्यासिकेच्या माध्यमातून हजारो युवकांना घडविणारे हे ज्ञानतीर्थ...",
    content: `१ ऑगस्ट १९४५ रोजी अंबाजोगाईच्या मध्यवस्तीतील शुक्रवार पेठेत सुरू झालेले साहित्य निकेतन ग्रंथालय आज महाराष्ट्र शासनाचे वर्ग 'अ' दर्जाचे अग्रगण्य सार्वजनिक ग्रंथालय म्हणून दिमाखात उभे आहे.

हैदराबाद संस्थानातील रझाकार आणि निजामशाहीच्या जुलमी राजवटीत जेव्हा मराठी भाषा, संस्कृती आणि वाचनालयांवर बंधने लादली जात होती, तेव्हा अंबाजोगाईतील देशभक्त विचारवंतांनी व स्वातंत्र्यसैनिकांनी एकत्र येऊन ज्ञानाची ही मशाल पेटवली.

गेल्या आठ दशकांहून अधिक काळात या ग्रंथालयाने हजारो विद्यार्थ्यांना स्पर्धा परीक्षांच्या माध्यमातून अधिकारी, प्राध्यापक, संशोधक व लेखक बनवले आहे. वातानुकूलित अभ्यासिका, दैनिक वर्तमानपत्र दालन आणि महिला-बालकांसाठीचे स्वतंत्र दालन यामुळे हे ग्रंथालय सर्वांचे हक्काचे माहेरघर बनले आहे.

ग्रंथालयाच्या स्थापनेपासून ते आजच्या डिजिटल युगापर्यंतचा हा प्रवास केवळ पुस्तकांचा नसून, अंबाजोगाईच्या लोकचळवळीचा आणि वैचारिक जडणघडणीचा जाज्वल्य इतिहास आहे.`,
    published_at: "2026-09-17T12:51:12.437Z",
    views: 290,
  },
  "59-years-of-sahitya-niketan-ambajogai": {
    id: "default-2-alias",
    title: "वाचन संस्कृतीची ८० वर्षे: १ ऑगस्ट १९४५ पासूनचा गौरवशाली ग्रंथालय प्रवास",
    slug: "80-years-of-sahitya-niketan-ambajogai",
    category: "news",
    thumbnail_url: "/images/real/library_inauguration_plaque.png",
    excerpt: "१ ऑगस्ट १९४५ रोजी स्थापन झालेले साहित्य निकेतन ग्रंथालय आज मराठवाड्यातील अग्रगण्य सार्वजनिक वाचनालय ठरले आहे...",
    content: `१ ऑगस्ट १९४५ रोजी अंबाजोगाईच्या मध्यवस्तीतील शुक्रवार पेठेत सुरू झालेले साहित्य निकेतन ग्रंथालय आज महाराष्ट्र शासनाचे वर्ग 'अ' दर्जाचे अग्रगण्य सार्वजनिक ग्रंथालय म्हणून दिमाखात उभे आहे.`,
    published_at: "2026-09-17T12:51:12.437Z",
    views: 290,
  },
  "vivekasindhu-modi-manuscripts-preservation": {
    id: "default-3",
    title: "मराठीतील आद्य ग्रंथ 'विवेकसिंधू' आणि दुर्मीळ मोडी हस्तलिखितांचे जतन",
    slug: "vivekasindhu-modi-manuscripts-preservation",
    category: "blog",
    thumbnail_url: "/images/real/library_cupboards.png",
    excerpt: "मुकुंदराजकालीन संदर्भ, पेशवेकालीन सनदा आणि मोडी लिपीतील ऐतिहासिक हस्तलिखितांचे जतन साहित्य निकेतन ग्रंथालयाच्या लाकडी कपाटांमध्ये शास्त्रोक्त पद्धतीने कसे केले जाते याचा अभ्यासपूर्ण आढावा...",
    content: `साहित्य निकेतन ग्रंथालयाच्या भव्य लाकडी कपाटांमध्ये केवळ आधुनिक पुस्तकेच नव्हे, तर महाराष्ट्राच्या साहित्य आणि सामाजिक इतिहासाचा अनमोल ठेवा जतन आहे.

विशेषतः आद्यकवी मुकुंदराज यांच्या 'विवेकसिंधू' या आद्य ग्रंथाच्या अभ्यासपूर्ण आवृत्त्या, संत दासोपंतांच्या साहित्यावरील संशोधन प्रबंध, तसेच हैदराबाद मुक्तीसंग्राम काळातील दुर्मीळ हस्तपत्रके व मोडी लिपीतील दस्तऐवज येथे सुरक्षित ठेवण्यात आले आहेत.

ग्रंथालयाने या प्राचीन कागदपत्रांचे व ग्रंथांचे आयुष्य वाढवण्यासाठी विशेष डी-ॲसिडिफिकेशन व कीटकनाशक शास्त्रीय पद्धतींचा अवलंब केला आहे. तसेच भविष्यातील संशोधकांसाठी या अमूल्य साहित्याचे डिजिटायझेशन करण्याचे कार्यही प्रगतिपथावर आहे.

मराठवाड्याच्या साहित्य वैभवाचे हे जतन केवळ भूतकाळाचा आदर नसून, भावी पिढ्यांना आपल्या समृद्ध मुळांशी जोडून ठेवणारा ज्ञानाचा मजबूत सेतू आहे.`,
    published_at: "2026-09-28T12:00:00.000Z",
    views: 198,
  },
};

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { language } = useLanguage();

  const [story, setStory] = useState<Post | null>(() => (slug && DEFAULT_MAP[slug]) ? DEFAULT_MAP[slug] : null);
  const [loading, setLoading] = useState(() => !(slug && DEFAULT_MAP[slug]));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadStory() {
      if (!slug) return;
      try {
        const data = await getPostBySlug(slug);
        setStory(data || DEFAULT_MAP[slug] || null);
      } catch (err) {
        setStory(DEFAULT_MAP[slug] || null);
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
        <main className="min-h-[60vh] flex items-center justify-center font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D]">
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
        <main className="min-h-[60vh] flex items-center justify-center font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] p-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-[#1E1418] rounded-2xl border border-[#E5DDD0] dark:border-[#332228] p-8 space-y-4">
            <BookOpen className="h-10 w-10 text-stone-400 mx-auto" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">लेख सापडला नाही</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              हा लेख अप्रकाशित असू शकतो किंवा त्याचा पत्ता बदलला गेला आहे.
            </p>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-lg bg-[#800020] text-white px-4 py-2 text-xs font-bold hover:bg-[#66001A] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>सर्व लेखांकडे परत जा</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://sahityaniketan.org/stories/${slug}`;
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
      <main className="min-h-screen font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] transition-colors py-8 sm:py-12">
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
                  onClick={shareToFacebook}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  title="Share 3-line teaser to Facebook"
                >
                  <FacebookIcon className="h-3.5 w-3.5 fill-current" />
                  <span>फेसबुकवर शेअर</span>
                </button>

                <button
                  onClick={shareToWhatsApp}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  title="Share to WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>व्हॉट्सॲप</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#25181C] hover:bg-[#800020]/10 text-stone-700 dark:text-stone-200 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                  title="Copy formatted 3-line teaser & URL"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "मसुदा कॉपी झाला!" : "मसुदा कॉपी करा"}</span>
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

            {/* Bottom Facebook Sharing Callout Card */}
            <div className="m-6 sm:m-10 p-5 rounded-2xl bg-[#F3ECE3] dark:bg-[#180E11] border border-[#E5DDD0] dark:border-[#332228] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                  हा लेख फेसबुकवर शेअर करा
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  ३ ओळींचा सारांश व वाचन लिंक आपोआप तयार केली जाईल, ज्यामुळे वाचक थेट वेबसाइटवर येतील.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={shareToFacebook}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white px-4 py-2 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <FacebookIcon className="h-4 w-4 fill-current" />
                  <span>फेसबुकवर पोस्ट करा</span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] hover:bg-[#800020]/10 text-stone-700 dark:text-stone-200 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "कॉपी झाले" : "मसुदा कॉपी"}</span>
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
