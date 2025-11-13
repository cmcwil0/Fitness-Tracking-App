import { Router } from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { makeCandidateUsername } from '../utils/username.js';

const router = Router();
const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });

/** Register with { firstName, lastName, email, password } */
router.post('/register', async (req, res) => {
  try {
    const { firstName = '', lastName = '', email = '', password = '' } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });
    if (password.length < 6) return res.status(400).json({ message: 'password must be at least 6 characters long' });

    const [byEmail] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (byEmail.length) return res.status(409).json({ message: 'email already registered' });

    const baseList = makeCandidateUsername({ firstName, lastName, email });
    let username = null;
    for (const base of baseList) {
      let candidate = base;
      for (let n = 0; n <= 9999; n++) {
        const [rows] = await pool.query('SELECT id FROM users WHERE username = ?', [candidate]);
        if (!rows.length) { username = candidate; break; }
        candidate = `${base}${n + 1}`;
      }
      if (username) break;
    }
    if (!username) username = `user${Date.now()}`;

    const hash = await bcrypt.hash(password, 12);
    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );

    return res.status(201).json({ ok: true, username });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

/** Login with username OR email */
router.post('/login', async (req, res) => {
  try {
    const identifier = req.body.identifier ?? req.body.username ?? '';
    const { password = '' } = req.body || {};
    if (!identifier || !password) return res.status(400).json({ message: 'identifier and password required' });

    const isEmail = identifier.includes('@');
    const sql = isEmail
      ? 'SELECT id, username, email, role, password_hash FROM users WHERE email = ?'
      : 'SELECT id, username, email, role, password_hash FROM users WHERE username = ?';

    const [rows] = await pool.query(sql, [identifier]);
    if (!rows.length) return res.status(401).json({ message: 'invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });

    const token = sign({ id: user.id, username: user.username, role: user.role });
    const { password_hash, ...safe } = user;
    res.json({ token, user: safe });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;