"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import type { SelectWorkout } from "@/lib/db/schema/workouts/schema"
import { fuzyTime } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnHeader } from "@/components/ui/data-table/column-header"
import { getWorkoutsByUserId } from "@/lib/repositories/workouts/get"
import { Badge } from "../ui/badge"

export const columns: ColumnDef<
	Awaited<ReturnType<typeof getWorkoutsByUserId>>[0]
>[] = [
	{
		accessorKey: "date",
		header: ({ column }) => <ColumnHeader column={column} title="Date" />,
		cell: ({ row }) => {
			const date = fuzyTime(row.getValue("date"))
			return <div className="font-medium">{date}</div>
		},
	},
	{
		accessorKey: "muscles",
		header: "Muscle Groups",
		cell: ({ row }) => {
			const muscles = row.original.muscles
			return (
				<div className="flex flex-wrap gap-2">
					{muscles.map(({ name, percentage }) => (
						<Badge key={percentage} variant={"secondary"}>
							<div
								style={{
									opacity: percentage,
								}}
								className="bg-green w-2 h-2 rounded-full mr-2"
							/>
							{name}/{percentage}
						</Badge>
					))}
				</div>
			)
		},
	},
	// {
	// 	id: "actions",
	// 	cell: ({ row }) => {
	// 		const workout = row.original

	// 		return (
	// 			<DropdownMenu>
	// 				<DropdownMenuTrigger asChild>
	// 					<Button variant="ghost" className="h-8 w-8 p-0">
	// 						<MoreHorizontal className="h-4 w-4" />
	// 					</Button>
	// 				</DropdownMenuTrigger>

	// 				<DropdownMenuContent align="start">
	// 					<DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
	// 					<DropdownMenuItem>
	// 						View workout details
	// 					</DropdownMenuItem>
	// 				</DropdownMenuContent>
	// 			</DropdownMenu>
	// 		)
	// 	},
	// },
]
