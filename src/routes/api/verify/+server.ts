import { env } from "$env/dynamic/private";
import { auth } from "$lib/auth";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from '@sveltejs/kit';
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json() as { email: string, password?: string };
    const email = body?.email
    const password = body?.password;

    if (!email) {
      return json({ error: 'invalid_email' }, { status: 400 });
    }

    const [guest] = await db
      .selectDistinct()
      .from(user).where(eq(user.email, email));

    if (!guest?.emailVerified && password !== env.PASSWORD) {
      return json({ error: "invalid_password" }, { status: 401 })
    }

    const res = await auth.api.signInMagicLink({ body: { email }, headers: request.headers })
    if (!res.status) {
      return json({ success: false }, { status: 500 })
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: 'bad_request', message: String(error) }, { status: 500 });
  }
};
