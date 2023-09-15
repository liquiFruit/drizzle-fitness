import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import * as AuthSchema from "./schema/auth"
import * as MuscleSchema from "./schema/muscles"
import * as ExerciseSchema from "./schema/exercises/schema"
import * as ExerciseMusclesSchema from "./schema/exercises/muscleGroups"
import * as WorkoutSchema from "./schema/workouts"

const sqlite = new Database(process.env.DB_URL!)
export const db = drizzle(sqlite, {
  schema: {
    ...AuthSchema,
    ...MuscleSchema,
    ...ExerciseSchema,
    ...ExerciseMusclesSchema,
    ...WorkoutSchema
  }
})
