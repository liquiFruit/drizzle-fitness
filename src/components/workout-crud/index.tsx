"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckSquareIcon, Loader2, Loader2Icon } from "lucide-react"

import { DatePicker } from "@/components/ui/date-picker"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

import { WorkoutSetCrud } from "./set-crud"
import { columns } from "./columns"
import { VCreateWorkout } from "@/lib/repositories/validators"

type TCreateWorkout = typeof VCreateWorkout._type

export function WorkoutCrud({
	initialState,
}: {
	initialState?: TCreateWorkout
}) {
	const router = useRouter()
	const [workout, setWorkout] = useState<TCreateWorkout>({
		userId: "",
		date: new Date(),
		sets: [],
		...initialState,
	})
	const [isPosting, setIsPosting] = useState(false)

	const addSet = (set: TCreateWorkout["sets"][0]) =>
		setWorkout({ ...workout, sets: [...workout.sets, set] })

	const setDate = (date: Date) => setWorkout({ ...workout, date })

	const postWorkout = async () => {
		const { success: isWorkout } = await VCreateWorkout.safeParseAsync(
			workout
		)

		if (!isWorkout) {
			alert("not workout")
			return
		}

		setIsPosting(true)
		const res = await fetch("/api/workouts/create", {
			body: JSON.stringify(workout),
			method: "POST",
		})

		if (res.ok) {
			await router.push("/dashboard")
			await router.refresh()
		} else alert(res.statusText)

		setIsPosting(false)
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
				setDate={(date) => {
					if (date) setDate
				}}
			/>

			{/* Exercise */}
			<h3>Add Exercise Set</h3>
			<WorkoutSetCrud onCreate={addSet} initialState={{}} />

			<h3>Sets</h3>
			<div>
				<DataTable columns={columns} data={workout.sets} />

				<Button
					className="w-full my-8"
					disabled={workout.sets.length === 0 || isPosting}
					onClick={postWorkout}
				>
					{isPosting ? (
						<Loader2Icon className="animate-spin mr-2" />
					) : (
						<CheckSquareIcon className="mr-2" />
					)}
					Create Workout
				</Button>
			</div>
		</section>
	)
}
