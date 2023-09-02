"use client"

import { memo, useState } from "react"

import { DatePicker } from "@/components/ui/date-picker"
import { ExerciseSetCrud } from "./set-crud"
import { ExerciseSet, Workout } from "@/db"
import { DataTable } from "../ui/data-table"
import { columns } from "./columns"
import { Button } from "../ui/button"
import { CheckSquareIcon } from "lucide-react"

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

	const postWorkout = async () => {
		const res = await fetch("/api/workouts/create", {
			body: JSON.stringify(workout),
			method: "POST",
		})

		console.log(res)
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
				<DataTable columns={columns} data={workout.sets} />

				<Button
					className="w-full my-8"
					disabled={workout.sets.length === 0}
					onClick={postWorkout}
				>
					<CheckSquareIcon className="mr-2" />
					Create Workout
				</Button>
			</div>
		</section>
	)
}
