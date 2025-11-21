import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import authRouter from './routes/auth.js';
import goalsRouter from './routes/goals.js';
import diaryRouter from './routes/diary.js';
import nutritionRouter from './routes/nutrition.js';
import exercisesRouter from './routes/exercises.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.userId = payload.userId || payload.id;
    return next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

app.use('/api/auth', authRouter);
app.use('/api/goals', requireAuth, goalsRouter);
app.use('/api/diary', requireAuth, diaryRouter);

app.use('/api/nutrition', requireAuth, nutritionRouter);
app.use('/api/exercises', requireAuth, exercisesRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});