import { env } from '$env/dynamic/private';
import { getAllUsers } from '$lib/queries/user';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if (locals.user?.email !== env.ADMIN_EMAIL) {
    redirect(307, "/")
  }

  const guests = await getAllUsers()

  return {
    guests
  };
};
