/**
 * Schema.org Structured Data Component for Sahitya Niketan Granthalaya
 * Implements JSON-LD for Library and BreadcrumbList.
 *
 * Rendered once in the root layout. Do not render <LibrarySchema /> again in a
 * page, or search engines will see duplicate Library entities.
 */

import {
  SITE_EMAIL,
  SITE_NAME_EN,
  SITE_NAME_MR,
  SITE_PHONE_E164,
  SITE_URL,
} from "@/lib/site";

export function LibrarySchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Library",
    "@id": `${SITE_URL}/#library`,
    "name": SITE_NAME_MR,
    "alternateName": [SITE_NAME_EN, "Sahitya Niketan Granthalaya Ambajogai"],
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/logo.png`,
    "image": `${SITE_URL}/images/real/library_signboard.png`,
    "description":
      "Established on 1 August 1945, Sahitya Niketan Granthalaya is a Maharashtra Government recognized Grade 'A' public library in Ambajogai holding 39,953 registered printed volumes, rare Modi script manuscripts, and reference reading hall facilities.",
    "foundingDate": "1945-08-01",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shukrawar Peth",
      "addressLocality": "Ambajogai",
      "addressRegion": "Maharashtra",
      "postalCode": "431517",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.7303,
      "longitude": 76.3831,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        "opens": "08:00",
        "closes": "20:00",
      },
    ],
    "telephone": SITE_PHONE_E164,
    "email": SITE_EMAIL,
    "priceRange": "Class 'A' Public Library",
    "publicAccess": true,
    "isAccessibleForFree": true,
    "sameAs": [
      "https://facebook.com/sahityaniketan.ambajogai",
      "https://youtube.com/@sahityaniketan",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": `${SITE_URL}${it.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
