import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "सभासदत्व व अभ्यासिका",
  description:
    "साहित्य निकेतन ग्रंथालयाचे वार्षिक, आजीवन व अभ्यासिका सभासदत्व दर, अनामत ठेव, नियम आणि ऑनलाइन नोंदणी अर्ज.",
  path: "/membership",
  image: "/images/real/library_window.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाची वातानुकूलित अभ्यासिका",
});

export default function MembershipLayout({ children }: { children: ReactNode }) {
  return children;
}
