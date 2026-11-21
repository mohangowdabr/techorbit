"use client";

import { useState } from "react";
import { Sparkles, X, Brain, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { storageService } from "@/lib/services/storage";
import { IntelligenceEngine, MatchResult } from "@/lib/services/intelligence";
import { Opportunity } from "@/lib/types";
import Link from "next/link";

interface CopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOpportunity?: (slug: string) => void;
}

export function CopilotModal({ isOpen, onClose }: CopilotModalProps) {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<{ opp: Opportunity; match: MatchResult }[]>([]);

  if (!isOpen) return null;

  const profile = storageService.getProfile();
  const allOpps = storageService.getOpportunities();

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let filtered = [...allOpps];

      if (query.trim()) {
        const parsed = IntelligenceEngine.parseNaturalQuery(query);
        if (parsed.category) {
          filtered = filtered.filter(o => o.category === parsed.category);
        }
        if (parsed.skills.length > 0) {
          filtered = filtered.filter(o =>
            o.skills.some(s => parsed.skills.includes(s.toLowerCase()))
          );
        }
      }

      const results = filtered.map(opp => ({
        opp,
        match: IntelligenceEngine.calculateMatch(profile, opp)
      })).sort((a, b) => b.match.score - a.match.score);

      setRecommendations(results.slice(0, 3));
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">TechOrbit Intelligence Copilot</h3>
            <p className="text-xs text-slate-400">Matchmaker, skill-gap analysis, and natural-language discovery</p>
          </div>
        </div>

        {/* Input prompt */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Describe what you are looking for (or leave empty to match against your Passport profile):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Find me remote AI hackathons with Python and high prizes"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>

        {/* User profile synopsis */}
        <div className="mb-4 rounded-xl bg-slate-950/60 border border-slate-800 p-3 text-xs text-slate-400 flex items-center justify-between">
          <span>Active Profile: <strong className="text-slate-200">{profile.fullName}</strong> ({profile.role})</span>
          <span className="text-blue-400 font-mono">{profile.skills.length} skills indexed</span>
        </div>

        {/* Results */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {recommendations.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              Click &quot;Analyze&quot; to calculate your personalized opportunity match score and skill-gap recommendations.
            </div>
          ) : (
            recommendations.map(({ opp, match }) => (
              <div
                key={opp.id}
                className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-2 hover:border-blue-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white line-clamp-1">{opp.title}</span>
                  <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-blue-400 text-xs font-bold">
                    <Sparkles className="h-3 w-3" />
                    <span>{match.score}% Match</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{match.explanation}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> {match.matchedSkills.length} Synergies
                    </span>
                    {match.missingSkills.length > 0 && (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {match.missingSkills.length} Gaps
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/opportunities/${opp.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    View Opportunity <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
