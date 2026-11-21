"use client";

import { useState } from "react";
import { storageService } from "@/lib/services/storage";
import { IngestionEngine } from "@/lib/services/ingestion";
import { ShieldCheck, Check, X, RefreshCw, Database, AlertCircle, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminPage() {
  const [opportunities, setOpportunities] = useState(() => storageService.getOpportunities());
  const syncLogs = IngestionEngine.getSyncLogs();

  const pendingList = opportunities.filter(o => o.verificationStatus === 'pending_review');

  const handleApprove = (id: string) => {
    storageService.approveOpportunity(id);
    setOpportunities([...storageService.getOpportunities()]);
  };

  const handleReject = (id: string) => {
    storageService.rejectOpportunity(id);
    setOpportunities([...storageService.getOpportunities()]);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Trust, Moderation & Provenance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Data Health & Moderation Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Audit external adapters, approve pending organizer submissions, and monitor deduplication integrity.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-slate-300">
          <Database className="h-4 w-4 text-blue-400" />
          <span>Ingestion Engine Status: <strong>ONLINE</strong></span>
        </div>
      </div>

      {/* Moderation Approval Queue */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Verification Queue ({pendingList.length} Pending)</h3>
          <span className="text-xs text-slate-400">Strict Human/Automated Review Gate</span>
        </div>

        {pendingList.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center text-xs text-slate-400">
            Verification queue is clear! All opportunities currently verified or rejected.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingList.map((opp) => (
              <div
                key={opp.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                      {opp.categoryName}
                    </span>
                    <span className="text-slate-400">Origin: {opp.sourceType}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{opp.title}</h4>
                  <p className="text-slate-400">Organizer: {opp.organizer} • Deadline: {formatDate(opp.deadline)}</p>
                  <p className="text-slate-300 mt-1">{opp.tagline}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleReject(opp.id)}
                    className="flex items-center gap-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 font-semibold transition"
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => handleApprove(opp.id)}
                    className="flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 font-semibold transition"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve & Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sync Adapter Run Logs */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Ingestion Sync History & Adapter Health</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Adapter / Source</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Fetched</th>
                <th className="pb-3 font-semibold">Duplicates Skipped</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {syncLogs.map((log) => (
                <tr key={log.id} className="text-slate-300">
                  <td className="py-3 font-semibold text-white">{log.sourceName}</td>
                  <td className="py-3 font-mono">{log.sourceType}</td>
                  <td className="py-3 font-mono">{log.itemsFetched}</td>
                  <td className="py-3 font-mono text-amber-400">{log.duplicatesSkipped}</td>
                  <td className="py-3">
                    <span className="rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 font-semibold">
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">{formatDate(log.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
