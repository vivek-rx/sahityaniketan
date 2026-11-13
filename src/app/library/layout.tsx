import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "ग्रंथालय दालने व वाचन कक्ष",
  description:
    "साहित्य निकेतन ग्रंथालयातील वाचन कक्ष, स्पर्धा परीक्षा अभ्यासिका, वृत्तपत्र दालन, बाल वाचन कट्टा आणि दुर्मीळ हस्तलिखित जतन कक्ष यांची माहिती व वेळापत्रक.",
  path: "/library",
  image: "/images/real/library_cupboards.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयातील ऐतिहासिक ग्रंथकपाटे",
});

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return children;
}
