"use client";

import { useState } from "react";
import { UserActivity, Opportunity, ApplicationStatus } from "@/lib/types";
import { storageService } from "@/lib/services/storage";
import { CheckCircle2, Clock, FileText, ExternalLink, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";

interface ActivityRowProps {
  activity: UserActivity;
  opportunity?: Opportunity;
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
  onRemove: (id: string) => void;
}

export function ActivityRow({ activity, opportunity, onStatusChange, onRemove }: ActivityRowProps) {
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>(activity.status);
  const [notes, setNotes] = useState(activity.notes || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const statuses: { value: ApplicationStatus; label: string }[] = [
    { value: 'saved', label: 'Saved' },
    { value: 'interested', label: 'Interested' },
    { value: 'applied', label: 'Applied' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'participating', label: 'Participating' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'withdrawn', label: 'Withdrawn' },
  ];

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as ApplicationStatus;
    setCurrentStatus(val);
    storageService.setActivityStatus(activity.opportunityId, val, notes);
    onStatusChange(activity.id, val);
  };

  const handleSaveNotes = () => {
    storageService.setActivityStatus(activity.opportunityId, currentStatus, notes);
    setIsEditingNotes(false);
  };

  if (!opportunity) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 hover:border-slate-700 transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
              {opportunity.categoryName}
            </span>
            {activity.isOrganizerConfirmed ? (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> Organizer Confirmed
              </span>
            ) : (
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                Self-Reported
              </span>
            )}
          </div>
          <Link
            href={`/opportunities/${opportunity.slug}`}
            className="text-base font-bold text-white hover:text-blue-400 transition"
          >
            {opportunity.title}
          </Link>
          <p className="text-xs text-slate-400">Organized by {opportunity.organizer}</p>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white focus:border-blue-500 focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onRemove(opportunity.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
            title="Remove from activity list"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notes & Official destination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex-1">
          {isEditingNotes ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Personal notes (e.g. applied on devpost, waiting for email...)"
                className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white"
              />
              <button
                onClick={handleSaveNotes}
                className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
              >
                Save
              </button>
            </div>
          ) : (
            <p
              onClick={() => setIsEditingNotes(true)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer italic"
            >
              {notes ? `Note: "${notes}"` : "Click here to add personal notes or tracking remarks..."}
            </p>
          )}
        </div>

        <a
          href={opportunity.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap"
        >
          Official Portal <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
