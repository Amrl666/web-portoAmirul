"use client";
import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Particles } from "./particles";

export const SpotlightBackground = ({ 
    children, 
}: { 
    children?: React.ReactNode 
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Determine colors based on theme
  // Default to dark theme colors to avoid flash, but useEffect will handle mounted state
  const isDark = theme === "dark";
  const particleColor = isDark ? "#ffffff" : "#000000";
  
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 min-h-screen w-full -z-10 overflow-hidden bg-background"
    >
        {/* Galaxy Layer 1: Distant Stars (Static, lots of them) */}
        <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0 opacity-40"
            quantity={isDark ? 300 : 150} // More stars in dark mode
            staticity={100} // Very rigid/slow
            size={0.4}
            color={particleColor}
            vx={0.05} // Very slow drift
            refresh
          />
        </div>

        {/* Galaxy Layer 2: Mid-range Stars (Movement, larger) */}
        <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0 opacity-60"
            quantity={isDark ? 100 : 50}
            staticity={50}
            size={0.8}
            ease={50}
            color={particleColor}
            vx={0.1}
            refresh
          />
        </div>

         {/* Galaxy Layer 3: Foreground Stars (Interactive, sparse) */}
         <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0 opacity-80"
            quantity={isDark ? 30 : 15}
            staticity={30}
            size={1.5}
            ease={30}
            color={particleColor}
            vx={0.2}
            refresh
          />
        </div>

        {/* Base Grid Pattern */}
        <div 
            className="absolute inset-0 bg-background/50 z-10"
            style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)/0.15) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }}
        />

        {/* Spotlight Effect */}
        <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary)/0.15), transparent 40%)`,
            }}
        />

        {/* Overlay a subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
        
        {children}
    </div>
  );
};
