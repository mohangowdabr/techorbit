"use client";

import { useState, useMemo } from "react";
import { OpportunityFilters } from "@/components/opportunities/OpportunityFilters";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { CopilotModal } from "@/components/intelligence/CopilotModal";
import { storageService } from "@/lib/services/storage";
import { OpportunityCategory, OpportunityFormat, OpportunityCost } from "@/lib/types";
import { Compass, Sparkles, FilterX } from "lucide-react";

export default function DiscoverPage() {
  const [opportunities, setOpportunities] = useState(() => storageService.getOpportunities());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedFormat, setSelectedFormat] = useState<OpportunityFormat | 'all'>('all');
  const [selectedCost, setSelectedCost] = useState<OpportunityCost | 'all'>('all');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Dynamic Multi-Faceted Filter Calculation
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Category filter
      if (selectedCategory !== 'all' && opp.category !== selectedCategory) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'all' && opp.format !== selectedFormat) {
        return false;
      }
      // Cost filter
      if (selectedCost !== 'all' && opp.cost !== selectedCost) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesOrganizer = opp.organizer.toLowerCase().includes(q);
        const matchesTagline = opp.tagline.toLowerCase().includes(q);
        const matchesSkills = opp.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesOrganizer && !matchesTagline && !matchesSkills) {
          return false;
        }
      }
      return true;
    });
  }, [opportunities, searchQuery, selectedCategory, selectedFormat, selectedCost]);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Compass className="h-4 w-4" />
            <span>Opportunity Radar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Discover Tech Opportunities
          </h1>
          <p className="text-xs text-slate-400">
            Verified hackathons, coding contests, fellowships, and open-source programs worldwide.
          </p>
        </div>

        <button
          onClick={() => setIsCopilotOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition self-start sm:self-auto"
        >
          <Sparkles className="h-4 w-4 text-blue-200" />
          <span>Launch AI Copilot</span>
        </button>
      </div>

      {/* Filter Component */}
      <OpportunityFilters
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onFormatChange={setSelectedFormat}
        onCostChange={setSelectedCost}
        onAIAssistClick={() => setIsCopilotOpen(true)}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
        <span>
          Showing <strong className="text-white">{filteredOpportunities.length}</strong> opportunities
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedFormat !== 'all' || selectedCost !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory('all');
              setSelectedFormat('all');
              setSelectedCost('all');
            }}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
          >
            <FilterX className="h-3.5 w-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-white">No opportunities matched your criteria</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms, changing the category, or resetting format filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}

      {/* AI Copilot Interactive Modal */}
      <CopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  );
}
