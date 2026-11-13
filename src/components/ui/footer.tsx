"use client";

import React, { useState, type FC, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CrowdCanvas } from '@/components/ui/skiper-ui/skiper39';
import { SocialButtons } from '@/components/ui/social-buttons';

/**
 * Props for the Footer component.
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** The source URL for the company logo. */
  logoSrc: string;
  /** The name of the company, displayed next to the logo. */
  companyName?: string;
  /** A short description of the company. */
  description?: string;
  /** An array of objects for generating useful links. */
  usefulLinks?: { label: string; href: string }[];
  /** The title for the newsletter subscription section. */
  newsletterTitle?: string;
  /** Async function to handle email subscription. Should return `true` for success and `false` for failure. */
  onSubscribe?: (email: string, consent: boolean) => Promise<boolean>;
}

/**
 * A responsive and theme-adaptive footer component with a newsletter subscription form.
 * Designed following shadcn/ui and 21st.dev best practices.
 */
export const Footer: FC<FooterProps> = ({
  logoSrc,
  companyName = 'Sahitya Niketan Library',
  description = 'Preserving knowledge across generations.',
  usefulLinks = [
    { label: 'Home', href: '/' },
    { label: 'Catalogue', href: '/catalogue' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Membership', href: '/membership' },
  ],
  newsletterTitle = 'Subscribe our newsletter',
  onSubscribe,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !onSubscribe || isSubmitting || !consent) return;

    setIsSubmitting(true);
    const success = await onSubscribe(email, consent);

    setSubscriptionStatus(success ? 'success' : 'error');
    setIsSubmitting(false);

    if (success) {
      setEmail('');
      setConsent(false);
    }

    // Reset the status message after 3 seconds
    setTimeout(() => {
      setSubscriptionStatus('idle');
    }, 3000);
  };

  return (
    <footer className={cn('relative overflow-hidden bg-zinc-50/90 dark:bg-[#120B0D]/95 text-foreground border-t border-zinc-200 dark:border-zinc-800/80 font-marathi-body transition-colors select-none', className)} {...props}>
      {/* ── Aesthetic Animated Crowd Canvas Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="absolute bottom-0 h-full w-full opacity-[0.22] dark:opacity-[0.14] grayscale contrast-125 dark:invert"
        />
        {/* Soft architectural gradient vignette so readers blend naturally into the library floor */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-zinc-50/50 to-zinc-50 dark:via-[#120B0D]/60 dark:to-[#120B0D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_35%,rgba(128,0,32,0.03)_100%)] dark:bg-[radial-gradient(ellipse_at_top,transparent_35%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Company Info */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt={`${companyName} Logo`} className="h-10 w-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-2xs" />
            <span className="text-xl font-bold font-gajraj text-stone-900 dark:text-stone-100">{companyName}</span>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-marathi-body">{description}</p>
        </div>

        {/* Useful Links */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-bold font-marathi-heading text-[#800020] dark:text-[#E5B869]">उपयुक्त दुवे / Navigation</h3>
          <ul className="space-y-2">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-stone-600 dark:text-stone-400 font-medium transition-colors hover:text-[#800020] dark:hover:text-[#E5B869]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us / Social Buttons */}
        <div className="md:justify-self-center w-full max-w-[280px]">
          <h3 className="mb-4 text-base font-bold font-marathi-heading text-[#800020] dark:text-[#E5B869]">सोशल मीडिया / Social</h3>
          <SocialButtons />
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-base font-bold font-marathi-heading text-[#800020] dark:text-[#E5B869]">{newsletterTitle}</h3>
          <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
            <div className="relative">
              <Input
                type="email"
                placeholder="ईमेल पत्ता प्रविष्ट करा..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                required
                aria-label="Email for newsletter"
                className="pr-28 bg-white/80 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-700"
              />
              <Button
                type="submit"
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                className="absolute right-0 top-0 h-full rounded-l-none px-4 bg-[#800020] hover:bg-[#66001A] text-white font-bold cursor-pointer"
              >
                {isSubmitting ? 'नोंदणी...' : 'सदस्य व्हा'}
              </Button>
            </div>
            <label className="mt-2 flex items-start gap-2 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#800020]"
              />
              <span>
                मला ग्रंथालयाची वार्तापत्रे व कार्यक्रमांची माहिती ईमेलवर
                मिळण्यास संमती आहे.{" "}
                <Link href="/privacy" className="font-bold underline">
                  गोपनीयता धोरण
                </Link>
              </span>
            </label>
            {/* Advanced Animation Overlay */}
            {(subscriptionStatus === 'success' || subscriptionStatus === 'error') && (
              <div
                key={subscriptionStatus}
                className="animate-in fade-in absolute inset-0 flex items-center justify-center rounded-lg bg-background/90 text-center backdrop-blur-sm"
              >
                {subscriptionStatus === 'success' ? (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">सदस्यता यशस्वी झाली! 🎉</span>
                ) : (
                  <span className="font-semibold text-destructive">कृपया पुन्हा प्रयत्न करा.</span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Legal / compliance bar */}
      <div className="relative z-10 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-stone-600 dark:text-stone-400 sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} साहित्य निकेतन सार्वजनिक ग्रंथालय,
            अंबाजोगाई. सर्व हक्क राखीव.
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            <Link
              href="/privacy"
              className="font-medium transition-colors hover:text-[#800020] dark:hover:text-[#E5B869]"
            >
              गोपनीयता धोरण
            </Link>
            <Link
              href="/terms"
              className="font-medium transition-colors hover:text-[#800020] dark:hover:text-[#E5B869]"
            >
              वापरण्याच्या अटी
            </Link>
            <Link
              href="/contact"
              className="font-medium transition-colors hover:text-[#800020] dark:hover:text-[#E5B869]"
            >
              तक्रार संपर्क
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
