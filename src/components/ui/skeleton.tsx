import { cn } from "@/lib/utils";
export * from "./loader-skeleton";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden isolate rounded-2xl bg-[#ECE3D5]/80 dark:bg-[#1E1115]/90 border border-[#DCD3C3]/40 dark:border-[#331C22]/50 animate-pulse",
        className
      )}
      {...props}
    />
  );
}

/** Facebook/YouTube/LinkedIn style Skeleton Loader for Book Cards */
export function BookCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-5 space-y-4 shadow-2xs">
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
}

/** Table Skeleton Loader for Admin Tables */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-6 space-y-4">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-slate-800">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
