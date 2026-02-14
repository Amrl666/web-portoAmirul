"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export const GlitchText = ({
  children,
  className = "",
  intensity = "medium",
}: GlitchTextProps) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <style jsx>{`
        .glitch {
          position: relative;
          color: currentColor;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .glitch::before {
          animation: glitch-anim 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            infinite;
          color: #ff00ff;
          z-index: -1;
        }
        .glitch::after {
          animation: glitch-anim2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            infinite;
          color: #00ffff;
          z-index: -2;
        }
        @keyframes glitch-anim {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 5%, 0 10%);
            transform: translate(-2px, -2px);
          }
          20% {
            clip-path: polygon(0 5%, 100% 0, 100% 10%, 0 100%);
            transform: translate(2px, 2px);
          }
          40% {
            clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 90%);
            transform: translate(-2px, 2px);
          }
          60% {
            clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
            transform: translate(2px, -2px);
          }
          80% {
            clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 80%);
            transform: translate(-2px, -2px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translate(0, 0);
          }
        }
        @keyframes glitch-anim2 {
          0% {
            clip-path: polygon(0 10%, 100% 5%, 100% 100%, 0 95%);
            transform: translate(2px, 2px);
          }
          20% {
            clip-path: polygon(0 0, 100% 10%, 100% 80%, 0 100%);
            transform: translate(-2px, -2px);
          }
          40% {
            clip-path: polygon(0 5%, 100% 0, 100% 90%, 0 100%);
            transform: translate(2px, -2px);
          }
          60% {
            clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 90%);
            transform: translate(-2px, 2px);
          }
          80% {
            clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 100%);
            transform: translate(2px, 2px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translate(0, 0);
          }
        }
      `}</style>
      <span
        className="glitch font-bold"
        data-text={String(children)}
      >
        {children}
      </span>
    </div>
  );
};
