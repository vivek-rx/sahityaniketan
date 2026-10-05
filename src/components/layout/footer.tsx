"use client";

import React from "react";
import { Footer as BaseFooter } from "@/components/ui/footer";
import { useLanguage } from "@/context/language-context";

/**
 * Footer — Exact 21st.dev/shadcn responsive footer with newsletter subscription.
 * Replaced old extraneous components with clean 4-column layout.
 */
export function Footer() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";

  const usefulLinks = [
    { label: isEn ? "Home" : isHi ? "मुख्य पृष्ठ" : "मुख्यपृष्ठ", href: "/" },
    { label: isEn ? "Catalogue" : isHi ? "ग्रंथसूची" : "ग्रंथसूची शोध", href: "/catalogue" },
    { label: isEn ? "About Us" : isHi ? "परिचय" : "ग्रंथालयाविषयी", href: "/about" },
    { label: isEn ? "Trustees & Founders" : isHi ? "विश्वस्त व संस्थापक" : "पहिले विश्वस्त व संस्थापक", href: "/trustees" },
    { label: isEn ? "Membership" : isHi ? "सदस्यता" : "अभ्यासिका व सभासदत्व", href: "/membership" },
    { label: isEn ? "History (1945)" : isHi ? "इतिहास" : "८० वर्षांची ऐतिहासिक वाटचाल", href: "/history" },
    { label: isEn ? "Contact Us" : isHi ? "संपर्क" : "थेट संपर्क व पत्ता", href: "/contact" },
  ];

  const socialLinks = [
    {
      label: "YouTube",
      href: "https://www.youtube.com/@sahityaniketan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/sahityaniketan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/sahityaniketan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/919096642583",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      ),
    },
  ];

  const handleSubscribe = async (email: string): Promise<boolean> => {
    // Simulate API newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 800));
    return Boolean(email && email.includes("@"));
  };

  return (
    <BaseFooter
      logoSrc="/images/logo.png"
      companyName={
        isEn
          ? "Sahitya Niketan"
          : isHi
          ? "साहित्य निकेतन"
          : "साहित्य निकेतन ग्रंथालय"
      }
      description={
        isEn
          ? "Govt. of Maharashtra Grade 'A' Recognized Public Library (Est. 1945). Preserving 39,953+ books, rare manuscripts, and modern reading halls."
          : isHi
          ? "महाराष्ट्र शासन मान्यता प्राप्त वर्ग 'अ' सार्वजनिक पुस्तकालय (स्था. १ अगस्त १९४५). ३९,९५३+ मुद्रित ग्रंथ और ज्ञानसेवा."
          : "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त सार्वजनिक ग्रंथालय (स्थापना: १ ऑगस्ट १९४५). ३९,९५३+ मुद्रित ग्रंथ, दुर्मीळ हस्तलिखिते व ज्ञानसेवा."
      }
      usefulLinks={usefulLinks}
      socialLinks={socialLinks}
      newsletterTitle={
        isEn
          ? "Subscribe our newsletter"
          : isHi
          ? "वार्तापत्र सदस्यता"
          : "वार्तापत्र सदस्यता"
      }
      onSubscribe={handleSubscribe}
      className="border-t border-border"
    />
  );
}

export default Footer;
