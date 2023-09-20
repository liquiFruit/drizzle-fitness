"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Clock3Icon, FlameIcon } from "lucide-react"

import { trpc } from "@/lib/trpc/client/client"
import { getAllWorkoutsByClause } from "@/lib/repositories/workouts/get"
import { humanNumber } from "@/lib/utils"

import { RadialProgress } from "@/components/radial-progress"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { MuscleBadge } from "@/components/muscle-badge"
import { CalorieBadge } from "@/components/calorie-badge"

export default function WorkoutDetailView({
	params: { id },
}: {
	params: { id: string }
}) {
	const { data: workout, isLoading } = trpc.workouts.getWorkoutsById.useQuery(
		+id
	)

	if (isLoading) return <p className="text-center">Loading...</p>
	if (!workout) return <p className="text-center">Workout not found.</p>

	return (
		<main>
			<h1>{workout.date.toDateString()}</h1>

			<div className="flex flex-row flex-wrap gap-2 items-center">
				<CalorieBadge calories={workout.totalCalories} />

				<Badge variant={"secondary"} className="items-center">
					<p>25 min</p>
					<Clock3Icon size={10} className="ml-1 stroke-orange" />
				</Badge>

				{workout.muscles.map((muscle) => (
					<Badge variant={"secondary"}>
						<RadialProgress
							progress={muscle.percentage}
							className="w-3 mr-2"
						/>
						<p>{muscle.name}</p>
					</Badge>
				))}
			</div>

			<div className="mt-8 flex flex-col gap-4">
				{workout.exercises.map(({ exercise, sets }) => (
					<div>
						<p className="">{exercise.name}</p>

						<div className="flex flex-row flex-wrap gap-2 my-1">
							<CalorieBadge
								calories={
									exercise.cpu *
									sets.reduce((p, v) => ({
										...p,
										details: p.details + v.details,
									})).details
								}
							/>

							{exercise.muscles
								.map((muscle) =>
									workout.muscles.find(
										(m) => m.name === muscle.name
									)
								)
								.map((m) =>
									!!m ? <MuscleBadge muscle={m} /> : null
								)}
						</div>

						<DataTable
							showUI={false}
							columns={columns}
							data={sets}
						/>
					</div>
				))}
			</div>
		</main>
	)
}

type TWorkout = Awaited<
	ReturnType<typeof getAllWorkoutsByClause>
>[0]["exercises"][0]["sets"][0]
const columns: ColumnDef<TWorkout>[] = [
	{
		accessorKey: "details",
		header: "Units",
		cell: ({ row: { original: row } }) => {
			return row.details
		},
	},
]
