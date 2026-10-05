/**
 * Remembering Ambajogai (अंबाजोगाईच्या स्मृती)
 * Architectural Archive Data Model
 * 
 * Built with a modular category taxonomy so this digital archive can grow
 * organically over decades:
 * - जुनी छायाचित्रे (Vintage Photographs)
 * - जुने वृत्तपत्र (Historic Newspapers / Periodicals)
 * - जुन्या इमारती (Historic Architecture & Heritage Buildings)
 * - साहित्यिक (Literary Luminaries)
 * - कलाकार (Artists & Performers)
 * - सामाजिक कार्यकर्ते (Social Reformers & Freedom Fighters)
 * - उत्सव (Traditional Festivals & Fairs)
 * - शिक्षण (Historic Educational Institutions)
 * - सांस्कृतिक चळवळी (Cultural & Literary Movements)
 */

export interface AmbajogaiMemoryCategory {
  id: string;
  titleMarathi: string;
  titleEnglish: string;
  descriptionMarathi: string;
  iconName: string;
  isLaunched: boolean;
  itemCount: number;
}

export interface AmbajogaiMemoryItem {
  id: string;
  categoryId: string;
  titleMarathi: string;
  titleEnglish: string;
  era: string; // e.g., "१९४८", "१२ वे शतक", "१९५०-६० चे दशक"
  locationMarathi: string;
  locationEnglish: string;
  image: string;
  aspectRatio?: string;
  summaryMarathi: string;
  summaryEnglish: string;
  detailedNotesMarathi?: string[];
  historicalContextMarathi?: string;
  curatorNoteMarathi?: string;
  archiveReference?: string; // Physical location / shelf / file number in Sahitya Niketan
  tags: string[];
}

export const AMBAJOGAI_CATEGORIES: AmbajogaiMemoryCategory[] = [
  {
    id: "photographs",
    titleMarathi: "जुनी छायाचित्रे",
    titleEnglish: "Vintage Photographs",
    descriptionMarathi: "अंबाजोगाईच्या बाजारपेठा, शुक्रवार पेठ, जुने रस्ते आणि विसाव्या शतकातील समाजजीवनाचे दुर्मिळ क्षण.",
    iconName: "Camera",
    isLaunched: true,
    itemCount: 24,
  },
  {
    id: "buildings",
    titleMarathi: "जुन्या इमारती व वास्तू",
    titleEnglish: "Heritage Architecture",
    descriptionMarathi: "दगडी तटबंदी, प्राचीन मंदिरे, ब्रिटिश-निजाम काळातील दगडी वास्तू आणि जुनी ग्रंथालय इमारत.",
    iconName: "Landmark",
    isLaunched: true,
    itemCount: 16,
  },
  {
    id: "writers",
    titleMarathi: "साहित्यिक व विचारवंत",
    titleEnglish: "Literary Luminaries",
    descriptionMarathi: "आद्यकवी मुकुंदराजांपासून संत दासोपंत आणि आधुनिक विचारवंतांपर्यंतची वैचारिक परंपरा.",
    iconName: "BookOpen",
    isLaunched: true,
    itemCount: 19,
  },
  {
    id: "newspapers",
    titleMarathi: "जुने वृत्तपत्र व दस्तऐवज",
    titleEnglish: "Historic Press & Documents",
    descriptionMarathi: "हैदराबाद मुक्तीसंग्राम काळातील भूमिगत पत्रके, निजामकालीन सनदा आणि जुनी वृत्तपत्रे.",
    iconName: "Newspaper",
    isLaunched: true,
    itemCount: 12,
  },
  {
    id: "education",
    titleMarathi: "शिक्षण व ज्ञानपरंपरा",
    titleEnglish: "Historic Education",
    descriptionMarathi: "योगेश्वरी नूतन विद्यालय (१९३५), खोलेश्वर महाविद्यालय आणि अंबाजोगाईची शैक्षणिक क्रांती.",
    iconName: "GraduationCap",
    isLaunched: true,
    itemCount: 8,
  },
  {
    id: "movements",
    titleMarathi: "सांस्कृतिक चळवळी व मुक्तीसंग्राम",
    titleEnglish: "Movements & Freedom Struggle",
    descriptionMarathi: "मराठवाडा मुक्तीसंग्रामातील अंबाजोगाईचे योगदान, साहित्य संमेलने आणि वाचन चळवळ.",
    iconName: "Flame",
    isLaunched: true,
    itemCount: 14,
  },
  {
    id: "artists",
    titleMarathi: "कलाकार व नाट्यसंगीत",
    titleEnglish: "Artists & Cultural Icons",
    descriptionMarathi: "शास्त्रीय संगीत, नाटक, कीर्तन आणि लोककलांचे अंबाजोगाईतील वैभवशाली योगदान.",
    iconName: "Music",
    isLaunched: false, // Growing architecture
    itemCount: 0,
  },
  {
    id: "social_workers",
    titleMarathi: "सामाजिक कार्यकर्ते",
    titleEnglish: "Social Reformers",
    descriptionMarathi: "अंबाजोगाईच्या विकासात आणि लोककल्याणात आयुष्य वेचणाऱ्या निस्पृह ध्येयवादी विभूती.",
    iconName: "Users",
    isLaunched: false, // Growing architecture
    itemCount: 0,
  },
  {
    id: "festivals",
    titleMarathi: "उत्सव व लोकसंस्कृती",
    titleEnglish: "Festivals & Heritage Fairs",
    descriptionMarathi: "योगेश्वरी देवीची नवरात्र, दासोपंत उत्सव आणि ग्रंथदिंडीची लोकोत्सवी परंपरा.",
    iconName: "Sparkles",
    isLaunched: false, // Growing architecture
    itemCount: 0,
  },
];

export const AMBAJOGAI_MEMORY_ITEMS: AmbajogaiMemoryItem[] = [
  {
    id: "amb-photo-1",
    categoryId: "photographs",
    titleMarathi: "शुक्रवार पेठ व भाजी मंडई परिसर (१९५४)",
    titleEnglish: "Shukrawar Peth & Mandai Market Square (1954)",
    era: "१९५० चे दशक (१९५४)",
    locationMarathi: "शुक्रवार पेठ, अंबाजोगाई",
    locationEnglish: "Shukrawar Peth Market, Ambajogai",
    image: "/images/real/library_signboard.png",
    summaryMarathi: "स्वातंत्र्योत्तर काळातील अंबाजोगाईची गजबजलेली भाजी मंडई आणि साहित्य निकेतनच्या दर्शनी प्रवेशद्वाराचा ऐतिहासिक परिसर.",
    summaryEnglish: "Historic marketplace square outside Sahitya Niketan Library during the post-liberation era.",
    historicalContextMarathi: "साहित्य निकेतन ग्रंथालयाची मूळ वास्तू शुक्रवार पेठ भाजी मंडईच्या केंद्रस्थानी उभी राहिली, जिथे सामान्य नागरिक, शेतकरी व विद्यार्थी एकत्र येत.",
    curatorNoteMarathi: "ग्रंथालयाच्या जुन्या छायाचित्र अल्बममधील दुर्मिळ कृष्णधवल चित्र.",
    archiveReference: "छायाचित्र दालन संच क्र. अ-१२",
    tags: ["शुक्रवार पेठ", "भाजी मंडई", "१९५४", "नगरजीवन"],
  },
  {
    id: "amb-photo-2",
    categoryId: "photographs",
    titleMarathi: "साहित्य निकेतन वाचन दालनातील विद्यार्थी (१९६० चे दशक)",
    titleEnglish: "Students in Sahitya Niketan Heritage Reading Hall (1960s)",
    era: "१९६० चे दशक",
    locationMarathi: "साहित्य निकेतन मुख्य दालन",
    locationEnglish: "Sahitya Niketan Main Hall",
    image: "/images/real/library_cupboards.png",
    summaryMarathi: "सागवानी लाकडी कपाटांच्या सावलीत कंदील आणि पहिल्या विजेच्या दिव्यांत अभ्यास करणारे मराठवाड्यातील विद्यार्थी.",
    summaryEnglish: "A generation of Marathwada scholars and civil servants studying amidst handcrafted teakwood cupboards.",
    historicalContextMarathi: "याच वाचन दालनातून अनेक नामवंत शिक्षक, प्राध्यापक, न्यायाधीश आणि स्वातंत्र्यसैनिक घडले.",
    curatorNoteMarathi: "मूळ सागवानी कपाटे आज ८० वर्षांनंतरही अखंड कार्यरत स्थितीत ग्रंथालयात दिमाखाने उभी आहेत.",
    archiveReference: "ऐतिहासिक कपाट संच क्र. ०४",
    tags: ["वाचन दालन", "सागवानी कपाटे", "अभ्यासिका", "१९६०"],
  },
  {
    id: "amb-building-1",
    categoryId: "buildings",
    titleMarathi: "साहित्य निकेतन मूळ ऐतिहासिक शिलालेख (स्थापना १ ऑगस्ट १९४५)",
    titleEnglish: "Sahitya Niketan Original Founding Inscription (Est. 1 August 1945)",
    era: "स्थापना १९४५",
    locationMarathi: "मध्यवर्ती अंबाजोगाई",
    locationEnglish: "Central Ambajogai",
    image: "/images/real/library_inauguration_plaque.png",
    summaryMarathi: "मराठवाडा मुक्तीसंग्रामाच्या काळात स्वातंत्र्यसैनिकांनी उभारलेली ज्ञानरूपी अभेद्य दगडी वास्तू.",
    summaryEnglish: "The historic stone masonry facade constructed during the height of the Hyderabad liberation movement.",
    historicalContextMarathi: "निजाम सरकारच्या कडक निर्बंधांच्या काळात मराठी भाषा व संस्कृतीचे रक्षण करण्यासाठी ही वास्तू भूमिगत कार्यकर्त्यांचे आश्रयस्थान होती.",
    curatorNoteMarathi: "१९४५ मधील मूळ उद्घाटन शिलालेख आजही ग्रंथालयाच्या दर्शनी भागात सुरक्षित आहे.",
    archiveReference: "वास्तू अभिलेख क्र. ब-०१",
    tags: ["शिलालेख", "१९४५", "हैदराबाद मुक्तीसंग्राम", "वास्तू"],
  },
  {
    id: "amb-building-2",
    categoryId: "buildings",
    titleMarathi: "योगेश्वरी देवी मंदिर दगडी दीपमाळा व प्रांगण",
    titleEnglish: "Yogeshwari Devi Temple Stone Deepmalas & Courtyard",
    era: "प्राचीन (यादवकालीन)",
    locationMarathi: "योगेश्वरी परिसर, अंबाजोगाई",
    locationEnglish: "Yogeshwari Complex, Ambajogai",
    image: "/images/real/marathi_books_display.png",
    summaryMarathi: "महाराष्ट्राचे कुलदैवत मानल्या गेलेल्या योगेश्वरी मातेचे भव्य हेमाडपंती दगडी मंदिर आणि विलोभनीय दीपमाळा.",
    summaryEnglish: "The grand Hemadpanthi stone architecture and majestic deepmalas of Yogeshwari Temple.",
    historicalContextMarathi: "अंबाजोगाईच्या धार्मिक, सांस्कृतिक व सामाजिक जीवनाचा केंद्रबिंदू असलेले हे प्राचीन मंदिर शतकानुशतके भाविक व अभ्यासकांचे आकर्षण आहे.",
    curatorNoteMarathi: "साहित्य निकेतनच्या हस्तलिखित दालनात योगेश्वरी माहात्म्याची मूळ मोडी हस्तलिखिते सुरक्षित आहेत.",
    archiveReference: "धार्मिक दस्तऐवज कपाट २",
    tags: ["योगेश्वरी मंदिर", "हेमाडपंती", "दीपमाळा", "यादवकाळ"],
  },
  {
    id: "amb-writer-1",
    categoryId: "writers",
    titleMarathi: "आद्यकवी मुकुंदराज — 'विवेकसिंधू' चे प्रणेते",
    titleEnglish: "Adya Kavi Mukundraj — Author of Vivekasindhu (1188 CE)",
    era: "इ.स. ११८८ (१२ वे शतक)",
    locationMarathi: "मुकुंदराज समाधी परिसर, अंबाजोगाई",
    locationEnglish: "Mukundraj Samadhi Ravine, Ambajogai",
    image: "/images/real/library_vintage_books.png",
    summaryMarathi: "मराठी भाषेतील आद्य तत्त्वज्ञान ग्रंथ 'विवेकसिंधू' ची निर्मिती करून मराठीला ज्ञानभाषेचा दर्जा मिळवून देणारे युगप्रवर्तक कवी.",
    summaryEnglish: "The pioneer who authored the very first philosophical treatise in Marathi, establishing Marathi as a classical language of wisdom.",
    historicalContextMarathi: "मुकुंदराजांनी संस्कृतमधील गहन वेदान्त तत्त्वज्ञान सर्वसामान्यांसाठी रसाळ प्राकृत मराठीत आणले. ही अंबाजोगाईची जागतिक कीर्ती आहे.",
    curatorNoteMarathi: "ग्रंथालयात मुकुंदराजांच्या ग्रंथांच्या दुर्मीळ छापील आवृत्त्या व संशोधन प्रबंध उपलब्ध आहेत.",
    archiveReference: "संतसाहित्य कपाट १ / संदर्भ ११",
    tags: ["आद्यकवी मुकुंदराज", "विवेकसिंधू", "१२ वे शतक", "मराठी आद्यग्रंथ"],
  },
  {
    id: "amb-writer-2",
    categoryId: "writers",
    titleMarathi: "संत दासोपंत — सचित्र पसोडीचे महाकवी",
    titleEnglish: "Sant Dasopant — Mystic & Creator of the 40-ft Pasodi",
    era: "१६ वे शतक (१५५१ ते १६१५)",
    locationMarathi: "दासोपंत समाधी व धावते अंबाजोगाई",
    locationEnglish: "Dasopant Sanctuary, Ambajogai",
    image: "/images/real/library_cupboards.png",
    summaryMarathi: "४० फूट लांब व ४ फूट रुंद कापडावर चित्रांसह 'गीतार्णव' व 'पसोडी' लिहिणारे जगातील अद्वितीय संतकवी.",
    summaryEnglish: "Creator of the world's most astonishing cloth manuscript — 40 feet of intricate calligraphy and miniature paintings.",
    historicalContextMarathi: "दासोपंतांनी ५ लाखांहून अधिक ओव्यांची प्रचंड वाङ्मयीन संपदा अंबाजोगाईच्या भूमीत निर्माण केली.",
    curatorNoteMarathi: "साहित्य निकेतनच्या डिजिटल वाचक प्रणालीत पसोडीचे उच्च दर्जाचे संदर्भ अभ्यासकांसाठी उपलब्ध आहेत.",
    archiveReference: "हस्तलिखित संच क्र. प-०१",
    tags: ["संत दासोपंत", "सचित्र पसोडी", "कापडी हस्तलिखित", "१६वे शतक"],
  },
  {
    id: "amb-newspaper-1",
    categoryId: "newspapers",
    titleMarathi: "१९४८ चे गुप्त मुक्तीसंग्राम परिपत्रक व बातमीपत्र",
    titleEnglish: "1948 Hyderabad Liberation Secret Gazette & Bulletin",
    era: "सप्टेंबर १९४८",
    locationMarathi: "साहित्य निकेतन दस्तऐवज कक्ष",
    locationEnglish: "Sahitya Niketan Archives",
    image: "/images/real/library_window.png",
    summaryMarathi: "रझाकारांच्या जुलमी राजवटीविरुद्ध मराठवाड्यातील जनतेला जागे करणारे भूमिगत सायक्लोस्टाइल केलेले ऐतिहासिक बुलेटिन.",
    summaryEnglish: "Underground cyclostyled bulletin distributed during the tense days preceding the liberation on 17 September 1948.",
    historicalContextMarathi: "अंबाजोगाई हे मुक्तिसंग्रामाचे महत्त्वाचे केंद्र होते. ग्रंथालयाच्या संस्थापकांनी जीव धोक्यात घालून ही पत्रके छापली व वाटली.",
    curatorNoteMarathi: "मूळ कागदावरचे शाईचे शिक्के आजही स्पष्टपणे वाचता येतात.",
    archiveReference: "मुक्तीसंग्राम संच कपाट ४ / पत्र क्र. ४८",
    tags: ["मुक्तीसंग्राम", "१९४८", "भूमिगत पत्रक", "ऐतिहासिक दस्तऐवज"],
  },
  {
    id: "amb-education-1",
    categoryId: "education",
    titleMarathi: "योगेश्वरी शिक्षण संस्था — ज्ञानक्रांतीची पहाट (१९३५)",
    titleEnglish: "Yogeshwari Education Society — The Dawn of Knowledge (1935)",
    era: "स्थापना १९३५",
    locationMarathi: "योगेश्वरी परिसर, अंबाजोगाई",
    locationEnglish: "Yogeshwari Campus, Ambajogai",
    image: "/images/real/library_inauguration_plaque.png",
    summaryMarathi: "निजाम राज्यात मराठी माध्यमातून शिक्षणाची कवाडे खुली करणारी मराठवाड्यातील अग्रगण्य शिक्षण संस्था.",
    summaryEnglish: "The pioneering educational institution that opened Marathi-medium schooling against Nizam state opposition.",
    historicalContextMarathi: "पूज्य स्वामी रामानंद तीर्थ आणि बाबासाहेब परांजपे यांच्या प्रेरणेने स्थापन झालेल्या या संस्थेचा व साहित्य निकेतनचा अतूट स्नेहसंबंध आहे.",
    curatorNoteMarathi: "संस्थेच्या स्थापनेच्या पहिल्या वार्षिक अहवालाची प्रत ग्रंथालयाच्या दस्तऐवज दालनात उपलब्ध आहे.",
    archiveReference: "शिक्षण विभाग संच ई-०२",
    tags: ["योगेश्वरी", "१९३५", "शिक्षण", "मराठी शाळा"],
  },
];
