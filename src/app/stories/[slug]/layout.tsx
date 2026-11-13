import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

const STORY_TITLES: Record<string, string> = {
  "ambajogai-literary-heritage-mukundraj-dasopant":
    "अंबाजोगाईची ज्ञानसाधना: मुकुंदराज व दासोपंत",
  "80-years-of-sahitya-niketan-ambajogai":
    "वाचन संस्कृतीची ८१ वर्षे: १९४५ पासूनचा प्रवास",
  "vivekasindhu-modi-manuscripts-preservation":
    "विवेकसिंधू आणि मोडी हस्तलिखितांचे जतन",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = STORY_TITLES[slug] || "वाचन व लेख";

  return buildPageMetadata({
    title,
    description:
      "साहित्य निकेतन ग्रंथालयाच्या वारशाविषयीचा सविस्तर लेख — ऐतिहासिक संदर्भ, दुर्मीळ ग्रंथ आणि संशोधन.",
    path: `/stories/${slug}`,
    image: "/images/real/library_vintage_books.png",
    imageAlt: "साहित्य निकेतन ग्रंथालयातील दुर्मीळ ग्रंथ संग्रह",
  });
}

export default function StoryLayout({ children }: { children: ReactNode }) {
  return children;
}
