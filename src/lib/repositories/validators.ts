import { InsertWorkout, InsertWorkoutSet } from "@/lib/db/schema/workouts";

export const VCreateWorkout = InsertWorkout.extend({
  sets: InsertWorkoutSet.array()
})