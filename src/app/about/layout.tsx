import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "साहित्य निकेतन परिचय व प्रशासन",
  description:
    "१९४५ मध्ये स्थापन झालेल्या साहित्य निकेतन सार्वजनिक ग्रंथालयाचा परिचय, कार्यकारिणी, विश्वस्त मंडळ आणि महाराष्ट्र शासन वर्ग 'अ' मान्यता.",
  path: "/about",
  image: "/images/real/library_signboard.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाचा प्रवेशद्वार व साइनबोर्ड",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
