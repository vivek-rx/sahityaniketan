import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई",
    short_name: "साहित्य निकेतन",
    description:
      "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त सार्वजनिक ग्रंथालय (स्थापना १९४५) — ग्रंथसूची, दुर्मीळ हस्तलिखिते, अभ्यासिका व इतिहास.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6F0",
    theme_color: "#800020",
    lang: "mr",
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
