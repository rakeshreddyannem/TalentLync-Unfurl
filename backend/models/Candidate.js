const { getDB } = require('../config/db');

class CandidateModel {
  static async findAll({ search, platform, minScore, shortlisted, sortBy = 'createdAt', order = 'desc' } = {}) {
    const db = getDB();
    let query = 'SELECT * FROM candidates WHERE 1=1';
    const params = [];

    if (platform && platform !== 'all') {
      query += ' AND platform = ?';
      params.push(platform);
    }

    if (minScore) {
      query += ' AND relevanceScore >= ?';
      params.push(Number(minScore));
    }

    if (shortlisted === 'true') {
      query += ' AND isShortlisted = 1';
    }

    if (search) {
      query += ' AND (name LIKE ? OR headline LIKE ? OR bio LIKE ? OR skillTags LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    const validSortFields = ['createdAt', 'name', 'relevanceScore', 'platform'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const rows = await db.all(query, params);
    
    return rows.map(r => ({
      ...r,
      _id: r.id,
      skillTags: JSON.parse(r.skillTags || '[]'),
      isShortlisted: Boolean(r.isShortlisted)
    }));
  }

  static async findById(id) {
    const db = getDB();
    const row = await db.get('SELECT * FROM candidates WHERE id = ?', [id]);
    if (!row) return null;
    return {
      ...row,
      _id: row.id,
      skillTags: JSON.parse(row.skillTags || '[]'),
      isShortlisted: Boolean(row.isShortlisted)
    };
  }

  static async create(data) {
    const db = getDB();
    const id = `cand-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const skillTagsJson = JSON.stringify(Array.isArray(data.skillTags) ? data.skillTags : []);
    const isShortlistedInt = data.isShortlisted ? 1 : 0;

    await db.run(
      `INSERT INTO candidates (id, url, name, headline, bio, avatarUrl, platform, skillTags, experienceLevel, relevanceScore, isShortlisted, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.url,
        data.name,
        data.headline || '',
        data.bio || '',
        data.avatarUrl || '',
        data.platform || 'other',
        skillTagsJson,
        data.experienceLevel || 'Mid',
        data.relevanceScore !== undefined ? Number(data.relevanceScore) : 75,
        isShortlistedInt,
        createdAt
      ]
    );

    return this.findById(id);
  }

  static async toggleShortlist(id) {
    const candidate = await this.findById(id);
    if (!candidate) return null;

    const db = getDB();
    const newShortlistState = candidate.isShortlisted ? 0 : 1;

    await db.run('UPDATE candidates SET isShortlisted = ? WHERE id = ?', [newShortlistState, id]);
    return this.findById(id);
  }

  static async deleteById(id) {
    const db = getDB();
    const res = await db.run('DELETE FROM candidates WHERE id = ?', [id]);
    return res.changes > 0;
  }
}

module.exports = CandidateModel;
