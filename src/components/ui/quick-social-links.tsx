"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SocialLinkItem {
  id: string;
  label: string;
  url: string;
  color?: string;
  iconBg?: string;
  svg: React.ReactNode;
}

export interface QuickSocialLinksProps {
  socials?: SocialLinkItem[];
  hoverScale?: number;
  iconSize?: number;
  className?: string;
}

/**
 * Exact replica of Framer "Quick_Social_Links" component:
 * https://framer.com/m/Quick-Social-Links-y72bgQ.js@i1afEoSdE5TZN0Z3CpXc
 * 
 * Features:
 * - Bottom-anchored spring hover scale (transformOrigin: 50% 100%)
 * - Spring-animated floating pill label tooltip with directional offset
 * - High-fidelity SVGs with brand-colored glowing backdrops
 */
export function QuickSocialLinks({
  socials = DEFAULT_SOCIALS,
  hoverScale = 1.35,
  iconSize = 20,
  className,
}: QuickSocialLinksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 p-1.5 rounded-full select-none",
        className
      )}
    >
      {socials.map((social, index) => {
        const isHovered = hoveredIndex === index;

        return (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            className="relative flex flex-col items-center justify-end w-10 h-10 no-underline cursor-pointer"
            style={{
              transformOrigin: "bottom center",
              zIndex: isHovered ? 20 : 1,
            }}
          >
            {/* 1. Animated Floating Pill Label Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <div
                  className="absolute left-1/2 bottom-full pointer-events-none z-30"
                  style={{
                    transform: "translateX(-50%)",
                    transformOrigin: "bottom center",
                  }}
                >
                  <motion.div
                    initial={{ y: 6, opacity: 0, scale: 0.8 }}
                    animate={{ y: -6, opacity: 1, scale: 1 }}
                    exit={{ y: 6, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold font-marathi-body text-white whitespace-nowrap shadow-xl border border-white/20"
                    style={{
                      backgroundColor: social.color || "#1F1A18",
                      boxShadow: `0 4px 14px -2px ${social.color ? `${social.color}88` : "rgba(0,0,0,0.4)"}`,
                    }}
                  >
                    {social.label}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* 2. Scaled Icon Container (Spring Anchored to Bottom) */}
            <motion.div
              animate={{ scale: isHovered ? hoverScale : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-center w-full h-full rounded-full transition-shadow duration-200 border border-white/15"
              style={{
                backgroundColor: social.iconBg || "rgba(255, 255, 255, 0.12)",
                boxShadow: isHovered
                  ? `0 8px 20px -2px ${social.color ? `${social.color}66` : "rgba(0,0,0,0.3)"}`
                  : "0 2px 6px rgba(0,0,0,0.15)",
                transformOrigin: "50% 100%",
              }}
            >
              <div
                style={{ width: iconSize, height: iconSize }}
                className="flex items-center justify-center text-white"
              >
                {social.svg}
              </div>
            </motion.div>
          </motion.a>
        );
      })}
    </div>
  );
}

export const DEFAULT_SOCIALS: SocialLinkItem[] = [
  {
    id: "facebook",
    label: "फेसबुक (Facebook)",
    url: "https://www.facebook.com/p/%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF-%E0%A4%A8%E0%A4%BF%E0%A4%95%E0%A5%87%E0%A4%A4%E0%A4%A8-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%82%E0%A4%A5%E0%A4%BE%E0%A4%B2%E0%A4%AF-%E0%A4%85%E0%A4%82%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A5%8B%E0%A4%97%E0%A4%BE%E0%A4%88-100083041525325/",
    color: "#1877F2",
    iconBg: "rgba(24, 119, 242, 0.22)",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "व्हॉट्सॲप (WhatsApp)",
    url: "https://wa.me/919422241628?text=नमस्कार,%20साहित्य%20निकेतन%20ग्रंथालयाबद्दल%20माहिती%20हवी%20आहे.",
    color: "#25D366",
    iconBg: "rgba(37, 211, 102, 0.22)",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.125-.533-1.614-.672-2.651-2.316-2.73-2.423-.081-.107-.648-.864-.648-1.649 0-.786.409-1.173.555-1.332.146-.16.32-.2.426-.2.106 0 .213.002.306.007.098.005.23-.037.36.275.133.32.453 1.107.493 1.187.04.08.066.174.013.28-.053.107-.08.174-.16.267-.08.093-.168.208-.24.28-.08.08-.163.167-.07.327.093.16.415.685.89 1.108.613.546 1.13.715 1.29.795.16.08.253.067.346-.04.093-.107.4-466.506-.626.107-.16.213-.133.36-.08.146.053.933.44 1.093.52.16.08.267.12.307.187.04.066.04.386-.104.792zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "युट्यूब व्याख्याने (YouTube)",
    url: "https://www.youtube.com/results?search_query=साहित्य+निकेतन+अंबाजोगाई",
    color: "#FF0000",
    iconBg: "rgba(255, 0, 0, 0.22)",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "इन्स्टाग्राम (Instagram)",
    url: "https://www.instagram.com/explore/tags/अंबाजोगाई/",
    color: "#E1306C",
    iconBg: "rgba(225, 48, 108, 0.22)",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "ईमेल (Email)",
    url: "mailto:contact@sahityaniketan.org",
    color: "#D9531E",
    iconBg: "rgba(217, 83, 30, 0.22)",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: "maps",
    label: "नकाशा व स्थान (Google Maps)",
    url: "https://maps.google.com/?q=Sahitya+Niketan+Granthalaya+Ambajogai+Beed",
    color: "#34A853",
    iconBg: "rgba(52, 168, 83, 0.22)",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
];
