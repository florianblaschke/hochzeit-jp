import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { guest } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const guests = await db.select().from(guest);
    return json(guests);
  } catch (error) {
    console.error('Error fetching guests:', error);
    return json({ error: 'Failed to fetch guests' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return json({ error: 'Email is required' }, { status: 400 });
    }

    const newGuest = await db.insert(guest).values({
      id: crypto.randomUUID(),
      email,
    }).returning();

    return json(newGuest[0], { status: 201 });
  } catch (error) {
    console.error('Error creating guest:', error);
    return json({ error: 'Failed to create guest' }, { status: 500 });
  }
};
