import { InsertExercise } from "@/lib/db/schema/exercises/schema"
import { protectedProcedure, router } from "../trpc"
import { getExercises } from "@/lib/repositories/exercises/getExercises"
import { createExercises } from "@/lib/repositories/exercises/createExercises"

export const exercisesRouter = router({
  getExercises: protectedProcedure.query(async ({ ctx }) => {
    return await getExercises()
  }),
  createExercise: protectedProcedure.input(InsertExercise).mutation(async ({ ctx, input }) => {
    return await createExercises(input)
  })
})
