"use client";

import { useState } from "react";
import { PlusCircle, X, ShieldCheck } from "lucide-react";
import { storageService } from "@/lib/services/storage";
import { Opportunity, OpportunityCategory, OpportunityFormat, OpportunityCost } from "@/lib/types";

interface CreateOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (opp: Opportunity) => void;
}

export function CreateOpportunityModal({ isOpen, onClose, onCreated }: CreateOpportunityModalProps) {
  const [title, setTitle] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [category, setCategory] = useState<OpportunityCategory>("hackathons");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState<OpportunityFormat>("online");
  const [cost, setCost] = useState<OpportunityCost>("free");
  const [prizePool, setPrizePool] = useState("");
  const [deadline, setDeadline] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [skills, setSkills] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !organizer || !applicationUrl || !deadline) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newOpp: Opportunity = {
      id: `opp-org-${Date.now()}`,
      title,
      slug: `${slug}-${Math.random().toString(36).substring(2, 5)}`,
      category,
      categoryName: category.charAt(0).toUpperCase() + category.slice(1),
      organizer,
      tagline: tagline || "Direct organizer opportunity submission.",
      description: description || tagline,
      format,
      cost,
      prizePool: prizePool || undefined,
      deadline: new Date(deadline).toISOString(),
      applicationUrl,
      eligibility: ["Open to eligible registrants"],
      skills: skills ? skills.split(',').map(s => s.trim()) : ["Software Engineering"],
      sourceType: "organizer_submitted",
      verificationStatus: "pending_review", // Enforces moderation workflow
      freshnessStatus: "recently_checked",
      lastCheckedAt: new Date().toISOString()
    };

    storageService.addOpportunity(newOpp);
    onCreated(newOpp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <PlusCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Publish New Opportunity</h3>
            <p className="text-xs text-slate-400">
              Submitted events are reviewed against trust & verification standards before public indexing.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Opportunity Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NextGen Web3 & AI Hackathon"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Organizer / Company *</label>
              <input
                type="text"
                required
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="e.g. DevSphere Community"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="hackathons">Hackathons</option>
                <option value="competitions">Coding Competitions</option>
                <option value="internships">Internships</option>
                <option value="open-source">Open Source</option>
                <option value="fellowships">Fellowships</option>
                <option value="cybersecurity">Cybersecurity & CTF</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Tagline / Brief Summary</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="One-line elevator pitch for the listing card"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Full Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Eligibility, timeline, tracks, evaluation criteria..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Cost</label>
              <select
                value={cost}
                onChange={(e) => setCost(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="free">Free</option>
                <option value="scholarship">Scholarship / Stipend</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Prize / Grant Pool</label>
              <input
                type="text"
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                placeholder="e.g. $20,000 USD"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Registration Deadline *</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Official Application Link *</label>
              <input
                type="url"
                required
                value={applicationUrl}
                onChange={(e) => setApplicationUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Relevant Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. TypeScript, React, Python, Docker"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-white text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500 shadow-md shadow-blue-500/20"
            >
              Submit for Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
