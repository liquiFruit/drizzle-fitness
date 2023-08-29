import { eq } from "drizzle-orm"

import { User, db, users, workouts } from "@/db"


export async function getWorkoutsByUserEmail(email: User["email"]) {
  return await db.query.users.findFirst({
    where: eq(users.email, email), with: {
      workouts: {
        columns: { id: true, date: true }
      }
    }
  })
}