"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/language-context";
import { transliterateRoman } from "@/lib/transliterate";

interface PhoneticInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  /** controlled value (already-transliterated text) */
  value: string;
  onValueChange: (v: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * Search input with phonetic auto-typing: while the site language is
 * Marathi/Hindi, roman keystrokes are transliterated to Devanagari live
 * ("swaami" → स्वामी). English mode types plain Latin. Already-Devanagari
 * text (system IME or paste) passes through untouched.
 *
 * The raw roman text is kept in a ref alongside the displayed value and the
 * WHOLE raw string is re-transliterated on every keystroke. This is what
 * makes multi-char keys ("aa", "chh", "ksh", "dny"...) work: per-char
 * transliteration of already-converted output would lose them ("swaami"
 * typed letter-by-letter would otherwise render as स्व्मि instead of स्वामी).
 */
export function PhoneticInput({
  value,
  onValueChange,
  inputRef,
  ...rest
}: PhoneticInputProps) {
  const { language } = useLanguage();
  const phoneticOn = language !== "en";

  const rawRef = useRef("");
  const displayRef = useRef("");

  // External value changes (form reset, clear button, parent state) resync
  // the raw buffer so the next keystroke diffs against the actual content.
  useEffect(() => {
    if (value !== displayRef.current) {
      rawRef.current = value;
      displayRef.current = value;
    }
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    const prevDisplay = displayRef.current;
    const prevRaw = rawRef.current;

    if (next.startsWith(prevDisplay)) {
      // append-only typing (the normal case): extend the raw buffer with
      // the freshly typed roman/Devanagari characters
      rawRef.current = prevRaw + next.slice(prevDisplay.length);
    } else if (prevDisplay.startsWith(next) && next.length < prevDisplay.length) {
      // backspace/delete at the tail: drop roughly as many raw characters
      // as were removed from the display (1 raw char ≈ 1 visible glyph)
      rawRef.current = prevRaw.slice(
        0,
        Math.max(0, prevRaw.length - (prevDisplay.length - next.length))
      );
    } else {
      // mid-string edit, paste or IME composition: treat the field content
      // itself as the new raw text (Devanagari passes through idempotently)
      rawRef.current = next;
    }

    const out = phoneticOn ? transliterateRoman(rawRef.current) : rawRef.current;
    displayRef.current = out;
    onValueChange(out);
  }

  return (
    <input
      {...rest}
      ref={inputRef}
      type="text"
      lang={language}
      value={value}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      autoComplete="off"
      onChange={handleChange}
    />
  );
}
