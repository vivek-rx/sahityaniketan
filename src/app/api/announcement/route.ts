import { NextResponse } from "next/server";
import { getDailyAnnouncement } from "@/lib/actions/daily-announcement";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getDailyAnnouncement();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        text: "नवीन घडामोड: साहित्य निकेतन ग्रंथालयाचे दुर्मीळ हस्तलिखित दालन व आधुनिक अभ्यासिका सर्व वाचकांसाठी खुली आहे.",
        link: "/membership",
        linkText: "सभासद नोंदणी करा",
        isActive: true,
        badge: "दैनिक सूचना",
        priority: "high",
      },
      { status: 200 }
    );
  }
}
