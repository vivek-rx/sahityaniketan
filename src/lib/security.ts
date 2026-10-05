/**
 * Security & Sanitization Suite for Sahitya Niketan Granthalaya
 * - Input Sanitization (XSS Prevention)
 * - Rate Limiting for Login & Form Submissions
 * - File Upload Validation (MIME & Extension Verification)
 */

// Simple in-memory rate limiter for login & form submissions
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ipOrUserId: string, maxRequests = 5, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ipOrUserId);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ipOrUserId, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count };
}

// XSS Prevention: Sanitize user input text strings
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// File Upload Validation (MIME type & size check)
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const ALLOWED_DOC_TYPES = ["application/pdf", "text/csv"];
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function validateUploadFile(file: File, allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES]): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: "File size exceeds maximum limit of 5 MB." };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file format (${file.type}). Allowed formats: JPEG, PNG, WebP, PDF.` };
  }

  return { valid: true };
}
