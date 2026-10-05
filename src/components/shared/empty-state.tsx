import { cn } from "@/lib/utils";
import { BookOpen, Calendar, Image as ImageIcon, Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: "book" | "event" | "gallery" | "search";
  className?: string;
  children?: React.ReactNode;
}

const icons = {
  book: BookOpen,
  event: Calendar,
  gallery: ImageIcon,
  search: Search,
};

/**
 * EmptyState — Elegant empty state display
 */
export function EmptyState({
  title = "Nothing here yet",
  description = "Check back soon for updates.",
  icon = "book",
  className,
  children,
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <Icon
          className="h-7 w-7"
          style={{ color: "var(--color-sandstone)" }}
          strokeWidth={1.2}
        />
      </div>
      <h3
        className="mb-2 text-lg font-bold font-heading text-stone-900 dark:text-stone-100"
      >
        {title}
      </h3>
      <p
        className="max-w-sm text-sm"
        style={{ color: "var(--color-text-light)" }}
      >
        {description}
      </p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
