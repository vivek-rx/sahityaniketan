"use server";

import { getSetting, setSetting } from "@/lib/actions/settings";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAction } from "./audit";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string | null;
  rating?: number;
  badge?: string;
  is_active: boolean;
  created_at: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "प्रा. डॉ. सदानंद मोरे",
    role: "ज्येष्ठ साहित्यिक व संशोधक",
    content: "साहित्य निकेतन ग्रंथालयातील दुर्मीळ हस्तलिखितांचे दालन आणि आद्यकवी मुकुंदराजकालीन संदर्भ मराठवाड्याचा ऐतिहासिक ठेवा आहेत. संशोधकांसाठी हे ग्रंथालय अनमोल ज्ञानतीर्थ आहे.",
    avatar: "/images/real/marathi_books_display.png",
    rating: 5,
    badge: "साहित्यिक तज्ज्ञ",
    is_active: true,
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "test-2",
    name: "प्रतीक कुलकर्णी",
    role: "MPSC उत्तीर्ण अधिकारी (तहसीलदार)",
    content: "साहित्य निकेतनच्या अभ्यासिका दालनात बसून मी सलग दोन वर्षे स्पर्धा परीक्षेचा अभ्यास केला. ग्रंथालयातील शांत वातावरण, संदर्भ ग्रंथांची उपलब्धता आणि अभ्यासकांची शिस्त यश मिळवून देण्यासाठी निर्णायक ठरली.",
    avatar: "/images/real/library_window.png",
    rating: 5,
    badge: "यशस्वी विद्यार्थी",
    is_active: true,
    created_at: "2026-02-10T11:00:00Z",
  },
  {
    id: "test-3",
    name: "डॉ. अलका जोशी",
    role: "मराठी भाषा अभ्यासक व लेखिका",
    content: "स्वातंत्र्यपूर्व काळापासून अविरत ज्ञानसेवा देणारे हे वर्ग 'अ' ग्रंथालय आहे. ३९ हजारांहून अधिक पुस्तकांचे समृद्ध दालन आणि वर्तमानपत्र वाचक कक्ष अंबाजोगाईच्या सांस्कृतिक जीवनाचा प्राण आहे.",
    avatar: "/images/real/library_vintage_books.png",
    rating: 5,
    badge: "नियमित वाचक",
    is_active: true,
    created_at: "2026-03-01T09:30:00Z",
  },
  {
    id: "test-4",
    name: "ॲड. सुधीर जोशी",
    role: "आजीवन सभासद (४० वर्षे)",
    content: "मी गेल्या चाळीस वर्षांपासून या ग्रंथालयाचा नियमित वाचक आहे. १९४५ पासूनची ग्रंथालयाची परंपरा नव्या पिढीने डिजिटल स्वरूपात जतन केली हे पाहून अत्यंत अभिमान वाटतो.",
    avatar: "/images/real/library_cupboards.png",
    rating: 5,
    badge: "आजीवन सदस्य",
    is_active: true,
    created_at: "2026-03-20T14:00:00Z",
  },
];

const SETTING_KEY = "library_testimonials_list";

export async function getTestimonials(activeOnly = true): Promise<TestimonialItem[]> {
  try {
    const raw = await getSetting(SETTING_KEY);
    let list: TestimonialItem[] = [];

    if (Array.isArray(raw)) {
      list = raw as unknown as TestimonialItem[];
    } else {
      // Initialize with defaults if empty
      list = DEFAULT_TESTIMONIALS;
    }

    if (activeOnly) {
      return list.filter((t) => t.is_active);
    }
    return list;
  } catch (error) {
    console.error("Failed to load testimonials:", error);
    return DEFAULT_TESTIMONIALS;
  }
}

export async function createTestimonial(input: {
  name: string;
  role: string;
  content: string;
  avatar?: string | null;
  rating?: number;
  badge?: string;
  is_active?: boolean;
}): Promise<TestimonialItem> {
  await requireAdmin();
  const all = await getTestimonials(false);

  const newItem: TestimonialItem = {
    id: `test-${Date.now()}`,
    name: input.name.trim(),
    role: input.role.trim() || "वाचक",
    content: input.content.trim(),
    avatar: input.avatar?.trim() || null,
    rating: input.rating || 5,
    badge: input.badge?.trim() || "वाचक प्रतिक्रिया",
    is_active: input.is_active ?? true,
    created_at: new Date().toISOString(),
  };

  const updated = [newItem, ...all];
  await setSetting(SETTING_KEY, updated as any, "admin");
  await logAction("create", "testimonial" as any, newItem.id, newItem.name);
  return newItem;
}

export async function updateTestimonial(
  id: string,
  input: Partial<TestimonialItem>
): Promise<TestimonialItem | null> {
  await requireAdmin();
  const all = await getTestimonials(false);
  const index = all.findIndex((t) => t.id === id);
  if (index === -1) return null;

  all[index] = {
    ...all[index],
    ...input,
  };

  await setSetting(SETTING_KEY, all as any, "admin");
  await logAction("update", "testimonial" as any, id, all[index].name);
  return all[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  await requireAdmin();
  const all = await getTestimonials(false);
  const filtered = all.filter((t) => t.id !== id);

  await setSetting(SETTING_KEY, filtered as any, "admin");
  await logAction("delete", "testimonial" as any, id, "Testimonial Deleted");
  return true;
}
