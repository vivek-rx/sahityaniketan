/**
 * Single source of truth for public site identity, contact details and URLs.
 *
 * IMPORTANT: set NEXT_PUBLIC_SITE_URL in Vercel/.env.local once the real
 * domain (https://sahityaniketan.org) resolves. Until then we fall back to the
 * actual production host so canonical/OG/sitemap URLs are never broken.
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

/**
 * Never let a localhost value leak into a production build (e.g. a copied
 * .env.local on Vercel). In production, fall back to Vercel's own production
 * host, then to the known alias.
 */
const isLocalhost = configuredUrl
  ? /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configuredUrl)
  : false;

const resolvedUrl =
  configuredUrl && !(process.env.NODE_ENV === "production" && isLocalhost)
    ? configuredUrl
    : vercelProductionHost
      ? `https://${vercelProductionHost}`
      : "https://sahiyaniketan.vercel.app";

export const SITE_URL = resolvedUrl.replace(/\/+$/, "");

export const SITE_NAME_MR =
  "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई";
export const SITE_NAME_EN = "Sahitya Niketan Public Library, Ambajogai";

/** Official interim inbox. Swap to contact@sahityaniketan.org once domain email exists. */
export const SITE_EMAIL =
  process.env.NEXT_PUBLIC_SITE_EMAIL?.trim() ||
  "sahityaniketan.ambajogai@gmail.com";

export const SITE_PHONE_DISPLAY = "+91 90966 42583";
export const SITE_PHONE_E164 = "+919096642583";
export const SITE_OFFICE_PHONE_DISPLAY = "+91 2446 247125";
export const SITE_WHATSAPP_NUMBER = "919096642583";

export const SITE_ADDRESS_MR =
  "साहित्य निकेतन सार्वजनिक ग्रंथालय, शुक्रवार पेठ, अंबाजोगाई - ४३१५१७, जि. बीड, महाराष्ट्र";
export const SITE_ADDRESS_EN =
  "Sahitya Niketan Public Library, Shukrawar Peth, Ambajogai - 431517, Dist. Beed, Maharashtra";

export const FOUNDED_YEAR = 1945;

/** 2026 - 1945 = 81. Kept computed so the site never goes stale again. */
export const YEARS_OF_SERVICE = Math.max(
  0,
  new Date().getFullYear() - FOUNDED_YEAR
);

const MARATHI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toMarathiDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => MARATHI_DIGITS[Number(digit)]);
}

export const YEARS_OF_SERVICE_MR = toMarathiDigits(YEARS_OF_SERVICE);

export const DEFAULT_OG_IMAGE = "/images/real/library_vintage_books.png";

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
