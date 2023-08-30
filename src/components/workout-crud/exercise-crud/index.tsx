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
import { SetCrud } from "../set-crud"
import { ExerciseSet } from "@/db"

const formSchema = z.object({
	exerciseId: z.string().min(2, {
		message: "Exercise is required.",
	}),

	set: z.object({
		order: z.number().optional(),
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
							<FormLabel>Exercise</FormLabel>
							{!error ? (
								<FormDescription>
									This is your public display name.
								</FormDescription>
							) : (
								<FormMessage />
							)}
							<FormControl>
								<Combobox onValueChanged={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="set"
					render={({ field, fieldState: { error } }) => (
						<FormItem>
							<FormLabel>Set</FormLabel>
							{!error ? (
								<FormDescription>
									Sets keep track of reps for a given
									exercise.
								</FormDescription>
							) : (
								<FormMessage />
							)}

							<FormControl>
								<SetCrud onChangeSet={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
