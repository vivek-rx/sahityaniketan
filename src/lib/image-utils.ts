/**
 * Image Optimization Utilities for Sahitya Niketan Granthalaya
 * - Provides SVG base64 blurDataURLs for instant smooth progressive image placeholders
 * - Responsive sizes string generators for optimal mobile/desktop CDN delivery
 */

// Shimmer SVG blur placeholder for smooth progressive loading
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#002D38" offset="20%" />
      <stop stop-color="#00657E" offset="50%" />
      <stop stop-color="#002D38" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#002D38" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const BLUR_PLACEHOLDER = `data:image/svg+xml;base64,${toBase64(shimmer(400, 600))}`;

export const RESPONSIVE_BOOK_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
export const RESPONSIVE_HERO_SIZES = "(max-width: 1024px) 100vw, 50vw";
export const RESPONSIVE_GALLERY_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";
