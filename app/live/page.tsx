"use client";

import { useState } from "react";
import { Trophy, CheckCircle2, Clock, Upload, Star, Send, ExternalLink } from "lucide-react";

export default function LivePage() {
  const [activeTab, setActiveTab] = useState<"submission" | "judging" | "leaderboard">("submission");

  // Project Submission Form
  const [projectTitle, setProjectTitle] = useState("Agentic Sentinel PoC");
  const [repoUrl, setRepoUrl] = useState("https://github.com/mohankrishna/agentic-sentinel");
  const [demoUrl, setDemoUrl] = useState("https://agentic-sentinel.vercel.app");
  const [summary, setSummary] = useState("Autonomous multi-agent scanner identifying vulnerabilities in smart contract state machines.");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Judging State
  const [scores, setScores] = useState({
    innovation: 9,
    execution: 8,
    impact: 9,
    presentation: 9,
  });

  const leaderboard = [
    { rank: 1, team: "Autonomous Agents Syndicate", score: 94.5, project: "Agentic Sentinel", track: "AI & Tool Use" },
    { rank: 2, team: "Algorithmic Titans", score: 91.2, project: "GraphPulse Engine", track: "High Performance" },
    { rank: 3, team: "ZeroKnowledge Swarm", score: 88.0, project: "zkAudit Framework", track: "Privacy & Security" },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <Trophy className="h-4 w-4" />
          <span>TechOrbit Live Arena</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Global AI Agents Hackathon 2026 — Live Workspace
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Online participation, live submission workflows, criteria-based judging, and real-time leaderboards for events hosted directly on TechOrbit.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-2 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("submission")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              activeTab === "submission"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Project Submission
          </button>
          <button
            onClick={() => setActiveTab("judging")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              activeTab === "judging"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Judging Criteria & Scorecard
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              activeTab === "leaderboard"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Live Leaderboard
          </button>
        </div>
      </div>

      {/* Tab 1: Submission */}
      {activeTab === "submission" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Hackathon Project Submission Portal</h3>
            {isSubmitted && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="h-4 w-4" /> Submission Locked & Timestamped
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Project Name *</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Repository URL *</label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Live Demo URL</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Architectural Summary</label>
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsSubmitted(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 text-xs transition"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitted ? "Update Submission" : "Submit Project"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Judging Scorecard */}
      {activeTab === "judging" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
          <h3 className="text-base font-bold text-white">Judge Evaluation Matrix (Criteria-Based)</h3>
          <p className="text-xs text-slate-400">
            Scores are normalized across judges. Weightings: Innovation (30%), Technical Depth (30%), Practical Impact (20%), UX & Polish (20%).
          </p>

          <div className="space-y-4 text-xs">
            {Object.entries(scores).map(([crit, val]) => (
              <div key={crit} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="capitalize font-bold text-slate-200">{crit}</span>
                  <span className="text-blue-400 font-mono font-bold">{val} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={val}
                  onChange={(e) => setScores({ ...scores, [crit]: parseInt(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Leaderboard */}
      {activeTab === "leaderboard" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Official Event Standings</h3>
          <div className="space-y-2">
            {leaderboard.map((row) => (
              <div
                key={row.rank}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-lg bg-slate-800 font-mono font-bold text-white flex items-center justify-center">
                    #{row.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-white">{row.team}</h4>
                    <p className="text-slate-400">{row.project} • {row.track}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400 text-sm">{row.score} pts</div>
                  <div className="text-[10px] text-slate-400">Verified by 4 Judges</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
