import {
  integer,
  real,
  sqliteTable,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"


export const workoutSets = sqliteTable("workout_sets", {
  id: integer("id").primaryKey(),
  workoutExerciseId: integer("workout_exercise").notNull(),
  order: integer("order_in_workout").notNull(),
  details: real("exercise_details").notNull()
})

export const SelectWorkoutSet = createSelectSchema(workoutSets)
export const InsertWorkoutSet = createInsertSchema(workoutSets)
