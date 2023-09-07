import type { Config } from "drizzle-kit"
import "dotenv/config"

export default {
  schema: "./src/lib/db/schema/**/*",
  out: "./src/db/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DB_URL!
  }
} satisfies Config
