"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SkillNode {
  id: string;
  name: string;
  x: number;
  y: number;
  connections: string[];
  category?: string;
}

interface ConstellationProps {
  skills: { name: string; category?: string }[];
  width?: number;
  height?: number;
  className?: string;
}

export const SkillConstellation = ({
  skills,
  width = 400,
  height = 400,
  className = "",
}: ConstellationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<SkillNode[]>([]);

  useEffect(() => {
    // Create constellation nodes
    const newNodes: SkillNode[] = skills.map((skill, index) => {
      const angle = (Math.PI * 2 * index) / skills.length;
      const radius = Math.min(width, height) / 3;
      return {
        id: `skill-${index}`,
        name: skill.name,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        connections: [
          (index - 1 + skills.length) % skills.length,
          (index + 1) % skills.length,
        ].map((i) => `skill-${i}`),
        category: skill.category,
      };
    });

    setNodes(newNodes);
  }, [skills, width, height]);

  // Draw constellation when nodes change
  useEffect(() => {
    if (nodes.length === 0) return;

    // Draw constellation on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawConstellation = () => {
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = "rgba(34, 211, 238, 0.3)";
      ctx.lineWidth = 1;
      nodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const targetNode = nodes.find((n) => n.id === connId);
          if (targetNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes with glow
      nodes.forEach((node) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15);
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.8)");
        gradient.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(node.x - 15, node.y - 15, 30, 30);

        // Node dot
        ctx.fillStyle = "rgba(34, 211, 238, 1)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(drawConstellation);
    };

    drawConstellation();
  }, [nodes, width, height]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full border border-cyan-500/20 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/50"
      />

      {/* Skill labels */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: `${(node.x / width) * 100}%`,
            top: `${(node.y / height) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <motion.div
            className="bg-slate-900 border border-cyan-500/50 rounded-full px-3 py-1 text-xs whitespace-nowrap text-cyan-400 pointer-events-none"
            whileHover={{ scale: 1.1, borderColor: "rgb(34, 211, 238)" }}
            transition={{ duration: 0.2 }}
          >
            {node.name}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
