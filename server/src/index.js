// src/index.js  (fitness-api)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.js';
import goalsRouter from './routes/goals.js';
import diaryRouter from './routes/diary.js';
import nutritionRouter from './routes/nutrition.js';
import exercisesRouter from './routes/exercises.js';
import workoutsRouter from './routes/workouts.js';

const app = express();

// --- CORS SETUP -------------------------------------------------

const allowedOrigins = [
  'http://localhost:5173',
  'https://www.fittrack.live',
  'https://fittrack.live',
];

// Manual CORS headers so we are 100% sure they are set
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.includes(origin)) {
    // reflect the allowed origin
    if (origin) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  // Handle the preflight request here
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// You can still keep cors() for good measure, it won't hurt
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// --- BODY PARSING -----------------------------------------------
app.use(express.json());

// --- ROUTES -----------------------------------------------------
app.use('/api/auth', authRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/diary', diaryRouter);
app.use('/api/nutrition', nutritionRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/workouts', workoutsRouter);

// Simple health check so we can hit the API URL directly
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'fitness-api is running' });
});

// --- START SERVER -----------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});