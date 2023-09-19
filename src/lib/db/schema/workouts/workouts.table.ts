import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { users } from "../auth"


export const workouts = sqliteTable("workouts", {
  id: integer("id").primaryKey(),
  userId: text("user_id").notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: integer("date", { mode: "timestamp_ms" }).notNull(),
})

export const SelectWorkout = createSelectSchema(workouts)
export const InsertWorkout = createInsertSchema(workouts)
