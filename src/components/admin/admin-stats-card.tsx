"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AdminStatsCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  trend?: { value: number; label: string; up: boolean };
  className?: string;
}

export function AdminStatsCard({
  label,
  value,
  icon: Icon,
  iconBg = "bg-teal-100",
  iconColor = "text-[#00657E]",
  trend,
  className,
}: AdminStatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-5 shadow-2xs flex flex-col gap-3",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-[11px] font-extrabold rounded-full px-2 py-0.5",
              trend.up
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-600"
            )}
          >
            {trend.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.value}%
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-slate-100 leading-tight">
          {value}
        </p>
        <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-0.5">{label}</p>
        {trend && (
          <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">{trend.label}</p>
        )}
      </div>
    </div>
  );
}
