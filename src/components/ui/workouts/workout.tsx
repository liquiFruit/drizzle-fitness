import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import type { Workout } from "@/db"
import { fuzyTime } from "@/lib/utils"

export function Workout({ workout }: { workout: Workout }) {
	return (
		<Card>
			<CardHeader className="flex-row justify-between">
				<CardTitle>Chest</CardTitle>
				<CardDescription>{fuzyTime(workout.date)}</CardDescription>
			</CardHeader>

			{/* <CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter> */}
		</Card>
	)
}
