import { protectedProcedure, router } from "../trpc"

import { createWorkout, getAllWorkoutsByClause } from "@/lib/repositories/workouts/controller"
import { VCreateWorkout } from "@/lib/repositories/validators"
import { and, eq } from "drizzle-orm"
import { workouts } from "@/lib/db/schema/workouts/workouts.table"
import { z } from "zod"


export const workoutsRouter = router({
  getWorkoutsByUser: protectedProcedure.query(async ({ ctx }) => {
    return getAllWorkoutsByClause(eq(workouts.userId, ctx.session.user.id))
  }),

  getWorkoutsById: protectedProcedure.input(z.number()).query(async ({ ctx, input: id }) => {
    return (await getAllWorkoutsByClause(and(
      eq(workouts.userId, ctx.session.user.id),
      eq(workouts.id, id)
    )))[0] ?? null
  }),

  createWorkout: protectedProcedure.input(VCreateWorkout).mutation(async ({ ctx, input }) => {
    return createWorkout({ ...input, userId: ctx.session.user.id })
  })
})
