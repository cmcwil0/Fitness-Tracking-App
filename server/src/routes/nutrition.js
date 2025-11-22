import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.get('/', async (req, res) => {
  const q = (req.query.query || '').trim();
  if (!q) return res.status(400).json({ message: 'query is required' });

  try {
    const r = await fetch(
      `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(q)}`,
      { headers: { 'X-Api-Key': process.env.API_NINJAS_KEY || '' } }
    );

    const text = await r.text();
    if (!r.ok) {
      return res.status(502).json({ message: 'upstream error', detail: text });
    }

    const items = JSON.parse(text); // array from API Ninjas
    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;