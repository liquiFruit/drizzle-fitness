import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

import { exercises } from "./exercises.schema"
import { muscles } from "../muscles"


export const exercisesOnMuscles = sqliteTable("exercise_on_muscles",
  {
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),

    muscleId: integer("muscle_id")
      .notNull()
      .references(() => muscles.id, { onDelete: "cascade" }),
  },

  (t) => ({
    pk: primaryKey(t.exerciseId, t.muscleId)
  })
)

export const exerciseMusclesRelations = relations(exercisesOnMuscles, ({ one }) => ({
  exercise: one(exercises, {
    fields: [exercisesOnMuscles.exerciseId],
    references: [exercises.id]
  }),

  muscle: one(muscles, {
    fields: [exercisesOnMuscles.muscleId],
    references: [muscles.id]
  })
}))