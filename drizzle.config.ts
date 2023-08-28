import type { Config } from "drizzle-kit"
import dotevn from "dotenv"
dotevn.config()

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DB_URL!
  }
} satisfies Config
