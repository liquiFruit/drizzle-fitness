import { relations } from "drizzle-orm"

import { exercisesOnMuscles } from "./exercisesOnMuscles.table"
import { workouts } from "../workouts/workouts.schema"
import { exercises } from "./exercises.table"

export const exerciseRelations = relations(exercises, ({ many }) => ({
  muscles: many(exercisesOnMuscles),
  workouts: many(workouts)
}))