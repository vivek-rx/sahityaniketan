"use client";

import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";
import { AdminLanguageProvider } from "@/context/admin-language-context";
import { usePathname } from "next/navigation";

const NO_AUTH_ROUTES = ["/admin/login"];

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (NO_AUTH_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <AdminAuthGuard>
      <AdminLanguageProvider>
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
          {children}
        </div>
      </AdminLanguageProvider>
    </AdminAuthGuard>
  );
}
