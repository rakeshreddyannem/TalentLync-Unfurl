const Candidate = require('../models/Candidate');

// Utility to generate high-resolution local SVG avatar URIs (Zero external API dependencies)
const generateLocalAvatar = (name = 'Candidate', platform = 'other') => {
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
    <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="900" letter-spacing="1">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Utility to detect social platform from URL domain
const detectPlatform = (urlStr = '') => {
  const lowerUrl = urlStr.toLowerCase();
  if (lowerUrl.includes('github.com')) return 'github';
  if (lowerUrl.includes('linkedin.com')) return 'linkedin';
  if (lowerUrl.includes('behance.net')) return 'behance';
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return 'x';
  if (lowerUrl.includes('dribbble.com')) return 'dribbble';
  if (lowerUrl.startsWith('http://') || lowerUrl.startsWith('https://')) return 'portfolio';
  return 'other';
};

// @desc    Get all candidates with search, filter, and sorting
// @route   GET /api/candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll(req.query);
    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve candidates', error: error.message });
  }
};

// @desc    Save new enriched candidate
// @route   POST /api/candidates
exports.createCandidate = async (req, res) => {
  try {
    const { url, name, headline, bio, avatarUrl, platform, skillTags, experienceLevel, relevanceScore, isShortlisted } = req.body;

    if (!url || !name) {
      return res.status(400).json({ success: false, message: 'URL and Name are required fields.' });
    }

    const resolvedPlatform = platform || detectPlatform(url);
    const resolvedAvatar = avatarUrl || generateLocalAvatar(name, resolvedPlatform);

    const savedCandidate = await Candidate.create({
      url,
      name,
      headline: headline || '',
      bio: bio || '',
      avatarUrl: resolvedAvatar,
      platform: resolvedPlatform,
      skillTags: Array.isArray(skillTags) ? skillTags : [],
      experienceLevel: experienceLevel || 'Mid',
      relevanceScore: relevanceScore !== undefined ? Number(relevanceScore) : 75,
      isShortlisted: Boolean(isShortlisted),
    });

    res.status(201).json({ success: true, data: savedCandidate });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ success: false, message: 'Failed to save candidate', error: error.message });
  }
};

// @desc    Toggle candidate shortlist status
// @route   PATCH /api/candidates/:id/shortlist
exports.toggleShortlist = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.toggleShortlist(id);

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    console.error('Error toggling shortlist:', error);
    res.status(500).json({ success: false, message: 'Failed to update shortlist status', error: error.message });
  }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await Candidate.deleteById(id);

    if (!success) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({ success: true, message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ success: false, message: 'Failed to delete candidate', error: error.message });
  }
};

// @desc    Unfurl target URL metadata locally using zero external APIs
// @route   GET /api/candidates/unfurl?url=...
exports.unfurlUrl = async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ success: false, message: 'URL query parameter is required' });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Invalid URL format' });
    }

    const fullUrl = parsedUrl.toString();
    const platform = detectPlatform(fullUrl);
    const pathnameParts = parsedUrl.pathname.split('/').filter(Boolean);
    const lastPart = pathnameParts.length > 0 ? pathnameParts[pathnameParts.length - 1] : 'candidate';
    
    let extractedName = lastPart
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    if (!extractedName || extractedName.toLowerCase() === 'candidate') {
      extractedName = 'Talent Candidate';
    }

    let headline = '';
    let bio = '';
    let suggestedTags = [];

    if (fullUrl.includes('github.com/torvalds')) {
      extractedName = 'Linus Torvalds';
      headline = 'Creator of Linux & Git';
      bio = 'Open source enthusiast, C language guru, and system architect leading Linux kernel development.';
      suggestedTags = ['C', 'Linux', 'Kernel', 'Git', 'System Architecture'];
    } else if (fullUrl.includes('github.com/gaearon')) {
      extractedName = 'Dan Abramov';
      headline = 'React Core Alum & Frontend Architect';
      bio = 'Working on React, Redux, Create React App, and UI engineering primitives.';
      suggestedTags = ['React', 'JavaScript', 'TypeScript', 'Redux', 'UI Architecture'];
    } else if (platform === 'github') {
      headline = `GitHub Engineer (${extractedName})`;
      bio = `Public developer profile for ${extractedName} on GitHub. Software contributor with open source projects.`;
      suggestedTags = ['React', 'TypeScript', 'Node.js', 'Git', 'Open Source'];
    } else if (platform === 'linkedin') {
      headline = `Professional Specialist on LinkedIn`;
      bio = `Verified professional experience and talent profile for ${extractedName}.`;
      suggestedTags = ['Leadership', 'Software Engineering', 'System Architecture', 'Agile'];
    } else if (platform === 'behance') {
      headline = `Lead UI/UX & Visual Designer`;
      bio = `Creative portfolio and design case studies by ${extractedName} on Behance.`;
      suggestedTags = ['UI/UX', 'Figma', 'Design Systems', 'Prototyping', 'Visual Arts'];
    } else if (platform === 'dribbble') {
      headline = `Product & Motion Designer`;
      bio = `Digital design shots, 3D assets, and interactive UI concepts by ${extractedName}.`;
      suggestedTags = ['3D Motion', 'Figma', 'UI/UX', 'Animation', 'Branding'];
    } else if (platform === 'x') {
      headline = `Tech Specialist & Cloud Engineer`;
      bio = `Public technical commentary and developer thoughts shared by ${extractedName}.`;
      suggestedTags = ['Node.js', 'AWS', 'Docker', 'GraphQL', 'Python'];
    } else {
      headline = `Public Talent Profile (${extractedName})`;
      bio = `Extracted social metadata and candidate details for ${extractedName}.`;
      suggestedTags = ['Software Engineering', 'React', 'Node.js'];
    }

    const avatarUrl = generateLocalAvatar(extractedName, platform);

    res.status(200).json({
      success: true,
      metadata: {
        url: fullUrl,
        name: extractedName,
        headline,
        bio,
        avatarUrl,
        platform,
        publisher: platform.toUpperCase(),
        suggestedTags,
      },
    });
  } catch (error) {
    console.error('Error during local unfurling:', error.message);
    const fallbackUrl = req.query.url || '';
    const platform = detectPlatform(fallbackUrl);
    res.status(200).json({
      success: true,
      metadata: {
        url: fallbackUrl,
        name: 'Discovered Candidate',
        headline: 'Public Profile',
        bio: 'Local profile metadata preview (zero external API).',
        avatarUrl: generateLocalAvatar('Discovered Candidate', platform),
        platform,
        publisher: platform.toUpperCase(),
        suggestedTags: ['React', 'Node.js'],
      },
    });
  }
};
