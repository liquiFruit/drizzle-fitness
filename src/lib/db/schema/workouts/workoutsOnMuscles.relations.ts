import { relations } from "drizzle-orm"

import { workoutsOnMuscles } from "./workoutsOnMuscles.table"
import { muscles } from "../muscles/muscles.table"
import { workouts } from "./workouts.table"

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