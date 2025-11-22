import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const key = process.env.API_NINJAS_KEY;
    if (!key) return res.status(500).json({ error: 'API key missing on server' });

    const params = new URLSearchParams();
    for (const p of ['name', 'muscle', 'type', 'equipment']) {
      const v = req.query[p];
      if (v) params.set(p, v);
    }

    const upstream = await fetch(
      `https://api.api-ninjas.com/v1/exercises?${params.toString()}`,
      { headers: { 'X-Api-Key': key } }
    );

    if (!upstream.ok) {
      const body = await upstream.text().catch(() => '');
      return res.status(502).json({ error: 'Upstream error', status: upstream.status, body });
    }

    const data = await upstream.json();
    const items = (Array.isArray(data) ? data : []).map(x => ({
      name: x.name,
      muscle: x.muscle,
      type: x.type,
      equipment: x.equipment,
      difficulty: x.difficulty,
      instructions: x.instructions,
    }));

    res.json({ items });
  } catch (err) {
    console.error('EXERCISES ROUTE ERROR', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
