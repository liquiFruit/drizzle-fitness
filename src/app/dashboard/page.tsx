import { redirect } from "next/navigation"
import { useServerAuth } from "@/lib/auth/use-server-auth"
import { DatePicker } from "@/components/ui/date-picker"
import { WorkoutCrud } from "@/components/workout-crud"

export default async function Dashboard() {
	const session = await useServerAuth()
	if (!session?.user) redirect("/")

	return (
		<main>
			<section>
				<WorkoutCrud />
			</section>
		</main>
	)
}
