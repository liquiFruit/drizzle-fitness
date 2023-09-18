"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnHeader } from "@/components/ui/data-table/column-header"

import type { TExercise } from "@/lib/repositories/exercises/controller"

export const exerciseColumns: ColumnDef<TExercise>[] = [
	{
		accessorKey: "cpu",
		header: ({ column }) => (
			<ColumnHeader column={column} title="Exercise" />
		),
		cell: ({ row }) => {
			return <ExerciseCell exercise={row.original} />
		},
	},
	{
		id: "actions",
		// header: () => <div className="w-fit">Actions</div>,
		cell: ({ row }) => {
			const exercise = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="start">
						<DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]

function ExerciseCell({ exercise }: { exercise: TExercise }) {
	return (
		<div className="select-none">
			<p className="font-medium">{exercise.name}</p>
			<div className="flex flex-row flex-wrap gap-2 font-200 text-light/50">
				<p>Cal: {exercise.cpu}/unit</p>
				<p>Units: {exercise.unit}</p>
			</div>
		</div>
	)
}
