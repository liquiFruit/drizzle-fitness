import { getAllMuscles } from "@/lib/repositories/muscles/get"
import { protectedProcedure, router } from "../trpc"
import { InsertMuscleSchema } from "@/lib/db/schema/muscles/schema"
import { createMuscleGroup } from "@/lib/repositories/muscles/create"

export const musclesRouter = router({
  getMuscles: protectedProcedure.query(async ({ ctx }) => {
    return await getAllMuscles()
  }),
  createMuscle: protectedProcedure.input(InsertMuscleSchema).mutation(async ({ ctx, input }) => {
    return await createMuscleGroup(input)
  })
})
