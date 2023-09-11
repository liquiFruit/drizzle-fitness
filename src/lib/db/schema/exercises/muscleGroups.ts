import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"
// import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { exercises } from "./schema"
import { muscles } from "../muscles"

export const muscleGroups = sqliteTable("exercise_muscle_groups", {
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id),
  muscleId: integer("muscle_id").notNull().references(() => muscles.id),
}, (t) => ({
  pk: primaryKey(t.exerciseId, t.muscleId)
}))

// export const MuscleSchema = createSelectSchema(muscleGroups)
// export const InsertMuscleSchema = createInsertSchema(muscleGroups)