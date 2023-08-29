import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"

import drizzleConfig from "@/../drizzle.config"
import * as schema from "@/db/schema"

export const db = drizzle(new Database(drizzleConfig.dbCredentials.url), { schema })
export * from "./schema"