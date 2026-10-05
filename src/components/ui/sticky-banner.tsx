"use client";
import React, { SVGProps, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyBannerProps {
  className?: string;
  children: React.ReactNode;
  hideOnScroll?: boolean;
  storageKey?: string;
  onClose?: () => void;
}

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
  storageKey = "sahitya_sticky_banner_closed",
  onClose,
}: StickyBannerProps) => {
  const [open, setOpen] = useState(true);
  const [hasDismissed, setHasDismissed] = useState(false);
  const { scrollY } = useScroll();

  // Restore dismiss state from session storage
  useEffect(() => {
    if (typeof window !== "undefined" && storageKey) {
      try {
        const isClosed = sessionStorage.getItem(storageKey);
        if (isClosed === "true") {
          setHasDismissed(true);
          setOpen(false);
        }
      } catch {
        // Fallback for private modes
      }
    }
  }, [storageKey]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hasDismissed) return;
    if (hideOnScroll) {
      if (latest > 40) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  });

  const handleClose = () => {
    setHasDismissed(true);
    setOpen(false);
    if (typeof window !== "undefined" && storageKey) {
      try {
        sessionStorage.setItem(storageKey, "true");
      } catch {
        // Fallback
      }
    }
    onClose?.();
  };

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="sticky-banner-container"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.35, ease: [0.33, 1, 0.68, 1] },
              opacity: { duration: 0.25, ease: "easeInOut" },
            },
          }}
          className="w-full overflow-hidden"
        >
          <div
            className={cn(
              "relative flex min-h-12 sm:min-h-14 w-full items-center justify-center px-4 py-2 sm:py-2.5",
              className
            )}
          >
            {children}

            <button
              type="button"
              className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 active:scale-90 transition-all cursor-pointer text-white/80 hover:text-white"
              onClick={handleClose}
              aria-label="सूचना बंद करा"
              title="सूचना बंद करा"
            >
              <CloseIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
