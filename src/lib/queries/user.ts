import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { ne } from "drizzle-orm";

export async function getAllUsers() {
  return await db.select().from(user).where(ne(user.email, env.ADMIN_EMAIL))
}
