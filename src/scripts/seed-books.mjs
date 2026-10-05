import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const realBooks = [
  {
    title: "श्यामची आई",
    author: "साने गुरुजी (पांडुरंग सदाशिव साने)",
    isbn: "978-8177660012",
    category: "अभिजात कादंबरी",
    language: "mr",
    publication_year: 1935,
    shelf_number: "म-०१",
    availability: "available",
    is_featured: true,
  },
  {
    title: "मृत्युंजय",
    author: "शिवाजी सावंत",
    isbn: "978-8177662054",
    category: "पौराणिक व ऐतिहासिक",
    language: "mr",
    publication_year: 1967,
    shelf_number: "म-०४",
    availability: "available",
    is_featured: true,
  },
  {
    title: "ययाति",
    author: "वि. स. खांडेकर",
    isbn: "978-8177660234",
    category: "ज्ञानपीठ सन्मानित साहित्य",
    language: "mr",
    publication_year: 1959,
    shelf_number: "म-०२",
    availability: "available",
    is_featured: true,
  },
  {
    title: "छावा",
    author: "शिवाजी सावंत",
    isbn: "978-8177663211",
    category: "ऐतिहासिक कादंबरी",
    language: "mr",
    publication_year: 1979,
    shelf_number: "म-०५",
    availability: "available",
    is_featured: true,
  },
  {
    title: "कोसला",
    author: "भालचंद्र नेमाडे",
    isbn: "978-8177661125",
    category: "आधुनिक मराठी साहित्य",
    language: "mr",
    publication_year: 1963,
    shelf_number: "म-०३",
    availability: "available",
    is_featured: true,
  },
  {
    title: "गोदान",
    author: "मुंशी प्रेमचंद",
    isbn: "978-8170280123",
    category: "हिन्दी साहित्य",
    language: "hi",
    publication_year: 1936,
    shelf_number: "हि-०१",
    availability: "available",
    is_featured: true,
  },
  {
    title: "मेघदूतम्",
    author: "महाकवि कालिदास",
    isbn: "978-8120800342",
    category: "संस्कृत काव्य",
    language: "sa",
    publication_year: 1950,
    shelf_number: "सं-०१",
    availability: "available",
    is_featured: true,
  }
];

async function seed() {
  console.log("Seeding authentic books into Supabase...");
  for (const book of realBooks) {
    const { data, error } = await supabase
      .from("books")
      .upsert(book, { onConflict: "isbn" })
      .select();
    if (error) {
      console.error("Error inserting", book.title, error.message);
    } else {
      console.log("Seeded:", book.title);
    }
  }
  console.log("Finished seeding authentic books!");
}

seed();
