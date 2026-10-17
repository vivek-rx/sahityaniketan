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

export function DiscordIcon({ className = "w-4 h-4", size = 16, color = "currentColor" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function GithubIcon({ className = "w-4 h-4", size = 16, color = "currentColor" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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

export function DiscordButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      className={cn(classes.discordButton, props.className)}
      leftSection={<DiscordIcon size={16} color="#FFFFFF" />}
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

export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      {...props}
      leftSection={<GithubIcon size={16} color="#FFFFFF" />}
      className={cn(classes.githubButton, props.className)}
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
    twitter: isEn ? "Follow on Twitter" : isHi ? "ट्विटर पर फॉलो करें" : "ट्विटरवर फॉलो करा",
    google: isEn ? "Continue with Google" : isHi ? "गूगल से जारी रखें" : "गुगलने सुरू करा",
    github: isEn ? "View on GitHub" : isHi ? "गिटहब पर देखें" : "गिटहबवर पहा",
    discord: isEn ? "Join Discord" : isHi ? "डिस्कॉर्ड से जुड़ें" : "डिस्कॉर्ड कम्युनिटी",
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

      <TwitterButton
        href="https://twitter.com/sahityaniketan"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full justify-start text-xs sm:text-[13px]"
      >
        {labels.twitter}
      </TwitterButton>

      {/* Developer & Cloud Community Row (Mantine styled) */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200/60 dark:border-stone-800/60 mt-1">
        <GithubButton
          component="a"
          href="https://github.com/vivek-rx/sahityaniketan"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full justify-center px-2 py-1.5 text-[11px]"
        >
          {labels.github}
        </GithubButton>
        <DiscordButton
          component="a"
          href="https://discord.gg"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full justify-center px-2 py-1.5 text-[11px]"
        >
          {labels.discord}
        </DiscordButton>
      </div>
    </div>
  );
}

export default SocialButtons;
