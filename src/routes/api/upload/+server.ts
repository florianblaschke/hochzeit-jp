import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { media } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { RequestHandler } from './$types';

type TokenPayload = {
  userId: string,
  fileInfo?: {
    id: string,
    isThumbnail?: boolean
  }
}

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const body = await request.json() as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request,
      token: env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!locals.user) {
          throw new Error("unauthorized")
        }

        return {
          callbackUrl: env.VERCEL_BLOB_CALLBACK_URL,
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/heic',
            'image/heif',
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'video/webm',
            'video/avi'
          ],
          addRandomSuffix: true,
          maxSize: 250 * 1024 * 1024, // 250MB
          tokenPayload: JSON.stringify({
            userId: locals.user.id,
            fileInfo: clientPayload ? JSON.parse(clientPayload) : undefined
          } as TokenPayload)
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = JSON.parse(tokenPayload ?? "{}") as TokenPayload
        const { userId, fileInfo } = payload

        if (!fileInfo?.id) {
          throw new Error("ID is required from client")
        }

        const { id, isThumbnail } = fileInfo

        try {
          if (isThumbnail) {
            // Check if the video entry exists
            const existing = await db.select().from(media)
              .where(eq(media.id, fileInfo.id))
              .limit(1)


            if (existing.length) {
              // Video exists, update it with thumbnail URL
              await db.update(media)
                .set({ thumbnailUrl: blob.url })
                .where(eq(media.id, fileInfo.id))
            } else {
              // Video doesn't exist yet, create placeholder entry with thumbnail
              await db.insert(media).values({
                id,
                mediaUrl: null,
                type: 'video/pending', // Placeholder type
                fileName: null,
                userId,
                thumbnailUrl: blob.url,
              });
            }
          } else {
            // Handle video or regular image upload
            // Check if this is completing a thumbnail-first upload
            const existing = await db.select().from(media)
              .where(eq(media.id, id))
              .limit(1)


            if (existing.length) {
              await db.update(media)
                .set({
                  mediaUrl: blob.url,
                  type: blob.contentType,
                  fileName: blob.pathname,
                })
                .where(eq(media.id, id))
            } else {
              await db.insert(media).values({
                id,
                mediaUrl: blob.url,
                type: blob.contentType,
                fileName: blob.pathname,
                userId,
              });
            }
          }
        } catch (error) {
          throw new Error("failed_db_entry")
        }
      }
    });

    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json({ error: 'Failed to generate upload token' }, { status: 500 });
  }
};
