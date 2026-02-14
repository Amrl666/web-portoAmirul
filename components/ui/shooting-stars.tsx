"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface ShootingStarsProps {
  className?: string;
  quantity?: number;
  color?: string;
  onStarClick?: () => void;
}

export const ShootingStars = ({
  className = "",
  quantity = 20,
  color = "#ffffff",
  onStarClick,
}: ShootingStarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      isShootingStar: boolean;
      velocity: number;
      active: boolean;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleColor = theme === "dark" ? color : "#000000";

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < quantity; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          isShootingStar: Math.random() > 0.8,
          velocity: Math.random() * 2 + 1,
          active: true,
        });
      }
    };

    initStars();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = particleColor;

      starsRef.current.forEach((star, index) => {
        if (!star.active) return;

        if (star.isShootingStar) {
          // Draw shooting star trail
          const trailLength = 50;
          const gradient = ctx.createLinearGradient(
            star.x - star.vx * trailLength,
            star.y - star.vy * trailLength,
            star.x,
            star.y
          );
          gradient.addColorStop(0, `rgba(255, 200, 100, 0)`);
          gradient.addColorStop(1, `rgba(255, 200, 100, ${star.opacity})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(
            star.x - star.vx * trailLength,
            star.y - star.vy * trailLength
          );
          ctx.lineTo(star.x, star.y);
          ctx.stroke();

          // Core of shooting star
          ctx.fillStyle = `rgba(255, 220, 150, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size + 1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Regular twinkling stars
          ctx.globalAlpha = Math.sin(Date.now() * 0.001 + index) * 0.3 + 0.5;
          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Update position
        star.x += star.vx * star.velocity;
        star.y += star.vy * star.velocity;

        // Reset if out of bounds
        if (
          star.x < 0 ||
          star.x > canvas.width ||
          star.y < 0 ||
          star.y > canvas.height
        ) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.vx = (Math.random() - 0.5) * 2;
          star.vy = (Math.random() - 0.5) * 2;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Click to add more shooting stars
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
        starsRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 2 + 1,
          opacity: 1,
          isShootingStar: true,
          velocity: 3,
          active: true,
        });
      }

      onStarClick?.();
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", handleCanvasClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, theme, quantity, onStarClick]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block", cursor: "pointer" }}
    />
  );
};
