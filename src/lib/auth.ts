import { getRequestEvent } from "$app/server";
import { env } from "$env/dynamic/private";
import { loginEmail } from "$lib/mails/login";
import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { Resend } from "resend";
import { db } from "./server/db";
const resend = new Resend(env.RESEND)


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: ["https://hochzeit-jp.de", "https://hochzeit-jp.vercel.app", "http://localhost:5173"],
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: false },
  user: {
    additionalFields: {
      host: {
        fieldName: "host",
        type: "boolean",
        defaultValue: false,
      }
    }
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        const { error } = await resend.emails.send({
          from: 'Jana & Philipp <anmeldung@hochzeit-jp.de>',
          to: [email],
          subject: 'Login',
          html: loginEmail({ email, token, url }),
        });

        if (error) {
          throw new APIError("BAD_REQUEST", {
            message: "The verification Email could not be send. Please try again."
          })
        }
      }
    }),
    sveltekitCookies(getRequestEvent)
  ]
});

export const Session = auth.$Infer.Session
