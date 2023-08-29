import { eq } from "drizzle-orm"

import { User, Workout, db, users } from "@/db"


export async function getWorkoutsByUserEmail(email: User["email"]): Promise<Workout[]> {
  const data = await db.query.users.findFirst({
    where: eq(users.email, email), with: {
      workouts: {
        columns: { id: true, date: true }
      }
    }
  })

  if (!data) return []

  return data.workouts
}