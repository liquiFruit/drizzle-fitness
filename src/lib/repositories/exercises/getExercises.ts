import { db } from "@/lib/db"
import { exercises } from "@/lib/db/schema/exercises"

export async function getExercises() {
  return await db.select().from(exercises)
}