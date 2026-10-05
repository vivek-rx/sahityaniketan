"use client";

import { cn } from "@/lib/utils";
import {
  MotionSkeleton,
  BookCardSkeleton,
  BookGridSkeleton as MotionBookGridSkeleton,
  EventCardSkeleton,
  BlogCardSkeleton,
  TeamMemberSkeleton,
} from "@/components/ui/loader-skeleton";

export {
  BookCardSkeleton,
  EventCardSkeleton,
  BlogCardSkeleton,
  TeamMemberSkeleton,
};

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "book" | "text" | "avatar" | "banner" | "event" | "blog" | "team";
}

/**
 * LoadingSkeleton — Motion-animated Heritage loading placeholders
 */
export function LoadingSkeleton({
  className,
  variant = "card",
}: LoadingSkeletonProps) {
  switch (variant) {
    case "book":
      return <BookCardSkeleton className={className} />;

    case "event":
      return <EventCardSkeleton className={className} />;

    case "blog":
      return <BlogCardSkeleton className={className} />;

    case "team":
      return <TeamMemberSkeleton className={className} />;

    case "text":
      return (
        <div className={cn("space-y-3", className)}>
          <MotionSkeleton className="h-4 w-3/4" />
          <MotionSkeleton className="h-4 w-full" />
          <MotionSkeleton className="h-4 w-5/6" />
        </div>
      );

    case "avatar":
      return (
        <div className={cn("flex items-center gap-3", className)}>
          <MotionSkeleton variant="circular" className="h-10 w-10" />
          <div className="space-y-2">
            <MotionSkeleton className="h-3 w-24" />
            <MotionSkeleton className="h-2.5 w-16" />
          </div>
        </div>
      );

    case "banner":
      return (
        <MotionSkeleton
          className={cn("aspect-[21/9] w-full rounded-2xl", className)}
        />
      );

    default:
      return (
        <div className={cn("rounded-2xl p-5 border border-[#DCD3C3] dark:border-[#331E24] bg-[#FAF8F5] dark:bg-[#180E12] space-y-3", className)}>
          <MotionSkeleton className="h-4 w-1/3" />
          <MotionSkeleton className="h-3 w-full" />
          <MotionSkeleton className="h-3 w-5/6" />
          <MotionSkeleton className="h-3 w-2/3" />
        </div>
      );
  }
}

/**
 * BookGridSkeleton — Loading state for book catalogue grid
 */
export function BookGridSkeleton({ count = 8 }: { count?: number }) {
  return <MotionBookGridSkeleton count={count} />;
}
