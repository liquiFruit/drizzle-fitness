import "dotenv/config"

import { drizzle } from "drizzle-orm/libsql"
import { migrate } from "drizzle-orm/libsql/migrator"
import { createClient } from "@libsql/client"


const runMigrate = async () => {
  if (!process.env.TURSO_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("Missing TURSO_URL and TURSO_AUTH_TOKEN in .env")
  }

  const sqlite = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const db = drizzle(sqlite)


  console.log("⏳ Running migrations...")

  const start = Date.now()

  await migrate(db, { migrationsFolder: 'src/lib/db/migrations' })

  const end = Date.now()

  console.log("✅ Migrations completed in", end - start, "ms")

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed")
  console.error(err)
  process.exit(1)
})