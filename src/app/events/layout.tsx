import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "कार्यक्रम व उपक्रम",
  description:
    "साहित्य निकेतन ग्रंथालयाचे व्याख्यान, साहित्य संमेलन, ग्रंथप्रदर्शन, वाचन चळवळ आणि स्पर्धा परीक्षा मार्गदर्शन उपक्रमांचे वेळापत्रक.",
  path: "/events",
  image: "/images/real/library_window.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाचा वाचन कक्ष",
});

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
