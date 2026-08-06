const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let dbInstance = null;

const seedDefaultCandidates = [
  {
    id: 'cand-1',
    url: 'https://github.com/torvalds',
    name: 'Linus Torvalds',
    headline: 'Creator of Linux & Git',
    bio: 'Open source enthusiast, C language guru, and system architect leading Linux kernel development.',
    avatarUrl: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad-LT%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23368dff%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2236%22%20fill%3D%22url(%23grad-LT)%22%20%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2264%22%20r%3D%2254%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.3)%22%20stroke-width%3D%222%22%20%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2246%22%20font-weight%3D%22900%22%20letter-spacing%3D%221%22%3ELT%3C%2Ftext%3E%3C%2Fsvg%3E',
    platform: 'github',
    skillTags: JSON.stringify(['C', 'Linux', 'Kernel', 'Git', 'System Architecture']),
    experienceLevel: 'Lead',
    relevanceScore: 98,
    isShortlisted: 1,
    createdAt: new Date('2026-08-06T08:00:00Z').toISOString()
  },
  {
    id: 'cand-2',
    url: 'https://github.com/gaearon',
    name: 'Dan Abramov',
    headline: 'React Core Alum & Frontend Architect',
    bio: 'Working on React, Redux, Create React App, and UI engineering primitives.',
    avatarUrl: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad-DA%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23368dff%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2236%22%20fill%3D%22url(%23grad-DA)%22%20%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2264%22%20r%3D%2254%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.3)%22%20stroke-width%3D%222%22%20%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2246%22%20font-weight%3D%22900%22%20letter-spacing%3D%221%22%3EDA%3C%2Ftext%3E%3C%2Fsvg%3E',
    platform: 'github',
    skillTags: JSON.stringify(['React', 'JavaScript', 'TypeScript', 'Redux', 'UI Architecture']),
    experienceLevel: 'Senior',
    relevanceScore: 94,
    isShortlisted: 1,
    createdAt: new Date('2026-08-06T08:10:00Z').toISOString()
  },
  {
    id: 'cand-3',
    url: 'https://www.behance.net/elena_rostova',
    name: 'Elena Rostova',
    headline: 'Lead Product Designer & Design Systems Lead',
    bio: 'Crafting high-impact fintech micro-interactions, dark mode designs, and accessible design systems.',
    avatarUrl: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad-ER%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23053eff%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%238b5cf6%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2236%22%20fill%3D%22url(%23grad-ER)%22%20%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2264%22%20r%3D%2254%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.3)%22%20stroke-width%3D%222%22%20%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2246%22%20font-weight%3D%22900%22%20letter-spacing%3D%221%22%3EER%3C%2Ftext%3E%3C%2Fsvg%3E',
    platform: 'behance',
    skillTags: JSON.stringify(['UI/UX', 'Figma', 'Design Systems', 'Micro-animations', 'Prototyping']),
    experienceLevel: 'Lead',
    relevanceScore: 91,
    isShortlisted: 0,
    createdAt: new Date('2026-08-06T08:20:00Z').toISOString()
  },
  {
    id: 'cand-4',
    url: 'https://x.com/alex_vance',
    name: 'Alex Vance',
    headline: 'Full Stack Cloud Engineer (AWS / Node / React)',
    bio: 'Building scalable distributed microservices, GraphQL gateways, and real-time dashboard analytics.',
    avatarUrl: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20viewBox%3D%220%200%20128%20128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad-AV%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230284c7%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2236%22%20fill%3D%22url(%23grad-AV)%22%20%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2264%22%20r%3D%2254%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.3)%22%20stroke-width%3D%222%22%20%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2246%22%20font-weight%3D%22900%22%20letter-spacing%3D%221%22%3EAV%3C%2Ftext%3E%3C%2Fsvg%3E',
    platform: 'x',
    skillTags: JSON.stringify(['Node.js', 'React', 'AWS', 'Docker', 'GraphQL', 'MongoDB']),
    experienceLevel: 'Senior',
    relevanceScore: 86,
    isShortlisted: 0,
    createdAt: new Date('2026-08-06T08:30:00Z').toISOString()
  }
];

const connectDB = async () => {
  if (dbInstance) return dbInstance;

  try {
    const dbPath = process.env.SQLITE_DB_PATH || path.join(__dirname, '../talentlync.sqlite');

    dbInstance = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log(`[Database] Successfully connected to SQLite database at: ${dbPath}`);

    // Create Candidates Table
    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS candidates (
        id TEXT PRIMARY KEY,
        url TEXT NOT NULL,
        name TEXT NOT NULL,
        headline TEXT DEFAULT '',
        bio TEXT DEFAULT '',
        avatarUrl TEXT DEFAULT '',
        platform TEXT DEFAULT 'other',
        skillTags TEXT DEFAULT '[]',
        experienceLevel TEXT DEFAULT 'Mid',
        relevanceScore INTEGER DEFAULT 75,
        isShortlisted INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL
      )
    `);

    // Create Users Table for Authentication
    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        company TEXT DEFAULT '',
        role TEXT DEFAULT 'Recruiter',
        avatar TEXT DEFAULT '',
        createdAt TEXT NOT NULL
      )
    `);

    // Seed initial candidates if empty
    const candidateCount = await dbInstance.get('SELECT COUNT(*) as count FROM candidates');
    if (candidateCount && candidateCount.count === 0) {
      for (const item of seedDefaultCandidates) {
        await dbInstance.run(
          `INSERT INTO candidates (id, url, name, headline, bio, avatarUrl, platform, skillTags, experienceLevel, relevanceScore, isShortlisted, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [item.id, item.url, item.name, item.headline, item.bio, item.avatarUrl, item.platform, item.skillTags, item.experienceLevel, item.relevanceScore, item.isShortlisted, item.createdAt]
        );
      }
      console.log('[Seed] SQLite database populated with default candidate profiles.');
    }

    return dbInstance;
  } catch (err) {
    console.error('[Database Error] Failed to initialize SQLite database:', err);
    throw err;
  }
};

const getDB = () => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return dbInstance;
};

module.exports = { connectDB, getDB };
