"use client"

import { memo, useState } from "react"

import { DatePicker } from "@/components/ui/date-picker"
import { WorkoutSetCrud } from "./set-crud"
import { WorkoutSet } from "@/db"
import { DataTable } from "../ui/data-table"
import { columns } from "./columns"
import { Button } from "../ui/button"
import { CheckSquareIcon } from "lucide-react"
import { CRUDWorkoutSet, InsertFullWorkout } from "@/lib/validators/workout"
import { revalidatePath } from "next/cache"
import { redirect, useRouter } from "next/navigation"

interface FullWorkout {
	date: number
	sets: WorkoutSet[]
}

type WorkoutCrudProps = {
	initialState?: Partial<InsertFullWorkout>
}
export function WorkoutCrud({ initialState }: WorkoutCrudProps) {
	// todo: check preformance by printing "rendering" for every set in sets
	const [workout, setWorkout] = useState<InsertFullWorkout>({
		date: Date.now(),
		sets: [],
		...initialState,
	})

	const router = useRouter()

	const addSet = (set: CRUDWorkoutSet) =>
		setWorkout({ ...workout, sets: [...workout.sets, set] })

	const setDate = (date: Date | undefined) => {
		if (date) setWorkout({ ...workout, date: date.getTime() })
	}

	const postWorkout = async () => {
		const res = await fetch("/api/workouts/create", {
			body: JSON.stringify(workout),
			method: "POST",
		})

		if (res.ok) {
			await router.push("/dashboard")
			await router.refresh()
		}
	}

	return (
		<section>
			{/* Header */}
			<h2>New Workout</h2>

			{/* Date */}
			<h3>Workout Date</h3>
			<DatePicker
				className="w-full"
				date={new Date(workout.date)}
				setDate={setDate}
			/>

			{/* Exercise */}
			<h3>Add Exercise Set</h3>
			<WorkoutSetCrud onCreate={addSet} initialState={{}} />

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
