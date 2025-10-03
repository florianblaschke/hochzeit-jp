import { db } from "$lib/server/db";
import { media } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (!locals.user) {
    redirect(307, "/login")
  }

  const mediaResults = await db.select().from(media)

  return {
    media: mediaResults
  }
}
