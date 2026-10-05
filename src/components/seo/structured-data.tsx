/**
 * Schema.org Structured Data Component for Sahitya Niketan Granthalaya
 * Implements JSON-LD for Library, EducationalOrganization, and BreadcrumbList
 */

export function LibrarySchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Library",
    "name": "Sahitya Niketan Public Library & Reading Room (साहित्य निकेतन ग्रंथालय)",
    "alternateName": "Sahitya Niketan Granthalaya Ambajogai",
    "url": "https://sahityaniketan.org",
    "logo": "https://sahityaniketan.org/images/logo.png",
    "image": "https://sahityaniketan.org/images/real/library_signboard.png",
    "description": "Established on 1 August 1945, Sahitya Niketan Granthalaya is a Maharashtra Government recognized Grade 'A' public library in Ambajogai holding 39,953 registered printed volumes, rare Modi script manuscripts, and reference reading hall facilities.",
    "foundingDate": "1945-08-01",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shukrawar Peth",
      "addressLocality": "Ambajogai",
      "addressRegion": "Maharashtra",
      "postalCode": "431517",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.7303,
      "longitude": 76.3831
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "telephone": "+91-2446-242100",
    "priceRange": "Class 'A' Public Library",
    "sameAs": [
      "https://facebook.com/sahityaniketan.ambajogai",
      "https://youtube.com/@sahityaniketan"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; item: string }[] }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": `https://sahityaniketan.org${it.item}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
