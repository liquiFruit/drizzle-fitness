import { InsertWorkoutSet, db, users, workoutExercises, workoutSets, workouts } from "@/db"
import { InsertFullWorkout } from "@/lib/validators/workout"
import { eq } from "drizzle-orm"

export async function createWorkout(userEmail: string, workout: InsertFullWorkout) {
  // Check auth
  const userId = (await db.query.users.findFirst({
    where: eq(users.email, userEmail),
  }))!.id

  // Start transaction

  // Insert workout
  const [{ id: workoutId }] = await db
    .insert(workouts)
    .values({
      date: workout.date,
      userId,
    }).returning()

  // Extract exercises: map from exercise_id to workout_exercise_id (zero for now)
  const exercises = new Map<string, number>()
  workout.sets.forEach((set, i) => { exercises.set(set.workoutExerciseId, 0) })

  // Insert workout exercises for the current workout
  const insertedWorkoutExercises = await db
    .insert(workoutExercises)
    .values(
      [...exercises.keys()].map((exercise, i) => ({
        exerciseId: exercise,
        workoutId,
      }))
    ).returning()

  // Possible unit test? Check that exercises.size() === insertedWorkoutExercises.length

  // Infer workout exercise IDs
  insertedWorkoutExercises.forEach((row, i) => {
    exercises.set(row.exerciseId, row.id)
  })
  console.log(exercises)

  // Insert workout sets
  const insertedSets = await db
    .insert(workoutSets)
    .values(workout.sets.map((set, i) => {
      return {
        ...set,
        workoutExerciseId: exercises.get(set.workoutExerciseId)!
      }
    }))
    .returning()

  return (insertedSets.length === workout.sets.length)
}

