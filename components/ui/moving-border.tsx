"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface MovingButtonProps {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  borderColor?: string; // new prop
  [key: string]: any;
}

export function MovingButton({
  borderRadius = "50%",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  borderColor = "#0EA5E9", // default color
  ...otherProps
}: MovingButtonProps) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder
          duration={duration}
          rx="50%"
          ry="50%"
          borderColor={borderColor}
        >
          <div
            className={cn("h-20 w-20 opacity-[0.8]", borderClassName)}
            style={{
              borderRadius: "50%",
              background: `radial-gradient(${borderColor} 40%, transparent 60%)`,
            }}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  borderColor?: string;
  [key: string]: any;
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  borderColor = "#0EA5E9",
  ...otherProps
}: MovingBorderProps) => {
  const rectRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = rectRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => rectRef.current?.getPointAtLength?.(val).x || 0
  );
  const y = useTransform(
    progress,
    (val) => rectRef.current?.getPointAtLength?.(val).y || 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          stroke={borderColor}
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={rectRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
