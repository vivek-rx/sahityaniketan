import type { Metadata } from "next";
import CategoryClient from "./category-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — वाचकांचा निवड पुरस्कार | Readers' Choice Awards`,
    description:
      "साहित्य निकेतन ग्रंथालयाच्या वाचकांचा निवड पुरस्कारातील या श्रेणीतील नामांकित ग्रंथांना मतदान करा. Vote for the nominees in this category of the Sahitya Niketan Readers' Choice Awards.",
  };
}

export default async function AwardCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryClient slug={slug} />;
}
