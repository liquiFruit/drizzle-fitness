"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps<T> = {
	className?: string
	options: { label: string; value: T }[]
	value: T | null
	setValue: (value: T) => void
	children?: React.ReactNode
}

export function Combobox<T extends React.Key>({
	value,
	setValue,
	className,
	options,
	children,
}: ComboboxProps<T>) {
	const [open, setOpen] = React.useState(false)

	const handleSelection = (currentLabel: string) => {
		setValue(
			options.find(
				(option) => option.label.toLowerCase() === currentLabel
			)!.value
		)
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? options.find((option) => option.value === value)
								?.label
						: "Select an option..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandEmpty>
						{children ?? "No options found."}
					</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								onSelect={handleSelection}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === option.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
