import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import nutritionRoutes from './routes/nutrition.js';
import goalsRoutes from './routes/goals.js';
import diaryRoutes from './routes/diary.js';
import requireAuth from './middleware/requireAuth.js';

const app = express();

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.use('/api', nutritionRoutes);

app.use('/api/goals', requireAuth, goalsRoutes);

app.use('/api/diary', requireAuth, diaryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));