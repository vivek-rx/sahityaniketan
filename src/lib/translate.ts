/**
 * Real-time client-side machine translation for CMS-authored content.
 *
 * Stories/events are authored in their original language (usually Marathi);
 * when a reader browses in English or Hindi, this translates the text on the
 * fly via Google's public translate endpoint (no API key) so meaning is
 * preserved without the library having to maintain manual translations.
 * Original text is always the fallback: on any network error, or for content
 * already in the target language, the untranslated original is shown.
 *
 * Results are cached per (from → to → text) in memory and sessionStorage so
 * navigation and revisits don't re-request.
 */

const ENDPOINT = "https://translate.googleapis.com/translate_a/single";

export type SiteLang = "mr" | "hi" | "en";

const memoryCache = new Map<string, string>();

function cacheKey(from: string, to: string, text: string): string {
  // Hash to keep keys short in sessionStorage
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) | 0;
  }
  return `sn_tr_${from}_${to}_${h.toString(36)}`;
}

function scriptOf(text: string): "deva" | "latin" {
  return /[\u0900-\u097F]/.test(text) ? "deva" : "latin";
}

/** True when a string still contains Devanagari (i.e. not yet localized). */
export function hasDeva(text?: string | null): boolean {
  return Boolean(text && /[\u0900-\u097F]/.test(text));
}

/**
 * Translate many strings with bounded concurrency so a page with dozens of
 * records doesn't fire all requests at once (rate-limit friendly). Results
 * keep the original on failure.
 */
export async function translatePool(
  texts: string[],
  from: SiteLang,
  to: SiteLang,
  limit = 4
): Promise<string[]> {
  const results = new Array<string>(texts.length);
  let cursor = 0;
  async function worker() {
    while (cursor < texts.length) {
      const i = cursor++;
      results[i] = await translateText(texts[i], from, to);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, texts.length) }, () => worker())
  );
  return results;
}

/**
 * Translate one string. Returns the original when translation is
 * unnecessary, impossible, or fails.
 */
export async function translateText(
  text: string,
  from: SiteLang,
  to: SiteLang
): Promise<string> {
  if (!text?.trim()) return text;
  if (from === to) return text;

  // Content already in the target script → nothing to do (e.g. English
  // source shown in EN mode).
  const targetIsLatin = to !== "hi"; // en → latin, mr/hi → Devanagari
  if (targetIsLatin && scriptOf(text) === "latin") return text;

  const key = cacheKey(from, to, text);
  if (memoryCache.has(key)) return memoryCache.get(key)!;
  if (typeof sessionStorage !== "undefined") {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      memoryCache.set(key, saved);
      return saved;
    }
  }

  try {
    const res = await fetch(
      `${ENDPOINT}?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`,
      { method: "GET" }
    );
    if (!res.ok) throw new Error(`translate ${res.status}`);
    const data = await res.json();
    // Response shape: [[["translated","original",...], ...], ...]
    const translated = (data?.[0] ?? [])
      .map((seg: unknown[]) => (Array.isArray(seg) ? seg[0] : ""))
      .join("");
    if (!translated) throw new Error("empty translation");
    memoryCache.set(key, translated);
    try {
      sessionStorage.setItem(key, translated);
    } catch {}
    return translated;
  } catch {
    return text; // graceful fallback to the original
  }
}

/**
 * Translate a set of texts (batched in parallel). Returns them in the same
 * order; failures keep the original.
 */
export async function translateAll(
  texts: Array<string | null | undefined>,
  from: SiteLang,
  to: SiteLang
): Promise<string[]> {
  return Promise.all(
    texts.map((t) => (t ? translateText(t, from, to) : Promise.resolve("")))
  );
}

/**
 * Translate long-form content paragraph by paragraph so paragraph breaks
 * survive the round-trip.
 */
export async function translateContent(
  content: string,
  from: SiteLang,
  to: SiteLang
): Promise<string> {
  if (!content?.trim()) return content;
  const paragraphs = content.split(/\n{2,}/);
  const translated = await Promise.all(
    paragraphs.map((p) => translateText(p, from, to))
  );
  return translated.join("\n\n");
}

// ─── React hook ───────────────────────────────────────────────
import { useEffect, useState } from "react";

/**
 * Returns the same items with the given fields machine-translated into the
 * reader's language whenever the source language differs. Originals are
 * shown until translations arrive and on any failure.
 */
export function useTranslatedFields<T extends Record<string, any>>(
  items: T[],
  fields: Array<keyof T>,
  lang: SiteLang,
  sourceOf: (item: T) => SiteLang = () => "mr"
): T[] {
  const [out, setOut] = useState<T[]>(items);

  useEffect(() => {
    let cancelled = false;
    setOut(items);
    (async () => {
      const next: T[] = [];
      for (const item of items) {
        const from = sourceOf(item);
        if (!from || from === lang) {
          next.push(item);
          continue;
        }
        const texts = fields.map((f) => (item[f] as string) || "");
        const translated = await translateAll(texts, from, lang);
        if (cancelled) return;
        next.push({
          ...item,
          ...Object.fromEntries(
            fields.map((f, i) => [f, translated[i] || item[f]])
          ),
        } as T);
      }
      if (!cancelled) setOut(next);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, lang]);

  return out;
}
