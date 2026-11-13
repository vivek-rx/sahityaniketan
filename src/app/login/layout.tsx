import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "प्रशासक लॉगिन",
  description:
    "साहित्य निकेतन ग्रंथालयाच्या प्रशासकीय नियंत्रण कक्षात प्रवेश. हे पान शोध इंजिनसाठी खुले नाही.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
