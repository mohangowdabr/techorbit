import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Github, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white">TechOrbit</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Participant-first technology opportunity ecosystem. Discover, connect, participate, and showcase across the global developer landscape.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Ecosystem Divisions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/discover" className="hover:text-blue-400 transition">Opportunity Radar</Link></li>
              <li><Link href="/teams" className="hover:text-blue-400 transition">TeamMatch Community</Link></li>
              <li><Link href="/passport" className="hover:text-blue-400 transition">Developer Passport</Link></li>
              <li><Link href="/live" className="hover:text-blue-400 transition">TechOrbit Live & Challenges</Link></li>
              <li><Link href="/organizer" className="hover:text-blue-400 transition">Organizer Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Trust & Provenance</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/admin" className="hover:text-blue-400 transition">Data Health Dashboard</Link></li>
              <li><span className="text-slate-400">Strict Provenance Triad (Source, Verification, Freshness)</span></li>
              <li><span className="text-slate-400">Canonical Application Links</span></li>
              <li><span className="text-slate-400">No False Claims: User vs Verified</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Platform Status</h4>
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Systems Operational
                </span>
                <span className="text-slate-400 font-mono text-[10px]">v1.0.0</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Connected to Ingestion Engine, PostgreSQL RLS, and Developer Identity vault.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 TechOrbit Ecosystem. Built for builders worldwide.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              Verified Opportunities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
