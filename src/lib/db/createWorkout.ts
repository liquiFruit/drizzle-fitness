import { db, users, workouts } from "@/db"
import { FullWorkout } from "@/lib/validators/workout"
import { eq } from "drizzle-orm"

export async function createWorkout(userEmail: string, workout: FullWorkout) {
  const userId = (await db.query.users.findFirst({
    where: eq(users.email, userEmail),
  }))!.id

  const res = await db
    .insert(workouts)
    .values({
      date: workout.date.getMilliseconds(),
      userId,
      id: ""
    }).returning()

}

