import { relations } from "drizzle-orm"
import {
  integer,
  sqliteTable,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { workouts } from "./workouts.schema"
import { workoutSets } from "./worktoutSets.schema"
import { exercises } from "../exercises/exercises.schema"


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

export const workoutExercisesRelations = relations(workoutExercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),

  exercise: one(exercises, {
    fields: [workoutExercises.exerciseId],
    references: [exercises.id]
  }),

  workoutSets: many(workoutSets)
}))