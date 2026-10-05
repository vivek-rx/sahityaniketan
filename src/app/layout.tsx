import type { Metadata } from "next";
import { 
  Geist,
  Baloo_2, 
  Noto_Sans_Devanagari, 
} from "next/font/google";
import dynamic from "next/dynamic";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/language-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { LibrarySchema } from "@/components/seo/structured-data";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

/**
 * Unified Typography Suite:
 * - Baloo 2: Primary Devanagari Headings
 * - Noto Sans Devanagari: Crisp, modern Devanagari body & UI
 * - Geist: Ultra-clean English & UI base
 */
const baloo2 = Baloo_2({
  weight: ["600", "700"],
  subsets: ["devanagari"],
  variable: "--font-baloo",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sahityaniketan.org"),
  title: {
    default: "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई (स्था. १ ऑगस्ट १९४५)",
    template: "%s | साहित्य निकेतन ग्रंथालय, अंबाजोगाई",
  },
  description:
    "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त साहित्य निकेतन सार्वजनिक ग्रंथालय, शुक्रवार पेठ, अंबाजोगाई. ३९,९५३ मुद्रित ग्रंथ, दुर्मीळ मोडी व संस्कृत हस्तलिखिते, संदर्भ कक्ष आणि अभ्यासिका दालन.",
  keywords: [
    "साहित्य निकेतन",
    "ग्रंथालय अंबाजोगाई",
    "Ambajogai Library",
    "Vivekasindhu Mukundraj",
    "Dasopant Pasodi",
    "Marathi Books",
    "MPSC Study Hall Ambajogai",
    "Digital Catalogue",
    "Public Library Maharashtra",
  ],
  authors: [{ name: "Sahitya Niketan Granthalaya Ambajogai" }],
  creator: "Sahitya Niketan Library Committee",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई (स्थापना: १ ऑगस्ट १९४५)",
    description: "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त सार्वजनिक ग्रंथालय. ३९,९५३ मुद्रित ग्रंथसंग्रह, संदर्भ कक्ष आणि दुर्मीळ हस्तलिखिते.",
    url: "https://sahityaniketan.org",
    siteName: "Sahitya Niketan Granthalaya Ambajogai",
    images: [
      {
        url: "/images/real/library_vintage_books.png",
        width: 1200,
        height: 630,
        alt: "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई — दुर्मीळ ग्रंथ दालन",
      },
    ],
    locale: "mr_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई",
    description: "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त सार्वजनिक ग्रंथालय. ३९,९५३ मुद्रित ग्रंथसंग्रह आणि संदर्भ दालन.",
    images: ["/images/real/library_vintage_books.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mr"
      suppressHydrationWarning
      className={`${geist.variable} ${baloo2.variable} ${notoSansDevanagari.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gajraj+One&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var h=window.location.hostname;document.cookie="googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";document.cookie="googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain="+h+";";document.cookie="googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=."+h+";";document.documentElement.classList.remove('translated-ltr','translated-rtl');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased bg-[#FAF6F0] dark:bg-[#150305] text-[#1F1A18] dark:text-[#FAF2E8] transition-colors">
        <SmoothScrollProvider>
          <LibrarySchema />
          <LanguageProvider>

            <WishlistProvider>
              <TooltipProvider>
                {children}
                <MobileBottomNav />
              </TooltipProvider>
            </WishlistProvider>
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
