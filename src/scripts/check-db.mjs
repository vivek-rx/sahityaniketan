import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("❌ ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

console.log("=================================================");
console.log("   SAHITYA NIKETAN — DATABASE PRODUCTION AUDIT   ");
console.log("=================================================");
console.log("🔗 Host URL:", url);

const supabase = createClient(url, key);

const TABLES = [
  "admin_users",
  "books",
  "book_ratings",
  "events",
  "carousel_slides",
  "posts",
  "gallery_albums",
  "gallery_items",
  "notices",
  "members",
  "site_settings",
  "audit_log",
  "book_reservations",
  "book_requests",
  "contact_submissions",
  "membership_applications",
  "donations"
];

async function runCheck() {
  let passed = 0;
  let failed = 0;
  const start = Date.now();

  for (const table of TABLES) {
    try {
      const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
      if (error) {
        console.log(`❌ Table [${table}]: ERROR ${error.code} — ${error.message}`);
        failed++;
      } else {
        console.log(`✅ Table [${table.padEnd(24)}]: ONLINE (${count ?? 0} rows)`);
        passed++;
      }
    } catch (err) {
      console.log(`❌ Table [${table}]: EXCEPTION — ${err.message}`);
      failed++;
    }
  }

  const duration = Date.now() - start;
  console.log("-------------------------------------------------");
  console.log(`Summary: ${passed}/${TABLES.length} tables verified in ${duration}ms.`);
  if (failed === 0) {
    console.log("🎉 ALL SCHEMA AUDITS PASSED — ZERO MISSING TABLES");
  } else {
    console.log(`⚠️ ${failed} tables failed validation. Run supabase/schema.sql in SQL Editor.`);
    process.exit(1);
  }
}

runCheck();
