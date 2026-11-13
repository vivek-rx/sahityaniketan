import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";

/**
 * Server-side authorization probe used by the client AdminAuthGuard.
 *
 * A client-side `auth.getUser()` check only proves that *someone* is signed in.
 * This route also proves the account is an active `admin_users` member, using
 * the service-role client so the recursive `admin_users` RLS policy is never
 * evaluated with the anon key.
 */
export async function GET() {
  try {
    const { admin } = await requireAdmin();

    return NextResponse.json(
      { isAdmin: true, role: admin.role, name: admin.name },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json(
      { isAdmin: false },
      { status: 401, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}