"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARACTERS = "0123456789abcdefx";

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setDisplayedText(text);
      return;
    }

    let frame = 0;
    const maxFrames = 14;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / maxFrames;
      
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === "." || char === "x" || index < progress * text.length) {
            return text[index];
          }
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join("");

      setDisplayedText(scrambled);

      if (frame >= maxFrames) {
        clearInterval(interval);
        setDisplayedText(text);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isHovering, text]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      title="Click to copy verified hash"
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400 hover:text-blue-300 transition-colors group cursor-pointer ${className}`}
    >
      <span>Hash: {displayedText}</span>
      {copied ? (
        <Check className="h-3 w-3 text-emerald-400" />
      ) : (
        <Copy className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
