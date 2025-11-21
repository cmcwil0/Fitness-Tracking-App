import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { name, muscle, type, difficulty, offset, limit } = req.query;

    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (muscle) params.set('muscle', muscle);
    if (type) params.set('type', type);
    if (difficulty) params.set('difficulty', difficulty);
    if (offset) params.set('offset', offset);
    params.set('limit', limit || '10');

    const url = `https://api.api-ninjas.com/v1/exercises?${params.toString()}`;

    const r = await fetch(url, { headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } });
    if (!r.ok) return res.status(r.status).send(await r.text());

    const data = await r.json();
    res.json({ items: data });
  } catch (err) {
    res.status(500).send('Exercise lookup failed');
  }
});

export default router;