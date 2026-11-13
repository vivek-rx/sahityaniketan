import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return buildPageMetadata({
    title: "ग्रंथ तपशील",
    description:
      "साहित्य निकेतन ग्रंथालयाच्या ग्रंथसूचीमधील ग्रंथाचा तपशील — लेखक, प्रकाशक, क्रमांक, दालन आणि उपलब्धता.",
    path: `/catalogue/${slug}`,
    image: "/images/real/marathi_books_display.png",
    imageAlt: "साहित्य निकेतन ग्रंथालयातील मराठी ग्रंथ",
  });
}

export default function BookDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
