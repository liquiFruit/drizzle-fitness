"use client"

import { memo, useState } from "react"

import { DatePicker } from "@/components/ui/date-picker"
import { ExerciseSetCrud } from "./set-crud"
import { ExerciseSet, Workout } from "@/db"

interface FullWorkout {
	date: Date
	sets: ExerciseSet[]
}

type WorkoutCrudProps = {
	initialState?: Partial<FullWorkout>
}
export function WorkoutCrud({ initialState }: WorkoutCrudProps) {
	// todo: check preformance by printing "rendering" for every set in sets
	const [workout, setWorkout] = useState<FullWorkout>({
		date: new Date(),
		sets: [],
		...initialState,
	})

	const addSet = (set: ExerciseSet) =>
		setWorkout({ ...workout, sets: [...workout.sets, set] })

	const setDate = (date: Date | undefined) => {
		if (date) setWorkout({ ...workout, date })
	}

	return (
		<section>
			{/* Header */}
			<h2>New Workout</h2>

			{/* Date */}
			<h3>Workout Date</h3>
			<DatePicker
				className="w-full"
				date={workout.date}
				setDate={setDate}
			/>

			{/* Exercise */}
			<h3>Add Exercise Set</h3>
			<ExerciseSetCrud onCreate={addSet} initialState={{}} />

			<h3>Sets</h3>
			<div>
				{workout.sets.map((set, i) => (
					<Set key={i} set={set} />
				))}
			</div>
		</section>
	)
}

const Set = memo(({ set }: { set: ExerciseSet }) => {
	console.log("rendering " + set.details)

	return (
		<p>
			{set.exerciseId} - {set.details}
		</p>
	)
})
