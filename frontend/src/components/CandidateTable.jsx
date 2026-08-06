import React from 'react';
import { getPlatformMeta, getExperienceBadgeColor, getRelevanceColor, createLocalAvatarSvg } from '../utils/platformUtils';
import {
  Heart,
  ExternalLink,
  Trash2,
  Award
} from 'lucide-react';

export default function CandidateTable({ candidates = [], onToggleShortlist, onDelete }) {
  if (candidates.length === 0) {
    return (
      <div className="p-8 text-center glass-panel rounded-3xl text-slate-500 text-xs font-medium border border-slate-200 bg-white">
        No candidate profiles match the selected filter criteria.
      </div>
    );
  }

  return (
    <div className="w-full glass-panel rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden my-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-100/90 text-slate-700 uppercase font-extrabold border-b border-slate-200 tracking-wider">
            <tr>
              <th className="py-4 px-4">Candidate</th>
              <th className="py-4 px-4">Platform</th>
              <th className="py-4 px-4">Level</th>
              <th className="py-4 px-4">Relevance</th>
              <th className="py-4 px-4">Skill Matrix</th>
              <th className="py-4 px-4 text-center">Shortlist</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {candidates.map((c) => {
              const platformMeta = getPlatformMeta(c.platform);
              const expColor = getExperienceBadgeColor(c.experienceLevel);
              const relColor = getRelevanceColor(c.relevanceScore);
              const candidateId = c._id || c.id;

              return (
                <tr key={candidateId} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Candidate Avatar & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={c.avatarUrl || createLocalAvatarSvg(c.name, c.platform)}
                        alt={c.name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0 shadow-2xs"
                        onError={(e) => {
                          e.target.src = createLocalAvatarSvg(c.name, c.platform);
                        }}
                      />

                      <div className="min-w-0 max-w-[200px]">
                        <h4 className="font-extrabold text-slate-900 truncate">{c.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium truncate">{c.headline || c.url}</p>
                      </div>
                    </div>
                  </td>

                  {/* Platform */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border inline-flex items-center space-x-1 ${platformMeta.badgeClass}`}>
                      {platformMeta.icon}
                      <span>{platformMeta.label}</span>
                    </span>
                  </td>

                  {/* Experience Level */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${expColor}`}>
                      {c.experienceLevel || 'Mid'}
                    </span>
                  </td>

                  {/* Relevance Score */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 text-[11px] font-black rounded-md border font-mono ${relColor}`}>
                        {c.relevanceScore}%
                      </span>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-gradient-to-r from-[#368dff] to-[#00a962] rounded-full"
                          style={{ width: `${c.relevanceScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Skill Matrix */}
                  <td className="py-3.5 px-4 max-w-[250px]">
                    <div className="flex flex-wrap gap-1">
                      {(c.skillTags || []).slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                      {(c.skillTags || []).length > 3 && (
                        <span className="text-[10px] text-slate-500 font-bold self-center">
                          +{c.skillTags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Shortlist Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleShortlist(candidateId)}
                      className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#db3662] transition-colors cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${c.isShortlisted ? 'fill-[#db3662] text-[#db3662]' : ''}`} />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-[#368dff] hover:text-blue-700 transition-colors"
                        title="Open Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => onDelete(candidateId)}
                        className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#db3662] transition-colors cursor-pointer"
                        title="Delete Candidate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
