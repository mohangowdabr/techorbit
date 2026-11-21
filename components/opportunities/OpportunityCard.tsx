"use client";

import Link from "next/link";
import { Opportunity } from "@/lib/types";
import { formatTimeRemaining, getVerificationBadgeColor } from "@/lib/utils";
import { Calendar, MapPin, Trophy, ShieldCheck, ExternalLink, Bookmark, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { storageService } from "@/lib/services/storage";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSaveToggle?: (id: string, isSaved: boolean) => void;
  isInitiallySaved?: boolean;
}

export function OpportunityCard({ opportunity, onSaveToggle, isInitiallySaved = false }: OpportunityCardProps) {
  const [saved, setSaved] = useState(isInitiallySaved);
  const timeInfo = formatTimeRemaining(opportunity.deadline);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newSaved = !saved;
    setSaved(newSaved);

    if (newSaved) {
      storageService.setActivityStatus(opportunity.id, 'saved', 'Saved from Opportunity Radar');
    } else {
      storageService.removeActivity(opportunity.id);
    }

    if (onSaveToggle) {
      onSaveToggle(opportunity.id, newSaved);
    }
  };

  return (
    <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center flex-wrap gap-2">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
              {opportunity.categoryName}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium border ${getVerificationBadgeColor(opportunity.verificationStatus)}`}>
              <ShieldCheck className="h-3 w-3" />
              {opportunity.verificationStatus === 'verified' ? 'Verified' : 'Pending Review'}
            </span>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
              {opportunity.format}
            </span>
          </div>

          {/* Quick Save Bookmark */}
          <button
            onClick={handleSave}
            title={saved ? "Remove from saved" : "Save opportunity"}
            className={`rounded-lg p-1.5 transition ${
              saved
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Title & Organizer */}
        <Link href={`/opportunities/${opportunity.slug}`} className="block">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition line-clamp-1">
            {opportunity.title}
          </h3>
          <p className="text-xs text-slate-400 mb-2 font-medium">By {opportunity.organizer}</p>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
            {opportunity.tagline}
          </p>
        </Link>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {opportunity.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/50"
            >
              {skill}
            </span>
          ))}
          {opportunity.skills.length > 4 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{opportunity.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          {opportunity.prizePool && (
            <div className="flex items-center gap-1 text-emerald-400 font-semibold text-xs">
              <Trophy className="h-3.5 w-3.5" />
              <span>{opportunity.prizePool}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
            <Clock className="h-3 w-3" />
            <span className={timeInfo.urgent ? "text-amber-400 font-medium" : ""}>
              {timeInfo.text}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/opportunities/${opportunity.slug}`}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 transition"
          >
            Details
          </Link>
          <a
            href={opportunity.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 transition"
          >
            Apply <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
