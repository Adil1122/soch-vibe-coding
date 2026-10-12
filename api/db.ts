import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * No-op on Vercel (kept for backward-compat with callers).
 * Vercel injects env vars into process.env automatically.
 * Local dev: use a .env file loaded by vite (VITE_* prefix) or dotenv in your dev server.
 */
export function loadLocalEnv(): void {
  // Intentionally empty — env vars are managed by Vercel (production)
  // and by vite/dotenv (local dev). No fs access needed.
}

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): { client: SupabaseClient } | null {
  if (cachedClient) return { client: cachedClient };

  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const presentKeys = Object.keys(process.env).filter((k) =>
      k.toUpperCase().includes('SUPABASE')
    );
    console.error(
      `[db] Supabase env vars missing. url: ${Boolean(url)}, key: ${Boolean(key)}. ` +
      `Detected SUPABASE-related env vars in process: [${presentKeys.join(', ')}]. ` +
      'Please check Vercel Project Settings -> Environment Variables.'
    );
    return null;
  }

  try {
    const cleanUrl = url.replace(/['"]+/g, '').trim();
    const cleanKey = key.replace(/['"]+/g, '').trim();

    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      console.error('[db] SUPABASE_URL does not look valid:', cleanUrl);
      return null;
    }

    cachedClient = createClient(cleanUrl, cleanKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    return { client: cachedClient };
  } catch (e) {
    console.error('[db] Failed to initialize Supabase client:', e);
    return null;
  }
}

/**
 * Upload a file buffer to Supabase Storage bucket 'media'
 */
export async function uploadToSupabaseStorage(
  filename: string,
  buffer: Buffer,
  contentType: string,
  folder = 'thumbnails'
): Promise<string> {
  const supabaseInfo = getSupabase();
  if (!supabaseInfo) {
    throw new Error('Supabase client is not configured.');
  }

  const { client } = supabaseInfo;
  const cleanFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${folder}/${Date.now()}-${cleanFilename}`;

  // Make sure 'media' bucket exists
  try {
    await client.storage.createBucket('media', { public: true });
  } catch {
    // Bucket might already exist, ignore error
  }

  const { error: uploadError } = await client.storage
    .from('media')
    .upload(filePath, buffer, {
      contentType,
      upsert: true
    });

  if (uploadError) {
    throw new Error(`Supabase storage upload error: ${uploadError.message}`);
  }

  const { data: publicUrlData } = client.storage.from('media').getPublicUrl(filePath);
  if (!publicUrlData?.publicUrl) {
    throw new Error('Failed to retrieve public URL from Supabase storage.');
  }

  return publicUrlData.publicUrl;
}
