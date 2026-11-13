import type { Metadata } from "next";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { buildPageMetadata } from "@/lib/metadata";
import {
  SITE_ADDRESS_MR,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
} from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "वापरण्याच्या अटी / Terms of Use",
  description:
    "साहित्य निकेतन ग्रंथालयाचे संकेतस्थळ वापरण्याच्या अटी, सभासदत्व नियम, ग्रंथ देवाणघेवाण धोरण आणि जबाबदारीची मर्यादा.",
  path: "/terms",
});

const LAST_UPDATED = "१३ नोव्हेंबर २०२६";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors"
      >
        <PageHeader
          title="वापरण्याच्या अटी"
          subtitle="संकेतस्थळ, ग्रंथसूची आणि सभासदत्व सेवा वापरण्यासंबंधीचे नियम."
          categoryBadge="Terms of Use"
        />

        <section className="section py-12 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-8">
            शेवटचे अद्ययावत: {LAST_UPDATED}
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                १. अटींची स्वीकृती
              </h2>
              <p>
                हे संकेतस्थळ वापरून आपण या अटींना संमती दर्शवता. आपण सहमत नसल्यास
                संकेतस्थळ वापरू नये. ग्रंथालय कोणत्याही वेळी हे धोरण बदलू
                शकते; बदल प्रकाशित झाल्यापासून लागू होतील.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                २. सभासदत्व व शुल्क
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  सभासदत्व अर्जाची अंतिम मंजूरी ग्रंथालय कार्यकारिणीच्या
                  अधिकारात आहे. ऑनलाइन अर्ज सादर केल्याने सभासदत्व
                  स्वयंचलितपणे मिळत नाही.
                </li>
                <li>
                  वार्षिक व आजीवन वर्गणी, अनामत ठेव आणि अभ्यासिका शुल्क
                  ग्रंथालयाच्या अधिकृत दरपत्रकानुसार आहे.
                </li>
                <li>
                  शुल्क भरल्याची पावती कार्यालयातून मिळाल्याशिवाय सभासदत्व
                  प्रभावी होत नाही.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ३. ग्रंथ देवाणघेवाण
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>सभासदत्वाच्या वर्गानुसार ठरलेली पुस्तकेच घरी नेता येतील.</li>
                <li>मुदत संपल्यावर ग्रंथ परत करणे सभासदाची जबाबदारी आहे.</li>
                <li>
                  ग्रंथ हरवल्यास, फाटल्यास किंवा खराब झाल्यास ग्रंथालय
                  नियमावलीनुसार भरपाई देय असेल.
                </li>
                <li>संदर्भ ग्रंथ, दुर्मीळ हस्तलिखिते व वर्तमानपत्रे घरी दिली जात नाहीत.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ४. वाचनालय वर्तन
              </h2>
              <p>
                वाचन कक्ष व अभ्यासिकेत शांतता ठेवणे, मोबाईल स्वायलेंट ठेवणे,
                अन्न-पेय न आणणे आणि ग्रंथालयाच्या मालमत्तेची काळजी घेणे
                आवश्यक आहे. नियमांचे उल्लंघन झाल्यास प्रवेश बंद केला जाऊ शकतो.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ५. बौद्धिक संपदा
              </h2>
              <p>
                या संकेतस्थळावरील मजकूर, छायाचित्रे, ग्रंथसूची नोंदी आणि
                ग्रंथालयाचा लोगो ग्रंथालयाच्या मालकीचे आहेत. वैयक्तिक,
                अव्यावसायिक वापरासाठी उद्धरण करता येईल, परंतु पूर्वलेखी
                परवानगीशिवाय व्यावसायिक पुनःप्रकाशन करू नये.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ६. माहितीची अचूकता
              </h2>
              <p>
                ग्रंथसूची, कार्यक्रम वेळापत्रक आणि उपलब्धतेची माहिती
                अद्ययावत ठेवण्याचा प्रयत्न केला जातो, तरी त्रुटी राहू शकतात.
                अंतिम माहिती कार्यालयाकडून खात्री करावी. संकेतस्थळावरील
                माहितीवर आधारित कोणत्याही निर्णयाची जबाबदारी वापरकर्त्याची
                असेल.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ७. बाह्य दुवे
              </h2>
              <p>
                संकेतस्थळावर तृतीय-पक्ष संकेतस्थळांचे दुवे असू शकतात. त्या
                संकेतस्थळांच्या सामग्री, गोपनीयता धोरण किंवा सुरक्षेसाठी
                साहित्य निकेतन जबाबदार नाही.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ८. जबाबदारीची मर्यादा
              </h2>
              <p>
                संकेतस्थळ &ldquo;जसे आहे तसे&rdquo; उपलब्ध करून दिले जाते.
                सेवा खंड, तांत्रिक बिघाड, data loss किंवा संकेतस्थळाच्या
                वापरातून झालेल्या अप्रत्यक्ष नुकसानीसाठी ग्रंथालय जबाबदार
                राहणार नाही, कायद्याने अनिवार्य असेल तेवढाच अपवाद.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ९. लागू कायदा
              </h2>
              <p>
                या अटींवर भारताचे कायदे लागू आहेत. वादाचे निवारण अंबाजोगाई,
                जि. बीड, महाराष्ट्र येथील सक्षम न्यायालयाच्या अधिकारक्षेत्रात
                असेल.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                १०. संपर्क
              </h2>
              <div className="rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] p-4 space-y-1">
                <p className="font-bold text-stone-900 dark:text-[#FAF2E8]">
                  साहित्य निकेतन सार्वजनिक ग्रंथालय
                </p>
                <p>{SITE_ADDRESS_MR}</p>
                <p>
                  ईमेल:{" "}
                  <a className="underline" href={`mailto:${SITE_EMAIL}`}>
                    {SITE_EMAIL}
                  </a>
                </p>
                <p>दूरध्वनी: {SITE_PHONE_DISPLAY}</p>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
