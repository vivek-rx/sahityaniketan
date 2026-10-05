// Admin Badge — Status indicator pill
"use client";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "draft"
  | "published"
  | "scheduled"
  | "archived"
  | "pinned"
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "expired"
  | "available"
  | "issued"
  | "reference"
  | "urgent"
  | "high"
  | "normal";

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  draft:       "bg-gray-100 text-gray-600 border-gray-300",
  published:   "bg-emerald-100 text-emerald-800 border-emerald-300",
  scheduled:   "bg-blue-100 text-blue-800 border-blue-300",
  archived:    "bg-slate-100 text-slate-500 border-slate-300",
  pinned:      "bg-purple-100 text-purple-800 border-purple-300",
  pending:     "bg-amber-100 text-amber-800 border-amber-300",
  approved:    "bg-emerald-100 text-emerald-800 border-emerald-300",
  rejected:    "bg-red-100 text-red-700 border-red-300",
  active:      "bg-teal-100 text-teal-800 border-teal-300",
  expired:     "bg-gray-100 text-gray-500 border-gray-300",
  available:   "bg-emerald-100 text-emerald-800 border-emerald-300",
  issued:      "bg-amber-100 text-amber-800 border-amber-300",
  reference:   "bg-blue-100 text-blue-800 border-blue-300",
  urgent:      "bg-red-100 text-red-700 border-red-300",
  high:        "bg-orange-100 text-orange-800 border-orange-300",
  normal:      "bg-gray-100 text-gray-600 border-gray-300",
};

const VARIANT_LABELS: Record<BadgeVariant, string> = {
  draft:       "Draft",
  published:   "Published",
  scheduled:   "Scheduled",
  archived:    "Archived",
  pinned:      "Pinned",
  pending:     "Pending",
  approved:    "Approved",
  rejected:    "Rejected",
  active:      "Active",
  expired:     "Expired",
  available:   "Available",
  issued:      "Issued",
  reference:   "Ref. Only",
  urgent:      "Urgent",
  high:        "High",
  normal:      "Normal",
};

interface AdminBadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

export function AdminBadge({ variant, label, className }: AdminBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {label ?? VARIANT_LABELS[variant]}
    </span>
  );
}
