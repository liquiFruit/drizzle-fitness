import { NextResponse } from "next/server"

import { useServerAuth } from "@/lib/auth/use-server-auth"
import { createWorkout } from "@/lib/repositories/createWorkout"
import { VCreateWorkout } from "@/lib/repositories/validators"

const handler = async (req: Request) => {
  // Check user
  const session = await useServerAuth()
  if (!session?.user?.email) return NextResponse.json(null, { status: 401, statusText: "Unauthorized" })

  // Check body
  if (!req.body) return NextResponse.json(null, { status: 400, statusText: "No data provided" })

  // Check data
  const fullWorkout: typeof VCreateWorkout._type = await req.json()
  fullWorkout.date = new Date(fullWorkout.date)
  fullWorkout.userId = session.user.id

  const { success: isWorkout, } = await VCreateWorkout.safeParseAsync(fullWorkout)
  if (!isWorkout)
    return NextResponse.json(null, { status: 400, statusText: "Incorrect data provided" })

  const res = await createWorkout(fullWorkout)
  if (!res) return NextResponse.json({ success: false }, { status: 500, statusText: "Something went wrong." })
  else return NextResponse.json({ success: true })
}

export { handler as POST }