"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckSquareIcon, Loader2Icon } from "lucide-react"

import { DatePicker } from "@/components/ui/date-picker"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

import { WorkoutSetCrud } from "./set-crud"
import { columns } from "./columns"
import { VCreateWorkout } from "@/lib/repositories/validators"
import { trpc } from "@/lib/trpc/client/client"

type TCreateWorkout = typeof VCreateWorkout._type

export function WorkoutCrud({
	initialState,
}: {
	initialState?: TCreateWorkout
}) {
	const { mutateAsync: postWorkout, isLoading: isPosting } =
		trpc.workouts.createWorkout.useMutation()
	const router = useRouter()
	const [workout, setWorkout] = useState<TCreateWorkout>({
		userId: "",
		date: new Date(),
		sets: [],
		...initialState,
	})

	const addSet = (set: TCreateWorkout["sets"][0]) =>
		setWorkout({ ...workout, sets: [...workout.sets, set] })

	const setDate = (date: Date) => setWorkout({ ...workout, date })

	const createWorkout = async () => {
		await postWorkout(workout, {
			async onSettled(data, error, variables, context) {
				alert("posted")
				if (error) alert(error.message)
				else {
					await router.push("/dashboard")
				}
			},
		})
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
					onClick={createWorkout}
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
