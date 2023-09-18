import { relations } from "drizzle-orm"
import {
  integer,
  sqliteTable,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { workouts } from "./workouts.schema"
import { workoutSets } from "./worktoutSets.schema"


export const workoutExercises = sqliteTable("workout_exercises", {
  id: integer("id").primaryKey(),
  workoutId: integer("workout_id").notNull(),
  exerciseId: integer("exercise_id").notNull()
})

export const SelectWorkoutExercise = createSelectSchema(workoutExercises)
export const InsertWorkoutExercise = createInsertSchema(workoutExercises)

export const workoutExercisesRelations = relations(workoutExercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),

  workoutSets: many(workoutSets)
}))