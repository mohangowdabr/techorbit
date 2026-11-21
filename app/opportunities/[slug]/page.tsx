"use client";

import { useParams, useRouter } from "next/navigation";
import { storageService } from "@/lib/services/storage";
import { formatTimeRemaining, formatDate, getVerificationBadgeColor } from "@/lib/utils";
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Trophy, 
  ExternalLink, 
  Bookmark, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ApplicationStatus } from "@/lib/types";

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const opportunity = storageService.getOpportunityBySlug(slug);
  const profile = storageService.getProfile();
  const existingActivities = storageService.getUserActivities();
  const currentActivity = existingActivities.find(a => a.opportunityId === opportunity?.id);

  const [activityStatus, setActivityStatus] = useState<ApplicationStatus | null>(
    currentActivity ? currentActivity.status : null
  );

  if (!opportunity) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Opportunity not found</h2>
        <p className="text-xs text-slate-400">The opportunity you are looking for may have expired or been relocated.</p>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Opportunity Radar
        </Link>
      </div>
    );
  }

  const timeInfo = formatTimeRemaining(opportunity.deadline);

  // Teams matching this opportunity
  const associatedTeams = storageService.getTeams().filter(
    t => t.opportunityId === opportunity.id || t.opportunityTitle === opportunity.title
  );

  // Skill alignment
  const userSkillSet = new Set(profile.skills.map(s => s.name.toLowerCase()));
  const matchingSkills = opportunity.skills.filter(s => userSkillSet.has(s.toLowerCase()));

  const handleUpdateStatus = (status: ApplicationStatus) => {
    setActivityStatus(status);
    storageService.setActivityStatus(opportunity.id, status, `Tracked from detail page`);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <Link
        href="/discover"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Opportunity Radar
      </Link>

      {/* Main Header Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center flex-wrap gap-2">
            <span className="rounded-md bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
              {opportunity.categoryName}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium border ${getVerificationBadgeColor(opportunity.verificationStatus)}`}>
              <ShieldCheck className="h-3.5 w-3.5" />
              {opportunity.verificationStatus === 'verified' ? 'Organizer Verified' : 'Community Submitted'}
            </span>
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 uppercase tracking-wider font-mono">
              {opportunity.format}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              Source: <strong className="text-slate-200">{opportunity.sourceType.replace('_', ' ')}</strong>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {opportunity.title}
          </h1>
          <p className="text-sm font-medium text-slate-400">
            Organized by <strong className="text-slate-200">{opportunity.organizer}</strong>
          </p>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
            {opportunity.tagline}
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <div>
            <div className="text-slate-400 mb-0.5">Registration Deadline</div>
            <div className={`font-semibold ${timeInfo.urgent ? 'text-amber-400' : 'text-white'}`}>
              {formatDate(opportunity.deadline)} ({timeInfo.text})
            </div>
          </div>
          <div>
            <div className="text-slate-400 mb-0.5">Prize / Grant Pool</div>
            <div className="font-semibold text-emerald-400">
              {opportunity.prizePool || "Experience & Credential"}
            </div>
          </div>
          <div>
            <div className="text-slate-400 mb-0.5">Participation Cost</div>
            <div className="font-semibold text-white capitalize">{opportunity.cost}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-0.5">Last Checked</div>
            <div className="font-semibold text-slate-300">{formatDate(opportunity.lastCheckedAt)}</div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <a
              href={opportunity.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 text-xs shadow-lg shadow-blue-500/20 transition"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <Link
              href="/teams"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-medium px-4 py-2.5 text-xs transition"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Find Team</span>
            </Link>
          </div>

          {/* Activity State Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">My Activity Status:</span>
            <select
              value={activityStatus || "none"}
              onChange={(e) => {
                const val = e.target.value as ApplicationStatus;
                handleUpdateStatus(val);
              }}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="none">Not Tracked</option>
              <option value="saved">Saved</option>
              <option value="interested">Interested</option>
              <option value="applied">Applied</option>
              <option value="participating">Participating</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Description & Requirements vs Sidebar Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">About the Opportunity</h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {opportunity.description}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Eligibility Criteria</h3>
            <div className="space-y-2">
              {opportunity.eligibility.map((crit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{crit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Associated Teams */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Teams Forming for this Event</h3>
              <Link href="/teams" className="text-xs text-blue-400 hover:text-blue-300">
                Create new team
              </Link>
            </div>

            {associatedTeams.length === 0 ? (
              <p className="text-xs text-slate-400">
                No public teams have formed for this event yet. Be the first to start a team!
              </p>
            ) : (
              <div className="space-y-3">
                {associatedTeams.map(t => (
                  <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.name}</h4>
                      <p className="text-xs text-slate-400">{t.members.length} / {t.maxMembers} members • Looking for: {t.lookingForSkills.join(', ')}</p>
                    </div>
                    <Link
                      href="/teams"
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Join
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Passport Alignment & Provenance */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Developer Passport Match</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400">Required Technologies:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {opportunity.skills.map(s => {
                    const isMatched = userSkillSet.has(s.toLowerCase());
                    return (
                      <span
                        key={s}
                        className={`rounded px-2 py-0.5 text-[11px] font-medium border ${
                          isMatched
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {s} {isMatched ? '✓' : ''}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400">Skill Synergy:</span>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                  {matchingSkills.length} of {opportunity.skills.length} skills match your profile.
                </p>
              </div>
            </div>
          </div>

          {/* Provenance Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200">Data Provenance Record</h4>
            <div className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <div>Record ID: {opportunity.id}</div>
              <div>Provenance: {opportunity.sourceType}</div>
              <div>Status: {opportunity.verificationStatus}</div>
              <div>Freshness: {opportunity.freshnessStatus}</div>
              {opportunity.sourceUrl && (
                <div className="truncate">
                  Source URL: <a href={opportunity.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{opportunity.sourceUrl}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
