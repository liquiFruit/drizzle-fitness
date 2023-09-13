import { exerciseColumns } from "@/components/exercises/columns"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { getExercises } from "@/lib/repositories/exercises/getExercises"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default async function ExercisePage() {
	const exercises = await getExercises()
	return (
		<main>
			<Link href={"/exercises/create"}>
				<Button className="float-right">
					Create
					<PlusIcon size={16} className="ml-2" />
				</Button>
			</Link>
			<h1 className="w-fit">All Exercises</h1>
			<DataTable columns={exerciseColumns} data={exercises} />
		</main>
	)
}
