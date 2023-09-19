import { db } from "@/lib/db";
import { muscles } from "@/lib/db/schema/muscles/schema";

export async function getAllMuscles() {
  return await db.select().from(muscles)
}