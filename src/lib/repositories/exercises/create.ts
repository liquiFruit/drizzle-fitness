import { SqliteError } from "better-sqlite3"

import { db } from "@/lib/db"
import { exercisesOnMuscles } from "@/lib/db/schema/exercises/schema"
import { exercises } from "@/lib/db/schema/exercises/schema"

import { VCreateExercise } from "@/lib/repositories/validators"

type Result = "NameExists" | DbResultStatus

export async function createExercises({
  muscles, ...newExercise
}: typeof VCreateExercise._type): Promise<Result> {
  try {
    const { lastInsertRowid: exerciseID } = await db
      .insert(exercises)
      .values(newExercise)

    const { rows } = await db
      .insert(exercisesOnMuscles)
      .values(muscles.map(muscleID => ({
        exerciseId: exerciseID as any as number,
        muscleId: muscleID as number
      })))

    return "Success"
  } catch (error) {
    if (error instanceof SqliteError) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE")
        return "NameExists"
    }

    console.log("error:", error)
    return "InternalError"
  }
}