import { ExerciseSet } from "@/db"
import * as z from "zod"

export interface FullWorkout {
  date: Date
  sets: ExerciseSet[]
}
export const FullWorkoutValidator = z.object({
  date: z.date(),
  sets: (z.object({
    exerciseId: z.string().min(1, "Exercise type is required."),

    order: z.union([z.number().int().positive(), z.nan()]).optional(),

    details: z.number({ invalid_type_error: "Required" }).positive(),
  }) as z.ZodType<ExerciseSet>).array()
}) as z.ZodType<FullWorkout>