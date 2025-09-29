import { env } from "$env/dynamic/private"

export const load = ({ locals }) => {
  return {
    isAdmin: locals.user?.email === env.ADMIN_EMAIL
  }
}
