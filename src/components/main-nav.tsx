import { AuthButton } from "./auth-button"

export async function MainNav() {
	return (
		<div className="sticky top-0 backdrop-blur px-2 py-4 flex flex-row items-center justify-between">
			<p className="font-extrabold text-xl">
				<span className="text-primary">DRZL</span>FIT
			</p>

			<AuthButton />
		</div>
	)
}
