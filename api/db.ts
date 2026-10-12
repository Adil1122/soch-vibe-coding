import fs from 'fs';
import path from 'path';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Auto-load .env into process.env if not already present
export function loadLocalEnv() {
  const possiblePaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local')
  ];
  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf-8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const idx = trimmed.indexOf('=');
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      } catch (e) {
        console.warn('Failed to parse .env file:', e);
      }
    }
  }
}

loadLocalEnv();

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): { client: SupabaseClient } | null {
  loadLocalEnv();
  if (cachedClient) return { client: cachedClient };

  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  try {
    const cleanUrl = url.replace(/['"]+/g, '').trim();
    const cleanKey = key.replace(/['"]+/g, '').trim();
    cachedClient = createClient(cleanUrl, cleanKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    return { client: cachedClient };
  } catch (e) {
    console.warn('Failed to initialize Supabase client in api/db:', e);
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
