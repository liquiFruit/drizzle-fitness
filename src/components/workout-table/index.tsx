"use client"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "../ui/button"
import { PlusSquareIcon } from "lucide-react"
import Link from "next/link"
import { trpc } from "@/lib/trpc/client/client"

export function WorkoutTable() {
	const {
		data: workouts,
		isLoading,
		isError,
		error,
	} = trpc.workouts.getWorkoutsByUser.useQuery()

	return (
		<div>
			<h1>All Workouts</h1>
			{isLoading ? (
				"Loading..."
			) : isError ? (
				error.message
			) : (
				<DataTable columns={columns} data={workouts ?? []} />
			)}

			<Link href={"/workouts/create"}>
				<Button variant={"secondary"} className="w-full mt-8">
					<PlusSquareIcon className="mr-2" />
					Create new workout
				</Button>
			</Link>
		</div>
	)
}
