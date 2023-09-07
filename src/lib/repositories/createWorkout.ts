import { db } from "@/lib/db/index"
import {
  workouts,
  SelectWorkout, workoutExercises,
  workoutSets
} from "@/lib/db/schema/workouts"
import { VCreateWorkout } from "./validators"


export async function createWorkout(
  workout: typeof VCreateWorkout._type
): Promise<typeof SelectWorkout._type | null> {
  try {
    // Extract exercises: map from exercise_id to workout_exercise_id (zero for now)
    const exercises = new Map<number, number>()
    workout.sets.forEach((set, i) => { exercises.set(set.workoutExerciseId, 0) })

    // Start transaction
    // Insert workout
    const [insertedWorkout] = await db.insert(workouts).values(workout).returning()

    // Insert workout exercises for the current workout
    const insertedWorkoutExercises = await db
      .insert(workoutExercises)
      .values(
        [...exercises.keys()].map((exercise) => ({
          exerciseId: exercise,
          workoutId: insertedWorkout.id,
        }))
      ).returning()

    // Possible unit test? Check that exercises.size() === insertedWorkoutExercises.length
    // Infer workout exercise IDs
    insertedWorkoutExercises.forEach((insertedExercise, i) => {
      exercises.set(insertedExercise.exerciseId, insertedExercise.id)
    })

    // Insert workout sets
    const insertedSets = await db
      .insert(workoutSets)
      .values(workout.sets.map((set) => {
        return {
          ...set,
          workoutExerciseId: exercises.get(set.workoutExerciseId)!
        }
      }))
      .returning()

    return insertedWorkout
  } catch (error) {
    console.log(error)
    return null
  }
}

