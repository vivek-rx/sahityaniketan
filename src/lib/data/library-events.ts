export interface EventPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface LibraryEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  coverImage: string;
  photos: EventPhoto[];
}

/**
 * साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई
 * अधिकृत दालने, ऐतिहासिक संग्रह व वाचक उपक्रम
 */
export const LIBRARY_EVENTS: LibraryEvent[] = [
  {
    id: "event-1",
    slug: "foundation-and-heritage",
    title: "साहित्य निकेतन ग्रंथालय स्थापना व ८० वर्षांची ज्ञानतपस्या",
    date: "१ ऑगस्ट १९४५ पासून अविरत",
    category: "संस्थापना व वारसा",
    description: "हैदराबाद संस्थानातील पारतंत्र्यात मराठी भाषा, संस्कृती आणि साहित्याचे रक्षण करण्यासाठी देशभक्त विचारवंतांनी १ ऑगस्ट १९४५ रोजी ग्रंथालयाची स्थापना केली. महाराष्ट्र शासनाने या कार्याचा गौरव करून ग्रंथालयास सर्वोच्च 'वर्ग अ' दर्जा प्रदान केला आहे.",
    coverImage: "/images/real/library_inauguration_plaque.webp",
    photos: [
      {
        id: "p1-1",
        url: "/images/real/library_inauguration_plaque.webp",
        caption: "साहित्य निकेतन मूळ ऐतिहासिक स्थापना शिलालेख (१ ऑगस्ट १९४५)",
      },
      {
        id: "p1-2",
        url: "/images/real/library_signboard.webp",
        caption: "साहित्य निकेतन अधिकृत दर्शनी नामफलक व वास्तू",
      },
      {
        id: "p1-3",
        url: "/images/real/library_cupboards.webp",
        caption: "ऐतिहासिक सागवानी ग्रंथ कपाटे व मध्यवर्ती दालन",
      },
    ],
  },
  {
    id: "event-2",
    slug: "rare-manuscripts-archive",
    title: "दुर्मीळ हस्तलिखिते व मोडी लिपी संशोधन संवर्धन कक्ष",
    date: "१२ व्या शतकापासूनचा ऐतिहासिक ठेवा",
    category: "संशोधन व जतन",
    description: "१२ व्या शतकातील आद्यकवी मुकुंदराज कृत मराठीतील आद्य तत्त्वज्ञान ग्रंथ 'विवेकसिंधू', संत दासोपंतांची हस्तलिखिते, ऐतिहासिक मोडी लिपीतील सनदा आणि पेशवे-निजामकालीन दुर्मीळ दस्तऐवजांचे शास्त्रोक्त जतन करणारे विशेष संशोधन दालन.",
    coverImage: "/images/real/library_vintage_books.webp",
    photos: [
      {
        id: "p2-1",
        url: "/images/real/library_vintage_books.webp",
        caption: "प्राचीन हस्तलिखिते, सनदा व दुर्मीळ संदर्भ ग्रंथ",
      },
      {
        id: "p2-2",
        url: "/images/real/marathi_books_display.png",
        caption: "साहित्यिक संदर्भ ग्रंथ व संशोधन हस्तलिखित संग्रह",
      },
      {
        id: "p2-3",
        url: "/images/real/library_cupboards.webp",
        caption: "हस्तलिखितांचे सुरक्षित संवर्धन कपाटे",
      },
    ],
  },
  {
    id: "event-3",
    slug: "marathi-literature-collection",
    title: "३९,९५३+ मुद्रित ग्रंथसंपदा व बहुभाषिक संदर्भ दालन",
    date: "नियमित समृद्ध होत असणारा संग्रह",
    category: "ग्रंथसंपदा",
    description: "मराठी, संस्कृत, हिंदी आणि इंग्रजी भाषेतील ३९,९५३ हून अधिक मुद्रित ग्रंथ. यामध्ये कथा, कादंबऱ्या, कविता, वैचारिक साहित्य, इतिहास, चरित्रे आणि स्पर्धा परीक्षा संदर्भ ग्रंथांचा अमूल्य साठा वाचकांसाठी उपलब्ध आहे.",
    coverImage: "/images/real/marathi_books_display.png",
    photos: [
      {
        id: "p3-1",
        url: "/images/real/marathi_books_display.png",
        caption: "साहित्य निकेतन मराठी व संस्कृत ग्रंथसंपदा दालन",
      },
      {
        id: "p3-2",
        url: "/images/real/library_cupboards.webp",
        caption: "मध्यवर्ती वाचनालयातील पारंपरिक सागवानी कपाटे",
      },
      {
        id: "p3-3",
        url: "/images/real/library_window.webp",
        caption: "वाचक अभ्यासिका व संदर्भ ग्रंथ कक्ष",
      },
    ],
  },
  {
    id: "event-4",
    slug: "competitive-exams-study-hall",
    title: "अद्ययावत स्पर्धा परीक्षा अभ्यासिका व वातानुकूलित वाचन दालन",
    date: "दैनिक सकाळी ७ ते रात्री १०",
    category: "अभ्यासिका दालन",
    description: "MPSC, UPSC, बँकिंग, पोलीस भरती व इतर स्पर्धा परीक्षांची तयारी करणाऱ्या अंबाजोगाई व परिसरातील ग्रामीण विद्यार्थ्यांसाठी २००+ आसनक्षमतेची शांत, वातानुकूलित अभ्यासिका आणि अद्ययावत संदर्भ ग्रंथ सुविधा.",
    coverImage: "/images/real/library_window.webp",
    photos: [
      {
        id: "p4-1",
        url: "/images/real/library_window.webp",
        caption: "वातानुकूलित अभ्यासिका दालनातील शांत बैठक व्यवस्था",
      },
      {
        id: "p4-2",
        url: "/images/real/marathi_books_display.png",
        caption: "अभ्यासकांसाठी उपलब्ध संदर्भ ग्रंथ व मासिके",
      },
      {
        id: "p4-3",
        url: "/images/real/library_signboard.webp",
        caption: "साहित्य निकेतन ग्रंथालय प्रवेशद्वार परिसर",
      },
    ],
  },
  {
    id: "event-5",
    slug: "savarkar-prerana-dalan",
    title: "स्वातंत्र्यवीर सावरकर प्रेरणा दालन व ऐतिहासिक स्वातंत्र्यलढा संग्रह",
    date: "ऐतिहासिक स्मृतिदालन",
    category: "सांस्कृतिक वारसा",
    description: "हैदराबाद मुक्तिसंग्राम आणि भारतीय स्वातंत्र्यलढ्याची तेजस्वी प्रेरणा देणारे विशेष दालन. यामध्ये स्वातंत्र्यवीर सावरकर यांचे स्मृतिचित्र, स्वातंत्र्यलढ्यावरील दुर्मीळ ग्रंथ आणि ऐतिहासिक संदर्भ दस्तऐवज उपलब्ध आहेत.",
    coverImage: "/images/real/library_savarkar_portrait.webp",
    photos: [
      {
        id: "p5-1",
        url: "/images/real/library_savarkar_portrait.webp",
        caption: "साहित्य निकेतनमधील स्वातंत्र्यवीर सावरकर प्रेरणा स्मृतिचित्र",
      },
      {
        id: "p5-2",
        url: "/images/real/library_inauguration_plaque.webp",
        caption: "मुक्तिसंग्राम काळातील मूळ स्थापना शिलालेख",
      },
      {
        id: "p5-3",
        url: "/images/real/library_vintage_books.webp",
        caption: "स्वातंत्र्यलढ्यावरील ऐतिहासिक पुस्तके व दस्तऐवज",
      },
    ],
  },
  {
    id: "event-6",
    slug: "daily-periodicals-and-newspapers",
    title: "दैनिक वृत्तपत्रे, मासिके व ज्येष्ठ नागरिक मुक्त वाचन कक्ष",
    date: "दररोज अखंड सेवा",
    category: "दैनिक वाचन सेवा",
    description: "दररोज शेकडो ज्येष्ठ नागरिक, प्राध्यापक, विद्यार्थी व नागरिकांसाठी १५ हून अधिक प्रमुख मराठी, हिंदी व इंग्रजी दैनिक वृत्तपत्रे आणि ६०+ वैचारिक मासिके-नियतकालिके मोफत वाचनासाठी उपलब्ध आहेत.",
    coverImage: "/images/real/library_signboard.webp",
    photos: [
      {
        id: "p6-1",
        url: "/images/real/library_signboard.webp",
        caption: "साहित्य निकेतन सार्वजनिक ग्रंथालय अंबाजोगाई",
      },
      {
        id: "p6-2",
        url: "/images/real/library_window.webp",
        caption: "वृत्तपत्र व नियतकालिके वाचन कक्ष",
      },
      {
        id: "p6-3",
        url: "/images/real/library_cupboards.webp",
        caption: "नियतकालिकांचे ऐतिहासिक संच व संवर्धन",
      },
    ],
  },
];
