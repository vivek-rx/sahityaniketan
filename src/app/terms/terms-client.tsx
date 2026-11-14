"use client";

import { Navbar, Footer, PageHeader } from "@/components/layout";
import { useLanguage } from "@/context/language-context";
import {
  SITE_ADDRESS_MR,
  SITE_ADDRESS_EN,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
} from "@/lib/site";

/** Trilingual string bundle: [marathi, hindi, english] */
type L3 = [string, string, string];

const ADDRESS: L3 = [SITE_ADDRESS_MR, SITE_ADDRESS_MR, SITE_ADDRESS_EN];

interface LegalBullet {
  /** Optional strong label rendered before the text */
  label?: L3;
  text: L3;
}

interface LegalSection {
  heading: L3;
  paragraphs?: L3[];
  bullets?: LegalBullet[];
  /** Trailing paragraph after the bullets */
  note?: L3;
  /** Renders the library contact card */
  contact?: boolean;
}

const LAST_UPDATED_LABEL: L3 = ["शेवटचे अद्ययावत:", "अंतिम अद्यतन:", "Last updated:"];
const LAST_UPDATED_DATE: L3 = [
  "१३ नोव्हेंबर २०२६",
  "१३ नवंबर २०२६",
  "13 November 2026",
];

const CONTACT_TITLE: L3 = [
  "साहित्य निकेतन सार्वजनिक ग्रंथालय",
  "साहित्य निकेतन सार्वजनिक पुस्तकालय",
  "Sahitya Niketan Public Library",
];

const EMAIL_LABEL: L3 = ["ईमेल:", "ईमेल:", "Email:"];
const PHONE_LABEL: L3 = ["दूरध्वनी:", "दूरभाष:", "Phone:"];

const SECTIONS: LegalSection[] = [
  {
    heading: ["१. अटींची स्वीकृती", "१. शर्तों की स्वीकृति", "1. Acceptance of Terms"],
    paragraphs: [
      [
        "हे संकेतस्थळ वापरून आपण या अटींना संमती दर्शवता. आपण सहमत नसल्यास संकेतस्थळ वापरू नये. ग्रंथालय कोणत्याही वेळी हे धोरण बदलू शकते; बदल प्रकाशित झाल्यापासून लागू होतील.",
        "इस वेबसाइट का उपयोग करके आप इन शर्तों से सहमति व्यक्त करते हैं। सहमत न होने पर वेबसाइट का उपयोग न करें। पुस्तकालय किसी भी समय यह नीति बदल सकता है; बदल प्रकाशित होने से लागू होंगे।",
        "By using this website you agree to these terms. If you do not agree, please do not use the website. The Library may change this policy at any time; changes take effect from the moment they are published.",
      ],
    ],
  },
  {
    heading: ["२. सभासदत्व व शुल्क", "२. सदस्यता एवं शुल्क", "2. Membership & Fees"],
    bullets: [
      {
        text: [
          "सभासदत्व अर्जाची अंतिम मंजूरी ग्रंथालय कार्यकारिणीच्या अधिकारात आहे. ऑनलाइन अर्ज सादर केल्याने सभासदत्व स्वयंचलितपणे मिळत नाही.",
          "सदस्यता आवेदन की अंतिम मंज़ूरी पुस्तकालय कार्यकारिणी के अधिकार में है। ऑनलाइन आवेदन जमा करने से सदस्यता स्वतः नहीं मिलती।",
          "Final approval of a membership application rests with the Library's Executive Committee. Submitting an online form does not grant membership automatically.",
        ],
      },
      {
        text: [
          "वार्षिक व आजीवन वर्गणी, अनामत ठेव आणि अभ्यासिका शुल्क ग्रंथालयाच्या अधिकृत दरपत्रकानुसार आहे.",
          "वार्षिक एवं आजीवन वर्गणी, प्रतिभूति राशि और अध्ययन कक्ष शुल्क पुस्तकालय के अधिकृत दरपत्रक के अनुसार हैं.",
          "Annual and life membership fees, the caution deposit and the study-room charges are as per the Library's official rate card.",
        ],
      },
      {
        text: [
          "शुल्क भरल्याची पावती कार्यालयातून मिळाल्याशिवाय सभासदत्व प्रभावी होत नाही.",
          "शुल्क भुगतान की रसीद कार्यालय से मिलने तक सदस्यता प्रभावी नहीं होती.",
          "Membership takes effect only after the office issues a receipt for the fee payment.",
        ],
      },
    ],
  },
  {
    heading: ["३. ग्रंथ देवाणघेवाण", "३. पुस्तक वितरण", "3. Book Lending"],
    bullets: [
      {
        text: [
          "सभासदत्वाच्या वर्गानुसार ठरलेली पुस्तकेच घरी नेता येतील.",
          "सदस्यता के वर्ग के अनुसार निर्धारित पुस्तक ही घर ले जाए जा सकते हैं.",
          "Only the number of books fixed for your membership category may be taken home.",
        ],
      },
      {
        text: [
          "मुदत संपल्यावर ग्रंथ परत करणे सभासदाची जबाबदारी आहे.",
          "अवधि समाप्त होने पर पुस्तक लौटाना सदस्य का दायित्व है.",
          "Returning books on time is the member's responsibility.",
        ],
      },
      {
        text: [
          "ग्रंथ हरवल्यास, फाटल्यास किंवा खराब झाल्यास ग्रंथालय नियमावलीनुसार भरपाई देय असेल.",
          "पुस्तक खो जाने, फटने अथवा क्षतिग्रस्त होने पर पुस्तकालय नियमावली के अनुसार क्षतिपूर्ति देय होगी.",
          "If a book is lost, torn or damaged, compensation is payable as per the Library's rules.",
        ],
      },
      {
        text: [
          "संदर्भ ग्रंथ, दुर्मीळ हस्तलिखिते व वर्तमानपत्रे घरी दिली जात नाहीत.",
          "संदर्भ ग्रंथ, दुर्लभ हस्तलिखित और समाचार पत्र घर दिए नहीं जाते.",
          "Reference books, rare manuscripts and current newspapers are not issued for home reading.",
        ],
      },
    ],
  },
  {
    heading: ["४. वाचनालय वर्तन", "४. वाचनालय आचरण", "4. Reading-Room Conduct"],
    paragraphs: [
      [
        "वाचन कक्ष व अभ्यासिकेत शांतता ठेवणे, मोबाईल स्वायलेंट ठेवणे, अन्न-पेय न आणणे आणि ग्रंथालयाच्या मालमत्तेची काळजी घेणे आवश्यक आहे. नियमांचे उल्लंघन झाल्यास प्रवेश बंद केला जाऊ शकतो.",
        "वाचन कक्ष और अध्ययन कक्ष में शांति रखना, मोबाइल साइलेंट रखना, भोजन-पेय न लाना और पुस्तकालय की संपत्ति का ध्यान रखना आवश्यक है। नियमों का उल्लंघन होने पर प्रवेश बंद किया जा सकता है।",
        "Silence must be maintained in the reading and study rooms, mobile phones kept on silent, food and drink not brought in, and the Library's property treated with care. Entry may be withdrawn for breach of these rules.",
      ],
    ],
  },
  {
    heading: ["५. बौद्धिक संपदा", "५. बौद्धिक संपदा", "5. Intellectual Property"],
    paragraphs: [
      [
        "या संकेतस्थळावरील मजकूर, छायाचित्रे, ग्रंथसूची नोंदी आणि ग्रंथालयाचा लोगो ग्रंथालयाच्या मालकीचे आहेत. वैयक्तिक, अव्यावसायिक वापरासाठी उद्धरण करता येईल, परंतु पूर्वलेखी परवानगीशिवाय व्यावसायिक पुनःप्रकाशन करू नये.",
        "इस वेबसाइट की सामग्री, फोटो, पुस्तक-सूची प्रविष्टियाँ और पुस्तकालय का लोगो पुस्तकालय की संपत्ति हैं। व्यक्तिगत, गैर-व्यावसायिक उपयोग के लिए उद्धरण दिया जा सकता है, परंतु पूर्व लिखित अनुमति के बिना व्यावसायिक पुनःप्रकाशन न करें।",
        "The content, photographs, catalogue records and the Library's logo on this website are the property of the Library. Quotation for personal, non-commercial use is permitted, but commercial republication requires prior written permission.",
      ],
    ],
  },
  {
    heading: ["६. माहितीची अचूकता", "६. जानकारी की सटीकता", "6. Accuracy of Information"],
    paragraphs: [
      [
        "ग्रंथसूची, कार्यक्रम वेळापत्रक आणि उपलब्धतेची माहिती अद्ययावत ठेवण्याचा प्रयत्न केला जातो, तरी त्रुटी राहू शकतात. अंतिम माहिती कार्यालयाकडून खात्री करावी. संकेतस्थळावरील माहितीवर आधारित कोणत्याही निर्णयाची जबाबदारी वापरकर्त्याची असेल.",
        "पुस्तक-सूची, कार्यक्रम समय-सारणी और उपलब्धता की जानकारी अद्यतन रखने का प्रयास किया जाता है, फिर भी त्रुटियाँ रह सकती हैं। अंतिम जानकारी कार्यालय से पक्की करें। वेबसाइट की जानकारी पर आधारित किसी भी निर्णय का दायित्व उपयोगकर्ता का होगा.",
        "We strive to keep the catalogue, event schedules and availability information up to date, but errors may remain. Please confirm final details with the office. Responsibility for any decision based on website information rests with the user.",
      ],
    ],
  },
  {
    heading: ["७. बाह्य दुवे", "७. बाहरी लिंक", "7. External Links"],
    paragraphs: [
      [
        "संकेतस्थळावर तृतीय-पक्ष संकेतस्थळांचे दुवे असू शकतात. त्या संकेतस्थळांच्या सामग्री, गोपनीयता धोरण किंवा सुरक्षेसाठी साहित्य निकेतन जबाबदार नाही.",
        "वेबसाइट पर तृतीय-पक्ष वेबसाइटों के लिंक हो सकते हैं। उन वेबसाइटों की सामग्री, गोपनीयता नीति अथवा सुरक्षा के लिए साहित्य निकेतन उत्तरदायी नहीं है।",
        "This website may contain links to third-party websites. Sahitya Niketan is not responsible for their content, privacy practices or security.",
      ],
    ],
  },
  {
    heading: ["८. जबाबदारीची मर्यादा", "८. दायित्व की सीमा", "8. Limitation of Liability"],
    paragraphs: [
      [
        "संकेतस्थळ “जसे आहे तसे” उपलब्ध करून दिले जाते. सेवा खंड, तांत्रिक बिघाड, data loss किंवा संकेतस्थळाच्या वापरातून झालेल्या अप्रत्यक्ष नुकसानीसाठी ग्रंथालय जबाबदार राहणार नाही, कायद्याने अनिवार्य असेल तेवढाच अपवाद.",
        "वेबसाइट “जैसी है वैसी” उपलब्ध कराई जाती है। सेवा अवरोध, तकनीकी खराबी, डेटा हानि अथवा वेबसाइट के उपयोग से हुए अप्रत्यक्ष नुकसान के लिए पुस्तकालय उत्तरदायी नहीं रहेगा, कानून द्वारा अनिवार्य होने तक ही अपवाद.",
        "The website is provided “as is”. The Library accepts no liability for service interruptions, technical faults, data loss or indirect damage arising from use of the website, except where such liability cannot be excluded by law.",
      ],
    ],
  },
  {
    heading: ["९. लागू कायदा", "९. लागू कानून", "9. Governing Law"],
    paragraphs: [
      [
        "या अटींवर भारताचे कायदे लागू आहेत. वादाचे निवारण अंबाजोगाई, जि. बीड, महाराष्ट्र येथील सक्षम न्यायालयाच्या अधिकारक्षेत्रात असेल.",
        "इन शर्तों पर भारत के कानून लागू होते हैं। विवाद का निपटारा अंबाजोगाई, जि. बीड, महाराष्ट्र के सक्षम न्यायालय के क्षेत्राधिकार में होगा.",
        "These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the competent courts at Ambajogai, Dist. Beed, Maharashtra.",
      ],
    ],
  },
  {
    heading: ["१०. संपर्क", "१०. संपर्क", "10. Contact"],
    contact: true,
  },
];

export default function TermsClient() {
  const { language } = useLanguage();
  const idx = language === "en" ? 2 : language === "hi" ? 1 : 0;
  const pick = (t: L3) => t[idx];

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors"
      >
        <PageHeader
          title={pick(["वापरण्याच्या अटी", "उपयोग की शर्तें", "Terms of Use"])}
          subtitle={pick([
            "संकेतस्थळ, ग्रंथसूची आणि सभासदत्व सेवा वापरण्यासंबंधीचे नियम.",
            "वेबसाइट, पुस्तक-सूची और सदस्यता सेवाओं के उपयोग संबंधी नियम.",
            "Rules for using the website, the catalogue and the membership services.",
          ])}
          categoryBadge={pick(["वापरण्याच्या अटी", "उपयोग की शर्तें", "Terms of Use"])}
        />

        <section className="section py-12 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-8">
            {pick(LAST_UPDATED_LABEL)} {pick(LAST_UPDATED_DATE)}
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
            {SECTIONS.map((section) => (
              <section key={pick(section.heading)} className="space-y-3">
                <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                  {pick(section.heading)}
                </h2>

                {section.paragraphs?.map((text, i) => (
                  <p key={i}>{pick(text)}</p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2">
                    {section.bullets.map((bullet, i) => (
                      <li key={i}>
                        {bullet.label && <strong>{pick(bullet.label)} </strong>}
                        {pick(bullet.text)}
                      </li>
                    ))}
                  </ul>
                )}

                {section.note && <p>{pick(section.note)}</p>}

                {section.contact && (
                  <div className="rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] p-4 space-y-1">
                    <p className="font-bold text-stone-900 dark:text-[#FAF2E8]">
                      {pick(CONTACT_TITLE)}
                    </p>
                    <p>{pick(ADDRESS)}</p>
                    <p>
                      {pick(EMAIL_LABEL)}{" "}
                      <a className="underline" href={`mailto:${SITE_EMAIL}`}>
                        {SITE_EMAIL}
                      </a>
                    </p>
                    <p>{pick(PHONE_LABEL)} {SITE_PHONE_DISPLAY}</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
