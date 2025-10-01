import { redirect, fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { getRsvpByUserId, createRsvp, updateRsvp } from "$lib/queries/rsvp";
import { rsvpSchema } from "./rsvp-schema";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    redirect(307, "/login")
  }

  const existingRsvp = await getRsvpByUserId(locals.user.id);

  return {
    rsvp: existingRsvp,
    form: await superValidate(zod(rsvpSchema)),
  };
}

export const actions: Actions = {
  default: async (event) => {
    const { locals } = event;

    if (!locals.user) {
      redirect(307, "/login");
    }

    const form = await superValidate(event, zod(rsvpSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { attending, message } = form.data;

    const attendingBool = attending === "true"

    try {
      const existingRsvp = await getRsvpByUserId(locals.user.id);

      if (existingRsvp) {
        await updateRsvp(locals.user.id, attendingBool, message);
      } else {
        await createRsvp(locals.user.id, attendingBool, message);
      }
    } catch (error) {
      return fail(500, { form });
    }

    return {
      form,
    };
  },
};
