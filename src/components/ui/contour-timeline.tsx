"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface ContourTimelineItem {
  year: string;
  label?: string;
  title: string;
  description?: string;
  image?: {
    src: string;
    alt?: string;
    srcSet?: string;
  };
  showImage?: boolean;
  linkLabel?: string;
  link?: string;
  newTab?: boolean;
}

export interface ContourTimelinePalette {
  background?: string;
  text?: string;
  muted?: string;
  line?: string;
  accent?: string;
  ticket?: string;
  ticketText?: string;
}

export interface ContourTimelineShape {
  lift?: number;
  spread?: number;
  lineWidth?: number;
  echoes?: number;
  stationWidth?: number;
}

export interface ContourTimelineTicket {
  width?: number;
  radius?: string | number;
  padding?: string | number;
  showImage?: boolean;
  imageHeight?: number;
  shadow?: string;
}

export interface ContourTimelineFonts {
  year?: React.CSSProperties;
  title?: React.CSSProperties;
  body?: React.CSSProperties;
  label?: React.CSSProperties;
}

export interface ContourTimelineProps {
  items?: ContourTimelineItem[];
  layoutMode?: "auto" | "compact" | "wide" | "desktop";
  showDetails?: boolean;
  previewTrigger?: "hover" | "click";
  showOnLoad?: boolean;
  mobileBreakpoint?: number;
  palette?: ContourTimelinePalette;
  shape?: ContourTimelineShape;
  ticket?: ContourTimelineTicket;
  fonts?: ContourTimelineFonts;
  startItem?: number;
  spring?: number;
  allowDrag?: boolean;
  showNavigation?: boolean;
  accessibleLabel?: string;
  style?: React.CSSProperties;
  className?: string;
}

const DEFAULT_ITEMS: ContourTimelineItem[] = [
  {
    year: "2018",
    label: "First spark",
    title: "One shared table.\nA world of ideas.",
    description:
      "We began with two people, one shared table, and a simple belief: thoughtful design can turn small ideas into lasting possibilities.",
    image: {
      src: "https://framerusercontent.com/images/haGUcNWkPETXSyNaV1mXqYOTaqA.jpg",
      alt: "gray concrete wall",
    },
    linkLabel: "Explore chapter",
    link: "",
    newTab: false,
    showImage: true,
  },
  {
    year: "2020",
    label: "A new direction",
    title: "One clear vision.\nA voice of our own.",
    description:
      "We brought strategy, identity, and digital into one practice, shaping a clear creative voice through patient work and a shared curiosity.",
    image: {
      src: "https://framerusercontent.com/images/LUOsiChDBtu8fzfkfDXwKdZ5jxM.jpg",
      alt: "an empty room with concrete walls and stairs",
    },
    linkLabel: "Explore chapter",
    link: "",
    newTab: false,
    showImage: true,
  },
  {
    year: "2022",
    label: "The turning point",
    title: "More curious minds.\nA wider perspective.",
    description:
      "We welcomed new minds and fresh perspectives, growing into a creative collective with more ways to explore, collaborate, and make things.",
    image: {
      src: "https://framerusercontent.com/images/25OGIKhNJQhRs6XQYJvzWepivkM.jpg",
      alt: "white and gray floor tiles",
    },
    linkLabel: "Explore chapter",
    link: "",
    newTab: false,
    showImage: true,
  },
  {
    year: "2024",
    label: "Beyond borders",
    title: "New places to meet.\nA closer connection.",
    description:
      "We worked across cities and time zones, bringing people closer through global projects built on honest conversations, shared trust, and care.",
    image: {
      src: "https://framerusercontent.com/images/9aG7qJiLUTAdQwvLUxpCrMEYTg.jpg",
      alt: "white and gray concrete blocks",
    },
    linkLabel: "Explore chapter",
    link: "",
    newTab: false,
    showImage: true,
  },
  {
    year: "2026",
    label: "What comes next",
    title: "New paths to follow.\nA future to shape.",
    description:
      "We keep following new ideas, building lasting partnerships and useful experiences with the same curiosity that brought us around the table.",
    image: {
      src: "https://framerusercontent.com/images/SqHYZ17IogFcBVDNWujdLhEYp6M.jpg",
      alt: "a yellow wall with some shadows on it",
    },
    linkLabel: "Explore chapter",
    link: "",
    newTab: false,
    showImage: true,
  },
];

const DEFAULT_PALETTE: Required<ContourTimelinePalette> = {
  background: "rgba(0,0,0,0)",
  text: "#33292C",
  muted: "#867A78",
  line: "#D7CAC3",
  accent: "#713B4A",
  ticket: "#FFFCF7",
  ticketText: "#3D3034",
};

const DEFAULT_SHAPE: Required<ContourTimelineShape> = {
  lift: 62,
  spread: 145,
  lineWidth: 1.5,
  echoes: 2,
  stationWidth: 180,
};

const DEFAULT_TICKET: Required<ContourTimelineTicket> = {
  width: 330,
  radius: "18px",
  padding: "22px",
  showImage: true,
  imageHeight: 166,
  shadow:
    "0 25px 50px -23px rgba(55,32,35,.25), 0 5px 12px -6px rgba(55,32,35,.10)",
};

const DEFAULT_FONTS: Required<ContourTimelineFonts> = {
  year: {
    fontFamily: '"Contour Geist", Geist, sans-serif',
    fontWeight: 500,
    fontSize: 34,
    letterSpacing: "-0.05em",
    lineHeight: "1.2em",
  },
  title: {
    fontFamily: '"Contour Geist", Geist, sans-serif',
    fontWeight: 500,
    fontSize: 22,
    letterSpacing: "-0.04em",
    lineHeight: "1.16em",
  },
  body: {
    fontFamily: '"Contour Geist", Geist, sans-serif',
    fontWeight: 400,
    fontSize: 13,
    letterSpacing: "-0.015em",
    lineHeight: "1.55em",
  },
  label: {
    fontFamily: '"Contour Geist", Geist, sans-serif',
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "0.045em",
    lineHeight: "1.4em",
  },
};

const FONT_FACE_CSS = `@font-face{font-family:"Contour Geist";font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RnOM4nQ.ttf) format("truetype")}@font-face{font-family:"Contour Geist";font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RruM4nQ.ttf) format("truetype")}`;

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

function parseBoxRadii(
  val: string | number | undefined,
  fallback: number
): [number, number, number, number] {
  if (typeof val === "number") return [val, val, val, val];
  if (typeof val === "string") {
    const parts = val.trim().split(/\s+/).map(parseFloat);
    const [n = fallback, r = n, i = n, a = r] = parts;
    return [
      Number.isFinite(n) ? Math.max(0, n) : fallback,
      Number.isFinite(r) ? Math.max(0, r) : fallback,
      Number.isFinite(i) ? Math.max(0, i) : fallback,
      Number.isFinite(a) ? Math.max(0, a) : fallback,
    ];
  }
  return [fallback, fallback, fallback, fallback];
}

function ArrowSvg({ back = false }: { back?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        transform: back ? "rotate(180deg)" : undefined,
      }}
    >
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ContourTimeline({
  items: rawItems = DEFAULT_ITEMS,
  layoutMode = "auto",
  showDetails = true,
  previewTrigger = "hover",
  showOnLoad = true,
  mobileBreakpoint = 1024,
  palette,
  shape,
  ticket,
  fonts,
  startItem = 3,
  spring = 0.35,
  allowDrag = true,
  showNavigation = false,
  accessibleLabel = "Timeline",
  style,
  className = "",
}: ContourTimelineProps) {
  const items = useMemo(
    () => (Array.isArray(rawItems) ? rawItems.filter(Boolean) : DEFAULT_ITEMS),
    [rawItems]
  );
  const total = items.length;

  const P = useMemo(() => ({ ...DEFAULT_PALETTE, ...palette }), [palette]);
  const S = useMemo(() => ({ ...DEFAULT_SHAPE, ...shape }), [shape]);
  const T_ticket = useMemo(
    () => ({ ...DEFAULT_TICKET, ...ticket }),
    [ticket]
  );
  const F = useMemo(
    () => ({
      year: { ...DEFAULT_FONTS.year, ...fonts?.year },
      title: { ...DEFAULT_FONTS.title, ...fonts?.title },
      body: { ...DEFAULT_FONTS.body, ...fonts?.body },
      label: { ...DEFAULT_FONTS.label, ...fonts?.label },
    }),
    [fonts]
  );

  const defaultIndex = clamp(Math.round(startItem) - 1, 0, Math.max(0, total - 1));
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [containerWidth, setContainerWidth] = useState(1120);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [detailsVisible, setDetailsVisible] = useState(showOnLoad);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [stationHeight, setStationHeight] = useState(120);
  const [ghostCardHeight, setGhostCardHeight] = useState(0);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLElement | null)[]>([]);
  const dragPointer = useRef<{
    pointerId: number;
    x: number;
    y: number;
    scroll: number;
    moved: boolean;
  } | null>(null);
  const pointerTypeRef = useRef<string>("mouse");
  const hadDragMove = useRef(false);

  const rawId = useId();
  const cid = rawId.replace(/:/g, "");
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  // Responsive layout mode
  const isCompact =
    layoutMode === "compact" ||
    (layoutMode !== "desktop" &&
      (containerWidth <= mobileBreakpoint || isCoarsePointer));
  const isTouchLayout = isCompact || isCoarsePointer;
  const paddingX = isCompact ? 16 : 28;
  const availableWidth = Math.max(1, containerWidth - paddingX * 2);
  const stationWidthSetting = isCompact ? 56 : clamp(S.stationWidth, 110, 300);
  const needsScroll = availableWidth < total * stationWidthSetting;
  const stationWidth = needsScroll
    ? stationWidthSetting
    : availableWidth / Math.max(total, 1);
  const totalTrackWidth = stationWidth * Math.max(total, 1);

  // Active milestone coordinates
  const activeCenterX = (activeIndex + 0.5) * stationWidth;
  const targetScroll = clamp(
    activeCenterX - availableWidth / 2,
    0,
    Math.max(0, totalTrackWidth - availableWidth)
  );
  const activeCenterRelative = activeCenterX - scrollLeft;

  // Contour geometry
  const lift = clamp(S.lift, 20, 120);
  const curveSpread = Math.min(
    stationWidth * 0.82,
    clamp(S.spread, 50, 240)
  );
  const baselineY = lift + 28;
  const lineWidth = clamp(S.lineWidth, 1, 5);
  const echoesCount = clamp(Math.round(S.echoes), 0, 6);

  // Ticket dimensions
  const cardRadii = parseBoxRadii(T_ticket.radius, 18);
  const cardBorderRadiusCss = cardRadii.map((r) => `${r}px`).join(" ");
  const innerMediaRadiusCss = cardRadii
    .map((r) => `${Math.max(0, r - 5)}px`)
    .join(" ");
  const cardPaddingCss = parseBoxRadii(T_ticket.padding, 22)
    .map((p) => `${isCompact ? Math.min(22, p) : p}px`)
    .join(" ");
  const ticketWidth = isCompact
    ? Math.min(availableWidth, 480)
    : Math.min(availableWidth, clamp(T_ticket.width, 220, 480));
  const ticketLeft = clamp(
    activeCenterRelative - ticketWidth / 2,
    0,
    Math.max(0, availableWidth - ticketWidth)
  );

  // Performant SVG curve animation config (smooth, hardware-friendly bezier)
  const springTransition = isReduced
    ? { duration: 0 }
    : {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      };

  // Scroll to station
  const scrollToStation = useCallback(
    (idx: number, smooth = true) => {
      if (!railRef.current) return;
      const target = clamp(
        (idx + 0.5) * stationWidth - availableWidth / 2,
        0,
        Math.max(0, totalTrackWidth - availableWidth)
      );
      railRef.current.scrollTo({
        left: target,
        behavior: smooth && !isReduced ? "smooth" : "auto",
      });
    },
    [availableWidth, isReduced, stationWidth, totalTrackWidth]
  );

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;
    const updateSize = () => {
      if (el) setContainerWidth(el.clientWidth || 1120);
    };
    updateSize();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Check coarse pointer
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(hover: none), (pointer: coarse)");
    const handler = () => setIsCoarsePointer(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Measure ghost card height
  useEffect(() => {
    const el = ghostRef.current;
    if (isCompact || !showDetails || !total || !el) {
      setGhostCardHeight(0);
      return;
    }
    const measure = () => {
      const h = parseFloat(
        el.ownerDocument.defaultView?.getComputedStyle(el).height || ""
      );
      setGhostCardHeight(Math.ceil(h || el.offsetHeight));
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [isCompact, showDetails, total, items, ticketWidth]);

  // Measure station heights (measured on resize, not on every activeIndex change)
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const measureStations = () => {
      const heights = stationRefs.current
        .filter(Boolean)
        .map((node) => node!.offsetHeight);
      setStationHeight(Math.max(44, ...heights));
    };
    measureStations();
    const ro = new ResizeObserver(measureStations);
    stationRefs.current.forEach((node) => {
      if (node) ro.observe(node);
    });
    return () => ro.disconnect();
  }, [total, stationWidth]);


  // Select milestone
  const selectMilestone = useCallback(
    (
      idx: number,
      focusStation = false,
      doScroll = true,
      announce = true
    ) => {
      if (!total) return;
      const target = clamp(idx, 0, total - 1);
      setActiveIndex(target);
      setDetailsVisible(true);
      if (doScroll) scrollToStation(target);
      if (announce) {
        const item = items[target];
        setLiveAnnouncement(
          `${item.year || target + 1}: ${item.title || item.label || "Milestone"}`
        );
      }
      if (focusStation) {
        stationRefs.current[target]?.focus({ preventScroll: true });
      }
    },
    [items, scrollToStation, total]
  );

  // Keyboard navigation
  const handleStationKeyDown = (
    e: React.KeyboardEvent,
    currentIdx: number
  ) => {
    pointerTypeRef.current = "keyboard";
    let nextIdx: number | null = null;
    if (e.key === "Escape") {
      setDetailsVisible(false);
      return;
    }
    if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % total;
    else if (e.key === "ArrowLeft") nextIdx = (currentIdx - 1 + total) % total;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = total - 1;
    else return;

    e.preventDefault();
    selectMilestone(nextIdx, true);
  };

  // Drag rail handling
  const finishDrag = (e: React.PointerEvent, isCancel = false) => {
    const ptr = dragPointer.current;
    if (!ptr || ptr.pointerId !== e.pointerId) return;
    dragPointer.current = null;
    setIsDragging(false);
    hadDragMove.current = ptr.moved && !isCancel;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // SVG Contour curve path math
  const getContourPath = (echo = 0) => {
    const t = baselineY + echo * 4;
    const n = 28 + echo * 1.6;
    const r = activeCenterX;
    const u = curveSpread;
    return `M 0 ${t} H ${r - u} C ${r - u * 0.42} ${t}, ${r - u * 0.48} ${n}, ${r} ${n} C ${r + u * 0.48} ${n}, ${r + u * 0.42} ${t}, ${r + u} ${t} H ${totalTrackWidth}`;
  };

  // Render individual card content
  const renderCardContent = (item: ContourTimelineItem, isGhost = false) => {
    return (
      <>
        {T_ticket.showImage && item.showImage !== false && item.image?.src && (
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              height: isCompact
                ? Math.min(ticketWidth * 0.56, clamp(T_ticket.imageHeight, 80, 280))
                : clamp(T_ticket.imageHeight, 80, 280),
              margin: "6px 6px 0",
              borderRadius: innerMediaRadiusCss,
              background: P.line,
            }}
          >
            <img
              src={item.image.src}
              srcSet={item.image.srcSet}
              alt={item.image.alt || item.title || ""}
              draggable={false}
              loading={isGhost ? "lazy" : "eager"}
              style={{
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
                  "linear-gradient(180deg,rgba(26,19,18,.04),transparent 50%,rgba(26,19,18,.2))",
                pointerEvents: "none",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 13,
                top: 13,
                borderRadius: 30,
                padding: "6px 10px",
                background: "rgba(255,252,247,.92)",
                color: "#493A37",
                ...F.label,
                letterSpacing: ".06em",
                userSelect: "none",
              }}
            >
              {item.year}
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 0 auto",
            padding: cardPaddingCss,
          }}
        >
          <div
            style={{
              color: P.accent,
              ...F.label,
              overflowWrap: "anywhere",
              textTransform: "uppercase",
              letterSpacing: ".10em",
            }}
          >
            {item.label || "Milestone"}
          </div>

          {item.title && (
            <h3
              style={{
                ...F.title,
                margin: "11px 0 0",
                color: P.ticketText,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {item.title}
            </h3>
          )}

          {item.description && (
            <p
              style={{
                ...F.body,
                margin: "10px 0 0",
                color: P.ticketText,
                opacity: 0.72,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {item.description}
            </p>
          )}

          {item.linkLabel?.trim() && (
            <span
              className="rt-card-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: "auto",
                paddingTop: 17,
                ...F.body,
                fontWeight: 500,
                color: P.accent,
              }}
            >
              {item.linkLabel}
              <span
                style={{
                  display: "inline-flex",
                  transform: "rotate(-35deg)",
                }}
              >
                <ArrowSvg />
              </span>
            </span>
          )}
        </div>
      </>
    );
  };

  const cardStyle: React.CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    width: ticketWidth,
    paddingTop: 1,
    borderRadius: cardBorderRadiusCss,
    background: P.ticket,
    color: P.ticketText,
    userSelect: "text",
    border: `1px solid ${P.line}`,
  };

  const activeItem = items[activeIndex];
  const hasLink = !isReduced && !!activeItem?.link?.trim();

  const detailsCardNode = total > 0 && activeItem && (
    <div
      id={`${cid}-details`}
      role="region"
      aria-label={`${activeItem.year || activeItem.label || "Milestone"}: ${activeItem.title || "Details"}`}
      style={{
        ...cardStyle,
        minHeight: isCompact ? undefined : ghostCardHeight || undefined,
        boxShadow: T_ticket.shadow,
      }}
    >
      {hasLink ? (
        <a
          data-card-link="true"
          href={activeItem.link}
          target={activeItem.newTab ? "_blank" : undefined}
          rel={activeItem.newTab ? "noopener noreferrer" : undefined}
          draggable={false}
          aria-label={`${activeItem.year ? activeItem.year + ": " : ""}${activeItem.title || activeItem.label || activeItem.linkLabel || "Explore milestone"}`}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 0 auto",
            width: "100%",
            color: "inherit",
            borderRadius: "inherit",
            textDecoration: "none",
            cursor: "pointer",
            userSelect: "text",
          }}
        >
          {renderCardContent(activeItem)}
        </a>
      ) : (
        renderCardContent(activeItem)
      )}
    </div>
  );

  const isCardVisible =
    showDetails &&
    (isTouchLayout ||
      (detailsVisible &&
        activeCenterRelative >= 0 &&
        activeCenterRelative <= availableWidth));

  const detailsContainerNode = showDetails && total > 0 && (
    isCompact ? (
      <div
        style={{
          position: "relative",
          margin: "14px auto 0",
          width: ticketWidth,
        }}
      >
        {detailsCardNode}
      </div>
    ) : (
      <div style={{ position: "relative", paddingTop: 8 }}>
        {/* Ghost measurement container */}
        <div
          ref={ghostRef}
          aria-hidden="true"
          style={{
            display: "grid",
            visibility: "hidden",
            pointerEvents: "none",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                ...cardStyle,
                gridArea: "1 / 1",
                alignSelf: "start",
              }}
            >
              {renderCardContent(item, true)}
            </div>
          ))}
        </div>

        {/* Animated Ticket Card */}
        <motion.div
          initial={false}
          animate={{
            x: ticketLeft,
            opacity: isCardVisible ? 1 : 0,
            y: isCardVisible ? 0 : 12,
          }}
          transition={springTransition}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: ticketWidth,
            pointerEvents: isCardVisible ? "auto" : "none",
            visibility: isCardVisible ? "visible" : "hidden",
          }}
        >
          {detailsCardNode}
        </motion.div>
      </div>
    )
  );

  // Station rail node
  const railNode = (
    <div
      ref={railRef}
      data-rail="true"
      onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
      style={{
        position: "relative",
        height: isCompact
          ? Math.max(44, stationHeight) + 28
          : baselineY - 22 + Math.max(108, stationHeight) + 8,
        overflowX: needsScroll ? "auto" : "hidden",
        overflowY: "hidden",
        scrollbarWidth: "none",
        overscrollBehaviorX: "contain",
        maskImage:
          needsScroll && !isCompact
            ? "linear-gradient(to right, transparent, black 22px, black calc(100% - 22px), transparent)"
            : undefined,
        touchAction: "auto",
        cursor:
          allowDrag && needsScroll
            ? isDragging
              ? "grabbing"
              : "grab"
            : "default",
        userSelect: "none",
      }}
      onPointerDown={(e) => {
        hadDragMove.current = false;
        pointerTypeRef.current = e.pointerType;
        if (
          e.pointerType !== "mouse" ||
          !allowDrag ||
          !needsScroll ||
          e.button !== 0
        )
          return;
        dragPointer.current = {
          pointerId: e.pointerId,
          x: e.clientX,
          y: e.clientY,
          scroll: e.currentTarget.scrollLeft,
          moved: false,
        };
      }}
      onPointerMove={(e) => {
        const ptr = dragPointer.current;
        if (!ptr || ptr.pointerId !== e.pointerId) return;
        if (e.buttons !== 1) {
          dragPointer.current = null;
          setIsDragging(false);
          return;
        }
        const deltaX = e.clientX - ptr.x;
        if (!ptr.moved && Math.abs(deltaX) < 8) return;
        if (!ptr.moved) {
          ptr.moved = true;
          setIsDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
        }
        e.currentTarget.scrollLeft = ptr.scroll - deltaX;
      }}
      onPointerLeave={() => {
        if (dragPointer.current && !dragPointer.current.moved) {
          dragPointer.current = null;
        }
      }}
      onPointerUp={(e) => finishDrag(e)}
      onPointerCancel={(e) => finishDrag(e, true)}
      onLostPointerCapture={(e) => {
        if (e.target === e.currentTarget && dragPointer.current) {
          finishDrag(e, true);
        }
      }}
      onClickCapture={(e) => {
        if (hadDragMove.current && e.detail > 0) {
          e.preventDefault();
          e.stopPropagation();
          hadDragMove.current = false;
        }
      }}
    >
      <div
        style={{
          position: "relative",
          width: totalTrackWidth,
          height: "100%",
        }}
      >
        {isCompact ? (
          /* Mobile straight rail */
          <svg
            aria-hidden="true"
            width={totalTrackWidth}
            height={Math.max(44, stationHeight) + 28}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <path
              d={`M 0 ${Math.max(44, stationHeight) + 14} H ${totalTrackWidth}`}
              stroke={P.line}
              strokeWidth={lineWidth}
            />
            <motion.circle
              initial={false}
              animate={{
                cx: activeCenterX,
                cy: Math.max(44, stationHeight) + 14,
              }}
              transition={springTransition}
              r="4"
              fill={P.accent}
            />
          </svg>
        ) : (
          /* Desktop Animated Contour Curve */
          <svg
            aria-hidden="true"
            width={totalTrackWidth}
            height={baselineY + 32}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {/* Echo contours */}
            {Array.from({ length: echoesCount }, (_, i) => (
              <motion.path
                key={i}
                initial={false}
                animate={{ d: getContourPath(i + 1) }}
                transition={springTransition}
                fill="none"
                stroke={P.line}
                strokeWidth={Math.max(0.6, lineWidth * 0.55)}
                opacity={0.7 - i * 0.08}
              />
            ))}

            {/* Main active contour curve */}
            <motion.path
              initial={false}
              animate={{ d: getContourPath(0) }}
              transition={springTransition}
              fill="none"
              stroke={P.accent}
              strokeWidth={lineWidth}
            />

            {/* Vertical stem connecting active milestone to top card */}
            <motion.path
              initial={false}
              animate={{
                d: `M ${activeCenterX} 0 V 28`,
                opacity: isCardVisible ? 1 : 0,
              }}
              transition={springTransition}
              stroke={P.accent}
              strokeWidth={lineWidth}
              fill="none"
            />

            {/* Outer milestone pin */}
            <motion.circle
              initial={false}
              animate={{ cx: activeCenterX, cy: 28 }}
              transition={springTransition}
              r="13"
              fill={P.ticket}
              stroke={P.line}
              strokeWidth="1"
            />

            {/* Inner accent dot */}
            <motion.circle
              initial={false}
              animate={{ cx: activeCenterX, cy: 28 }}
              transition={springTransition}
              r="5"
              fill={P.accent}
            />
          </svg>
        )}

        {/* Milestone Station Buttons */}
        <div
          role="group"
          aria-label="Milestones"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                ref={(el) => {
                  stationRefs.current[idx] = el;
                }}
                type="button"
                draggable={false}
                className="rt-station"
                id={`${cid}-year-${idx}`}
                aria-current={isActive ? "step" : undefined}
                aria-pressed={isActive}
                aria-controls={showDetails ? `${cid}-details` : undefined}
                aria-label={`${item.year || idx + 1}: ${item.label || item.title || "Milestone"}`}
                tabIndex={0}
                onPointerEnter={(e) => {
                  if (
                    e.pointerType === "mouse" &&
                    !isTouchLayout &&
                    previewTrigger === "hover" &&
                    !dragPointer.current
                  ) {
                    selectMilestone(idx, false, false, false);
                  }
                }}
                onPointerDown={(e) => {
                  pointerTypeRef.current = e.pointerType;
                }}
                onFocus={(e) => {
                  if (e.currentTarget.matches(":focus-visible")) {
                    selectMilestone(idx, false, true);
                  }
                }}
                onKeyDown={(e) => handleStationKeyDown(e, idx)}
                onClick={(e) => {
                  e.preventDefault();
                  selectMilestone(idx, false, true);
                }}
                style={{
                  position: "absolute",
                  left: idx * stationWidth + (isCompact ? 3 : 7),
                  top: isCompact ? 4 : baselineY - 22,
                  width: stationWidth - (isCompact ? 6 : 14),
                  minHeight: 44,
                  padding: isCompact ? "10px 3px" : "22px 4px 15px",
                  boxSizing: "border-box",
                  appearance: "none",
                  border: isCompact
                    ? `1px solid ${isActive ? P.line : "transparent"}`
                    : 0,
                  borderRadius: 8,
                  background: isCompact && isActive ? P.ticket : "transparent",
                  color: isActive ? P.accent : P.muted,
                  cursor: isDragging ? "grabbing" : "pointer",
                  textAlign: "center",
                  textDecoration: "none",
                  userSelect: "none",
                }}
              >
                {!isCompact && (
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      opacity: isActive ? 0 : 1,
                      scale: isActive ? 0 : 1,
                    }}
                    transition={springTransition}
                    style={{
                      position: "absolute",
                      top: 19,
                      left: "calc(50% - 3px)",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: P.accent,
                    }}
                  />
                )}

                <motion.span
                  className="rt-year"
                  initial={false}
                  animate={{
                    y: !isCompact && isActive ? 3 : 0,
                    scale: !isCompact && isActive ? 1.16 : 1,
                  }}
                  transition={springTransition}
                  style={{
                    display: "inline-block",
                    padding: isCompact ? 0 : "7px 9px",
                    marginTop: isCompact ? 0 : 9,
                    ...F.year,
                    fontSize: isCompact
                      ? `min(${typeof F.year?.fontSize === "number" ? F.year.fontSize + "px" : F.year?.fontSize || "34px"}, 18px)`
                      : F.year?.fontSize,
                    maxWidth: "100%",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.year || item.label || "Milestone"}
                </motion.span>

                {!isCompact && (
                  <span
                    style={{
                      display: "block",
                      marginTop: 7,
                      padding: "0 5px",
                      ...F.label,
                      color: isActive ? P.accent : P.muted,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.label || "Milestone"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const navButtonCircleStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    padding: 0,
    border: `1px solid ${P.line}`,
    borderRadius: "50%",
    color: P.text,
    background: "transparent",
    cursor: "pointer",
    flexShrink: 0,
    userSelect: "none",
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={accessibleLabel || "Timeline"}
      data-contour={cid}
      data-renderer="interactive"
      data-layout={isCompact ? "compact" : "wide"}
      onKeyDown={(e) => {
        if (e.key === "Escape" && !isTouchLayout) {
          e.stopPropagation();
          stationRefs.current[activeIndex]?.focus({ preventScroll: true });
          setDetailsVisible(false);
        }
      }}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        background: P.background,
        color: P.text,
        ...style,
        padding: `${isCompact ? 8 : 22}px ${paddingX}px ${isCompact ? 24 : 12}px`,
        overflow: "clip",
      }}
    >
      <style>{`
        ${FONT_FACE_CSS}
        [data-contour="${cid}"] button:focus-visible,
        [data-contour="${cid}"] a:focus-visible {
          outline: 2px solid ${P.accent};
          outline-offset: 2px;
        }
        [data-contour="${cid}"] button:disabled {
          opacity: 0.3;
          cursor: default;
        }
        [data-contour="${cid}"] [data-rail]::-webkit-scrollbar {
          display: none;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-contour="${cid}"] * {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {total > 0 ? (
        <>
          {isCompact ? (
            <>
              {railNode}
              {detailsContainerNode}
            </>
          ) : (
            <>
              {detailsContainerNode}
              {railNode}
            </>
          )}

          {showNavigation && total > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 13,
                paddingTop: 16,
              }}
            >
              <button
                type="button"
                aria-label="Previous milestone"
                disabled={activeIndex === 0}
                onClick={() => selectMilestone(activeIndex - 1)}
                style={navButtonCircleStyle}
              >
                <ArrowSvg back />
              </button>
              <button
                type="button"
                aria-label="Next milestone"
                disabled={activeIndex === total - 1}
                onClick={() => selectMilestone(activeIndex + 1)}
                style={navButtonCircleStyle}
              >
                <ArrowSvg />
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ ...F.body, padding: 24, color: P.muted }}>
          Add a milestone in Items to start your timeline.
        </div>
      )}

      {/* Screen reader live region */}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {liveAnnouncement}
      </span>
    </div>
  );
}
