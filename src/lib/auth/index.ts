import { getServerSession } from "next-auth"
import { authOptions } from "./auth-options"

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions)
  return { session }
}