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
import { PlusIcon } from "lucide-react"

const formSchema = z.object({
	order: z.number().int({ message: "Order must be an interger" }).optional(),
	details: z.number({ required_error: "Set details are required" }),
}) as z.ZodType<ExerciseSet>

export function ExerciseSetCrud() {
	const form = useForm<z.infer<typeof formSchema>>({
		// @ts-ignore
		resolver: zodResolver(formSchema),
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		alert("submitted")
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-row gap-2 items-end"
			>
				<FormField
					control={form.control}
					name="order"
					render={({ field, fieldState: { error } }) => (
						<FormItem>
							<FormLabel>Order</FormLabel>
							{!error ? (
								<FormDescription>Optional</FormDescription>
							) : (
								<FormMessage />
							)}

							<FormControl>
								<Input
									type="number"
									className="w-20 text-center"
									{...field}
									onChange={({ target: { value } }) =>
										field.onChange(parseInt(value))
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="details"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<FormLabel>Details</FormLabel>
							{!error ? (
								<FormDescription>
									Reps/distance/time.
								</FormDescription>
							) : (
								<FormMessage />
							)}

							<FormControl>
								<Input
									type="number"
									className="text-center"
									onBlur={({ target: { value } }) =>
										field.onChange(parseFloat(value))
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button
					size={"icon"}
					variant={"secondary"}
					type="submit"
					className="aspect-square"
				>
					<PlusIcon />
				</Button>
			</form>
		</Form>
	)
}
