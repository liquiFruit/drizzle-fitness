import { router } from "../trpc"
import { exercisesRouter } from "./exercises"
import { workoutsRouter } from "./workouts"

export const appRouter = router({
  workouts: workoutsRouter,
  exercises: exercisesRouter
})

export type AppRouter = typeof appRouter
