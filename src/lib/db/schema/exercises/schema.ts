import { relations } from "drizzle-orm"
import {
  integer,
  real,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { exerciseMuscles } from "./muscleGroups"

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  cpu: real("calories_per_unit").notNull(),
  unit: text("unit").notNull()
})

export const exerciseRelations = relations(exercises, ({ many }) => ({
  muscleGroups: many(exerciseMuscles),
}))

export const SelectExercise = createSelectSchema(exercises)
export const InsertExercise = createInsertSchema(exercises)