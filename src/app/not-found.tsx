"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { GoogleTranslateWidget } from "@/components/layout/google-translate-widget";
import { LogoBrand } from "@/components/layout/logo-brand";

const FLYING_BOOKS = [
  { top: 12, size: 44, color: "#c0533a", dur: 16, delay: 0, bobDur: 2.6 },
  { top: 24, size: 58, color: "#3f6f8f", dur: 19, delay: -2.7, bobDur: 3.0 },
  { top: 36, size: 72, color: "#d1a23a", dur: 22, delay: -5.4, bobDur: 3.4 },
  { top: 52, size: 44, color: "#5b7a4a", dur: 25, delay: -8.1, bobDur: 3.8 },
  { top: 66, size: 58, color: "#8a4f7d", dur: 17, delay: -10.8, bobDur: 4.2 },
  { top: 78, size: 72, color: "#2f4858", dur: 20, delay: -13.5, bobDur: 4.6 },
  { top: 88, size: 44, color: "#b5651d", dur: 23, delay: -16.2, bobDur: 5.0 },
];

const I18N = {
  mr: {
    number: "४०४",
    title: "पुस्तकांच्या जगात हरवले...",
    desc: "हे पान कुठेतरी उडून गेले आहे. कदाचित या उडणाऱ्या पुस्तकांमध्येच लपले असावे.",
    homeBtn: "मुख्यपृष्ठावर परत जा",
    searchBtn: "ग्रंथसूची शोधा",
    footer: "साहित्य निकेतन सार्वजनिक ग्रंथालय, अंबाजोगाई — स्था. १ ऑगस्ट १९४५",
  },
  hi: {
    number: "४०४",
    title: "पुस्तकों के संसार में खो गए...",
    desc: "यह पृष्ठ कहीं उड़ गया है। शायद इन्हीं उड़ती हुई किताबों में कहीं छुपा हो।",
    homeBtn: "मुख्यपृष्ठ पर वापस जाएँ",
    searchBtn: "ग्रन्थ सूची खोजें",
    footer: "साहित्य निकेतन सार्वजनिक पुस्तकालय, अंबाजोगाई — स्था. १ अगस्त १९४५",
  },
  en: {
    number: "404",
    title: "Lost in books",
    desc: "This page flew away. Maybe it's tucked inside one of these.",
    homeBtn: "Back to home",
    searchBtn: "Search Catalogue",
    footer: "Sahitya Niketan Public Library, Ambajogai — Est. 1 August 1945",
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const currentLang = language === "hi" ? "hi" : language === "en" ? "en" : "mr";
  const content = I18N[currentLang];

  useEffect(() => {
    document.title = `${content.number} — ${content.title} | ${
      currentLang === "en" ? "Sahitya Niketan" : "साहित्य निकेतन"
    }`;
  }, [content, currentLang]);

  return (
    <div className="sn-404-container">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .sn-404-container {
              --bg: #f6f1e7;
              --ink: #2a2118;
              --muted: #7a6c5a;
              --btn: #800020;
              --btn-ink: #f6f1e7;
              --btn-hover: #66001a;
              box-sizing: border-box;
              min-height: 100vh;
              width: 100%;
              background: var(--bg);
              color: var(--ink);
              font-family: var(--font-noto-devanagari), var(--font-geist-sans), -apple-system, sans-serif;
              overflow: hidden;
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding-top: env(safe-area-inset-top, 0px);
              padding-bottom: env(safe-area-inset-bottom, 0px);
              transition: background-color 0.3s ease, color 0.3s ease;
            }

            .dark .sn-404-container,
            :global(.dark) .sn-404-container {
              --bg: #16120e;
              --ink: #f1e8d8;
              --muted: #a39580;
              --btn: #e5b869;
              --btn-ink: #16120e;
              --btn-hover: #f3d59b;
            }

            .sn-404-main {
              position: relative;
              z-index: 2;
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 24px;
            }

            .sn-404-h1 {
              font-size: clamp(5rem, 22vw, 11rem);
              margin: 0;
              line-height: 1;
              letter-spacing: -0.04em;
              font-weight: 400;
              color: var(--ink);
              font-family: inherit;
            }

            .sn-404-h2 {
              font-size: clamp(1.4rem, 4.5vw, 2.2rem);
              margin: 0.25em 0 0.4em;
              font-style: italic;
              font-weight: 400;
              color: var(--ink);
              font-family: inherit;
            }

            .sn-404-p {
              margin: 0 0 2rem;
              color: var(--muted);
              max-width: 32ch;
              font-family: var(--font-sans), system-ui, sans-serif;
              font-size: 1.05rem;
              line-height: 1.55;
            }

            .sn-404-actions {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 14px;
              flex-wrap: wrap;
            }

            .sn-404-btn {
              font-family: var(--font-sans), system-ui, sans-serif;
              background: var(--btn);
              color: var(--btn-ink);
              text-decoration: none;
              padding: 0.85rem 1.8rem;
              border-radius: 999px;
              font-size: 0.95rem;
              font-weight: 700;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
              cursor: pointer;
            }

            .sn-404-btn:hover {
              background: var(--btn-hover);
              opacity: 0.92;
              transform: translateY(-1px);
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
            }

            .sn-404-btn:active {
              transform: translateY(0);
            }

            .sn-404-btn-secondary {
              font-family: var(--font-sans), system-ui, sans-serif;
              background: transparent;
              color: var(--ink);
              border: 1px solid var(--muted);
              text-decoration: none;
              padding: 0.85rem 1.6rem;
              border-radius: 999px;
              font-size: 0.95rem;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              transition: all 0.2s ease;
              cursor: pointer;
            }

            .sn-404-btn-secondary:hover {
              border-color: var(--ink);
              background: rgba(128, 128, 128, 0.08);
              transform: translateY(-1px);
            }

            /* Flying Books Animation */
            .fly {
              position: absolute;
              left: 0;
              z-index: 1;
              animation: across linear infinite;
              will-change: transform;
              pointer-events: none;
            }

            .bob {
              animation: bob ease-in-out infinite;
            }

            .bk {
              display: block;
              filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));
            }

            .wl, .wr {
              transform-box: view-box;
              transform-origin: 30px 30px;
              animation: flapL 0.7s ease-in-out infinite alternate;
            }

            .wr {
              animation-name: flapR;
            }

            @keyframes across {
              from {
                transform: translateX(-140px);
              }
              to {
                transform: translateX(calc(100vw + 140px));
              }
            }

            @keyframes bob {
              0%, 100% {
                transform: translateY(0) rotate(-4deg);
              }
              50% {
                transform: translateY(-28px) rotate(5deg);
              }
            }

            @keyframes flapL {
              from {
                transform: rotate(18deg);
              }
              to {
                transform: rotate(-26deg);
              }
            }

            @keyframes flapR {
              from {
                transform: rotate(-18deg);
              }
              to {
                transform: rotate(26deg);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .fly, .bob, .wl, .wr {
                animation-duration: 30s !important;
              }
              .wl, .wr {
                animation: none;
              }
            }
          `,
        }}
      />

      {/* Top Header with Brand and Language Switcher */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between">
        <LogoBrand size="md" showSubheading={true} />

        <div className="flex items-center gap-3">
          <GoogleTranslateWidget direction="down" align="right" />
        </div>
      </header>

      {/* Centered Main 404 Hero */}
      <main className="sn-404-main">
        <h1 className="sn-404-h1">{content.number}</h1>
        <h2 className="sn-404-h2">{content.title}</h2>
        <p className="sn-404-p">{content.desc}</p>
        <div className="sn-404-actions">
          <Link href="/" className="sn-404-btn">
            <Home className="w-4 h-4" />
            <span>{content.homeBtn}</span>
          </Link>
          <Link href="/catalogue" className="sn-404-btn-secondary">
            <Search className="w-4 h-4" />
            <span>{content.searchBtn}</span>
          </Link>
        </div>
      </main>

      {/* Subtle Localized Footer Note */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-[var(--muted)] font-mono">
        {content.footer}
      </footer>

      {/* Animated Flying Books Background */}
      {FLYING_BOOKS.map((b, i) => (
        <div
          key={i}
          className="fly"
          style={{
            top: `${b.top}%`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
          aria-hidden="true"
        >
          <div className="bob" style={{ animationDuration: `${b.bobDur}s` }}>
            <svg
              className="bk"
              width={b.size}
              height={b.size * 0.7}
              viewBox="0 0 60 42"
              aria-hidden="true"
            >
              <g className="wl">
                <path d="M30 30 L4 22 L4 6 L30 14 Z" fill={b.color} />
                <path d="M30 30 L8 24 L8 9 L30 16 Z" fill="#fff" opacity="0.85" />
              </g>
              <g className="wr">
                <path d="M30 30 L56 22 L56 6 L30 14 Z" fill={b.color} />
                <path d="M30 30 L52 24 L52 9 L30 16 Z" fill="#fff" opacity="0.85" />
              </g>
              <rect x="28.5" y="14" width="3" height="18" rx="1.5" fill={b.color} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
