"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}

export function MagneticLink({
  children,
  href,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const pullFactor = 0.25; // Gentle magnetic attraction
    const x = (clientX - centerX) * pullFactor;
    const y = (clientY - centerY) * pullFactor;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={`group relative inline-flex items-center gap-1.5 py-1 ${className}`}
    >
      {children}
      {/* Dynamic Animated Underline */}
      <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </motion.a>
  );
}
