"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CheckIcon } from "lucide-react"

import { InsertMuscleSchema } from "@/lib/db/schema/muscles/muscles.table"
import { trpc } from "@/lib/trpc/client/client"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CreateMuscleGroup({
	initialState,
}: {
	initialState: Partial<typeof InsertMuscleSchema._type>
}) {
	const { mutateAsync: createMuscle } =
		trpc.muscles.createMuscle.useMutation()
	const { data: muscles } = trpc.muscles.getMuscles.useQuery()

	const router = useRouter()

	const form = useForm<typeof InsertMuscleSchema._type>({
		// @ts-ignore
		resolver: zodResolver(InsertMuscleSchema),
		defaultValues: {
			...initialState,
		},
	})

	async function onSubmit(values: typeof InsertMuscleSchema._type) {
		const r = await createMuscle(values)
		alert(r)
		if (r === "Success") {
			router.push("/exercises")
		} else if (r === "NameExists") {
			form.setError("name", {
				message: "This muscle group already exists.",
			})
		} else if (r === "InternalError")
			alert(
				"Something went wrong on the server. Either try again or report this issue."
			)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-row gap-2 items-end border border-border rounded-md p-2"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field, fieldState: { error } }) => (
						<FormItem className="w-full">
							<FormLabel>Muscle Name</FormLabel>
							<FormMessage />
							<FormControl>
								<Input {...field} placeholder="Chest" />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button size={"icon"} className="aspect-square">
					<CheckIcon />
				</Button>
			</form>
		</Form>
	)
}
