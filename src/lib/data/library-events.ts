export interface EventPhoto {
  id: string;
  url: string;
  caption: string;
  captionEn?: string;
}

export interface LibraryEvent {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  date: string;
  dateEn?: string;
  category: string;
  categoryEn?: string;
  description: string;
  descriptionEn?: string;
  coverImage: string;
  photos: EventPhoto[];
}

/**
 * साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई
 * अधिकृत दालने, ऐतिहासिक संग्रह व वाचक उपक्रम (Multilingual Support)
 */
export const LIBRARY_EVENTS: LibraryEvent[] = [
  {
    id: "event-1",
    slug: "foundation-and-heritage",
    title: "साहित्य निकेतन ग्रंथालय स्थापना व ८० वर्षांची ज्ञानतपस्या",
    titleEn: "Sahitya Niketan Library Foundation & 80 Years of Knowledge Service",
    date: "१ ऑगस्ट १९४५ पासून अविरत",
    dateEn: "Serving continuously since 1 August 1945",
    category: "संस्थापना व वारसा",
    categoryEn: "Founding & Heritage",
    description:
      "हैदराबाद संस्थानातील पारतंत्र्यात मराठी भाषा, संस्कृती आणि साहित्याचे रक्षण करण्यासाठी देशभक्त विचारवंतांनी १ ऑगस्ट १९४५ रोजी ग्रंथालयाची स्थापना केली. महाराष्ट्र शासनाने या कार्याचा गौरव करून ग्रंथालयास सर्वोच्च 'वर्ग अ' दर्जा प्रदान केला आहे.",
    descriptionEn:
      "Founded on 1 August 1945 by patriotic intellectuals to protect the Marathi language, culture, and literature during the oppressive Nizam era of Hyderabad state. Honored by the Government of Maharashtra with the prestigious Grade 'A' accreditation.",
    coverImage: "/images/real/library_inauguration_plaque.webp",
    photos: [
      {
        id: "p1-1",
        url: "/images/real/library_inauguration_plaque.webp",
        caption: "साहित्य निकेतन मूळ ऐतिहासिक स्थापना शिलालेख (१ ऑगस्ट १९४५)",
        captionEn: "Sahitya Niketan Original Historic Founding Inscription (1 August 1945)",
      },
      {
        id: "p1-2",
        url: "/images/real/library_signboard.webp",
        caption: "साहित्य निकेतन अधिकृत दर्शनी नामफलक व वास्तू",
        captionEn: "Sahitya Niketan Official Heritage Signboard and Building Facade",
      },
      {
        id: "p1-3",
        url: "/images/real/library_cupboards.webp",
        caption: "ऐतिहासिक सागवानी ग्रंथ कपाटे व मध्यवर्ती दालन",
        captionEn: "Historic Teakwood Book Stacks and Central Reading Hall",
      },
    ],
  },
  {
    id: "event-2",
    slug: "rare-manuscripts-archive",
    title: "दुर्मीळ हस्तलिखिते व मोडी लिपी संशोधन संवर्धन कक्ष",
    titleEn: "Rare Manuscripts & Modi Script Research & Conservation Wing",
    date: "१२ व्या शतकापासूनचा ऐतिहासिक ठेवा",
    dateEn: "Historic Treasures from 12th Century Onwards",
    category: "संशोधन व जतन",
    categoryEn: "Research & Archival",
    description:
      "१२ व्या शतकातील आद्यकवी मुकुंदराज कृत मराठीतील आद्य तत्त्वज्ञान ग्रंथ 'विवेकसिंधू', संत दासोपंतांची हस्तलिखिते, ऐतिहासिक मोडी लिपीतील सनदा आणि पेशवे-निजामकालीन दुर्मीळ दस्तऐवजांचे शास्त्रोक्त जतन करणारे विशेष संशोधन दालन.",
    descriptionEn:
      "A dedicated research gallery conserving 12th-century Adya Kavi Mukundraj's first Marathi philosophical treatise 'Vivekasindhu', Saint Dasopant's manuscripts, historic Modi script charters, and rare archival documents from the Peshwa and Nizam periods.",
    coverImage: "/images/real/library_vintage_books.webp",
    photos: [
      {
        id: "p2-1",
        url: "/images/real/library_vintage_books.webp",
        caption: "प्राचीन हस्तलिखिते, सनदा व दुर्मीळ संदर्भ ग्रंथ",
        captionEn: "Ancient Manuscripts, Charters & Rare Reference Stacks",
      },
      {
        id: "p2-2",
        url: "/images/real/marathi_books_display.png",
        caption: "साहित्यिक संदर्भ ग्रंथ व संशोधन हस्तलिखित संग्रह",
        captionEn: "Literary Reference Volumes & Archival Manuscript Collections",
      },
      {
        id: "p2-3",
        url: "/images/real/library_cupboards.webp",
        caption: "हस्तलिखितांचे सुरक्षित संवर्धन कपाटे",
        captionEn: "Preservation Cabinets for Delicate Palm-Leaf & Paper Manuscripts",
      },
    ],
  },
  {
    id: "event-3",
    slug: "marathi-literature-collection",
    title: "३९,९५३+ मुद्रित ग्रंथसंपदा व बहुभाषिक संदर्भ दालन",
    titleEn: "39,953+ Registered Printed Volumes & Multilingual Reference Stacks",
    date: "नियमित समृद्ध होत असणारा संग्रह",
    dateEn: "Continuously Growing Collection",
    category: "ग्रंथसंपदा",
    categoryEn: "Book Treasures",
    description:
      "मराठी, संस्कृत, हिंदी आणि इंग्रजी भाषेतील ३९,९५३ हून अधिक मुद्रित ग्रंथ. यामध्ये कथा, कादंबऱ्या, कविता, वैचारिक साहित्य, इतिहास, चरित्रे आणि स्पर्धा परीक्षा संदर्भ ग्रंथांचा अमूल्य साठा वाचकांसाठी उपलब्ध आहे.",
    descriptionEn:
      "Over 39,953 printed volumes spanning Marathi, Sanskrit, Hindi, and English. Housing an invaluable treasure trove of novels, poetry, history, biographies, philosophy, and competitive examination reference materials.",
    coverImage: "/images/real/marathi_books_display.png",
    photos: [
      {
        id: "p3-1",
        url: "/images/real/marathi_books_display.png",
        caption: "साहित्य निकेतन मराठी व संस्कृत ग्रंथसंपदा दालन",
        captionEn: "Sahitya Niketan Marathi & Sanskrit Literary Stacks",
      },
      {
        id: "p3-2",
        url: "/images/real/library_cupboards.webp",
        caption: "मध्यवर्ती वाचनालयातील पारंपरिक सागवानी कपाटे",
        captionEn: "Traditional Teakwood Shelving in Central Repository",
      },
      {
        id: "p3-3",
        url: "/images/real/library_window.webp",
        caption: "वाचक अभ्यासिका व संदर्भ ग्रंथ कक्ष",
        captionEn: "Reader Study Section & In-Depth Reference Room",
      },
    ],
  },
  {
    id: "event-4",
    slug: "competitive-exams-study-hall",
    title: "अद्ययावत स्पर्धा परीक्षा अभ्यासिका व वातानुकूलित वाचन दालन",
    titleEn: "Modern Competitive Exam Study Hall & Air-Conditioned Reading Complex",
    date: "दैनिक सकाळी ७ ते रात्री १०",
    dateEn: "Daily 7:00 AM to 10:00 PM",
    category: "अभ्यासिका दालन",
    categoryEn: "Study Hall Facility",
    description:
      "MPSC, UPSC, बँकिंग, पोलीस भरती व इतर स्पर्धा परीक्षांची तयारी करणाऱ्या अंबाजोगाई व परिसरातील ग्रामीण विद्यार्थ्यांसाठी २००+ आसनक्षमतेची शांत, वातानुकूलित अभ्यासिका आणि अद्ययावत संदर्भ ग्रंथ सुविधा.",
    descriptionEn:
      "A quiet, air-conditioned 200+ seat study hall and comprehensive reference resources dedicated to rural students from Ambajogai preparing for MPSC, UPSC, banking, police, and state competitive examinations.",
    coverImage: "/images/real/library_window.webp",
    photos: [
      {
        id: "p4-1",
        url: "/images/real/library_window.webp",
        caption: "वातानुकूलित अभ्यासिका दालनातील शांत बैठक व्यवस्था",
        captionEn: "Quiet Seating Infrastructure in Air-Conditioned Study Hall",
      },
      {
        id: "p4-2",
        url: "/images/real/marathi_books_display.png",
        caption: "अभ्यासकांसाठी उपलब्ध संदर्भ ग्रंथ व मासिके",
        captionEn: "Available Reference Texts, Periodicals & Guides for Aspirants",
      },
      {
        id: "p4-3",
        url: "/images/real/library_signboard.webp",
        caption: "साहित्य निकेतन ग्रंथालय प्रवेशद्वार परिसर",
        captionEn: "Sahitya Niketan Campus Entrance & Study Hall Access",
      },
    ],
  },
  {
    id: "event-5",
    slug: "savarkar-prerana-dalan",
    title: "स्वातंत्र्यवीर सावरकर प्रेरणा दालन व ऐतिहासिक स्वातंत्र्यलढा संग्रह",
    titleEn: "Swatantryaveer Savarkar Inspiration Wing & Freedom Struggle Archives",
    date: "ऐतिहासिक स्मृतिदालन",
    dateEn: "Historical Memorial Gallery",
    category: "सांस्कृतिक वारसा",
    categoryEn: "Cultural Heritage",
    description:
      "हैदराबाद मुक्तिसंग्राम आणि भारतीय स्वातंत्र्यलढ्याची तेजस्वी प्रेरणा देणारे विशेष दालन. यामध्ये स्वातंत्र्यवीर सावरकर यांचे स्मृतिचित्र, स्वातंत्र्यलढ्यावरील दुर्मीळ ग्रंथ आणि ऐतिहासिक संदर्भ दस्तऐवज उपलब्ध आहेत.",
    descriptionEn:
      "A commemorative wing honoring the valiant legacy of the Hyderabad Liberation Struggle and India's independence movement, featuring memorial portraits, rare historical books, and primary source documents.",
    coverImage: "/images/real/library_savarkar_portrait.webp",
    photos: [
      {
        id: "p5-1",
        url: "/images/real/library_savarkar_portrait.webp",
        caption: "साहित्य निकेतनमधील स्वातंत्र्यवीर सावरकर प्रेरणा स्मृतिचित्र",
        captionEn: "Commemorative Portrait of Veer Savarkar inside Sahitya Niketan",
      },
      {
        id: "p5-2",
        url: "/images/real/library_inauguration_plaque.webp",
        caption: "मुक्तिसंग्राम काळातील मूळ स्थापना शिलालेख",
        captionEn: "Founding Plaque from the Hyderabad Liberation Struggle Era",
      },
      {
        id: "p5-3",
        url: "/images/real/library_vintage_books.webp",
        caption: "स्वातंत्र्यलढ्यावरील ऐतिहासिक पुस्तके व दस्तऐवज",
        captionEn: "Rare Historical Literature on India's Freedom Movement",
      },
    ],
  },
  {
    id: "event-6",
    slug: "daily-periodicals-and-newspapers",
    title: "दैनिक वृत्तपत्रे, मासिके व ज्येष्ठ नागरिक मुक्त वाचन कक्ष",
    titleEn: "Daily Periodicals, Magazines & Senior Citizens Free Reading Room",
    date: "दररोज अखंड सेवा",
    dateEn: "Open Daily for Public",
    category: "दैनिक वाचन सेवा",
    categoryEn: "Daily Reading Service",
    description:
      "दररोज शेकडो ज्येष्ठ नागरिक, प्राध्यापक, विद्यार्थी व नागरिकांसाठी १५ हून अधिक प्रमुख मराठी, हिंदी व इंग्रजी दैनिक वृत्तपत्रे आणि ६०+ वैचारिक मासिके-नियतकालिके मोफत वाचनासाठी उपलब्ध आहेत.",
    descriptionEn:
      "Providing free public access to over 15 major Marathi, Hindi, and English daily newspapers alongside 60+ thought-provoking periodicals and magazines for senior citizens, scholars, and daily readers.",
    coverImage: "/images/real/library_signboard.webp",
    photos: [
      {
        id: "p6-1",
        url: "/images/real/library_signboard.webp",
        caption: "साहित्य निकेतन सार्वजनिक ग्रंथालय अंबाजोगाई",
        captionEn: "Sahitya Niketan Public Library, Ambajogai",
      },
      {
        id: "p6-2",
        url: "/images/real/library_window.webp",
        caption: "वृत्तपत्र व नियतकालिके वाचन कक्ष",
        captionEn: "Newspaper & Periodicals Reading Room",
      },
      {
        id: "p6-3",
        url: "/images/real/library_cupboards.webp",
        caption: "नियतकालिकांचे ऐतिहासिक संच व संवर्धन",
        captionEn: "Historical Archival Sets of Literary Magazines",
      },
    ],
  },
];
