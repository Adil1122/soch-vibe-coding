import { put } from '@vercel/blob';
import { handleUpload } from '@vercel/blob/client';
import { getSupabase, uploadToSupabaseStorage, loadLocalEnv } from './db.ts';

loadLocalEnv();

async function parseBody(req: any) {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }
  try {
    const buffers: Buffer[] = [];
    for await (const chunk of req) {
      buffers.push(Buffer.from(chunk));
    }
    const raw = Buffer.concat(buffers).toString('utf-8');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const hasSupabase = Boolean(getSupabase());

  // 1. Status / health check
  if (req.method === 'GET') {
    return res.status(200).json({
      service: 'SOCH Media Storage',
      supabaseStorage: hasSupabase,
      vercelBlobStorage: Boolean(token),
      message: hasSupabase
        ? 'Supabase storage is configured and active for direct uploads.'
        : token
        ? 'Vercel Blob storage is configured and ready.'
        : 'Please configure SUPABASE_URL or BLOB_READ_WRITE_TOKEN for media uploads.'
    });
  }

  // 2. Upload handling
  if (req.method === 'POST') {
    const body = await parseBody(req);

    // Direct buffer / base64 image or video upload
    if (body?.filename && (body?.base64 || body?.fileData)) {
      const fileBuffer = Buffer.from(body.base64 || body.fileData, 'base64');
      const contentType = body.contentType || 'image/jpeg';
      const folder = body.folder || (contentType.startsWith('video/') ? 'videos' : 'thumbnails');

      // Try 1: Supabase Storage (Preferred & active)
      if (hasSupabase) {
        try {
          const publicUrl = await uploadToSupabaseStorage(body.filename, fileBuffer, contentType, folder);
          return res.status(200).json({
            success: true,
            url: publicUrl,
            pathname: `${folder}/${body.filename}`,
            contentType,
            source: 'supabase'
          });
        } catch (supabaseErr: any) {
          console.warn('Supabase storage upload failed, attempting fallback:', supabaseErr);
        }
      }

      // Try 2: Vercel Blob
      if (token) {
        try {
          const filename = `${folder}/${Date.now()}-${body.filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
          const blob = await put(filename, fileBuffer, {
            access: 'public',
            contentType
          });

          return res.status(200).json({
            success: true,
            url: blob.url,
            downloadUrl: blob.downloadUrl,
            pathname: blob.pathname,
            contentType: blob.contentType,
            source: 'vercel_blob'
          });
        } catch (blobErr: any) {
          console.warn('Vercel Blob put error:', blobErr);
        }
      }

      // Try 3: Small image fallback (< 2MB)
      if (contentType.startsWith('image/') && fileBuffer.length < 2 * 1024 * 1024) {
        const dataUrl = `data:${contentType};base64,${body.base64 || body.fileData}`;
        return res.status(200).json({
          success: true,
          url: dataUrl,
          contentType,
          source: 'data_uri'
        });
      }

      return res.status(500).json({
        error: 'Upload failed',
        message: 'Could not upload media to storage. Please ensure Supabase or Vercel Blob is configured.'
      });
    }

    // Vercel Blob client-token protocol
    if (body?.type === 'blob.generate-client-token' || body?.type === 'blob.upload-completed') {
      if (!token) {
        return res.status(400).json({
          error: 'Missing BLOB_READ_WRITE_TOKEN',
          message: 'Please enable Vercel Blob in your Vercel project dashboard to upload large videos.'
        });
      }

      try {
        const jsonResponse = await handleUpload({
          body,
          request: req,
          onBeforeGenerateToken: async () => {
            return {
              allowedContentTypes: [
                'video/mp4',
                'video/webm',
                'video/quicktime',
                'image/jpeg',
                'image/png',
                'image/webp'
              ],
              maximumSizeInBytes: 500 * 1024 * 1024
            };
          },
          onUploadCompleted: async ({ blob }) => {
            console.log('Blob upload completed successfully:', blob.url);
          }
        });
        return res.status(200).json(jsonResponse);
      } catch (error: any) {
        console.error('handleUpload error:', error);
        return res.status(400).json({ error: error.message });
      }
    }

    return res.status(400).json({
      error: 'Invalid upload request',
      message: 'Filename and base64 or @vercel/blob/client handleUpload payload required.'
    });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
