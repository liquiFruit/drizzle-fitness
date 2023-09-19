import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const muscles = sqliteTable("muscles", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique()
})

export const SelectMuscleSchema = createSelectSchema(muscles)
export const InsertMuscleSchema = createInsertSchema(muscles)