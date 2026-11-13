import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "पहिले विश्वस्त मंडळ व संस्थापक",
  description:
    "साहित्य निकेतन सार्वजनिक ग्रंथालयाच्या स्थापनेत पुढाकार घेतलेले स्वातंत्र्यसैनिक, विश्वस्त, संस्थापक अध्यक्ष आणि ग्रंथालय चळवळीतील कार्यकर्ते.",
  path: "/trustees",
  image: "/images/real/library_signboard.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाची ऐतिहासिक इमारत",
});

export default function TrusteesLayout({ children }: { children: ReactNode }) {
  return children;
}
