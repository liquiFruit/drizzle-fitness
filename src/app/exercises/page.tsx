import { getExercises } from "@/lib/repositories/exercises/getExercises"

export async function ExercisePage() {
	const exercises = await getExercises()
	return (
		<div className="flex flex-col gap-2">
			{exercises.map((exercise) => (
				<div
					key={exercise.id}
					className="p-2 rounded-md border border-border"
				>
					{exercise.name}
				</div>
			))}
		</div>
	)
}
