import { protectedProcedure, router } from "../trpc"

import { createWorkout, getWorkoutsByUserId } from "@/lib/repositories/workouts/controller"
import { VCreateWorkout } from "@/lib/repositories/validators"


export const workoutsRouter = router({
  getWorkouts: protectedProcedure.query(async ({ ctx }) => {
    return getWorkoutsByUserId(ctx.session.user.id)
  }),

  createWorkout: protectedProcedure.input(VCreateWorkout).mutation(async ({ ctx, input }) => {
    return createWorkout({ ...input, userId: ctx.session.user.id })
  })
})
