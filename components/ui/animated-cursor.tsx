"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AnimatedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return;

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        cursor.style.opacity = "1";
        isVisible = true;
      }
      // Directly manipulating style for performance
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onMouseDown = () => {
      cursor.style.transform = `${cursor.style.transform} scale(0.75)`;
    };

    const onMouseUp = () => {
      cursor.style.transform = cursor.style.transform.replace(" scale(0.75)", "");
    };

    const onMouseLeave = () => {
      cursor.style.opacity = "0";
      isVisible = false;
    };

    // Add event listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    // Interactive elements logic with MutationObserver for dynamic elements
    const attachHoverListeners = () => {
      const handleLinkHover = () => {
        cursor.style.width = "48px";
        cursor.style.height = "48px";
        cursor.style.backgroundColor = "hsl(var(--primary) / 0.5)";
        cursor.style.mixBlendMode = "normal";
      };
      
      const handleLinkLeave = () => {
        cursor.style.width = "32px";
        cursor.style.height = "32px";
        cursor.style.backgroundColor = "hsl(var(--primary) / 0.3)";
        cursor.style.mixBlendMode = "";
      };

      const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkHover);
        el.addEventListener("mouseleave", handleLinkLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleLinkHover);
          el.removeEventListener("mouseleave", handleLinkLeave);
        });
      };
    };

    let cleanupHoverListeners = attachHoverListeners();

    // Observe DOM changes to reattach listeners
    const observer = new MutationObserver(() => {
      cleanupHoverListeners();
      cleanupHoverListeners = attachHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cleanupHoverListeners();
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary bg-primary/30 pointer-events-none z-[9999] transition-all duration-200 ease-out backdrop-blur-sm shadow-lg shadow-primary/50 opacity-0"
      )}
      style={{ willChange: "transform" }}
    />
  );
};
export default AnimatedCursor;