"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FloatingAstronautProps {
  className?: string;
  size?: number;
  emoji?: string;
}

export const FloatingAstronaut = ({
  className = "",
  size = 80,
  emoji = "👨‍🚀",
}: FloatingAstronautProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current && isHovered) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = 20;

        setMousePosition({
          x: Math.cos(angleRad) * distance,
          y: Math.sin(angleRad) * distance,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <motion.div
      ref={ref}
      className={`cursor-pointer select-none ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: isHovered ? [0, 5, -5, 0] : 0,
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 0.6,
          ease: "easeInOut",
        },
      }}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <motion.div
        animate={isHovered ? mousePosition : { x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-full h-full flex items-center justify-center text-4xl filter drop-shadow-lg"
      >
        {emoji}
      </motion.div>

      {/* Halo effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ pointerEvents: "none", filter: "blur(20px)" }}
      />
    </motion.div>
  );
};
