import { NextResponse } from "next/server";
import { getNotices } from "@/lib/actions/notices";
import { getDailyAnnouncement } from "@/lib/actions/daily-announcement";

export const dynamic = "force-dynamic";

export interface AdminUpdateToast {
  id: string;
  title: string;
  message: string;
  badge?: string;
  priority: "urgent" | "high" | "normal" | "info";
  link?: string;
  linkText?: string;
  timestamp: string;
  sender: string;
}

export async function GET() {
  try {
    const [notices, daily] = await Promise.all([
      getNotices(true).catch(() => []),
      getDailyAnnouncement().catch(() => null),
    ]);

    const updates: AdminUpdateToast[] = [];

    // Add active notices from admin panel
    if (Array.isArray(notices)) {
      for (const n of notices) {
        if (!n.is_active) continue;
        updates.push({
          id: `notice-${n.id}`,
          title: n.title,
          message: n.content || "",
          badge:
            n.priority === "urgent"
              ? "तातडीचे परिपत्रक"
              : n.priority === "high"
              ? "महत्त्वाची सूचना"
              : "ग्रंथालय सूचना",
          priority: (n.priority as any) || "normal",
          link: n.link || "/news",
          linkText: "तपशील पहा",
          timestamp: n.created_at || new Date().toISOString(),
          sender: "साहित्य निकेतन प्रशासन",
        });
      }
    }

    // Add daily announcement if active
    if (daily && daily.isActive && daily.text) {
      // Check if daily announcement is not duplicate of top notice
      const isDuplicate = updates.some((u) => u.message.includes(daily.text.slice(0, 30)));
      if (!isDuplicate) {
        updates.push({
          id: `daily-banner-${daily.updatedAt || "latest"}`,
          title: daily.badge || "दैनिक ग्रंथालय फलक व सूचना",
          message: daily.text,
          badge: daily.badge || "अधिकृत सूचना",
          priority: daily.priority || "high",
          link: daily.link || "/news",
          linkText: daily.linkText || "वाचा",
          timestamp: daily.updatedAt || new Date().toISOString(),
          sender: "ग्रंथालय संचालक मंडळ",
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        count: updates.length,
        updates,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch admin updates:", error);
    return NextResponse.json(
      {
        success: false,
        count: 0,
        updates: [],
      },
      { status: 200 }
    );
  }
}
