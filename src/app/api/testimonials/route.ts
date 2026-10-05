import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/actions/testimonials";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await getTestimonials(true);
    return NextResponse.json({
      success: true,
      testimonials: list,
    });
  } catch (error) {
    console.error("Failed to fetch testimonials in route:", error);
    return NextResponse.json(
      { success: false, testimonials: [] },
      { status: 500 }
    );
  }
}
