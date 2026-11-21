"use client";

import { useState, useEffect } from "react";
import { storageService } from "@/lib/services/storage";
import { 
  User, 
  ShieldCheck, 
  Globe, 
  Lock, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Award, 
  Plus, 
  Sparkles, 
  Share2,
  CheckCircle2,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Reusable Motion & Interactive Components
import { StarField } from "@/components/motion/StarField";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { OrbitSkills } from "@/components/motion/OrbitSkills";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { OrbitalLoader } from "@/components/motion/OrbitalLoader";
import { ShareToast } from "@/components/motion/ShareToast";

export default function PassportPage() {
  const [profile, setProfile] = useState(() => storageService.getProfile());
  const [isPublic, setIsPublic] = useState(profile.privacyLevel === "public");
  const [showShareToast, setShowShareToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Typewriter effect state for headline
  const [typedHeadline, setTypedHeadline] = useState("");
  const fullHeadline = profile.headline;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullHeadline.length) {
        setTypedHeadline(fullHeadline.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 38);
    return () => clearInterval(timer);
  }, [fullHeadline]);

  const triggerConfetti = async () => {
    try {
      const confettiModule = (await import("canvas-confetti")).default;
      confettiModule({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#8b5cf6", "#10b981", "#fbbf24"],
        disableForReducedMotion: true,
      });
    } catch {
      // Safe fallback if canvas blocked
    }
  };

  const togglePrivacy = () => {
    const newLevel = isPublic ? "private" : "public";
    setIsPublic(!isPublic);
    storageService.updateProfile({ privacyLevel: newLevel });

    if (!isPublic) {
      // Switched to public -> trigger celebratory confetti
      triggerConfetti();
      setToastMessage("Passport published to the TechOrbit network!");
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
    triggerConfetti();
    setToastMessage("Public Passport URL copied to clipboard!");
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-24 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* 1. ATMOSPHERE & BACKGROUND LAYER */}
      <ScrollProgressBar />
      <CustomCursor />
      <OrbitalLoader />
      <StarField particleCount={75} />
      <ShareToast show={showShareToast} message={toastMessage} />

      {/* Floating Aurora Blobs (Slow Pulsing) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
          className="absolute top-1/3 -right-40 h-[550px] w-[550px] rounded-full bg-purple-600/15 blur-[130px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-600/10 blur-[120px] mix-blend-screen"
        />

        {/* Faint Grid Overlay for Depth */}
        <div 
          className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" 
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-10">
        {/* 2. HEADER & HERO: THE DEVELOPER SUN CORE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative rounded-3xl border border-slate-800/90 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow Inside Card */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              
              {/* ORBITAL AVATAR (Developer Sun) */}
              <div className="relative flex h-28 w-28 flex-shrink-0 items-center justify-center">
                {/* Outer Rotating Gradient Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-[2px] shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                >
                  <div className="h-full w-full rounded-full bg-slate-950" />
                </motion.div>

                {/* Orbiting Planet 1: Emerald (Inner Orbit) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="absolute inset-0 rounded-full pointer-events-none"
                >
                  <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                </motion.div>

                {/* Orbiting Planet 2: Blue (Outer Orbit) */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                  className="absolute -inset-2.5 rounded-full border border-blue-500/20 border-dashed pointer-events-none"
                >
                  <div className="absolute top-1/2 -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                </motion.div>

                {/* Orbiting Planet 3: Violet Tiny Satellite */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute -inset-5 rounded-full border border-purple-500/10 pointer-events-none"
                >
                  <div className="absolute -bottom-1 left-1/3 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
                </motion.div>

                {/* Avatar Image with Sun Flare */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="relative z-10 h-24 w-24 rounded-full object-cover border-2 border-slate-900 shadow-2xl"
                />
              </div>

              {/* Developer Credentials & Details */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  {/* Name with character reveal and gradient sweep */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
                    {profile.fullName.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </h1>

                  {/* Verified Dev Badge with Reflective Shine Sweep */}
                  <div className="relative group overflow-hidden rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[11px] font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                    <span className="flex items-center gap-1.5">
                      {/* Checkmark draw animation */}
                      <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Verified Dev
                    </span>
                    {/* Periodic shine sweep bar */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 2 }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                  </div>
                </div>

                {/* Typewriter Role Line */}
                <p className="text-xs sm:text-sm font-medium text-blue-400 font-mono flex items-center justify-center sm:justify-start">
                  <span>{typedHeadline}</span>
                  <span className="ml-0.5 inline-block h-3.5 w-[2px] bg-blue-400 animate-pulse" />
                </p>

                <p className="text-xs text-slate-400">
                  {profile.location} • <span className="font-mono text-slate-300">@{profile.githubHandle}</span>
                </p>
              </div>
            </div>

            {/* Public Passport Pill with Breathing Glow & Share Action */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 self-center sm:self-auto">
              <motion.button
                onClick={togglePrivacy}
                animate={{
                  boxShadow: isPublic
                    ? [
                        "0 0 10px rgba(16,185,129,0.2)",
                        "0 0 22px rgba(16,185,129,0.45)",
                        "0 0 10px rgba(16,185,129,0.2)",
                      ]
                    : "none",
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${
                  isPublic
                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                {isPublic ? <Globe className="h-3.5 w-3.5 text-emerald-400" /> : <Lock className="h-3.5 w-3.5" />}
                <span>{isPublic ? "Public Passport (Shareable)" : "Private (Hidden)"}</span>
              </motion.button>

              {isPublic && (
                <button
                  onClick={handleShareClick}
                  title="Copy link with celebratory confetti"
                  className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-700 transition"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Bio text with fade-up */}
          <motion.p variants={itemVariants} className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl pt-4">
            {profile.bio}
          </motion.p>

          {/* Magnetic Social Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/80 text-xs">
            {profile.githubHandle && (
              <MagneticLink href={`https://github.com/${profile.githubHandle}`}>
                <Github className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
                <span className="text-slate-300 group-hover:text-white">github.com/{profile.githubHandle}</span>
              </MagneticLink>
            )}
            {profile.linkedinUrl && (
              <MagneticLink href={profile.linkedinUrl}>
                <Linkedin className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-slate-300 group-hover:text-white">LinkedIn Attestation</span>
              </MagneticLink>
            )}
            {profile.portfolioUrl && (
              <MagneticLink href={profile.portfolioUrl}>
                <ExternalLink className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                <span className="text-slate-300 group-hover:text-white">Personal Domain</span>
              </MagneticLink>
            )}
          </motion.div>
        </motion.div>

        {/* 3. ACHIEVEMENTS & SKILLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* VERIFIED ACHIEVEMENTS (With vertical timeline, 3D Tilt & ScrambleText) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Verified Achievements</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                <AnimatedCounter value={profile.achievements.length} suffix=" Confirmed" />
              </span>
            </div>

            {/* Timeline Container */}
            <div className="relative pl-6 space-y-4">
              {/* Glowing vertical timeline line */}
              <div className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-400/40 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />

              {profile.achievements.map((ach, idx) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="relative"
                >
                  {/* Timeline Node Orb */}
                  <div className="absolute -left-[21px] top-4.5 flex h-4 w-4 items-center justify-center">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-slate-900" />
                    </span>
                  </div>

                  {/* 3D Tilt Card with Spotlight */}
                  <TiltCard
                    spotlightColor="rgba(59, 130, 246, 0.15)"
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-bold text-white leading-snug">{ach.title}</h4>
                      {/* Pulsing Confirmed Badge */}
                      <span className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        Confirmed
                      </span>
                    </div>

                    <p className="text-xs text-blue-400 font-medium mb-3">{ach.eventName}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                      <span className="text-slate-400">{ach.issuedDate}</span>
                      {/* Scramble / Decrypt Hash */}
                      <ScrambleText text={ach.verificationHash || "0x8f3c...b291"} />
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. VERIFIED SKILL MATRIX (With Orbit / Matrix dual view) */}
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/50 p-6 backdrop-blur-xl shadow-lg">
            <OrbitSkills skills={profile.skills} />
          </div>
        </div>

        {/* 5. SHOWCASE PROJECTS (Interactive 3D Tilt Grid) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-400" />
              <h3 className="text-base font-bold text-white">Showcase Projects</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              <AnimatedCounter value={profile.projects.length} suffix=" Deployments" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <TiltCard
                  spotlightColor="rgba(168, 85, 247, 0.15)"
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md hover:border-purple-500/40 transition-colors flex flex-col justify-between h-full"
                >
                  <div>
                    <h4 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
                      <span>{proj.title}</span>
                      {proj.demoUrl && (
                        <ArrowUpRight className="h-4 w-4 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{proj.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-slate-800/80 text-xs">
                    {proj.demoUrl && (
                      <MagneticLink href={proj.demoUrl}>
                        <span className="text-blue-400 font-semibold flex items-center gap-1">
                          Live Demo <ExternalLink className="h-3 w-3" />
                        </span>
                      </MagneticLink>
                    )}
                    {proj.githubUrl && (
                      <MagneticLink href={proj.githubUrl}>
                        <span className="text-slate-400 hover:text-white font-medium flex items-center gap-1">
                          <Github className="h-3.5 w-3.5" /> Repository
                        </span>
                      </MagneticLink>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
