import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { FAQPageSchema } from "@/components/seo/structured-data";
import { SITE_PHONE_DISPLAY, SITE_OFFICE_PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "सभासदत्व व अभ्यासिका",
  description:
    "साहित्य निकेतन ग्रंथालयाचे वार्षिक, आजीवन व अभ्यासिका सभासदत्व दर, अनामत ठेव, नियम आणि ऑनलाइन नोंदणी अर्ज.",
  path: "/membership",
  image: "/images/real/library_window.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाची वातानुकूलित अभ्यासिका",
});

const MEMBERSHIP_FAQS = [
  {
    question: "Who can become a member of Sahitya Niketan Library, Ambajogai?",
    answer:
      "Anyone may apply for membership — the library offers standard, student, senior-citizen and lifetime categories. Applications can be submitted through the online form on the membership page or at the library counter at Mandai Bazar Road, Prashant Nagar, Gawli Pura, Ambajogai, Maharashtra 431517.",
  },
  {
    question: "How many books can I borrow and for how long?",
    answer:
      "Members can borrow up to 2 books at a time for 14 days, as per the library's circulation rules.",
  },
  {
    question: "Does the library have a study hall and reading room?",
    answer:
      "Yes. Sahitya Niketan provides a quiet, well-lit study hall (अभ्यासिका) and a reference reading room, free for readers. More than 15 Marathi, Hindi and English newspapers and 60+ magazines are available free of cost.",
  },
  {
    question: "What are the library timings?",
    answer:
      "The library is open Monday to Saturday from 8:00 AM to 8:00 PM.",
  },
  {
    question: "What do members get access to?",
    answer:
      "Members get access to 39,953 registered printed volumes and reference collections, the study hall and reference reading room, and invitations to annual lecture series, literary programmes and book exhibitions.",
  },
  {
    question: "साहित्य निकेतन ग्रंथालयाचे सभासद कोण होऊ शकतात?",
    answer:
      "कोणताही वाचक सभासद होऊ शकतो. सभासदत्वाच्या वार्षिक, विद्यार्थी, ज्येष्ठ नागरिक व आजीवन या श्रेणी उपलब्ध आहेत. अर्ज वेबसाइटवरील ऑनलाइन नोंदणी फॉर्म किंवा ग्रंथालय कार्यालयात (मंडई बाजार रोड, प्रशांत नगर, गव्हली पुरा, अंबाजोगाई ४३१५१७) सादर करता येतो.",
  },
  {
    question: "एका वेळी किती ग्रंथ घरी नेता येतात?",
    answer:
      "सभासद एका वेळी २ ग्रंथ १४ दिवसांच्या मुदतीसाठी घरी नेऊ शकतात (जागीच्या नियमांनुसार).",
  },
];

export default function MembershipLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FAQPageSchema faqs={MEMBERSHIP_FAQS} />
      {children}
    </>
  );
}
