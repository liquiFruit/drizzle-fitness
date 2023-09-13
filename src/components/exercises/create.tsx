"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { XIcon } from "lucide-react"

import { InsertExercise } from "@/lib/db/schema/exercises/schema"
import { trpc } from "@/lib/trpc/client/client"

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
import { Badge } from "../ui/badge"
import { useRouter } from "next/navigation"

export function CreateExercise({
	initialState,
}: {
	initialState: Partial<typeof InsertExercise._type>
}) {
	const { mutateAsync: createExercise } =
		trpc.exercises.createExercise.useMutation()
	const { data: muscles } = trpc.muscles.getMuscles.useQuery()

	const router = useRouter()
	const muscleMap = new Map<number, string>(
		muscles?.map(({ id, name }) => [id, name])
	)

	const form = useForm<typeof InsertExercise._type>({
		// @ts-ignore
		resolver: zodResolver(InsertExercise),
		defaultValues: {
			muscleGroups: [],
			unit: "reps",
			...initialState,
		},
	})

	async function onSubmit(values: typeof InsertExercise._type) {
		const r = await createExercise(values)

		if (r === "Success") {
			router.push("/exercises")
			router.refresh()
		} else if (r === "NameExists")
			alert("Exercise with that name already exists.")
		else if (r === "InternalError")
			alert(
				"Something went wrong on the server. Either try again or report this issue."
			)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-2 items-end border border-border rounded-md p-2"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<FormLabel>Exercise Name</FormLabel>
							<FormMessage />
							<FormControl>
								<Input {...field} placeholder="Pushups" />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="muscleGroups"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<FormLabel>Target Muscle Groups</FormLabel>
							<FormMessage />
							<FormControl>
								<Combobox<number>
									options={
										muscles?.map(({ id, name }) => ({
											label: name,
											value: id,
										})) ?? []
									}
									value={null}
									setValue={(v) => {
										if (field.value.includes(v)) return

										field.value.push(v)
										field.onChange(field.value)
									}}
								>
									<div>
										<p>No muscle groups found</p>
										<Link href="/muscles/create">
											<Button variant={"link"}>
												Create a muscle group
											</Button>
										</Link>
									</div>
								</Combobox>
							</FormControl>
							<div className="flex flex-row flex-wrap gap-2">
								{field.value.map((muscleID) => (
									<Badge
										key={muscleID}
										variant={"secondary"}
										className="cursor-pointer"
										onClick={() =>
											field.onChange(
												field.value.filter(
													(v) => v !== muscleID
												)
											)
										}
									>
										{muscleMap.get(muscleID)}
										<XIcon className="ml-2" size={12} />
									</Badge>
								))}
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="unit"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<FormLabel>Messurable unit</FormLabel>
							<FormMessage />
							<FormControl>
								<Input
									type="string"
									{...field}
									placeholder="reps"
									className="text-center"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="cpu"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<FormLabel>Calories per unit</FormLabel>
							<FormMessage />
							<FormControl>
								<Input
									type="number"
									step={0.001}
									{...field}
									onChange={(e) => {
										const value = e.target.value.replace(
											/,/g,
											"."
										)
										const num = parseFloat(value)
										field.onChange(
											Number.isNaN(num) ? value : num
										)
									}}
									placeholder="0 <"
									className="text-center"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button className="w-full mt-8">Create Exercise</Button>
			</form>
		</Form>
	)
}
