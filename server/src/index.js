import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import goalsRouter from './routes/goals.js';
import diaryRouter from './routes/diary.js';
import nutritionRouter from './routes/nutrition.js';
import exercisesRouter from './routes/exercises.js';
import workoutsRouter from './routes/workouts.js';
import requireAuth from './middleware/requireAuth.js';

const app = express();

// --- CORS SETUP 
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_ORIGIN,
  'https://www.fittrack.live',
  'https://fittrack.live',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // allow same-origin / curl / server-side
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// --- BODY PARSING 
app.use(express.json());

// --- ROUTES

app.use('/api/auth', authRouter);

app.use('/api/goals', requireAuth, goalsRouter);
app.use('/api/diary', requireAuth, diaryRouter);
app.use('/api/nutrition', requireAuth, nutritionRouter);
app.use('/api/exercises', requireAuth, exercisesRouter);
app.use('/api/workouts', requireAuth, workoutsRouter);

// Simple health check so we can hit the API URL directly
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'fitness-api is running',
    env: process.env.NODE_ENV || 'development',
  });
});

// --- START SERVER 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});