import { getWorkoutsByUserEmail } from "@/lib/db/getWorkouts"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

export async function WorkoutTable() {
	const workouts = await getWorkoutsByUserEmail("johnrprutton@gmail.com")

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={workouts} />
		</div>
	)
}
