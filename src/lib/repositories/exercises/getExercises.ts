import { db } from "@/lib/db"

export async function getExercises() {
  return (await db.query.exercises.findMany({
    with: {
      muscleGroups: {
        columns: {
          exerciseId: false,
          muscleId: false
        },
        with: {
          muscle: true
        }
      }
    }
  })).map(v => ({
    ...v, muscleGroups: v.muscleGroups.map(({ muscle: { id, name } }) => ({
      id, name
    }))
  }))
}


export type TExercise = Awaited<ReturnType<typeof getExercises>>[0]
