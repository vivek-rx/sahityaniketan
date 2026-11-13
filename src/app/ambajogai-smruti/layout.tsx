import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "अंबाजोगाईच्या स्मृती",
  description:
    "अंबाजोगाईचा साहित्यिक व सांस्कृतिक वारसा, स्वातंत्र्य संग्रामातील स्मृती, आद्यकवी मुकुंदराज आणि संत दासोपंत यांच्याशी जोडलेली ऐतिहासिक परंपरा.",
  path: "/ambajogai-smruti",
  image: "/images/real/library_vintage_books.png",
  imageAlt: "अंबाजोगाईचा साहित्यिक वारसा दर्शवणारे दुर्मीळ ग्रंथ",
});

export default function AmbajogaiSmrutiLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
