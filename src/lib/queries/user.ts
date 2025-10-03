import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { ne, eq } from "drizzle-orm";

export async function getAllUsers() {
  return await db.select().from(user).where(eq(user.host, false))
}
