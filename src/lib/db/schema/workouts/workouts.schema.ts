import { relations } from "drizzle-orm"
import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { users } from "@/lib/db/schema/auth"
import { workoutExercises } from "./workoutExercises.schema"
import { workoutsOnMuscles } from "./workoutsOnMuscles.schema"


export const workouts = sqliteTable("workouts", {
  id: integer("id").primaryKey(),
  userId: text("user_id").notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: integer("date", { mode: "timestamp_ms" }).notNull(),
})

export const SelectWorkout = createSelectSchema(workouts)
export const InsertWorkout = createInsertSchema(workouts)

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  users: one(users, {
    fields: [workouts.userId],
    references: [users.id]
  }),

  workoutExercises: many(workoutExercises),

  workoutMuscles: many(workoutsOnMuscles)
}))