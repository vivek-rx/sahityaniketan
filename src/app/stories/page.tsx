import React from "react";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/actions/posts";
import StoriesClient from "./stories-client";
import { buildPageMetadata } from "@/lib/metadata";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = buildPageMetadata({
  title: "वाचन व लेख — ग्रंथालयाचा वारसा",
  description:
    "साहित्य निकेतन ग्रंथालयाचे ऐतिहासिक लेख, दुर्मीळ हस्तलिखितांचे संशोधन, वाचन संस्कृती आणि अंबाजोगाईच्या साहित्यिक वारशाविषयीचे लेख.",
  path: "/stories",
  image: "/images/real/library_vintage_books.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयातील दुर्मीळ ग्रंथ संग्रह",
});

export default async function StoriesPage() {
  let initialStories: any[] = [];
  try {
    initialStories = await getPublishedPosts(50);
  } catch (err) {
    console.error("Failed to load published posts for StoriesPage:", err);
  }

  return <StoriesClient initialStories={initialStories} />;
}
