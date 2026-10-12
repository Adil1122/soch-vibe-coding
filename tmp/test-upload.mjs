import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const idx = trimmed.indexOf('=');
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
}

const client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function testUpload() {
  const fileBuffer = Buffer.from('hello test image content');
  const path = `thumbnails/test-${Date.now()}.txt`;
  const { data, error } = await client.storage
    .from('media')
    .upload(path, fileBuffer, {
      contentType: 'text/plain',
      upsert: true
    });
  console.log('Upload result:', data, 'Error:', error);
  const { data: pubData } = client.storage.from('media').getPublicUrl(path);
  console.log('Public URL:', pubData.publicUrl);
}

testUpload();
