import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "छायाचित्र दालन",
  description:
    "साहित्य निकेतन ग्रंथालयाची ऐतिहासिक इमारत, ग्रंथसंग्रह, वाचन कक्ष, कार्यक्रम आणि दुर्मीळ हस्तलिखितांची छायाचित्रे.",
  path: "/gallery",
  image: "/images/real/library_vintage_books.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयातील दुर्मीळ ग्रंथ",
});

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
