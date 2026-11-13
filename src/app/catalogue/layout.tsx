import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "ग्रंथसूची व संदर्भ संग्रह",
  description:
    "साहित्य निकेतन ग्रंथालयातील ३९,९५३ मुद्रित ग्रंथ, संदर्भ संग्रह व दुर्मीळ हस्तलिखितांची अधिकृत ग्रंथसूची. लेखक, विषय, भाषा व उपलब्धतेनुसार शोधा.",
  path: "/catalogue",
  image: "/images/real/marathi_books_display.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयातील मराठी ग्रंथांचे प्रदर्शन",
});

export default function CatalogueLayout({ children }: { children: ReactNode }) {
  return children;
}
