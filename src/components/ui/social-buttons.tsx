"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import classes from "./SocialButtons.module.css";

// ── Types inspired by Mantine ──
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftSection?: React.ReactNode;
  variant?: "default" | "filled" | "outline" | "subtle";
  component?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
  p?: string;
}

// ── Generic Mantine-like Group Component ──
export function Group({
  children,
  justify = "center",
  className,
  ...props
}: GroupProps) {
  const justifyClass =
    justify === "center"
      ? "justify-center"
      : justify === "flex-start"
      ? "justify-start"
      : justify === "flex-end"
      ? "justify-end"
      : "justify-between";

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2.5", justifyClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Generic Mantine-like Button Component ──
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      leftSection,
      variant = "filled",
      component = "button",
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-start gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer group shadow-2xs select-none";

    const variantClasses =
      variant === "default"
        ? "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-100/80 dark:hover:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-700 shadow-xs"
        : "text-white";

    const content = (
      <>
        {leftSection && (
          <span className="shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            {leftSection}
          </span>
        )}
        <span className="truncate">{children}</span>
      </>
    );

    if (component === "a" || href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={cn(baseClasses, variantClasses, className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cn(baseClasses, variantClasses, className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "MantineButton";

// ── Official SVG Icons ──

export function GoogleIcon({ className = "w-4 h-4", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "w-4 h-4", size = 16, color = "currentColor" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-4 h-4", size = 16, color = "#00ACEE" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-4 h-4", size = 16, color = "currentColor" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-4 h-4", size = 16, color = "currentColor" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.125-.533-1.614-.672-2.651-2.316-2.73-2.423-.081-.107-.648-.864-.648-1.649 0-.786.409-1.173.555-1.332.146-.16.32-.2.426-.2.106 0 .213.002.306.007.098.005.23-.037.36.275.133.32.453 1.107.493 1.187.04.08.066.174.013.28-.053.107-.08.174-.16.267-.08.093-.168.208-.24.28-.08.08-.163.167-.07.327.093.16.415.685.89 1.108.613.546 1.13.715 1.29.795.16.08.253.067.346-.04.093-.107.4-466.506-.626.107-.16.213-.133.36-.08.146.053.933.44 1.093.52.16.08.267.12.307.187.04.066.04.386-.104.792zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ── Specific Mantine-style Social Buttons matching user snippet ──

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return <Button leftSection={<GoogleIcon size={16} />} variant="default" {...props} />;
}

export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      leftSection={<FacebookIcon size={16} color="#FFFFFF" />}
      className={cn(classes.facebookButton, props.className)}
      {...props}
    />
  );
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<"a">) {
  return (
    <Button
      component="a"
      leftSection={<TwitterIcon size={16} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}

export function YouTubeButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      {...props}
      leftSection={<YouTubeIcon size={16} color="#FFFFFF" />}
      className={cn(classes.youtubeButton, props.className)}
    />
  );
}

export function WhatsAppButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      {...props}
      leftSection={<WhatsAppIcon size={16} color="#FFFFFF" />}
      className={cn(classes.whatsappButton, props.className)}
    />
  );
}

export function InstagramButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      {...props}
      leftSection={<InstagramIcon size={16} />}
      className={cn(
        "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white",
        props.className
      )}
    />
  );
}

/**
 * Composite SocialButtons component for footer with responsive layout and multilingual support
 */
export function SocialButtons({ className }: { className?: string }) {
  const { language } = useLanguage();
  const isEn = language === "en";
  const isHi = language === "hi";

  const labels = {
    facebook: isEn ? "Follow on Facebook" : isHi ? "फेसबुक पर जुड़ें" : "फेसबुकवर फॉलो करा",
    youtube: isEn ? "Watch on YouTube" : isHi ? "यूट्यूब व्याख्यान" : "युट्यूब चॅनेल पहा",
    whatsapp: isEn ? "Chat on WhatsApp" : isHi ? "व्हाट्सएप पर संपर्क" : "व्हॉट्सॲपवर संपर्क करा",
    instagram: isEn ? "Follow on Instagram" : isHi ? "इंस्टाग्राम पर जुड़ें" : "इन्स्टाग्रामवर जोडा",
    twitter: isEn ? "Follow on Twitter" : isHi ? "ट्विटर पर फॉलो करें" : "ट्विटरवर फॉलो करा",
    google: isEn ? "Continue with Google" : isHi ? "गूगल से जारी रखें" : "गुगलने सुरू करा",
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* Primary Community Links (Official Library Channels) */}
      <FacebookButton
        component="a"
        href="https://www.facebook.com/p/%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF-%E0%A4%A8%E0%A4%BF%E0%A4%95%E0%A5%87%E0%A4%A4%E0%A4%A8-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%82%E0%A4%A5%E0%A4%BE%E0%A4%B2%E0%A4%AF-%E0%A4%85%E0%A4%82%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A5%8B%E0%A4%97%E0%A4%BE%E0%A4%88-100083041525325/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-start text-xs sm:text-[13px]"
      >
        {labels.facebook}
      </FacebookButton>

      <WhatsAppButton
        component="a"
        href="https://wa.me/919422241628?text=नमस्कार,%20साहित्य%20निकेतन%20ग्रंथालयाबद्दल%20माहिती%20हवी%20आहे."
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-start text-xs sm:text-[13px]"
      >
        {labels.whatsapp}
      </WhatsAppButton>

      <YouTubeButton
        component="a"
        href="https://www.youtube.com/@sahityaniketan"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-start text-xs sm:text-[13px]"
      >
        {labels.youtube}
      </YouTubeButton>

      <InstagramButton
        component="a"
        href="https://www.instagram.com/sahityaniketan"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-start text-xs sm:text-[13px]"
      >
        {labels.instagram}
      </InstagramButton>

      <TwitterButton
        href="https://twitter.com/sahityaniketan"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-start text-xs sm:text-[13px]"
      >
        {labels.twitter}
      </TwitterButton>
    </div>
  );
}

export default SocialButtons;
