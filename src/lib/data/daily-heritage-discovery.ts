/**
 * Daily Heritage Discovery (आजच्या संग्रहातून / आजचा दुर्मिळ ग्रंथ / या दिवशी...)
 * 
 * Curated archival records that rotate dynamically on each visit / daily seed,
 * giving visitors an authentic reason to return every single day.
 */

export type DiscoveryType = "archive_letter" | "rare_book" | "on_this_day";

export interface DailyHeritageItem {
  id: string;
  type: DiscoveryType;
  typeLabelMarathi: string; // e.g. "आजच्या संग्रहातून" | "आजचा दुर्मिळ ग्रंथ" | "या दिवशी..."
  typeEmoji: string; // "📜" | "📖" | "🕰️"
  titleMarathi: string;
  titleEnglish: string;
  year: string; // e.g., "१९४८", "१९५७", "शके ११८८"
  subtitleMarathi: string;
  excerptMarathi: string;
  authorOrOriginMarathi: string;
  shelfReference: string;
  image?: string;
  fullDocumentTextMarathi?: string[];
  historicalNoteMarathi: string;
  callToActionTextMarathi: string;
  actionUrl: string;
  accentColor: string;
}

export const DAILY_HERITAGE_ITEMS: DailyHeritageItem[] = [
  // 1. आजच्या संग्रहातून (Historic Letters & Charters)
  {
    id: "letter-1948",
    type: "archive_letter",
    typeLabelMarathi: "आजच्या संग्रहातून",
    typeEmoji: "📜",
    titleMarathi: "१९४८ चे एक जुने पत्र — मुक्तीसंग्राम गुप्त खलिता",
    titleEnglish: "A 1948 Historic Secret Letter — Library Protection Decree",
    year: "१२ ऑगस्ट १९४८",
    subtitleMarathi: "रझाकार दंगलींच्या काळात ग्रंथालयातील दुर्मीळ हस्तलिखितांचे रक्षण करण्यासाठी पाठवलेला गुप्त संदेश",
    excerptMarathi: "«...ग्रंथालयातील मुकुंदराजांचे हस्तलिखित आणि जुनी मराठी दप्तर सुरक्षित स्थानी हलवण्यात आले आहे. वाचनालय जरी बंद दिसत असले, तरी ज्ञानाचा दिवा अखंड तेवत राहील याची दक्षता घ्यावी...»",
    authorOrOriginMarathi: "स्वातंत्र्यसेनानी गुप्त समिती, शुक्रवार पेठ शाखा",
    shelfReference: "अभिलेख कक्ष, कपाट ४, दस्तऐवज क्र. ४८-अ",
    image: "/images/real/library_vintage_books.png",
    fullDocumentTextMarathi: [
      "प्रति, साहित्य निकेतन ग्रंथालय विश्वस्त मंडळ,",
      "सप्रेम नमस्कार.",
      "सध्याच्या तणावपूर्ण वातावरणात निजाम पोलिसांची व रझाकारांची करडी नजर वाचनालयावर आहे. आपण सर्वांनी एकत्र येऊन आद्यकवी मुकुंदराज व संत दासोपंतांच्या अमूल्य पोथ्या सुरक्षित भुयारी कपाटात स्थलांतरित केल्या ही समाधानाची गोष्ट आहे.",
      "लढ्याची अंतिम घटका समीप आली आहे. मराठवाडा लवकरच स्वतंत्र भारताचा अविभाज्य भाग बनेल. तोपर्यंत वाचनालयातील एकाही ग्रंथाला आच येऊ देऊ नये ही सर्वांची प्रतिज्ञा आहे.",
      "— स्वातंत्र्यसेनानी सहकारी, अंबाजोगाई (१२ ऑगस्ट १९४८)"
    ],
    historicalNoteMarathi: "१७ सप्टेंबर १९४८ रोजी हैदराबाद संस्थानाचे भारतात विलीनीकरण झाले. त्यापूर्वी महिन्याभरापूर्वी लिहिलेले हे पत्र स्वातंत्र्यलढ्यातील ग्रंथालयाच्या ऐतिहासिक योगदानाची साक्ष देते.",
    callToActionTextMarathi: "मूळ पत्राचा संपूर्ण मजकूर वाचा",
    actionUrl: "/history#timeline",
    accentColor: "from-amber-900/20 to-orange-950/20 border-amber-300 dark:border-amber-700/60",
  },
  {
    id: "letter-1952",
    type: "archive_letter",
    typeLabelMarathi: "आजच्या संग्रहातून",
    typeEmoji: "📜",
    titleMarathi: "१९५२ चे पत्र — कवी ग. दि. माडगूळकर यांचा संदेश",
    titleEnglish: "1952 Letter — Congratulatory Note by G. D. Madgulkar",
    year: "१४ मार्च १९५२",
    subtitleMarathi: "साहित्य निकेतनच्या वार्षिक वाचन महोत्सवानिमित्त 'गदिमां'नी पाठवलेले स्वाक्षरीयुक्त शुभेच्छा पत्र",
    excerptMarathi: "«...अंबाजोगाई हे केवळ नगर नव्हे, तर मराठी भाषेचे पहिले उगमस्थान आहे. या पावन मातीत साहित्य निकेतन ग्रंथालय जे वाचनसंस्कृतीचे कार्य करत आहे, ते वंदनीय आहे...»",
    authorOrOriginMarathi: "ग. दि. माडगूळकर (गदिमा), पुणे",
    shelfReference: "साहित्यिक पत्रव्यवहार संग्रह, फाईल क्र. म-२",
    image: "/images/real/library_window.png",
    fullDocumentTextMarathi: [
      "सस्नेह जय महाराष्ट्र,",
      "साहित्य निकेतन ग्रंथालयाचे कार्य पाहून मन अत्यंत प्रसन्न झाले. मुकुंदराजांच्या प्रांगणात आपण सर्वजण मराठी भाषेची मशाल प्रज्वलित ठेवत आहात.",
      "मराठवाड्यातील तरुणांमध्ये वाचनाची गोडी निर्माण करण्याचे हे व्रत असेच अविरत चालो, हीच शारदा चरणी प्रार्थना.",
      "— आपला नम्र, ग. दि. माडगूळकर"
    ],
    historicalNoteMarathi: "महाराष्ट्रातील नामांकित साहित्यिकांनी साहित्य निकेतन ग्रंथालयाला वारंवार भेटी दिल्या आणि आपल्या हस्तलिखित पत्रांतून ग्रंथालयाचा गौरव केला.",
    callToActionTextMarathi: "साहित्यिक अभिलेख तपासा",
    actionUrl: "/history",
    accentColor: "from-rose-900/20 to-red-950/20 border-rose-300 dark:border-rose-700/60",
  },

  // 2. आजचा दुर्मिळ ग्रंथ (Rare Books)
  {
    id: "book-vivekasindhu",
    type: "rare_book",
    typeLabelMarathi: "आजचा दुर्मिळ ग्रंथ",
    typeEmoji: "📖",
    titleMarathi: "विवेकसिंधू — आद्यकवी मुकुंदराज (दुर्मीळ प्रत)",
    titleEnglish: "Vivekasindhu by Adya Kavi Mukundraj (Heritage Copy)",
    year: "शके ११८८ (इ.स. ११८८)",
    subtitleMarathi: "मराठी भाषेतील आद्य तत्त्वज्ञान ग्रंथाची ऐतिहासिक प्रत, जी ग्रंथालयाच्या विशेष कपाटात जतन आहे",
    excerptMarathi: "«मूळ संस्कृत वेदान्त प्राकृत भाषेत आणून मराठीला अमृताहूनही पैजा जिंकण्याचे सामर्थ्य देणारा आद्य ग्रंथ.»",
    authorOrOriginMarathi: "आद्यकवि मुकुंदराज (अंबाजोगाई)",
    shelfReference: "दुर्मीळ ग्रंथ दालन, कपाट क्र. १ / अनुक्रमांक ००१",
    image: "/images/real/library_vintage_books.png",
    fullDocumentTextMarathi: [
      "ग्रंथ परिचय:",
      "ग्रंथनाम: विवेकसिंधू",
      "रचनाकाळ: शके ११८८ (इ.स. ११८८)",
      "वैशिष्ट्य: आद्यकवी मुकुंदराजांनी अंबाजोगाईच्या निसर्गरम्य दरीत शंकराचार्यांच्या अद्वैत तत्त्वज्ञानावर मराठीतील हा पहिला ग्रंथ लिहिला.",
      "ग्रंथालयातील जतन: साहित्य निकेतन ग्रंथालयात जुन्या कागदावरील हस्ताक्षरित प्रतिचे पाने व १९३० च्या दशकातील दुर्मीळ संपादन सुरक्षित आहे."
    ],
    historicalNoteMarathi: "मराठी भाषेला अभिजात भाषेचा दर्जा मिळवून देण्यात विवेकसिंधूचा ऐतिहासिक पुरावा अत्यंत निर्णायक ठरला आहे. ही संपूर्ण अंबाजोगाईची अस्मिता आहे.",
    callToActionTextMarathi: "ग्रंथालय कॅटलॉगमध्ये शोधा",
    actionUrl: "/catalogue?q=विवेकसिंधू",
    accentColor: "from-amber-900/20 to-yellow-950/20 border-amber-400 dark:border-amber-600/70",
  },
  {
    id: "book-pasodi",
    type: "rare_book",
    typeLabelMarathi: "आजचा दुर्मिळ ग्रंथ",
    typeEmoji: "📖",
    titleMarathi: "संत दासोपंतकृत 'सचित्र पसोडी' कापडी हस्तलिखित",
    titleEnglish: "Sant Dasopant's Illustrated Cloth Manuscript 'Pasodi'",
    year: "१६ वे शतक (इ.स. १५९०)",
    subtitleMarathi: "४० फूट लांब व ४ फूट रुंद कापडावर चित्रांसह कोरलेला अद्वैत वेदान्ताचा विश्वविक्रमी खजिना",
    excerptMarathi: "«जगातील एकमेव कापडी हस्तलिखित! सूक्ष्म ओव्या, रंगीत चित्रे आणि आध्यात्मिक चक्रांची अद्भुत मांडणी.»",
    authorOrOriginMarathi: "संत दासोपंत (अंबाजोगाई)",
    shelfReference: "हस्तलिखित विशेष दालन, संरक्षित संच क्र. प-०१",
    image: "/images/real/library_cupboards.png",
    fullDocumentTextMarathi: [
      "ग्रंथ वैशिष्ट्ये:",
      "प्रकार: कापडी सचित्र महाहस्तलिखित",
      "लांबी: ४० फूट, रुंदी: ४ फूट",
      "ओवी संख्या: हजारो सूक्ष्म ओव्या व शेकडो रंगीत देव-देवतांची रेखाचित्रे",
      "महत्त्व: संत दासोपंतांनी ५ लाखांहून अधिक ओव्यांची प्रचंड वाङ्मयीन संपदा निर्माण केली. त्यातील 'पसोडी' हे जागतिक हस्तलिखित शास्त्रातील अजोड आश्चर्य मानले जाते."
    ],
    historicalNoteMarathi: "साहित्य निकेतनच्या डिजिटल वाचक प्रणालीमध्ये पसोडीची पाने उच्च रिझोल्यूशनमध्ये उपलब्ध असून संशोधकांना अभ्यासासाठी साहाय्य केले जाते.",
    callToActionTextMarathi: "डिजिटल हस्तलिखित पहा",
    actionUrl: "/history#manuscript-viewer",
    accentColor: "from-rose-900/20 to-red-950/20 border-rose-300 dark:border-rose-700/60",
  },
  {
    id: "book-1857",
    type: "rare_book",
    typeLabelMarathi: "आजचा दुर्मिळ ग्रंथ",
    typeEmoji: "📖",
    titleMarathi: "१८५७ चे स्वातंत्र्यसमर — स्वा. सावरकर (१९०९ दुर्मीळ आवृत्ती)",
    titleEnglish: "The Indian War of Independence 1857 — V. D. Savarkar",
    year: "मूळ आवृत्ती १९०९",
    subtitleMarathi: "ब्रिटिश सरकारने बंदी घातलेल्या आणि स्वातंत्र्यलढ्यात क्रांतिकारकांची गीता ठरलेल्या ग्रंथाची ऐतिहासिक प्रत",
    excerptMarathi: "«ज्या पुस्तकाच्या केवळ एका प्रतीसाठी भगतसिंग व राजगुरू यांच्यासारख्या क्रांतीवीरांनी धावपळ केली, त्या ग्रंथाचे जतन.»",
    authorOrOriginMarathi: "स्वातंत्र्यवीर विनायक दामोदर सावरकर",
    shelfReference: "क्रांतिकारक साहित्य, कपाट ४, क्र. १५",
    image: "/images/real/library_savarkar_portrait.png",
    fullDocumentTextMarathi: [
      "ग्रंथ इतिहास:",
      "ब्रिटिशांनी भारतात आणि इंग्लंडमध्ये प्रकाशनापूर्वीच बंदी घातलेला हा जगातील पहिला इतिहास ग्रंथ होता.",
      "मराठवाडा मुक्तीसंग्रामाच्या काळात या ग्रंथाची पाने भूमिगत कार्यकर्त्यांमध्ये गुप्तपणे वाचली जात असत.",
      "साहित्य निकेतनमध्ये या ग्रंथाची दुर्मीळ आवृत्ती अखंड जतन आहे."
    ],
    historicalNoteMarathi: "ग्रंथालयाच्या स्थापनेपासूनच राष्ट्रप्रेमाने प्रेरित ग्रंथसंग्रह करणे हे संस्थापकांचे प्रमुख ध्येय होते.",
    callToActionTextMarathi: "क्रांतिकारक ग्रंथ सूची पहा",
    actionUrl: "/catalogue?category=history",
    accentColor: "from-stone-900/20 to-zinc-950/20 border-stone-400 dark:border-stone-600/70",
  },

  // 3. या दिवशी... (On This Day in Sahitya Niketan History)
  {
    id: "on-this-day-1957",
    type: "on_this_day",
    typeLabelMarathi: "या दिवशी...",
    typeEmoji: "🕰️",
    titleMarathi: "Sahitya Niketan, 1957",
    titleEnglish: "Sahitya Niketan, 1957 — Historical Research Branch Inception",
    year: "१९५७",
    subtitleMarathi: "ऐतिहासिक मोडी लिपी आणि मराठवाडा इतिहास संशोधन दालनाचा अधिकृत प्रारंभ",
    excerptMarathi: "«१९५७ च्या या दिवशी ग्रंथालयाच्या विश्वस्तांनी जुन्या सनदा, मोडी पत्रव्यवहार आणि ऐतिहासिक कागदपत्रांचे संवर्धन करण्यासाठी विशेष दालनाची मुहूर्तमेढ रोवली.»",
    authorOrOriginMarathi: "साहित्य निकेतन ग्रंथालय दस्तऐवज नोंदवही १९५७",
    shelfReference: "वार्षिक अहवाल खंड १२ (वर्ष १९५७)",
    image: "/images/real/library_inauguration_plaque.png",
    fullDocumentTextMarathi: [
      "१९५७ ची ऐतिहासिक नोंद:",
      "साहित्य निकेतन ग्रंथालयाने केवळ छापील पुस्तकेच नव्हे, तर अंबाजोगाई परिसरातील ऐतिहासिक घराण्यांमधील मोडी लिपीतील सनदा गोळा करण्यास सुरुवात केली.",
      "या निर्णयामुळे आज ग्रंथालयाकडे ५०० हून अधिक अस्सल मोडी सनदा व पेशवेकालीन पत्रव्यवहार सुरक्षित आहे."
    ],
    historicalNoteMarathi: "आजही इतिहास संशोधक आणि पीएच.डी. चे विद्यार्थी या दालनातील कागदपत्रांचा अभ्यास करण्यासाठी अंबाजोगाईत येतात.",
    callToActionTextMarathi: "ग्रंथालयाचा संपूर्ण इतिहास पहा",
    actionUrl: "/history",
    accentColor: "from-amber-900/20 to-emerald-950/20 border-amber-300 dark:border-amber-600/70",
  },
  {
    id: "on-this-day-1945",
    type: "on_this_day",
    typeLabelMarathi: "या दिवशी...",
    typeEmoji: "🕰️",
    titleMarathi: "१ ऑगस्ट १९४५ — साहित्य निकेतनची स्थापना",
    titleEnglish: "1 August 1945 — Founding Inscription of Sahitya Niketan",
    year: "१ ऑगस्ट १९४५",
    subtitleMarathi: "लोकमान्य टिळक पुण्यतिथीच्या दिवशी स्वातंत्र्यसैनिकांनी रोवलेले ज्ञानरोपटं",
    excerptMarathi: "«स्वातंत्र्यलढ्याची धामधूम असताना अंबाजोगाईच्या तरुणांनी वाचनसंस्कृतीच्या माध्यमातून जनजागृती करण्यासाठी १ ऑगस्ट १९४५ रोजी ग्रंथालयाची स्थापना केली.»",
    authorOrOriginMarathi: "संस्थापक सदस्य (शुक्रवार पेठ, अंबाजोगाई)",
    shelfReference: "संस्थापक नोंदवही, पान क्र. १",
    image: "/images/real/library_inauguration_plaque.png",
    fullDocumentTextMarathi: [
      "संस्थापकांची शपथ:",
      "«अज्ञानाचा अंधकार दूर करण्यासाठी आणि मातृभाषेचा गौरव वाढवण्यासाठी आम्ही हे ग्रंथालय स्थापन करीत आहोत.»",
      "पहिल्या दिवशी ग्रंथालयाकडे अवघी २५ पुस्तके होती, आज त्याचा ३९,९५३+ ग्रंथांचा महासागर झाला आहे."
    ],
    historicalNoteMarathi: "स्थापनेपासून सलग ८० वर्षे ग्रंथालयाने एकाही दिवशी वाचनसेवा खंडित होऊ दिलेली नाही.",
    callToActionTextMarathi: "स्थापनेचा इतिहास वाचा",
    actionUrl: "/history#timeline",
    accentColor: "from-rose-900/20 to-amber-950/20 border-rose-300 dark:border-rose-700/60",
  },
  {
    id: "on-this-day-1948",
    type: "on_this_day",
    typeLabelMarathi: "या दिवशी...",
    typeEmoji: "🕰️",
    titleMarathi: "१७ सप्टेंबर १९४८ — मराठवाडा मुक्तीदिन ध्वजारोहण",
    titleEnglish: "17 September 1948 — Marathwada Liberation Flag Hoisting",
    year: "१७ सप्टेंबर १९४८",
    subtitleMarathi: "निजाम राजवटीतून मुक्ती मिळताच ग्रंथालयाच्या प्रांगणात झालेला पहिला तिरंगा वंदन सोहळा",
    excerptMarathi: "«स्वातंत्र्याची पहाट झाली आणि ग्रंथालयाचे सर्व कार्यकर्ते एकत्र येऊन त्यांनी भारतीय तिरंगा फडकावला व आनंदोत्सवात मोफत ग्रंथ वाटप केले.»",
    authorOrOriginMarathi: "मुक्तीदिन ऐतिहासिक स्मृती",
    shelfReference: "मुक्तीसंग्राम दालन, छायाचित्र संच १",
    image: "/images/real/library_signboard.png",
    fullDocumentTextMarathi: [
      "१७ सप्टेंबर १९४८ ची सकाळ:",
      "भारतीय सैन्याचे आगमन होताच रझाकारांचे जुलमी सावट दूर झाले.",
      "साहित्य निकेतन ग्रंथालयाच्या समोर हजारो नागरिक जमले आणि त्यांनी स्वातंत्र्याचा जयघोष केला.",
      "या दिवसाच्या स्मरणार्थ दरवर्षी १७ सप्टेंबर रोजी ग्रंथालयात विशेष व्याख्यानमाला आयोजित केली जाते."
    ],
    historicalNoteMarathi: "साहित्य निकेतनचे अनेक कार्यकर्ते प्रत्यक्ष हैदराबाद मुक्तिसंग्रामातील भूमिगत शिलेदार होते.",
    callToActionTextMarathi: "मुक्तीसंग्राम दालन पहा",
    actionUrl: "/history",
    accentColor: "from-amber-900/20 to-orange-950/20 border-amber-400 dark:border-amber-600/70",
  }
];

/**
 * Returns a discovery item deterministically for today, or based on an index/session seed.
 */
export function getDailyDiscoveryItem(seedOffset: number = 0): DailyHeritageItem {
  // Deterministic seed by day of year so all visitors on the same day see a coherent item,
  // but clicking "पुढील ठेवा पहा" cycles smoothly through all items!
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs((dayOfYear + seedOffset) % DAILY_HERITAGE_ITEMS.length);
  return DAILY_HERITAGE_ITEMS[index];
}
