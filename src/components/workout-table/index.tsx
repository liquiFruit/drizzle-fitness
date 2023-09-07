import { getWorkoutsByUserId } from "@/lib/repositories/getWorkouts"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "../ui/button"
import { PlusSquareIcon } from "lucide-react"
import Link from "next/link"
import { useServerAuth } from "@/lib/auth/use-server-auth"

export async function WorkoutTable() {
	const session = await useServerAuth()
	const workouts = await getWorkoutsByUserId(session?.user.id!)

	return (
		<div className="container mx-auto py-10">
			<h1>All Workouts</h1>
			<DataTable columns={columns} data={workouts} />

			<Link href={"/workouts/create"}>
				<Button variant={"secondary"} className="w-full mt-8">
					<PlusSquareIcon className="mr-2" />
					Create new workout
				</Button>
			</Link>
		</div>
	)
}
