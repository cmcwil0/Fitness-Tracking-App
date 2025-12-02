import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';           // you already use this in routes
import authRouter from './routes/auth.js';
import goalsRouter from './routes/goals.js';
import diaryRouter from './routes/diary.js';
import nutritionRouter from './routes/nutrition.js';
import exercisesRouter from './routes/exercises.js';
import workoutsRouter from './routes/workouts.js';

const app = express();

// ---- CORS HANDLING (manual, so preflight is always correct) ----
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://www.fittrack.live',
  'https://fittrack.live',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  // Let caches/proxies know response varies by Origin
  res.header('Vary', 'Origin');

  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,PATCH,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Short-circuit preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// ---- Body parsing ----
app.use(express.json());

// ---- Routes ----
app.use('/api/auth', authRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/diary', diaryRouter);
app.use('/api/nutrition', nutritionRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/workouts', workoutsRouter);

// Optional health-check route
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// ---- Start server ----
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});