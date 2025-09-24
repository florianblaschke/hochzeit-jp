import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { guest } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if (locals.user?.email !== env.ADMIN_EMAIL) {
    redirect(307, "/")
  }

  const guests = await db.select().from(guest);

  return {
    guests
  };
};
