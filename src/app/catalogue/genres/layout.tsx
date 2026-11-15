import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "ग्रंथश्रेणी — विषयानुसार संग्रह",
  description:
    "साहित्य निकेतन ग्रंथालयाची ग्रंथश्रेणी: ऐतिहासिक कादंबऱ्या, संतसाहित्य, संस्कृत काव्य, आत्मचरित्रे, स्पर्धा परीक्षा साहित्य अशा विषयांनुसार ऑनलाइन ग्रंथसूची ब्राउज़ करा.",
  path: "/catalogue/genres",
  image: "/images/real/marathi_books_display.png",
  imageAlt: "विषयानुसार ग्रंथश्रेणी",
});

export default function GenresLayout({ children }: { children: ReactNode }) {
  return children;
}
