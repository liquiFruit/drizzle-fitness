"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { ExerciseSet } from "@/db"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnHeader } from "@/components/ui/data-table/column-header"

export const columns: ColumnDef<ExerciseSet>[] = [
	{
		accessorKey: "order",
		header: ({ column }) => <ColumnHeader column={column} title="#" />,
	},
	{
		accessorKey: "exerciseId",
		header: ({ column }) => (
			<ColumnHeader column={column} title="Exercise" />
		),
		cell: ({ row }) => {
			return (
				<div className="font-medium">{row.getValue("exerciseId")}</div>
			)
		},
	},
	{
		accessorKey: "details",
		header: ({ column }) => (
			<ColumnHeader
				className="justify-end"
				column={column}
				title="Exercise"
			/>
		),
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">
					{row.getValue("details")}
				</div>
			)
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const workout = row.original

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
