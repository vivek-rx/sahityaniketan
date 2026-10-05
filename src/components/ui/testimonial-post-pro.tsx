"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export interface PostcardNote {
  id?: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  caption?: string;
  postmark?: string;
  imageUrl?: string;
  image?: {
    src: string;
    alt?: string;
    srcSet?: string;
  };
  cardColor?: string;
  stampTint?: string;
}

export interface TestimonialPostProProps {
  notes?: PostcardNote[];
  eyebrow?: string;
  heading?: string;
  showHeading?: boolean;
  showLedger?: boolean;
  ledgerWidth?: number;
  ledgerSide?: "left" | "right";
  columnGap?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  cardPadding?: number;
  stampSize?: number;
  groundColor?: string;
  paperColor?: string;
  inkColor?: string;
  accentColor?: string;
  showControls?: boolean;
  controlSize?: number;
  showPostmark?: boolean;
  showSignature?: boolean;
  dragToss?: boolean;
  clickToFlip?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  startSide?: "message" | "picture";
  flipLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_NOTES: PostcardNote[] = [
  {
    name: "प्रा. डॉ. सदानंद मोरे",
    role: "ज्येष्ठ साहित्यिक व संशोधक",
    company: "महाराष्ट्र राज्य साहित्य व संस्कृती मंडळ",
    quote:
      "साहित्य निकेतन ग्रंथालयातील दुर्मीळ हस्तलिखितांचे दालन आणि आद्यकवी मुकुंदराजकालीन संदर्भ मराठवाड्याचा ऐतिहासिक ठेवा आहेत. संशोधकांसाठी हे ग्रंथालय अनमोल ज्ञानतीर्थ आहे.",
    caption: "दुर्मीळ हस्तलिखित दालन व संदर्भ कक्ष",
    postmark: "15 AUG 1945",
    imageUrl: "/images/real/marathi_books_display.png",
    cardColor: "#FFFDF5",
    stampTint: "#800020",
  },
  {
    name: "प्रतीक कुलकर्णी",
    role: "तहसीलदार (महाराष्ट्र शासन महसूल)",
    company: "महाराष्ट्र शासन महसूल विभाग",
    quote:
      "साहित्य निकेतनच्या अभ्यासिका दालनात बसून मी सलग दोन वर्षे स्पर्धा परीक्षेचा अभ्यास केला. ग्रंथालयातील शांत वातावरण, संदर्भ ग्रंथांची उपलब्धता आणि अभ्यासकांची शिस्त यश मिळवून देण्यासाठी निर्णायक ठरली.",
    caption: "वातानुकूलित अभ्यासिका दालन",
    postmark: "26 JAN 1962",
    imageUrl: "/images/real/library_window.png",
    cardColor: "#F0F7F2",
    stampTint: "#1E4D38",
  },
  {
    name: "डॉ. अलका जोशी",
    role: "मराठी भाषा अभ्यासक व लेखिका",
    company: "साहित्य निकेतन वाचक समिती",
    quote:
      "स्वातंत्र्यपूर्व काळापासून अविरत ज्ञानसेवा देणारे हे वर्ग 'अ' ग्रंथालय आहे. ३९ हजारांहून अधिक पुस्तकांचे समृद्ध दालन आणि वर्तमानपत्र वाचक कक्ष अंबाजोगाईच्या सांस्कृतिक जीवनाचा प्राण आहे.",
    caption: "३९,९५३+ मुद्रित ग्रंथ संपदा",
    postmark: "01 MAY 1975",
    imageUrl: "/images/real/library_vintage_books.png",
    cardColor: "#FFF4EC",
    stampTint: "#9C3A24",
  },
  {
    name: "ॲड. सुधीर जोशी",
    role: "ज्येष्ठ आजीवन सभासद (४० वर्षे वाचक)",
    company: "अंबाजोगाई विधी व सांस्कृतिक परिषद",
    quote:
      "मी गेल्या चाळीस वर्षांपासून या ग्रंथालयाचा नियमित वाचक आहे. १९४५ पासूनची ग्रंथालयाची परंपरा नव्या पिढीने डिजिटल स्वरूपात जतन केली हे पाहून अत्यंत अभिमान वाटतो.",
    caption: "८० वर्षांची अखंड ज्ञानसेवा",
    postmark: "01 AUG 2020",
    imageUrl: "/images/real/library_cupboards.png",
    cardColor: "#EDF4FA",
    stampTint: "#1D3B64",
  },
];

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

// Postage stamp perforated border
function perforatedBorder(cardColor: string, paperColor: string) {
  const dot = (pos: string, x: string, y: string, rep: string) =>
    `radial-gradient(circle 3.2px at ${x} ${y}, ${cardColor} 96%, rgba(0,0,0,0) 100%) ${pos} / 9px 9px ${rep}`;
  return [
    dot("top left", "4.5px", "0px", "repeat-x"),
    dot("bottom left", "4.5px", "9px", "repeat-x"),
    dot("top left", "0px", "4.5px", "repeat-y"),
    dot("top right", "9px", "4.5px", "repeat-y"),
    paperColor,
  ].join(", ");
}

// Hand-drawn ink signature SVG
function SignatureSvg({ ink, width }: { ink: string; width: number }) {
  return (
    <svg
      width={width}
      height={18}
      viewBox="0 0 120 18"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", opacity: 0.65 }}
    >
      <path
        d="M3 13 C9 3, 15 3, 19 12 C22 17, 27 6, 33 9 C38 12, 40 15, 46 8 C51 3, 57 14, 63 11 C70 8, 75 13, 82 9 C90 5, 101 12, 117 6"
        stroke={ink}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

// Wavy Postmark Circular Stamp SVG
function PostmarkStamp({
  date,
  stampSize,
  accentColor,
}: {
  date: string;
  stampSize: number;
  accentColor: string;
}) {
  const s = Math.round(stampSize * 1.04);
  const r = s / 2;
  const waveW = Math.round(s * 1.25);
  const waveH = Math.round(s * 0.44);
  const amp = waveH * 0.14;

  const wavePath = (y: number) =>
    `M0 ${y} Q ${waveW / 8} ${y - amp}, ${waveW / 4} ${y} T ${waveW / 2} ${y} T ${(waveW * 3) / 4} ${y} T ${waveW} ${y}`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: s,
        height: s,
        pointerEvents: "none",
      }}
    >
      <svg
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <circle
          cx={r}
          cy={r}
          r={r - 1.5}
          fill="none"
          stroke={accentColor}
          strokeWidth={1.4}
        />
        <circle
          cx={r}
          cy={r}
          r={r * 0.64}
          fill="none"
          stroke={accentColor}
          strokeWidth={0.9}
          strokeDasharray="2 3"
        />
      </svg>
      {/* 3 wavy postmark lines */}
      <svg
        width={waveW}
        height={waveH}
        viewBox={`0 0 ${waveW} ${waveH}`}
        style={{
          position: "absolute",
          left: Math.round(s * 0.88),
          top: Math.round((s - waveH) / 2),
          overflow: "visible",
        }}
      >
        {[0.2, 0.5, 0.8].map((fac, i) => (
          <path
            key={i}
            d={wavePath(waveH * fac)}
            stroke={accentColor}
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: accentColor,
          fontFamily: "var(--font-geist-mono), monospace",
          fontWeight: 600,
          fontSize: Math.max(8, Math.round(s * 0.14)),
          letterSpacing: "0.08em",
        }}
      >
        {date}
      </div>
    </div>
  );
}

// Postage stamp element with photo
function PostageStamp({
  note,
  stampSize,
  cardColor,
  paperColor,
}: {
  note: PostcardNote;
  stampSize: number;
  cardColor: string;
  paperColor: string;
}) {
  const pad = Math.round(stampSize * 0.13);
  const photoSrc = note.imageUrl || note.image?.src || "/images/real/library_reading_hall.png";

  return (
    <div
      style={{
        width: stampSize,
        height: Math.round(stampSize * 1.2),
        padding: pad,
        boxSizing: "border-box",
        background: perforatedBorder(cardColor, paperColor),
        flex: "0 0 auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: note.stampTint || "#B98F52",
          overflow: "hidden",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

// Icon helper
function ControlIcon({
  kind,
  size,
}: {
  kind: "back" | "next" | "flip";
  size: number;
}) {
  const iconSize = Math.max(10, Math.min(24, Math.round(size * 0.44)));
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          kind === "back"
            ? "M9 2.5 L4.5 7 L9 11.5"
            : kind === "next"
            ? "M5 2.5 L9.5 7 L5 11.5"
            : "M2.5 5.5 A4.5 4.5 0 0 1 11 4 M11 1.6 V4.2 H8.4 M11.5 8.5 A4.5 4.5 0 0 1 3 10 M3 12.4 V9.8 H5.6"
        }
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TestimonialPostPro({
  notes: rawNotes = DEFAULT_NOTES,
  eyebrow = "READERS & SCHOLARS",
  heading = "Archival Postcards",
  showHeading = false,
  showLedger = true,
  ledgerWidth = 340,
  ledgerSide = "right",
  columnGap = 44,
  cardWidth = 520,
  cardHeight = 310,
  cardRadius = 16,
  cardPadding = 26,
  stampSize = 70,
  groundColor = "transparent",
  paperColor = "#FFFDF9",
  inkColor = "#2B2118",
  accentColor = "#713B4A",
  showControls = true,
  controlSize = 40,
  showPostmark = true,
  showSignature = true,
  dragToss = true,
  clickToFlip = true,
  autoplay = false,
  autoplayDelay = 5,
  pauseOnHover = true,
  startSide = "message",
  flipLabel = "Flip Card",
  className = "",
  style,
}: TestimonialPostProProps) {
  const notes = useMemo(
    () => (Array.isArray(rawNotes) && rawNotes.length > 0 ? rawNotes : DEFAULT_NOTES),
    [rawNotes]
  );
  const total = notes.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(startSide === "picture");
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(1000);

  // Resize listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;
    const update = () => setContainerW(el.clientWidth || 1000);
    update();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = containerW < 840;
  const actualCardWidth = isMobile
    ? Math.min(containerW - 24, 480)
    : cardWidth;
  const actualCardHeight = isMobile
    ? Math.max(345, Math.min(390, Math.round(actualCardWidth * 1.02)))
    : cardHeight;

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) nextNote();
    else if (diff < -45) prevNote();
    touchStartX.current = null;
  };

  // Next / Prev navigation
  const nextNote = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setIsFlipped(false);
  }, [total]);

  const prevNote = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setIsFlipped(false);
  }, [total]);

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered) || total < 2) return;
    const interval = setTimeout(nextNote, Math.max(2000, autoplayDelay * 1000));
    return () => clearTimeout(interval);
  }, [autoplay, autoplayDelay, isHovered, nextNote, pauseOnHover, total]);

  // Drag physics motion values
  const dragX = useMotionValue(0);
  const cardRotate = useTransform(dragX, [-300, 0, 300], [-14, 0, 14]);

  const currentNote = notes[activeIndex] || notes[0];
  const activeColor = currentNote.cardColor || "#F1D8A8";

  // Postcard front side: Message & Postal details
  const renderMessageSide = (note: PostcardNote) => {
    const cardBg = note.cardColor || "#F1D8A8";
    const currentPadding = isMobile ? 18 : cardPadding;
    const currentStampSize = isMobile ? Math.round(stampSize * 0.82) : stampSize;

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: cardBg,
          borderRadius: cardRadius,
          padding: currentPadding,
          boxSizing: "border-box",
          display: "flex",
          gap: isMobile ? 12 : Math.round(cardPadding * 0.8),
          overflow: "hidden",
          boxShadow: "0 22px 50px -15px rgba(40,24,12,.28)",
          border: `1px solid rgba(0,0,0,0.08)`,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Left Side: Quote, Signature, Author */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: isMobile ? 10 : 14,
          }}
        >
          <div
            style={{
              color: inkColor,
              overflow: "hidden",
              fontFamily: "var(--font-noto-devanagari), var(--font-geist-sans), sans-serif",
              fontSize: isMobile ? 13.5 : 15.5,
              lineHeight: isMobile ? 1.65 : 1.78,
              letterSpacing: "0.01em",
              fontWeight: 500,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: isMobile ? 6 : 6,
            }}
          >
            “{note.quote}”
          </div>

          <div style={{ minWidth: 0 }}>
            {showSignature && (
              <SignatureSvg ink={inkColor} width={Math.min(110, actualCardWidth * 0.28)} />
            )}
            <div
              style={{
                color: inkColor,
                marginTop: 4,
                fontWeight: 700,
                fontSize: isMobile ? 15 : 17,
                fontFamily: "var(--font-baloo), var(--font-noto-devanagari), sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {note.name}
            </div>
            <div
              style={{
                color: inkColor,
                opacity: 0.85,
                marginTop: 2,
                fontSize: isMobile ? 11.5 : 13.5,
                fontWeight: 500,
                fontFamily: "var(--font-noto-devanagari), var(--font-geist-sans), sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {note.role}
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          aria-hidden="true"
          style={{
            width: 1,
            alignSelf: "stretch",
            background: inkColor,
            opacity: 0.18,
            flex: "0 0 auto",
          }}
        />

        {/* Right Side: Postage stamp & Postal Address lines */}
        <div
          style={{
            width: Math.round(currentStampSize * 1.8),
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <PostageStamp
            note={note}
            stampSize={currentStampSize}
            cardColor={cardBg}
            paperColor={paperColor}
          />

          {/* Postal Address lines */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                height: 20,
                borderBottom: `1px solid ${inkColor}`,
                color: inkColor,
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: 2,
                boxSizing: "border-box",
                fontSize: isMobile ? 11 : 12,
                fontWeight: 600,
                fontFamily: "var(--font-baloo), var(--font-noto-devanagari), sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {note.company || "साहित्य निकेतन"}
            </div>
            <div
              style={{
                height: 16,
                borderBottom: `1px solid ${inkColor}`,
                opacity: 0.35,
              }}
            />
            <div
              style={{
                height: 16,
                borderBottom: `1px solid ${inkColor}`,
                opacity: 0.35,
              }}
            />
          </div>

          {/* Postmark stamp */}
          {showPostmark && note.postmark && (
            <motion.div
              initial={prefersReduced ? false : { scale: 1.6, opacity: 0, rotate: -22 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.25,
              }}
              style={{
                position: "absolute",
                top: currentStampSize * 0.48,
                right: currentStampSize * 0.65,
                pointerEvents: "none",
              }}
            >
              <PostmarkStamp
                date={note.postmark}
                stampSize={currentStampSize}
                accentColor={accentColor}
              />
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  // Postcard reverse side: Full photo artwork
  const renderPictureSide = (note: PostcardNote) => {
    const pad = isMobile ? 6 : Math.max(6, Math.round(cardPadding * 0.42));
    const photoSrc = note.imageUrl || note.image?.src || "/images/real/library_reading_hall.png";

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: paperColor,
          borderRadius: cardRadius,
          padding: pad,
          boxSizing: "border-box",
          boxShadow: "0 22px 50px -15px rgba(40,24,12,.28)",
          border: `1px solid rgba(0,0,0,0.08)`,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: Math.max(0, cardRadius - pad),
            overflow: "hidden",
            background: note.stampTint || "#B98F52",
          }}
        >
          <img
            src={photoSrc}
            alt={note.caption || note.name}
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0) 55%)",
            }}
          />
          {/* Top Postmark tag */}
          <div
            style={{
              position: "absolute",
              top: pad + 4,
              left: pad + 4,
              padding: "4px 8px",
              borderRadius: 999,
              background: paperColor,
              color: inkColor,
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: 600,
              fontSize: 9.5,
              letterSpacing: "0.06em",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            No. {padZero(activeIndex + 1)} {note.postmark ? `· ${note.postmark}` : ""}
          </div>

          {/* Bottom caption */}
          {note.caption && (
            <div
              style={{
                position: "absolute",
                left: pad + 8,
                right: pad + 8,
                bottom: pad + 8,
                color: "#FFFFFF",
                fontSize: isMobile ? 13 : 14,
                fontWeight: 600,
                fontFamily: "var(--font-geist-sans), sans-serif",
                textShadow: "0 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              {note.caption}
            </div>
          )}
        </div>
      </div>
    );
  };

  const buttonStyle: React.CSSProperties = {
    height: controlSize,
    minWidth: controlSize,
    borderRadius: 999,
    border: `1px solid ${inkColor}`,
    background: "transparent",
    color: inkColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "all 180ms ease",
    userSelect: "none",
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: groundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile
            ? "column"
            : ledgerSide === "left"
            ? "row-reverse"
            : "row",
          alignItems: "center",
          gap: isMobile ? 18 : columnGap,
          padding: isMobile ? "8px 4px 16px" : 32,
          boxSizing: "border-box",
          maxWidth: "100%",
        }}
      >
        {/* Postcard Stack & Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "0 0 auto",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {showHeading && (
            <div style={{ width: actualCardWidth, marginBottom: 18 }}>
              {eyebrow && (
                <div
                  style={{
                    color: accentColor,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {eyebrow}
                </div>
              )}
              {heading && (
                <div
                  style={{
                    color: inkColor,
                    fontSize: 22,
                    fontWeight: 700,
                    fontFamily: "var(--font-geist-sans), sans-serif",
                  }}
                >
                  {heading}
                </div>
              )}
            </div>
          )}

          {/* Dedicated Horizontal Reviewer Switcher on Mobile */}
          {isMobile && total > 1 && (
            <div
              style={{
                width: actualCardWidth,
                display: "flex",
                gap: 6,
                overflowX: "auto",
                paddingBottom: 12,
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {notes.map((n, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveIndex(i);
                      setIsFlipped(false);
                    }}
                    style={{
                      flex: "0 0 auto",
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: isActive
                        ? `1.5px solid ${accentColor}`
                        : "1px solid rgba(0,0,0,0.12)",
                      background: isActive ? accentColor : "rgba(255,255,255,0.7)",
                      color: isActive ? "#FFFFFF" : inkColor,
                      fontSize: 12,
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "var(--font-baloo), var(--font-noto-devanagari), sans-serif",
                      cursor: "pointer",
                      transition: "all 180ms ease",
                      boxShadow: isActive ? "0 2px 8px rgba(113,59,74,0.25)" : "none",
                    }}
                  >
                    {padZero(i + 1)} {n.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          )}

          {/* 3D Stack container with Mobile Touch Swipe */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "relative",
              width: actualCardWidth,
              height: actualCardHeight,
              perspective: 1400,
            }}
          >
            {/* Background ghost shadow cards for depth */}
            {notes.map((n, idx) => {
              const diff = (idx - activeIndex + total) % total;
              if (diff === 0 || diff > 2) return null;
              const offY = diff * 6;
              const offX = diff * 4;
              const rot = diff * (diff % 2 === 0 ? -1.8 : 2.2);
              return (
                <div
                  key={`ghost-${idx}`}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: cardRadius,
                    background: n.cardColor || activeColor,
                    opacity: 0.5 - diff * 0.15,
                    border: `1px solid rgba(0,0,0,0.06)`,
                    boxShadow: "0 10px 25px -10px rgba(40,24,12,.2)",
                    transform: `translate(${offX}px, ${offY}px) rotate(${rot}deg)`,
                    pointerEvents: "none",
                  }}
                />
              );
            })}

            {/* Active Card with Drag-toss & 3D Flip */}
            <motion.div
              drag={dragToss && !isMobile ? "x" : false}
              dragSnapToOrigin={true}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                const threshold = actualCardWidth * 0.24;
                if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 600) {
                  if (info.offset.x < 0) nextNote();
                  else prevNote();
                }
              }}
              onClick={() => {
                if (clickToFlip) toggleFlip();
              }}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                x: dragX,
                rotate: cardRotate,
                perspective: 1400,
                touchAction: "pan-y",
                cursor: dragToss ? "grab" : clickToFlip ? "pointer" : "default",
              }}
              whileDrag={{ cursor: "grabbing", scale: 1.02 }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 180, damping: 22 }
                }
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                }}
              >
                {renderMessageSide(currentNote)}
                {renderPictureSide(currentNote)}
              </motion.div>
            </motion.div>
          </div>

          {/* Controls Bar */}
          {showControls && total > 0 && (
            <div
              style={{
                width: actualCardWidth,
                padding: "16px 4px 0",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <button
                type="button"
                aria-label="Previous postcard"
                onClick={prevNote}
                style={buttonStyle}
              >
                <ControlIcon kind="back" size={controlSize} />
              </button>

              <div
                style={{
                  color: inkColor,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {padZero(activeIndex + 1)} / {padZero(total)}
              </div>

              <button
                type="button"
                aria-label="Next postcard"
                onClick={nextNote}
                style={buttonStyle}
              >
                <ControlIcon kind="next" size={controlSize} />
              </button>

              <div style={{ flex: 1 }} />

              <button
                type="button"
                aria-label="Flip postcard"
                onClick={toggleFlip}
                style={{
                  ...buttonStyle,
                  width: "auto",
                  padding: "0 14px",
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-sans), sans-serif",
                }}
              >
                <ControlIcon kind="flip" size={controlSize} />
                <span>{flipLabel}</span>
              </button>
            </div>
          )}
        </div>

        {/* Ledger Panel (Side list of postcards) */}
        {showLedger && !isMobile && (
          <div
            style={{
              width: ledgerWidth,
              flex: "0 0 auto",
              paddingLeft: 16,
              boxSizing: "border-box",
              borderLeft: `1px solid rgba(0,0,0,0.08)`,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontFamily: "var(--font-baloo), var(--font-noto-devanagari), sans-serif",
                fontWeight: 700,
                color: accentColor,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {eyebrow}
            </div>

            {notes.map((note, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsFlipped(false);
                  }}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: isActive ? "rgba(0,0,0,0.05)" : "transparent",
                    color: inkColor,
                    opacity: isActive ? 1 : 0.6,
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 150ms ease",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="ledger-bar"
                      style={{
                        position: "absolute",
                        left: -17,
                        top: 8,
                        bottom: 8,
                        width: 3.5,
                        borderRadius: 2,
                        background: accentColor,
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      opacity: 0.85,
                    }}
                  >
                    {padZero(idx + 1)}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        fontFamily: "var(--font-baloo), var(--font-noto-devanagari), sans-serif",
                        lineHeight: 1.3,
                        color: inkColor,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {note.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "var(--font-noto-devanagari), var(--font-geist-sans), sans-serif",
                        lineHeight: 1.4,
                        marginTop: 2,
                        color: inkColor,
                        opacity: 0.85,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {note.role}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      color: inkColor,
                      opacity: 0.7,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {note.postmark}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
