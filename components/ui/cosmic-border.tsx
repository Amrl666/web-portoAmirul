"use client";

import { motion } from "framer-motion";

interface CosmicBorderProps {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "purple" | "pink" | "rainbow";
  animated?: boolean;
}

export const CosmicBorder = ({
  children,
  className = "",
  glow = "cyan",
  animated = true,
}: CosmicBorderProps) => {
  const glowColors: Record<string, string> = {
    cyan: "from-cyan-500 to-blue-500 shadow-cyan-500/50",
    purple: "from-purple-500 to-pink-500 shadow-purple-500/50",
    pink: "from-pink-500 to-rose-500 shadow-pink-500/50",
    rainbow: "from-cyan-500 via-purple-500 to-pink-500 shadow-purple-500/50",
  };

  const borderClass = glowColors[glow];

  return (
    <motion.div
      className={`relative ${className}`}
      animate={animated ? { boxShadow: ["0 0 20px rgba(0,0,0,0)", "0 0 40px rgba(0,0,0,0.1)"] } : {}}
      transition={animated ? { duration: 3, repeat: Infinity, repeatType: "reverse" } : {}}
    >
      {/* Animated border gradient */}
      {animated ? (
        <motion.div
          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${borderClass} opacity-0 blur-lg`}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ pointerEvents: "none" }}
        />
      ) : (
        <div
          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${borderClass} opacity-30 blur-lg`}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Border line */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${borderClass} p-[1px]`}>
        <div className="w-full h-full rounded-lg bg-background" style={{ pointerEvents: "auto" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const CosmicDot = ({
  className = "",
  color = "cyan",
  animated = true,
}: {
  className?: string;
  color?: "cyan" | "purple" | "pink";
  animated?: boolean;
}) => {
  const colors = {
    cyan: "bg-cyan-400 shadow-cyan-500/50",
    purple: "bg-purple-400 shadow-purple-500/50",
    pink: "bg-pink-400 shadow-pink-500/50",
  } as const;

  return (
    <motion.div
      className={`w-2 h-2 rounded-full ${colors[color]} ${className}`}
      animate={animated ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
      transition={animated ? { duration: 3, repeat: Infinity } : {}}
      style={{ boxShadow: `0 0 10px var(--tw-shadow-color)` }}
    />
  );
};
