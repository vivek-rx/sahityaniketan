/**
 * Cover art without storage.
 *
 * Every book gets a deterministic, library-branded typographic cover rendered
 * as SVG. No file is written to Supabase Storage, so the 1 GB free tier is
 * never consumed by the catalogue (39,953 physical volumes would need ~2 GB
 * even at aggressive WebP compression).
 *
 * A real cover, when one exists, always wins: callers pass `cover_url` first
 * and only fall back to `/api/covers/{id}.svg`.
 */

export interface CoverInput {
  id: string;
  title: string;
  author?: string | null;
  year?: number | null;
  category?: string | null;
  language?: string | null;
}

interface Palette {
  from: string;
  to: string;
  accent: string;
  ink: string;
}

const PALETTES: Palette[] = [
  { from: "#5B0A18", to: "#2A050B", accent: "#E5B869", ink: "#FFF7E6" },
  { from: "#12392B", to: "#071D15", accent: "#E5B869", ink: "#FFF7E6" },
  { from: "#1B2A4A", to: "#0A1226", accent: "#E5B869", ink: "#FFF7E6" },
  { from: "#4A2C0A", to: "#241405", accent: "#F1D08A", ink: "#FFF7E6" },
  { from: "#3A1230", to: "#1A0715", accent: "#E5B869", ink: "#FFF7E6" },
  { from: "#2C2C2C", to: "#101010", accent: "#D9B45B", ink: "#FFF7E6" },
  { from: "#3E1C12", to: "#1C0A05", accent: "#EBC77C", ink: "#FFF7E6" },
  { from: "#1F3B3B", to: "#0B1E1E", accent: "#DFC27A", ink: "#FFF7E6" },
];

const MARATHI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function toDevanagariDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => MARATHI_DIGITS[Number(d)]);
}

function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) + hash) ^ value.charCodeAt(i);
  }
  return hash >>> 0;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Break a title into lines on word boundaries, with a hard cap. */
function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
      continue;
    }
    if (Array.from(current + " " + word).length <= maxChars) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    const last = Array.from(kept[maxLines - 1]);
    kept[maxLines - 1] = `${last.slice(0, Math.max(1, maxChars - 1)).join("")}…`;
    return kept;
  }
  return lines.length > 0 ? lines : ["ग्रंथ"];
}

function titleLayout(title: string): {
  lines: string[];
  fontSize: number;
  lineHeight: number;
} {
  const length = Array.from(title).length;

  if (length > 82) {
    return { lines: wrapText(title, 27, 5), fontSize: 31, lineHeight: 42 };
  }
  if (length > 52) {
    return { lines: wrapText(title, 22, 4), fontSize: 38, lineHeight: 50 };
  }
  if (length > 30) {
    return { lines: wrapText(title, 18, 4), fontSize: 44, lineHeight: 56 };
  }
  return { lines: wrapText(title, 16, 3), fontSize: 50, lineHeight: 62 };
}

export function generateCoverSvg(input: CoverInput): string {
  const title = (input.title || "ग्रंथ").trim();
  const author = (input.author || "साहित्य निकेतन ग्रंथालय").trim();
  const category = (input.category || "ग्रंथ संग्रह").trim();
  const palette = PALETTES[hashString(`${input.id}|${title}`) % PALETTES.length];

  const { lines, fontSize, lineHeight } = titleLayout(title);
  const titleTop = 372 - ((lines.length - 1) * lineHeight) / 2;
  const titleBottom = titleTop + (lines.length - 1) * lineHeight;

  const authorLines = wrapText(author, 34, 2);
  const authorTop = Math.min(660, Math.max(600, titleBottom + 92));

  const yearLabel = input.year
    ? toDevanagariDigits(input.year)
    : toDevanagariDigits(1945);
  const categoryLabel = Array.from(category).slice(0, 26).join("");

  const titleSpans = lines
    .map(
      (line, index) =>
        `<text x="300" y="${titleTop + index * lineHeight}" text-anchor="middle" ` +
        `fill="${palette.ink}" font-size="${fontSize}" font-weight="700" ` +
        `font-family="'Noto Sans Devanagari','Baloo 2','Mangal',system-ui,sans-serif">` +
        `${escapeXml(line)}</text>`
    )
    .join("");

  const authorSpans = authorLines
    .map(
      (line, index) =>
        `<text x="300" y="${authorTop + index * 28}" text-anchor="middle" ` +
        `fill="${palette.accent}" font-size="21" font-weight="600" ` +
        `font-family="'Noto Sans Devanagari','Mangal',system-ui,sans-serif">` +
        `${escapeXml(line)}</text>`
    )
    .join("");

  const safeTitle = escapeXml(title);
  const safeAuthor = escapeXml(author);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" role="img" aria-label="${safeTitle} — ${safeAuthor}">
  <title>${safeTitle} — ${safeAuthor}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.from}"/>
      <stop offset="1" stop-color="${palette.to}"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.10"/>
      <stop offset="0.18" stop-color="#FFFFFF" stop-opacity="0.02"/>
      <stop offset="0.55" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.22"/>
    </linearGradient>
  </defs>

  <rect width="600" height="900" fill="url(#bg)"/>
  <rect width="600" height="900" fill="url(#sheen)"/>

  <rect x="18" y="18" width="564" height="864" fill="none" stroke="${palette.accent}" stroke-opacity="0.55" stroke-width="2"/>
  <rect x="28" y="28" width="544" height="844" fill="none" stroke="${palette.accent}" stroke-opacity="0.20"/>

  <rect x="0" y="0" width="12" height="900" fill="#000000" fill-opacity="0.28"/>
  <rect x="12" y="0" width="2" height="900" fill="${palette.accent}" fill-opacity="0.45"/>

  <path d="M300 62 l7 7 -7 7 -7 -7 z" fill="${palette.accent}" fill-opacity="0.9"/>

  <text x="300" y="108" text-anchor="middle" fill="${palette.accent}" font-size="23" letter-spacing="5" font-family="'Noto Sans Devanagari','Baloo 2','Mangal',system-ui,sans-serif">साहित्य निकेतन</text>
  <text x="300" y="134" text-anchor="middle" fill="${palette.ink}" fill-opacity="0.72" font-size="11.5" letter-spacing="3" font-family="'Noto Sans Devanagari','Mangal',system-ui,sans-serif">ग्रंथालय • अंबाजोगाई</text>

  <line x1="210" y1="158" x2="390" y2="158" stroke="${palette.accent}" stroke-opacity="0.55"/>
  <circle cx="300" cy="158" r="2.5" fill="${palette.accent}"/>

  ${titleSpans}

  <line x1="235" y1="${authorTop - 38}" x2="365" y2="${authorTop - 38}" stroke="${palette.accent}" stroke-opacity="0.4"/>
  ${authorSpans}

  <text x="300" y="792" text-anchor="middle" fill="${palette.ink}" fill-opacity="0.84" font-size="13" letter-spacing="1.5" font-family="'Noto Sans Devanagari','Mangal',system-ui,sans-serif">${escapeXml(categoryLabel)}</text>
  <text x="300" y="818" text-anchor="middle" fill="${palette.accent}" font-size="13" font-weight="600" font-family="'Noto Sans Devanagari','Mangal',system-ui,sans-serif">प्रकाशन वर्ष ${yearLabel}</text>

  <line x1="120" y1="846" x2="480" y2="846" stroke="${palette.accent}" stroke-opacity="0.28"/>
  <text x="300" y="870" text-anchor="middle" fill="${palette.ink}" fill-opacity="0.62" font-size="10.5" letter-spacing="2" font-family="'Noto Sans Devanagari','Mangal',system-ui,sans-serif">सार्वजनिक ग्रंथालय • स्थापना १ ऑगस्ट १९४५</text>
</svg>`;
}