import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      calorie_target,
      protein_target = null,
      carbs_target   = null,
      fat_target     = null,
    } = req.body || {};

    if (typeof calorie_target === 'undefined' || calorie_target === null) {
      return res.status(400).json({ message: 'calorie_target required' });
    }

    await pool.query(
      `INSERT INTO goals (user_id, calorie_target, protein_target, carbs_target, fat_target)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         calorie_target = VALUES(calorie_target),
         protein_target = VALUES(protein_target),
         carbs_target   = VALUES(carbs_target),
         fat_target     = VALUES(fat_target)`,
      [userId, calorie_target, protein_target, carbs_target, fat_target]
    );

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

/* Get current user's saved goal */
router.get('/me', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT user_id, calorie_target, protein_target, carbs_target, fat_target FROM goals WHERE user_id = ?',
      [req.user.id]
    );
    res.json(rows[0] || {});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;