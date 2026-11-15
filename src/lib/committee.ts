// Canonical Executive Committee roster (term 2023–24 → 2028–29).
// Shared between the public About page and the admin Committee Photos CMS so
// the upload slugs always match the display order. Photos themselves live in
// Supabase (table `committee_photos`, uploaded via /admin/committee).

export interface CommitteeMember {
  /** Stable storage slug — file path in the cms-media bucket + table key. */
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  roleHi: string;
  roleEn: string;
}

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    slug: "dattaprasad-pandurang-randad",
    name: "श्री. दत्तप्रसाद पांडुरंग रांदड़",
    nameEn: "Shri Dattaprasad Pandurang Randad",
    role: "अध्यक्ष",
    roleHi: "अध्यक्ष",
    roleEn: "President",
  },
  {
    slug: "subhash-haribhau-deshpande",
    name: "श्री. सुभाष हरिभाऊ देशपांडे",
    nameEn: "Shri Subhash Haribhau Deshpande",
    role: "उपाध्यक्ष",
    roleHi: "उपाध्यक्ष",
    roleEn: "Vice President",
  },
  {
    slug: "shantanu-shankarrao-hiralkar",
    name: "श्री. शंतनु शंकरराव हिरळकर",
    nameEn: "Shri Shantanu Shankarrao Hiralkar",
    role: "कार्यवाह",
    roleHi: "कार्यवाह",
    roleEn: "Secretary",
  },
  {
    slug: "kostubh-shriram-kodarkar",
    name: "श्री. कोस्तुभ श्रीराम कोदरकर",
    nameEn: "Shri Kostubh Shriram Kodarkar",
    role: "सहकार्यवाहक",
    roleHi: "सह-कार्यवाहक",
    roleEn: "Joint Secretary",
  },
  {
    slug: "suryakant-pantharinath-kanade",
    name: "श्री. सूर्यकांत पंठरीनाथ कानडे",
    nameEn: "Shri Suryakant Pantharinath Kanade",
    role: "कोषाध्यक्ष",
    roleHi: "कोषाध्यक्ष",
    roleEn: "Treasurer",
  },
  {
    slug: "makarand-madhavrao-patki",
    name: "ॲड. श्री. मकरंद माधवराव पत्की",
    nameEn: "Adv. Shri Makarand Madhavrao Patki",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "vipin-manikrao-kshirsagar",
    name: "श्री. विपीन माणिकराव खीरसागर",
    nameEn: "Shri Vipin Manikrao Kshirsagar",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "amol-shankarrao-jad",
    name: "श्री. अमोल शंकरराव जड",
    nameEn: "Shri Amol Shankarrao Jad",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "lalitkumar-ramvilas-bajaj",
    name: "श्री. ललितकुमार रामविलास बजाज",
    nameEn: "Shri Lalitkumar Ramvilas Bajaj",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "akshay-prakashrao-khadke",
    name: "ॲड. श्री. अक्षय प्रकाशराव खडके",
    nameEn: "Adv. Shri Akshay Prakashrao Khadke",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "pratibha-deepak-devale",
    name: "सौ. प्रतिभा दिपक देवळे",
    nameEn: "Mrs. Pratibha Deepak Devale",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "manjusha-prakashrao-kulkarni",
    name: "सौ. मंजुषा प्रकाशराव कुलकर्णी",
    nameEn: "Mrs. Manjusha Prakashrao Kulkarni",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "jitendra-arvind-deshpande",
    name: "श्री. जितेंद्र अरविंद देशपांडे",
    nameEn: "Shri Jitendra Arvind Deshpande",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
  {
    slug: "dattaprasad-chintamani-goswami",
    name: "श्री. दत्तप्रसाद चिंतामणि गोस्वामी",
    nameEn: "Shri Dattaprasad Chintamani Goswami",
    role: "सदस्य",
    roleHi: "सदस्य",
    roleEn: "Member",
  },
];
