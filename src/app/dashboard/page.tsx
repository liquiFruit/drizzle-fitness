import { useServerAuth } from "@/lib/auth/use-server-auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
	const session = await useServerAuth()
	if (!session?.user) redirect("/")

	return <div>protected route</div>
}
