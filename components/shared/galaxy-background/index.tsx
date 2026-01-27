"use client";

import React, { useEffect, useRef } from "react";

interface GalaxyBackgroundProps {
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  speed?: number;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinkle: number;
  angle: number;
}

export default function GalaxyBackground({
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  speed = 1,
  glowIntensity = 0.3,
  saturation = 0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
}: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const particleCount = Math.floor(100 * density);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * starSpeed,
        vy: (Math.random() - 0.5) * starSpeed,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkle: Math.random() * twinkleIntensity,
        angle: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      // Clear canvas with semi-transparent background
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;

        // Mouse repulsion
        if (mouseRepulsion) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = 150;

          if (distance < minDistance) {
            const force = (minDistance - distance) / minDistance;
            particle.x += (dx / distance) * force * repulsionStrength;
            particle.y += (dy / distance) * force * repulsionStrength;
          }
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Twinkle effect
        particle.opacity = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 * particle.twinkle + particle.angle);

        // Rotation animation
        particle.angle += rotationSpeed * 0.01;

        // Draw particle
        const hue = (hueShift + particle.angle * 10) % 360;
        ctx.fillStyle = `hsla(${hue}, ${100 - saturation}%, 50%, ${particle.opacity})`;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * glowIntensity * 5
        );
        gradient.addColorStop(0, `hsla(${hue}, ${100 - saturation}%, 50%, ${particle.opacity * glowIntensity})`);
        gradient.addColorStop(1, `hsla(${hue}, ${100 - saturation}%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.size * glowIntensity * 5,
          particle.y - particle.size * glowIntensity * 5,
          particle.size * glowIntensity * 10,
          particle.size * glowIntensity * 10
        );

        // Draw star
        ctx.fillStyle = `hsla(${hue}, ${100 - saturation}%, 70%, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, hueShift, speed, glowIntensity, saturation, mouseRepulsion, repulsionStrength, twinkleIntensity, rotationSpeed, starSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "radial-gradient(ellipse at center, #0a0e27 0%, #000000 100%)" }}
    />
  );
}
