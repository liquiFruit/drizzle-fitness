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
import { Combobox } from "@/components/ui/combo-box"
import type { ExerciseSet } from "@/db"
import { ExerciseSetCrud } from "../set-crud"

const formSchema = z.object({
	exerciseId: z.string().min(2, {
		message: "Exercise is required.",
	}),

	set: z.object({
		order: z
			.number()
			.int({ message: "Order must be an interger" })
			.optional(),
		details: z.number({ required_error: "Set details are required" }),
	}) as z.ZodType<ExerciseSet>,
})

export function ExerciseCrud() {
	const form = useForm<z.infer<typeof formSchema>>({
		// @ts-ignore
		resolver: zodResolver(formSchema),
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		alert("submitted")
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="exerciseId"
					render={({ field, fieldState: { error } }) => (
						<FormItem>
							<FormLabel>Choose an Exercise</FormLabel>
							{!error ? (
								<FormDescription>
									The type of exercise
								</FormDescription>
							) : (
								<FormMessage />
							)}
							<FormControl>
								<Combobox
									onValueChanged={() => alert("submit?")}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="exerciseId"
					render={({ field, fieldState: { error } }) => (
						<FormItem>
							<FormLabel>Choose an Exercise</FormLabel>
							{!error ? (
								<FormDescription>
									The type of exercise
								</FormDescription>
							) : (
								<FormMessage />
							)}
							<FormControl>
								<ExerciseSetCrud />
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
