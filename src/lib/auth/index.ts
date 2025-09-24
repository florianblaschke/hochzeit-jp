import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { Resend } from "resend";
import { env } from "$env/dynamic/private";
const resend = new Resend(env.RESEND)
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../server/db";
import { loginEmail } from "$lib/mails/login";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: { enabled: false },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        const { data, error } = await resend.emails.send({
          from: 'Jana & Philipp <onboarding@resend.dev>',
          to: [email],
          subject: 'Login',
          html: loginEmail({ email, token, url }),
        });
      }
    }),
    sveltekitCookies(getRequestEvent)
  ]
});
