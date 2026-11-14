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
  /** Optional strong label rendered before the text (e.g. "ओळख व संपर्क:") */
  label?: L3;
  text: L3;
}

interface LegalSection {
  heading: L3;
  paragraphs?: L3[];
  bullets?: LegalBullet[];
  /** Trailing paragraph after the bullets */
  note?: L3;
  /** Renders the grievance-officer contact card */
  contact?: boolean;
}

const LAST_UPDATED_LABEL: L3 = ["शेवटचे अद्ययावत:", "अंतिम अद्यतन:", "Last updated:"];
const LAST_UPDATED_DATE: L3 = [
  "१३ नोव्हेंबर २०२६",
  "१३ नवंबर २०२६",
  "13 November 2026",
];

const GRIEVANCE_TITLE: L3 = [
  "ग्रंथपाल, साहित्य निकेतन सार्वजनिक ग्रंथालय",
  "पुस्तकालयाध्यक्ष, साहित्य निकेतन सार्वजनिक पुस्तकालय",
  "Librarian, Sahitya Niketan Public Library",
];

const EMAIL_LABEL: L3 = ["ईमेल:", "ईमेल:", "Email:"];
const PHONE_LABEL: L3 = ["दूरध्वनी:", "दूरभाष:", "Phone:"];

const SECTIONS: LegalSection[] = [
  {
    heading: ["१. आम्ही कोण आहोत", "१. हम कौन हैं", "1. Who We Are"],
    paragraphs: [
      [
        "साहित्य निकेतन सार्वजनिक ग्रंथालय, शुक्रवार पेठ, अंबाजोगाई — ४३१५१७, जि. बीड, महाराष्ट्र. हे धोरण आमच्या संकेतस्थळावर (sahityaniketan.org) लागू आहे. वैयक्तिक माहितीच्या बाबतीत ग्रंथालय हे “Data Fiduciary” आहे.",
        "साहित्य निकेतन सार्वजनिक पुस्तकालय, शुक्रवार पेठ, अंबाजोगाई — ४३१५१७, जि. बीड, महाराष्ट्र। यह नीति हमारी वेबसाइट (sahityaniketan.org) पर लागू होती है। व्यक्तिगत जानकारी के विषय में पुस्तकालय “Data Fiduciary” (आंकड़ा-संरक्षक) है।",
        "Sahitya Niketan Public Library, Shukrawar Peth, Ambajogai — 431517, Dist. Beed, Maharashtra. This policy applies to our website (sahityaniketan.org). With regard to personal information, the Library is a “Data Fiduciary”.",
      ],
    ],
  },
  {
    heading: [
      "२. आम्ही कोणती माहिती गोळा करतो",
      "२. हम कौन-सी जानकारी एकत्र करते हैं",
      "2. What Information We Collect",
    ],
    bullets: [
      {
        label: ["ओळख व संपर्क:", "पहचान एवं संपर्क:", "Identity & contact:"],
        text: [
          "पूर्ण नाव, ईमेल, मोबाईल क्रमांक, रहिवासी पत्ता.",
          "पूर्ण नाम, ईमेल, मोबाइल नंबर, निवासी पत्ता.",
          "Full name, email, mobile number and residential address.",
        ],
      },
      {
        label: ["सभासदत्व अर्ज:", "सदस्यता आवेदन:", "Membership application:"],
        text: [
          "ओळखपत्राचा प्रकार (आधार, मतदान ओळखपत्र, पासपोर्ट किंवा विद्यार्थी ओळखपत्र). सध्या आम्ही ओळखपत्र क्रमांक किंवा प्रतिमा संकेतस्थळावर गोळा करत नाही; ती कार्यालयात प्रत्यक्ष तपासली जाते.",
          "पहचान पत्र का प्रकार (आधार, मतदाता पहचान पत्र, पासपोर्ट अथवा छात्र पहचान पत्र)। फिलहाल हम पहचान पत्र का नंबर अथवा छवि वेबसाइट पर एकत्र नहीं करते; उसे कार्यालय में प्रत्यक्ष जाँचा जाता है.",
          "The type of identity document (Aadhaar, voter ID, passport or student ID). At present we do not collect ID numbers or images through the website; they are verified in person at the office.",
        ],
      },
      {
        label: ["संदेश:", "संदेश:", "Messages:"],
        text: [
          "आपण संपर्क अर्जात लिहिलेला विषय व संदेश.",
          "आपने संपर्क आवेदन में लिखा विषय और संदेश.",
          "The subject and message you write in the contact form.",
        ],
      },
      {
        label: ["संमती:", "सहमति:", "Consent:"],
        text: [
          "आपण संमती दिल्याची तारीख व वेळ.",
          "आपकी सहमति देने की तिथि और समय.",
          "The date and time you gave consent.",
        ],
      },
      {
        label: ["तांत्रिक:", "तकनीकी:", "Technical:"],
        text: [
          "संकेतस्थळ सुरक्षित ठेवण्यासाठी आवश्यक असलेली मूलभूत लॉग माहिती. आम्ही जाहिरात किंवा ट्रॅकिंग कुकीज वापरत नाही.",
          "वेबसाइट सुरक्षित रखने के लिए आवश्यक बुनियादी लॉग जानकारी। हम विज्ञापन अथवा ट्रैकिंग कुकीज़ का उपयोग नहीं करते.",
          "Basic log information necessary to keep the website secure. We do not use advertising or tracking cookies.",
        ],
      },
    ],
  },
  {
    heading: ["३. माहिती का गोळा करतो", "३. जानकारी क्यों एकत्र करते हैं", "3. Why We Collect Information"],
    bullets: [
      {
        text: [
          "सभासदत्व अर्ज तपासणे, मंजूर करणे आणि सभासद नोंदणी ठेवणे.",
          "सदस्यता आवेदन की जाँच करना, मंज़ूर करना और सदस्य पंजी रखना.",
          "Verifying, approving and registering membership applications.",
        ],
      },
      {
        text: [
          "ग्रंथ देवाणघेवाण, आरक्षण आणि दालन प्रवेशाची नोंद ठेवणे.",
          "पुस्तक लेन-देन, आरक्षण और प्रांगण प्रवेश का रिकॉर्ड रखना.",
          "Keeping records of book lending, reservations and hall entry.",
        ],
      },
      {
        text: [
          "आपल्या प्रश्नांना, तक्रारींना किंवा विनंत्यांना उत्तर देणे.",
          "आपके प्रश्नों, शिकायतों अथवा अनुरोधों का उत्तर देना.",
          "Answering your questions, complaints or requests.",
        ],
      },
      {
        text: [
          "कार्यक्रम, सूचना आणि ग्रंथालय सेवांची माहिती देणे (आपली संमती असेल तर).",
          "कार्यक्रम, सूचनाएँ और पुस्तकालय सेवाओं की जानकारी देना (यदि आपकी सहमति हो).",
          "Informing you about events, notices and library services (if you consent).",
        ],
      },
      {
        text: [
          "कायदेशीर जबाबदाऱ्या पूर्ण करणे आणि गैरवापर रोखणे.",
          "कानूनी दायित्व पूरा करना और दुरुपयोग रोकना.",
          "Fulfilling legal obligations and preventing misuse.",
        ],
      },
    ],
    note: [
      "आम्ही आपली माहिती जाहिरातदारांना विकत नाही किंवा भाड्याने देत नाही.",
      "हम आपकी जानकारी विज्ञापनदाताओं को बेचते अथवा किराये पर नहीं देते।",
      "We never sell or rent your information to advertisers.",
    ],
  },
  {
    heading: ["४. कायदेशीर आधार", "४. कानूनी आधार", "4. Legal Basis"],
    paragraphs: [
      [
        "आम्ही माहिती आपल्या स्पष्ट संमतीवर आणि ग्रंथालय सेवा पुरवण्यासाठी आवश्यक असलेल्या कायदेशीर जबाबदाऱ्यांच्या आधारे गोळा करतो. संमती न देणे किंवा नंतर मागे घेणे यामुळे सभासदत्व अर्ज प्रक्रिया पूर्ण होऊ शकत नाही, परंतु इतर सेवा वापरण्यावर बंधन येत नाही.",
        "हम जानकारी आपकी स्पष्ट सहमति पर और पुस्तकालय सेवाएँ देने के लिए आवश्यक कानूनी दायित्वों के आधार पर एकत्र करते हैं। सहमति न देना अथवा बाद में वापस लेने से सदस्यता आवेदन की प्रक्रिया पूर्ण नहीं हो सकती, परंतु अन्य सेवाओं के उपयोग पर कोई बंधन नहीं आता।",
        "We collect information on the basis of your explicit consent and of legal obligations necessary for providing library services. Withholding or later withdrawing consent may prevent your membership application from being completed, but it does not restrict your use of other services.",
      ],
    ],
  },
  {
    heading: ["५. किती काळ ठेवतो", "५. जानकारी किती समय तक रखते हैं", "5. How Long We Retain Information"],
    bullets: [
      {
        text: [
          "सभासद अर्ज व नोंदणी: सभासदत्व सक्रिय असताना आणि त्यानंतर ३ वर्षे.",
          "सदस्य आवेदन और पंजीकरण: सदस्यता सक्रिय रहने तक और उसके बाद ३ वर्ष.",
          "Membership applications & register: while the membership is active and for 3 years thereafter.",
        ],
      },
      {
        text: [
          "नामंजूर किंवा रद्द अर्ज: निर्णयानंतर १ वर्ष.",
          "अस्वीकृत अथवा रद्द आवेदन: निर्णय के बाद १ वर्ष.",
          "Rejected or withdrawn applications: 1 year after the decision.",
        ],
      },
      {
        text: [
          "संपर्क संदेश: प्रश्न सोडवल्यानंतर २४ महिने.",
          "संपर्क संदेश: प्रश्न सुलझने के बाद २४ महीने.",
          "Contact messages: 24 months after the query is resolved.",
        ],
      },
      {
        text: [
          "वार्तापत्र सदस्यता: आपण अनसबस्क्राइब करेपर्यंत.",
          "समाचारपत्र सदस्यता: आपके अनसब्सक्राइब करने तक.",
          "Newsletter subscriptions: until you unsubscribe.",
        ],
      },
      {
        text: [
          "कायदेशीर नोंदी: कायद्याने ठरवलेल्या कालावधीपर्यंत.",
          "कानूनी रिकॉर्ड: कानून द्वारा निर्धारित अवधि तक.",
          "Legal records: for the periods prescribed by law.",
        ],
      },
    ],
    note: [
      "कालावधी संपल्यावर माहिती सुरक्षितपणे हटवली किंवा अशी ओळखण्यायोग्य न राहील अशी केली जाते.",
      "अवधि समाप्त होने पर जानकारी सुरक्षित रीति से हटा दी जाती है अथवा ऐसी की जाती है कि उसकी पहचान न रहे.",
      "Once the period expires, the information is securely deleted or irreversibly anonymised.",
    ],
  },
  {
    heading: [
      "६. माहिती कोणाला दिली जाते",
      "६. जानकारी किसे दी जाती है",
      "6. Who We Share Information With",
    ],
    paragraphs: [
      [
        "आम्ही फक्त आवश्यक सेवा पुरवठादारांना मर्यादित माहिती देतो — संकेतस्थळ होस्टिंग, डेटाबेस, ईमेल वितरण आणि SMS सेवा. हे पुरवठादार आमच्या सूचनेनुसारच माहिती वापरतात. कायद्याने आवश्यक असल्यास सक्षम प्राधिकाऱ्यांना माहिती दिली जाऊ शकते.",
        "हम केवल आवश्यक सेवा प्रदाताओं को सीमित जानकारी देते हैं — वेबसाइट होस्टिंग, डेटाबेस, ईमेल वितरण और SMS सेवा। ये प्रदाता हमारे निर्देशानुसार ही जानकारी का उपयोग करते हैं। कानून द्वारा आवश्यक होने पर सक्षम प्राधिकारियों को जानकारी दी जा सकती है।",
        "We share only limited information with essential service providers — website hosting, database, email delivery and SMS services. These providers use the information strictly on our instructions. Where required by law, information may be disclosed to competent authorities.",
      ],
    ],
  },
  {
    heading: [
      "७. कुकीज व स्थानिक साठवण",
      "७. कुकीज़ एवं लोकल स्टोरेज",
      "7. Cookies & Local Storage",
    ],
    paragraphs: [
      [
        "संकेतस्थळ केवळ थीम (प्रकाश/गडद) आणि भाषा निवड लक्षात ठेवण्यासाठी ब्राउझरची स्थानिक साठवण वापरते. आम्ही जाहिरात, प्रोफाइलिंग किंवा तृतीय-पक्ष विश्लेषण कुकीज वापरत नाही.",
        "वेबसाइट केवल थीम (लाइट/डार्क) और भाषा पसंद याद रखने के लिए ब्राउज़र का लोकल स्टोरेज उपयोग करती है। हम विज्ञापन, प्रोफाइलिंग अथवा तृतीय-पक्ष विश्लेषण कुकीज़ का उपयोग नहीं करते।",
        "The website uses the browser's local storage only to remember your theme (light/dark) and language preference. We do not use advertising, profiling or third-party analytics cookies.",
      ],
    ],
  },
  {
    heading: ["८. आपले अधिकार", "८. आपके अधिकार", "8. Your Rights"],
    paragraphs: [
      [
        "आपल्याला आपली माहिती पाहण्याचा, दुरुस्त करण्याचा, हटवण्याचा, प्रत मिळवण्याचा आणि संमती मागे घेण्याचा अधिकार आहे. विनंती खालील संपर्कावर लिखित स्वरूपात पाठवा. आम्ही ३० दिवसांत उत्तर देण्याचा प्रयत्न करू.",
        "आपको अपनी जानकारी देखने, सुधारने, हटाने, प्रति प्राप्त करने और सहमति वापस लेने का अधिकार है। अनुरोध नीचे दिए गए संपर्क पर लिखित रूप में भेजें। हम ३० दिनों में उत्तर देने का प्रयास करेंगे।",
        "You have the right to view, correct, delete and obtain a copy of your information, and to withdraw consent. Send requests in writing to the contact below. We will endeavour to respond within 30 days.",
      ],
    ],
  },
  {
    heading: ["९. बालकांची माहिती", "९. बच्चों की जानकारी", "9. Children's Information"],
    paragraphs: [
      [
        "१८ वर्षांखालील वाचकाची नोंदणी पालक किंवा कायदेशीर पालनकर्त्याच्या संमतीनेच केली जाते. बालकांची माहिती जाहिरातीसाठी कधीही वापरली जात नाही.",
        "१८ वर्ष से कम आयु के पाठक का पंजीकरण अभिभावक अथवा कानूनी संरक्षक की सहमति से ही किया जाता है। बच्चों की जानकारी विज्ञापन के लिए कभी उपयोग नहीं की जाती।",
        "Readers under 18 are registered only with the consent of a parent or legal guardian. Children's information is never used for advertising.",
      ],
    ],
  },
  {
    heading: ["१०. तक्रार अधिकारी", "१०. शिकायत अधिकारी", "10. Grievance Officer"],
    paragraphs: [
      [
        "गोपनीयता संबंधी प्रश्न, विनंत्या किंवा तक्रारींसाठी:",
        "गोपनीयता संबंधी प्रश्नों, अनुरोधों अथवा शिकायतों के लिए:",
        "For privacy-related questions, requests or complaints:",
      ],
    ],
    contact: true,
  },
  {
    heading: ["११. धोरणातील बदल", "११. नीति में बदल", "11. Changes to This Policy"],
    paragraphs: [
      [
        "कायदा किंवा सेवा बदलल्यास हे धोरण अद्ययावत केले जाईल. महत्त्वाचा बदल झाल्यास संकेतस्थळावर सूचना प्रकाशित केली जाईल आणि आवश्यक असल्यास पुन्हा संमती मागितली जाईल.",
        "कानून अथवा सेवा में बदल होने पर यह नीति अद्यतन की जाएगी। कोई महत्वपूर्ण बदल होने पर वेबसाइट पर सूचना प्रकाशित की जाएगी और आवश्यक होने पर पुनः सहमति माँगी जाएगी।",
        "This policy will be updated if the law or our services change. Material changes will be announced on the website and, where necessary, consent will be sought again.",
      ],
    ],
  },
];

export default function PrivacyClient() {
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
          title={pick(["गोपनीयता धोरण", "गोपनीयता नीति", "Privacy Policy"])}
          subtitle={pick([
            "आपली वैयक्तिक माहिती कशी गोळा केली जाते, का वापरली जाते आणि किती काळ ठेवली जाते याचे स्पष्ट उत्तर.",
            "आपकी व्यक्तिगत जानकारी कैसे एकत्र की जाती है, क्यों उपयोग की जाती है और कितने समय तक रखी जाती है, इसके स्पष्ट उत्तर.",
            "Clear answers on how your personal information is collected, why it is used, and how long it is kept.",
          ])}
          categoryBadge={pick(["गोपनीयता धोरण", "गोपनीयता नीति", "Privacy Policy"])}
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
                      {pick(GRIEVANCE_TITLE)}
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
