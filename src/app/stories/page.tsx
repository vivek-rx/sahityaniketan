import React from "react";
import { getPublishedPosts } from "@/lib/actions/posts";
import StoriesClient from "./stories-client";

export const revalidate = 60; // Revalidate every minute

export default async function StoriesPage() {
  let initialStories: any[] = [];
  try {
    initialStories = await getPublishedPosts(50);
  } catch (err) {
    console.error("Failed to load published posts for StoriesPage:", err);
  }

  return <StoriesClient initialStories={initialStories} />;
}
