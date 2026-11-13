"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Loader2 } from "lucide-react";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname === "/admin/login";

  // `/admin/login` is public. Every other admin route starts in the checking
  // state, so nothing admin-only flashes on screen before the server answers.
  const [checking, setChecking] = useState(!isLoginRoute);
  const [authorized, setAuthorized] = useState(isLoginRoute);

  useEffect(() => {
    if (isLoginRoute) return;

    let cancelled = false;

    async function check() {
      try {
        // Server-side check: proves the account is an active admin, not merely
        // that a session cookie exists. See /api/admin/session.
        const res = await fetch("/api/admin/session", {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (cancelled) return;

        if (!res.ok) {
          router.replace("/login?role=admin&reason=forbidden");
          return;
        }

        setAuthorized(true);
      } catch {
        if (!cancelled) {
          router.replace("/login?role=admin&reason=error");
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    check();

    return () => {
      cancelled = true;
    };
    // `router` is stable; `isLoginRoute` is the only value that changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginRoute]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#800020] dark:text-[#E5B869]" />
          <p className="text-slate-400 text-sm font-medium font-marathi-body">
            सत्यापन करत आहे...
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}