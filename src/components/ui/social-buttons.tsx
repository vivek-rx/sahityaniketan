"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export interface SocialButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  leftSection?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

// ── Icons ──
export function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.125-.533-1.614-.672-2.651-2.316-2.73-2.423-.081-.107-.648-.864-.648-1.649 0-.786.409-1.173.555-1.332.146-.16.32-.2.426-.2.106 0 .213.002.306.007.098.005.23-.037.36.275.133.32.453 1.107.493 1.187.04.08.066.174.013.28-.053.107-.08.174-.16.267-.08.093-.168.208-.24.28-.08.08-.163.167-.07.327.093.16.415.685.89 1.108.613.546 1.13.715 1.29.795.16.08.253.067.346-.04.093-.107.4-466.506-.626.107-.16.213-.133.36-.08.146.053.933.44 1.093.52.16.08.267.12.307.187.04.066.04.386-.104.792zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ── Branded Mantine-style Social Buttons ──

export function FacebookButton({
  children,
  className,
  leftSection = <FacebookIcon className="w-4 h-4 fill-white" />,
  href = "https://www.facebook.com/p/%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF-%E0%A4%A8%E0%A4%BF%E0%A4%95%E0%A5%87%E0%A4%A4%E0%A4%A8-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%82%E0%A4%A5%E0%A4%BE%E0%A4%B2%E0%A4%AF-%E0%A4%85%E0%A4%82%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A5%8B%E0%A4%97%E0%A4%BE%E0%A4%88-100083041525325/",
  ...props
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-[#1877F2] hover:bg-[#166FE5] shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer w-full group",
        className
      )}
      {...props}
    >
      <span className="shrink-0 group-hover:scale-110 transition-transform">{leftSection}</span>
      <span className="truncate">{children || "फेसबुकवर फॉलो करा"}</span>
    </a>
  );
}

export function YouTubeButton({
  children,
  className,
  leftSection = <YouTubeIcon className="w-4 h-4 fill-white" />,
  href = "https://www.youtube.com/@sahityaniketan",
  ...props
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-[#E62117] hover:bg-[#CC181E] shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer w-full group",
        className
      )}
      {...props}
    >
      <span className="shrink-0 group-hover:scale-110 transition-transform">{leftSection}</span>
      <span className="truncate">{children || "युट्यूब चॅनेल पहा"}</span>
    </a>
  );
}

export function WhatsAppButton({
  children,
  className,
  leftSection = <WhatsAppIcon className="w-4 h-4 fill-white" />,
  href = "https://wa.me/919422241628?text=नमस्कार,%20साहित्य%20निकेतन%20ग्रंथालयाबद्दल%20माहिती%20हवी%20आहे.",
  ...props
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer w-full group",
        className
      )}
      {...props}
    >
      <span className="shrink-0 group-hover:scale-110 transition-transform">{leftSection}</span>
      <span className="truncate">{children || "व्हॉट्सॲप संपर्क"}</span>
    </a>
  );
}

export function InstagramButton({
  children,
  className,
  leftSection = <InstagramIcon className="w-4 h-4 text-white" />,
  href = "https://www.instagram.com/sahityaniketan",
  ...props
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer w-full group",
        className
      )}
      {...props}
    >
      <span className="shrink-0 group-hover:scale-110 transition-transform">{leftSection}</span>
      <span className="truncate">{children || "इन्स्टाग्रामवर जोडा"}</span>
    </a>
  );
}

export function TwitterButton({
  children,
  className,
  leftSection = <TwitterIcon className="w-4 h-4 fill-white" />,
  href = "https://twitter.com/sahityaniketan",
  ...props
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-[#000000] hover:bg-zinc-800 border border-zinc-700/60 shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer w-full group",
        className
      )}
      {...props}
    >
      <span className="shrink-0 group-hover:scale-110 transition-transform">{leftSection}</span>
      <span className="truncate">{children || "Follow on X (Twitter)"}</span>
    </a>
  );
}

/**
 * Composite SocialButtons component for footer or contact page with automatic multilingual text
 */
export function SocialButtons({ className }: { className?: string }) {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <FacebookButton>
        {isEn ? "Follow on Facebook" : isHi ? "फेसबुक पर जुड़ें" : "फेसबुकवर फॉलो करा"}
      </FacebookButton>
      <YouTubeButton>
        {isEn ? "Watch on YouTube" : isHi ? "यूट्यूब व्याख्यान" : "युट्यूब चॅनेल पहा"}
      </YouTubeButton>
      <WhatsAppButton>
        {isEn ? "Chat on WhatsApp" : isHi ? "व्हाट्सएप पर संपर्क" : "व्हॉट्सॲपवर संपर्क करा"}
      </WhatsAppButton>
      <InstagramButton>
        {isEn ? "Follow on Instagram" : isHi ? "इंस्टाग्राम पर जुड़ें" : "इन्स्टाग्रामवर जोडा"}
      </InstagramButton>
    </div>
  );
}

export default SocialButtons;
