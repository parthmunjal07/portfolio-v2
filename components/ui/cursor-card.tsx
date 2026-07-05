"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CursorCardProps {
  children: React.ReactNode;
  image: string;
  description: string;
  href?: string;
  className?: string;
}

export function CursorCard({ children, image, description, href = "#", className }: CursorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const cardWidth = 240;
    const cardHeight = 240; // Approximate height

    let nextX = e.clientX - cardWidth / 2;
    let nextY = e.clientY + 20;

    // Prevent horizontal overflow
    if (nextX < 20) {
      nextX = 20;
    } else if (nextX + cardWidth > window.innerWidth - 20) {
      nextX = window.innerWidth - cardWidth - 20;
    }

    // Prevent vertical overflow (if too close to bottom, show above cursor)
    if (nextY + cardHeight > window.innerHeight - 20) {
      nextY = e.clientY - cardHeight - 20;
    }

    x.set(nextX);
    y.set(nextY);
  };

  return (
    <>
      <a
        href={href}
        className={cn(
          "relative inline-block font-serif text-orange-100 hover:text-white transition-colors cursor-pointer",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                x: springX,
                y: springY,
              }}
              className={cn(
                "fixed top-0 left-0 pointer-events-none z-50 w-[240px]",
                "bg-black/60 backdrop-blur-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl border border-white/10"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="hover preview" className="w-full h-32 rounded-xl mb-3 object-cover shadow-inner" />
              <p className="text-sm text-gray-300 font-serif m-0 leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default CursorCard;
