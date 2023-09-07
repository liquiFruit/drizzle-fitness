import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import * as AuthSchema from "./schema/auth"
import * as ExerciseSchema from "./schema/exercises"
import * as WorkoutSchema from "./schema/workouts"

const sqlite = new Database(process.env.DB_URL!)
export const db: BetterSQLite3Database<
  typeof AuthSchema
  & typeof ExerciseSchema
  & typeof WorkoutSchema
> = drizzle(sqlite)
