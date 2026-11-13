import type { Metadata } from "next";
import { Navbar, Footer, PageHeader } from "@/components/layout";
import { buildPageMetadata } from "@/lib/metadata";
import {
  SITE_ADDRESS_MR,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
} from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "गोपनीयता धोरण / Privacy Policy",
  description:
    "साहित्य निकेतन ग्रंथालय कोणती वैयक्तिक माहिती गोळा करते, का गोळा करते, किती काळ ठेवते, कोणाला देते आणि आपले अधिकार काय आहेत याचे स्पष्ट धोरण.",
  path: "/privacy",
});

const LAST_UPDATED = "१३ नोव्हेंबर २०२६";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="font-marathi-body bg-[#FAF8F5] dark:bg-[#120B0D] min-h-screen transition-colors"
      >
        <PageHeader
          title="गोपनीयता धोरण"
          subtitle="आपली वैयक्तिक माहिती कशी गोळा केली जाते, का वापरली जाते आणि किती काळ ठेवली जाते याचे स्पष्ट उत्तर."
          categoryBadge="Privacy Policy"
        />

        <section className="section py-12 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-8">
            शेवटचे अद्ययावत: {LAST_UPDATED}
          </p>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                १. आम्ही कोण आहोत
              </h2>
              <p>
                साहित्य निकेतन सार्वजनिक ग्रंथालय, शुक्रवार पेठ, अंबाजोगाई —
                ४३१५१७, जि. बीड, महाराष्ट्र. हे धोरण आमच्या संकेतस्थळावर
                (sahityaniketan.org) लागू आहे. वैयक्तिक माहितीच्या बाबतीत
                ग्रंथालय हे &ldquo;Data Fiduciary&rdquo; आहे.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                २. आम्ही कोणती माहिती गोळा करतो
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>ओळख व संपर्क:</strong> पूर्ण नाव, ईमेल, मोबाईल
                  क्रमांक, रहिवासी पत्ता.
                </li>
                <li>
                  <strong>सभासदत्व अर्ज:</strong> ओळखपत्राचा प्रकार (आधार,
                  मतदान ओळखपत्र, पासपोर्ट किंवा विद्यार्थी ओळखपत्र). सध्या
                  आम्ही ओळखपत्र क्रमांक किंवा प्रतिमा संकेतस्थळावर गोळा करत
                  नाही; ती कार्यालयात प्रत्यक्ष तपासली जाते.
                </li>
                <li>
                  <strong>संदेश:</strong> आपण संपर्क अर्जात लिहिलेला विषय व
                  संदेश.
                </li>
                <li>
                  <strong>संमती:</strong> आपण संमती दिल्याची तारीख व वेळ.
                </li>
                <li>
                  <strong>तांत्रिक:</strong> संकेतस्थळ सुरक्षित ठेवण्यासाठी
                  आवश्यक असलेली मूलभूत लॉग माहिती. आम्ही जाहिरात किंवा
                  ट्रॅकिंग कुकीज वापरत नाही.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ३. माहिती का गोळा करतो
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>सभासदत्व अर्ज तपासणे, मंजूर करणे आणि सभासद नोंदणी ठेवणे.</li>
                <li>ग्रंथ देवाणघेवाण, आरक्षण आणि दालन प्रवेशाची नोंद ठेवणे.</li>
                <li>आपल्या प्रश्नांना, तक्रारींना किंवा विनंत्यांना उत्तर देणे.</li>
                <li>कार्यक्रम, सूचना आणि ग्रंथालय सेवांची माहिती देणे (आपली संमती असेल तर).</li>
                <li>कायदेशीर जबाबदाऱ्या पूर्ण करणे आणि गैरवापर रोखणे.</li>
              </ul>
              <p>
                आम्ही आपली माहिती जाहिरातदारांना विकत नाही किंवा भाड्याने देत
                नाही.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ४. कायदेशीर आधार
              </h2>
              <p>
                आम्ही माहिती आपल्या स्पष्ट संमतीवर आणि ग्रंथालय सेवा पुरवण्यासाठी
                आवश्यक असलेल्या कायदेशीर जबाबदाऱ्यांच्या आधारे गोळा करतो.
                संमती न देणे किंवा नंतर मागे घेणे यामुळे सभासदत्व अर्ज
                प्रक्रिया पूर्ण होऊ शकत नाही, परंतु इतर सेवा वापरण्यावर
                बंधन येत नाही.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ५. किती काळ ठेवतो
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>सभासद अर्ज व नोंदणी: सभासदत्व सक्रिय असताना आणि त्यानंतर ३ वर्षे.</li>
                <li>नामंजूर किंवा रद्द अर्ज: निर्णयानंतर १ वर्ष.</li>
                <li>संपर्क संदेश: प्रश्न सोडवल्यानंतर २४ महिने.</li>
                <li>वार्तापत्र सदस्यता: आपण अनसबस्क्राइब करेपर्यंत.</li>
                <li>कायदेशीर नोंदी: कायद्याने ठरवलेल्या कालावधीपर्यंत.</li>
              </ul>
              <p>
                कालावधी संपल्यावर माहिती सुरक्षितपणे हटवली किंवा अशी
                ओळखण्यायोग्य न राहील अशी केली जाते.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ६. माहिती कोणाला दिली जाते
              </h2>
              <p>
                आम्ही फक्त आवश्यक सेवा पुरवठादारांना मर्यादित माहिती देतो —
                संकेतस्थळ होस्टिंग, डेटाबेस, ईमेल वितरण आणि SMS सेवा. हे
                पुरवठादार आमच्या सूचनेनुसारच माहिती वापरतात. कायद्याने
                आवश्यक असल्यास सक्षम प्राधिकाऱ्यांना माहिती दिली जाऊ शकते.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ७. कुकीज व स्थानिक साठवण
              </h2>
              <p>
                संकेतस्थळ केवळ थीम (प्रकाश/गडद) आणि भाषा निवड लक्षात ठेवण्यासाठी
                ब्राउझरची स्थानिक साठवण वापरते. आम्ही जाहिरात, प्रोफाइलिंग
                किंवा तृतीय-पक्ष विश्लेषण कुकीज वापरत नाही.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ८. आपले अधिकार
              </h2>
              <p>
                आपल्याला आपली माहिती पाहण्याचा, दुरुस्त करण्याचा, हटवण्याचा,
                प्रत मिळवण्याचा आणि संमती मागे घेण्याचा अधिकार आहे. विनंती
                खालील संपर्कावर लिखित स्वरूपात पाठवा. आम्ही ३० दिवसांत उत्तर
                देण्याचा प्रयत्न करू.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ९. बालकांची माहिती
              </h2>
              <p>
                १८ वर्षांखालील वाचकाची नोंदणी पालक किंवा कायदेशीर पालनकर्त्याच्या
                संमतीनेच केली जाते. बालकांची माहिती जाहिरातीसाठी कधीही
                वापरली जात नाही.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                १०. तक्रार अधिकारी
              </h2>
              <p>
                गोपनीयता संबंधी प्रश्न, विनंत्या किंवा तक्रारींसाठी:
              </p>
              <div className="rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] p-4 space-y-1">
                <p className="font-bold text-stone-900 dark:text-[#FAF2E8]">
                  ग्रंथपाल, साहित्य निकेतन सार्वजनिक ग्रंथालय
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

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#800020] dark:text-[#E5B869] font-marathi-heading">
                ११. धोरणातील बदल
              </h2>
              <p>
                कायदा किंवा सेवा बदलल्यास हे धोरण अद्ययावत केले जाईल. महत्त्वाचा
                बदल झाल्यास संकेतस्थळावर सूचना प्रकाशित केली जाईल आणि
                आवश्यक असल्यास पुन्हा संमती मागितली जाईल.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
