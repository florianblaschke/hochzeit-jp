import { fail, redirect } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types.js";
import { loginSchema } from "./schema.js";
import { db } from "$lib/server/db/index.js";
import { user } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";
import { env } from "$env/dynamic/private";
import { auth } from "$lib/auth.js";

export const load = async ({ locals }) => {
	if (locals.user) {
		redirect(305, "/");
	}

	return {
		form: await superValidate(zod(loginSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const { email, name, password } = form.data;

		if (!email) {
			return message(
				form,
				{ error: "email", message: "Bitte gib eine Email Adresse ein" },
				{ status: 500 },
			);
		}

		const [guest] = await db
			.selectDistinct()
			.from(user)
			.where(eq(user.email, email.toLowerCase()));

		if (!guest?.emailVerified && password !== env.PASSWORD) {
			return setError(form, "password", "Bitte gib das Passwort ein.", {
				status: 401,
			});
		}

		if (!guest?.emailVerified && !name) {
			return setError(form, "name", "Bitte gib einen Namen ein.", {
				status: 500,
			});
		}

		const res = await auth.api.signInMagicLink({
			body: { email, name },
			headers: event.request.headers,
		});

		if (!res.status) {
			return setError(
				form,
				"",
				"Der Anmeldelink konnte nicht gesendet werden. Versuch es später erneut.",
				{ status: 500 },
			);
		}

		return message(
			form,
			"Du erhältst in Kürze einen Anmeldelink. Bitte schau hierfür in dein Postfach.",
		);
	},
};
