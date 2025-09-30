import { env } from '$env/dynamic/private';
import { getAllUsers } from '$lib/queries/user';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { QueryClient } from '@tanstack/svelte-query';
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { guestSchema } from './schema';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.email !== env.ADMIN_EMAIL) {
    redirect(307, "/")
  }

  const guests = await getAllUsers()

  return {
    guests,
    form: await superValidate(zod(guestSchema)),
  };
};


export const actions: Actions = {
  default: async (event) => {
    const queryClient = new QueryClient()

    const form = await superValidate(event, zod(guestSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { email, name } = form.data

    try {
      await db.insert(user).values({
        id: crypto.randomUUID(),
        email,
        name
      })
    } catch {
      return fail(500, { form })
    }

    return {
      form,
    };
  },
};
