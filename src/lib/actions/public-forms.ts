"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { createUntypedAdminClient } from "@/lib/supabase/admin";
import { CONSENT_VERSION } from "@/lib/site";

/**
 * Public form submissions.
 *
 * Every form is validated again on the server, rate-limited per IP and stored
 * with the consent version the visitor actually agreed to. These actions use
 * the service role because the submission tables have no anon INSERT policy:
 * the public key cannot write around this validation.
 */

export type PublicFormCode =
  | "validation"
  | "rate_limit"
  | "captcha"
  | "server";

export type PublicFormResult =
  | { ok: true }
  | { ok: false; code: PublicFormCode };

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number is too short")
  .max(30, "Phone number is too long")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }, "Phone number is invalid");

const optionalPhoneSchema = z
  .union([phoneSchema, z.literal("")])
  .optional()
  .transform((value) => (value ? value : null));

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value ? value : null));

const localeSchema = z.enum(["mr", "hi", "en"]).default("mr");

const antiSpamSchema = z.object({
  /** Hidden honeypot: real people leave this empty. */
  website: z.string().max(0).optional().default(""),
  /** Time spent on the form, measured in the browser. */
  elapsedMs: z.number().int().min(0).max(86_400_000),
  turnstileToken: z.string().max(4096).optional(),
});

const contactSchema = antiSpamSchema.extend({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: phoneSchema,
  subject: optionalText(160),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  locale: localeSchema,
});

const bookRequestSchema = antiSpamSchema.extend({
  bookTitle: z.string().trim().min(2).max(240),
  author: optionalText(160),
  category: optionalText(120),
  reason: optionalText(1000),
  requesterName: z.string().trim().min(2).max(120),
  phone: optionalPhoneSchema,
  email: z
    .union([z.string().trim().toLowerCase().email().max(254), z.literal("")])
    .optional()
    .transform((value) => (value ? value : null)),
  consent: z.literal(true),
  locale: localeSchema,
});

const membershipSchema = antiSpamSchema.extend({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: phoneSchema,
  address: optionalText(500),
  idType: z.enum(["aadhaar", "voter", "passport", "student"]),
  consent: z.literal(true),
  locale: localeSchema,
});

const newsletterSchema = antiSpamSchema.extend({
  email: z.string().trim().toLowerCase().email().max(254),
  consent: z.literal(true),
  source: z.string().trim().max(40).optional().default("footer"),
});

const rsvpSchema = antiSpamSchema.extend({
  eventTitle: z.string().trim().min(2).max(240),
  eventDate: optionalText(80),
  eventTime: optionalText(80),
  venue: optionalText(240),
  name: z.string().trim().min(2).max(120),
  phone: optionalPhoneSchema,
  attendees: z.coerce.number().int().min(1).max(10).default(1),
  consent: z.literal(true),
  locale: localeSchema,
});

// ─── RATE LIMITING ────────────────────────────────────────────
// Per-instance and in-memory: it stops bursts on a warm serverless instance
// without adding another paid service. Cloudflare Turnstile covers the rest.

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function allowRequest(key: string): boolean {
  const now = Date.now();

  if (buckets.size > 5000) {
    for (const [entryKey, entry] of buckets) {
      if (entry.resetAt <= now) buckets.delete(entryKey);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_PER_WINDOW) return false;
  bucket.count += 1;
  return true;
}

async function clientIp(): Promise<string> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headerStore.get("x-real-ip")?.trim() || "unknown";
}

// ─── TURNSTILE ────────────────────────────────────────────────

async function turnstilePassed(token?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  // Until the production keys are configured the widget uses Cloudflare's
  // always-pass test key, so there is nothing to verify. Honeypot, timing and
  // rate limiting still apply. Set TURNSTILE_SECRET_KEY before launch.
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function guard(
  form: string,
  input: { website?: string; elapsedMs: number; turnstileToken?: string },
  options?: { requireCaptcha?: boolean }
): Promise<PublicFormCode | null> {
  if (input.website) return "validation";

  // A human cannot read and fill a real enquiry in under 1.2 seconds.
  if (input.elapsedMs < 1200) return "validation";

  // Newsletter signup in the footer has no widget; verify a token only when
  // one is actually supplied. Every other form requires it once the secret is
  // configured.
  const shouldVerify =
    options?.requireCaptcha !== false || Boolean(input.turnstileToken);
  if (shouldVerify && !(await turnstilePassed(input.turnstileToken))) {
    return "captcha";
  }

  if (!allowRequest(`${form}:${await clientIp()}`)) return "rate_limit";

  return null;
}

function consentedAt(): {
  consent_given: true;
  consent_version: string;
  consent_at: string;
} {
  return {
    consent_given: true,
    consent_version: CONSENT_VERSION,
    consent_at: new Date().toISOString(),
  };
}

// ─── CONTACT ──────────────────────────────────────────────────

export async function submitContactForm(
  raw: unknown
): Promise<PublicFormResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, code: "validation" };

  const blocked = await guard("contact", parsed.data);
  if (blocked) return { ok: false, code: blocked };

  const supabase = createUntypedAdminClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
    locale: parsed.data.locale,
    ...consentedAt(),
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return { ok: false, code: "server" };
  }
  return { ok: true };
}

// ─── BOOK REQUEST ─────────────────────────────────────────────

export async function submitBookRequest(
  raw: unknown
): Promise<PublicFormResult> {
  const parsed = bookRequestSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, code: "validation" };

  const blocked = await guard("book-request", parsed.data);
  if (blocked) return { ok: false, code: blocked };

  const supabase = createUntypedAdminClient();
  const notes = [parsed.data.category, parsed.data.reason]
    .filter(Boolean)
    .join(" — ");

  const { error } = await supabase.from("book_requests").insert({
    book_title: parsed.data.bookTitle,
    author: parsed.data.author,
    requested_by: parsed.data.requesterName,
    phone: parsed.data.phone,
    email: parsed.data.email,
    notes: notes || null,
    locale: parsed.data.locale,
    ...consentedAt(),
  });

  if (error) {
    console.error("[book-request] insert failed:", error.message);
    return { ok: false, code: "server" };
  }
  return { ok: true };
}

// ─── MEMBERSHIP ───────────────────────────────────────────────

export async function submitMembershipApplication(
  raw: unknown
): Promise<PublicFormResult> {
  const parsed = membershipSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, code: "validation" };

  const blocked = await guard("membership", parsed.data);
  if (blocked) return { ok: false, code: blocked };

  const supabase = createUntypedAdminClient();

  // Do not create a second pending file for the same applicant.
  const { data: existing, error: lookupError } = await supabase
    .from("members")
    .select("id")
    .eq("email", parsed.data.email)
    .eq("status", "pending")
    .limit(1);

  if (lookupError) {
    console.error("[membership] lookup failed:", lookupError.message);
    return { ok: false, code: "server" };
  }
  if (existing && existing.length > 0) return { ok: true };

  const { error } = await supabase.from("members").insert({
    name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    address: parsed.data.address,
    membership_type: "standard",
    status: "pending",
    id_type: parsed.data.idType,
    locale: parsed.data.locale,
    ...consentedAt(),
  });

  if (error) {
    console.error("[membership] insert failed:", error.message);
    return { ok: false, code: "server" };
  }
  return { ok: true };
}

// ─── NEWSLETTER ───────────────────────────────────────────────

export async function subscribeToNewsletter(
  raw: unknown
): Promise<PublicFormResult> {
  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, code: "validation" };

  const blocked = await guard("newsletter", parsed.data, {
    requireCaptcha: false,
  });
  if (blocked) return { ok: false, code: blocked };

  const supabase = createUntypedAdminClient();
  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: parsed.data.email,
      status: "subscribed",
      source: parsed.data.source,
      ...consentedAt(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("[newsletter] upsert failed:", error.message);
    return { ok: false, code: "server" };
  }
  return { ok: true };
}

// ─── EVENT RSVP ───────────────────────────────────────────────

export async function submitEventRsvp(
  raw: unknown
): Promise<PublicFormResult> {
  const parsed = rsvpSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, code: "validation" };

  const blocked = await guard("rsvp", parsed.data);
  if (blocked) return { ok: false, code: blocked };

  const supabase = createUntypedAdminClient();
  const { error } = await supabase.from("event_rsvps").insert({
    event_title: parsed.data.eventTitle,
    event_date: parsed.data.eventDate,
    event_time: parsed.data.eventTime,
    venue: parsed.data.venue,
    name: parsed.data.name,
    phone: parsed.data.phone,
    attendees: parsed.data.attendees,
    ...consentedAt(),
  });

  if (error) {
    console.error("[rsvp] insert failed:", error.message);
    return { ok: false, code: "server" };
  }
  return { ok: true };
}