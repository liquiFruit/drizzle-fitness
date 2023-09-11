import { db } from "@/lib/db"
import { exercises } from "@/lib/db/schema/exercises/schema"

export async function getExercises() {
  return await db.select({ id: exercises.id, name: exercises.name }).from(exercises)
}