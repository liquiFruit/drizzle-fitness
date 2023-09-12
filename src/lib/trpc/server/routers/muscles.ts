import { getAllMuscles } from "@/lib/repositories/muscles/get"
import { protectedProcedure, router } from "../trpc"

export const musclesRouter = router({
  getMuscles: protectedProcedure.query(async ({ ctx }) => {
    return await getAllMuscles()
  }),
})
