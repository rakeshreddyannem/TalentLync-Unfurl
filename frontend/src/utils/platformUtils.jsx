import React from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Globe,
  Palette,
  Briefcase
} from 'lucide-react';

export const createLocalAvatarSvg = (name = 'Candidate', platform = 'other') => {
  const cleanName = name.trim() || 'Talent Candidate';
  const parts = cleanName.split(' ').filter(Boolean);
  let initials = 'TL';
  if (parts.length >= 2) {
    initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1) {
    initials = parts[0].substring(0, 2).toUpperCase();
  }

  const platformColors = {
    github: ['#0f172a', '#368dff'],
    linkedin: ['#0066cc', '#368dff'],
    behance: ['#053eff', '#8b5cf6'],
    x: ['#0f172a', '#0284c7'],
    dribbble: ['#ea4c89', '#db3662'],
    portfolio: ['#00a962', '#10b981'],
    other: ['#368dff', '#00a962'],
  };

  const [color1, color2] = platformColors[platform.toLowerCase()] || platformColors.other;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <defs>
      <linearGradient id="grad-${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    </defs>
    <rect width="128" height="128" rx="36" fill="url(#grad-${initials})" />
    <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="900" letter-spacing="1">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getPlatformMeta = (platformName = 'other') => {
  const p = platformName.toLowerCase();
  switch (p) {
    case 'github':
      return {
        label: 'GitHub',
        icon: <Github className="w-4 h-4" />,
        badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
        color: '#0f172a',
      };
    case 'linkedin':
      return {
        label: 'LinkedIn',
        icon: <Linkedin className="w-4 h-4" />,
        badgeClass: 'bg-blue-50 text-[#368dff] border-blue-200',
        color: '#368dff',
      };
    case 'behance':
      return {
        label: 'Behance',
        icon: <Palette className="w-4 h-4" />,
        badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        color: '#053eff',
      };
    case 'x':
    case 'twitter':
      return {
        label: 'X (Twitter)',
        icon: <Twitter className="w-4 h-4" />,
        badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
        color: '#0284c7',
      };
    case 'dribbble':
      return {
        label: 'Dribbble',
        icon: <Dribbble className="w-4 h-4" />,
        badgeClass: 'bg-pink-50 text-pink-700 border-pink-200',
        color: '#ea4c89',
      };
    case 'portfolio':
      return {
        label: 'Portfolio',
        icon: <Globe className="w-4 h-4" />,
        badgeClass: 'bg-emerald-50 text-[#00a962] border-emerald-200',
        color: '#00a962',
      };
    default:
      return {
        label: 'Public Profile',
        icon: <Briefcase className="w-4 h-4" />,
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        color: '#64748b',
      };
  }
};

export const getExperienceBadgeColor = (level = 'Mid') => {
  switch (level) {
    case 'Junior':
      return 'bg-emerald-50 text-[#00a962] border-emerald-200';
    case 'Mid':
      return 'bg-blue-50 text-[#368dff] border-blue-200';
    case 'Senior':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Lead':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Executive':
      return 'bg-amber-50 text-[#d97706] border-amber-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export const getRelevanceColor = (score = 75) => {
  if (score >= 90) return 'text-[#00a962] bg-emerald-50 border-emerald-200';
  if (score >= 75) return 'text-[#368dff] bg-blue-50 border-blue-200';
  if (score >= 50) return 'text-[#d97706] bg-amber-50 border-amber-200';
  return 'text-[#db3662] bg-rose-50 border-rose-200';
};
