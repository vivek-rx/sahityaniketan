import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "बातम्या व परिपत्रके",
  description:
    "साहित्य निकेतन ग्रंथालयाची अधिकृत बातम्या, सूचना, परिपत्रके, निविदा आणि सभासदांसाठीचे महत्त्वाचे अपडेट.",
  path: "/news",
  image: "/images/real/library_cupboards.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाचे ग्रंथकपाट",
});

export default function NewsLayout({ children }: { children: ReactNode }) {
  return children;
}
