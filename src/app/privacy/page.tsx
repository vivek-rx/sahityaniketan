import type { Metadata } from "next";
import PrivacyClient from "./privacy-client";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "गोपनीयता धोरण / Privacy Policy",
  description:
    "साहित्य निकेतन ग्रंथालय कोणती वैयक्तिक माहिती गोळा करते, का गोळा करते, किती काळ ठेवते, कोणाला देते आणि आपले अधिकार काय आहेत याचे स्पष्ट धोरण.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyClient />;
}
