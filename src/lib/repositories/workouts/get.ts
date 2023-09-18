import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { SelectUser } from "@/lib/db/schema/auth"
import { SelectWorkout, workouts } from "@/lib/db/schema/workouts/schema"

export async function getWorkoutsByUserId(
  userId: typeof SelectUser._type["id"]
): Promise<typeof SelectWorkout._type[]> {
  return await db.select().from(workouts).where(eq(workouts.userId, userId))
}