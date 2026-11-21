"use client";

import Link from "next/link";
import { Compass, Users, User, ShieldCheck, Sparkles, ArrowRight, Trophy, Zap, Terminal, Globe2 } from "lucide-react";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { storageService } from "@/lib/services/storage";
import { useState } from "react";

export default function HomePage() {
  const [opportunities] = useState(() => storageService.getOpportunities().slice(0, 3));

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Participant-First Technology Ecosystem</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Every Opportunity. <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                One Connected Ecosystem.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Connect the complete developer journey: discover hackathons, internships, fellowships, and open-source programs; match with dream teammates; compete in live events; and showcase verified achievements.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 text-sm shadow-lg shadow-blue-500/25 transition"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Opportunity Radar</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/teams"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3 text-sm transition"
              >
                <Users className="h-4 w-4" />
                <span>Find Teammates</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-bold text-white font-mono">15+</div>
              <div className="text-xs text-slate-400">Opportunity Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-400">Verified Canonical Links</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 font-mono">3-Layer</div>
              <div className="text-xs text-slate-400">Provenance Triad</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 font-mono">Real-Time</div>
              <div className="text-xs text-slate-400">TeamMatch & Ingestion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunity Radar Spotlight */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              <Zap className="h-3.5 w-3.5" />
              <span>Opportunity Radar Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Global Opportunities</h2>
          </div>
          <Link
            href="/discover"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            Browse all opportunities <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>

      {/* 6 Divisions Architecture Grid */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Modular Monolith Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Six Integrated Divisions</h2>
          <p className="text-xs text-slate-400">
            One unified application sharing accounts, database, design system, and permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">TechOrbit Discover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global Opportunity Radar spanning hackathons, coding competitions, internships, open source, fellowships, and research.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">TechOrbit Community</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              TeamMatch engine to discover complementary collaborators, form teams linked to opportunities, and join student builder groups.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Developer Passport</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifiable proof of work with separated organizer-confirmed credentials, GitHub showcase repositories, and skill matrices.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">TechOrbit Live</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Online challenge execution with direct project submissions, criteria-based judging scorecards, and live leaderboards.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">TechOrbit Intelligence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ground-truth AI recommendations, personalized eligibility matching, and natural-language query discovery without hallucination.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">TechOrbit Organizer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Event creation, draft review, attendee management, and ingestion status monitoring with complete moderation workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Provenance Triad Callout */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-purple-950/60 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              Trust & Data Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Every Opportunity Tracks Three Independent Dimensions
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Unlike scraper platforms with broken links and hallucinated dates, TechOrbit maintains an auditable provenance trail for every record:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-blue-400 mb-1">1. Source Origin</div>
                <div className="text-[11px] text-slate-400">Official APIs, verified organizers, or community submissions.</div>
              </div>
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 mb-1">2. Verification State</div>
                <div className="text-[11px] text-slate-400">Human & automated moderator review before public indexing.</div>
              </div>
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 mb-1">3. Freshness Status</div>
                <div className="text-[11px] text-slate-400">Continuous deadline monitoring & timestamp checks.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
