import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { FAQPageSchema } from "@/components/seo/structured-data";
import { SITE_PHONE_DISPLAY, SITE_OFFICE_PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "संपर्क व वाचनालय वेळ",
  description:
    "साहित्य निकेतन सार्वजनिक ग्रंथालय, मंडई बाजार रोड, अंबाजोगाई येथील पत्ता, दूरध्वनी, ईमेल, वाचनालय वेळ आणि संपर्क अर्ज.",
  path: "/contact",
  image: "/images/real/library_signboard.png",
  imageAlt: "साहित्य निकेतन ग्रंथालयाचा पत्ता व प्रवेशद्वार",
});

const CONTACT_FAQS = [
  {
    question: "Where is Sahitya Niketan Library located in Ambajogai?",
    answer:
      "Sahitya Niketan Library is located at Mandai Bazar Road, Prashant Nagar, Gawli Pura, Ambajogai, Maharashtra 431517, India.",
  },
  {
    question: "How can I contact the library?",
    answer:
      `You can call ${SITE_PHONE_DISPLAY} or the office landline ${SITE_OFFICE_PHONE_DISPLAY}, email sahityaniketan.ambajogai@gmail.com, or use the contact form on this website.`,
  },
  {
    question: "What are the library timings?",
    answer:
      "The library is open Monday to Saturday from 8:00 AM to 8:00 PM.",
  },
  {
    question: "When was Sahitya Niketan established and what is its status?",
    answer:
      "Sahitya Niketan was established on 1 August 1945 during the Hyderabad State era to protect Marathi language and literature. It is recognized by the Government of Maharashtra with the highest Grade 'A' status as a public library.",
  },
  {
    question: "How many books and manuscripts does the library hold?",
    answer:
      "The library preserves 39,953 registered printed volumes along with rare Modi-script and Sanskrit manuscripts.",
  },
  {
    question: "ग्रंथालयाचा पत्ता व संपर्क काय आहे?",
    answer:
      "पत्ता: मंडई बाजार रोड, प्रशांत नगर, गव्हली पुरा, अंबाजोगाई, महाराष्ट्र ४३१५१७. दूरध्वनी: " + SITE_PHONE_DISPLAY + " (कार्यालय: " + SITE_OFFICE_PHONE_DISPLAY + "). ईमेल: sahityaniketan.ambajogai@gmail.com.",
  },
  {
    question: "वाचनालयाचे वेळापत्रक काय आहे?",
    answer: "वाचनालय सोमवार ते शनिवार सकाळी ८ ते रात्री ८ वाजेपर्यंत खुले असते.",
  },
];

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FAQPageSchema faqs={CONTACT_FAQS} />
      {children}
    </>
  );
}
