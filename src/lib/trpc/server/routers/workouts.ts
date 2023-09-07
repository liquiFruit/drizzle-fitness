import { getWorkoutsByUserId } from "@/lib/repositories/getWorkouts"
import { protectedProcedure, router } from "../trpc"

export const workoutsRouter = router({
  getWorkouts: protectedProcedure.query(async ({ ctx }) => {
    return getWorkoutsByUserId(ctx.session.user.id)
  }),
})
