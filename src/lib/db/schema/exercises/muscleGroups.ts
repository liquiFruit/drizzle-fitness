import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"
import { exercises } from "./schema"
import { muscles } from "../muscles"

export const exerciseMuscles = sqliteTable("exercise_muscles", {
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  muscleId: integer("muscle_id").notNull().references(() => muscles.id),
}, (t) => ({
  pk: primaryKey(t.exerciseId, t.muscleId)
}))

export const exerciseMusclesRelations = relations(exerciseMuscles, ({ one }) => ({
  exercise: one(exercises, {
    fields: [exerciseMuscles.exerciseId],
    references: [exercises.id]
  }),

  muscle: one(muscles, {
    fields: [exerciseMuscles.muscleId],
    references: [muscles.id]
  })
}))