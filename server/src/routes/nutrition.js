import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.get('/', async (req, res) => {
  const q = (req.query.query || '').trim();
  const quantity = (req.query.quantity || '100g').trim(); 

  if (!q) {
    return res.status(400).json({ message: 'query is required' });
  }

  try {
    const url =
      `https://api.api-ninjas.com/v1/nutritionitem` +
      `?query=${encodeURIComponent(q)}` +
      `&quantity=${encodeURIComponent(quantity)}`;

    const r = await fetch(url, {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY || '',
      },
    });

    const text = await r.text();

    if (!r.ok) {
      console.error('Nutrition API error:', text);
      return res
        .status(502)
        .json({ message: 'upstream error', detail: text });
    }

    // nutritionitem returns a single object, not an array
    const item = text ? JSON.parse(text) : null;
    const items = item ? [item] : [];

    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;