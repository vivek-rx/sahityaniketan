"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BobbingDots } from "@/components/ui/bobbing-dots";

export interface MotionSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  pendingLabel?: string;
  successLabel?: string;
  isPending?: boolean;
  isSuccess?: boolean;
  variant?: "primary" | "dark" | "gold";
  fullWidth?: boolean;
  buttonColor?: string;
  textColor?: string;
}

/**
 * Exact replica of Matthias Ölschlegel's "Motion Submit Button"
 * Framer Module: https://framer.com/m/Motion-Submit-Button-UpZfHQ.js@hKJUiQkMbmeuLAV0aRN5
 * 
 * Features:
 * - Reactive envelope icon (paper lifts when inputs are filled)
 * - Mailbox & envelope postal sequence on hover / focus
 * - Morphing pending state with progress indicator
 * - Animated SVG draw checkmark and sliding success panel
 */
export function MotionSubmitButton({
  label = "संदेश पाठवा",
  pendingLabel = "पाठवत आहे...",
  successLabel = "धन्यवाद! संदेश प्राप्त झाला",
  isPending = false,
  isSuccess = false,
  variant = "primary",
  fullWidth = false,
  className,
  disabled,
  onClick,
  ...props
}: MotionSubmitButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Monitor form input presence to trigger the envelope's letter lifting & flap closing
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const form = btn.closest("form");
    if (!form) return;

    const checkForm = () => {
      const elements = Array.from(form.elements) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[];
      const inputs = elements.filter(
        (el) => !el.disabled && !["hidden", "submit", "button", "reset"].includes(el.type)
      );
      const filled = inputs.some((el) => {
        if ("checked" in el && (el.type === "checkbox" || el.type === "radio")) {
          return el.checked;
        }
        return el.value && el.value.trim().length > 0;
      });
      setHasInput(filled);
      setIsFormValid(filled && inputs.every((el) => el.disabled || el.validity.valid));
    };

    checkForm();
    form.addEventListener("input", checkForm);
    form.addEventListener("change", checkForm);
    return () => {
      form.removeEventListener("input", checkForm);
      form.removeEventListener("change", checkForm);
    };
  }, []);

  const isActive = (isHovered || isFocused || isPending) && !isSuccess;

  // Variant styling
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#881337] via-[#991B1B] to-[#7F1D1D] hover:from-[#78122F] hover:to-[#681010] text-white border border-[#B91C1C]/40 shadow-[0_4px_16px_rgba(153,27,27,0.35)]",
    dark:
      "bg-[#181614] hover:bg-[#262320] text-white border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
    gold:
      "bg-gradient-to-r from-[#D4A017] via-[#C89611] to-[#B38308] hover:from-[#C89611] hover:to-[#9E7204] text-[#1E0D0D] font-extrabold border border-[#E5B869]/50 shadow-[0_4px_16px_rgba(212,160,23,0.35)]",
  }[variant];

  return (
    <motion.button
      ref={buttonRef}
      type="submit"
      disabled={disabled || isPending || isSuccess}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={onClick}
      whileHover={{ scale: disabled || isPending || isSuccess ? 1 : 1.015 }}
      whileTap={{ scale: disabled || isPending || isSuccess ? 1 : 0.97 }}
      {...(props as any)}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-full text-xs sm:text-sm font-bold font-marathi-body transition-all select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75",
        variantStyles,
        fullWidth ? "w-full" : "min-w-[170px]",
        className
      )}
      {...props}
    >
      {/* 1. Animated Postal Icon */}
      <PostalButtonIcon
        active={isActive}
        filled={hasInput}
        ready={isFormValid}
        checked={isSuccess}
      />

      {/* 2. Text Label */}
      <span className="relative z-10 font-bold transition-all inline-flex items-center gap-2">
        {isPending && (
          <BobbingDots
            size="sm"
            className={variant === "gold" ? "text-[#1E0D0D] shrink-0" : "text-white shrink-0"}
            duration={0.75}
          />
        )}
        <span>{isPending ? pendingLabel : label}</span>
      </span>

      {/* 3. Success Sliding Panel */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center gap-2 px-4 bg-[#2E7D32] text-white rounded-full font-bold shadow-inner"
          >
            <svg
              className="w-4 h-4 shrink-0 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="truncate text-xs sm:text-sm">{successLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Interactive Postal Icon from Matthias Ölschlegel's Framer Component
 * SVG loops into an animated mailbox and envelope depositing sequence on hover/focus.
 */
function PostalButtonIcon({
  active,
  filled,
  ready,
  checked,
}: {
  active: boolean;
  filled: boolean;
  ready: boolean;
  checked: boolean;
}) {
  const uid = React.useId().replace(/:/g, "");
  const loop = {
    duration: 2.65,
    times: [0, 0.14, 0.26, 0.6, 0.72, 0.88, 1],
    repeat: Infinity,
    ease: "easeInOut" as const,
  };
  const rest = { duration: 0.18 };

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 2 32 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible pointer-events-none shrink-0"
    >
      <defs>
        <clipPath id={`postal-icon-entry-${uid}`}>
          <rect x="0" y="10" width="18.2" height="14" />
        </clipPath>
      </defs>

      {/* Rest State Envelope */}
      <motion.g
        initial={false}
        animate={{ opacity: active || checked ? 0 : 1, scale: active ? 0.85 : 1 }}
        transition={rest}
        style={{ transformOrigin: "16px 16px" }}
      >
        <g transform="translate(0 -3)">
          <rect x="5" y="12" width="22" height="14" rx="3" />
          {/* Peeking Letter inside envelope */}
          <motion.path
            d="M11 10V7h10v3M14 9h4"
            initial={false}
            animate={{ y: filled ? 0 : 3, opacity: filled ? 1 : 0 }}
            transition={{ duration: 0.24 }}
          />
          {/* Flap of envelope */}
          <motion.path
            initial={false}
            animate={{ d: ready ? "M6 13l10 4 10-4" : "M6 13l10 7 10-7" }}
            transition={{ duration: 0.25 }}
          />
        </g>
      </motion.g>

      {/* Active Mailbox Sequence on Hover / Focus */}
      <motion.g
        initial={false}
        animate={{ opacity: active && !checked ? 1 : 0 }}
        transition={rest}
      >
        <path d="M18 21h12v-9a4.5 4.5 0 0 0-4.5-4.5H22a4 4 0 0 0-4 4.5M22 7.5c2.5 0 4 1.8 4 4.5v9M24 21v6M21 27h6" />
        {/* Mailbox flag */}
        <motion.path
          d="M27 17V5h4v4h-4"
          initial={false}
          animate={{ rotate: active ? [-65, -65, -65, -65, 0, 0, -65] : -65 }}
          transition={active ? loop : rest}
          style={{ transformOrigin: "27px 17px" }}
        />
        {/* Sliding Envelope */}
        <g clipPath={`url(#postal-icon-entry-${uid})`}>
          <motion.g
            initial={false}
            animate={{
              x: active ? [0, 0, 1, 18, 18, 18, 0] : 0,
              opacity: active ? [0, 1, 1, 1, 0, 0, 0] : 0,
            }}
            transition={active ? loop : rest}
          >
            <rect x="1" y="13.5" width="10" height="7" rx="1.2" />
            <path d="m2 14.5 4 3 4-3" strokeWidth="1.4" />
          </motion.g>
        </g>
        {/* Mailbox slot door */}
        <motion.path
          initial={false}
          animate={{
            d: active
              ? [
                  "M18 12L18 21",
                  "M10 23L18 21",
                  "M10 23L18 21",
                  "M10 23L18 21",
                  "M18 12L18 21",
                  "M18 12L18 21",
                  "M18 12L18 21",
                ]
              : "M18 12L18 21",
          }}
          transition={active ? loop : rest}
        />
      </motion.g>

      {/* Success checkmark */}
      <motion.path
        d="m8 16 5 5L25 9"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}
