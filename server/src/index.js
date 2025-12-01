import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import authRouter from './routes/auth.js';
import goalsRouter from './routes/goals.js';
import diaryRouter from './routes/diary.js';
import nutritionRouter from './routes/nutrition.js';
import exercisesRouter from './routes/exercises.js';
import workoutsRouter from "./routes/workouts.js";

const app = express();

const allowedOrigins = [
  'http://localhost:5173',          // local dev
  'https://www.fittrack.live',      // production
  'https://fittrack.live',          
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
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

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/goals', requireAuth, goalsRouter);
app.use('/api/diary', requireAuth, diaryRouter);
app.use('/api/nutrition', nutritionRouter);
app.use('/api/exercises', requireAuth, exercisesRouter);
app.use("/api/workouts", requireAuth, workoutsRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));