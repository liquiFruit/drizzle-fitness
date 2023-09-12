import { db } from "@/lib/db";
import { muscleGroups } from "@/lib/db/schema/exercises/muscleGroups";
import { exercises, type InsertExercise } from "@/lib/db/schema/exercises/schema";
import { eq } from "drizzle-orm";

type ResultStatus = "Success" | "NameExists" | "InternalError"

export async function createExercises({ muscleGroups: exerciseMuscles, ...newExercise }: typeof InsertExercise._type): Promise<ResultStatus> {
  try {
    // Check
    const matches = await db
      .select({ id: exercises.id })
      .from(exercises).where(eq(exercises.name, newExercise.name))

    if (matches.length !== 0) return "NameExists"

    const { lastInsertRowid: exerciseID } = await db.insert(exercises).values(newExercise)
    const { changes } = await db.insert(muscleGroups).values(exerciseMuscles.map((muscleID) => ({
      exerciseId: exerciseID as number,
      muscleId: muscleID
    })))

    return "Success"
  } catch (error) {
    console.log(error)
    return "InternalError"
  }
}