import {
  integer,
  real,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"


export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
  cpu: real("calories_per_unit").notNull(),
  unit: text("unit").notNull()
})

export const SelectExercise = createSelectSchema(exercises)
export const InsertExercise = createInsertSchema(exercises)