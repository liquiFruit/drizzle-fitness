import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from "@libsql/client"

import * as AuthSchema from "./schema/auth"
import * as MuscleSchema from "./schema/muscles/schema"
import * as ExerciseSchema from "./schema/exercises/schema"
import * as WorkoutSchema from "./schema/workouts/schema"

const sqlite = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
})

export const db = drizzle(sqlite, {
  schema: {
    ...AuthSchema,
    ...MuscleSchema,
    ...ExerciseSchema,
    ...WorkoutSchema
  }
})