import { redirect } from "next/navigation"
import { useServerAuth } from "@/lib/auth/use-server-auth"
import { WorkoutCrud } from "@/components/workout-crud"
import { WorkoutTable } from "@/components/workout-table"

export default async function Dashboard() {
	const session = await useServerAuth()
	if (!session?.user) redirect("/")

	return (
		<main>
			<WorkoutCrud />
			<WorkoutTable />
		</main>
	)
}
