import type { Book } from "@/types/database";

/**
 * Canonical English (romanized) names for the library's catalogue.
 *
 * The books table stores `title` and `author` in Devanagari only, so English
 * mode had nothing to show. This map provides the official romanized forms —
 * keyed by the exact DB strings — and is the single source of truth for
 * every English-mode book rendering (catalogue list, detail, awards).
 * New admin-added books fall back gracefully to the Devanagari name.
 */
const TITLE_EN: Record<string, string> = {
  "श्यामची आई": "Shyamchi Aai",
  "मृत्युंजय": "Mrityunjaya",
  "ययाति": "Yayati",
  "छावा": "Chhava",
  "कोसला": "Kosala",
  "गोदान": "Godaan",
  "मेघदूतम्": "Meghaduta",
  "विवेकसिंधु": "Vivekasindhu",
  "गीतार्णव व पसोडी": "Geetarnav & Pasodi",
  "स्वामी": "Swami",
  "श्रीमान योगी": "Shriman Yogi",
  "पानिपत": "Panipat",
  "झाडाझडती": "Zadazadati",
  "बटाट्याची चाळ": "Batatyachi Chaal",
  "व्यक्ती आणि वल्ली": "Vyakti ani Valli",
  "नटसम्राट": "Natsamrat",
  "विशाखा": "Vishakha",
  "फकिरा": "Fakira",
  "बलुतं": "Baluta",
  "उचल्या": "Uchalya",
  "मराठवाडा मुक्ती संग्राम इतिहास": "Marathwada Mukti Sangram Itihas",
  "अंबाजोगाई दर्शन व सांस्कृतिक वारसा": "Ambajogai Darshan & Cultural Heritage",
  "आधुनिक भारताचा इतिहास": "Modern Indian History",
  "महाराष्ट्राचा समग्र भूगोल": "Maharashtra Samagra Bhoogol",
  "भारतीय राज्यघटना व राजकारण": "Indian Constitution & Politics",
  "गबन": "Gaban",
  "अभिज्ञानशाकुन्तलम्": "Abhijnana Shakuntalam",
};

const AUTHOR_EN: Record<string, string> = {
  "भालचंद्र नेमाडे": "Bhalchandra Nemade",
  "आद्यकवि मुकुंदराज": "Adyakavi Mukundraj",
  "संत दासोपंत": "Sant Dasopant",
  "विश्वास पाटील": "Vishwas Patil",
  "पु. ल. देशपांडे": "P. L. Deshpande",
  "वि. वा. शिरवाडकर (कुसुमाग्रज)": "V. V. Shirwadkar (Kusumagraj)",
  "कुसुमाग्रज": "Kusumagraj",
  "शिवाजी सावंत": "Shivaji Sawant",
  "वि. स. खांडेकर": "V. S. Khandekar",
  "मुंशी प्रेमचंद": "Munshi Premchand",
  "महाकवि कालिदास": "Mahakavi Kalidasa",
  "रणजित देसाई": "Ranjit Desai",
  "अण्णाभाऊ साठे": "Annabhau Sathe",
  "दया पवार": "Daya Pawar",
  "अनंतराव भालेराव": "Anantrao Bhalerao",
  "डॉ. मुकुंद देव": "Dr. Mukund Dev",
  "प्रा. ए. बी. सवदी": "Prof. A. B. Savadi",
  "एम. लक्ष्मीकांत": "M. Laxmikanth",
  "साने गुरुजी (पांडुरंग सदाशिव साने)": "Sane Guruji (Pandurang Sadashiv Sane)",
  "लक्ष्मण गायकवाड": "Laxman Gaikwad",
  "बिपीन चंद्र व ग्रोव्हर": "Bipan Chandra & Grover",
};

export function titleEnFor(title?: string | null): string | undefined {
  if (!title) return undefined;
  return TITLE_EN[title.trim()];
}

export function authorEnFor(author?: string | null): string | undefined {
  if (!author) return undefined;
  return AUTHOR_EN[author.trim()];
}

/** Official English names for the seeded Marathi shelf categories. */
export const CATEGORY_EN: Record<string, string> = {
  "अभिजात कादंबरी": "Classic Novels",
  "पौराणिक व ऐतिहासिक": "Mythological & Historical",
  "ज्ञानपीठ सन्मानित साहित्य": "Jnanpith Honoured Works",
  "ऐतिहासिक कादंबरी": "Historical Novels",
  "आधुनिक मराठी साहित्य": "Modern Marathi Literature",
  "हिन्दी साहित्य": "Hindi Literature",
  "संस्कृत काव्य": "Sanskrit Poetry",
  "संतसाहित्य व आद्य ग्रंथ": "Sant Literature & Early Texts",
  "ज्ञानपीठ व साहित्य अकादमी": "Jnanpith & Sahitya Akademi",
  "विनोदी साहित्य": "Humour & Satire",
  "नाटक व काव्य": "Drama & Poetry",
  "विद्रोही व लोकसाहित्य": "Rebel & Folk Literature",
  "आत्मचरित्र": "Autobiography",
  "इतिहास व संशोधन": "History & Research",
  "स्पर्धा परीक्षा व करिअर": "Competitive Exams & Career",
};

export function categoryEnFor(category?: string | null): string | undefined {
  if (!category) return undefined;
  return CATEGORY_EN[category.trim()];
}
