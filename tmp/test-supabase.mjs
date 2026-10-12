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

console.log('SUPABASE_URL:', env.SUPABASE_URL);
console.log('Has SERVICE_ROLE_KEY:', !!env.SUPABASE_SERVICE_ROLE_KEY);
console.log('Has ANON_KEY:', !!env.SUPABASE_ANON_KEY);

const client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY);

async function run() {
  try {
    const { data: ss, error: sErr } = await client.from('success_stories').select('*');
    console.log('success_stories:', ss ? ss.length : 'null', 'error:', sErr);
    
    const { data: b, error: bErr } = await client.from('blogs').select('*');
    console.log('blogs:', b ? b.length : 'null', 'error:', bErr);
    
    const { data: inq, error: inqErr } = await client.from('inquiries').select('*');
    console.log('inquiries:', inq ? inq.length : 'null', 'error:', inqErr);
  } catch (err) {
    console.error('Catch error:', err);
  }
}

run();
