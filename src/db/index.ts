import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import drizzleConfig from "@/../drizzle.config"

export const db: BetterSQLite3Database = drizzle(new Database(drizzleConfig.dbCredentials.url))
export * from "./schema"