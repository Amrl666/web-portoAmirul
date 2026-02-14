"use client";

import { motion } from "framer-motion";
import { CosmicBorder } from "./cosmic-border";

interface CosmicCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "pink" | "rainbow";
  hoverScale?: number;
  onClick?: () => void;
}

export const CosmicCard = ({
  children,
  className = "",
  glowColor = "cyan",
  hoverScale = 1.02,
  onClick,
}: CosmicCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      <CosmicBorder glow={glowColor} animated className="h-full">
        <div className="p-6">{children}</div>
      </CosmicBorder>
    </motion.div>
  );
};

export const CosmicGlowText = ({
  children,
  color = "cyan",
}: {
  children: React.ReactNode;
  color?: "cyan" | "purple" | "pink";
}) => {
  const colorClasses = {
    cyan: "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]",
    purple: "text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]",
    pink: "text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]",
  };

  return (
    <motion.div
      className={`${colorClasses[color]} font-semibold text-lg`}
      animate={{ textShadow: ["0 0 10px rgba(0,0,0,0)", "0 0 20px rgba(0,0,0,0.3)"] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    >
      {children}
    </motion.div>
  );
};
