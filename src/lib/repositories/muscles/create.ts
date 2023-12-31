import { db } from "@/lib/db";
import { InsertMuscleSchema, muscles } from "@/lib/db/schema/muscles/schema";
import { LibsqlError } from "@libsql/client/sqlite3"
type Result = "NameExists" | DbResultStatus

export async function createMuscleGroup(newMuscle: typeof InsertMuscleSchema._type): Promise<Result> {
  try {
    await db.insert(muscles).values(newMuscle)
    return "Success"
  } catch (error) {
    if (error instanceof LibsqlError)
      if (error.code === "SQLITE_CONSTRAINT")
        return "NameExists"

    console.log("error:", error)
    return "InternalError"
  }
}