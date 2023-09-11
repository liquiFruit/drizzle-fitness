import { db } from "@/lib/db";
import { muscleGroups } from "@/lib/db/schema/exercises/muscleGroups";
import { exercises, type InsertExercise } from "@/lib/db/schema/exercises/schema";

export async function createExercises({ muscleGroups: exerciseMuscles, ...newExercise }: typeof InsertExercise._type) {
  try {
    const { lastInsertRowid: exerciseID } = await db.insert(exercises).values(newExercise)
    const { changes } = await db.insert(muscleGroups).values(exerciseMuscles.map((muscleID) => ({
      exerciseId: exerciseID as number,
      muscleId: muscleID
    })))

    return (changes === exerciseMuscles.length)
  } catch (error) {
    console.log(error)
    return false
  }
}