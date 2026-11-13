import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = {
  title: "प्रशासक नियंत्रण कक्ष",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
