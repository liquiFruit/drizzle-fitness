"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CheckIcon, PlusIcon } from "lucide-react"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combo-box"

import { cn } from "@/lib/utils"
import { InsertWorkoutSet } from "@/lib/db/schema/workouts"

type TWorkoutSet = typeof InsertWorkoutSet._type
type WorkoutSetCrudProps = {
	onCreate: (set: TWorkoutSet) => void
	initialState: Partial<TWorkoutSet>
}

const exercises = [
	{ label: "Pushups", value: 1 },
	{ label: "Situps", value: 2 },
]

export function WorkoutSetCrud({
	onCreate,
	initialState,
}: WorkoutSetCrudProps) {
	const form = useForm<TWorkoutSet>({
		// @ts-ignore
		resolver: zodResolver(InsertWorkoutSet),
		defaultValues: { order: Date.now(), ...initialState },
	})
	const [adding, setAdding] = useState(false)

	function onSubmit(values: typeof InsertWorkoutSet._type) {
		values = { ...values, order: Date.now() }
		onCreate(values)
		form.setValue("details", 0)
		form.setValue("order", Date.now())

		setAdding(true)
		form.setFocus("details")
		setTimeout(() => setAdding(false), 1000)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-2 items-end border border-border rounded-md p-2"
			>
				{/* Exercise picker */}
				<FormField
					control={form.control}
					name="workoutExerciseId"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<div className="children:inline">
								<FormLabel>Exercise Type </FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<Combobox<number>
									options={exercises}
									value={field.value}
									setValue={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex flex-row gap-2 items-end w-full">
					{/* Details section */}
					<FormField
						control={form.control}
						name="details"
						render={({ field, fieldState: { error } }) => (
							<FormItem className="w-full">
								{/* Header section */}
								<div className="children:inline">
									<FormLabel className="mr-2">
										Details
									</FormLabel>

									{!error ? (
										<FormDescription>
											Reps/distance/time
										</FormDescription>
									) : (
										<FormMessage />
									)}
								</div>

								<FormControl>
									<Input
										type="number"
										className="text-center"
										{...field}
										onChange={(e) => {
											field.onChange(
												e.target.valueAsNumber
											)
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button
						size={"icon"}
						variant={"secondary"}
						type="submit"
						className={cn("aspect-square", adding && "bg-emerald!")}
					>
						{!adding ? <PlusIcon /> : <CheckIcon />}
					</Button>
				</div>
			</form>
		</Form>
	)
}
