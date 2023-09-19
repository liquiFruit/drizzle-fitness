import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import * as AuthSchema from "./schema/auth"
import * as MuscleSchema from "./schema/muscles/schema"
import * as ExerciseSchema from "./schema/exercises/schema"
import * as WorkoutSchema from "./schema/workouts/schema"

const sqlite = new Database(process.env.DB_URL!)
export const db = drizzle(sqlite, {
  schema: {
    ...AuthSchema,
    ...MuscleSchema,
    ...ExerciseSchema,
    ...WorkoutSchema
  }
})
