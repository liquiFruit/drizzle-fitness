"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { fuzyTime } from "@/lib/utils"
import { getAllWorkoutsByClause } from "@/lib/repositories/workouts/get"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnHeader } from "@/components/ui/data-table/column-header"
import { MuscleBadge } from "@/components/muscle-badge"
import { CalorieBadge } from "@/components/calorie-badge"

export const columns: ColumnDef<
	Awaited<ReturnType<typeof getAllWorkoutsByClause>>[0]
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
					<CalorieBadge calories={row.original.totalCalories} />

					{muscles
						.sort((a, b) => b.percentage - a.percentage)
						.map((muscle) => (
							<MuscleBadge muscle={muscle} />
						))}
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

					<DropdownMenuContent className="min-w-0" align="center">
						<div className="flex flex-row gap-1 children:cursor-pointer">
							<DropdownMenuItem>
								<Link href={`workouts/${workout.id}`}>
									View
								</Link>
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
