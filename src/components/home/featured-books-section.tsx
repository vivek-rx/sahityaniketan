"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Eye, Bookmark, MapPin, Tag, Sparkles, LayoutList, LayoutGrid } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Chip
} from "@heroui/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { Framer3DBook } from "@/components/ui/framer-3d-book";
import RubberSegment from "@/components/ui/RubberSegment";
import { getBooks } from "@/lib/actions/books";

interface HeritageBook {
  id: string;
  title: string;
  titleMarathi: string;
  author: string;
  authorMarathi: string;
  coverImage: string;
  categoryKey: "recent" | "marathi" | "hindi" | "sanskrit" | "heritage";
  languageLabel: string;
  year: string;
  callNumber: string;
  shelf: string;
  publisher: string;
  description: string;
  descriptionMarathi: string;
  isRecent?: boolean;
  isRare?: boolean;
}

const INITIAL_BOOKS: HeritageBook[] = [
  // ── 1. RARE / HERITAGE (दुर्मीळ व प्राचीन ग्रंथ) ──
  {
    id: "b4",
    title: "Vivekasindhu (Ambajogai Manuscript)",
    titleMarathi: "विवेकसिंधू (अंबाजोगाई प्रत)",
    author: "Adikavi Mukundraj",
    authorMarathi: "आद्यकवि मुकुंदराज",
    coverImage: "/images/real/library_vintage_books.png",
    categoryKey: "heritage",
    languageLabel: "मराठी (शके ११८८)",
    year: "११८८",
    callNumber: "891.461 MUK",
    shelf: "कप्पा क्र. १ (दुर्मीळ दालन)",
    publisher: "अंबाजोगाई हस्तलिखित",
    description: "मराठी भाषेतील आद्यग्रंथ. अद्वैत वेदान्ताचे मराठीतील पहिले प्रकटीकरण जे अंबाजोगाई येथे रचले गेले.",
    descriptionMarathi: "मराठी भाषेतील आद्यग्रंथ. अद्वैत वेदान्ताचे मराठीतील पहिले प्रकटीकरण जे अंबाजोगाई येथे रचले गेले.",
    isRare: true,
  },
  {
    id: "b5",
    title: "Dasopant Pasodi va Padasangraha",
    titleMarathi: "दासोपंत पासोडी व पदसंग्रह",
    author: "Sant Dasopant",
    authorMarathi: "संत दासोपंत (अंबाजोगाई)",
    coverImage: "",
    categoryKey: "heritage",
    languageLabel: "मराठी (प्राचीन)",
    year: "१६००",
    callNumber: "891.461 DAS",
    shelf: "कप्पा क्र. १ (दासोपंत दालन)",
    publisher: "साहित्य निकेतन संग्रहालय",
    description: "अंबाजोगाईचे महासंत दासोपंत यांच्या ४० फुटी कापडी पासोडीवरील अध्यात्मिक पदांचे विश्लेषण व दुर्मीळ हस्तलिखित संदर्भ.",
    descriptionMarathi: "अंबाजोगाईचे महासंत दासोपंत यांच्या ४० फुटी कापडी पासोडीवरील अध्यात्मिक पदांचे विश्लेषण व दुर्मीळ हस्तलिखित संदर्भ.",
    isRare: true,
  },
  {
    id: "b2",
    title: "1857 Che Swatantryasamar",
    titleMarathi: "१८५७ चे स्वातंत्र्यसमर",
    author: "Vinayak Damodar Savarkar",
    authorMarathi: "स्वातंत्र्यवीर वि. दा. सावरकर",
    coverImage: "",
    categoryKey: "heritage",
    languageLabel: "मराठी (ऐतिहासिक)",
    year: "१९०९",
    callNumber: "954.03 SAV",
    shelf: "कप्पा क्र. ४ (स्वातंत्र्य दालन)",
    publisher: "साहित्य निकेतन",
    description: "भारताच्या पहिल्या स्वातंत्र्यलढ्याची तेजस्वी गाथा, दुर्मीळ पहिली आवृत्ती संदर्भ.",
    descriptionMarathi: "भारताच्या पहिल्या स्वातंत्र्यलढ्याची तेजस्वी गाथा, दुर्मीळ पहिली आवृत्ती संदर्भ.",
    isRare: true,
  },
  {
    id: "b12",
    title: "Abhijnanasakuntalam",
    titleMarathi: "अभिज्ञानशाकुन्तलम् (हस्तलिखित भाष्य)",
    author: "Mahakavi Kalidasa",
    authorMarathi: "महाकवि कालिदास",
    coverImage: "",
    categoryKey: "sanskrit",
    languageLabel: "संस्कृत / मराठी भाष्य",
    year: "१९२४",
    callNumber: "891.22 KAL",
    shelf: "कप्पा क्र. २ (संस्कृत)",
    publisher: "संस्कृत अभिजात",
    description: "महाकवि कालिदासांचे अमर नाट्यकाव्य, मूळ श्लोक व सविस्तर मराठी भाष्यासह.",
    descriptionMarathi: "महाकवि कालिदासांचे अमर नाट्यकाव्य, मूळ श्लोक व सविस्तर मराठी भाष्यासह.",
    isRare: true,
  },
  {
    id: "b13",
    title: "Rigveda Samhita va Sayan Bhashya",
    titleMarathi: "ऋग्वेद संहिता (सायणभाष्य)",
    author: "Maharshi Vyasa / Sayanacharya",
    authorMarathi: "महर्षि व्यास / सायण भाष्य",
    coverImage: "",
    categoryKey: "sanskrit",
    languageLabel: "संस्कृत (वैदिक)",
    year: "१९३२",
    callNumber: "294.592 VYA",
    shelf: "कप्पा क्र. २ (वैदिक दालन)",
    publisher: "वैदिक संशोधन मंडळ",
    description: "प्राचीनतम वैदिक ऋचा, स्वरचिन्हे व सायणाचार्यांच्या भाष्यासह संदर्भ प्रत.",
    descriptionMarathi: "प्राचीनतम वैदिक ऋचा, स्वरचिन्हे व सायणाचार्यांच्या भाष्यासह संदर्भ प्रत.",
    isRare: true,
  },

  // ── 2. RECENT ARRIVALS (नुकतीच आलेली पुस्तके) ──
  {
    id: "b10",
    title: "Maharashtracha Samagra Itihas va Bhugol",
    titleMarathi: "महाराष्ट्राचा समग्र इतिहास व भूगोल (२०२५)",
    author: "Dr. Sadanand More / Prof. Khatib",
    authorMarathi: "डॉ. सदानंद मोरे / प्रा. के. ए. खतीब",
    coverImage: "",
    categoryKey: "recent",
    languageLabel: "मराठी (नवे आगमन)",
    year: "२०२५",
    callNumber: "351.076 MOR",
    shelf: "कप्पा क्र. १२ (अभ्यासिका)",
    publisher: "अद्ययावत स्पर्धा परीक्षा संदर्भ",
    description: "MPSC राज्यसेवा, गट ब व क स्पर्धा परीक्षांच्या तयारीसाठी वातानुकूलित अभ्यासिकेतील नवीन संदर्भ ग्रंथ.",
    descriptionMarathi: "MPSC राज्यसेवा, गट ब व क स्पर्धा परीक्षांच्या तयारीसाठी वातानुकूलित अभ्यासिकेतील नवीन संदर्भ ग्रंथ.",
    isRecent: true,
  },
  {
    id: "b11",
    title: "Bharatiya Samvidhan va Rajyavyavastha",
    titleMarathi: "भारतीय संविधान व राज्यव्यवस्था (२०२५ अद्ययावत)",
    author: "M. Laxmikanth (Marathi)",
    authorMarathi: "एम. लक्ष्मीकांत (मराठी अनुवाद)",
    coverImage: "",
    categoryKey: "recent",
    languageLabel: "मराठी (नवीन आवृत्ती)",
    year: "२०२५",
    callNumber: "342.54 LAX",
    shelf: "कप्पा क्र. १२ (नवीन आगमन)",
    publisher: "साहित्य निकेतन अभ्यासिका",
    description: "प्रशासकीय परीक्षांच्या विद्यार्थ्यांसाठी संविधानाचा सखोल अद्ययावत अभ्यास ग्रंथ.",
    descriptionMarathi: "प्रशासकीय परीक्षांच्या विद्यार्थ्यांसाठी संविधानाचा सखोल अद्ययावत अभ्यास ग्रंथ.",
    isRecent: true,
  },
  {
    id: "b14",
    title: "Marathwada Muktisangram: Adnyaat Sandarbha",
    titleMarathi: "मराठवाडा मुक्तीसंग्राम: अज्ञात संदर्भ (२०२४)",
    author: "Itihas Sanshodhan Mandal",
    authorMarathi: "इतिहास संशोधन मंडळ",
    coverImage: "",
    categoryKey: "recent",
    languageLabel: "मराठी (नवीन संशोधन)",
    year: "२०२४",
    callNumber: "954.79 MUK",
    shelf: "कप्पा क्र. ४ (इतिहास)",
    publisher: "मराठवाडा संशोधन",
    description: "स्वामी रामानंद तीर्थ आणि मराठवाडा मुक्ती लढ्यातील गुप्त कागदपत्रांचे अद्ययावत संकलन.",
    descriptionMarathi: "स्वामी रामानंद तीर्थ आणि मराठवाडा मुक्ती लढ्यातील गुप्त कागदपत्रांचे अद्ययावत संकलन.",
    isRecent: true,
  },
  {
    id: "b15",
    title: "Adhunik Bharatacha Itihas",
    titleMarathi: "आधुनिक भारताचा इतिहास व समाजसुधारक (२०२४)",
    author: "Prof. Bipin Chandra (Marathi)",
    authorMarathi: "प्रा. बिपिन चंद्र (मराठी आवृत्ती)",
    coverImage: "",
    categoryKey: "recent",
    languageLabel: "मराठी (नवीन)",
    year: "२०२४",
    callNumber: "954.04 CHA",
    shelf: "कप्पा क्र. १२ (अभ्यासिका)",
    publisher: "साहित्य निकेतन अभ्यासिका",
    description: "स्पर्धा परीक्षा व आधुनिक भारताच्या सामाजिक-राजकीय घडामोडींचा सखोल इतिहास.",
    descriptionMarathi: "स्पर्धा परीक्षा व आधुनिक भारताच्या सामाजिक-राजकीय घडामोडींचा सखोल इतिहास.",
    isRecent: true,
  },
  {
    id: "b16",
    title: "Vidnyan ani Manavi Pragati",
    titleMarathi: "विज्ञान आणि मानवी प्रगती (२०२४)",
    author: "Dr. Jayant Narlikar",
    authorMarathi: "डॉ. जयंत नारळीकर",
    coverImage: "",
    categoryKey: "recent",
    languageLabel: "मराठी (विज्ञान)",
    year: "२०२४",
    callNumber: "500 NAR",
    shelf: "कप्पा क्र. ८ (विज्ञान दालन)",
    publisher: "राजहंस प्रकाशन",
    description: "खगोलशास्त्र, आधुनिक संशोधन आणि वैज्ञानिक दृष्टिकोनाचा प्रवास उलगडणारा ग्रंथ.",
    descriptionMarathi: "खगोलशास्त्र, आधुनिक संशोधन आणि वैज्ञानिक दृष्टिकोनाचा प्रवास उलगडणारा ग्रंथ.",
    isRecent: true,
  },

  // ── 3. MARATHI CLASSICS (मराठी अभिजात) ──
  {
    id: "b7",
    title: "Swami",
    titleMarathi: "स्वामी (अभिजात कादंबरी)",
    author: "Ranjit Desai",
    authorMarathi: "रणजित देसाई",
    coverImage: "",
    categoryKey: "marathi",
    languageLabel: "मराठी",
    year: "१९६२",
    callNumber: "891.463 DES",
    shelf: "कप्पा क्र. ६ (कादंबरी)",
    publisher: "साहित्य अकादमी पुरस्कार",
    description: "थोरले माधवराव पेशवे आणि रमाबाई यांच्या उदात्त जीवनावरील अजरामर मराठी कादंबरी.",
    descriptionMarathi: "थोरले माधवराव पेशवे आणि रमाबाई यांच्या उदात्त जीवनावरील अजरामर मराठी कादंबरी.",
    isRare: false,
  },
  {
    id: "b8",
    title: "Yayati",
    titleMarathi: "ययाति (ज्ञानपीठ पुरस्कार)",
    author: "V. S. Khandekar",
    authorMarathi: "वि. स. खांडेकर",
    coverImage: "",
    categoryKey: "marathi",
    languageLabel: "मराठी",
    year: "१९५९",
    callNumber: "891.463 KHA",
    shelf: "कप्पा क्र. ६ (ज्ञानपीठ)",
    publisher: "ज्ञानपीठ पुरस्कार",
    description: "मराठीतील पहिल्या ज्ञानपीठ पुरस्कार प्राप्त कादंबरी. भोग आणि त्याग यातील सनातन संघर्षाचे तत्त्वचिंतन.",
    descriptionMarathi: "मराठीतील पहिल्या ज्ञानपीठ पुरस्कार प्राप्त कादंबरी. भोग आणि त्याग यातील सनातन संघर्षाचे तत्त्वचिंतन.",
    isRare: false,
  },
  {
    id: "b17",
    title: "Mrityunjay",
    titleMarathi: "मृत्युंजय (अभिजात महाकादंबरी)",
    author: "Shivaji Sawant",
    authorMarathi: "शिवाजी सावंत",
    coverImage: "",
    categoryKey: "marathi",
    languageLabel: "मराठी",
    year: "१९६७",
    callNumber: "891.463 SAW",
    shelf: "कप्पा क्र. ६ (कादंबरी)",
    publisher: "कॉनटिनेन्टल प्रकाशन",
    description: "महाभारतातील महानायक कर्ण याच्या अंतर्मनाचा आणि अद्वितीय दातृत्वाचा कालजयी आविष्कार.",
    descriptionMarathi: "महाभारतातील महानायक कर्ण याच्या अंतर्मनाचा आणि अद्वितीय दातृत्वाचा कालजयी आविष्कार.",
    isRare: false,
  },
  {
    id: "b18",
    title: "Shyamchi Aai",
    titleMarathi: "श्यामची आई",
    author: "Sane Guruji",
    authorMarathi: "साने गुरुजी",
    coverImage: "",
    categoryKey: "marathi",
    languageLabel: "मराठी",
    year: "१९५३",
    callNumber: "891.463 SAN",
    shelf: "कप्पा क्र. ५ (संस्कार साहित्य)",
    publisher: "साधना प्रकाशन",
    description: "मातृप्रेमाचे अथांग आणि पवित्र महाकाव्य, ज्याने महाराष्ट्राच्या पिढ्यान्पिढ्यांना घडवले.",
    descriptionMarathi: "मातृप्रेमाचे अथांग आणि पवित्र महाकाव्य, ज्याने महाराष्ट्राच्या पिढ्यान्पिढ्यांना घडवले.",
    isRare: false,
  },
  {
    id: "b19",
    title: "Batatyachi Chaal",
    titleMarathi: "बटाट्याची चाळ",
    author: "P. L. Deshpande",
    authorMarathi: "पु. ल. देशपांडे",
    coverImage: "",
    categoryKey: "marathi",
    languageLabel: "मराठी",
    year: "१९५८",
    callNumber: "891.467 DES",
    shelf: "कप्पा क्र. ७ (विनोद साहित्य)",
    publisher: "मौजे प्रकाशन",
    description: "महाराष्ट्राचे लाडके व्यक्तिमत्त्व पु. ल. देशपांडे यांची मध्यमवर्गीय जीवनावरील विलोभनीय विनोदी कलाकृती.",
    descriptionMarathi: "महाराष्ट्राचे लाडके व्यक्तिमत्त्व पु. ल. देशपांडे यांची मध्यमवर्गीय जीवनावरील विलोभनीय विनोदी कलाकृती.",
    isRare: false,
  },

  // ── 4. HISTORICAL & MODI (ऐतिहासिक व मोडी) ──
  {
    id: "b20",
    title: "Modi Lipi Prathmik va Pragati Vachanmala",
    titleMarathi: "मोडी लिपी प्राथमिक व प्रगत वाचनमाला",
    author: "Bharat Itihas Sanshodhak Mandal",
    authorMarathi: "भारत इतिहास संशोधक मंडळ",
    coverImage: "",
    categoryKey: "heritage",
    languageLabel: "मोडी लिपी संदर्भ",
    year: "१९३८",
    callNumber: "491.461 MOD",
    shelf: "कप्पा क्र. ३ (मोडी दालन)",
    publisher: "इतिहास संशोधक मंडळ",
    description: "मराठी राजवटीच्या ऐतिहासिक मोडी कागदपत्रांचे वाचन व लिप्यंतर करण्यासाठी प्रामाणिक संदर्भ ग्रंथ.",
    descriptionMarathi: "मराठी राजवटीच्या ऐतिहासिक मोडी कागदपत्रांचे वाचन व लिप्यंतर करण्यासाठी प्रामाणिक संदर्भ ग्रंथ.",
    isRare: true,
  },
  {
    id: "b21",
    title: "Shivkalin Patrasar Sangraha",
    titleMarathi: "शिवकालीन पत्रसार संग्रह (दुर्मीळ खंड)",
    author: "Itihas Sanshodhan Mandal",
    authorMarathi: "इतिहास संशोधन मंडळ",
    coverImage: "",
    categoryKey: "heritage",
    languageLabel: "मराठी (शिवकालीन)",
    year: "१९३०",
    callNumber: "954.791 SHI",
    shelf: "कप्पा क्र. ३ (शिवकालीन)",
    publisher: "पुणे विद्यापीठ संदर्भ",
    description: "छत्रपती शिवाजी महाराजांच्या काळातील अस्सल आज्ञापत्रे, सनदा आणि पत्रव्यवहारांचे दुर्मीळ संकलन.",
    descriptionMarathi: "छत्रपती शिवाजी महाराजांच्या काळातील अस्सल आज्ञापत्रे, सनदा आणि पत्रव्यवहारांचे दुर्मीळ संकलन.",
    isRare: true,
  },
  {
    id: "b22",
    title: "Peshwe Daftar Nivadak Kagadpatre",
    titleMarathi: "पेशवे दफ्तर निवडक कागदपत्रे",
    author: "G. S. Sardesai",
    authorMarathi: "रियासतकार गो. स. सरदेसाई",
    coverImage: "",
    categoryKey: "heritage",
    languageLabel: "मराठी (ऐतिहासिक)",
    year: "१९३३",
    callNumber: "954.792 SAR",
    shelf: "कप्पा क्र. ३ (पेशवे दफ्तर)",
    publisher: "बॉम्बे गव्हर्नमेंट प्रेस",
    description: "मराठा साम्राज्याच्या राजकारणाचे आणि सैनिकी मोहिमांचे मूळ कागदपत्र व विश्लेषण.",
    descriptionMarathi: "मराठा साम्राज्याच्या राजकारणाचे आणि सैनिकी मोहिमांचे मूळ कागदपत्र व विश्लेषण.",
    isRare: true,
  },

  // ── 5. SANSKRIT CLASSICS (संस्कृत काव्य) ──
  {
    id: "b23",
    title: "Shrimad Bhagavad Gita (Shankar Bhashya)",
    titleMarathi: "श्रीमद्भगवद्गीता (शांकरभाष्य व मराठी अर्थ)",
    author: "Adi Shankaracharya",
    authorMarathi: "आद्य शंकराचार्य",
    coverImage: "",
    categoryKey: "sanskrit",
    languageLabel: "संस्कृत / मराठी",
    year: "१९३६",
    callNumber: "294.5924 SHA",
    shelf: "कप्पा क्र. २ (वेदान्त)",
    publisher: "गीताप्रेस / साहित्य निकेतन",
    description: "भगवद्गीतेचे आद्य शंकराचार्यकृत अद्वैत शांकरभाष्य व विद्वानांनी केलेले सविस्तर मराठी विवेचन.",
    descriptionMarathi: "भगवद्गीतेचे आद्य शंकराचार्यकृत अद्वैत शांकरभाष्य व विद्वानांनी केलेले सविस्तर मराठी विवेचन.",
    isRare: true,
  },
  {
    id: "b24",
    title: "Meghadutam",
    titleMarathi: "मेघदूतम् (समश्लोकी मराठी)",
    author: "Mahakavi Kalidasa",
    authorMarathi: "महाकवि कालिदास",
    coverImage: "",
    categoryKey: "sanskrit",
    languageLabel: "संस्कृत / मराठी",
    year: "१९२८",
    callNumber: "891.21 KAL",
    shelf: "कप्पा क्र. २ (संस्कृत)",
    publisher: "निर्णयसागर प्रेस",
    description: "कालिदासांचे अजरामर खंडकाव्य, मंदाक्रांता वृत्तातील मूळ श्लोक व भावस्पर्शी मराठी समश्लोकी भाषांतर.",
    descriptionMarathi: "कालिदासांचे अजरामर खंडकाव्य, मूळ श्लोक व भावस्पर्शी मराठी समश्लोकी भाषांतर.",
    isRare: true,
  },
  {
    id: "b25",
    title: "Dashopanishad Sangraha",
    titleMarathi: "दशोपनिषद् संग्रह",
    author: "Vaidik Sanshodhan Mandal",
    authorMarathi: "वैदिक संशोधन मंडळ",
    coverImage: "",
    categoryKey: "sanskrit",
    languageLabel: "संस्कृत",
    year: "१९४०",
    callNumber: "294.5921 UPA",
    shelf: "कप्पा क्र. २ (उपनिषदे)",
    publisher: "पुणे वैदिक संशोधन",
    description: "ईश, केन, कठ, मुंडक, मांडूक्य आदी १० प्रमुख उपनिषदांचे मूळ श्लोक व अन्वय.",
    descriptionMarathi: "ईश, केन, कठ, मुंडक, मांडूक्य आदी १० प्रमुख उपनिषदांचे मूळ श्लोक व अन्वय.",
    isRare: true,
  },
  {
    id: "b26",
    title: "Chanakya Niti Darpana",
    titleMarathi: "चाणक्य नीतिदर्पण",
    author: "Acharya Chanakya",
    authorMarathi: "आचार्य चाणक्य",
    coverImage: "",
    categoryKey: "sanskrit",
    languageLabel: "संस्कृत / मराठी",
    year: "१९३५",
    callNumber: "181.4 CHA",
    shelf: "कप्पा क्र. २ (नीतिशास्त्र)",
    publisher: "प्राच्य विद्या मंदिर",
    description: "राजनीती, समाजशास्त्र आणि व्यवहाराची सनातन चाणक्य सूत्रे मूळ संस्कृत व मराठी अनुवादात.",
    descriptionMarathi: "राजनीती, समाजशास्त्र आणि व्यवहाराची सनातन चाणक्य सूत्रे मूळ संस्कृत व मराठी अनुवादात.",
    isRare: true,
  },

  // ── 6. HINDI CLASSICS (हिन्दी साहित्य) ──
  {
    id: "b27",
    title: "Godan",
    titleMarathi: "गोदान (अमर उपन्यास)",
    author: "Munshi Premchand",
    authorMarathi: "मुंशी प्रेमचंद",
    coverImage: "",
    categoryKey: "hindi",
    languageLabel: "हिन्दी",
    year: "१९३६",
    callNumber: "891.433 PRE",
    shelf: "कप्पा क्र. ९ (हिन्दी)",
    publisher: "सरस्वती प्रेस",
    description: "भारतीय ग्रामीण जीवन, शेतकरी संघर्ष आणि मानवी मूल्यांचा महाकाव्यात्मक हिन्दी उपन्यास.",
    descriptionMarathi: "भारतीय ग्रामीण जीवन, शेतकरी संघर्ष आणि मानवी मूल्यांचा महाकाव्यात्मक हिन्दी उपन्यास.",
    isRare: false,
  },
  {
    id: "b28",
    title: "Kamayani",
    titleMarathi: "कामायनी (छायावादी महाकाव्य)",
    author: "Jaishankar Prasad",
    authorMarathi: "जयशंकर प्रसाद",
    coverImage: "",
    categoryKey: "hindi",
    languageLabel: "हिन्दी",
    year: "१९३६",
    callNumber: "891.431 PRA",
    shelf: "कप्पा क्र. ९ (हिन्दी काव्य)",
    publisher: "भारती भंडार",
    description: "मानवी मन, श्रद्धा आणि बुद्धी यांच्या समन्वयाचे हिन्दी साहित्यातील सर्वोच्च महाकाव्य.",
    descriptionMarathi: "मानवी मन, श्रद्धा आणि बुद्धी यांच्या समन्वयाचे हिन्दी साहित्यातील सर्वोच्च महाकाव्य.",
    isRare: false,
  },
  {
    id: "b29",
    title: "Rashmirathi",
    titleMarathi: "रश्मिरथी (कर्ण चरित)",
    author: "Ramdhari Singh 'Dinkar'",
    authorMarathi: "रामधारी सिंह 'दिनकर'",
    coverImage: "",
    categoryKey: "hindi",
    languageLabel: "हिन्दी",
    year: "१९५२",
    callNumber: "891.431 DIN",
    shelf: "कप्पा क्र. ९ (हिन्दी)",
    publisher: "उदयचल प्रकाशन",
    description: "महाभारत के महादानी कर्ण के शौर्य, स्वाभिमान और त्याग पर आधारित ओजस्वी खण्डकाव्य.",
    descriptionMarathi: "महाभारतातील कर्ण याच्या शौर्य आणि त्यागावर आधारित ओजस्वी खंडकाव्य.",
    isRare: false,
  },
  {
    id: "b30",
    title: "Madhushala",
    titleMarathi: "मधुशाला",
    author: "Harivansh Rai Bachchan",
    authorMarathi: "हरिवंशराय बच्चन",
    coverImage: "",
    categoryKey: "hindi",
    languageLabel: "हिन्दी",
    year: "१९३५",
    callNumber: "891.431 BAC",
    shelf: "कप्पा क्र. ९ (हिन्दी)",
    publisher: "राजपाल एंड संस",
    description: "जीवन, प्रेम आणि मृत्यूचे गूढ तत्त्वज्ञान मांडणाऱ्या रुबाईयांचा अजरामर संग्रह.",
    descriptionMarathi: "जीवन, प्रेम आणि मृत्यूचे गूढ तत्त्वज्ञान मांडणाऱ्या रुबायांचा अजरामर संग्रह.",
    isRare: false,
  },
  {
    id: "b31",
    title: "Rag Darbari",
    titleMarathi: "राग दरबारी",
    author: "Shrilal Shukla",
    authorMarathi: "श्रीलाल शुक्ल",
    coverImage: "",
    categoryKey: "hindi",
    languageLabel: "हिन्दी",
    year: "१९६८",
    callNumber: "891.433 SHU",
    shelf: "कप्पा क्र. ९ (हिन्दी)",
    publisher: "साहित्य अकादमी",
    description: "स्वातंत्र्योत्तर भारतातील ग्रामीण समाज, व्यवस्था आणि राजकीय विद्रूपतेवर अचूक उपरोधिक भाष्य.",
    descriptionMarathi: "स्वातंत्र्योत्तर व्यवस्थेवर अचूक उपरोधिक भाष्य करणारा साहित्य अकादमी विजेता उपन्यास.",
    isRare: false,
  },
];

export function FeaturedBooksSection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedManuscriptId, setSelectedManuscriptId] = useState<string>("b4");
  const [booksList, setBooksList] = useState<HeritageBook[]>(INITIAL_BOOKS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function fetchDynamicBooks() {
      try {
        // Fast, lightweight fetch limited to 10 items to prevent server choke and ensure blazing fast load
        const res = await fetch("/api/books?limit=10");
        if (res.ok) {
          const data = await res.json();
          const sourceList = data.books || [];

          if (sourceList.length > 0) {
            const mapped: HeritageBook[] = sourceList.map((b: any, idx: number) => {
              const lang = (b.language || "").toLowerCase();
              let catKey: "recent" | "marathi" | "hindi" | "sanskrit" | "heritage" = "marathi";
              const pubYear = parseInt(b.publication_year || b.year || "0", 10);
              const isRecentBook = pubYear >= 2020 || idx < 4 || b.category?.includes("नवे") || b.category?.includes("अभ्यासिका");
              const isRareBook = b.is_featured || pubYear < 1975 || b.category?.includes("इतिहास") || b.category?.includes("संतसाहित्य") || b.category?.includes("संशोधन");

              if (lang.includes("hindi") || lang.includes("हिन्दी") || lang === "hi") catKey = "hindi";
              else if (lang.includes("sanskrit") || lang.includes("संस्कृत") || lang === "sa" || b.category?.includes("संस्कृत")) catKey = "sanskrit";
              else if (isRareBook) catKey = "heritage";
              else if (isRecentBook) catKey = "recent";

              return {
                id: b.id || `book-${idx}`,
                title: b.title,
                titleMarathi: b.title_marathi || b.titleMarathi || b.title,
                author: b.author,
                authorMarathi: b.author_marathi || b.authorMarathi || b.author,
                coverImage: b.cover_url || b.coverImage || "",
                categoryKey: catKey,
                languageLabel: b.language === "hi" ? "हिन्दी" : b.language === "sa" ? "संस्कृत" : "मराठी",
                year: b.publication_year ? String(b.publication_year) : b.year ? String(b.year) : "—",
                callNumber: b.isbn || b.callNumber || "891.463",
                shelf: b.shelf_number ? `कप्पा क्र. ${b.shelf_number}` : b.shelf || "मुख्य वाचन कक्ष",
                publisher: b.publisher || b.category || "साहित्य निकेतन ग्रंथालय",
                description: b.description || (b.title + " by " + b.author),
                descriptionMarathi: b.descriptionMarathi || b.description || `${b.title} — लेखक: ${b.author} (${b.category || "ग्रंथालय संग्रह"})`,
                isRecent: isRecentBook,
                isRare: isRareBook,
              };
            });
            // Merge dynamically loaded books gracefully without overriding our curated core
            setBooksList((prev) => {
              const existingIds = new Set(prev.map((item) => item.id));
              const fresh = mapped.filter((item) => !existingIds.has(item.id));
              return [...prev, ...fresh];
            });
          }
        }
      } catch (err) {
        // Fallback silently to curated library collection
      } finally {
        setIsLoading(false);
      }
    }
    fetchDynamicBooks();
  }, []);

  const tabs = [
    { id: "all", label: language === "mr" ? "सर्व" : language === "hi" ? "सभी" : "All" },
    { id: "marathi", label: language === "mr" ? "कादंबरी" : language === "hi" ? "उपन्यास" : "Novels" },
    { id: "rare", label: language === "mr" ? "इतिहास" : language === "hi" ? "इतिहास" : "History" },
    { id: "heritage", label: language === "mr" ? "संतसाहित्य" : language === "hi" ? "संत साहित्य" : "Saints" },
    { id: "recent", label: language === "mr" ? "संशोधन" : language === "hi" ? "अनुसंधान" : "Research" },
    { id: "sanskrit", label: language === "mr" ? "कविता" : language === "hi" ? "कविता" : "Poetry" },
    { id: "hindi", label: language === "mr" ? "चरित्रे" : language === "hi" ? "जीवनी" : "Biographies" },
  ];

  const getCatalogueUrlForTab = (tabId: string) => {
    switch (tabId) {
      case "marathi":
        return "/catalogue?category=कादंबरी";
      case "rare":
        return "/catalogue?category=इतिहास";
      case "recent":
        return "/catalogue?category=संशोधन";
      case "heritage":
        return "/catalogue?category=संतसाहित्य";
      case "sanskrit":
        return "/catalogue?category=कविता";
      case "hindi":
        return "/catalogue?category=चरित्रे";
      default:
        return "/catalogue";
    }
  };

  const targetCatalogueUrl = getCatalogueUrlForTab(activeTab);

  const rareManuscripts = booksList
    .filter((b) => b.isRare || b.categoryKey === "heritage" || b.categoryKey === "sanskrit")
    .slice(0, 5);

  const activeManuscript =
    rareManuscripts.find((m) => m.id === selectedManuscriptId) ||
    rareManuscripts[0] ||
    INITIAL_BOOKS[0];

  const filteredBooks = booksList.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "rare") return b.isRare || b.categoryKey === "heritage" || b.categoryKey === "sanskrit";
    if (activeTab === "recent") return b.isRecent || b.categoryKey === "recent";
    return b.categoryKey === activeTab;
  });

  // Strict 5-book limit per category to guarantee instant loading, fast animations and zero server choke
  const displayedBooks = filteredBooks.slice(0, 5);

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 font-marathi-body transition-colors">
      <div className="section">
        {/* Section Header: Pure Headings, NO Eyebrow Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
              {language === "mr" ? "दुर्मीळ व नुकतीच आलेली ग्रंथसंपदा" : language === "hi" ? "दुर्लभ एवं नवीनतम ग्रन्थ संग्रह" : "Rare Books & Recent Arrivals"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-marathi-body mt-1 font-medium">
              {language === "mr"
                ? "साहित्य निकेतनच्या खजिन्यातील दुर्मीळ हस्तलिखिते, ऐतिहासिक दस्तऐवज व नवीन संदर्भ ग्रंथ."
                : language === "hi"
                ? "साहित्य निकेतन के दुर्लभ ग्रन्थ, ऐतिहासिक पाण्डुलिपियां एवं नवीनतम संदर्भ ग्रन्थ।"
                : "Explore rare 12th-century manuscripts, historical archives, and recent additions."}
            </p>
          </div>

          <Link href={targetCatalogueUrl} className="shrink-0">
            <Button
              variant="outline"
              className="rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-5 py-2 text-xs font-bold transition-all font-marathi-body shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t.viewAllCatalogue}</span>
            </Button>
          </Link>
        </div>

        {/* Category Tabs & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-6 border-b border-zinc-200 dark:border-zinc-800 font-marathi-body">
          <div className="overflow-x-auto no-scrollbar py-1">
            <RubberSegment
              items={tabs.map((tab) => ({ value: tab.id, label: tab.label }))}
              value={activeTab}
              onChange={(val) => setActiveTab(val as any)}
              trackColor="#f4f4f5"
              thumbColor="#18181b"
              textColor="#71717a"
              activeTextColor="#ffffff"
              size="md"
              radius={9999}
              inset={3}
              equalSlots={false}
              stretch={70}
              squash={2.5}
              speed={1.1}
              glide={50}
              draggable={true}
              className="border border-zinc-200 dark:border-zinc-800 shadow-xs"
              aria-label="ग्रंथ विभाग निवड (Select Book Category)"
            />
          </div>

          {/* View Format Switcher */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                viewMode === "grid"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
              title={language === "en" ? "3D Book Showcase" : "३D उघडणारे पुस्तक दालन"}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>{language === "en" ? "3D Showcase" : language === "hi" ? "३D दीर्घा" : "३D दालन"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                viewMode === "list"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
              title={language === "en" ? "List View" : "सूची स्वरूप"}
            >
              <LayoutList className="h-3.5 w-3.5" />
              <span>{language === "en" ? "List" : language === "hi" ? "सूची" : "सूची"}</span>
            </button>
          </div>
        </div>

        {/* If viewing Rare Books / Heritage Manuscripts, break the card grid entirely into an asymmetric archival layout */}
        {activeTab === "rare" || activeTab === "heritage" ? (
          /* ========================================================
             ASYMMETRIC FULL-BLEED ARCHIVAL MANUSCRIPT LAYOUT
             Broke the card grid specifically for rare manuscripts!
             ======================================================== */
          <div className="w-full my-4 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-8 lg:p-10 shadow-sm transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* ── LEFT: SPOTLIGHT HERO MANUSCRIPT ARCHIVAL PLATE (7 COLS) ── */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  {/* Image Plate */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-sm group">
                    <Image
                      src={activeManuscript.coverImage || "/images/real/library_vintage_books.png"}
                      alt={activeManuscript.titleMarathi}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="font-marathi-body text-[11px] font-semibold text-zinc-100 bg-zinc-900/80 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
                        {activeManuscript.shelf}
                      </span>
                      <span className="font-marathi-heading text-xs font-semibold text-zinc-100 bg-zinc-900/80 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
                        {activeManuscript.year} (शके कालखंड)
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-marathi-heading text-xs sm:text-sm text-zinc-300 font-semibold tracking-wider">
                        {activeManuscript.authorMarathi}
                      </p>
                      <h3 className="font-marathi-heading text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-white mt-0.5">
                        {activeManuscript.titleMarathi}
                      </h3>
                    </div>
                  </div>

                  {/* Manuscript Narrative Excerpt */}
                  <div className="mt-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2.5">
                    <blockquote className="font-marathi-heading text-sm sm:text-base font-semibold italic text-zinc-900 dark:text-zinc-100 border-l-2 border-zinc-400 dark:border-zinc-500 pl-3.5">
                      {activeManuscript.id === "b4"
                        ? "« ब्रह्मानंद तोचि निजानंदू । जो प्रकटला विवेकसिंधू ॥ — आद्य मराठी तत्त्वज्ञान ग्रंथ (शके ११८८, अंबाजोगाई प्रत)"
                        : activeManuscript.id === "b5"
                        ? "« सव्वा लक्ष पदांची निर्मिती आणि ४० फुटी कापडी वस्त्र-पासोडीवरील अध्यात्मिक निरूपण » — संत दासोपंत (अंबाजोगाई)"
                        : activeManuscript.id === "b2"
                        ? "« भारताच्या पहिल्या स्वातंत्र्यसमराचा जप्त झालेला पहिला अस्सल इतिहास » — स्वा. वि. दा. सावरकर"
                        : "« अभिजात ज्ञानसंस्कृतीचा जिताजागता ऐतिहासिक दस्तऐवज »"}
                    </blockquote>

                    <p className="font-marathi-body text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {activeManuscript.descriptionMarathi}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/catalogue/${activeManuscript.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95"
                  >
                    <Eye className="w-4 h-4" />
                    <span>ग्रंथसूची संदर्भ नोंद पहा</span>
                  </Link>

                  <Link
                    href="/membership"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm font-semibold transition-all"
                  >
                    <span>संशोधक वाचन विनंती</span>
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: ASYMMETRIC MANUSCRIPT REGISTER LEDGER (5 COLS) ── */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 mb-3">
                    <h4 className="font-marathi-heading text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      दुर्मीळ हस्तलिखित नोंदवही
                    </h4>
                    <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      ५ संकलित दस्तऐवज
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {rareManuscripts.map((item, idx) => {
                      const isSelected = item.id === activeManuscript.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedManuscriptId(item.id)}
                          className={cn(
                            "p-3.5 rounded-xl transition-all cursor-pointer border text-left",
                            isSelected
                              ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 shadow-xs"
                              : "bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800"
                          )}
                        >
                          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mb-0.5">
                            <span>नोंद ०{idx + 1}</span>
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.year}</span>
                          </div>

                          <h5 className="font-marathi-heading text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                            {item.titleMarathi}
                          </h5>

                          <p className="font-marathi-body text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                            {item.authorMarathi}
                          </p>

                          <p className="font-marathi-body text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-1">
                            {item.descriptionMarathi}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href="/catalogue?category=इतिहास"
                  className="mt-4 inline-flex items-center justify-between w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:underline"
                >
                  <span>सर्व ४५०+ दुर्मीळ हस्तलिखिते व मोडी दस्तऐवज पहा</span>
                </Link>
              </div>

            </div>
          </div>
        ) : viewMode === "list" ? (
          /* ========================================================
             LIST FORMAT — Clean Horizontal Heritage Cards with 3D Opening Books
             ======================================================== */
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayedBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
                >
                  {/* Left: 3D Book Cover with Opening Animation on Hover */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                    <div className="shrink-0 flex items-center justify-center">
                      <Framer3DBook
                        title={language === "en" ? book.title : book.titleMarathi}
                        author={language === "en" ? book.author : book.authorMarathi}
                        coverImage={book.coverImage}
                        category={book.categoryKey}
                        width={105}
                        height={155}
                      />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <Chip
                          variant="secondary"
                          size="sm"
                          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-[10.5px] border border-zinc-200 dark:border-zinc-700"
                        >
                          {book.languageLabel}
                        </Chip>
                        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                          {book.shelf}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {book.year}
                        </span>
                      </div>

                      <h3 className="font-marathi-heading text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        <Link href={`/catalogue/${book.id}`}>
                          {language === "en" ? book.title : book.titleMarathi}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 font-marathi-body">
                        {language === "en" ? book.author : book.authorMarathi}
                      </p>

                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-marathi-body font-normal">
                        {language === "en" ? book.description : book.descriptionMarathi}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="w-full md:w-44 shrink-0 flex flex-col sm:flex-row md:flex-col gap-2 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 md:pl-5">
                    <Link
                      href={`/catalogue/${book.id}`}
                      className="w-full"
                    >
                      <Button
                        variant="primary"
                        className="w-full rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 py-2 px-3 text-center text-xs font-semibold transition-all flex items-center justify-center gap-2 font-marathi-body shadow-xs border border-transparent cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>{t.readOnlineBtn}</span>
                      </Button>
                    </Link>

                    <Link
                      href={targetCatalogueUrl}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 py-2 px-3 text-xs font-semibold transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Bookmark className="h-3.5 w-3.5 text-zinc-400" />
                        <span>ग्रंथालयात शोधा</span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* List Format View More in Books Tab */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>
                  {language === "mr"
                    ? "५ निवडक ग्रंथ दाखवले आहेत. उर्वरित ३९,९४८+ ग्रंथ मुख्य ग्रंथसूची दालनात उपलब्ध आहेत."
                    : language === "hi"
                    ? "५ चयनित ग्रन्थ प्रदर्शित हैं। शेष ३९,९४८+ ग्रन्थ मुख्य ग्रन्थ सूची में उपलब्ध हैं।"
                    : "Showing 5 curated books. 39,948+ more available in Books Catalogue."}
                </span>
              </div>
              <Link href={targetCatalogueUrl}>
                <Button
                  variant="primary"
                  className="rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 px-5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer font-marathi-body"
                >
                  <span>{language === "mr" ? "आणखी ग्रंथ पहा (ग्रंथ सूची)" : language === "hi" ? "और ग्रन्थ देखें (ग्रन्थ सूची)" : "View More in Books Tab"}</span>
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* ========================================================
             GRID FORMAT — 5 3D Interactive Cards + 6th "View More" Card
             ======================================================== */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayedBooks.map((book) => (
                <motion.div
                  layout
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs hover:shadow-lg transition-all duration-300 rounded-2xl group">
                    <div>
                      {/* 3D Interactive Book Cover Area */}
                      <div className="flex justify-center mb-4 py-2">
                        <Framer3DBook
                          title={language === "en" ? book.title : book.titleMarathi}
                          author={language === "en" ? book.author : book.authorMarathi}
                          coverImage={book.coverImage}
                          category={book.categoryKey}
                          width={180}
                          height={270}
                        />
                      </div>

                      {/* Metadata & Title */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono font-semibold">
                          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                            {book.shelf}
                          </span>
                          <span>{book.year}</span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <Chip
                            variant="secondary"
                            size="sm"
                            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-[11px] border border-zinc-200 dark:border-zinc-700"
                          >
                            {book.languageLabel}
                          </Chip>
                          <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                            {book.shelf}
                          </span>
                        </div>

                        <CardTitle className="font-marathi-heading text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors pt-1">
                          {language === "en" ? book.title : book.titleMarathi}
                        </CardTitle>

                        <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 font-marathi-body">
                          {language === "en" ? book.author : book.authorMarathi}
                        </p>

                        <CardDescription className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-marathi-body font-normal pt-1">
                          {language === "en" ? book.description : book.descriptionMarathi}
                        </CardDescription>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <CardFooter className="p-0 pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                      <Link
                        href={`/catalogue/${book.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="primary"
                          className="w-full rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 py-2.5 text-center text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 font-marathi-body shadow-xs border border-transparent cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          <span>{t.readOnlineBtn}</span>
                        </Button>
                      </Link>

                      <Link href={targetCatalogueUrl}>
                        <Button
                          variant="outline"
                          isIconOnly
                          className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 p-2.5 transition-colors shadow-2xs cursor-pointer"
                          aria-label="ग्रंथालयात संदर्भ पहा"
                        >
                          <Bookmark className="h-4 w-4 text-zinc-400" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}

              {/* 6th Slot in Grid: Dedicated "View More in Books Tab" Card */}
              <motion.div
                layout
                key="view-more-card"
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="h-full relative overflow-hidden flex flex-col justify-between p-6 bg-zinc-950 text-white border border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl group text-center items-center">
                  {/* Real Marathi Books Archival Background */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <Image
                      src="/images/real/marathi_books_display.png"
                      alt="Marathi Classic Books Collection"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center opacity-35 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/90" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-auto space-y-4 py-6">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-zinc-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{language === "mr" ? "३९,९५३+ ग्रंथ संग्रह" : language === "hi" ? "३९,९५३+ ग्रन्थ संग्रह" : "39,953+ Total Volumes"}</span>
                      </div>

                      <h3 className="font-marathi-heading text-xl font-bold text-white leading-tight group-hover:text-amber-200 transition-colors">
                        {language === "mr" ? "आणखी ग्रंथ हवे आहेत?" : language === "hi" ? "और पुस्तकें देखना चाहते हैं?" : "Explore Full Catalogue"}
                      </h3>

                      <p className="text-xs text-zinc-300 font-normal leading-relaxed max-w-[26ch] mx-auto font-marathi-body">
                        {language === "mr"
                          ? "मुख्य ग्रंथसूची दालनात संपूर्ण पृष्ठवार (Pagination) मांडणी, विषय वर्गीकरण व कप्पा शोध उपलब्ध आहे."
                          : language === "hi"
                          ? "मुख्य ग्रन्थ सूची में संपूर्ण पृष्ठवार सूची (Pagination), विषय वर्गीकरण व कप्पा खोज उपलब्ध है।"
                          : "Access all 39,953+ catalogued volumes with clean server-safe pagination and Dewey Decimal indexes."}
                      </p>
                    </div>
                  </div>

                  <CardFooter className="w-full p-0 pt-4 border-t border-white/10 relative z-10">
                    <Link href={targetCatalogueUrl} className="w-full">
                      <Button
                        variant="primary"
                        className="w-full rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer font-marathi-body"
                      >
                        <span>{language === "mr" ? "संपूर्ण ग्रंथ सूची उघडा" : language === "hi" ? "संपूर्ण ग्रन्थ सूची खोलें" : "Open Books Tab"}</span>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Full-width "View More in Books Tab" Bar */}
        <div className="mt-8 p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="h-12 w-12 rounded-full bg-[#800020]/10 dark:bg-[#E5B869]/15 flex items-center justify-center shrink-0 text-[#800020] dark:text-[#E5B869]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="font-marathi-heading text-base sm:text-lg font-bold text-[#1F1A18] dark:text-[#FAF2E8]">
                  {language === "mr" ? "ग्रंथालयातील मुद्रित व संदर्भ ग्रंथसंग्रह" : language === "hi" ? "ग्रंथालय का मुद्रित एवं संदर्भ संग्रह" : "Institutional Printed & Reference Catalogue"}
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#800020] text-white dark:bg-[#E5B869] dark:text-[#18080A]">
                  ३९,९५३ ग्रंथ
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-marathi-body mt-0.5 font-medium">
                {language === "mr"
                  ? "नोंदणीकृत ग्रंथांची वर्गीकरणानुसार संपूर्ण सूची मुख्य ग्रंथसूची दालनात उपलब्ध आहे."
                  : language === "hi"
                  ? "पंजीकृत ग्रन्थों की विषयानुसार संपूर्ण सूची मुख्य ग्रन्थसूची विभाग में उपलब्ध है।"
                  : "Explore the complete registered catalogue organized by subject and Dewey classification."}
              </p>
            </div>
          </div>

          <Link href={targetCatalogueUrl} className="shrink-0 w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full sm:w-auto rounded-full bg-[#800020] hover:bg-[#66001A] text-white px-6 py-3 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer font-marathi-body"
            >
              <span>{language === "mr" ? "संपूर्ण ग्रंथसूची पहा" : language === "hi" ? "संपूर्ण ग्रन्थ सूची देखें" : "Open Institutional Catalogue"}</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
