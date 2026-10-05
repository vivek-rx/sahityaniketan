import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("❌ ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

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

async function runBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(process.cwd(), "backups");

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backupData = {
    metadata: {
      generatedAt: new Date().toISOString(),
      supabaseUrl: url,
    },
    tables: {},
  };

  console.log(`📦 Starting automated backup to: backups/backup-${timestamp}.json`);

  for (const table of TABLES) {
    try {
      const { data, error } = await supabase.from(table).select("*");
      if (error) {
        console.warn(`  ⚠️ Warning: Could not dump table [${table}]: ${error.message}`);
        backupData.tables[table] = [];
      } else {
        backupData.tables[table] = data || [];
        console.log(`  ✓ Dumped [${table}]: ${(data || []).length} records`);
      }
    } catch (e) {
      console.warn(`  ⚠️ Exception dumping [${table}]: ${e.message}`);
    }
  }

  const targetFile = path.join(backupDir, `backup-${timestamp}.json`);
  fs.writeFileSync(targetFile, JSON.stringify(backupData, null, 2), "utf-8");

  console.log(`\n🎉 Backup completed successfully! Saved to:\n   ${targetFile}`);
}

runBackup();
