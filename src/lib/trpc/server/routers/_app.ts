import { router } from "../trpc"
import { exercisesRouter } from "./exercises"
import { musclesRouter } from "./muscles"
import { workoutsRouter } from "./workouts"

export const appRouter = router({
  workouts: workoutsRouter,
  exercises: exercisesRouter,
  muscles: musclesRouter
})

export type AppRouter = typeof appRouter
