export const exportCandidatesToCsv = (candidates = [], filename = 'TalentLync_Candidates.csv') => {
  if (!candidates || candidates.length === 0) {
    alert('No candidate data available to export.');
    return;
  }

  const headers = [
    'ID',
    'Name',
    'Headline',
    'Platform',
    'Relevance Score (%)',
    'Experience Level',
    'Skill Tags',
    'Shortlisted',
    'Profile URL',
    'Created At',
  ];

  const escapeCsv = (str = '') => {
    const stringified = String(str).replace(/"/g, '""');
    return `"${stringified}"`;
  };

  const rows = candidates.map((c) => [
    escapeCsv(c._id || c.id || ''),
    escapeCsv(c.name || ''),
    escapeCsv(c.headline || ''),
    escapeCsv(c.platform || ''),
    escapeCsv(c.relevanceScore ?? 0),
    escapeCsv(c.experienceLevel || ''),
    escapeCsv((c.skillTags || []).join('; ')),
    escapeCsv(c.isShortlisted ? 'Yes' : 'No'),
    escapeCsv(c.url || ''),
    escapeCsv(c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
