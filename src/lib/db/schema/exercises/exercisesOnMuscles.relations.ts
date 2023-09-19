import { relations } from "drizzle-orm"

import { exercises } from "./exercises.table"
import { muscles } from "../muscles/schema"
import { exercisesOnMuscles } from "./exercisesOnMuscles.table"

export const exerciseMusclesRelations = relations(exercisesOnMuscles, ({ one }) => ({
  exercise: one(exercises, {
    fields: [exercisesOnMuscles.exerciseId],
    references: [exercises.id]
  }),

  muscle: one(muscles, {
    fields: [exercisesOnMuscles.muscleId],
    references: [muscles.id]
  })
}))