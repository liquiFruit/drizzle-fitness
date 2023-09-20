"use client"
import { RadialProgress } from "@/components/radial-progress"
import { Badge } from "@/components/ui/badge"
import { getAllWorkoutsByClause } from "@/lib/repositories/workouts/get"

type TMuscle = Awaited<
	ReturnType<typeof getAllWorkoutsByClause>
>[0]["muscles"][0]
export function MuscleBadge({ muscle }: { muscle: TMuscle }) {
	return (
		<Badge variant={"secondary"}>
			<RadialProgress progress={muscle.percentage} className="w-3 mr-2" />
			<p>{muscle.name}</p>
		</Badge>
	)
}
