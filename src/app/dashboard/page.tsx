import { redirect } from "next/navigation"

import { useServerAuth } from "@/lib/auth/use-server-auth"

import { WorkoutTable } from "@/components/workout-table"

export default async function Dashboard() {
	const session = await useServerAuth()
	if (!session?.user) redirect("/")

	return (
		<main>
			<div>
				<h2 className="border-b-2 border-primary/20">Workouts</h2>
				<WorkoutTable />
			</div>
		</main>
	)
}
