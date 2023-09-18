import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

import { workouts } from "./workouts.schema"
import { muscles } from "../muscles"


export const workoutsOnMuscles = sqliteTable("workouts_on_muscles", {
  workoutId: integer("workout_id").notNull().references(() => workouts.id, { onDelete: "cascade" }),
  muscleId: integer("muscle_id").notNull().references(() => muscles.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey(t.workoutId, t.muscleId)
}))

export const workoutMusclesRelations = relations(workoutsOnMuscles, ({ one }) => ({
  workout: one(workouts, {
    fields: [workoutsOnMuscles.workoutId],
    references: [workouts.id]
  }),

  muscle: one(muscles, {
    fields: [workoutsOnMuscles.muscleId],
    references: [muscles.id]
  })
}))