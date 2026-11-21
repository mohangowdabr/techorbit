"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Orbit, Grid3X3, ShieldCheck, Info } from "lucide-react";

interface SkillItem {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

interface OrbitSkillsProps {
  skills: SkillItem[];
}

export function OrbitSkills({ skills }: OrbitSkillsProps) {
  const [viewMode, setViewMode] = useState<"matrix" | "orbit">("matrix");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Group skills by proficiency level
  const expertSkills = skills.filter((s) => s.level === "expert");
  const advancedSkills = skills.filter((s) => s.level === "advanced");
  const intermediateSkills = skills.filter(
    (s) => s.level === "intermediate" || s.level === "beginner"
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return {
          border: "border-amber-400/60",
          text: "text-amber-300",
          bg: "bg-amber-500/10",
          glow: "shadow-[0_0_12px_rgba(251,191,36,0.3)]",
          barWidth: "w-full",
          barColor: "bg-gradient-to-r from-amber-400 to-yellow-300",
        };
      case "advanced":
        return {
          border: "border-blue-400/60",
          text: "text-blue-300",
          bg: "bg-blue-500/10",
          glow: "shadow-[0_0_10px_rgba(59,130,246,0.25)]",
          barWidth: "w-3/4",
          barColor: "bg-gradient-to-r from-blue-400 to-indigo-400",
        };
      default:
        return {
          border: "border-slate-700",
          text: "text-slate-300",
          bg: "bg-slate-800/40",
          glow: "shadow-none",
          barWidth: "w-1/2",
          barColor: "bg-slate-400",
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Controls: Header + View Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <h3 className="text-base font-bold text-white">Verified Skill Matrix</h3>
          <span className="text-xs font-mono text-slate-400">
            ({skills.length} Evaluated)
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode("matrix")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              viewMode === "matrix"
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            <span>Matrix</span>
          </button>
          <button
            onClick={() => setViewMode("orbit")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              viewMode === "orbit"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Orbit className="h-3.5 w-3.5" />
            <span>Orbit System</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* MATRIX VIEW */}
        {viewMode === "matrix" ? (
          <motion.div
            key="matrix-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2.5"
          >
            {skills.map((skill, index) => {
              const styles = getLevelColor(skill.level);
              const isDimmed = hoveredSkill !== null && hoveredSkill !== skill.name;

              // Gentle floating animation delay
              const floatDelay = (index % 4) * 0.4;

              return (
                <motion.div
                  key={skill.name}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + (index % 3),
                    ease: "easeInOut",
                    delay: floatDelay,
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`relative group rounded-xl border ${styles.border} ${styles.bg} ${styles.glow} px-3.5 py-2 text-xs transition-all duration-300 cursor-pointer ${
                    isDimmed ? "opacity-35 scale-95" : "opacity-100 scale-100 hover:scale-105"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{skill.name}</span>
                    <span
                      className={`text-[10px] font-mono capitalize px-1.5 py-0.5 rounded ${styles.text}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Animated Proficiency Bar under chip */}
                  <div className="mt-1.5 h-[2px] w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 * index }}
                      className={`h-full ${styles.barWidth} ${styles.barColor}`}
                    />
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1 text-[10px] whitespace-nowrap shadow-xl"
                    >
                      <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Verified by TechOrbit</span>
                      </div>
                      <div className="text-slate-400 capitalize">{skill.level} Tier Attestation</div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* ORBIT VIEW (Celestial Rings) */
          <motion.div
            key="orbit-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4"
          >
            {/* Center Solar Core (Developer Sun) */}
            <div className="relative z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-[0_0_35px_rgba(59,130,246,0.6)]">
              <span className="text-xs font-bold text-white tracking-widest uppercase">
                CORE
              </span>
            </div>

            {/* Inner Orbit: EXPERT SKILLS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute h-44 w-44 rounded-full border border-amber-500/30 border-dashed"
            >
              {expertSkills.map((s, idx) => {
                const angle = (idx / expertSkills.length) * 2 * Math.PI;
                const radius = 88; // 176 / 2
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                return (
                  <div
                    key={s.name}
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      left: "50%",
                      top: "50%",
                    }}
                    className="absolute"
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                      className="rounded-full bg-slate-900 border border-amber-400/80 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.4)] whitespace-nowrap"
                    >
                      ★ {s.name}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Middle Orbit: ADVANCED SKILLS */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
              className="absolute h-64 w-64 rounded-full border border-blue-500/25 border-dashed"
            >
              {advancedSkills.map((s, idx) => {
                const angle = (idx / advancedSkills.length) * 2 * Math.PI;
                const radius = 128;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                return (
                  <div
                    key={s.name}
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      left: "50%",
                      top: "50%",
                    }}
                    className="absolute"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
                      className="rounded-full bg-slate-900 border border-blue-400/70 px-2 py-0.5 text-[9px] font-semibold text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)] whitespace-nowrap"
                    >
                      {s.name}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Outer Orbit: INTERMEDIATE SKILLS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
              className="absolute h-80 w-80 rounded-full border border-purple-500/20 border-dotted"
            >
              {intermediateSkills.map((s, idx) => {
                const angle = (idx / intermediateSkills.length) * 2 * Math.PI;
                const radius = 160;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                return (
                  <div
                    key={s.name}
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      left: "50%",
                      top: "50%",
                    }}
                    className="absolute"
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                      className="rounded-full bg-slate-900/90 border border-slate-700 px-2 py-0.5 text-[9px] text-slate-300 whitespace-nowrap"
                    >
                      {s.name}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Legend Overlay */}
            <div className="absolute bottom-2.5 right-3 flex items-center gap-3 text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="flex items-center gap-1 text-amber-400">● Inner (Expert)</span>
              <span className="flex items-center gap-1 text-blue-400">● Mid (Advanced)</span>
              <span className="flex items-center gap-1 text-purple-400">● Outer (Intermediate)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
