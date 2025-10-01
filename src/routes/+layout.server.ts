import { env } from "$env/dynamic/private"
import { db } from "$lib/server/db/index.js"
import { rsvp } from "$lib/server/db/schema.js"
import { eq } from "drizzle-orm"

export const load = async ({ locals }) => {
  let attending

  if (locals.user?.id) {
    const [hasRSVP] = await db.selectDistinct().from(rsvp).where(eq(rsvp.userId, locals.user.id))
    attending = hasRSVP?.attending
  }

  return {
    attending,
    isAdmin: locals.user?.email === env.ADMIN_EMAIL
  }
}
