import { db } from "@/lib/db"

export async function getExercises() {
  const exercises = await db.query.exercises.findMany({
    with: {
      exerciseMuscles: {
        columns: {
          exerciseId: false,
          muscleId: false
        },
        with: {
          muscle: true
        }
      }
    }
  })

  return exercises.map(v => ({
    ...v, muscleGroups: v.exerciseMuscles.map(({ muscle: { id, name } }) => ({
      id, name
    }))
  }))
}


export type TExercise = Awaited<ReturnType<typeof getExercises>>[0]
