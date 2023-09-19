import { z } from "zod"
import { InsertWorkout, InsertWorkoutSet } from "@/lib/db/schema/workouts/schema"
import { InsertExercise } from "../db/schema/exercises/schema"

export const VCreateWorkout = InsertWorkout.extend({
  sets: InsertWorkoutSet.array()
})

export const VCreateExercise = InsertExercise.extend({
  muscles: z.number().int().array()
})