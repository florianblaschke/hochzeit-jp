import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { image } from '$lib/server/db/schema';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const jsonResponse = await handleUpload({
      body: await request.json() as HandleUploadBody,
      request,
      token: env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async () => {
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
          tokenPayload: locals.user.id
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          await db.insert(image).values({
            id: crypto.randomUUID(),
            url: blob.url,
            type: blob.contentType,
            fileName: blob.pathname,
            userId: tokenPayload,
          });
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
