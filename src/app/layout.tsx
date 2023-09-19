import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import { AuthProvider } from "@/components/auth-provider"

import "./globals.css"
import TrpcProvider from "@/lib/trpc/client/Provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "drizzle-fitness",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				></meta>
			</head>
			<body className={cn(inter.className, "px-2")}>
				<TrpcProvider>
					<AuthProvider>
						<MainNav />
						{children}
					</AuthProvider>
				</TrpcProvider>
			</body>
		</html>
	)
}
