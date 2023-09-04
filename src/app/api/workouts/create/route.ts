import { useServerAuth } from "@/lib/auth/use-server-auth"
import { createWorkout } from "@/lib/db/createWorkout"
import { FullWorkoutValidator } from "@/lib/validators/workout"
import { NextResponse } from "next/server"

const handler = async (req: Request) => {
  // Check user
  const session = await useServerAuth()
  if (!session?.user?.email) return NextResponse.json(null, { status: 401, statusText: "Unauthorized" })

  // Check body
  if (!req.body) return NextResponse.json(null, { status: 400, statusText: "No data provided" })

  // Check data
  const workout = await req.json()

  const isWorkout = (await FullWorkoutValidator.safeParseAsync(workout)).success
  if (!isWorkout)
    return NextResponse.json(null, { status: 400, statusText: "Incorrect data provided" })

  await createWorkout(session.user.email, workout)
  return NextResponse.json({ success: true })
}

export { handler as POST }