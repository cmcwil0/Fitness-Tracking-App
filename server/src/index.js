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

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());

// Single, consistent auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    // All routes (goals/diary/etc) expect req.user.id
    req.user = {
      id: payload.id || payload.userId,
      username: payload.username,
      role: payload.role
    };
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// Public health-check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/goals', requireAuth, goalsRouter);
app.use('/api/diary', requireAuth, diaryRouter);
app.use('/api/nutrition', nutritionRouter);
app.use('/api/exercises', requireAuth, exercisesRouter);

// Safety net so curl never sees "Empty reply from server"
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));