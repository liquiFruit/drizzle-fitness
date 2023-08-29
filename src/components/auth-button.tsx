"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
export function AuthButton() {
	const { status } = useSession()

	return (
		<>
			{status == "authenticated" ? (
				<Button variant={"secondary"} onClick={() => signOut()}>
					Sign out
				</Button>
			) : status == "unauthenticated" ? (
				<Button onClick={() => signIn("github")}>Sign in</Button>
			) : (
				<Button variant={"secondary"} disabled>
					<Loader2 className="animate-spin" />
				</Button>
			)}
		</>
	)
}
