"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Workout } from "@/db"
import { fuzyTime } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnHeader } from "@/components/ui/data-table/column-header"

export const columns: ColumnDef<Workout>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => <ColumnHeader column={column} title="ID" />,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<ColumnHeader
				className="justify-end"
				column={column}
				title="Date"
			/>
		),
		cell: ({ row }) => {
			const date = fuzyTime(row.getValue("date"))
			return <div className="text-right font-medium">{date}</div>
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
						<DropdownMenuItem>
							View workout details
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
