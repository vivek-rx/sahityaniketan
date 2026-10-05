"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoBrandProps {
  className?: string;
  variant?: "ams" | "gajraj";
  showSubheading?: boolean;
  showIcon?: boolean;
  colorScheme?: "light" | "dark" | "white";
  align?: "left" | "center";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function LogoBrand({
  className,
  variant = "gajraj",
  showSubheading = true,
  showIcon = false,
  colorScheme = "light",
  align = "left",
  size = "xl",
}: LogoBrandProps) {
  const isDark = colorScheme === "dark";
  const isWhite = colorScheme === "white";
  const isCenter = align === "center";

  // Responsive typography sizing maps - pure authentic Marathi calligraphy
  const gajrajSizeMap = {
    sm: "text-[14px] sm:text-[16px]",
    md: "text-[16px] sm:text-lg lg:text-[20px]",
    lg: "text-[18px] sm:text-xl lg:text-[24px]",
    xl: "text-[18px] min-[360px]:text-[20px] min-[400px]:text-[23px] sm:text-[28px] md:text-[32px] lg:text-[36px]",
    "2xl": "text-[20px] min-[360px]:text-[23px] min-[400px]:text-[26px] min-[440px]:text-[30px] sm:text-[34px] md:text-[40px] lg:text-[44px]",
  };

  const subSizeMap = {
    sm: "text-[9px] sm:text-[10px]",
    md: "text-[10px] sm:text-[11px]",
    lg: "text-[11px] sm:text-[12px]",
    xl: "text-[10px] min-[360px]:text-[11px] min-[400px]:text-[12px] sm:text-[13px] md:text-[14px]",
    "2xl": "text-[11px] min-[360px]:text-[12px] min-[400px]:text-[13px] sm:text-[14px] md:text-[16px]",
  };

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex transition-all focus:outline-none select-none",
        isCenter ? "flex-col items-center justify-center text-center mx-auto" : "flex-col items-start text-left",
        className
      )}
      aria-label="साहित्य निकेतन ग्रंथालय — एक हृदय हो भारत जननी"
    >
      {/* Hidden for accessibility & SEO indexing in authentic Marathi */}
      <span className="sr-only">साहित्य निकेतन ग्रंथालय</span>

      {/* Pure authentic Marathi typography branding without circular graphic */}
      <motion.div
        whileHover={{ scale: 1.01, y: -0.5 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative flex flex-col transition-all",
          isCenter ? "items-center justify-center text-center" : "items-start text-left"
        )}
      >
        {/* Primary Brand Typography — Authentic Devanagari 'साहित्य निकेतन ग्रंथालय' */}
        <span
          aria-hidden="true"
          className={cn(
            variant === "ams" ? "font-ams" : "font-gajraj",
            "leading-tight tracking-normal whitespace-nowrap transition-all duration-300",
            gajrajSizeMap[size],
            isWhite
              ? "text-[#FFFDF8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] group-hover:text-[#F3ECE3]"
              : isDark
                ? "text-[#FAF2E8] group-hover:text-[#E5B869]"
                : "text-[#800020] dark:text-[#FAF2E8] group-hover:text-[#66001A] dark:group-hover:text-[#E5B869] drop-shadow-[0_1px_2px_rgba(128,0,32,0.10)]"
          )}
        >
          साहित्य निकेतन ग्रंथालय
        </span>

        {/* Sacred Motto Subheading */}
        {showSubheading && (
          <div
            className={cn(
              "flex items-center gap-1.5 sm:gap-2.5 mt-1 sm:mt-1.5 leading-tight whitespace-nowrap transition-all duration-300",
              isCenter ? "justify-center text-center" : "justify-start text-left"
            )}
          >
            {isCenter && (
              <span className="hidden sm:inline-block w-3 sm:w-6 h-[1px] bg-[#B8860B]/40" />
            )}

            <span
              className={cn(
                "font-marathi-heading font-medium tracking-wider transition-all duration-300",
                subSizeMap[size],
                isWhite
                  ? "text-[#E5B869] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] group-hover:text-[#F3D59B]"
                  : isDark
                    ? "text-[#E5B869] group-hover:text-[#F3D59B]"
                    : "text-[#B8860B] dark:text-[#E5B869] group-hover:text-[#8C6508] dark:group-hover:text-[#F3D59B]"
              )}
            >
              || एक हृदय हो भारत जननी ||
            </span>

            {isCenter && (
              <span className="hidden sm:inline-block w-3 sm:w-6 h-[1px] bg-[#B8860B]/40" />
            )}
          </div>
        )}
      </motion.div>
    </Link>
  );
}
