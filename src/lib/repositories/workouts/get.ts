import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { SelectUser } from "@/lib/db/schema/auth"
import { workouts } from "@/lib/db/schema/workouts/schema"

export async function getWorkoutsByUserId(
  userId: typeof SelectUser._type["id"]
) {
  return (await db.query.workouts.findMany({
    where: eq(workouts.userId, userId),
    with: {
      workoutExercises: {
        columns: {},
        with: {
          exercise: {
            with: {
              muscles: {
                columns: {},
                with: {
                  muscle: true
                }
              }
            }
          },
          workoutSets: true
        }
      },
    }
  })).map(({ workoutExercises, ...workout }) => {
    return {
      ...workout,

      exercises: workoutExercises.map(({ workoutSets, exercise }) => {
        return {
          exercise: {
            ...exercise,
            muscles: exercise.muscles.map(({ muscle }) => muscle)
          },

          sets: workoutSets.map(({ workoutExerciseId: _, ...set }) => {
            return set
          }).sort((a, b) => a.order - b.order)
        }
      })
    }
  }).map(({ exercises, ...workout }) => {
    const caloriesPerMuscle = new Map<string, number>()
    let totalCalories = 0

    exercises.forEach(({ exercise: { muscles, cpu }, sets }) => {
      const totalUnits = sets
        .reduce((pv, v, i, a) => ({ ...v, details: v.details + pv.details }))
        .details

      const calories = totalUnits * cpu
      totalCalories += calories

      muscles.forEach(({ name }) => {
        const previousTotal = caloriesPerMuscle.get(name) ?? 0

        caloriesPerMuscle.set(name,
          previousTotal + calories
        )
      })
    })

    const muscles: { name: string, percentage: number, total: number }[] = []

    caloriesPerMuscle.forEach((value, name) => muscles.push({
      name,
      total: value,
      percentage: value / totalCalories
    }))

    return {
      ...workout,
      exercises,
      muscles
    }
  })
}