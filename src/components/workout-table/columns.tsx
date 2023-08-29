"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Workout } from "@/db"

export const columns: ColumnDef<Workout>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "date",
		header: "Date",
	},
]
