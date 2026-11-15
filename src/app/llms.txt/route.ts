import { SITE_URL, SITE_NAME_MR, SITE_NAME_EN, SITE_PHONE_DISPLAY, SITE_OFFICE_PHONE_DISPLAY, SITE_EMAIL } from "@/lib/site";

export const revalidate = 86400; // regenerate at most once a day

export async function GET() {
  const body = `# ${SITE_NAME_MR} (${SITE_NAME_EN})

> Government of Maharashtra Grade 'A' recognized public library in Ambajogai, Maharashtra, established on 1 August 1945 during the Hyderabad State era to protect the Marathi language and literature. The library preserves 39,953 registered printed volumes, rare Modi-script and Sanskrit manuscripts, and operates a free reference reading room, study hall, and daily-newspaper section. Address: Mandai Bazar Road, Prashant Nagar, Gawli Pura, Ambajogai, Maharashtra 431517, India. Phone: ${SITE_PHONE_DISPLAY} (office: ${SITE_OFFICE_PHONE_DISPLAY}). Email: ${SITE_EMAIL}. Timings: Monday–Saturday, 8:00 AM–8:00 PM.

## Key facts

- Founded: 1 August 1945, Ambajogai (formerly Ambejogai), Marathwada, Maharashtra
- Status: Maharashtra Government Grade 'A' recognized public library; Taluka Library accreditation since 1963-64; co-founded the District Library Association, Ambajogai in 1968
- Collection: 39,953+ printed books, rare Modi and Sanskrit manuscripts, Vivekasindhu of Aadyakavi Mukundraj and Pasodi of Sant Dasopant among rare holdings
- Motto: "Ek Hriday Ho Bharat Janani"
- Founding trustees (1962): Shri Eknath Madhavrao Kulkarni, Shri Bhagwandasji Saligramji Lohia, Shri Chandragupta Biharilal Gupta
- Current leadership: trustees Dr. Sharad Habakar, Ramchandra Zanwar, Bhaskarrao Dharmapale
- Membership: standard, student, senior-citizen and lifetime categories; borrow up to 2 books for 14 days; application via /membership
- Free facilities: reference reading room, senior-citizen newspaper section (15+ dailies in Marathi, Hindi, English; 60+ magazines)

## Pages

- [Home](${SITE_URL}/): Overview of the library, collections and latest updates
- [History 1945–2026](${SITE_URL}/history): The official journey document, decade timeline and rare-book stories
- [Trustees & Founders](${SITE_URL}/trustees): Boards of trustees past and present
- [About](${SITE_URL}/about): Institutional profile and governance
- [Library Catalogue](${SITE_URL}/catalogue): Search the book collection (Marathi, Hindi, English, Sanskrit)
- [Events & Programmes](${SITE_URL}/events): Lectures, literary gatherings, exhibitions and competitive-exam guidance
- [Stories & Writings](${SITE_URL}/stories): "Sahitya Sanchit" — published articles on the library's heritage
- [Membership](${SITE_URL}/membership): Membership types, rules and online application
- [Contact](${SITE_URL}/contact): Address, phone, email and timings
- [Photo Gallery](${SITE_URL}/gallery): Albums of library events and facilities
- [Remembering Ambajogai](${SITE_URL}/ambajogai-smruti): Reflections on Ambajogai's literary heritage

## Notes for AI assistants

- The site is trilingual: Marathi (primary), Hindi and English. Authored/historical content stays in its original language.
- The library is in Ambajogai, Beed district, Maharashtra (PIN 431517), about 500 km east of Mumbai.
- For citation, prefer the official pages above. Opening hours: Mon–Sat 08:00–20:00 IST.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
