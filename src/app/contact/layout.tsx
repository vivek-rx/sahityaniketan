import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "संपर्क व वाचनालय वेळ",
  description:
    "साहित्य निकेतन सार्वजनिक ग्रंथालय, शुक्रवार पेठ, अंबाजोगाई येथील पत्ता, दूरध्वनी, ईमेल, वाचनालय वेळ आणि संपर्क अर्ज.",
  path: "/contact",
  image: "/images/real/library_signboard.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाचा पत्ता व प्रवेशद्वार",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
