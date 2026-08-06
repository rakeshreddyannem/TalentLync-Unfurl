import React from 'react';
import { getPlatformMeta, getExperienceBadgeColor, getRelevanceColor, createLocalAvatarSvg } from '../utils/platformUtils';
import {
  Heart,
  ExternalLink,
  Trash2,
  Tag,
  Briefcase
} from 'lucide-react';

export default function CandidateCard({ candidate, onToggleShortlist, onDelete }) {
  const platformMeta = getPlatformMeta(candidate.platform);
  const expBadgeColor = getExperienceBadgeColor(candidate.experienceLevel);
  const relevanceBadgeColor = getRelevanceColor(candidate.relevanceScore);
  const candidateId = candidate._id || candidate.id;

  return (
    <div className="group relative glass-card p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#368dff]/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
      
      {/* Top Header: Platform Badge, Shortlist Heart & Delete */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${platformMeta.badgeClass}`}>
          {platformMeta.icon}
          <span>{platformMeta.label}</span>
        </span>

        <div className="flex items-center space-x-2">
          {/* Experience Level */}
          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${expBadgeColor}`}>
            {candidate.experienceLevel || 'Mid'}
          </span>

          {/* Shortlist Toggle */}
          <button
            type="button"
            onClick={() => onToggleShortlist(candidateId)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#db3662] transition-colors cursor-pointer"
            title={candidate.isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                candidate.isShortlisted ? 'fill-[#db3662] text-[#db3662] scale-110' : ''
              }`}
            />
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={() => onDelete(candidateId)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 hover:text-[#db3662] transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
            title="Delete Candidate"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Candidate Info */}
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={candidate.avatarUrl || createLocalAvatarSvg(candidate.name, candidate.platform)}
          alt={candidate.name}
          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 bg-slate-50 shrink-0 shadow-sm"
          onError={(e) => {
            e.target.src = createLocalAvatarSvg(candidate.name, candidate.platform);
          }}
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-black text-slate-900 truncate group-hover:text-[#368dff] transition-colors">
            {candidate.name}
          </h3>
          {candidate.headline && (
            <p className="text-xs font-bold text-[#368dff] truncate mt-0.5">{candidate.headline}</p>
          )}
          {candidate.bio && (
            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-medium">
              {candidate.bio}
            </p>
          )}
        </div>
      </div>

      {/* Relevance Score Bar */}
      <div className="my-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[11px] font-extrabold text-slate-600 flex items-center space-x-1">
            <Briefcase className="w-3 h-3 text-[#368dff]" />
            <span>Relevance Score</span>
          </span>
          <span className={`px-2 py-0.5 text-[11px] font-black rounded-md border font-mono ${relevanceBadgeColor}`}>
            {candidate.relevanceScore}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#368dff] to-[#00a962] transition-all duration-500 rounded-full"
            style={{ width: `${candidate.relevanceScore}%` }}
          />
        </div>
      </div>

      {/* Skill Tags */}
      {candidate.skillTags && candidate.skillTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 my-2">
          {candidate.skillTags.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 text-[11px] font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
            >
              {skill}
            </span>
          ))}
          {candidate.skillTags.length > 5 && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-slate-500 rounded-lg bg-slate-100 border border-slate-200">
              +{candidate.skillTags.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Card Footer */}
      <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[10px] font-medium">
          Added: {candidate.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : 'Recent'}
        </span>
        <a
          href={candidate.url}
          target="_blank"
          rel="noreferrer"
          className="text-[#368dff] hover:text-blue-700 font-extrabold flex items-center space-x-1 transition-colors"
        >
          <span>View Profile</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
}
