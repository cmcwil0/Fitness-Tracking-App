import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth.js';
import goalsRouter from './routes/goals.js';
import diaryRouter from './routes/diary.js';
import nutritionRouter from './routes/nutrition.js';
import exercisesRouter from './routes/exercises.js';
import workoutsRouter from './routes/workouts.js';

const app = express();

// --- CORS SETUP ---
// Build allowed origins from environment variable (comma-separated) and defaults
const isValidOrigin = (origin) => {
  try {
    const url = new URL(origin);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const envOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
      .map(o => o.trim())
      .filter(o => o && isValidOrigin(o))
  : [];

const allowedOrigins = [
  'http://localhost:5173',
  'https://www.fittrack.live',
  'https://fittrack.live',
  ...envOrigins,
];

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.path, 'Origin:', req.headers.origin);
  next();
});

// Explicit CORS middleware that also handles preflight
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin'); // tells caches responses vary by Origin
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Preflight request – reply with 204 and CORS headers only
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

// existing routes
app.use('/api/auth', authRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/diary', diaryRouter);
app.use('/api/nutrition', nutritionRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/workouts', workoutsRouter);
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
  console.log('Allowed CORS origins:', allowedOrigins);
});
