"use client";

import { useEffect } from "react";
import { useEasterEggs } from "./use-easter-eggs";

export const EasterEggHandler = () => {
  const { handleKeyPress } = useEasterEggs();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e as any);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  return null;
};
