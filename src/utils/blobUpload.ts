import { upload } from '@vercel/blob/client';

export interface UploadResult {
  url: string;
  source: 'supabase' | 'vercel_blob' | 'data_uri' | 'direct_url' | 'local_fallback';
}

/**
 * Converts a browser File or Blob to a base64 encoded string.
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file (e.g. video thumbnail, blog cover) to cloud storage (Supabase or Vercel Blob).
 */
export async function uploadThumbnailFile(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<UploadResult> {
  if (!file) {
    throw new Error('No file selected.');
  }

  // Validate image type
  const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name);
  if (!isImage) {
    throw new Error('Please select a valid image file (JPG, PNG, WebP, GIF, SVG).');
  }

  // Validate size (15MB max for thumbnails)
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Image size must be less than 15MB.');
  }

  if (onProgress) onProgress(20);

  try {
    const base64 = await fileToBase64(file);
    if (onProgress) onProgress(50);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type || 'image/jpeg',
        base64,
        folder: 'thumbnails'
      })
    });

    if (onProgress) onProgress(85);

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || errJson.error || 'Failed to upload thumbnail');
    }

    const data = await res.json();
    if (onProgress) onProgress(100);

    return {
      url: data.url,
      source: data.source || 'supabase'
    };
  } catch (err: any) {
    console.error('Thumbnail upload error:', err);
    throw new Error(err.message || 'Failed to upload thumbnail image');
  }
}

/**
 * Uploads any media file (video or image) to storage.
 */
export async function uploadMediaFile(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<UploadResult> {
  // If it's an image, use the direct image upload pipeline
  if (file.type.startsWith('image/')) {
    return uploadThumbnailFile(file, onProgress);
  }

  // For video files, attempt Vercel Blob first
  try {
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          onProgress(Math.round(progressEvent.percentage));
        }
      }
    });

    return {
      url: blob.url,
      source: 'vercel_blob'
    };
  } catch (err: any) {
    console.warn('Vercel Blob client upload warning:', err);

    // If file is smaller than 40MB, try direct Supabase upload fallback
    if (file.size <= 40 * 1024 * 1024) {
      try {
        if (onProgress) onProgress(30);
        const base64 = await fileToBase64(file);
        if (onProgress) onProgress(60);

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type || 'video/mp4',
            base64,
            folder: 'videos'
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (onProgress) onProgress(100);
          return {
            url: data.url,
            source: data.source || 'supabase'
          };
        }
      } catch (fallbackErr) {
        console.warn('Direct upload fallback error:', fallbackErr);
      }
    }

    const errorMsg = err?.message || '';
    if (
      errorMsg.includes('BLOB_READ_WRITE_TOKEN') ||
      errorMsg.includes('Vercel Blob') ||
      errorMsg.includes('token') ||
      errorMsg.includes('400') ||
      errorMsg.includes('Failed to fetch')
    ) {
      throw new Error(
        'Direct video upload requires Vercel Blob (Storage > Blob in Vercel Dashboard) for files > 40MB. You can paste any direct video URL below.'
      );
    }

    throw err;
  }
}
