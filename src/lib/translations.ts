export type Language = "mr" | "hi" | "en";

export interface Translations {
  // Common & Header
  skipToContent: string;
  contactUs: string;
  deptTitle: string;
  deptSubtitle: string;
  govPartner: string;
  libraryTitle: string;
  librarySub: string;
  locationTag: string;
  searchPlaceholder: string;
  mobileApp: string;
  androidIos: string;
  exploreLibrary: string;
  membership: string;

  // Nav items
  navHome: string;
  navAbout: string;
  navCatalogue: string;
  navLibrary: string;
  navEvents: string;
  navGallery: string;
  navNews: string;
  navContact: string;

  // Hero Section
  initiativeBadge: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  heroSearchBtn: string;
  quickFiltersLabel: string;
  statBooks: string;
  statBooksLabel: string;
  statMembers: string;
  statMembersLabel: string;
  statManuscripts: string;
  statManuscriptsLabel: string;
  statYears: string;
  statYearsLabel: string;

  // Age Groups
  ageGroupTitle: string;
  ageGroupSubtitle: string;
  ageGroupPrimary: string;
  ageGroupPrimaryDesc: string;
  ageGroupMiddle: string;
  ageGroupMiddleDesc: string;
  ageGroupSecondary: string;
  ageGroupSecondaryDesc: string;
  ageGroupSenior: string;
  ageGroupSeniorDesc: string;

  // Curator / Human Touch
  curatorTitle: string;
  curatorRole: string;
  curatorQuote: string;
  curatorName: string;
  curatorCity: string;
  archivalBadge: string;
  readNote: string;

  // Featured Books Shelf
  shelfTitle: string;
  shelfSubtitle: string;
  tabAll: string;
  tabMarathi: string;
  tabHindi: string;
  tabSanskrit: string;
  tabHeritage: string;
  viewAllCatalogue: string;
  readOnlineBtn: string;
  borrowPhysical: string;

  // About Section
  aboutTitle: string;
  aboutSubtitle: string;
  aboutStory: string;
  aboutPillars: {
    vision: string;
    visionDesc: string;
    mission: string;
    missionDesc: string;
    heritage: string;
    heritageDesc: string;
  };

  // Footer
  footerAbout: string;
  footerAboutText: string;
  footerAddress: string;
  footerAddressText: string;
  footerPhone: string;
  footerEmail: string;
  footerHours: string;
  footerHoursText: string;
  footerRights: string;
  footerGovtNote: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  mr: {
    skipToContent: "मुख्य मजकुराकडे जा",
    contactUs: "संपर्क साधा",
    deptTitle: "संस्कृती व ग्रंथालय संचालनालय",
    deptSubtitle: "महाराष्ट्र शासन मान्यताप्राप्त सार्वजनिक ग्रंथालय",
    govPartner: "अंबाजोगाई, जिल्हा बीड (महाराष्ट्र)",
    libraryTitle: "साहित्य निकेतन ग्रंथालय",
    librarySub: "महाराष्ट्र शासन मान्यताप्राप्त वर्ग 'अ' सार्वजनिक ग्रंथालय",
    locationTag: "शुक्रवार पेठ, अंबाजोगाई - ४३१५१७ (स्थापना: १ ऑगस्ट १९४५)",
    searchPlaceholder: "पुस्तकाचे नाव, लेखक, ग्रंथालय क्रमांक किंवा विषय शोधा...",
    mobileApp: "वाचक साहाय्य",
    androidIos: "ऑनलाइन ग्रंथसूची व शोध",
    exploreLibrary: "ग्रंथालय दालने",
    membership: "सभासद व्हा",

    navHome: "मुख्यपृष्ठ",
    navAbout: "ग्रंथालय परिचय",
    navCatalogue: "ग्रंथसूची",
    navLibrary: "वाचन कक्ष व दालने",
    navEvents: "साहित्यिक कार्यक्रम",
    navGallery: "चित्रदालन",
    navNews: "बातम्या व सूचना",
    navContact: "संपर्क",

    initiativeBadge: "महाराष्ट्र शासन वर्ग 'अ' सार्वजनिक ग्रंथालय",
    heroHeadline: "अंबाजोगाईच्या समृद्ध",
    heroHeadlineHighlight: "साहित्यिक व सांस्कृतिक ज्ञानभांडारात",
    heroDescription:
      "आद्यकवी मुकुंदराज व संत दासोपंतांच्या ऐतिहासिक भूमीतील साहित्य निकेतन सार्वजनिक ग्रंथालय १ ऑगस्ट १९४५ पासून अविरत कार्यरत आहे. ग्रंथालयातील ३९,९५३ मुद्रित ग्रंथ, संदर्भ ग्रंथ, दुर्मीळ हस्तलिखिते व अभ्यासिका दालने वाचक व संशोधकांसाठी उपलब्ध आहेत.",
    heroSearchBtn: "ग्रंथ शोधा",
    quickFiltersLabel: "दालने:",
    statBooks: "३९,९५३",
    statBooksLabel: "नोंदणीकृत ग्रंथसंग्रह",
    statMembers: "५,२००+",
    statMembersLabel: "सक्रिय वाचक व सभासद",
    statManuscripts: "५००+",
    statManuscriptsLabel: "दुर्मीळ मोडी व संस्कृत हस्तलिखिते",
    statYears: "८०+ वर्षे",
    statYearsLabel: "सार्वजनिक वाचन सेवा (स्था. १ ऑगस्ट १९४५)",

    ageGroupTitle: "वाचक वर्ग व दालन परिचय",
    ageGroupSubtitle: "विविध अभिरुचीच्या वाचकांसाठी ग्रंथालयातील विशेष विभाग",
    ageGroupPrimary: "बालमित्र वाचन कट्टा",
    ageGroupPrimaryDesc: "गोष्टिरंग, इसापनीती, सचित्र पुस्तके व संस्कारकथा",
    ageGroupMiddle: "किशोर ज्ञान-विज्ञान दालन",
    ageGroupMiddleDesc: "श्यामची आई, पंचतंत्र, बालसाहित्य व निसर्गकथा",
    ageGroupSecondary: "युवा वाचक व संदर्भ विभाग",
    ageGroupSecondaryDesc: "ऐतिहासिक कादंबऱ्या, चरित्रे, विज्ञान व प्रेरणादायी साहित्य",
    ageGroupSenior: "अभ्यासक व ज्येष्ठ वाचक कक्ष",
    ageGroupSeniorDesc: "मराठी अभिजात साहित्य, तत्त्वज्ञान व संशोधन संदर्भ",

    curatorTitle: "ग्रंथपालांचे मनोगत",
    curatorRole: "मुख्य ग्रंथपाल व संग्रह संरक्षक",
    curatorQuote:
      "«ग्रंथालय हे केवळ पुस्तकांचे कपाट नाही; तर ते एका पिढीचे विचार दुसऱ्या पिढीकडे पोहोचवणारे जिवंत चैतन्यपीठ आहे. अंबाजोगाईच्या मातीत रुजलेले हे साहित्य निकेतन ग्रंथालय गेली आठ दशके अविरतपणे वाचन संस्कृतीचे जतन करत आहे.»",
    curatorName: "मुख्य ग्रंथपाल व व्यवस्थापन",
    curatorCity: "साहित्य निकेतन ग्रंथालय, अंबाजोगाई",
    archivalBadge: "जतन व अभिलेखागार कक्ष",
    readNote: "सविस्तर मनोगत वाचा",

    shelfTitle: "निवडक अभिजात ग्रंथसंग्रह",
    shelfSubtitle: "साहित्य निकेतनच्या खजिन्यातील वाचनीय आणि दुर्मीळ पुस्तके",
    tabAll: "सर्व ग्रंथ",
    tabMarathi: "मराठी अभिजात",
    tabHindi: "हिंदी साहित्य",
    tabSanskrit: "संस्कृत व हस्तलिखिते",
    tabHeritage: "ऐतिहासिक व दुर्मीळ",
    viewAllCatalogue: "संपूर्ण ग्रंथसूची पहा",
    readOnlineBtn: "ग्रंथ तपशील",
    borrowPhysical: "ग्रंथालयातून घ्या",

    aboutTitle: "साहित्य निकेतन ग्रंथालय — अंबाजोगाई",
    aboutSubtitle: "मराठवाड्याच्या सांस्कृतिक भूमीतील सार्वजनिक ग्रंथालय",
    aboutStory:
      "१ ऑगस्ट १९४५ रोजी अंबाजोगाईच्या मध्यवस्तीत शुक्रवार पेठेत सुरू झालेले साहित्य निकेतन ग्रंथालय आज परिसरातील साहित्यिक, संशोधक, विद्यार्थी आणि वाचक वर्गाचे हक्काचे केंद्र बनले आहे. आद्य मराठी ग्रंथ 'विवेकसिंधू'ची रचना ज्या पावन भूमीत झाली, त्या अंबाजोगाईतील वाचन संस्कृतीचे आणि मुद्रित ग्रंथ ठेव्याचे जतन करणे हे संस्थेचे मुख्य उद्दिष्ट आहे.",
    aboutPillars: {
      vision: "आमची दृष्टी (Vision)",
      visionDesc:
        "अंबाजोगाईसह मराठवाड्यातील प्रत्येक वाचकाला, संशोधकाला आणि विद्यार्थ्याला समृद्ध मुद्रित ग्रंथभांडार, संदर्भ सेवा आणि वाचनालय सुविधा उपलब्ध करून देणे.",
      mission: "आमचे ध्येय (Mission)",
      missionDesc:
        "दुर्मीळ हस्तलिखितांचे डिजिटायझेशन, स्पर्धा परीक्षा अभ्यासिकेचा विस्तार आणि नियमित व्याख्यानमालांच्या माध्यमातून वैचारिक प्रबोधन.",
      heritage: "वारसा व योगदान (Heritage)",
      heritageDesc:
        "१ ऑगस्ट १९४५ पासून गेल्या ८ दशकांहून अधिक काळ अंबाजोगाईत साहित्य संमेलने, कवी संमेलने आणि वाचन चळवळ अविरतपणे राबवणारी अग्रगण्य संस्था.",
    },

    footerAbout: "साहित्य निकेतन ग्रंथालय",
    footerAboutText:
      "अंबाजोगाई येथील मान्यताप्राप्त सार्वजनिक ग्रंथालय, संदर्भ केंद्र व वाचनालय. महाराष्ट्र शासन ग्रंथालय संचालनालय वर्ग 'अ' दर्जा.",
    footerAddress: "ग्रंथालय पत्ता",
    footerAddressText: "साहित्य निकेतन सार्वजनिक ग्रंथालय, शुक्रवार पेठ, अंबाजोगाई - ४३१५१७, जि. बीड, महाराष्ट्र.",
    footerPhone: "फोन / व्हॉट्सॲप",
    footerEmail: "ईमेल",
    footerHours: "वाचनालय वेळ",
    footerHoursText: "सकाळी ८:०० ते रात्री ८:३० (वर्तमानपत्र वाचनालय सकाळी ७:०० पासून खुले)",
    footerRights: "सर्व हक्क सुरक्षित. साहित्य निकेतन ग्रंथालय, अंबाजोगाई.",
    footerGovtNote: "महाराष्ट्र शासन मान्यताप्राप्त 'अ' वर्ग सार्वजनिक ग्रंथालय.",
  },

  hi: {
    skipToContent: "मुख्य सामग्री पर जाएं",
    contactUs: "सम्पर्क करें",
    deptTitle: "संस्कृति एवं पुस्तकालय संचालनालय",
    deptSubtitle: "महाराष्ट्र शासन मान्यताप्राप्त सार्वजनिक पुस्तकालय",
    govPartner: "अंबाजोगाई, जिला बीड (महाराष्ट्र)",
    libraryTitle: "साहित्य निकेतन ग्रन्थालय",
    librarySub: "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त सार्वजनिक पुस्तकालय",
    locationTag: "शुक्रवार पेठ, अंबाजोगाई - ४३१५१७ (स्थापना: १ अगस्त १९४५)",
    searchPlaceholder: "पुस्तक का नाम, लेखक, ग्रन्थालय क्रमांक या विषय खोजें...",
    mobileApp: "पाठक सहायता",
    androidIos: "ऑनलाइन ग्रन्थसूची व शोध",
    exploreLibrary: "पुस्तकालय दीर्घाएं",
    membership: "सभासद बनें",

    navHome: "मुख्यपृष्ठ",
    navAbout: "ग्रन्थालय परिचय",
    navCatalogue: "ग्रन्थसूची",
    navLibrary: "वाचन कक्ष व अनुभाग",
    navEvents: "साहित्यिक कार्यक्रम",
    navGallery: "चित्र दीर्घा",
    navNews: "समाचार व सूचनाएं",
    navContact: "सम्पर्क",

    initiativeBadge: "महाराष्ट्र शासन वर्ग 'अ' सार्वजनिक पुस्तकालय",
    heroHeadline: "अंबाजोगाई के समृद्ध",
    heroHeadlineHighlight: "साहित्यिक एवं सांस्कृतिक ज्ञान-कोश में",
    heroDescription:
      "आद्यकवि मुकुंदराज एवं संत दासोपंत की ऐतिहासिक भूमि में साहित्य निकेतन सार्वजनिक ग्रन्थालय १ अगस्त १९४५ से अविरत कार्यरत है। ग्रन्थालय के ३९,९५३ मुद्रित ग्रन्थ, संदर्भ ग्रन्थ, दुर्लभ हस्तलिपियां व अभ्यासिका कक्ष पाठकों और शोधार्थियों के लिए उपलब्ध हैं।",
    heroSearchBtn: "ग्रन्थ खोजें",
    quickFiltersLabel: "प्रमुख दीर्घाएं:",
    statBooks: "३९,९५३",
    statBooksLabel: "पंजीकृत ग्रन्थ संग्रह",
    statMembers: "५,२००+",
    statMembersLabel: "सक्रिय पाठक एवं सदस्य",
    statManuscripts: "५००+",
    statManuscriptsLabel: "दुर्लभ मोडी व संस्कृत पाण्डुलिपियां",
    statYears: "८०+ वर्ष",
    statYearsLabel: "सार्वजनिक वाचन सेवा (स्था. १ अगस्त १९४५)",

    ageGroupTitle: "वाचक वर्ग एवं अनुभाग परिचय",
    ageGroupSubtitle: "विविध अभिरुचि के पाठकों हेतु पुस्तकालय के विशेष विभाग",
    ageGroupPrimary: "बालमित्र वाचन मंच",
    ageGroupPrimaryDesc: "चित्र कथाएं, ईसप नीति, सचित्र पुस्तकें व संस्कार कथाएं",
    ageGroupMiddle: "किशोर ज्ञान-विज्ञान दीर्घा",
    ageGroupMiddleDesc: "श्यामची आई, पंचतंत्र, ज्ञान-विज्ञान व बाल साहित्य",
    ageGroupSecondary: "युवा पाठक एवं संदर्भ प्रभाग",
    ageGroupSecondaryDesc: "ऐतिहासिक उपन्यास, जीवनियां, विज्ञान व प्रेरक साहित्य",
    ageGroupSenior: "अध्येता एवं वरिष्ठ पाठक कक्ष",
    ageGroupSeniorDesc: "अभिजात साहित्य, दर्शन, शोध व उच्च अध्ययन संदर्भ",

    curatorTitle: "पुस्तकाध्यक्ष का संदेश",
    curatorRole: "मुख्य पुस्तकाध्यक्ष एवं संग्रह संरक्षक",
    curatorQuote:
      "«पुस्तकालय केवल पुस्तकों का संग्रह नहीं, बल्कि समाज के विचारों को संजोने और नई पीढ़ी तक पहुंचाने वाला चैतन्य केंद्र है। अंबाजोगाई की ऐतिहासिक भूमि पर साहित्य निकेतन ग्रन्थालय पिछले आठ दशकों से वाचन संस्कृति और ग्रन्थ धरोहर के संरक्षण में समर्पित है।»",
    curatorName: "मुख्य ग्रन्थपाल एवं प्रबंधन",
    curatorCity: "साहित्य निकेतन ग्रन्थालय, अंबाजोगाई",
    archivalBadge: "संरक्षण एवं अभिलेखागार प्रभाग",
    readNote: "पूरा संदेश पढ़ें",

    shelfTitle: "प्रमुख ग्रन्थ संग्रह",
    shelfSubtitle: "साहित्य निकेतन के खजाने से चुनिंदा व पठनीय कृतियां",
    tabAll: "सभी ग्रन्थ",
    tabMarathi: "मराठी अभिजात",
    tabHindi: "हिन्दी साहित्य",
    tabSanskrit: "संस्कृत व पाण्डुलिपियां",
    tabHeritage: "ऐतिहासिक व दुर्लभ",
    viewAllCatalogue: "सम्पूर्ण ग्रन्थसूची देखें",
    readOnlineBtn: "ग्रन्थ विवरण",
    borrowPhysical: "ग्रन्थालय से प्राप्त करें",

    aboutTitle: "साहित्य निकेतन ग्रन्थालय — अंबाजोगाई",
    aboutSubtitle: "महाराष्ट्र शासन वर्ग 'अ' मान्यताप्राप्त सार्वजनिक पुस्तकालय",
    aboutStory:
      "१ अगस्त १९४५ को अंबाजोगाई के मध्य शुक्रवार पेठ में स्थापित साहित्य निकेतन ग्रन्थालय आज क्षेत्र के साहित्यकारों, शोधार्थियों, विद्यार्थियों और पाठकों का प्रमुख केंद्र है। आद्य मराठी ग्रन्थ 'विवेकसिंधु' की रचना भूमि अंबाजोगाई की वाचन संस्कृति और मुद्रित साहित्य धरोहर का संरक्षण हमारा मुख्य ध्येय है।",
    aboutPillars: {
      vision: "हमारी दृष्टि (Vision)",
      visionDesc:
        "अंबाजोगाई एवं मराठवाड़ा के प्रत्येक पाठक, शोधार्थी और विद्यार्थी को समृद्ध मुद्रित ग्रन्थ भंडार, संदर्भ सेवा और वाचनालय सुविधा सुलभ कराना।",
      mission: "हमारा लक्ष्य (Mission)",
      missionDesc:
        "प्राचीन पाण्डुलिपियों का डिजिटलीकरण, प्रतियोगी परीक्षा वाचनालय का विस्तार एवं विचारोत्तेजक व्याख्यानमालाओं का आयोजन।",
      heritage: "विरासत एवं योगदान (Heritage)",
      heritageDesc:
        "१ अगस्त १९४५ से पिछले ८ दशकों से अंबाजोगाई में साहित्य सम्मेलनों, काव्य गोष्ठियों एवं वाचन आंदोलन का नेतृत्व करने वाली अग्रणी संस्था।",
    },

    footerAbout: "साहित्य निकेतन ग्रन्थालय",
    footerAboutText:
      "अंबाजोगाई स्थित सार्वजनिक वाचनालय व संदर्भ केंद्र। महाराष्ट्र शासन ग्रंथालय संचालनालय मान्यताप्राप्त 'अ' वर्ग दर्जा।",
    footerAddress: "ग्रन्थालय पता",
    footerAddressText: "साहित्य निकेतन सार्वजनिक ग्रन्थालय, शुक्रवार पेठ, अंबाजोगाई - ४३१५१७, जि. बीड, महाराष्ट्र।",
    footerPhone: "फोन / वॉट्सऐप",
    footerEmail: "ईमेल",
    footerHours: "वाचनालय समय",
    footerHoursText: "प्रातः ८:०० से रात्रि ८:३० (समाचार पत्र वाचनालय प्रातः ७:०० से खुला)",
    footerRights: "सर्वाधिकार सुरक्षित. साहित्य निकेतन ग्रन्थालय, अंबाजोगाई.",
    footerGovtNote: "महाराष्ट्र शासन मान्यताप्राप्त 'अ' वर्ग सार्वजनिक पुस्तकालय।",
  },

  en: {
    skipToContent: "Skip to main content",
    contactUs: "Contact Us",
    deptTitle: "Directorate of Libraries & Culture",
    deptSubtitle: "Govt. of Maharashtra Recognized Public Library",
    govPartner: "Ambajogai, Dist. Beed (Maharashtra)",
    libraryTitle: "Sahitya Niketan Granthalaya",
    librarySub: "Govt. of Maharashtra Recognized Class 'A' Public Library",
    locationTag: "Shukrawar Peth, Ambajogai - 431517 (Est. 1 August 1945)",
    searchPlaceholder: "Search book title, author, accession number, subject...",
    mobileApp: "Reader Assistance",
    androidIos: "Online OPAC & Catalogue Search",
    exploreLibrary: "Library Stacks",
    membership: "Join Library",

    navHome: "Home",
    navAbout: "About Library",
    navCatalogue: "Book Catalogue",
    navLibrary: "Reading Rooms & Stacks",
    navEvents: "Literary Events",
    navGallery: "Photo Archives",
    navNews: "Notices & News",
    navContact: "Contact",

    initiativeBadge: "Govt. of Maharashtra Grade 'A' Public Library",
    heroHeadline: "Step into the Cherished",
    heroHeadlineHighlight: "Literary & Cultural Heritage of Ambajogai",
    heroDescription:
      "Rooted in the historic soil of Adya Kavi Mukundraj and Saint Dasopant, Sahitya Niketan Granthalaya has served readers continuously since 1 August 1945. Housing over 39,953 registered printed volumes, reference works, rare Modi script manuscripts, and dedicated study facilities for students and researchers.",
    heroSearchBtn: "Search Catalogue",
    quickFiltersLabel: "Popular Stacks:",
    statBooks: "39,953",
    statBooksLabel: "Registered Volumes",
    statMembers: "5,200+",
    statMembersLabel: "Active Readers & Members",
    statManuscripts: "500+",
    statManuscriptsLabel: "Rare Modi & Sanskrit Manuscripts",
    statYears: "80+ Years",
    statYearsLabel: "Public Library Service (Est. 1 Aug 1945)",

    ageGroupTitle: "Reading Circles & Sections",
    ageGroupSubtitle: "Dedicated literature collections welcoming readers of every generation",
    ageGroupPrimary: "Children's Story Circle",
    ageGroupPrimaryDesc: "Aesop's fables, illustrated books, folklore & rhymes",
    ageGroupMiddle: "Junior Science & Lore Stacks",
    ageGroupMiddleDesc: "Panchatantra, Shyamchi Aai, nature fables & science books",
    ageGroupSecondary: "Youth & Reference Wing",
    ageGroupSecondaryDesc: "Historical novels, heroic biographies & adventure literature",
    ageGroupSenior: "Scholars & Classical Studies",
    ageGroupSeniorDesc: "Classical Marathi literature, philosophy & archival research",

    curatorTitle: "Librarian's Note",
    curatorRole: "Chief Librarian & Heritage Conservator",
    curatorQuote:
      "«A library is never merely a collection of books; it is the living repository through which the thought and knowledge of past generations reach the youth of today. Sahitya Niketan has steadfastly preserved the reading movement and archival heritage of Ambajogai for over eight decades.»",
    curatorName: "Chief Librarian & Administration",
    curatorCity: "Sahitya Niketan Granthalaya, Ambajogai",
    archivalBadge: "Conservation & Archival Cell",
    readNote: "Read Full Statement",

    shelfTitle: "Selected Institutional Holdings",
    shelfSubtitle: "Notable literary and historical volumes preserved in the library stacks",
    tabAll: "All Holdings",
    tabMarathi: "Marathi Classics",
    tabHindi: "Hindi Literature",
    tabSanskrit: "Sanskrit & Manuscripts",
    tabHeritage: "Rare & Historical",
    viewAllCatalogue: "Browse Complete Catalogue",
    readOnlineBtn: "View Record",
    borrowPhysical: "Borrow from Library",

    aboutTitle: "Sahitya Niketan Granthalaya — Ambajogai",
    aboutSubtitle: "Govt. Recognized Class 'A' Public Library",
    aboutStory:
      "Established on 1 August 1945 in Shukrawar Peth, Ambajogai, Sahitya Niketan Granthalaya has served generations of writers, scholars, students, and citizens. Situated in the historic town where Marathi's earliest literary work 'Vivekasindhu' was composed, our founding mission remains the preservation and development of reading culture and printed literature.",
    aboutPillars: {
      vision: "Our Vision",
      visionDesc:
        "To provide students, researchers, and general readers across Marathwada comprehensive access to printed literature, reference collections, and quiet study environments.",
      mission: "Our Mission",
      missionDesc:
        "Preserving ancient Modi and Sanskrit manuscripts through digitization, maintaining dedicated competitive examination reading halls, and convening annual literary lectures.",
      heritage: "Our Heritage & Legacy",
      heritageDesc:
        "Over eight decades of hosting state-level literary conferences, poetry gatherings, and grassroots reading promotion initiatives since 1 August 1945.",
    },

    footerAbout: "Sahitya Niketan Granthalaya",
    footerAboutText:
      "Public heritage library, reference center, and archives in Ambajogai. Recognized as Class 'A' Public Library by the Directorate of Libraries, Government of Maharashtra.",
    footerAddress: "Library Address",
    footerAddressText:
      "Sahitya Niketan Granthalaya, Shukrawar Peth, Ambajogai - 431517, Dist. Beed, Maharashtra.",
    footerPhone: "Phone / WhatsApp",
    footerEmail: "Email",
    footerHours: "Reading Room Hours",
    footerHoursText: "8:00 AM – 8:30 PM (Newspaper reading room opens daily at 7:00 AM)",
    footerRights: "All rights reserved. Sahitya Niketan Granthalaya, Ambajogai.",
    footerGovtNote: "Govt. of Maharashtra Recognized Grade 'A' Public Library.",
  },
};
