import { Router } from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const makeToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'username and password required' });
    }

    const [exists] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (exists.length) return res.status(409).json({ message: 'username already exists' });

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email || null, hash]
    );

    // read back the row to include role and email
    const [rows] = await pool.query(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [result.insertId]
    );
    const user = rows[0];

    const token = makeToken({ id: user.id, username: user.username, role: user.role });
    res.status(201).json({ token, user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'username and password required' });

    const [rows] = await pool.query(
      'SELECT id, username, email, role, password_hash FROM users WHERE username = ?',
      [username]
    );
    if (!rows.length) return res.status(401).json({ message: 'invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });

    const token = makeToken({ id: user.id, username: user.username, role: user.role });
    // strip password_hash before returning
    const { password_hash, ...safeUser } = user;
    res.json({ token, user: safeUser });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

// helper: return current user from token
router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'missing token' });

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');

    const [rows] = await pool.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [payload.id]
    );
    if (!rows.length) return res.status(404).json({ message: 'user not found' });

    res.json({ user: rows[0] });
  } catch (e) {
    return res.status(401).json({ message: 'invalid or expired token' });
  }
});

export default router;