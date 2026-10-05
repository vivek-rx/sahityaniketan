"use client";

import Link from "next/link";
import { 
  ScrollText, 
  Crown, 
  BookOpen, 
  ArrowRight, 
  Flame,
  CheckCircle2,
  Calendar,
  Landmark
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function AmbajogaiHeritageTreasury() {
  const { language } = useLanguage();

  const treasuryItems = [
    {
      title: "आद्यकवी मुकुंदराज — 'विवेकसिंधू'",
      era: "इ.स. ११८८ (१२वे शतक)",
      category: "मराठी भाषेचा आद्यग्रंथ",
      desc: "मराठी साहित्याची पहिली ज्ञानगंगा! आद्यकवी मुकुंदराजांनी अंबाजोगाईच्या पावन भूमीत 'विवेकसिंधू' या पहिल्या मराठी तत्त्वज्ञान ग्रंथाची रचना केली. ग्रंथालयात याचे ऐतिहासिक संदर्भ व दुर्मीळ नोंदी जतन आहेत.",
      tag: "अंबाजोगाईची जागतिक ओळख",
      icon: Crown,
      badgeText: "मराठी आद्यकाव्य",
      stats: "८३६+ वर्षे प्राचीन परंपरा",
    },
    {
      title: "संत दासोपंत — 'सचित्र पसोडी'",
      era: "१६ वे शतक (१५५१ ते १६१५)",
      category: "जगातील एकमेव कापडी हस्तलिखित",
      desc: "४० फूट लांब आणि ४ फूट रुंद कापडावर सूक्ष्म हस्ताक्षरात आणि रंगीत चित्रांसह लिहिलेली दासोपंतांची 'पसोडी' हे जगातील महाआश्चर्य मानले जाते. ग्रंथालयात पसोडीचे मूळ संदर्भ व संशोधन साहित्य उपलब्ध आहे.",
      tag: "अद्वितीय जागतिक वारसा",
      icon: ScrollText,
      badgeText: "४० फूट कापडी हस्तलिखित",
      stats: "५ लाख+ ओव्यांचा खजिना",
    },
    {
      title: "मोडी लिपी व शिवकालीन दस्तऐवज",
      era: "१७ वे ते १९ वे शतक",
      category: "दुर्मीळ ऐतिहासिक संग्रह",
      desc: "छत्रपती शिवराय, पेशवेकाळ आणि मराठवाड्याच्या स्वातंत्र्यसंग्रामातील अस्सल मोडी लिपीतील आज्ञापत्रे, सनदा आणि दस्तऐवज. इतिहास संशोधकांसाठी ग्रंथालयात विशेष मोडी वाचन साहाय्य उपलब्ध आहे.",
      tag: "इतिहास संशोधकांचे माहेरघर",
      icon: Flame,
      badgeText: "अस्सल मोडी दस्तऐवज",
      stats: "५००+ दुर्मीळ मोडी सनदा",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#120B0D] border-t border-[#E5DDD0] dark:border-[#332228] font-marathi-body transition-colors">
      <div className="section">
        
        {/* Section Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#800020]/10 dark:bg-[#E5B869]/15 border border-[#800020]/15 dark:border-[#E5B869]/30 text-xs font-bold uppercase tracking-wider text-[#800020] dark:text-[#E5B869] mb-2">
              <Landmark className="h-3.5 w-3.5" />
              <span>अंबाजोगाईची ऐतिहासिक ज्ञानपरंपरा</span>
            </div>
            <h2 className="font-marathi-heading text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-[#FAF2E8] leading-tight">
              ८०० वर्षांचा समृद्ध साहित्यिक वारसा व दुर्मीळ हस्तलिखिते
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium mt-1">
              आद्यकवी मुकुंदराज (विवेकसिंधू ११८८), संत दासोपंत (४० फुटी कापडी पसोडी) आणि पेशवेकालीन मोडी दस्तऐवजांचे अखंड संवर्धन.
            </p>
          </div>

          <Link
            href="/catalogue?category=manuscripts"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] hover:bg-stone-50 dark:hover:bg-[#281A20] text-stone-800 dark:text-stone-200 text-xs font-bold transition-all shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#800020] dark:text-[#E5B869]" />
            <span>हस्तलिखित दालन शोधा</span>
          </Link>
        </div>

        {/* 3-Column Treasury Showcase (Harmonized, Clean Surfaces) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {treasuryItems.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] rounded-2xl shadow-2xs hover:shadow-xs transition-all group"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center font-bold bg-[#800020]/10 dark:bg-[#E5B869]/15 text-[#800020] dark:text-[#E5B869]">
                      <IconComp className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#E5DDD0] dark:border-[#332228] bg-[#FAF8F5] dark:bg-[#160E11] text-stone-700 dark:text-stone-300">
                      {item.era}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#800020] dark:text-[#E5B869] mb-1">
                    {item.category}
                  </div>

                  {/* Title */}
                  <h3 className="font-marathi-heading text-base sm:text-lg font-bold text-stone-900 dark:text-[#FAF2E8] group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium mb-4">
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer: Heritage Stat Badge */}
                <div className="pt-3 border-t border-stone-100 dark:border-[#2D1B22] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#800020] dark:text-[#E5B869]">
                    {item.stats}
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 font-medium">
                    {item.badgeText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
