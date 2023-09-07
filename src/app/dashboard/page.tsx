import { redirect } from "next/navigation"
import { getUserAuth } from "@/lib/auth/utils"
import { WorkoutTable } from "@/components/workout-table"

export default async function Dashboard() {
	const { session } = await getUserAuth()
	if (!session?.user) redirect("/")
	return (
		<main>
			<WorkoutTable />
		</main>
	)
}
