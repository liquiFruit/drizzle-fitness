import { db } from "@/lib/db";
import { exerciseMuscles } from "@/lib/db/schema/exercises/muscleGroups";
import { exercises, type InsertExercise } from "@/lib/db/schema/exercises/schema";
import { eq } from "drizzle-orm";

type Result = "NameExists" | DbResultStatus

export async function createExercises({ muscleGroups: muscles, ...newExercise }: typeof InsertExercise._type): Promise<Result> {
  try {
    // Check
    const matches = await db
      .select({ id: exercises.id })
      .from(exercises).where(eq(exercises.name, newExercise.name))

    if (matches.length !== 0) return "NameExists"

    const { lastInsertRowid: exerciseID } = await db.insert(exercises).values(newExercise)
    const { changes } = await db.insert(exerciseMuscles).values(muscles.map((muscleID) => ({
      exerciseId: exerciseID as number,
      muscleId: muscleID
    })))

    return "Success"
  } catch (error) {
    console.log(error)
    return "InternalError"
  }
}