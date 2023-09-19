import { relations } from "drizzle-orm"

import { workoutExercises } from "./workoutExercises.table"
import { workoutSets } from "./workoutSets.table"

export const workoutSetsRelations = relations(workoutSets, ({ one, many }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [workoutSets.workoutExerciseId],
    references: [workoutExercises.id]
  })
}))