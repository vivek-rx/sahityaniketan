// Choice Awards: category ↔ URL-slug mapping shared by the /awards landing,
// the /awards/[slug] voting pages, and (future) admin deep-links.

export const CATEGORY_EN_LABELS: Record<string, string> = {
  "अभिजात कादंबरी": "Classic Novels",
  "पौराणिक व ऐतिहासिक": "Mythological & Historical",
  "ज्ञानपीठ सन्मानित साहित्य": "Jnanpith Honoured Works",
  "ऐतिहासिक कादंबरी": "Historical Novels",
  "आधुनिक मराठी साहित्य": "Modern Marathi Literature",
  "हिन्दी साहित्य": "Hindi Literature",
  "संस्कृत काव्य": "Sanskrit Poetry",
  "संतसाहित्य व आद्य ग्रंथ": "Sant Literature & Early Texts",
  "ज्ञानपीठ व साहित्य अकादमी": "Jnanpith & Sahitya Akademi",
  "विनोदी साहित्य": "Humour & Satire",
  "नाटक व काव्य": "Drama & Poetry",
  "विद्रोही व लोकसाहित्य": "Rebel & Folk Literature",
  "आत्मचरित्र": "Autobiography",
  "इतिहास व संशोधन": "History & Research",
  "स्पर्धा परीक्षा व करिअर": "Competitive Exams & Career",
};

/** Marathi category name → stable URL slug derived from its EN label. */
export function categoryToSlug(category: string): string {
  const en = CATEGORY_EN_LABELS[category] || category;
  return en
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SLUG_INDEX: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_EN_LABELS).map(([mr, en]) => [
    en.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    mr,
  ])
);

/** URL slug → Marathi category name (null when unknown). */
export function slugToCategory(slug: string): string | null {
  const direct = SLUG_INDEX[slug.toLowerCase()];
  if (direct) return direct;
  // Fallback: match ignoring case/hyphens against any EN label
  const norm = slug.toLowerCase().replace(/[-_]/g, " ").trim();
  for (const en of Object.values(CATEGORY_EN_LABELS)) {
    if (en.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9 ]+/g, " ").trim() === norm) {
      return Object.keys(CATEGORY_EN_LABELS).find((k) => CATEGORY_EN_LABELS[k] === en) || null;
    }
  }
  return null;
}
