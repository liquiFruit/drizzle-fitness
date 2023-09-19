import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"

import { workouts } from "./workouts.table"
import { muscles } from "../muscles/muscles.table"


export const workoutsOnMuscles = sqliteTable("workouts_on_muscles", {
  workoutId: integer("workout_id").notNull().references(() => workouts.id, { onDelete: "cascade" }),
  muscleId: integer("muscle_id").notNull().references(() => muscles.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey(t.workoutId, t.muscleId)
}))