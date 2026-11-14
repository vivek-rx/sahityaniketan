import type { Metadata } from "next";
import TermsClient from "./terms-client";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "वापरण्याच्या अटी / Terms of Use",
  description:
    "साहित्य निकेतन ग्रंथालयाचे संकेतस्थळ वापरण्याच्या अटी, सभासदत्व नियम, ग्रंथ देवाणघेवाण धोरण आणि जबाबदारीची मर्यादा.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsClient />;
}
