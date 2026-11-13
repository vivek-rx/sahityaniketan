import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "इतिहास व वारसा — १९४५ ते आज",
  description:
    "१ ऑगस्ट १९४५ रोजी हैदराबाद मुक्ती संग्रामाच्या पार्श्वभूमीवर स्थापन झालेल्या साहित्य निकेतन ग्रंथालयाचा ऐतिहासिक प्रवास, टप्पे आणि दुर्मीळ संग्रह.",
  path: "/history",
  image: "/images/real/library_inauguration_plaque.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाचा १९४५ चा उद्घाटन शिलालेख",
});

export default function HistoryLayout({ children }: { children: ReactNode }) {
  return children;
}
