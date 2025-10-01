import { db } from "$lib/server/db";
import { rsvp, user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function getRsvpByUserId(userId: string) {
  const result = await db.select().from(rsvp).where(eq(rsvp.userId, userId)).limit(1);
  return result[0] || null;
}

export async function createRsvp(userId: string, attending: boolean, message?: string) {
  return await db.insert(rsvp).values({
    id: crypto.randomUUID(),
    userId,
    attending,
    message
  });
}

export async function updateRsvp(userId: string, attending: boolean, message?: string) {
  return await db.update(rsvp)
    .set({ attending, message })
    .where(eq(rsvp.userId, userId));
}
