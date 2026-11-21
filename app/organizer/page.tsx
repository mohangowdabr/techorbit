"use client";

import { useState } from "react";
import { storageService } from "@/lib/services/storage";
import { CreateOpportunityModal } from "@/components/organizer/CreateOpportunityModal";
import { PlusCircle, Eye, Users, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function OrganizerPage() {
  const [opportunities, setOpportunities] = useState(() => storageService.getOpportunities());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myEvents = opportunities.filter(
    (o) => o.sourceType === "organizer_submitted" || o.organizerId === "org-1"
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <PlusCircle className="h-4 w-4" />
            <span>TechOrbit Organizer Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Organizer Command Center
          </h1>
          <p className="text-xs text-slate-400">
            Create, publish, and manage technology events with auditable verification and participant tracking.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 text-xs shadow-lg shadow-blue-500/20 transition self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Publish Opportunity</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-xs text-slate-400 mb-1">Managed Events</div>
          <div className="text-2xl font-bold text-white font-mono">{myEvents.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-xs text-slate-400 mb-1">Total Inbound Views</div>
          <div className="text-2xl font-bold text-blue-400 font-mono">14,820</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-xs text-slate-400 mb-1">Registered Participants</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">2,100</div>
        </div>
      </div>

      {/* Events Table / List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Your Events</h3>
        <div className="space-y-3">
          {myEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {event.categoryName}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-400 capitalize">
                    {event.verificationStatus.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{event.title}</h4>
                <p className="text-slate-400">Deadline: {formatDate(event.deadline)}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <a
                  href={event.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-slate-300 font-semibold"
                >
                  Destination Link
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateOpportunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={(newOpp) => setOpportunities([...storageService.getOpportunities()])}
      />
    </div>
  );
}
