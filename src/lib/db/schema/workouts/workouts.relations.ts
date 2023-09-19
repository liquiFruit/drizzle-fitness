import { relations } from "drizzle-orm"

import { workouts } from "./workouts.table"
import { workoutExercises } from "./workoutExercises.table"
import { workoutsOnMuscles } from "./workoutsOnMuscles.table"
import { users } from "../auth"

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  users: one(users, {
    fields: [workouts.userId],
    references: [users.id]
  }),

  workoutExercises: many(workoutExercises),

  workoutMuscles: many(workoutsOnMuscles)
}))