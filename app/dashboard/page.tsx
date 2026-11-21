"use client";

import { useState } from "react";
import { storageService } from "@/lib/services/storage";
import { ActivityRow } from "@/components/dashboard/ActivityRow";
import { LayoutDashboard, Calendar, CheckCircle2, Clock, Filter, AlertCircle } from "lucide-react";
import { ApplicationStatus } from "@/lib/types";
import Link from "next/link";

export default function DashboardPage() {
  const [activities, setActivities] = useState(() => storageService.getUserActivities());
  const opportunities = storageService.getOpportunities();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const oppMap = new Map(opportunities.map(o => [o.id, o]));

  const filtered = activities.filter(a => {
    if (filterStatus === "all") return true;
    return a.status === filterStatus;
  });

  const handleStatusChange = (activityId: string, newStatus: ApplicationStatus) => {
    setActivities([...storageService.getUserActivities()]);
  };

  const handleRemove = (opportunityId: string) => {
    storageService.removeActivity(opportunityId);
    setActivities([...storageService.getUserActivities()]);
  };

  // Status counters
  const counts = {
    total: activities.length,
    saved: activities.filter(a => a.status === 'saved').length,
    applied: activities.filter(a => a.status === 'applied').length,
    participating: activities.filter(a => a.status === 'participating').length,
    completed: activities.filter(a => a.status === 'completed').length,
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <span>Participant Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Activities & Journey Tracker
          </h1>
          <p className="text-xs text-slate-400">
            Track your pipeline from saved discovery to applied, participating, and completed achievements.
          </p>
        </div>

        <Link
          href="/discover"
          className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-blue-500/20 self-start sm:self-auto"
        >
          Discover More Opportunities
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">Total Tracked</div>
          <div className="text-2xl font-bold text-white font-mono">{counts.total}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">Saved / Evaluating</div>
          <div className="text-2xl font-bold text-blue-400 font-mono">{counts.saved}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">Applied</div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{counts.applied}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-slate-400 text-xs">Active Participating</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{counts.participating}</div>
        </div>
      </div>

      {/* Provenance Truth Callout */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex items-start gap-3 text-xs text-slate-400">
        <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Integrity Notice:</strong> TechOrbit differentiates between <span className="text-emerald-400 font-semibold">Organizer Confirmed</span> milestones and <span className="text-slate-300 font-semibold">Self-Reported</span> progress. We never falsely claim external confirmation.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs">
        {['all', 'saved', 'applied', 'participating', 'completed'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`capitalize px-3 py-1.5 rounded-lg transition ${
              filterStatus === st
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center text-xs text-slate-400">
            No activities in this status category. Head over to the <Link href="/discover" className="text-blue-400 underline">Opportunity Radar</Link> to save or apply to events.
          </div>
        ) : (
          filtered.map((activity) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              opportunity={oppMap.get(activity.opportunityId)}
              onStatusChange={handleStatusChange}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}
