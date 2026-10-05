"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface TiltCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  glare?: boolean;
  glareOpacity?: number;
  isReversed?: boolean;
  springOptions?: SpringOptions;
}

export function TiltCard({
  children,
  className,
  containerClassName,
  maxTilt = 15,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  glareOpacity = 0.2,
  isReversed = false,
  springOptions = {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  },
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  // Rotate card on X and Y
  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    isReversed ? [-maxTilt, maxTilt] : [maxTilt, -maxTilt]
  );
  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    isReversed ? [maxTilt, -maxTilt] : [-maxTilt, maxTilt]
  );

  // Dynamic glare position
  const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={cn("relative inline-block", containerClassName)}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl transition-shadow will-change-transform",
          className
        )}
        {...props}
      >
        {children}

        {/* Dynamic Light Sheen / Glare Overlay */}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[inherit]"
            style={{
              opacity: isHovered ? glareOpacity : 0,
              background: useTransform(
                [glareX, glareY],
                ([latestX, latestY]) =>
                  `radial-gradient(circle 300px at ${latestX} ${latestY}, rgba(255, 255, 255, 0.45), transparent 70%)`
              ),
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

// Re-export Tilt as an alias for compatibility with @motion/tilt
export const Tilt = TiltCard;
export default TiltCard;
