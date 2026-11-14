/**
 * Phonetic roman → Devanagari transliteration engine (Marathi/Hindi).
 *
 * Stateless, dictionary-free "type as you say" engine in the style of
 * Google Input Tools phonetic typing:
 *   - a consonant awaits a vowel; "k" → क, "ka" → क (inherent a),
 *     "kaa"/"kaa" → का, "ki" → कि, "koo" → कू
 *   - consonant directly followed by a consonant gets a halant:
 *     "swaami" → स्वामी, "vidnyan" → विद्ञान-ish, "sindhu" → सिन्धु
 *   - already-Devanagari text passes through untouched, so editing mixed
 *     input and backspacing behave like a normal text field
 *   - uppercase selects retroflexes/सpecial letters: T ट, D ड, N ण, L ळ,
 *     Sh ष, Th ठ, Dh ढ, Ru/Ri ृ; lowercase defaults are dental
 *   - "ng" after an audible vowel becomes the anusvar ं, else ङ
 *
 * Works identically for Marathi and Hindi (shared Devanagari script).
 */

type Kind = "consonant" | "vowel-key";

interface KeyEntry {
  roman: string;
  deva: string;
  kind: Kind;
  /** vowel-key that only makes sense as a matra (Ri/Ru) */
  matraOnly?: boolean;
  /** vowel-key that only makes sense as an independent vowel */
  independentOnly?: boolean;
}

const CONSONANT_ENTRIES: KeyEntry[] = [
  // 3-char clusters first (greedy matching relies on order)
  { roman: "chh", deva: "छ", kind: "consonant" },
  { roman: "ksh", deva: "क्ष", kind: "consonant" },
  { roman: "dny", deva: "ज्ञ", kind: "consonant" },
  // 2-char
  { roman: "jn", deva: "ज्ञ", kind: "consonant" },
  { roman: "kh", deva: "ख", kind: "consonant" },
  { roman: "gh", deva: "घ", kind: "consonant" },
  { roman: "jh", deva: "झ", kind: "consonant" },
  { roman: "zh", deva: "झ", kind: "consonant" },
  { roman: "th", deva: "थ", kind: "consonant" },
  { roman: "Th", deva: "ठ", kind: "consonant" },
  { roman: "dh", deva: "ध", kind: "consonant" },
  { roman: "Dh", deva: "ढ", kind: "consonant" },
  { roman: "ph", deva: "फ", kind: "consonant" },
  { roman: "bh", deva: "भ", kind: "consonant" },
  { roman: "sh", deva: "श", kind: "consonant" },
  { roman: "Sh", deva: "ष", kind: "consonant" },
  { roman: "ch", deva: "च", kind: "consonant" },
  // 1-char
  { roman: "k", deva: "क", kind: "consonant" },
  { roman: "g", deva: "ग", kind: "consonant" },
  { roman: "c", deva: "क", kind: "consonant" },
  { roman: "j", deva: "ज", kind: "consonant" },
  { roman: "T", deva: "ट", kind: "consonant" },
  { roman: "t", deva: "त", kind: "consonant" },
  { roman: "D", deva: "ड", kind: "consonant" },
  { roman: "d", deva: "द", kind: "consonant" },
  { roman: "N", deva: "ण", kind: "consonant" },
  { roman: "n", deva: "न", kind: "consonant" },
  { roman: "p", deva: "प", kind: "consonant" },
  { roman: "b", deva: "ब", kind: "consonant" },
  { roman: "m", deva: "म", kind: "consonant" },
  { roman: "y", deva: "य", kind: "consonant" },
  { roman: "r", deva: "र", kind: "consonant" },
  { roman: "l", deva: "ल", kind: "consonant" },
  { roman: "L", deva: "ळ", kind: "consonant" },
  { roman: "v", deva: "व", kind: "consonant" },
  { roman: "w", deva: "व", kind: "consonant" },
  { roman: "s", deva: "स", kind: "consonant" },
  { roman: "S", deva: "स", kind: "consonant" },
  { roman: "h", deva: "ह", kind: "consonant" },
  { roman: "f", deva: "फ़", kind: "consonant" },
  { roman: "z", deva: "ज़", kind: "consonant" },
  { roman: "q", deva: "क़", kind: "consonant" },
];

const VOWEL_ENTRIES: KeyEntry[] = [
  // 2-char (long) forms first
  { roman: "aa", deva: "ा", kind: "vowel-key", matraOnly: false },
  { roman: "ee", deva: "ी", kind: "vowel-key" },
  { roman: "oo", deva: "ू", kind: "vowel-key" },
  { roman: "ai", deva: "ै", kind: "vowel-key" },
  { roman: "au", deva: "ौ", kind: "vowel-key" },
  { roman: "ou", deva: "ौ", kind: "vowel-key" },
  { roman: "ow", deva: "ौ", kind: "vowel-key" },
  { roman: "Ri", deva: "ृ", kind: "vowel-key" },
  { roman: "Ru", deva: "ृ", kind: "vowel-key" },
  // 1-char
  { roman: "a", deva: "ा", kind: "vowel-key", matraOnly: false },
  { roman: "i", deva: "ि", kind: "vowel-key" },
  { roman: "u", deva: "ु", kind: "vowel-key" },
  { roman: "e", deva: "े", kind: "vowel-key" },
  { roman: "o", deva: "ो", kind: "vowel-key" },
];

/** independent (full) vowel letters for the same roman keys */
const INDEPENDENT_VOWELS: Record<string, string> = {
  aa: "आ",
  ee: "ई",
  oo: "ऊ",
  ai: "ऐ",
  au: "औ",
  ou: "औ",
  ow: "औ",
  Ri: "ऋ",
  Ru: "ऋ",
  a: "अ",
  i: "इ",
  u: "उ",
  e: "ए",
  o: "ओ",
};

/** matra for keys whose matra differs from the short key's deva */
const SPECIAL_MATRAS: Record<string, string> = {
  a: "", // inherent vowel — adds nothing after a consonant
};

const VIRAMA = "\u094D";
const ANUSVARA = "\u0902";

// longest keys first
const ALL_KEYS = [...CONSONANT_ENTRIES, ...VOWEL_ENTRIES].sort(
  (a, b) => b.roman.length - a.roman.length
);

function isDevanagariConsonant(ch: string): boolean {
  return /[\u0915-\u0939\u0958-\u095F\u0978-\u097D]/.test(ch);
}
function isDevanagariMatra(ch: string): boolean {
  return /[\u093E-\u094C\u0962\u0963]/.test(ch);
}
function isDevanagariVirama(ch: string): boolean {
  return ch === VIRAMA;
}
function isDevanagariIndependentVowel(ch: string): boolean {
  return /[\u0905-\u0914\u0960\u0961\u0972-\u0977]/.test(ch);
}
function isDevanagariAnusvaraVisarga(ch: string): boolean {
  return ch === "\u0902" || ch === "\u0903";
}
function isDevanagariNukta(ch: string): boolean {
  return ch === "\u093C";
}
function isWordSeparator(ch: string): boolean {
  return !/[\u0900-\u097F a-zA-Z]/.test(ch) || ch === " ";
}

interface EngineState {
  out: string;
  /** last emitted char is a consonant awaiting its vowel */
  pending: boolean;
  /** last emitted char was an audible vowel (matra or independent) */
  audible: boolean;
}

/** Transliterate roman phonetic text to Devanagari; Devanagari passes through. */
export function transliterateRoman(input: string): string {
  const s: EngineState = { out: "", pending: false, audible: false };

  let i = 0;
  while (i < input.length) {
    const rest = input.slice(i);

    // n/g + n/k conjuncts: "n" before g or k becomes the anusvar ं in
    // practice (गंगा, शंकर, प्रसंग) — and the g/k is processed normally
    // by the next iteration. Do NOT consume it here.
    const two = rest.slice(0, 2);
    if (/^n[gn]$/i.test(two) || /^n[k]$/i.test(two)) {
      if (s.audible) {
        s.out += ANUSVARA;
        s.pending = false;
        s.audible = true;
      } else {
        if (s.pending) s.out += VIRAMA;
        s.out += "ङ";
        s.pending = true;
        s.audible = false;
      }
      i += 1; // only the "n" is consumed; the g/k is handled next
      continue;
    }

    // longest-key match: exact-case pass first, then lowercase fallback
    let matched: KeyEntry | null = null;
    let matchedLen = 0;
    outer: for (const len of [3, 2, 1]) {
      if (rest.length < len) continue;
      const slice = rest.slice(0, len);
      for (const key of ALL_KEYS) {
        if (key.roman.length !== len) continue;
        if (slice === key.roman) {
          matched = key;
          matchedLen = len;
          break outer;
        }
      }
      for (const key of ALL_KEYS) {
        if (key.roman.length !== len) continue;
        const caseSensitive = key.roman !== key.roman.toLowerCase();
        if (!caseSensitive && slice.toLowerCase() === key.roman) {
          matched = key;
          matchedLen = len;
          break outer;
        }
      }
    }

    if (matched) {
      if (matched.kind === "consonant") {
        if (s.pending) s.out += VIRAMA;
        s.out += matched.deva;
        s.pending = true;
        s.audible = false;
      } else if (s.pending) {
        // vowel as a matra on the pending consonant ("a" = inherent, empty)
        const matra = SPECIAL_MATRAS[matched.roman] ?? matched.deva;
        s.out += matra;
        s.pending = false;
        // even the inherent "a" is an audible vowel (गंगा: "ganga" → गंग + anusvar rule)
        s.audible = true;
      } else {
        // independent vowel letter
        s.out += INDEPENDENT_VOWELS[matched.roman] ?? matched.deva.replace(/[\u093E-\u094C]/, "");
        s.pending = false;
        s.audible = true;
      }
      i += matchedLen;
      continue;
    }

    const ch = input[i];

    // Devanagari passthrough — keep the state machine in sync with it
    if (isDevanagariConsonant(ch)) {
      s.out += ch;
      s.pending = true;
      s.audible = false;
    } else if (isDevanagariNukta(ch)) {
      s.out += ch; // फ़ etc. — state unchanged (still a pending consonant)
    } else if (isDevanagariMatra(ch)) {
      s.out += ch;
      s.pending = false;
      s.audible = true;
    } else if (isDevanagariVirama(ch)) {
      s.out += ch;
      s.pending = true; // halanted consonant awaits the next consonant
      s.audible = false;
    } else if (isDevanagariIndependentVowel(ch)) {
      s.out += ch;
      s.pending = false;
      s.audible = true;
    } else if (isDevanagariAnusvaraVisarga(ch)) {
      s.out += ch;
      s.pending = false;
      s.audible = true;
    } else if (isWordSeparator(ch)) {
      s.pending = false;
      s.audible = false;
      s.out += ch;
    } else {
      // unknown letter (e.g. uppercase leftover) — literal, ends any cluster
      s.out += ch;
      s.pending = false;
      s.audible = false;
    }
    i += 1;
  }

  return s.out;
}

/* ------------------------------------------------------------------ */
/* Shared phonetic-typing toggle (site-wide, persisted in localStorage) */
/* ------------------------------------------------------------------ */

const PHONETIC_STORAGE_KEY = "sn_phonetic";
const listeners = new Set<(on: boolean) => void>();

export function getPhoneticOverride(): boolean | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(PHONETIC_STORAGE_KEY);
  if (v === "on") return true;
  if (v === "off") return false;
  return null;
}

/** Current effective mode when no explicit user override is stored. */
export function getPhoneticDefault(language: string): boolean {
  return language !== "en";
}

export function getPhoneticMode(language: string): boolean {
  return getPhoneticOverride() ?? getPhoneticDefault(language);
}

export function setPhoneticMode(on: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PHONETIC_STORAGE_KEY, on ? "on" : "off");
  listeners.forEach((fn) => fn(on));
}

export function subscribePhonetic(fn: (on: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Fuzzy Devanagari form used for SEARCH MATCHING (not display):
 * anusvar → न (सिंधू ≈ सिन्धु), then strips matras / virama / nukta
 * (स्वामी ≈ स्वमि ≈ स्वम) and lowercases. Makes phonetic-typed queries
 * match the differently-spelled titles in the database.
 */
export function devaNormalize(s: string): string {
  return s
    .replace(/\u0902/g, "न")
    .replace(/[\u093E-\u094C\u0962\u0963\u094D\u093C]/g, "")
    .toLowerCase()
    .trim();
}
