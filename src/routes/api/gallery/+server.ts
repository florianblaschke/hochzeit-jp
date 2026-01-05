import { db } from "$lib/server/db";
import { media } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { desc, sql } from "drizzle-orm";

const MEDIA_PER_PAGE = 20;

export const GET = async ({ request, locals, url }) => {
  if (!locals.user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const offset = Number(url.searchParams.get("offset")) || 0;

  const mediaResults = await db
    .select()
    .from(media)
    .orderBy(desc(media.createdAt))
    .limit(MEDIA_PER_PAGE)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`cast(count(*) as integer)` })
    .from(media);

  return json({
    media: mediaResults,
    totalCount: count,
    offset,
  });
};
