"use client";

import { useState } from "react";
import { Search, Filter, Sparkles, X, Check } from "lucide-react";
import { OpportunityCategory, OpportunityFormat, OpportunityCost } from "@/lib/types";

interface FiltersProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (cat: OpportunityCategory | 'all') => void;
  onFormatChange: (format: OpportunityFormat | 'all') => void;
  onCostChange: (cost: OpportunityCost | 'all') => void;
  onAIAssistClick: () => void;
  selectedCategory: string;
}

export function OpportunityFilters({
  onSearchChange,
  onCategoryChange,
  onFormatChange,
  onCostChange,
  onAIAssistClick,
  selectedCategory
}: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [selectedCost, setSelectedCost] = useState<string>("all");

  const categories = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'competitions', label: 'Competitions' },
    { id: 'internships', label: 'Internships' },
    { id: 'open-source', label: 'Open Source' },
    { id: 'fellowships', label: 'Fellowships' },
    { id: 'cybersecurity', label: 'Cybersecurity & CTF' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
      {/* Top Search bar + AI Copilot Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by keywords, skills (e.g. PyTorch, Rust), or organizer..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                onSearchChange("");
              }}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={onAIAssistClick}
          className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold px-4 py-2.5 shadow-md shadow-blue-500/10 transition"
        >
          <Sparkles className="h-4 w-4 text-blue-200" />
          <span>AI Matchmaker</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id as any)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-semibold"
                  : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Filters: Format & Cost */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Format:</span>
          {['all', 'online', 'hybrid', 'in-person'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => {
                setSelectedFormat(fmt);
                onFormatChange(fmt as any);
              }}
              className={`capitalize px-2.5 py-1 rounded-md transition ${
                selectedFormat === fmt
                  ? "bg-slate-700 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Cost:</span>
          {['all', 'free', 'scholarship'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setSelectedCost(c);
                onCostChange(c as any);
              }}
              className={`capitalize px-2.5 py-1 rounded-md transition ${
                selectedCost === c
                  ? "bg-slate-700 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
