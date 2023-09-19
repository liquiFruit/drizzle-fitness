import { relations } from "drizzle-orm"

import { exercisesOnMuscles } from "./exercisesOnMuscles.table"
import { exercises } from "./exercises.table"
import { workoutExercises } from "../workouts/workoutExercises.table"

export const exerciseRelations = relations(exercises, ({ many }) => ({
  muscles: many(exercisesOnMuscles),
  workoutExercises: many(workoutExercises)
}))