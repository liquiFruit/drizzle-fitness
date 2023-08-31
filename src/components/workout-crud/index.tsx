"use client"

import { useState } from "react"

import { DatePicker } from "@/components/ui/date-picker"
import { ExerciseSetCrud } from "./set-crud"
import { ExerciseSet } from "@/db"

export function WorkoutCrud() {
	const [sets, setSets] = useState<ExerciseSet[]>([])

	const addSet = (set: ExerciseSet) => {
		setSets([...sets, set])
	}

	return (
		<section>
			{/* Header */}
			<h2>New Workout</h2>

			{/* Date */}
			<h3>Workout Date</h3>
			<DatePicker
				className="w-full"
				date={new Date()}
				setDate={(date) => alert(date)}
			/>

			{/* Exercise */}
			<h3>Add Exercise Set</h3>
			<ExerciseSetCrud
				onCreate={addSet}
				initialState={{
					details: 0,
				}}
			/>

			<h3>Sets</h3>
			<div>
				{sets.map((set, i) => (
					<p key={i}>
						{set.exerciseId} - {set.details}
					</p>
				))}
			</div>
		</section>
	)
}
