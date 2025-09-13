"use client";
import { cn } from "@/lib/utils";
import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  HTMLAttributes,
} from "react";
import { createNoise3D } from "simplex-noise";
import { useTheme } from "next-themes";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}: {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
} & HTMLAttributes<HTMLDivElement>) => {
  const { theme } = useTheme(); // detect theme
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = createNoise3D();

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (ctx.canvas.width = window.innerWidth);
    let h = (ctx.canvas.height = window.innerHeight);
    let nt = 0;
    let animationId: number;

    const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

    const waveColors = colors ?? [
      "#38bdf8", // sky-400
      "#0ea5e9", // sky-500
      "#3b82f6", // blue-500
      "#1d4ed8", // blue-700
      "#6366f1", // indigo-500
    ];

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = backgroundFill || (theme === "dark" ? "black" : "white");
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    // Init
    ctx.filter = `blur(${blur}px)`;
    render();

    window.onresize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    return () => cancelAnimationFrame(animationId);
  }, [
    theme,
    blur,
    speed,
    waveWidth,
    backgroundFill,
    waveOpacity,
    colors,
    noise,
  ]);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
      {...props}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
