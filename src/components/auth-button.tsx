"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"
export function AuthButton() {
	const { status, data } = useSession()
	const user = data?.user!

	return (
		<>
			{status == "authenticated" ? (
				<div
					onClick={() => signOut()}
					className="cursor-pointer relative aspect-square rounded-full overflow-hidden w-8"
				>
					<Image
						src={user.image!}
						alt={user.name!}
						fill
						className="object-cover"
					/>
				</div>
			) : status == "unauthenticated" ? (
				<Button onClick={() => signIn("github")}>Sign in</Button>
			) : (
				<Loader2 className="animate-spin" size={32} />
			)}
		</>
	)
}
