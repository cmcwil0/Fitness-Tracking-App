import { Router } from 'express';
import pool from '../db.js';

const router = Router();
const iso = (d) => (d ? new Date(d) : new Date()).toISOString().slice(0, 10);

async function fetchDay(userId, day) {
  const [rows] = await pool.query(
    `SELECT id, name, calories, protein, carbs, fat, quantity, entry_date
       FROM diary_entries
      WHERE user_id = ? AND entry_date = ?
      ORDER BY id DESC`,
    [userId, day]
  );
  return rows;
}

router.get('/today', async (req, res) => {
  try {
    const day = iso(req.query.date);
    const items = await fetchDay(req.user.id, day);
    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

router.patch('/qty', async (req, res) => {
  try {
    const userId = req.user.id;
    const day    = iso(req.body.date);
    const {
      name = '',
      delta = 0,
      calories = 0, protein = 0, carbs = 0, fat = 0
    } = req.body || {};

    if (!name || !Number.isFinite(delta)) {
      return res.status(400).json({ message: 'name and delta required' });
    }

    const [[existing]] = await pool.query(
      `SELECT id, quantity FROM diary_entries
        WHERE user_id = ? AND entry_date = ? AND name = ?`,
      [userId, day, name]
    );

    if (!existing) {
      if (delta <= 0) {
      } else {
        await pool.query(
          `INSERT INTO diary_entries
             (user_id, entry_date, name, calories, protein, carbs, fat, quantity)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [userId, day, name, calories, protein, carbs, fat, delta]
        );
      }
    } else {
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        await pool.query(`DELETE FROM diary_entries WHERE id = ?`, [existing.id]);
      } else {
        await pool.query(`UPDATE diary_entries SET quantity = ? WHERE id = ?`, [newQty, existing.id]);
      }
    }

    const items = await fetchDay(userId, day);
    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

router.delete('/item', async (req, res) => {
  try {
    const userId = req.user.id;
    const day    = iso(req.body.date);
    const { name = '' } = req.body || {};
    if (!name) return res.status(400).json({ message: 'name required' });

    await pool.query(
      `DELETE FROM diary_entries WHERE user_id = ? AND entry_date = ? AND name = ?`,
      [userId, day, name]
    );

    const items = await fetchDay(userId, day);
    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;