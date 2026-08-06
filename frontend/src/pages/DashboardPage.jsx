import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import StatsOverview from '../components/StatsOverview';
import UrlUnfurler from '../components/UrlUnfurler';
import EnrichmentModal from '../components/EnrichmentModal';
import CandidateFilterBar from '../components/CandidateFilterBar';
import CandidateCard from '../components/CandidateCard';
import CandidateTable from '../components/CandidateTable';
import {
  fetchCandidates,
  saveCandidate,
  toggleCandidateShortlist,
  deleteCandidate
} from '../services/api';
import {
  Plus,
  Loader2,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [minScore, setMinScore] = useState(0);
  const [shortlistOnly, setShortlistOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal state
  const [activeUnfurledData, setActiveUnfurledData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadCandidateData = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search: searchQuery,
        platform: selectedPlatform,
        minScore: minScore > 0 ? minScore : undefined,
        shortlisted: shortlistOnly ? 'true' : undefined,
      };
      const response = await fetchCandidates(params);
      if (response.success) {
        setCandidates(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching candidates:', err);
      showNotification('Failed to connect to TalentLync API server.', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedPlatform, minScore, shortlistOnly]);

  useEffect(() => {
    loadCandidateData();
  }, [loadCandidateData]);

  const handleOpenEnrichment = (metadata) => {
    setActiveUnfurledData(metadata);
    setIsModalOpen(true);
  };

  const handleManualAdd = () => {
    setActiveUnfurledData({
      url: 'https://github.com/new-talent',
      name: 'New Candidate',
      headline: 'Software Engineer',
      bio: 'Discovered candidate profile for recruitment pipeline.',
      avatarUrl: '',
      platform: 'other',
      suggestedTags: ['React', 'Node.js'],
      relevanceScore: 80,
      experienceLevel: 'Mid',
    });
    setIsModalOpen(true);
  };

  const handleSaveCandidate = async (formData) => {
    try {
      const res = await saveCandidate(formData);
      if (res.success) {
        showNotification(`Candidate "${res.data.name}" added to TalentLync pool!`);
        loadCandidateData();
      }
    } catch (err) {
      console.error('Error saving candidate:', err);
      showNotification(err.response?.data?.message || 'Error saving candidate', 'error');
      throw err;
    }
  };

  const handleToggleShortlist = async (id) => {
    try {
      const res = await toggleCandidateShortlist(id);
      if (res.success) {
        const candidate = res.data;
        const status = candidate.isShortlisted ? 'shortlisted ❤️' : 'removed from shortlist';
        showNotification(`"${candidate.name}" ${status}.`);
        loadCandidateData();
      }
    } catch (err) {
      console.error('Error toggling shortlist:', err);
      showNotification('Could not update shortlist state', 'error');
    }
  };

  const handleDeleteCandidate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate profile?')) return;
    try {
      const res = await deleteCandidate(id);
      if (res.success) {
        showNotification('Candidate profile deleted successfully.');
        loadCandidateData();
      }
    } catch (err) {
      console.error('Error deleting candidate:', err);
      showNotification('Could not delete candidate profile', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-[#368dff]">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div
              className={`px-4 py-3 rounded-2xl bg-white border shadow-xl flex items-center space-x-3 text-xs font-bold ${
                toastMessage.type === 'error'
                  ? 'text-rose-700 border-rose-200'
                  : 'text-emerald-700 border-emerald-200'
              }`}
            >
              {toastMessage.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              )}
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}

        {/* User Workspace Greeting Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#368dff]/10 via-emerald-100/20 to-transparent pointer-events-none" />
          
          <div className="space-y-2 z-10">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-[#368dff] uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>{user?.company || 'TalentLync Workspace'}</span>
              <span>•</span>
              <span className="text-[#00a962]">{user?.role || 'Senior Recruiter'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Welcome back, {user?.name || 'Talent Lead'} 👋
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl font-medium">
              Paste profile URLs to unfurl metadata, evaluate technical candidate fit, and manage your hiring pipeline.
            </p>
          </div>

          <div className="z-10 flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={handleManualAdd}
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#368dff] to-[#00a962] hover:shadow-lg text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-[#368dff]/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Candidate Manually</span>
            </button>
          </div>
        </div>

        {/* Analytics & Metrics Overview */}
        <StatsOverview candidates={candidates} />

        {/* Primary URL Unfurling Engine Box */}
        <UrlUnfurler onUnfurlSuccess={handleOpenEnrichment} />

        {/* Candidate Pool Filter & View Header */}
        <section className="space-y-6">
          <CandidateFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            minScore={minScore}
            onMinScoreChange={setMinScore}
            shortlistOnly={shortlistOnly}
            onShortlistToggle={setShortlistOnly}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalCount={candidates.length}
            candidates={candidates}
          />

          {/* Candidate Grid / Table Display */}
          {loading ? (
            <div className="py-24 text-center bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#368dff] animate-spin" />
              <p className="text-xs font-bold text-slate-500">Loading candidate talent pipeline...</p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                <Users className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">No Candidates Found</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6 font-medium">
                No candidate profiles match your current search filters or pool.
              </p>
              <button
                onClick={handleManualAdd}
                className="px-5 py-2.5 rounded-xl bg-[#368dff] text-white text-xs font-extrabold hover:bg-blue-600 transition-colors shadow-sm cursor-pointer"
              >
                Add Your First Candidate
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate._id || candidate.id}
                  candidate={candidate}
                  onToggleShortlist={handleToggleShortlist}
                  onDelete={handleDeleteCandidate}
                />
              ))}
            </div>
          ) : (
            <CandidateTable
              candidates={candidates}
              onToggleShortlist={handleToggleShortlist}
              onDelete={handleDeleteCandidate}
            />
          )}
        </section>

      </main>

      {/* Profile Signal Enrichment Modal */}
      <EnrichmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        unfurledData={activeUnfurledData}
        onSaveCandidate={handleSaveCandidate}
      />
    </div>
  );
}
