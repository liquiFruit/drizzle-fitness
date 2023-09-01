"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

import type { ExerciseSet } from "@/db"
import { CheckIcon, PlusIcon } from "lucide-react"
import { Combobox } from "@/components/ui/combo-box"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
	exerciseId: z.string().min(1, "Exercise type is required."),

	order: z.union([z.number().int().positive(), z.nan()]).optional(),

	details: z.number({ invalid_type_error: "Required" }).positive(),
}) as z.ZodType<ExerciseSet>

type ExerciseSetCrudProps = {
	onCreate: (set: ExerciseSet) => void
	initialState: Partial<ExerciseSet>
}
export function ExerciseSetCrud({
	onCreate,
	initialState,
}: ExerciseSetCrudProps) {
	const form = useForm<ExerciseSet>({
		// @ts-ignore
		resolver: zodResolver(formSchema),
		defaultValues: initialState,
	})
	const [adding, setAdding] = useState(false)

	function onSubmit(values: ExerciseSet) {
		onCreate(values)
		form.setValue("details", 0)

		setAdding(true)
		setTimeout(() => setAdding(false), 1000)
	}

	function resetForm() {
		form.reset(initialState)
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
					name="exerciseId"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<div className="children:inline">
								<FormLabel>Exercise Type </FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<Combobox
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
