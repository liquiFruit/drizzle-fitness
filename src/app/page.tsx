import Image from "next/image"
import { redirect } from "next/navigation"

import { useServerAuth } from "@/lib/auth/use-server-auth"
import img from "@/../public/hero_img.png"

export default async function Home() {
	const session = await useServerAuth()
	if (session?.user?.email) redirect("/dashboard")

	return (
		<main className="mx-4">
			<div className="relative drop-shadow-lg  drop-shadow-color-primary/30 mx-auto max-w-75% overflow-hidden brightness-80 aspect-square rounded-full">
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
		</main>
	)
}
