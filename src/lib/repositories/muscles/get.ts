import { db } from "@/lib/db";
import { muscles } from "@/lib/db/schema/muscles";

export async function getAllMuscles() {
  return await db.select().from(muscles)
}