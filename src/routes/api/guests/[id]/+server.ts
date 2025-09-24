import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { guest } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return json({ error: 'Guest ID is required' }, { status: 400 });
    }

    const deletedGuest = await db
      .delete(guest)
      .where(eq(guest.id, id))
      .returning();

    if (deletedGuest.length === 0) {
      return json({ error: 'Guest not found' }, { status: 404 });
    }

    return json({ success: true, deletedGuest: deletedGuest[0] });
  } catch (error) {
    console.error('Error deleting guest:', error);
    return json({ error: 'Failed to delete guest' }, { status: 500 });
  }
};
