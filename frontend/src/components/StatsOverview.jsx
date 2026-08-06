import React from 'react';
import { Users, Heart, Award, Layers } from 'lucide-react';

export default function StatsOverview({ candidates = [] }) {
  const total = candidates.length;
  const shortlistedCount = candidates.filter(c => c.isShortlisted).length;
  const highMatchCount = candidates.filter(c => (c.relevanceScore || 0) >= 85).length;
  
  const platformCounts = candidates.reduce((acc, c) => {
    const p = (c.platform || 'other').toLowerCase();
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  const activePlatforms = Object.keys(platformCounts).length;

  const stats = [
    {
      title: 'Discovered Candidates',
      value: total,
      sub: `${highMatchCount} high relevance (>85%)`,
      icon: <Users className="w-5 h-5 text-[#368dff]" />,
      bg: 'bg-blue-50/70',
      border: 'border-blue-200/80',
      iconBg: 'bg-white border-blue-200',
    },
    {
      title: 'Shortlisted Talent',
      value: shortlistedCount,
      sub: total > 0 ? `${Math.round((shortlistedCount / total) * 100)}% of candidate pool` : '0% pool',
      icon: <Heart className="w-5 h-5 text-[#db3662]" />,
      bg: 'bg-rose-50/70',
      border: 'border-rose-200/80',
      iconBg: 'bg-white border-rose-200',
    },
    {
      title: 'Top Score Average',
      value: total > 0 ? `${Math.round(candidates.reduce((a, b) => a + (b.relevanceScore || 0), 0) / total)}%` : '0%',
      sub: 'Algorithmic relevance',
      icon: <Award className="w-5 h-5 text-[#d97706]" />,
      bg: 'bg-amber-50/70',
      border: 'border-amber-200/80',
      iconBg: 'bg-white border-amber-200',
    },
    {
      title: 'Active Platforms',
      value: activePlatforms,
      sub: 'GitHub, Behance, X, Portfolio',
      icon: <Layers className="w-5 h-5 text-[#00a962]" />,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200/80',
      iconBg: 'bg-white border-emerald-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-2xl ${item.bg} border ${item.border} shadow-sm flex items-center justify-between transition-transform duration-200 hover:-translate-y-0.5`}
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.title}</p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{item.value}</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">{item.sub}</p>
          </div>
          <div className={`p-3 rounded-xl border ${item.iconBg} shadow-sm`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}


