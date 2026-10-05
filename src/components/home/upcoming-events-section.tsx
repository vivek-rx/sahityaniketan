"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface CulturalEvent {
  id: string;
  titleMarathi: string;
  titleEnglish: string;
  category: string;
  dateMarathi: string;
  timeMarathi: string;
  locationMarathi: string;
  descriptionMarathi: string;
  badgeColor: string;
}

const UPCOMING_EVENTS: CulturalEvent[] = [
  {
    id: "e1",
    titleMarathi: "मराठी भाषा गौरव दिन व भव्य ग्रंथदिंडी सोहळा",
    titleEnglish: "Marathi Bhasha Gaurav Din & Grand Granth Dindi",
    category: "साहित्य सोहळा",
    dateMarathi: "२७ फेब्रुवारी २०२६",
    timeMarathi: "सकाळी ९:०० वा.",
    locationMarathi: "मुख्य प्रांगण ते शुक्रवार पेठ",
    descriptionMarathi: "अंबाजोगाई शहरात पालखीतून निघणारी ऐतिहासिक ग्रंथांची मिरवणूक, ग्रंथपूजन व ज्येष्ठ साहित्यिकांचे प्रबोधनपर विचार.",
    badgeColor: "bg-[#800020]/10 text-[#800020] dark:bg-[#E5B869]/15 dark:text-[#E5B869]",
  },
  {
    id: "e2",
    titleMarathi: "आद्यकवी मुकुंदराज स्मृती व्याख्यानमाला",
    titleEnglish: "Adya Kavi Mukundraj Memorial Lecture Series",
    category: "व्याख्यानमाला",
    dateMarathi: "१५ मार्च २०२६",
    timeMarathi: "सायंकाळी ६:०० वा.",
    locationMarathi: "साहित्य निकेतन मुख्य सभागृह",
    descriptionMarathi: "मराठी आद्यग्रंथ 'विवेकसिंधू' आणि १२ व्या शतकातील मराठी भाषेचा वैश्विक विकास या विषयावर अभ्यासक विद्वानांचे व्याख्यान.",
    badgeColor: "bg-[#800020]/10 text-[#800020] dark:bg-[#E5B869]/15 dark:text-[#E5B869]",
  },
  {
    id: "e3",
    titleMarathi: "स्पर्धा परीक्षा करिअर मार्गदर्शन व कार्यशाळा",
    titleEnglish: "Competitive Exams Career Guidance Workshop",
    category: "विद्यार्थी कार्यशाळा",
    dateMarathi: "२२ मार्च २०२६",
    timeMarathi: "सकाळी १०:०० वा.",
    locationMarathi: "वातानुकूलित अभ्यासिका दालन",
    descriptionMarathi: "MPSC व UPSC परीक्षांच्या पूर्वतयारीसाठी यशवंतांचे थेट मार्गदर्शन व ग्रंथालयातील संदर्भ ग्रंथांचा प्रभावी वापर.",
    badgeColor: "bg-[#800020]/10 text-[#800020] dark:bg-[#E5B869]/15 dark:text-[#E5B869]",
  },
];

export function UpcomingEventsSection() {
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-[#F3ECE3]/80 dark:bg-[#191013] border-t border-[#E5DDD0] dark:border-[#332228] font-marathi-body transition-colors">
      <div className="section">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#800020] dark:text-[#E5B869] uppercase tracking-wider mb-1">
              {language === "en" ? "Cultural Events & Lectures" : "सांस्कृतिक कार्यक्रम व व्याख्याने"}
            </p>
            <h2 className="font-marathi-heading text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-[#FAF2E8] leading-tight">
              {language === "en" ? "Upcoming Library Events & Gatherings" : "आगामी ग्रंथालय कार्यक्रम व संमेलने"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium mt-1">
              {language === "en"
                ? "Lectures, literary meets, and cultural programs at Sahitya Niketan."
                : "वाचन संस्कृती संवर्धन, व्याख्यानमाला आणि अंबाजोगाईच्या साहित्यिक चळवळीचे आगामी उपक्रम."}
            </p>
          </div>

          <Link
            href="/events"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5DDD0] dark:border-[#332228] bg-white dark:bg-[#1E1418] hover:bg-stone-50 dark:hover:bg-[#281A20] text-stone-800 dark:text-stone-200 text-xs font-bold transition-all shadow-2xs"
          >
            <span>{language === "en" ? "View All Events" : "सर्व कार्यक्रम पहा"}</span>
          </Link>
        </div>

        {/* 3-Column Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E1418] border border-[#E5DDD0] dark:border-[#332228] shadow-2xs hover:shadow-xs transition-all group"
            >
              <div>
                {/* Category Badge & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${event.badgeColor}`}>
                    {event.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                    <Calendar className="w-3 h-3 text-[#800020] dark:text-[#E5B869]" />
                    <span>{event.dateMarathi}</span>
                  </div>
                </div>

                <h3 className="font-marathi-heading text-base sm:text-lg font-bold text-stone-900 dark:text-[#FAF2E8] group-hover:text-[#800020] dark:group-hover:text-[#E5B869] transition-colors leading-snug mb-2">
                  {event.titleMarathi}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium mb-4">
                  {event.descriptionMarathi}
                </p>
              </div>

              {/* Event Location & Timing */}
              <div className="pt-3 border-t border-stone-100 dark:border-[#2D1B22] space-y-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#800020] dark:text-[#E5B869]" />
                  <span>{event.timeMarathi}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#800020] dark:text-[#E5B869]" />
                  <span className="truncate">{event.locationMarathi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
