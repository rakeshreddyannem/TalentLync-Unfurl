import React from 'react';
import { exportCandidatesToCsv } from '../utils/exportCsv';
import {
  Search,
  Download,
  Filter,
  LayoutGrid,
  List,
  Heart,
  Github,
  Linkedin,
  Palette,
  Twitter,
  Dribbble,
  Globe,
  Award
} from 'lucide-react';

export default function CandidateFilterBar({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  minScore,
  setMinScore,
  shortlistOnly,
  setShortlistOnly,
  viewMode,
  setViewMode,
  candidates = [],
}) {
  const platforms = [
    { id: 'all', label: 'All Platforms', icon: <Filter className="w-3.5 h-3.5" /> },
    { id: 'github', label: 'GitHub', icon: <Github className="w-3.5 h-3.5" /> },
    { id: 'behance', label: 'Behance', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-3.5 h-3.5" /> },
    { id: 'x', label: 'X (Twitter)', icon: <Twitter className="w-3.5 h-3.5" /> },
    { id: 'dribbble', label: 'Dribbble', icon: <Dribbble className="w-3.5 h-3.5" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Globe className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full glass-panel p-5 rounded-2xl border border-slate-200 space-y-4 my-6 bg-white shadow-sm">
      
      {/* Top Bar: Search, View Mode, Export CSV */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, headline, bio, or skill tag..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center space-x-3 self-end md:self-auto">
          {/* Shortlisted Toggle */}
          <button
            type="button"
            onClick={() => setShortlistOnly(!shortlistOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all ${
              shortlistOnly
                ? 'bg-rose-50 text-[#db3662] border-rose-200 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${shortlistOnly ? 'fill-[#db3662] text-[#db3662]' : ''}`} />
            <span>Shortlisted Only</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-[#368dff] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table' ? 'bg-[#368dff] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Export to CSV Button */}
          <button
            type="button"
            onClick={() => exportCandidatesToCsv(candidates)}
            className="px-4 py-2.5 bg-[#00a962] hover:bg-[#008e52] text-white text-xs font-bold rounded-xl shadow-md shadow-[#00a962]/20 flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to CSV</span>
          </button>
        </div>

      </div>

      {/* Filter Row: Platform Pills & Relevance Score Slider */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-3 border-t border-slate-200">
        
        {/* Platform Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {platforms.map((p) => {
            const active = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlatform(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#368dff] text-white border-[#368dff] shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Min Score Slider */}
        <div className="flex items-center space-x-3 w-full lg:w-auto bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
          <Award className="w-4 h-4 text-[#d97706] shrink-0" />
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            Min Relevance: <span className="text-[#368dff] font-mono">{minScore}%</span>
          </span>
          <input
            type="range"
            min="0"
            max="95"
            step="5"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-28 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#368dff]"
          />
        </div>

      </div>

    </div>
  );
}


