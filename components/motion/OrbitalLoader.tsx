"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function OrbitalLoader() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const hasSeen = sessionStorage.getItem("techorbit_passport_intro");
      if (!hasSeen) {
        setShow(true);
        const timer = setTimeout(() => {
          setShow(false);
          try {
            sessionStorage.setItem("techorbit_passport_intro", "true");
          } catch { }
        }, 1100);
        return () => clearTimeout(timer);
      }
    } catch { }
  }, []);

  if (!mounted || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="orbital-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl"
      >
        {/* Orbital Solar Ring */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Outer rotating orbit ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-blue-500/40 border-t-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
          </motion.div>

          {/* Inner counter-rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-purple-500/40 border-b-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
          </motion.div>

          {/* Central Star */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center space-y-1"
        >
          <p className="text-xs font-mono font-semibold tracking-widest uppercase text-blue-400">
            Initializing Passport Orbit
          </p>
          <p className="text-[11px] text-slate-400">Syncing verified attestations...</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
