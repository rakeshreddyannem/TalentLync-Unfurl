import React, { useState } from 'react';
import { unfurlProfileUrl } from '../services/api';
import { getPlatformMeta, createLocalAvatarSvg } from '../utils/platformUtils';
import {
  Link as LinkIcon,
  Sparkles,
  Loader2,
  AlertCircle,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  Sliders
} from 'lucide-react';


export default function UrlUnfurler({ onUnfurledCandidate }) {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const handleUnfurl = async (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;

    setLoading(true);
    setError(null);
    setPreviewData(null);

    try {
      const res = await unfurlProfileUrl(urlInput.trim());
      if (res.success && res.metadata) {
        setPreviewData(res.metadata);
      } else {
        setError('Could not extract profile metadata. Please check the URL.');
      }
    } catch (err) {
      console.error('Unfurl error:', err);
      setError(err.response?.data?.message || 'Failed to parse metadata from microlink proxy.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToEnrichment = () => {
    if (previewData) {
      onUnfurledCandidate(previewData);
      // Reset input bar after opening enrichment modal
      setUrlInput('');
      setPreviewData(null);
    }
  };

  return (
    <div className="w-full glass-panel p-6 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden my-6 bg-white/90">
      {/* Background Soft Glow Accents */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#368dff]" />
          <h3 className="text-lg font-bold text-slate-900">Social Media Profile Unfurler</h3>
        </div>
        <p className="text-xs text-slate-600 mb-4 max-w-2xl font-medium">
          Paste any public candidate profile link (GitHub, LinkedIn, Behance, X/Twitter, Dribbble, or Portfolio). 
          Extracts public Open Graph metadata instantly without paid scrapers.
        </p>

        {/* Input Form */}
        <form onSubmit={handleUnfurl} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://github.com/torvalds or https://behance.net/designer"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !urlInput.trim()}
            className="px-6 py-3 bg-[#368dff] hover:bg-[#257ce6] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-[#368dff]/25 flex items-center justify-center space-x-2 transition-all cursor-pointer min-w-[140px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Unfurling...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Unfurl URL</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
          <span className="text-slate-500 font-semibold">Try sample profiles:</span>
          <button
            type="button"
            onClick={() => setUrlInput('https://github.com/torvalds')}
            className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            GitHub (Linus)
          </button>
          <button
            type="button"
            onClick={() => setUrlInput('https://github.com/gaearon')}
            className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            GitHub (Dan Abramov)
          </button>
          <button
            type="button"
            onClick={() => setUrlInput('https://www.behance.net/sample-designer')}
            className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            Behance Profile
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#db3662] text-xs font-medium flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#db3662]" />
            <span>{error}</span>
          </div>
        )}

        {/* Live Preview Card */}
        {previewData && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-50/90 border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#00a962]" />
                <span className="text-xs font-bold text-[#00a962] uppercase tracking-wider">
                  Open Graph Live Preview Extracted
                </span>
              </div>
              {(() => {
                const platformMeta = getPlatformMeta(previewData.platform);
                return (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1.5 ${platformMeta.badgeClass}`}>
                    {platformMeta.icon}
                    <span>{platformMeta.label}</span>
                  </span>
                );
              })()}
            </div>

            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={previewData.avatarUrl || createLocalAvatarSvg(previewData.name, previewData.platform)}
                  alt={previewData.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 bg-white shadow-sm"
                  onError={(e) => {
                    e.target.src = createLocalAvatarSvg(previewData.name, previewData.platform);
                  }}
                />

              </div>

              {/* Info Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                  <span>{previewData.name}</span>
                </h4>
                {previewData.headline && (
                  <p className="text-xs font-semibold text-[#368dff] mt-0.5">{previewData.headline}</p>
                )}
                {previewData.bio && (
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-medium">{previewData.bio}</p>
                )}

                {/* Suggested Skill Chips */}
                {previewData.suggestedTags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Extracted Skills:</span>
                    {previewData.suggestedTags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-white text-slate-700 border border-slate-200 shadow-2xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-200">
              <a
                href={previewData.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center space-x-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]">{previewData.url}</span>
              </a>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleProceedToEnrichment}
                  className="px-4 py-2 bg-[#368dff] hover:bg-[#257ce6] text-white font-bold text-xs rounded-xl shadow-md shadow-[#368dff]/20 flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Enrich Signal & Save Candidate</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


