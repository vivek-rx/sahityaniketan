/**
 * SAHITYA NIKETAN GRANTHALAYA, AMBAJOGAI
 * Official Primary Source Archival History & Governance Record
 * Authenticated Historical Inscription (स्थापना: १ ऑगस्ट १९४५)
 */

export interface HistoryChapter {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  yearRange?: string;
  content: string;
  contentEn: string;
  keyHighlights: string[];
  image?: string;
}

export const OFFICIAL_LIBRARY_HISTORY = {
  mainHeading: "आमचा प्रेरणादायी प्रवास: साहित्य निकेतन, अंबाजोगाई",
  mainHeadingEn: "Our Inspiring Journey: Sahitya Niketan, Ambajogai",
  registration: {
    act: "सोसायटीज रजिस्ट्रेशन ॲक्ट, १८६०",
    actEn: "Societies Registration Act, 1860",
    regNumber: "BHR/3/1962",
    firstTrustees: [
      "श्री. एकनाथ माधवराव कुलकर्णी",
      "श्री. भगवानदासजी सालीग्रामजी लोहिया",
      "श्री. चंद्रगुप्त बिहारीलाल गुप्त"
    ],
    firstTrusteesEn: [
      "Shri Eknath Madhavrao Kulkarni",
      "Shri Bhagwandasji Saligramji Lohia",
      "Shri Chandragupta Biharilal Gupta"
    ],
    currentTrustees: [
      "डॉ. शरद पांडुरंग हबाकर",
      "श्री. रामचंद्र नरसदासजी संबर",
      "श्री. भास्करराव झुंडीरामजी धर्मपाळे"
    ],
    currentTrusteesEn: [
      "Dr. Sharad Pandurang Habakar",
      "Shri Ramchandra Narsingdasji Sanbar (Zanwar)",
      "Shri Bhaskarrao Zhundiramji Dharmapale"
    ],
  },
  motto: {
    mr: "अनेक हृदय हो भारत जननी",
    en: "Anek Hriday Ho Bharat Janani",
  },
  foundingDate: "१ ऑगस्ट १९४५",
  foundingDateEn: "1 August 1945",
  foundingMembers: [
    "श्री. गोविंदलाल जानू",
    "विश्वराव जाधव",
    "रामचंद्रजी क्षीरसागर",
    "विपत वहमवार",
    "चंद्रगुप्त आर्य",
    "के. बी. पाटील",
    "प्र. गो. रामदासी"
  ],
  earlyTeachers: [
    "प्र. गो. भावठाणकर",
    "ज्ञा. लु. खोपुसकर",
    "विनायकराव जानवळकर",
    "प्र. गो. रामदासी"
  ],
  chapters: [
    {
      id: "foundation",
      number: 1,
      title: "स्थापना: एका उदात्त विचाराचा जन्म",
      titleEn: "Foundation: The Birth of a Noble Vision",
      yearRange: "१९४५",
      content:
        "“अनेक हृदय हो भारत जननी” या उदात्त ब्रीदवाक्याने प्रेरित होऊन, १ ऑगस्ट १९४५ रोजी अंबाजोगाई येथे 'साहित्य निकेतन' या संस्थेची मुहूर्तमेढ रोवली गेली. देशाच्या स्वातंत्र्यलढ्याच्या काळात, साहित्याच्या माध्यमातून लोकजागृती करणे, सामाजिक सुधारणा घडवून आणणे आणि राष्ट्रीय एकात्मता व परस्परांतील बंधुभाव दृढ करणे या उद्देशाने काही ध्येयवादी तरुणांनी एकत्र येऊन हे पाऊल उचलले. या उत्साही तरुणांमध्ये प्रामुख्याने श्री. गोविंदलाल जानू, विश्वराव जाधव, रामचंद्रजी क्षीरसागर, विपत वहमवार, चंद्रगुप्त आर्य, के. बी. पाटील, आणि प्र. गो. रामदासी यांचा मोलाचा सहभाग होता.",
      contentEn:
        "Inspired by the noble motto 'Anek Hriday Ho Bharat Janani', the foundation stone of 'Sahitya Niketan' was laid on 1 August 1945 in Ambajogai. During the historic era of India's freedom struggle and the Hyderabad liberation movement, visionary youth came together to awaken the public conscience through literature, foster social reform, and strengthen national integration and mutual brotherhood. Prominent among these zealous young founders were Shri Govindlal Janu, Vishwarao Jadhav, Ramchandraji Kshirsagar, Vipat Wahamwar, Chandragupta Arya, K. B. Patil, and P. G. Ramdasi.",
      keyHighlights: [
        "स्थापना १ ऑगस्ट १९४५ (स्वातंत्र्यपूर्व काळ)",
        "ब्रीदवाक्य: 'अनेक हृदय हो भारत जननी'",
        "स्वातंत्र्यलढा व लोकजागृतीच्या प्रेरणेतून जन्म",
        "ध्येयवादी स्थानिक तरुणांचा पुढाकार"
      ],
      image: "/images/real/library_inauguration_plaque.png",
    },
    {
      id: "objective",
      number: 2,
      title: "आमचा उद्देश: साहित्यातून समाज परिवर्तन",
      titleEn: "Our Mission: Social Transformation Through Literature",
      yearRange: "ध्येय व उद्दिष्टे",
      content:
        "साहित्याच्या माध्यमातून भारतीय साहित्य व संस्कृतीची सर्वांगीण उन्नती करणे हा आमचा मुख्य उद्देश राहिला आहे. ग्रंथालय आणि वाचनालयाच्या माध्यमातून बौद्धिक विकासासाठी साहित्याचा प्रचार व प्रसार करणे; तसेच प्राचीन, पौर्वात्य व अर्वाचीन ग्रंथांचा मौल्यवान संग्रह निर्माण करून तो सुरक्षित ठेवणे आणि अभ्यासकांना उपलब्ध करून देणे हे आमचे ध्येय आहे. जनतेमध्ये वाचनाची अभिरुची निर्माण करण्यासाठी आम्ही विविध साहित्यिक व सांस्कृतिक कार्यक्रम आयोजित करतो आणि उत्कृष्ट वाचकांचा गौरवही करतो.",
      contentEn:
        "Our prime objective has always been the comprehensive advancement of Indian literature and culture. To propagate literature for intellectual enrichment through public libraries and reading rooms; to build, conserve, and provide access to rare ancient, oriental, and modern manuscripts and books for research scholars. To cultivate reading habits across society, the institution conducts literary lectures, book exhibitions, and honors distinguished readers.",
      keyHighlights: [
        "भारतीय साहित्य व संस्कृतीची सर्वांगीण उन्नती",
        "प्राचीन, पौर्वात्य व अर्वाचीन ग्रंथांचे जतन",
        "अभ्यासक व संशोधकांना संदर्भ उपलब्धता",
        "उत्कृष्ट वाचकांचा नियमित गौरव"
      ],
      image: "/images/real/marathi_books_display.png",
    },
    {
      id: "early-works",
      number: 3,
      title: "प्रारंभीची कार्ये: पायाभरणीची वर्षे",
      titleEn: "Early Initiatives: The Foundation Years",
      yearRange: "१९४५ – १९५५",
      content:
        "सुरुवातीच्या काळात साहित्य निकेतनने ग्रंथालय व वाचनालय सुरू करण्यावर भर दिला. यासोबतच, 'हिंदी प्रचार सभा, हैदराबाद' या संस्थेअंतर्गत राष्ट्रभाषा हिंदीचा प्रसार करण्याचे महत्त्वपूर्ण काम हाती घेतले गेले. विद्यार्थ्यांसाठी नियमित वर्ग चालविणे आणि शिक्षकांची नेमणूक करणे असे उपक्रम राबविले गेले. त्या काळी मिळणाऱ्या अल्पशा मानधनातूनही प्र. गो. भावठाणकर, ज्ञा. लु. खोपुसकर, विनायकराव जानवळकर, प्र. गो. रामदासी यांसारख्या समर्पित शिक्षकांनी उदार अंतःकरणाने संस्थेच्या आणि ग्रंथालयाच्या वाढीसाठी योगदान दिले.",
      contentEn:
        "During its nascent years, Sahitya Niketan prioritized establishing public reading halls while simultaneously undertaking the promotion of the national language under 'Hindi Prachar Sabha, Hyderabad'. Regular educational classes were conducted with dedicated faculty appointments. Despite nominal honorary honorariums, devoted teachers including P. G. Bhavthankar, Dnya. Lu. Khopuskar, Vinayakrao Janwalkar, and P. G. Ramdasi contributed generously with their heart and soul to nurture the library.",
      keyHighlights: [
        "सार्वजनिक वाचनालय व ग्रंथदालनाची सुरुवात",
        "हिंदी प्रचार सभा, हैदराबाद अंतर्गत वर्ग",
        "समर्पित शिक्षकांचे निःस्वार्थ योगदान",
        "अल्प मानधनातून ग्रंथालयाची उभारणी"
      ],
      image: "/images/real/library_vintage_books.png",
    },
    {
      id: "struggle-for-space",
      number: 4,
      title: "जागेचा संघर्ष आणि ग्रंथालयाचा विकास",
      titleEn: "The Struggle for Space & Library Evolution",
      yearRange: "१९५८ – १९९२",
      content:
        "सुरुवातीला ग्रंथालयाचे कामकाज विविध ठिकाणी चालले—चंदुलाल गुल्ला यांच्या इमारतीत आणि नंतर श्री. दलका कुकर यांच्या जागेत. मात्र, वाढत्या वाचकसंख्येमुळे ही जागा अपुरी पडू लागली. १९५८ मध्ये नगरपरिषदेने भाजीमार मंडई बाजार येथील १२७ क्रमांकाचा प्लॉट संस्थेस दिला. या जागेवर वर्गणी आणि देणग्यांमधून बांधकाम उभारण्यासाठी अनेक प्रयत्न झाले. प्रसिद्ध गायिका माणिक वर्मा यांच्या गाण्याच्या कार्यक्रमातूनही निधी उभारण्यात आला. सन १९८६ पासून या नव्या जागेत ग्रंथालय सुरू झाले. महिला, बाल, संदर्भ विभाग आणि वाचनकक्षाची गरज ओळखून संस्थेने आणखी विस्ताराचा निर्णय घेतला. अनेक कायदेशीर आणि स्थानिक अडचणींचा सामना करत, समोपचाराने मार्ग काढून अखेर १९९२ मध्ये समझोता झाला आणि शासनाच्या अनुदानातून एक मोठा हॉल व इतर सुविधा उभारण्यात आल्या.",
      contentEn:
        "Initially operating from rented premises in Chandulal Gulla's building and later in Shri Dalka Kukar's space, rapid readership growth soon overwhelmed the accommodation. In 1958, the Ambajogai Municipal Council allotted Plot No. 127 in the Bhaji Mandai Market area to the institution. Rigorous community fundraising, public subscriptions, and a musical concert by legendary vocalist Manik Varma raised essential building funds. By 1986, operations moved into this permanent premises. Navigating legal and local complexities peacefully, an amicable settlement in 1992 paved the way for a grand central hall and expanded facilities with government assistance.",
      keyHighlights: [
        "१९५८: नगरपरिषदेकडून भाजी मंडईतील प्लॉट क्र. १२७ वाटप",
        "प्रसिद्ध गायिका माणिक वर्मा यांच्या कार्यक्रमातून निधी उभारणी",
        "१९८६: भाजी मंडईतील कायमस्वरूपी जागेत ग्रंथालय स्थलांतर",
        "१९९२: समोपचाराने समझोता व मध्यवर्ती भव्य हॉल उभारणी"
      ],
      image: "/images/real/library_signboard.png",
    },
    {
      id: "modern-building",
      number: 5,
      title: "नवीन वास्तू आणि सध्याची स्थिती",
      titleEn: "New Infrastructure & Contemporary Complex",
      yearRange: "१९९५ – आज",
      content:
        "१९९५ मध्ये राज्याचे तत्कालीन सहकार मंत्री श्री. जयसिंगराव गायकवाड यांच्या सहकार्याने ३ लाखांचा निधी मंजूर झाला, ज्यातून १९९६ मध्ये दोन मजली इमारतीचे बांधकाम पूर्ण झाले. आज, साहित्य निकेतनच्या परिसरात विविध इमारती व विभाग दिमाखात उभे आहेत. जुन्या इमारतीत बाल व महिला विभाग चालविले जातात, तर नवीन दोन मजली इमारतीत मुख्य ग्रंथसंग्रह आणि संदर्भ विभाग आहे. अलीकडेच २०१७-१८ मध्ये इमारतीवर दुसऱ्या मजल्याचे बांधकाम पूर्ण करून तिथे सुसज्ज सभागृह उभारण्यात आले आहे आणि परिसराचे सौंदर्यीकरणही करण्यात आले आहे.",
      contentEn:
        "In 1995, with the active patronage of State Cooperation Minister Shri Jaysingrao Gaikwad, a grant of Rs. 3 Lakhs was sanctioned, completing the robust two-storey structure in 1996. Today, Sahitya Niketan's campus proudly stands with multi-wing facilities: the heritage building hosts Children's and Women's wings, while the two-storey structure houses the primary repository and reference stacks. In 2017-18, the second floor was completed, creating a modern, air-conditioned auditorium alongside comprehensive campus beautification.",
      keyHighlights: [
        "१९९५-९६: सहकार मंत्री जयसिंगराव गायकवाड यांच्या निधीतून दोन मजली इमारत",
        "विभाजन: बाल व महिला विभाग आणि मुख्य संदर्भ दालन",
        "२०१७-१८: दुसऱ्या मजल्यावर सुसज्ज आधुनिक सभागृह",
        "३९,९५३+ मुद्रित ग्रंथ व दुर्मीळ हस्तलिखितांचे जतन"
      ],
      image: "/images/real/library_cupboards.png",
    },
    {
      id: "trustees-governance",
      number: 6,
      title: "संस्था आणि विश्वस्त मंडळ",
      titleEn: "Institution & Board of Trustees",
      yearRange: "नोंदणी १९६२ – वर्तमान",
      content:
        "सोसायटीज रजिस्ट्रेशन ॲक्ट, १८६० अंतर्गत नोंदणीकृत असलेल्या या संस्थेचे (नोंदणी क्रमांक BHR/3/1962) पहिले विश्वस्त श्री. एकनाथ माधवराव कुलकर्णी, श्री. भगवानदासजी सालीग्रामजी लोहिया आणि श्री. चंद्रगुप्त बिहारीलाल गुप्त हे होते. त्यांच्या दूरदृष्टीमुळे संस्थेला भक्कम पाया मिळाला. सध्या डॉ. शरद पांडुरंग हबाकर, श्री. रामचंद्र नरसदासजी संबर आणि श्री. भास्करराव झुंडीरामजी धर्मपाळे हे विश्वस्त म्हणून संस्थेचे कामकाज यशस्वीरीत्या पाहत आहेत.",
      contentEn:
        "Registered under the Societies Registration Act, 1860 (Registration No. BHR/3/1962), the library's foundation was solidified by its inaugural trustees: Shri Eknath Madhavrao Kulkarni, Shri Bhagwandasji Saligramji Lohia, and Shri Chandragupta Biharilal Gupta. Today, the Board of Trustees comprises Dr. Sharad Pandurang Habakar, Shri Ramchandra Narsingdasji Sanbar (Zanwar), and Shri Bhaskarrao Zhundiramji Dharmapale, steering the institution with distinction.",
      keyHighlights: [
        "नोंदणी क्र.: BHR/3/1962 (सोसायटीज रजिस्ट्रेशन ॲक्ट, १८६०)",
        "पहिले विश्वस्त: ए. एम. कुलकर्णी, बी. एस. लोहिया, सी. बी. गुप्त",
        "सध्याचे विश्वस्त: डॉ. शरद हबाकर, रामचंद्र संबर, भास्करराव धर्मपाळे",
        "लोकशाही व पारदर्शक संस्थात्मक व्यवस्थापन"
      ],
      image: "/images/real/library_window.png",
    },
    {
      id: "accreditation-recognition",
      number: 7,
      title: "शासनमान्यता आणि सन्मान",
      titleEn: "Government Recognition & Honors",
      yearRange: "१९६३ – आज",
      content:
        "सन १९६३-६४ मध्ये ग्रंथालयास शासनमान्यता मिळाली आणि तालुका ग्रंथालय म्हणून दर्जा मिळाला. १९६८ मध्ये अंबाजोगाईत जिल्हा ग्रंथालय संघाची स्थापना होण्यातही या संस्थेचा वाटा होता. तेव्हापासून आजतागायत शासनाच्या आणि विविध संस्थांच्या सहकार्याने साहित्य निकेतन आपली ज्ञानदानाची परंपरा अव्याहतपणे जपत आहे.",
      contentEn:
        "In 1963-64, the institution received official Government Recognition with Taluka Library accreditation, subsequently advancing to the highest Grade 'A' status. In 1968, Sahitya Niketan spearheaded the establishment of the District Library Association in Ambajogai. Since then, with unbroken patronage from the government and civil society, Sahitya Niketan perpetuates its monumental tradition of knowledge dissemination.",
      keyHighlights: [
        "१९६३-६४: अधिकृत तालुका ग्रंथालय शासनमान्यता",
        "१९६८: अंबाजोगाईत जिल्हा ग्रंथालय संघाची स्थापना",
        "महाराष्ट्र शासन वर्ग 'अ' सार्वजनिक ग्रंथालय दर्जा",
        "८०+ वर्षांची अव्याहत ज्ञानसेवा"
      ],
      image: "/images/real/library_savarkar_portrait.png",
    },
  ],
};
