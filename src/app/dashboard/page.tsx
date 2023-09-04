import { redirect } from "next/navigation"
import { useServerAuth } from "@/lib/auth/use-server-auth"
import { WorkoutTable } from "@/components/workout-table"

export default async function Dashboard() {
	const session = await useServerAuth()
	if (!session?.user) redirect("/")

	return (
		<main>
			<WorkoutTable />
		</main>
	)
}
