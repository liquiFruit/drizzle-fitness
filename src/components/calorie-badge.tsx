import { humanNumber } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { FlameIcon } from "lucide-react"

export function CalorieBadge({ calories }: { calories: number }) {
	return (
		<Badge variant={"secondary"} className="items-center">
			<p>{humanNumber(calories)}</p>
			<FlameIcon size={10} className="ml-1 stroke-orange" />
		</Badge>
	)
}
