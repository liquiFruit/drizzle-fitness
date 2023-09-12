import Link from "next/link"
import { AuthButton } from "./auth-button"

export async function MainNav() {
	return (
		<div className="sticky top-0 backdrop-blur py-4 flex flex-row items-center justify-between">
			<Link href="/">
				<p className="text-xl">
					<span className="text-primary font-extrabold">DRZL</span>FIT
				</p>
			</Link>

			<AuthButton />
		</div>
	)
}
