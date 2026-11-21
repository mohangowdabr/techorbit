"use client";

import { useState } from "react";
import { Users, UserPlus, Sparkles, Plus, Search, Filter } from "lucide-react";
import { TeamCard } from "@/components/teams/TeamCard";
import { storageService } from "@/lib/services/storage";
import { Team } from "@/lib/types";

export default function TeamMatchPage() {
  const [teams, setTeams] = useState<Team[]>(() => storageService.getTeams());
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form State for Team Creation
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamEvent, setNewTeamEvent] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [newTeamSkills, setNewTeamSkills] = useState("");

  const filteredTeams = teams.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.opportunityTitle.toLowerCase().includes(q) ||
      t.lookingForSkills.some((s) => s.toLowerCase().includes(q))
    );
  });

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName || !newTeamEvent) return;

    const created: Team = {
      id: `team-${Date.now()}`,
      name: newTeamName,
      slug: newTeamName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      opportunityId: "opp-1",
      opportunityTitle: newTeamEvent,
      description: newTeamDesc || "Collaborative builder team for upcoming challenge.",
      leaderId: "user-dev-current",
      members: [
        {
          id: "user-dev-current",
          name: "Mohan Krishna",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
          role: "leader",
          skills: ["TypeScript", "Next.js", "Supabase"],
          githubHandle: "mohankrishna"
        }
      ],
      maxMembers: 4,
      lookingForSkills: newTeamSkills ? newTeamSkills.split(',').map(s => s.trim()) : ["Developers"],
      status: "recruiting",
      createdAt: new Date().toISOString()
    };

    storageService.createTeam(created);
    setTeams([...storageService.getTeams()]);
    setIsCreateModalOpen(false);
    setNewTeamName("");
    setNewTeamEvent("");
    setNewTeamDesc("");
    setNewTeamSkills("");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Users className="h-4 w-4" />
            <span>TechOrbit Community</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            TeamMatch: Find Your Dream Squad
          </h1>
          <p className="text-xs text-slate-400">
            Form or join teams for hackathons, open source initiatives, and algorithmic challenges.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2.5 text-xs shadow-lg shadow-purple-500/20 transition self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Form a Team</span>
        </button>
      </div>

      {/* Search / Filter bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams by name, target hackathon, or needed skills (e.g. Supabase, Rust)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onJoinSuccess={() => setTeams([...storageService.getTeams()])}
          />
        ))}
      </div>

      {/* Create Team Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-white mb-4">Form a New Team</h3>
            <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Team Name *</label>
                <input
                  type="text"
                  required
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. Distributed Core Syndicate"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Opportunity / Event *</label>
                <input
                  type="text"
                  required
                  value={newTeamEvent}
                  onChange={(e) => setNewTeamEvent(e.target.value)}
                  placeholder="e.g. Global AI Agents Hackathon 2026"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description / Project Idea</label>
                <textarea
                  rows={3}
                  value={newTeamDesc}
                  onChange={(e) => setNewTeamDesc(e.target.value)}
                  placeholder="What is your team building and aiming to accomplish?"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Needed Skills (comma separated)</label>
                <input
                  type="text"
                  value={newTeamSkills}
                  onChange={(e) => setNewTeamSkills(e.target.value)}
                  placeholder="e.g. Frontend, PyTorch, Smart Contracts"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
