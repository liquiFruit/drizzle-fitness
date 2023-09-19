import { db } from "@/lib/db"

export async function getExercises() {
  return (await db.query.exercises.findMany({
    with: {
      muscles: {
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
    ...v, muscleGroups: v.muscles.map(({ muscle: { id, name } }) => ({
      id, name
    }))
  }))
}


export type TExercise = Awaited<ReturnType<typeof getExercises>>[0]
