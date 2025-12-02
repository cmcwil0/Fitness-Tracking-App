import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import authRouter from './routes/auth.js';
import goalsRouter from './routes/goals.js';
import diaryRouter from './routes/diary.js';
import nutritionRouter from './routes/nutrition.js';
import exercisesRouter from './routes/exercises.js';
import workoutsRouter from './routes/workouts.js';

const app = express();

// ---------- HARDENED CORS MIDDLEWARE ----------
const allowedOrigins = [
  'http://localhost:5173',
  'https://www.fittrack.live',
  'https://fittrack.live',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // For debugging – this should show up in the fitness-api logs
  console.log('CORS check:', req.method, req.path, 'Origin:', origin);

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    // This is the preflight response – it MUST include the headers above
    return res.status(204).end();
  }

  next();
});

// ---------- JSON BODY PARSING ----------
app.use(express.json());

// ---------- ROUTES ----------
app.use('/api/auth', authRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/diary', diaryRouter);
app.use('/api/nutrition', nutritionRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/workouts', workoutsRouter);

// OPTIONAL health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});