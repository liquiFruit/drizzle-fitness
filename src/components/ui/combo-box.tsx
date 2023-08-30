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

const frameworks = [
	{
		value: "pushups",
		label: "Pushups",
	},
	{
		value: "squats",
		label: "Squats",
	},
]

type ComboboxProps = {
	className?: string
	onValueChanged?: (value: string) => void
}
export function Combobox({ onValueChanged, className }: ComboboxProps) {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState<string>()

	const updateValue = (value: string) => {
		if (onValueChanged) onValueChanged(value)
		setValue(value)
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
						? frameworks.find(
								(framework) => framework.value === value
						  )?.label
						: "Select an exercise..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search framework..." />
					<CommandEmpty>No exercises found.</CommandEmpty>
					<CommandGroup>
						{frameworks.map((framework) => (
							<CommandItem
								key={framework.value}
								onSelect={(currentValue) => {
									updateValue(
										currentValue === value
											? ""
											: currentValue
									)
									setOpen(false)
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === framework.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{framework.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
