"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

export const LoaderOne = ({
  className,
  fullScreen = false,
  text,
}: LoaderProps) => {
  const content = (
    <div className={cn("inline-flex items-center gap-2 text-[#800020] dark:text-[#E5B869]", className)}>
      <Loader2 className="h-5 w-5 animate-spin" />
      {text && (
        <span className="text-xs font-semibold font-marathi-body tracking-wide">
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-8">
        {content}
      </div>
    );
  }

  return content;
};

export default LoaderOne;
