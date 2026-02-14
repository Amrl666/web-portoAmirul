"use client";

import { useCallback, useRef } from "react";
import { useToast } from "./use-toast";

const EASTER_EGGS = {
  astronaut_dance: {
    keys: ["a", "s", "t", "r", "o"],
    message: "🚀 Astronaut mode activated!",
  },
  supernova: {
    keys: ["s", "u", "p", "e", "r", "n", "o", "v", "a"],
    message: "💫 Supernova!",
  },
};

export const useEasterEggs = () => {
  const { toast } = useToast();
  const keyPressRef = useRef<string[]>([]);

  const triggerSupernovaEffect = () => {
    // Create explosion effect
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.left = window.innerWidth / 2 + "px";
      particle.style.top = window.innerHeight / 2 + "px";
      particle.style.width = "10px";
      particle.style.height = "10px";
      particle.style.borderRadius = "50%";
      particle.style.background = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "9999";

      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 5 + Math.random() * 5;
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      const animate = () => {
        x += Math.cos(angle) * velocity;
        y += Math.sin(angle) * velocity;
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.opacity = String(1 - (x - window.innerWidth / 2) / 200);

        if (Math.abs(x - window.innerWidth / 2) < 300) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      document.body.appendChild(particle);
      animate();
    }
  };

  const triggerAstronautDance = () => {
    // Make page rotate/shake
    document.documentElement.style.animation =
      "none";
    setTimeout(() => {
      document.documentElement.style.animation =
        "spin 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 4";
    }, 10);

    // Add keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        50% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
        100% { transform: rotate(0deg); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.documentElement.style.animation = "none";
      style.remove();
    }, 2000);
  };

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keyPressRef.current.push(key);

      // Keep only last 20 keys
      if (keyPressRef.current.length > 20) {
        keyPressRef.current.shift();
      }

      // Check for easter eggs
      for (const [eggName, eggConfig] of Object.entries(EASTER_EGGS)) {
        const keysStr = keyPressRef.current.join("");
        const patternStr = eggConfig.keys.join("");

        if (keysStr.includes(patternStr)) {
          toast({
            title: eggConfig.message,
            description: "You found an easter egg! 🎉",
          });

          // Trigger animation
          if (eggName === "supernova") {
            triggerSupernovaEffect();
          }

          if (eggName === "astronaut_dance") {
            triggerAstronautDance();
          }

          // Reset keys
          keyPressRef.current = [];
          break;
        }
      }
    },
    [toast]
  );

  return {
    handleKeyPress,
  };
};
