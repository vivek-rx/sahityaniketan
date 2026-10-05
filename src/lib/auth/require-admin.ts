import { createClient } from "@/lib/supabase/server";

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message = "401 Unauthorized: Admin authentication required") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

/**
 * Verifies that the incoming request has a valid Supabase authenticated admin user session.
 * Throws a 401 Unauthorized error if no valid session is present.
 */
export async function requireAdmin() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw new UnauthorizedError("401 Unauthorized: Valid admin session is required.");
    }

    return user;
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      throw err;
    }
    throw new UnauthorizedError(`401 Unauthorized: ${err?.message || "Authentication check failed"}`);
  }
}
