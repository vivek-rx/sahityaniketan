"use server";

import { getSetting, setSetting } from "@/lib/actions/settings";
import { getNotices, createNotice } from "@/lib/actions/notices";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";

export interface DailyAnnouncementData {
  text: string;
  link?: string;
  linkText?: string;
  isActive: boolean;
  badge?: string;
  priority?: "urgent" | "high" | "normal";
  updatedAt?: string;
}

const DEFAULT_ANNOUNCEMENT: DailyAnnouncementData = {
  text: "नवीन घडामोड: साहित्य निकेतन ग्रंथालयाचे दुर्मीळ हस्तलिखित दालन व आधुनिक अभ्यासिका सर्व वाचकांसाठी खुली आहे.",
  link: "/membership",
  linkText: "सभासद नोंदणी करा",
  isActive: true,
  badge: "दैनिक सूचना",
  priority: "high",
  updatedAt: new Date().toISOString(),
};

export async function getDailyAnnouncement(): Promise<DailyAnnouncementData> {
  try {
    const setting = await getSetting("daily_sticky_banner");
    if (setting && typeof setting === "object" && !Array.isArray(setting)) {
      return {
        ...DEFAULT_ANNOUNCEMENT,
        ...(setting as Record<string, any>),
      };
    }

    // Fallback: check active notices
    const notices = await getNotices(true);
    if (notices && notices.length > 0) {
      const topNotice = notices[0];
      return {
        text: topNotice.title + (topNotice.content ? ` — ${topNotice.content}` : ""),
        link: "/news",
        linkText: "अधिक वाचा",
        isActive: topNotice.is_active ?? true,
        badge: topNotice.priority === "urgent" ? "तातडीची सूचना" : "दैनिक सूचना",
        priority: (topNotice.priority as any) || "high",
        updatedAt: topNotice.updated_at || topNotice.created_at,
      };
    }
  } catch (error) {
    console.error("Error fetching daily announcement:", error);
  }

  return DEFAULT_ANNOUNCEMENT;
}

export async function updateDailyAnnouncement(
  data: Partial<DailyAnnouncementData>
): Promise<DailyAnnouncementData> {
  await requireAdmin();
  const current = await getDailyAnnouncement();
  const updated: DailyAnnouncementData = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  try {
    await setSetting("daily_sticky_banner", updated as any, "admin");
    await logAction("update", "setting", "daily_sticky_banner", updated.text);
  } catch (err) {
    console.error("Failed to update daily announcement in settings:", err);
    throw err;
  }

  return updated;
}
