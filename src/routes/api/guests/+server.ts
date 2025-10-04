import { getAllUsersWithRsvp } from '$lib/queries/user';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const guests = await getAllUsersWithRsvp()
    return json(guests);
  } catch (error) {
    return json({ error: 'Failed to fetch guests' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return json({ error: 'Email is required' }, { status: 400 });
    }

    await db.insert(user).values({
      id: crypto.randomUUID(),
      name,
      email,
    })

    return json({ message: "success" }, { status: 200 });
  } catch (error) {
    return json({ error: 'Failed to create guest' }, { status: 500 });
  }
};
