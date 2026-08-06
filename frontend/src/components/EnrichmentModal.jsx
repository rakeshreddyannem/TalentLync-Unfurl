import React, { useState, useEffect } from 'react';
import { getPlatformMeta, createLocalAvatarSvg } from '../utils/platformUtils';
import {
  X,
  Sliders,
  Plus,
  Tag,
  Award,
  User,
  FileText,
  Link as LinkIcon,
  Save,
  Loader2,
  Check
} from 'lucide-react';

const PRESET_SKILLS = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'C++', 'Java',
  'UI/UX', 'Figma', 'System Architecture', 'AWS', 'Docker', 'MongoDB',
  'GraphQL', 'Tailwind CSS', 'Redux', 'PostgreSQL', 'Next.js', 'Go'
];

const EXPERIENCE_LEVELS = ['Junior', 'Mid', 'Senior', 'Lead', 'Executive'];

export default function EnrichmentModal({ isOpen, initialData, unfurledData, onClose, onSaveCandidate, onSave }) {
  const activeData = unfurledData || initialData;
  const handleSave = onSaveCandidate || onSave;

  const [formData, setFormData] = useState({
    url: '',
    name: '',
    headline: '',
    bio: '',
    avatarUrl: '',
    platform: 'other',
    skillTags: [],
    experienceLevel: 'Mid',
    relevanceScore: 85,
    isShortlisted: false,
  });

  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeData) {
      setFormData({
        url: activeData.url || '',
        name: activeData.name || '',
        headline: activeData.headline || '',
        bio: activeData.bio || '',
        avatarUrl: activeData.avatarUrl || '',
        platform: activeData.platform || 'other',
        skillTags: activeData.suggestedTags || activeData.skillTags || ['React', 'Node.js'],
        experienceLevel: activeData.experienceLevel || 'Mid',
        relevanceScore: activeData.relevanceScore ?? 85,
        isShortlisted: Boolean(activeData.isShortlisted),
      });
    }
  }, [activeData]);

  const handleAddTag = (tagToAdd) => {
    const clean = tagToAdd.trim();
    if (clean && !formData.skillTags.includes(clean)) {
      setFormData((prev) => ({
        ...prev,
        skillTags: [...prev.skillTags, clean],
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skillTags: prev.skillTags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;

    setSaving(true);
    try {
      if (typeof handleSave === 'function') {
        await handleSave(formData);
      }
      onClose();
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const isModalVisible = isOpen !== undefined ? isOpen : Boolean(activeData);
  if (!isModalVisible || !activeData) return null;

  const currentPlatformMeta = getPlatformMeta(formData.platform);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#368dff]/10 border border-[#368dff]/20 text-[#368dff]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Signal Enrichment Controls</h3>
              <p className="text-xs text-slate-500 font-medium">Assign candidate attributes, skill matrix, and match relevance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Candidate Quick Profile Preview Header */}
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <img
              src={formData.avatarUrl || createLocalAvatarSvg(formData.name, formData.platform)}
              alt={formData.name}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 bg-white shadow-2xs"
              onError={(e) => {
                e.target.src = createLocalAvatarSvg(formData.name, formData.platform);
              }}
            />

            <div className="flex-1 min-w-0">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center space-x-1 ${currentPlatformMeta.badgeClass}`}>
                {currentPlatformMeta.icon}
                <span>{currentPlatformMeta.label}</span>
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 truncate mt-1">{formData.name || 'Candidate Name'}</h4>
              <p className="text-xs text-slate-500 font-medium truncate">{formData.url}</p>
            </div>
          </div>

          {/* Relevance Match Score Slider */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#368dff]" />
                <span>Recruiter Relevance Match Score</span>
              </label>
              <span className="px-3 py-1 text-sm font-black rounded-xl bg-[#368dff]/10 text-[#368dff] border border-[#368dff]/30 font-mono">
                {formData.relevanceScore}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.relevanceScore}
              onChange={(e) => setFormData({ ...formData, relevanceScore: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#368dff]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono font-medium">
              <span>0% Low Match</span>
              <span>50% Moderate</span>
              <span>100% Elite Fit</span>
            </div>
          </div>

          {/* Skill Tag Enrichment */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2 mb-2">
              <Tag className="w-4 h-4 text-[#368dff]" />
              <span>Skill Matrix Tags (e.g. C++, React, UI/UX)</span>
            </label>
            
            {/* Active Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 min-h-[48px]">
              {formData.skillTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-extrabold bg-blue-50 text-[#368dff] border border-blue-200 flex items-center space-x-1.5"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-[#db3662] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {formData.skillTags.length === 0 && (
                <span className="text-xs text-slate-400">No skill tags assigned yet. Select presets below or add custom.</span>
              )}
            </div>

            {/* Custom Tag Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                placeholder="Type custom skill tag and press Enter..."
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => handleAddTag(tagInput)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#368dff]" />
                <span>Add</span>
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase self-center mr-1">Presets:</span>
              {PRESET_SKILLS.map((preset) => {
                const isSelected = formData.skillTags.includes(preset);
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => (isSelected ? handleRemoveTag(preset) : handleAddTag(preset))}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#368dff] text-white border-[#368dff] shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {preset} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Profile Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Experience Level
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all font-medium"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl} Level
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Platform Origin
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all font-medium"
              >
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="behance">Behance</option>
                <option value="x">X (Twitter)</option>
                <option value="dribbble">Dribbble</option>
                <option value="portfolio">Personal Portfolio</option>
                <option value="other">Other Public Web</option>
              </select>
            </div>

            {/* Candidate Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Candidate Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Professional Headline
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Bio Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Candidate Bio Summary
            </label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Candidate public bio or notes..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Avatar Image URL
            </label>
            <input
              type="text"
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-[#368dff] focus:bg-white transition-all font-mono"
            />
          </div>

          {/* Shortlist Checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="shortlist-check"
              checked={formData.isShortlisted}
              onChange={(e) => setFormData({ ...formData, isShortlisted: e.target.checked })}
              className="w-4 h-4 accent-[#db3662] rounded cursor-pointer"
            />
            <label htmlFor="shortlist-check" className="text-xs font-bold text-slate-700 cursor-pointer">
              Mark candidate as shortlisted immediately
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#368dff] hover:bg-[#257ce6] text-white text-xs font-extrabold rounded-xl shadow-md shadow-[#368dff]/20 flex items-center space-x-2 transition-all cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Candidate Profile</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
