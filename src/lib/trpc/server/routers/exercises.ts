import { protectedProcedure, router } from "../trpc"
import { getExercises } from "@/lib/repositories/exercises/getExercises"
import { createExercises } from "@/lib/repositories/exercises/createExercises"
import { VCreateExercise } from "@/lib/repositories/validators"

export const exercisesRouter = router({
  getExercises: protectedProcedure.query(
    async () => await getExercises()
  ),

  createExercise: protectedProcedure
    .input(VCreateExercise)
    .mutation(
      async ({ ctx: _ctx, input }) => await createExercises(input)
    )
})
