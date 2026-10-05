"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

export interface DockItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
  href?: string
  badgeCount?: number
}

export interface DockProps {
  className?: string
  items: DockItem[]
  activeLabel?: string | null
}

export default function Dock({ items, className, activeLabel }: DockProps) {
  const [active, setActive] = React.useState<string | null>(activeLabel ?? null)
  const [hovered, setHovered] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (activeLabel !== undefined) {
      setActive(activeLabel)
    }
  }, [activeLabel])

  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <div
        className={cn(
          "flex items-end gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl sm:rounded-3xl",
          "border border-zinc-200/80 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl",
          "transform-gpu will-change-transform"
        )}
      >
        <TooltipProvider delayDuration={100}>
          {items.map((item, i) => {
            const isActive = active === item.label
            const isHovered = hovered === i

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isHovered ? 1.15 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="relative flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-xl sm:rounded-2xl relative h-10 w-10 sm:h-11 sm:w-11",
                        "transition-all duration-150 active:scale-90",
                        isHovered && "bg-zinc-100 dark:bg-zinc-800 shadow-sm",
                        isActive && "bg-zinc-100 dark:bg-zinc-800/80 text-primary font-bold"
                      )}
                      onClick={() => {
                        setActive(item.label)
                        item.onClick?.()
                      }}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 sm:h-6 sm:w-6 transition-colors",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      />
                    </Button>

                    {/* Active indicator dot */}
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shadow-xs"
                      />
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs font-marathi-body">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
    </div>
  )
}


export { Dock }
