const { getDB } = require('../config/db');

class UserModel {
  static async findByEmail(email) {
    const db = getDB();
    const row = await db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    if (!row) return null;
    return {
      ...row,
      _id: row.id
    };
  }

  static async findById(id) {
    const db = getDB();
    const row = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (!row) return null;
    return {
      ...row,
      _id: row.id
    };
  }

  static async create(data) {
    const db = getDB();
    const id = `usr-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const emailLower = data.email.toLowerCase();

    await db.run(
      `INSERT INTO users (id, name, email, password, company, role, avatar, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.name,
        emailLower,
        data.password,
        data.company || 'TalentLync Workspace',
        data.role || 'Talent Lead',
        data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
        createdAt
      ]
    );

    return this.findById(id);
  }
}

module.exports = UserModel;
