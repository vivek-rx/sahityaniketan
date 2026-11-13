"use client";

import React from "react";
import { Footer as BaseFooter } from "@/components/ui/footer";
import { useLanguage } from "@/context/language-context";
import { YEARS_OF_SERVICE_MR } from "@/lib/site";

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
    { label: isEn ? "History (1945–2026)" : isHi ? "इतिहास" : `${YEARS_OF_SERVICE_MR} वर्षांची ऐतिहासिक वाटचाल`, href: "/history" },
    { label: isEn ? "Contact Us" : isHi ? "संपर्क" : "थेट संपर्क व पत्ता", href: "/contact" },
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
          ? "Sahitya Niketan Library"
          : isHi
          ? "साहित्य निकेतन ग्रन्थालय"
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
