"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  Users,
  Image,
  Layers,
  Home,
  Library,
  Bell,
  Users2,
  BarChart3,
  Archive,
  Settings,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Sparkles,
  MessageSquareQuote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  section?: string;
}

const NAV_ITEMS: NavItem[] = [
  // Main
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, section: "MAIN" },
  { href: "/admin/books", label: "Books", icon: BookOpen, section: "MAIN" },
  { href: "/admin/posts", label: "Posts & News", icon: FileText, section: "MAIN" },
  { href: "/admin/events", label: "Events", icon: Calendar, section: "MAIN" },
  { href: "/admin/members", label: "Members", icon: Users, badge: 3, section: "MAIN" },
  // Content
  { href: "/admin/stories", label: "साहित्य संचित (Stories)", icon: Sparkles, section: "CONTENT" },
  { href: "/admin/gallery", label: "Gallery", icon: Image, section: "CONTENT" },
  { href: "/admin/carousel", label: "Carousel", icon: Layers, section: "CONTENT" },
  { href: "/admin/testimonials", label: "Testimonials (वाचक अभिप्राय)", icon: MessageSquareQuote, section: "CONTENT" },
  { href: "/admin/homepage", label: "Homepage", icon: Home, section: "CONTENT" },
  { href: "/admin/library-info", label: "Library Info", icon: Library, section: "CONTENT" },
  { href: "/admin/noticeboard", label: "Notice Board", icon: Megaphone, section: "CONTENT" },
  // Admin
  { href: "/admin/staff", label: "Staff & Roles", icon: Users2, section: "ADMIN" },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, section: "ADMIN" },
  { href: "/admin/archive", label: "Archive", icon: Archive, section: "ADMIN" },
  { href: "/admin/settings", label: "Settings", icon: Settings, section: "ADMIN" },
];

const SECTIONS = ["MAIN", "CONTENT", "ADMIN"] as const;
const SECTION_LABELS: Record<string, string> = {
  MAIN: "Main",
  CONTENT: "Content",
  ADMIN: "Admin",
};

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-slate-950 border-r border-slate-800 transition-all duration-300 shrink-0 relative",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800 min-h-[64px]">
        <div className="h-8 w-8 rounded-lg bg-[#00657E] flex items-center justify-center shrink-0">
          <BookOpen className="h-4.5 w-4.5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-extrabold text-sm leading-tight truncate">
              साहित्य निकेतन
            </p>
            <p className="text-slate-400 text-[10px] font-bold truncate">Admin Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {SECTIONS.map((section) => {
          const items = NAV_ITEMS.filter((i) => i.section === section);
          return (
            <div key={section} className="mb-3">
              {!collapsed && (
                <p className="px-2 pb-1 pt-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  {SECTION_LABELS[section]}
                </p>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all",
                      isActive
                        ? "bg-[#00657E] text-white shadow-sm"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <Icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                    {!collapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge && item.badge > 0 && (
                      <span className="rounded-full bg-[#ED6923] text-white text-[10px] font-extrabold px-1.5 py-0.5 min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-slate-800 p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2 text-slate-500 hover:text-white hover:bg-slate-800 transition-colors text-xs font-bold cursor-pointer"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
