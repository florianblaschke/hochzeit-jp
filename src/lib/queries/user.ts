import { db } from "$lib/server/db";
import { rsvp, user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAllUsersWithRsvp() {
  return await db.select().from(user).leftJoin(rsvp, eq(user.id, rsvp.userId)).where(eq(user.host, false))
}

export type AllUsersWithRsvp = Awaited<ReturnType<typeof getAllUsersWithRsvp>>
