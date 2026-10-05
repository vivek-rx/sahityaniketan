import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ngifzwmupsztjxhgttqb.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const email = "sahityaniketanabajogai@gmail.com";
  const password = "AdminPassword@123";

  console.log("Checking if admin user exists:", email);

  const { data: users, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) {
    console.error("Error listing users:", listErr);
    return;
  }

  const existing = users.users.find((u) => u.email === email);
  if (existing) {
    console.log("Admin user already exists with ID:", existing.id);
  } else {
    console.log("Creating admin user...");
    const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: "admin", name: "Sahitya Niketan Admin" },
    });

    if (createErr) {
      console.error("Error creating admin user:", createErr);
    } else {
      console.log("Admin user created successfully:", newUser.user.id);
    }
  }
}

main().catch(console.error);
