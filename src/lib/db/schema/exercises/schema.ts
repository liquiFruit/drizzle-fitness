import {
  integer,
  real,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { z } from "zod"

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  cpr: real("calories_per_rep").notNull(),
  unit: text("unit").notNull()
})

export const SelectExercise = createSelectSchema(exercises)
export const InsertExercise = createInsertSchema(exercises).extend({
  muscleGroups: z.number().int().array().min(1, "Exercise requires at least one muscle group.")
})