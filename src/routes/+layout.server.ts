import { db } from "$lib/server/db/index.js"
import { rsvp } from "$lib/server/db/schema.js"
import { eq } from "drizzle-orm"

export const load = async ({ locals }) => {
  let attending: boolean | undefined

  if (locals.user?.id) {
    const [hasRSVP] = await db.selectDistinct().from(rsvp).where(eq(rsvp.userId, locals.user.id))
    attending = hasRSVP?.attending
  }

  console.log(locals.user)

  return {
    attending,
    isAdmin: locals.user?.host
  }
}
