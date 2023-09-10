import { protectedProcedure, router } from "../trpc"
import { getExercises } from "@/lib/repositories/exercises/getExercises"

export const exercisesRouter = router({
  getExercises: protectedProcedure.query(async ({ ctx }) => {
    return getExercises()
  }),
})
