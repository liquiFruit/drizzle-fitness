import {
  integer,
  sqliteTable,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { workouts } from "./workouts.table"
import { exercises } from "../exercises/exercises.table"


export const workoutExercises = sqliteTable("workout_exercises", {
  id: integer("id").primaryKey(),

  workoutId: integer("workout_id")
    .notNull()
    .references(() => workouts.id, { onDelete: "cascade" }),

  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" })
})

export const SelectWorkoutExercise = createSelectSchema(workoutExercises)
export const InsertWorkoutExercise = createInsertSchema(workoutExercises)

