"use client";

import React, { useMemo } from "react";
import { ContourTimeline, ContourTimelineItem } from "@/components/ui/contour-timeline";
import { useLanguage } from "@/context/language-context";

const MARATHI_MILESTONES: ContourTimelineItem[] = [
  {
    year: "१९४५",
    label: "स्थापना पर्व",
    title: "स्थापना: एका उदात्त विचाराचा जन्म",
    description:
      "“अनेक हृदय हो भारत जननी” या उदात्त प्रेरणेने १ ऑगस्ट १९४५ रोजी अंबाजोगाईत साहित्य निकेतनची स्थापना झाली. श्री. गोविंदलाल जानू, विश्वराव जाधव, रामचंद्रजी क्षीरसागर, विपत वहमवार, चंद्रगुप्त आर्य, के. बी. पाटील, प्र. गो. रामदासी या ध्येयवादी तरुणांनी स्वातंत्र्यलढ्यात लोकजागृतीसाठी ग्रंथालय सुरू केले.",
    image: {
      src: "/images/real/library_inauguration_plaque.webp",
      alt: "स्थापना शिलालेख फलक १९४५",
    },
    linkLabel: "स्थापना इतिहास वाचा",
    link: "/history#founding-chapter",
    newTab: false,
    showImage: true,
  },
  {
    year: "१९५०",
    label: "पायाभरणी",
    title: "राष्ट्रभाषा हिंदी वर्ग व समर्पित शिक्षक सेवा",
    description:
      "सुरुवातीच्या काळात चंदुलाल गुल्ला व नंतर दलका कुकर यांच्या जागेत ग्रंथालय चालले. सोबतच 'हिंदी प्रचार सभा, हैदराबाद' अंतर्गत वर्ग सुरू झाले. प्र. गो. भावठाणकर, ज्ञा. लु. खोपुसकर, विनायकराव जानवळकर, प्र. गो. रामदासी यांनी अल्प मानधनातून ग्रंथालय वाढीस मोठे योगदान दिले.",
    image: {
      src: "/images/real/library_vintage_books.webp",
      alt: "दुर्मीळ ऐतिहासिक ग्रंथ संग्रह",
    },
    linkLabel: "प्रारंभीचे कार्य",
    link: "/history#early-years",
    newTab: false,
    showImage: true,
  },
  {
    year: "१९५८",
    label: "जागेचा संघर्ष",
    title: "भाजी मंडईतील प्लॉट क्र. १२७ चे वाटप व माणिक वर्मा गायन निधी",
    description:
      "वाढत्या वाचकसंख्येमुळे १९५८ मध्ये नगरपरिषदेने भाजीमार मंडईतील १२७ क्रमांकाचा प्लॉट संस्थेस दिला. वर्गणी, देणग्या आणि प्रसिद्ध गायिका माणिक वर्मा यांच्या गायनाच्या कार्यक्रमातून इमारतीसाठी निधी उभारण्यात आला.",
    image: {
      src: "/images/real/library_signboard.webp",
      alt: "भाजी मंडई ग्रंथालय फलक",
    },
    linkLabel: "जागेचा इतिहास",
    link: "/history#struggle-for-space",
    newTab: false,
    showImage: true,
  },
  {
    year: "१९६२-६४",
    label: "नोंदणी व मान्यता",
    title: "संस्था नोंदणी (BHR/3/1962) व तालुका ग्रंथालय दर्जा",
    description:
      "सोसायटीज रजिस्ट्रेशन ॲक्ट १८६० अंतर्गत नोंदणी. पहिले विश्वस्त श्री. एकनाथ माधवराव कुलकर्णी, श्री. भगवानदासजी सालीग्रामजी लोहिया, श्री. चंद्रगुप्त बिहारीलाल गुप्त. १९६३-६४ मध्ये ग्रंथालयास शासकीय तालुका ग्रंथालय मान्यता मिळाली व १९६८ मध्ये जिल्हा ग्रंथालय संघ स्थापन झाला.",
    image: {
      src: "/images/real/library_savarkar_portrait.webp",
      alt: "साहित्य निकेतन ऐतिहासिक दालन",
    },
    linkLabel: "विश्वस्त व मान्यता",
    link: "/about#team",
    newTab: false,
    showImage: true,
  },
  {
    year: "१९८६-९२",
    label: "नवे दालन",
    title: "भाजी मंडईत स्थलांतर व मध्यवर्ती हॉल उभारणी",
    description:
      "सन १९८६ पासून भाजी मंडईतील स्वतःच्या जागेत ग्रंथालय सुरू झाले. महिला, बाल व संदर्भ विभाग विस्तारले. अडचणींवर समोपचाराने मार्ग काढून १९९२ मध्ये समझोता झाला आणि शासनाच्या अनुदानातून एक मोठा हॉल व इतर सुविधा उभारण्यात आल्या.",
    image: {
      src: "/images/real/library_cupboards.webp",
      alt: "भव्य ग्रंथ दालन व कपाटे",
    },
    linkLabel: "वास्तू विस्तार",
    link: "/history#modern-building",
    newTab: false,
    showImage: true,
  },
  {
    year: "१९९६",
    label: "दोन मजली इमारत",
    title: "सहकार मंत्री जयसिंगराव गायकवाड यांच्या निधीतून वास्तू",
    description:
      "राज्याचे तत्कालीन सहकार मंत्री श्री. जयसिंगराव गायकवाड यांच्या सहकार्याने ३ लाखांचा निधी मंजूर झाला व १९९६ मध्ये भव्य दोन मजली इमारतीचे बांधकाम पूर्ण झाले. मुख्य ग्रंथसंग्रह आणि संदर्भ विभाग येथे दिमाखात कार्यरत झाले.",
    image: {
      src: "/images/real/library_window.webp",
      alt: "ग्रंथालय अभ्यासिका व वास्तू",
    },
    linkLabel: "इमारत इतिहास",
    link: "/history#modern-building",
    newTab: false,
    showImage: true,
  },
  {
    year: "२०१८-आज",
    label: "सुसज्ज सभागृह",
    title: "दुसऱ्या मजल्यावर सभागृह, ३९,९५३+ ग्रंथ व अखंड ज्ञानसेवा",
    description:
      "२०१७-१८ मध्ये दुसऱ्या मजल्याचे बांधकाम पूर्ण करून तिथे सुसज्ज सभागृह उभारण्यात आले. आज डॉ. शरद हबाकर, रामचंद्रजी संबर, भास्करराव धर्मपाळे यांच्या नेतृत्वाखाली ३९,९५३ मुद्रित ग्रंथ व दुर्मीळ हस्तलिखितांसह ज्ञानदानाची परंपरा अव्याहत सुरू आहे.",
    image: {
      src: "/images/real/marathi_books_display.png",
      alt: "साहित्य निकेतन आधुनिक दालन",
    },
    linkLabel: "आजची स्थिती पाहा",
    link: "/catalogue",
    newTab: false,
    showImage: true,
  },
];

const ENGLISH_MILESTONES: ContourTimelineItem[] = [
  {
    year: "1945",
    label: "Foundation",
    title: "Foundation: The Birth of a Noble Vision",
    description:
      "Inspired by 'Anek Hriday Ho Bharat Janani', Sahitya Niketan was founded on 1 August 1945 by zealous youth including Govindlal Janu, Vishwarao Jadhav, Ramchandraji Kshirsagar, Vipat Wahamwar, Chandragupta Arya, K. B. Patil, and P. G. Ramdasi to awaken civic consciousness during the freedom struggle.",
    image: {
      src: "/images/real/library_inauguration_plaque.webp",
      alt: "Founding Inscription 1945",
    },
    linkLabel: "Read Foundation Chapter",
    link: "/history#founding-chapter",
    newTab: false,
    showImage: true,
  },
  {
    year: "1950",
    label: "Founding Years",
    title: "National Language Classes & Devoted Teachers",
    description:
      "Initially housed in Chandulal Gulla's premises and then Shri Dalka Kukar's space, the library ran classes under Hindi Prachar Sabha Hyderabad. Devoted educators P. G. Bhavthankar, Dnya. Lu. Khopuskar, Vinayakrao Janwalkar, and P. G. Ramdasi contributed immensely with nominal honorariums.",
    image: {
      src: "/images/real/library_vintage_books.webp",
      alt: "Vintage Rare Books",
    },
    linkLabel: "Early Initiatives",
    link: "/history#early-years",
    newTab: false,
    showImage: true,
  },
  {
    year: "1958",
    label: "Space Struggle",
    title: "Plot No. 127 in Bhaji Mandai & Manik Varma Fundraiser",
    description:
      "In 1958, Ambajogai Municipal Council allotted Plot No. 127 in Bhaji Mandai Market. Building funds were raised through citizen subscriptions, donations, and a musical concert by legendary vocalist Manik Varma.",
    image: {
      src: "/images/real/library_signboard.webp",
      alt: "Library Signboard",
    },
    linkLabel: "History of Space",
    link: "/history#struggle-for-space",
    newTab: false,
    showImage: true,
  },
  {
    year: "1962-64",
    label: "Accreditation",
    title: "Society Registration (BHR/3/1962) & Taluka Library Recognition",
    description:
      "Registered under Societies Registration Act 1860 with first trustees E. M. Kulkarni, B. S. Lohia, and C. B. Gupta. Conferred official Government Recognition as Taluka Library in 1963-64, progressing to Grade 'A' status.",
    image: {
      src: "/images/real/library_savarkar_portrait.webp",
      alt: "Historical Portrait",
    },
    linkLabel: "Trustees & Recognition",
    link: "/about#team",
    newTab: false,
    showImage: true,
  },
  {
    year: "1986-92",
    label: "Expansion",
    title: "Permanent Relocation & Central Assembly Hall",
    description:
      "The library commenced operations in its permanent Bhaji Mandai building in 1986. Following an amicable settlement in 1992, a grand hall and dedicated women and children wings were erected with government assistance.",
    image: {
      src: "/images/real/library_cupboards.webp",
      alt: "Teakwood Stacks",
    },
    linkLabel: "Complex Development",
    link: "/history#modern-building",
    newTab: false,
    showImage: true,
  },
  {
    year: "1996",
    label: "New Building",
    title: "Two-Storey Complex via State Cooperation Grant",
    description:
      "With active support from State Cooperation Minister Shri Jaysingrao Gaikwad, a Rs. 3 Lakhs grant enabled completion of the two-storey complex in 1996, housing the primary book stacks and reference sections.",
    image: {
      src: "/images/real/library_window.webp",
      alt: "Library Reading Hall",
    },
    linkLabel: "Infrastructure",
    link: "/history#modern-building",
    newTab: false,
    showImage: true,
  },
  {
    year: "2018-Today",
    label: "Auditorium & Today",
    title: "Second Floor Auditorium, 39,953+ Books & Unbroken Knowledge Service",
    description:
      "In 2017-18, the second floor was completed with an equipped auditorium. Guided by trustees Dr. Sharad Habakar, Ramchandra Sanbar, and Bhaskarrao Dharmapale, Sahitya Niketan preserves 39,953+ volumes with unbroken dedication.",
    image: {
      src: "/images/real/marathi_books_display.png",
      alt: "Modern Book Stacks",
    },
    linkLabel: "Browse Stacks",
    link: "/catalogue",
    newTab: false,
    showImage: true,
  },
];

export function ScrollTimeline() {
  const { language } = useLanguage();

  const milestones = useMemo(() => {
    return language === "en" ? ENGLISH_MILESTONES : MARATHI_MILESTONES;
  }, [language]);

  return (
    <div className="w-full relative">
      <ContourTimeline
        items={milestones}
        palette={{
          accent: "#800020",
          ticket: "#FAF6F0",
        }}
      />
    </div>
  );
}

export default ScrollTimeline;
