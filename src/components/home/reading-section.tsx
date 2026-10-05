"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export interface ReadingArticle {
  id: string;
  title: string;
  date: string;
  image: string;
  slug: string;
}

const DEFAULT_ARTICLES: ReadingArticle[] = [
  {
    id: "1",
    title: "अंबाजोगाईची ज्ञानसाधना: आद्यकवी मुकुंदराज व संत दासोपंतांचा समृद्ध वारसा",
    date: "१२ वे शतक — आजतागायत",
    image: "/images/real/library_vintage_books.png",
    slug: "ambajogai-literary-heritage-mukundraj-dasopant",
  },
  {
    id: "2",
    title: "वाचन संस्कृतीची ८० वर्षे: १ ऑगस्ट १९४५ पासूनचा गौरवशाली ग्रंथालय प्रवास",
    date: "स्थापना १ ऑगस्ट १९४५",
    image: "/images/real/library_inauguration_plaque.png",
    slug: "80-years-of-sahitya-niketan-ambajogai",
  },
  {
    id: "3",
    title: "मराठीतील आद्य ग्रंथ 'विवेकसिंधू' आणि दुर्मीळ मोडी हस्तलिखितांचे जतन",
    date: "दुर्मीळ दस्तऐवज संग्रह",
    image: "/images/real/library_cupboards.png",
    slug: "vivekasindhu-modi-manuscripts-preservation",
  },
];

export function ReadingSection({
  articles = DEFAULT_ARTICLES,
}: {
  articles?: ReadingArticle[];
}) {
  const { language } = useLanguage();

  const title =
    language === "en"
      ? "Featured Articles & Reading Circle"
      : language === "hi"
      ? "वाचन कट्टा एवं विशेष आलेख"
      : "वाचन कट्टा व विशेष लेख";

  const readBtnText =
    language === "en" ? "Read" : language === "hi" ? "पढ़ें" : "वाचा";

  return (
    <section className="bg-white dark:bg-[#120B0D] py-16 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E293B] dark:text-zinc-100 mb-12">
          {title}
        </h2>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-[#1E1418] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-[#332228] flex flex-col"
            >
              {/* Card Image */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-[#1E293B] dark:text-zinc-100 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 dark:text-zinc-400 mt-3">
                    {item.date}
                  </p>
                </div>

                <div className="mt-5">
                  <Link
                    href={`/stories/${item.slug}`}
                    className="inline-block px-5 py-2 rounded text-xs sm:text-sm font-medium text-gray-600 dark:text-zinc-300 bg-gray-100/90 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {readBtnText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
