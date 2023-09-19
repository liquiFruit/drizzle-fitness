import { relations } from "drizzle-orm"

import { muscles } from "./muscles.table"
import { exercisesOnMuscles } from "../exercises/exercisesOnMuscles.table"
import { workoutsOnMuscles } from "../workouts/workoutsOnMuscles.table"

export const musclesRelations = relations(muscles, ({ many }) => ({
  exercises: many(exercisesOnMuscles),
  workouts: many(workoutsOnMuscles)
}))
