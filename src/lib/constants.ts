/**
 * Application-wide constants for Sahitya Niketan Granthalaya
 */

export const SITE_CONFIG = {
  name: "Sahitya Niketan Granthalaya",
  nameHindi: "साहित्य निकेतन ग्रन्थालय",
  tagline: "Preserving Knowledge Across Generations",
  taglineHindi: "पीढ़ियों से ज्ञान का संरक्षण",
  description:
    "Sahitya Niketan Granthalaya is a premier cultural and educational heritage library dedicated to preserving Indian literature, history, and knowledge for future generations.",
  url: "https://sahityaniketan.org",
  email: "ta2601001@gmail.com",
  phone: "+91 90966 42583",
  address: "सरकारी रुग्णालय समोर, मंडी बाजार, शुक्रवार पेठ, अंबाजोगाई - ४३१५१७",
  foundedYear: 1945,
  openingDate: "1 August 1945",
  openingDateMarathi: "१ ऑगस्ट १९४५",
  totalBooks: 39953,
  totalBooksFormatted: "39,953",
  totalBooksMarathi: "३९,९५३",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Library", href: "/library" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  explore: [
    { label: "Book Catalogue", href: "/catalogue" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "News & Updates", href: "/news" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Library", href: "/library" },
    { label: "Committee", href: "/about#committee" },
    { label: "Membership", href: "/membership" },
  ],
  connect: [
    { label: "Contact Us", href: "/contact" },
    { label: "Volunteer", href: "/contact#volunteer" },
    { label: "Donate", href: "/contact#donate" },
  ],
} as const;

export const BOOK_AVAILABILITY = {
  available: { label: "Available", color: "forest" },
  issued: { label: "Issued", color: "maroon" },
  reference_only: { label: "Reference Only", color: "gold" },
  lost: { label: "Lost", color: "muted" },
} as const;

export const MEMBERSHIP_STATUS = {
  pending: { label: "Pending Review", color: "gold" },
  approved: { label: "Approved", color: "forest" },
  rejected: { label: "Rejected", color: "maroon" },
  expired: { label: "Expired", color: "muted" },
  renewed: { label: "Renewed", color: "forest" },
} as const;

export const POST_CATEGORIES = [
  { value: "update", label: "Daily Update" },
  { value: "announcement", label: "Announcement" },
  { value: "notice", label: "Notice" },
  { value: "achievement", label: "Achievement" },
] as const;

export const EVENT_STATUS = {
  upcoming: { label: "Upcoming", color: "gold" },
  ongoing: { label: "Ongoing", color: "forest" },
  past: { label: "Past", color: "muted" },
  cancelled: { label: "Cancelled", color: "maroon" },
} as const;

export const GALLERY_CATEGORIES = [
  { value: "events", label: "Events" },
  { value: "library", label: "Library" },
  { value: "heritage", label: "Heritage" },
  { value: "general", label: "General" },
] as const;

/** Animation variants for Framer Motion */
export const MOTION = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
} as const;

/** Breakpoints matching Tailwind defaults */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ITEMS_PER_PAGE = 12;
