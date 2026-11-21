"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface ShareToastProps {
  show: boolean;
  message?: string;
}

export function ShareToast({ show, message = "Public Passport URL copied to clipboard!" }: ShareToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-slate-900/90 px-5 py-3 text-xs font-semibold text-white shadow-[0_10px_35px_rgba(16,185,129,0.3)] backdrop-blur-md"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span>{message}</span>
          <Sparkles className="h-4 w-4 text-emerald-400 animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
