import { InsertWorkoutSet } from "@/db"
import * as z from "zod"

export interface CRUDWorkoutSet {
  workoutExerciseId: string;
  order: number;
  details: number;
}
export interface InsertFullWorkout {
  date: number
  sets: CRUDWorkoutSet[]
}

export const InsertWorkoutSetValidator = z.object({
  workoutExerciseId: z.string(),
  order: z.union([z.number().int().positive(), z.nan()]),
  details: z.number({ invalid_type_error: "Required" }).positive(),
}) as z.ZodType<CRUDWorkoutSet>


export const FullWorkoutValidator = z.object({
  date: z.number().int().nonnegative(),
  sets: z.array(InsertWorkoutSetValidator)
}) as z.ZodType<InsertFullWorkout>
