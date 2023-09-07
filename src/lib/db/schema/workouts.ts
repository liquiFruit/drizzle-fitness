import { relations } from "drizzle-orm"
import {
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { users } from "./auth"



export const workouts = sqliteTable("workouts", {
  id: integer("id").primaryKey(),
  userId: text("user_id").notNull(),
  date: integer("date", { mode: "timestamp_ms" }).notNull(),
})

export const SelectWorkout = createSelectSchema(workouts)
export const InsertWorkout = createInsertSchema(workouts)

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  users: one(users, {
    fields: [workouts.userId],
    references: [users.id]
  }),

  workoutExercises: many(workoutExercises)
}))



export const workoutExercises = sqliteTable("workout_exercises", {
  id: integer("id").primaryKey(),
  workoutId: integer("workout_id").notNull(),
  exerciseId: integer("exercise_id").notNull()
})

export const SelectWorkoutExercise = createSelectSchema(workoutExercises)
export const InsertWorkoutExercise = createInsertSchema(workoutExercises)

export const workoutExercisesRelations = relations(workoutExercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),

  workoutSets: many(workoutSets)
}))



export const workoutSets = sqliteTable("workout_sets", {
  id: integer("id").primaryKey(),
  workoutExerciseId: integer("workout_exercise").notNull(),
  order: integer("order_in_workout").notNull(), //$defaultFn(() => Date.now()),
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


