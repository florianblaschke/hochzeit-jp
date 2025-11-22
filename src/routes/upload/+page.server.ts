import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "../$types"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { env } from "$env/dynamic/private"

dayjs.extend(utc)
dayjs.extend(timezone)

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) {
    redirect(307, "/login")
  }

  let date = dayjs.tz("2026-04-18", "Europe/Berlin").valueOf()
  let now = dayjs().tz("Europe/Berlin").valueOf()

  if (env.NODE_ENV === "production" && now < date) {
    redirect(307, "/")
  }
}
