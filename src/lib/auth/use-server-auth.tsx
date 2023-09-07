import { authOptions } from "./auth-options"
import { getServerSession } from "next-auth"

export async function useServerAuth() {
	return getServerSession(authOptions)
}
