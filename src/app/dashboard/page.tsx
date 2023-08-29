import { useServerAuth } from "@/lib/auth/use-server-auth"
import { getWorkoutsByUserEmail } from "@/lib/db/getWorkouts"
import { fuzyTime } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function Dashboard() {
	const session = await useServerAuth()
	if (!session?.user) redirect("/")

	const userWorkouts = (await getWorkoutsByUserEmail(session.user.email!))! // auth check, so its guaranteed

	return (
		<main>
			<div>
				<h2 className="border-b-2 border-primary/20">Workouts</h2>
				{userWorkouts.workouts ? (
					userWorkouts.workouts.map(({ id, date }) => (
						<div key={id}>{fuzyTime(date)}</div>
					))
				) : (
					<p>Nothing to show yet.</p>
				)}
			</div>
		</main>
	)
}
