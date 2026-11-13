import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME_EN, SITE_NAME_MR } from "./site";

type PageMetadataInput = {
  /** Page title without the root template suffix. */
  title: string;
  description: string;
  /** Route path beginning with "/" — used for canonical + OG url. */
  path: string;
  /** 1200x630 social image. Falls back to the library hero photo. */
  image?: string;
  imageAlt?: string;
  /** Use the title verbatim (no `| Sahitya Niketan…` template). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/**
 * Builds complete per-route metadata.
 *
 * Next.js replaces nested `openGraph`/`twitter` objects rather than deep
 * merging them, so every field must be repeated here. That is exactly what
 * this helper is for — no route should inherit the homepage's OG block.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE_NAME_MR} — दुर्मीळ ग्रंथ दालन`,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME_EN,
      locale: "mr_IN",
      url: path,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
