import {
  integer,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey(),
  name: text("name"),
})

export const SelectExercise = createSelectSchema(exercises)
export const InsertExercise = createInsertSchema(exercises)