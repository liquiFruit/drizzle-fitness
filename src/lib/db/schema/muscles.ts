import { relations } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { exercisesOnMuscles } from "./exercises/exercisesOnMuscles.schema"
import { workoutsOnMuscles } from "./workouts/workoutsOnMuscles.schema"

export const muscles = sqliteTable("muscles", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique()
})

export const musclesRelations = relations(muscles, ({ many }) => ({
  exercises: many(exercisesOnMuscles),
  workouts: many(workoutsOnMuscles)
}))

export const SelectMuscleSchema = createSelectSchema(muscles)
export const InsertMuscleSchema = createInsertSchema(muscles)