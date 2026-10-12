import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

function getSupabase(): { client: SupabaseClient } | null {
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
    return null;
  }

  try {
    const cleanUrl = url.replace(/['"]+/g, '').trim();
    const cleanKey = key.replace(/['"]+/g, '').trim();

    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      return null;
    }

    cachedClient = createClient(cleanUrl, cleanKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    return { client: cachedClient };
  } catch (e) {
    console.error('[success-stories] Supabase client initialization exception:', e);
    return null;
  }
}

export interface SuccessStoryRecord {
  id: number;
  student_name: string;
  role: string;
  project_description: string;
  student_details: string;
  video_url: string;
  thumbnail_url: string;
  video_duration: string;
  achievement: string;
  display_order: number;
  created_at: string;
  updated_at: string | null;
}

const DEFAULT_SUCCESS_STORIES: SuccessStoryRecord[] = [
  {
    id: 1,
    student_name: 'Muhammad Daniyal',
    role: 'Batch 01 Graduate • Lead Full-Stack Engineer',
    project_description: 'Built "TaskFlow AI" — real-time project collaboration & automated sprint task breakdown tool.',
    student_details: 'Before SOCH, I spent hours debugging boilerplate. The Vibe Coding methodology taught me to architect systems with clarity and leverage AI as an exoskeleton. I shipped our MVP in 14 days and landed our first enterprise pilot.',
    video_url: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    video_duration: '3:45',
    achievement: 'Landed $2.5k/mo Remote Retainer',
    display_order: 1,
    created_at: new Date('2026-03-01').toISOString(),
    updated_at: null
  },
  {
    id: 2,
    student_name: 'Ayesha Noor',
    role: 'Batch 01 Graduate • Founder of EduVibe PK',
    project_description: 'Created "EduVibe" — automated curriculum planner for local secondary schools across Khyber Pakhtunkhwa.',
    student_details: 'SOCH gave me the courage to see that Haripur students can compete globally. The BIC mentorship and AI-accelerated development curriculum allowed me to pitch and win our first incubation grant.',
    video_url: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    video_duration: '4:12',
    achievement: 'Secured UOH BIC Seed Funding',
    display_order: 2,
    created_at: new Date('2026-03-05').toISOString(),
    updated_at: null
  },
  {
    id: 3,
    student_name: 'Bilal Khan',
    role: 'Batch 01 Graduate • Full-Stack AI Builder',
    project_description: 'Engineered "MediFlow" — clinic appointment, prescription and voice-to-text medical notes assistant.',
    student_details: 'The emphasis on engineering fundamentals alongside AI is what makes SOCH unique. You understand the architecture deeply, so you steer AI with precision instead of guessing.',
    video_url: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    video_duration: '2:58',
    achievement: 'Serving 14 clinics across Hazara region',
    display_order: 3,
    created_at: new Date('2026-03-10').toISOString(),
    updated_at: null
  },
  {
    id: 4,
    student_name: 'Zainab Tariq',
    role: 'Batch 01 Graduate • AI Product Developer',
    project_description: 'Built "VoiceDesk AI" — Urdu & English bilingual customer phone receptionist for regional businesses.',
    student_details: 'The hands-on lab at UOH BIC turned abstract AI papers into working, money-making products. In Cohort 01, we deployed code on real servers from week 3.',
    video_url: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    video_duration: '3:20',
    achievement: 'Contracted by 8 Haripur businesses',
    display_order: 4,
    created_at: new Date('2026-03-12').toISOString(),
    updated_at: null
  },
  {
    id: 5,
    student_name: 'Usman Farooq',
    role: 'Batch 01 Graduate • Frontend Systems Engineer',
    project_description: 'Developed "Hazara Freight Dispatch" — real-time truck tracking and automated invoice generation portal.',
    student_details: 'Learning to build with next-gen AI workflows boosted my development velocity tenfold. I completed our entire capstone in a single weekend with production tests.',
    video_url: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    video_duration: '4:05',
    achievement: 'Hired as Lead Frontend Developer',
    display_order: 5,
    created_at: new Date('2026-03-15').toISOString(),
    updated_at: null
  }
];

function normalizeStory(row: any): SuccessStoryRecord {
  return {
    id: Number(row.id) || 1,
    student_name: row.student_name || row.studentName || row.name || 'Cohort 01 Student',
    role: row.role || 'Cohort 01 Graduate',
    project_description: row.project_description || row.projectDescription || row.projectBuilt || '',
    student_details: row.student_details || row.studentDetails || row.quote || row.details || '',
    video_url: row.video_url || row.videoUrl || row.src || '',
    thumbnail_url: row.thumbnail_url || row.thumbnailUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    video_duration: row.video_duration || row.videoDuration || '3:00',
    achievement: row.achievement || '100% Shipped Live Code',
    display_order: Number(row.display_order ?? row.displayOrder ?? 0),
    created_at: row.created_at || row.createdAt || new Date().toISOString(),
    updated_at: row.updated_at ? String(row.updated_at) : null
  };
}

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const urlStr = req.url || '/api/success-stories';
    const parsedUrl = new URL(urlStr, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/\/+$/, '');
    const supabaseInfo = getSupabase();

    // 1. GET /api/success-stories
    if (req.method === 'GET') {
      if (supabaseInfo) {
        try {
          const { data, error } = await supabaseInfo.client
            .from('success_stories')
            .select('*')
            .order('display_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (!error && Array.isArray(data)) {
            return res.status(200).json({
              success: true,
              total: data.length,
              data: data.map(normalizeStory),
              source: 'supabase'
            });
          }
          if (error) {
            console.error('Supabase query error for success_stories:', error);
          }
        } catch (e) {
          console.warn('Supabase query error for success_stories:', e);
        }
      }

      // Fallback only if database is unreachable
      return res.status(200).json({
        success: true,
        total: DEFAULT_SUCCESS_STORIES.length,
        data: DEFAULT_SUCCESS_STORIES.map(normalizeStory),
        source: 'fallback'
      });
    }

    // 2. POST /api/success-stories (Add new success story)
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const studentName = (body.student_name || body.studentName || '').trim();
      const projectDescription = (body.project_description || body.projectDescription || '').trim();
      const studentDetails = (body.student_details || body.studentDetails || body.quote || '').trim();
      const videoUrl = (body.video_url || body.videoUrl || '').trim();
      const role = (body.role || 'Batch 01 Graduate • Full-Stack AI Builder').trim();
      const thumbnailUrl = (body.thumbnail_url || body.thumbnailUrl || '').trim();
      const videoDuration = (body.video_duration || body.videoDuration || '3:00').trim();
      const achievement = (body.achievement || '100% Shipped Live Code').trim();
      const displayOrder = Number(body.display_order ?? body.displayOrder ?? 0);

      if (!studentName || !projectDescription || !studentDetails) {
        return res.status(400).json({
          success: false,
          message: 'Student Name, Project Description, and Student Details are required.'
        });
      }

      const payload = {
        student_name: studentName,
        project_description: projectDescription,
        student_details: studentDetails,
        video_url: videoUrl,
        role,
        thumbnail_url: thumbnailUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        video_duration: videoDuration,
        achievement,
        display_order: displayOrder,
        created_at: new Date().toISOString()
      };

      if (!supabaseInfo) {
        return res.status(500).json({
          success: false,
          message: 'Database connection is not configured. SUPABASE_URL and key are required.'
        });
      }

      const { data, error } = await supabaseInfo.client
        .from('success_stories')
        .insert(payload)
        .select('*')
        .single();

      if (error) {
        console.error('Supabase insert success_story error:', error);
        return res.status(500).json({
          success: false,
          message: `Database error inserting story: ${error.message}`
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Success story saved to database successfully.',
        data: normalizeStory(data),
        source: 'supabase'
      });
    }

    // 3. PUT / PATCH /api/success-stories/:id (Edit success story)
    if (req.method === 'PUT' || req.method === 'PATCH') {
      const body = await parseBody(req);
      const match = pathname.match(/\/api\/success-stories\/(\d+)/);
      const id = match ? Number(match[1]) : Number(req.query?.id || body?.id);

      if (!id) {
        return res.status(400).json({ success: false, message: 'Valid success story ID is required for update.' });
      }

      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };

      if (body.student_name !== undefined || body.studentName !== undefined) {
        updateData.student_name = String(body.student_name ?? body.studentName).trim();
      }
      if (body.role !== undefined) updateData.role = String(body.role).trim();
      if (body.project_description !== undefined || body.projectDescription !== undefined) {
        updateData.project_description = String(body.project_description ?? body.projectDescription).trim();
      }
      if (body.student_details !== undefined || body.studentDetails !== undefined || body.quote !== undefined) {
        updateData.student_details = String(body.student_details ?? body.studentDetails ?? body.quote).trim();
      }
      if (body.video_url !== undefined || body.videoUrl !== undefined) {
        updateData.video_url = String(body.video_url ?? body.videoUrl).trim();
      }
      if (body.thumbnail_url !== undefined || body.thumbnailUrl !== undefined) {
        updateData.thumbnail_url = String(body.thumbnail_url ?? body.thumbnailUrl).trim();
      }
      if (body.video_duration !== undefined || body.videoDuration !== undefined) {
        updateData.video_duration = String(body.video_duration ?? body.videoDuration).trim();
      }
      if (body.achievement !== undefined) updateData.achievement = String(body.achievement).trim();
      if (body.display_order !== undefined || body.displayOrder !== undefined) {
        updateData.display_order = Number(body.display_order ?? body.displayOrder);
      }

      if (!supabaseInfo) {
        return res.status(500).json({
          success: false,
          message: 'Database connection is not configured. SUPABASE_URL and key are required.'
        });
      }

      const { data, error } = await supabaseInfo.client
        .from('success_stories')
        .update(updateData)
        .eq('id', id)
        .select('*');

      if (error) {
        console.error('Supabase update story error:', error);
        return res.status(500).json({
          success: false,
          message: `Database error updating story #${id}: ${error.message}`
        });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Success story #${id} not found in database.`
        });
      }

      return res.status(200).json({
        success: true,
        message: `Success story #${id} updated in database.`,
        data: normalizeStory(data[0]),
        source: 'supabase'
      });
    }

    // 4. DELETE /api/success-stories/:id (Delete success story)
    if (req.method === 'DELETE') {
      const match = pathname.match(/\/api\/success-stories\/(\d+)/);
      const id = match ? Number(match[1]) : Number(req.query?.id || (await parseBody(req))?.id);

      if (!id) {
        return res.status(400).json({ success: false, message: 'Valid success story ID is required for deletion.' });
      }

      if (!supabaseInfo) {
        return res.status(500).json({
          success: false,
          message: 'Database connection is not configured. SUPABASE_URL and key are required.'
        });
      }

      const { error } = await supabaseInfo.client
        .from('success_stories')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete story error:', error);
        return res.status(500).json({
          success: false,
          message: `Database error deleting story #${id}: ${error.message}`
        });
      }

      return res.status(200).json({
        success: true,
        message: `Success story #${id} deleted successfully from database.`,
        source: 'supabase'
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('Success stories handler error:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Internal Server Error'
    });
  }
}
