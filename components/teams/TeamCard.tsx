"use client";

import { Team } from "@/lib/types";
import { Users, UserPlus, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { storageService } from "@/lib/services/storage";

interface TeamCardProps {
  team: Team;
  onJoinSuccess?: () => void;
}

export function TeamCard({ team, onJoinSuccess }: TeamCardProps) {
  const [joined, setJoined] = useState(
    team.members.some((m) => m.id === "user-dev-current")
  );

  const handleJoin = () => {
    const success = storageService.joinTeam(team.id, {
      id: "user-dev-current",
      name: "Mohan Krishna",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
      skills: ["TypeScript", "Next.js", "Supabase"],
      githubHandle: "mohankrishna",
    });

    if (success) {
      setJoined(true);
      if (onJoinSuccess) onJoinSuccess();
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="rounded-md bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/20">
            {team.status === 'recruiting' ? 'Recruiting Teammates' : 'Team Full'}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <Users className="h-3.5 w-3.5" />
            {team.members.length} / {team.maxMembers} Members
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1">{team.name}</h3>
        <p className="text-xs font-medium text-blue-400 mb-2">
          Target: {team.opportunityTitle}
        </p>
        <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {team.description}
        </p>

        {/* Existing Member Avatars */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Roster:
          </p>
          <div className="flex items-center -space-x-2">
            {team.members.map((m) => (
              <img
                key={m.id}
                src={m.avatar}
                alt={m.name}
                title={`${m.name} (${m.role})`}
                className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Looking for skills */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Looking for:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {team.lookingForSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[11px] font-medium text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <Link
          href={`/opportunities/${team.opportunityId}`}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
        >
          View Event <ExternalLink className="h-3 w-3" />
        </Link>

        {joined ? (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            Joined Team
          </span>
        ) : (
          <button
            onClick={handleJoin}
            disabled={team.status !== 'recruiting'}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-1.5 transition"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Request to Join</span>
          </button>
        )}
      </div>
    </div>
  );
}
