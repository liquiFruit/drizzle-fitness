"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Workout } from "@/db"
import { fuzyTime } from "@/lib/utils"

export const columns: ColumnDef<Workout>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "date",
		header: () => <div className="text-right">Date</div>,
		cell: ({ row }) => {
			const date = fuzyTime(row.getValue("date"))
			return <div className="text-right font-medium">{date}</div>
		},
	},
]
