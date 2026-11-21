"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Mail, Sparkles, ShieldCheck, UserCheck, ArrowRight, Check } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { storageService } from "@/lib/services/storage";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "developer" | "organizer">("developer");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  // GitHub OAuth Login
  const handleGitHubAuth = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: typeof window !== "undefined" ? `${window.location.origin}/passport` : undefined,
          },
        });
        if (error) throw error;
      } else {
        // Local Demo fallback
        storageService.updateProfile({
          fullName: "GitHub User (Demo)",
          githubHandle: "github-dev",
          role: "developer",
        });
        setSuccessMsg("Logged in via GitHub (Local Demo Mode)!");
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          onClose();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to authenticate with GitHub");
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isSupabaseConfigured()) {
        if (tab === "signin") {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { role },
            },
          });
          if (error) throw error;
        }
      } else {
        // Local Demo mode
        storageService.updateProfile({
          fullName: email.split("@")[0] || "Demo User",
          role,
        });
      }

      setSuccessMsg(tab === "signin" ? "Successfully signed in!" : "Account created successfully!");
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess();
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Persona Switcher for easy testing
  const selectDemoPersona = (persona: { name: string; role: "student" | "developer" | "organizer" | "admin"; handle: string }) => {
    storageService.updateProfile({
      fullName: persona.name,
      role: persona.role,
      githubHandle: persona.handle,
    });
    setSuccessMsg(`Switched active session to ${persona.name} (${persona.role})`);
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-56 w-56 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Join TechOrbit</h3>
            <p className="text-xs text-slate-400">Every Opportunity. One Connected Ecosystem.</p>
          </div>
        </div>

        {/* GitHub 1-Click OAuth Button */}
        <button
          onClick={handleGitHubAuth}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:border-slate-600 px-4 py-3 text-xs font-semibold text-white shadow-sm transition group mb-4"
        >
          <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span>Continue with GitHub</span>
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-[1px] flex-1 bg-slate-800" />
          <span className="text-[11px] font-mono uppercase text-slate-400">or with email</span>
          <div className="h-[1px] flex-1 bg-slate-800" />
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs mb-4">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
              tab === "signin" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
              tab === "signup" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@techorbit.dev"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {tab === "signup" && (
            <div>
              <label className="block text-slate-300 font-medium mb-1">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="developer">Developer (Hackathons, Open Source)</option>
                <option value="student">Student / Early Career</option>
                <option value="organizer">Organizer (Host & Publish Events)</option>
              </select>
            </div>
          )}

          {errorMsg && (
            <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2 font-medium">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 font-medium flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" />
              <span>{successMsg}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 shadow-md shadow-blue-500/20 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : tab === "signin" ? "Sign In" : "Register Profile"}
          </button>
        </form>

        {/* 1-Click Quick Demo Personas */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Instant Test Personas:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() =>
                selectDemoPersona({ name: "Mohan Krishna", role: "developer", handle: "mohankrishna" })
              }
              className="rounded-lg border border-slate-800 bg-slate-950/80 hover:border-blue-500/40 p-2 text-left transition"
            >
              <div className="font-semibold text-slate-200">Mohan Krishna</div>
              <div className="text-[10px] text-blue-400">Verified Dev</div>
            </button>
            <button
              onClick={() =>
                selectDemoPersona({ name: "Elena Rostova", role: "organizer", handle: "erostova" })
              }
              className="rounded-lg border border-slate-800 bg-slate-950/80 hover:border-purple-500/40 p-2 text-left transition"
            >
              <div className="font-semibold text-slate-200">Elena Rostova</div>
              <div className="text-[10px] text-purple-400">Event Organizer</div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
