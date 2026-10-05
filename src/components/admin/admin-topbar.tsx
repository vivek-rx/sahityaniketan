"use client";

import { useEffect, useState } from "react";
import {
  LogOut,
  Menu,
  UserCheck,
  BookOpen,
  LayoutDashboard,
  Layers,
  Megaphone,
  ExternalLink,
  Globe,
  UploadCloud,
  Languages,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAdminLanguage } from "@/context/admin-language-context";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

interface AdminTopbarProps {
  title?: string;
  subtitle?: string;
}

export function AdminTopbar({ title, subtitle }: AdminTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminEmail, setAdminEmail] = useState("admin@sahityaniketan.org");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useAdminLanguage();

  const NAV_ITEMS = [
    { href: "/admin", label: t.navDashboard, sublabel: t.navDashboardSub, icon: LayoutDashboard },
    { href: "/admin/noticeboard", label: t.navNotices, sublabel: t.navNoticesSub, icon: Megaphone },
    { href: "/admin/gallery", label: t.navGallery, sublabel: t.navGallerySub, icon: UploadCloud },
    { href: "/admin/carousel", label: t.navCarousel, sublabel: t.navCarouselSub, icon: Layers },
    { href: "/catalogue", label: t.navCatalogue, sublabel: t.navCatalogueSub, icon: BookOpen, external: true },
  ];

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user?.email) setAdminEmail(data.user.email);
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login?role=admin");
    router.refresh();
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs shrink-0 sticky top-0 z-30 font-sans">
      {/* Upper Bar: Brand + Language Switcher + User Info + Website Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Library Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label={t.menuOpen}
              className="lg:hidden p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-slate-950 text-white border-r border-slate-800 p-0 flex flex-col">
              <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
              <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
                <Image
                  src="/images/logo.png"
                  alt="Sahitya Niketan Logo"
                  width={42}
                  height={42}
                  className="h-10 w-10 object-contain shrink-0 drop-shadow-sm rounded-full"
                />
                <div>
                  <p className="font-extrabold text-base text-white leading-tight">{t.adminTitle}</p>
                  <p className="text-xs text-slate-400 font-medium">{t.cmsPortal}</p>
                </div>
              </div>

              {/* Mobile Language Toggle */}
              <div className="p-4 border-b border-slate-800">
                <button
                  onClick={toggleLang}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-[#E5B869]" />
                    <span>{lang === "mr" ? "भाषा" : "Language"}</span>
                  </span>
                  <span className="bg-[#800020] px-2.5 py-0.5 rounded-md text-xs font-black">
                    {lang === "mr" ? "मराठी" : "English"}
                  </span>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold transition-all",
                        isActive
                          ? "bg-[#800020] text-white shadow-sm"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <div>
                        <div>{item.label}</div>
                        <div className="text-xs opacity-75 font-normal">{item.sublabel}</div>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-slate-800 p-4">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800/60 py-3 text-red-200 text-sm font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t.signOut}</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-3">
            <Link href="/admin" className="shrink-0 group">
              <Image
                src="/images/logo.png"
                alt="Sahitya Niketan Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Link href="/admin" className="font-black text-lg sm:text-xl text-[#800020] dark:text-rose-400 tracking-tight hover:opacity-90">
                  {t.adminTitle}
                </Link>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                  CMS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                {subtitle || (lang === "mr" ? "प्रशासक नियंत्रण कक्ष • ग्रंथालय व्यवस्थापन" : "Admin Control Panel • Library Management")}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Language Switcher + View Website Link + Admin User + Logout */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* LANGUAGE TOGGLE PILL (MARATHI <-> ENGLISH) */}
          <button
            onClick={toggleLang}
            title={t.switchLang}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs"
          >
            <Languages className="h-4 w-4 text-[#800020] dark:text-rose-400" />
            <span className="hidden sm:inline font-bold">
              {lang === "mr" ? "मराठी" : "English"}
            </span>
            <span className="text-[11px] bg-[#800020] text-white px-2 py-0.5 rounded-md font-bold">
              {lang === "mr" ? "EN" : "MR"}
            </span>
          </button>


          {/* View Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#800020] transition-colors shadow-2xs"
            title="मुख्य संकेतस्थळ नवीन टॅबमध्ये उघडा"
          >
            <Globe className="h-4 w-4 text-[#800020] dark:text-rose-400" />
            <span className="hidden sm:inline">{t.viewWebsite}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </Link>

          {/* User Info & Logout */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-[#800020] flex items-center justify-center text-white shrink-0">
              <UserCheck className="h-4.5 w-4.5" />
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight truncate max-w-[150px]">
                {adminEmail}
              </p>
              <p className="text-[11px] text-[#800020] dark:text-rose-400 font-bold">{t.adminBadge}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="ml-1 p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
              title={t.signOut}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lower Bar: Permanent Desktop CMS Navigation Bar */}
      <nav className="hidden lg:block border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 cursor-pointer",
                    isActive
                      ? "bg-[#800020] text-white shadow-xs"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                  {item.external && <ExternalLink className="h-3 w-3 opacity-60" />}
                </Link>
              );
            })}
          </div>

          <div className="shrink-0 hidden xl:block">
            <Breadcrumbs variant="minimal" />
          </div>
        </div>
      </nav>
    </header>
  );
}
