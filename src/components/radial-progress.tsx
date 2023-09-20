"use client"

import { cn } from "@/lib/utils"

const util = {
	center: "absolute left-1/2 top-1/2 -translate-1/2",
	clipLeft: "[clip-path:polygon(50%_0%,_100%_0%,_100%_100%,_50%_100%)]",
	foreground: "bg-green",
	background: "bg-background/80",
}

const styles = {
	circle: cn(
		"aspect-square rounded-full w-full",
		util.center,
		util.clipLeft,
		util.foreground
	),
	insideCircle: cn(
		"aspect-square rounded-full w-[calc(100%-min(1rem,100%))]",
		util.center,
		util.clipLeft,
		util.background
	),
}

export function RadialProgress({
	progress,
	className,
}: {
	progress: number
	className: string
}) {
	return (
		<div
			className={cn(
				className,
				"-@container relative rounded-full bg-green/20"
			)}
		>
			<div
				className={cn(progress < 0.5 && util.clipLeft, "aspect-square")}
			>
				<div
					className={styles.circle}
					style={{
						transform: `translate(-50%, -50%) rotate(${
							180 + progress * 360
						}deg)`,
					}}
				>
					<div className={styles.insideCircle} />
				</div>

				{progress >= 0.5 ? (
					<div className={styles.circle}>
						<div className={styles.insideCircle} />
					</div>
				) : null}
			</div>
		</div>
	)
}
