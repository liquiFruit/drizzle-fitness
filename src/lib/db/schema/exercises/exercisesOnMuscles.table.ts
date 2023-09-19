import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core"

import { exercises } from "./exercises.table"
import { muscles } from "../muscles/muscles.table"


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