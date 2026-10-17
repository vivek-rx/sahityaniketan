"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
  IconLogout,
  IconExternalLink,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { useAdminLanguage } from "@/context/admin-language-context";
import { cn } from "@/lib/utils";
import classes from "./DoubleNavbar.module.css";

// ── Mantine Compatible UI Primitives ──

export function UnstyledButton({
  children,
  className,
  onClick,
  "data-active": dataActive,
  "aria-label": ariaLabel,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  "data-active"?: boolean | string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      data-active={dataActive}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export function Tooltip({
  label,
  children,
}: {
  label: string;
  position?: "right" | "top" | "bottom" | "left";
  withArrow?: boolean;
  transitionProps?: Record<string, unknown>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group flex items-center justify-center">
      {children}
      <span className={classes.tooltip}>{label}</span>
    </div>
  );
}

export function Title({
  order = 4,
  className,
  children,
}: {
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}) {
  const Component = `h${order}` as React.ElementType;
  return <Component className={className}>{children}</Component>;
}

export function MantineLogo({
  type = "mark",
  size = 30,
}: {
  type?: "mark" | "full";
  size?: number;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-gradient-to-br from-[#00657E] to-[#004758] dark:from-[#38bdf8] dark:to-[#0284c7] flex items-center justify-center shadow-sm text-white"
      title="साहित्य निकेतन ग्रंथालय"
    >
      <svg
        width={size * 0.65}
        height={size * 0.65}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
      </svg>
    </div>
  );
}

// ── Navigation Mockdata & Real Routing ──

export interface NavSectionItem {
  icon: React.ElementType;
  label: string;
}

export const mainLinksMockdata: NavSectionItem[] = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconCalendarStats, label: "Releases" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconUser, label: "Account" },
  { icon: IconSettings, label: "Settings" },
];

interface SubLinkItem {
  label: string;
  href?: string;
  badge?: string;
}

export const CATEGORY_LINKS: Record<string, SubLinkItem[]> = {
  Home: [
    { label: "Public Website", href: "/" },
    { label: "Library Catalogue", href: "/catalogue" },
    { label: "Events & News", href: "/events" },
    { label: "Member Portal", href: "/login" },
  ],
  Dashboard: [
    { label: "Overview", href: "/admin" },
    { label: "Daily Notice Banner", href: "/admin#daily-banner" },
    { label: "Physical Notice Board", href: "/admin/noticeboard" },
    { label: "Carousel Slides", href: "/admin/carousel" },
    { label: "Photo Gallery", href: "/admin/gallery" },
    { label: "Testimonials (अभिप्राय)", href: "/admin/testimonials" },
  ],
  Releases: [
    { label: "Notice Board", href: "/admin/noticeboard", badge: "Live" },
    { label: "Carousel Manager", href: "/admin/carousel" },
    { label: "Gallery Albums", href: "/admin/gallery" },
    { label: "Testimonials", href: "/admin/testimonials" },
    { label: "Sahitya Sanchit (Stories)", href: "/admin/stories" },
    { label: "Catalogue Books", href: "/catalogue" },
  ],
  Analytics: [
    { label: "Live System Stats", href: "/admin#stats" },
    { label: "Book Circulation", href: "/admin#circulation" },
    { label: "Member Growth", href: "/admin#members" },
    { label: "Activity Stream", href: "/admin#activity" },
  ],
  Security: [
    { label: "Audit Logs", href: "/admin#audit-logs" },
    { label: "Auth Guard Status", href: "/admin#security" },
    { label: "Database Health", href: "/admin#database" },
  ],
  Account: [
    { label: "Admin Profile", href: "/admin#profile" },
    { label: "Trustees & Staff", href: "/about/trustees" },
    { label: "Sign Out", href: "#signout" },
  ],
  Settings: [
    { label: "Language & Locale", href: "/admin#language" },
    { label: "Banner Priority", href: "/admin#banner-settings" },
    { label: "System Diagnostics", href: "/admin#diagnostics" },
  ],
};

export const linksMockdata = [
  "Security",
  "Settings",
  "Dashboard",
  "Releases",
  "Account",
  "Orders",
  "Clients",
  "Databases",
  "Pull Requests",
  "Open Issues",
  "Wiki pages",
];

export function DoubleNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, toggleLang } = useAdminLanguage();

  // Determine active section based on current pathname
  const getInitialActive = () => {
    if (pathname.includes("carousel") || pathname.includes("gallery") || pathname.includes("noticeboard") || pathname.includes("testimonials")) {
      return "Releases";
    }
    if (pathname === "/admin") return "Dashboard";
    return "Dashboard";
  };

  const [active, setActive] = useState<string>(getInitialActive);
  const [activeLink, setActiveLink] = useState<string>("Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync active states when pathname changes
  useEffect(() => {
    if (pathname === "/admin") {
      setActive("Dashboard");
      setActiveLink("Overview");
    } else if (pathname === "/admin/noticeboard") {
      setActive("Releases");
      setActiveLink("Notice Board");
    } else if (pathname === "/admin/carousel") {
      setActive("Releases");
      setActiveLink("Carousel Manager");
    } else if (pathname === "/admin/gallery") {
      setActive("Releases");
      setActiveLink("Gallery Albums");
    } else if (pathname === "/admin/testimonials") {
      setActive("Releases");
      setActiveLink("Testimonials");
    }
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login?role=admin");
    router.refresh();
  };

  const handleLinkClick = (event: React.MouseEvent, item: SubLinkItem) => {
    if (item.href === "#signout") {
      event.preventDefault();
      handleSignOut();
      return;
    }
    if (item.href?.startsWith("#")) {
      event.preventDefault();
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActiveLink(item.label);
  };

  // Render left icon buttons
  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => {
          setIsCollapsed(false);
          setActive(link.label);
          const firstSub = CATEGORY_LINKS[link.label]?.[0]?.label;
          if (firstSub) setActiveLink(firstSub);
        }}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
        aria-label={link.label}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  // Determine which sub-links to display for the active section
  const currentSubLinks: SubLinkItem[] =
    CATEGORY_LINKS[active] ||
    linksMockdata.map((name) => ({ label: name, href: `/admin#${name.toLowerCase()}` }));

  const links = currentSubLinks.map((item) => {
    const isCurrentActive =
      activeLink === item.label ||
      (item.href && item.href !== "/admin" && pathname === item.href) ||
      (item.href === "/admin" && pathname === "/admin" && activeLink === item.label);

    if (item.href && !item.href.startsWith("#")) {
      return (
        <Link
          key={item.label}
          href={item.href}
          className={classes.link}
          data-active={isCurrentActive || undefined}
          onClick={(e) => handleLinkClick(e, item)}
        >
          <span className="truncate">{item.label}</span>
          {item.badge && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-extrabold rounded-md bg-[#00657E] text-white">
              {item.badge}
            </span>
          )}
        </Link>
      );
    }

    return (
      <a
        className={classes.link}
        data-active={isCurrentActive || undefined}
        href={item.href || "#"}
        onClick={(event) => handleLinkClick(event, item)}
        key={item.label}
      >
        <span className="truncate">{item.label}</span>
        {item.badge && (
          <span className="ml-2 px-1.5 py-0.5 text-[10px] font-extrabold rounded-md bg-[#00657E] text-white">
            {item.badge}
          </span>
        )}
      </a>
    );
  });

  return (
    <nav className={cn(classes.navbar, "hidden md:flex")}>
      <div className={classes.wrapper}>
        {/* Left Column: Icons & Brand Mark */}
        <div className={classes.aside}>
          <div className={classes.logo}>
            <Link href="/admin" aria-label="Sahitya Niketan Admin">
              <MantineLogo type="mark" size={36} />
            </Link>
          </div>

          <div className="flex-1 flex flex-col items-center">{mainLinks}</div>

          {/* Bottom Aside Actions: Language toggle & Quick Public Exit */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1">
            <Tooltip label={lang === "mr" ? "English Admin" : "मराठी अ‍ॅडमिन"}>
              <button
                type="button"
                onClick={toggleLang}
                className={classes.mainLink}
                aria-label="Language"
              >
                <span className="text-[11px] font-black">{lang.toUpperCase()}</span>
              </button>
            </Tooltip>

            <Tooltip label="Public Website">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.mainLink}
                aria-label="Public Website"
              >
                <IconExternalLink size={20} stroke={1.5} />
              </Link>
            </Tooltip>

            <Tooltip label="Sign Out">
              <button
                type="button"
                onClick={handleSignOut}
                className={cn(classes.mainLink, "hover:text-red-500! dark:hover:text-red-400!")}
                aria-label="Sign Out"
              >
                <IconLogout size={20} stroke={1.5} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Right Column: Section Header & Sub-links */}
        <div className={cn(classes.main, isCollapsed && classes.mainCollapsed)}>
          <Title order={4} className={classes.title}>
            <span>{active}</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] lowercase text-slate-400 font-mono tracking-normal">
                {currentSubLinks.length} items
              </span>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Collapse Panel"
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-1 cursor-pointer"
                aria-label="Collapse panel"
              >
                <IconChevronLeft size={14} />
              </button>
            </div>
          </Title>

          <div className="flex-1 space-y-0.5">{links}</div>

          {/* Footer note in secondary column */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-medium flex items-center justify-between">
            <span>साहित्य निकेतन</span>
            <span className="text-[10px] font-mono">v1.2</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DoubleNavbar;
