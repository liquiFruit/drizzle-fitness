import { Button } from "@/components/ui/button"
import Image from "next/image"

import img from "@/../public/hero_img.png"

export default function Home() {
	return (
		<main className="mx-4">
			<div className="relative aspect-square overflow-hidden rounded-full">
				<Image
					alt=""
					src={img}
					placeholder="blur"
					blurDataURL={img.blurDataURL}
					fill
					className="object-cover -z-1"
				/>
			</div>

			<div className="my-8 text-4xl font-black">
				Track your
				<p className="text-primary">progress</p>
			</div>

			<ul className="list-disc ml-4">
				<li>
					Track and conquer your workouts with our powerful workout
					tracker app.
				</li>

				<li>
					Unlock powerful features to enhance your fitness journey.
				</li>

				<li>
					Compete and connect with friends on your fitness
					achievements.
				</li>

				<li>Enjoy live updates and real-time progress tracking.</li>
			</ul>
			<Button className="w-full mt-4">Get started</Button>
		</main>
	)
}
