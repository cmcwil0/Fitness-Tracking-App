import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/log", async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      duration_hours,
      duration_minutes,
      workout_type,
      preset,
      exercises,
    } = req.body;

    const [result] = await db.execute(
      `INSERT INTO workouts (user_id, workout_type, preset, duration_hours, duration_minutes, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [userId, workout_type, preset, duration_hours, duration_minutes]
    );

    const workoutId = result.insertId;

    if (Array.isArray(exercises)) {
      for (const ex of exercises) {
        await db.execute(
          `INSERT INTO workout_exercises (workout_id, name, description)
           VALUES (?, ?, ?)`,
          [workoutId, ex.name || "", ex.description || ""]
        );
      }
    }

    res.json({ success: true, workoutId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save workout" });
  }
});

router.get("/mine", async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.execute(
      `SELECT * FROM workouts WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    res.json({ workouts: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const workoutId = req.params.id;

    const [checkRows] = await db.execute(
      `SELECT id FROM workouts WHERE id = ? AND user_id = ?`,
      [workoutId, userId]
    );

    if (checkRows.length === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    await db.execute(
      `DELETE FROM workout_exercises WHERE workout_id = ?`,
      [workoutId]
    );

    const [result] = await db.execute(
      `DELETE FROM workouts WHERE id = ? AND user_id = ?`,
      [workoutId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete workout" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const workoutId = req.params.id;

    const [workoutRows] = await db.execute(
      `SELECT * FROM workouts WHERE id = ? AND user_id = ?`,
      [workoutId, userId]
    );

    if (workoutRows.length === 0) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const workout = workoutRows[0];

    const [exerciseRows] = await db.execute(
      `SELECT id, name, description
       FROM workout_exercises
       WHERE workout_id = ?
       ORDER BY id`,
      [workoutId]
    );

    workout.exercises = exerciseRows;

    res.json({ workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch workout details" });
  }
});

export default router;