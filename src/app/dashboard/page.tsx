import { redirect } from "next/navigation"
import { useServerAuth } from "@/lib/auth/use-server-auth"
import { DatePicker } from "@/components/ui/date-picker"

export default async function Dashboard() {
	const session = await useServerAuth()
	if (!session?.user) redirect("/")

	return (
		<main>
			<section>
				<div className="flex flex-row justify-between items-center">
					<h3>New Workout</h3>
					<DatePicker />
				</div>

				<div className="border border-border">Add Exercise</div>
			</section>
		</main>
	)
}
