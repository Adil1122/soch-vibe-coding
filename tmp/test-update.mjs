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

const client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY);

async function testStories() {
  const { data, error } = await client.from('success_stories').select('*');
  console.log('Stories in Supabase:', data);
  if (error) console.error('Error:', error);

  // Try updating story 1
  if (data && data.length > 0) {
    const firstId = data[0].id;
    console.log('Testing update on story ID:', firstId);
    const { data: updateRes, error: updateErr } = await client
      .from('success_stories')
      .update({ achievement: data[0].achievement + ' (test)' })
      .eq('id', firstId)
      .select('*');
    console.log('Update result:', updateRes, 'Error:', updateErr);
    
    // revert
    await client
      .from('success_stories')
      .update({ achievement: data[0].achievement })
      .eq('id', firstId);
  }
}

testStories();
