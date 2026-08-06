import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import UrlUnfurler from './components/UrlUnfurler';
import EnrichmentModal from './components/EnrichmentModal';
import CandidateFilterBar from './components/CandidateFilterBar';
import CandidateCard from './components/CandidateCard';
import CandidateTable from './components/CandidateTable';
import {
  fetchCandidates,
  saveCandidate,
  toggleCandidateShortlist,
  deleteCandidate
} from './services/api';
import {
  Plus,
  Loader2,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function App() {
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div
              className={`px-4 py-3 rounded-2xl bg-white border shadow-xl flex items-center space-x-3 text-xs font-bold ${
                toastMessage.type === 'error'
                  ? 'text-rose-700 border-rose-200'
                  : 'text-emerald-800 border-emerald-200'
              }`}
            >
              {toastMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-[#db3662] shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#00a962] shrink-0" />
              )}
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}

        {/* Hero Banner Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
              <span>Recruiter Discovery Dashboard</span>
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-[#368dff]/10 text-[#368dff] border border-[#368dff]/20">
                TalentLync Unfurl
              </span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              Extract public social metadata dynamically with zero scrapers. Enrich candidate signals with skills matrix, relevance match scoring, and export shortlists.
            </p>
          </div>

          <button
            type="button"
            onClick={handleManualAdd}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 hover:border-[#368dff]/40 flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#368dff]" />
            <span>Add Candidate Manually</span>
          </button>
        </div>

        {/* Analytics Stats Overview */}
        <StatsOverview candidates={candidates} />

        {/* URL Unfurler Component */}
        <UrlUnfurler onUnfurledCandidate={handleOpenEnrichment} />

        {/* Candidate Filter & Search Bar */}
        <CandidateFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          minScore={minScore}
          setMinScore={setMinScore}
          shortlistOnly={shortlistOnly}
          setShortlistOnly={setShortlistOnly}
          viewMode={viewMode}
          setViewMode={setViewMode}
          candidates={candidates}
        />

        {/* Candidate Display Area */}
        {loading ? (
          <div className="py-20 text-center bg-white border border-slate-200 rounded-2xl my-6 flex flex-col items-center justify-center space-y-3 shadow-xs">
            <Loader2 className="w-8 h-8 animate-spin text-[#368dff]" />
            <p className="text-xs text-slate-500 font-medium">Fetching candidate profiles from TalentLync...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="py-16 px-6 text-center bg-white rounded-2xl border border-slate-200 my-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400">
              <Users className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No Candidate Profiles Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto font-medium">
                No candidates match your filter criteria or search query. Try resetting filters or paste a social media profile URL above to unfurl new talent.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedPlatform('all');
                setMinScore(0);
                setShortlistOnly(false);
              }}
              className="px-4 py-2 bg-[#368dff]/10 text-[#368dff] hover:bg-[#368dff]/20 border border-[#368dff]/30 text-xs font-bold rounded-xl transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate._id}
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

      </main>

      {/* Enrichment Controls Modal */}
      {isModalOpen && (
        <EnrichmentModal
          initialData={activeUnfurledData}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCandidate}
        />
      )}

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
          <p>© 2026 TalentLynk Unfurl - Communication & Signal Engine</p>
          <div className="flex items-center space-x-4 text-slate-500">
            <span>Microlink.io Open Graph API Proxy</span>
            <span>•</span>
            <span>MERN Stack</span>
          </div>
        </div>
      </footer>

    </div>
  );
}


