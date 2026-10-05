"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, ChevronRight, Award, Flame, Scroll, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeritageBook {
  id: string;
  title: string;
  author: string;
  category: "freedom" | "saints" | "classics" | "exam";
  shelfRef: string;
  year: string;
  pages: string;
  desc: string;
  badge?: string;
}

const HERITAGE_BOOKS: HeritageBook[] = [
  {
    id: "b1",
    title: "हैद्राबाद स्वातंत्र्यसंग्राम आणि मराठवाडा",
    author: "गोविंदभाई श्रॉफ",
    category: "freedom",
    shelfRef: "इतिहास-मराठवाडा/कपाट-४/क्र-१२",
    year: "१९६८",
    pages: "४८० पृष्ठे",
    desc: "स्वामी रामानंद तीर्थ यांच्या नेतृत्वाखालील मराठवाडा मुक्तीसंग्रामाचा अधिकृत आणि साधार ऐतिहासिक दस्तऐवज.",
    badge: "ऐतिहासिक संदर्भ",
  },
  {
    id: "b2",
    title: "१८५७ चे स्वातंत्र्यसमर",
    author: "स्वातंत्र्यवीर विनायक दामोदर सावरकर",
    category: "freedom",
    shelfRef: "इतिहास-क्रांतिकारक/कपाट-४/क्र-१५",
    year: "१९०९",
    pages: "५६० पृष्ठे",
    desc: "भारताच्या पहिल्या स्वातंत्र्यलढ्याची तेजस्वी गाथा, ज्याने क्रांतिकारकांच्या पिढ्या घडवल्या.",
    badge: "दुर्मिळ प्रत",
  },
  {
    id: "b3",
    title: "स्वामी रामानंद तीर्थ: जीवन व कार्य",
    author: "भा. रा. कुलकर्णी",
    category: "freedom",
    shelfRef: "चरित्र-मराठवाडा/कपाट-२/क्र-०८",
    year: "१९७५",
    pages: "३४० पृष्ठे",
    desc: "मराठवाड्याच्या स्वातंत्र्यलढ्याचे महानायक पूज्य स्वामी रामानंद तीर्थ यांचे जीवनचरित्र.",
  },
  {
    id: "b4",
    title: "विवेकसिंधू (अंबाजोगाई प्रत)",
    author: "आद्यकवि मुकुंदराज",
    category: "saints",
    shelfRef: "संतसाहित्य-प्राचीन/कपाट-१/क्र-०१",
    year: "शके ११८८",
    pages: "३२० पृष्ठे",
    desc: "मराठी भाषेतील आद्यग्रंथ. अद्वैत वेदान्ताचे मराठीतील पहिले प्रकटीकरण जे अंबाजोगाई येथे रचले गेले.",
    badge: "आद्यग्रंथ",
  },
  {
    id: "b5",
    title: "दासोपंत पासोडी व पदसंग्रह",
    author: "संत दासोपंत",
    category: "saints",
    shelfRef: "संतसाहित्य-दासोपंत/कपाट-१/क्र-०७",
    year: "१९६४",
    pages: "४५० पृष्ठे",
    desc: "अंबाजोगाईचे महासंत दासोपंत यांच्या ४० फुटी कापडी पासोडीवरील अध्यात्मिक पदांचे विश्लेषण.",
    badge: "अंबाजोगाई वारसा",
  },
  {
    id: "b6",
    title: "सार्थ ज्ञानेश्वरी (राजवाडे प्रत)",
    author: "संत ज्ञानेश्वर महाराज",
    category: "saints",
    shelfRef: "संतसाहित्य-भाष्य/कपाट-१/क्र-११",
    year: "१९०९",
    pages: "८९० पृष्ठे",
    desc: "मराठी भाषेचा सर्वोत्कृष्ट अलंकार मानल्या जाणाऱ्या ज्ञानेश्वरीची अत्यंत शुद्ध व प्रमाण मानली गेलेली प्रत.",
  },
  {
    id: "b7",
    title: "स्वामी",
    author: "रणजित देसाई",
    category: "classics",
    shelfRef: "कादंबरी-ऐतिहासिक/कपाट-६/क्र-०३",
    year: "१९६२",
    pages: "४१२ पृष्ठे",
    desc: "थोरले माधवराव पेशवे आणि रमाबाई यांच्या उदात्त जीवनावरील अजरामर मराठी कादंबरी. साहित्य अकादमी पुरस्कार.",
    badge: "अभिजात कादंबरी",
  },
  {
    id: "b8",
    title: "ययाति",
    author: "वि. स. खांडेकर",
    category: "classics",
    shelfRef: "कादंबरी-ज्ञानपीठ/कपाट-६/क्र-०१",
    year: "१९५९",
    pages: "४३० पृष्ठे",
    desc: "मराठीतील पहिल्या ज्ञानपीठ पुरस्कार प्राप्त कादंबरी. भोग आणि त्याग यातील सनातन संघर्षाचे तत्त्वचिंतन.",
    badge: "ज्ञानपीठ पुरस्कार",
  },
  {
    id: "b9",
    title: "पानिपत",
    author: "विश्वास पाटील",
    category: "classics",
    shelfRef: "कादंबरी-इतिहास/कपाट-६/क्र-१४",
    year: "१९८८",
    pages: "६८० पृष्ठे",
    desc: "१७६१ च्या पानिपत युद्धाची चित्तथरारक आणि मराठ्यांच्या शौर्याची सविस्तर ऐतिहासिक कादंबरी.",
  },
  {
    id: "b10",
    title: "महाराष्ट्राचा समग्र इतिहास व भूगोल",
    author: "डॉ. सदानंद मोरे / प्रा. के. ए. खतीब",
    category: "exam",
    shelfRef: "अभ्यासिका-MPSC/कपाट-१२/क्र-०५",
    year: "२०२४",
    pages: "६५० पृष्ठे",
    desc: "MPSC राज्यसेवा, गट ब व क स्पर्धा परीक्षांच्या तयारीसाठी वातानुकूलित अभ्यासिकेतील प्रमाणित संदर्भ ग्रंथ.",
    badge: "अभ्यासिका संदर्भ",
  },
  {
    id: "b11",
    title: "भारतीय संविधान व राज्यव्यवस्था",
    author: "एम. लक्ष्मीकांत (मराठी अनुवाद)",
    category: "exam",
    shelfRef: "अभ्यासिका-राज्यशास्त्र/कपाट-१२/क्र-०९",
    year: "२०२५",
    pages: "८२० पृष्ठे",
    desc: "प्रशासकीय परीक्षांच्या विद्यार्थ्यांसाठी संविधानाचा सखोल अभ्यास ग्रंथ.",
    badge: "सर्वाधिक मागणी",
  },
];

export function CuratedHeritageBooks() {
  const [activeTab, setActiveTab] = useState<"freedom" | "saints" | "classics" | "exam">("freedom");

  const categories = [
    { id: "freedom" as const, label: "स्वातंत्र्यलढा व मराठवाडा इतिहास", icon: Flame, count: "१,४५०+" },
    { id: "saints" as const, label: "संत साहित्य व मुकुंदराज/दासोपंत विचार", icon: Scroll, count: "२,१२०+" },
    { id: "classics" as const, label: "मराठी अभिजात कादंबरी व साहित्य", icon: Award, count: "८,९००+" },
    { id: "exam" as const, label: "स्पर्धा परीक्षा व आधुनिक संदर्भ", icon: GraduationCap, count: "३,२००+" },
  ];

  const filteredBooks = HERITAGE_BOOKS.filter((b) => b.category === activeTab);

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#120B0D] border-t border-[#E5DDD0] dark:border-[#332228] transition-colors">
      <div className="section">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#800020]/10 dark:bg-[#E5B869]/15 border border-[#800020]/15 dark:border-[#E5B869]/30 text-xs font-bold uppercase tracking-wider text-[#800020] dark:text-[#E5B869] mb-2">
              <span>३९,९५३+ प्रत्यक्ष ग्रंथ दालने</span>
            </div>
            <h2 className="font-marathi-heading text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-[#FAF2E8]">
              साहित्य निकेतन ग्रंथसंग्रह वर्गीकरण
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-marathi-body mt-1">
              ८० वर्षांच्या ज्ञानतपस्येतून जपलेली दुर्मिळ हस्तलिखिते, अभिजात कादंबऱ्या व स्पर्धा परीक्षा ग्रंथ.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] hover:bg-stone-50 dark:hover:bg-[#281A20] text-stone-800 dark:text-stone-200 text-xs font-bold transition-all shadow-2xs"
          >
            <span>सर्व ३९,९५३+ ग्रंथ सूची शोधा</span>
            <ChevronRight className="h-4 w-4 text-[#800020] dark:text-[#E5B869]" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border",
                  isActive
                    ? "bg-[#800020] text-white border-[#800020] shadow-xs"
                    : "bg-white dark:bg-[#1E1418] text-stone-700 dark:text-stone-300 border-[#E5DDD0] dark:border-[#332228] hover:border-stone-400"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-amber-300" : "text-stone-400")} />
                <span>{cat.label}</span>
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", isActive ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-[#281A20] text-stone-500")}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-[#2D1B22] mb-3">
                  <span className="font-mono text-[10px] font-bold text-stone-500 dark:text-stone-400 bg-[#FAF8F5] dark:bg-[#160E11] px-2 py-0.5 rounded-xs border border-[#E5DDD0] dark:border-[#332228]">
                    {book.shelfRef}
                  </span>
                  {book.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#800020]/10 text-[#800020] dark:bg-[#E5B869]/15 dark:text-[#E5B869]">
                      {book.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-marathi-heading text-base sm:text-lg font-bold text-stone-900 dark:text-[#FAF2E8] group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mt-1 flex items-center gap-1.5">
                  <User className="h-3 w-3 text-[#800020] dark:text-[#E5B869]" />
                  <span>लेखक: {book.author}</span>
                </p>

                <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300 font-marathi-body mt-2.5 line-clamp-3">
                  {book.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-stone-100 dark:border-[#2D1B22] flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                  {book.year}, {book.pages}
                </span>
                <Link
                  href={`/catalogue?query=${encodeURIComponent(book.title)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#800020] dark:text-[#E5B869] hover:underline"
                >
                  <span>ग्रंथ मागणी नोंदवा</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
