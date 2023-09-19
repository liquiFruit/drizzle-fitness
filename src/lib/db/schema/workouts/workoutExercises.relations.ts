import { relations } from "drizzle-orm"

import { exercises } from "../exercises/exercises.table"
import { workouts } from "./workouts.table"
import { workoutSets } from "./workoutSets.table"
import { workoutExercises } from "./workoutExercises.table"


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