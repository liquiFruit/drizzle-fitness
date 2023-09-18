import { relations } from "drizzle-orm"
import {
  integer,
  real,
  sqliteTable,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { workoutExercises } from "./workoutExercises.schema"


export const workoutSets = sqliteTable("workout_sets", {
  id: integer("id").primaryKey(),
  workoutExerciseId: integer("workout_exercise").notNull(),
  order: integer("order_in_workout").notNull(),
  details: real("exercise_details").notNull()
})

export const SelectWorkoutSet = createSelectSchema(workoutSets)
export const InsertWorkoutSet = createInsertSchema(workoutSets)

export const exerciseSetsRelations = relations(workoutSets, ({ one, many }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [workoutSets.workoutExerciseId],
    references: [workoutExercises.id]
  })
}))