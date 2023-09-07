import { getWorkoutsByUserId } from "@/lib/repositories/getWorkouts"
import { protectedProcedure, router } from "../trpc"

export const workoutsRouter = router({
  getComputers: protectedProcedure.query(async ({ ctx }) => {
    return getWorkoutsByUserId(ctx.session.user.id)
  }),
})
