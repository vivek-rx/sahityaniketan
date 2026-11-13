import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message = "401 Unauthorized: Admin authentication required", statusCode = 401) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = statusCode;
  }
}

export type AdminRole = "super_admin" | "librarian" | "curator" | "viewer";

export interface VerifiedAdmin {
  id: string;
  email: string;
  name: string | null;
  role: AdminRole;
}

/**
 * Verifies that the incoming request has a valid Supabase session AND that the
 * signed-in user is an active row in `admin_users`.
 *
 * The membership lookup uses the service-role client because the RLS policies
 * on `admin_users` recurse for anon/authenticated requests. Checking only
 * `auth.getUser()` would let any registered account (including ordinary
 * readers) call every admin server action.
 */
export async function requireAdmin(): Promise<{
  user: { id: string; email?: string };
  admin: VerifiedAdmin;
}> {
  let userId: string;
  let userEmail: string | undefined;

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw new UnauthorizedError(
        "401 Unauthorized: Valid admin session is required."
      );
    }

    userId = user.id;
    userEmail = user.email ?? undefined;
  } catch (err) {
    if (err instanceof UnauthorizedError) throw err;
    throw new UnauthorizedError(
      `401 Unauthorized: ${err instanceof Error ? err.message : "Authentication check failed"}`
    );
  }

  if (!userEmail) {
    throw new UnauthorizedError(
      "403 Forbidden: Signed-in account has no email address.",
      403
    );
  }

  const adminClient = createAdminClient();
  const { data, error: adminError } = await adminClient
    .from("admin_users")
    .select("id, email, name, role, is_active")
    .eq("email", userEmail)
    .eq("is_active", true)
    .maybeSingle();

  // The generated Database type omits Relationships/Functions, so supabase-js
  // widens this row to `never`. Narrow it back to the table's Row type.
  const admin = data as unknown as VerifiedAdmin | null;

  if (adminError) {
    console.error("Admin membership lookup failed:", adminError.message);
    throw new UnauthorizedError(
      "503 Service Unavailable: Unable to verify admin access.",
      503
    );
  }

  if (!admin) {
    throw new UnauthorizedError(
      "403 Forbidden: This account is not an active library administrator.",
      403
    );
  }

  return {
    user: { id: userId, email: userEmail },
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role as AdminRole,
    },
  };
}