"use client";

import React, { useState, type FC, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CrowdCanvas } from '@/components/ui/skiper-ui/skiper39';

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
  /** An array of objects for generating social media links. */
  socialLinks?: { label: string; href: string; icon: ReactNode }[];
  /** The title for the newsletter subscription section. */
  newsletterTitle?: string;
  /** Async function to handle email subscription. Should return `true` for success and `false` for failure. */
  onSubscribe?: (email: string) => Promise<boolean>;
}

/**
 * A responsive and theme-adaptive footer component with a newsletter subscription form.
 * Designed following shadcn/ui and 21st.dev best practices.
 */
export const Footer: FC<FooterProps> = ({
  logoSrc,
  companyName = 'Datally Inc.',
  description = 'Empowering businesses with intelligent financial solutions, designed for the future of finance.',
  usefulLinks = [
    { label: 'Products', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  socialLinks = [
    { label: 'Facebook', href: '#', icon: <DummyIcon /> },
    { label: 'Instagram', href: '#', icon: <DummyIcon /> },
    { label: 'Twitter (X)', href: '#', icon: <DummyIcon /> },
  ],
  newsletterTitle = 'Subscribe our newsletter',
  onSubscribe,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !onSubscribe || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubscribe(email);

    setSubscriptionStatus(success ? 'success' : 'error');
    setIsSubmitting(false);

    if (success) {
      setEmail('');
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

        {/* Follow Us */}
        <div className="md:justify-self-center">
          <h3 className="mb-4 text-base font-bold font-marathi-heading text-[#800020] dark:text-[#E5B869]">सोशल मीडिया / Social</h3>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 font-medium transition-colors hover:text-[#800020] dark:hover:text-[#E5B869]"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
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
    </footer>
  );
};

// Dummy Icon: Fallback icon
const DummyIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-muted-foreground"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export default Footer;
