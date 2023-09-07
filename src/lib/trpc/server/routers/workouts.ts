import { getWorkoutsByUserId } from "@/lib/repositories/getWorkouts"
import { protectedProcedure, router } from "../trpc"
import { VCreateWorkout } from "@/lib/repositories/validators"
import { createWorkout } from "@/lib/repositories/createWorkout"

export const workoutsRouter = router({
  getWorkouts: protectedProcedure.query(async ({ ctx }) => {
    return getWorkoutsByUserId(ctx.session.user.id)
  }),

  createWorkout: protectedProcedure.input(VCreateWorkout).mutation(async ({ ctx, input }) => {
    return createWorkout({ ...input, userId: ctx.session.user.id })
  })
})
