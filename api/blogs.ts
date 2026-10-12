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
    console.error('[blogs] Supabase client initialization exception:', e);
    return null;
  }
}

export interface BlogRecord {
  id: number;
  blog_heading: string;
  blog_details: string;
  blog_image: string;
  read_time: string;
  published_date: string;
  author: string;
  display_order: number;
  created_at: string;
  updated_at: string | null;
}

const DEFAULT_BLOGS: BlogRecord[] = [
  {
    id: 1,
    blog_heading: 'How Local Developers are Shaping the Future',
    blog_details: 'Pakistan is no longer just a rising star in the global tech scene; it’s a full-blown supernova, especially when it comes to Artificial Intelligence. From bustling tech hubs in Lahore and Karachi to emerging innovation centers like Haripur, local developers are not just adopting AI—they’re actively shaping its future.',
    blog_image: 'https://vibeacademy.info/wp-content/uploads/2026/05/How-Local-Developers-are-Shaping-the-Future.png',
    read_time: '5 min read',
    published_date: 'May 2026',
    author: 'Engr. Adil Khan',
    display_order: 1,
    created_at: new Date('2026-05-01').toISOString(),
    updated_at: null
  },
  {
    id: 2,
    blog_heading: "Navigating Pakistan's Gig Economy with AI Superpowers",
    blog_details: 'The freelance game has changed, and if you’re not integrating AI, you’re already playing catch-up. Pakistan’s freelance workforce, already the 4th largest globally, is entering a new era: Freelancing 2.0 where prompt directorship and architecture replace manual typing.',
    blog_image: 'https://vibeacademy.info/wp-content/uploads/2026/05/Navigating.png',
    read_time: '6 min read',
    published_date: 'May 2026',
    author: 'Dr. Zeeshan Haider (UOH BIC)',
    display_order: 2,
    created_at: new Date('2026-05-05').toISOString(),
    updated_at: null
  },
  {
    id: 3,
    blog_heading: 'Why AI Skills are Non-Negotiable for Pakistani Builders in 2026: A Deep Dive',
    blog_details: 'Let’s be real: the tech landscape of 2026 is vastly different from even a few years ago. For Pakistani coders, having AI skills isn’t a bonus anymore; it’s a fundamental requirement to stay relevant, competitive, and deploy production software at scale.',
    blog_image: 'https://vibeacademy.info/wp-content/uploads/2026/05/Why-AI-Skills-are-Non-Negotiable-for-Pakistani-Builders.png',
    read_time: '7 min read',
    published_date: 'May 2026',
    author: 'SOCH Editorial Board',
    display_order: 3,
    created_at: new Date('2026-05-10').toISOString(),
    updated_at: null
  }
];

function normalizeBlog(row: any): BlogRecord {
  return {
    id: Number(row.id) || 1,
    blog_heading: row.blog_heading || row.heading || row.title || 'Vibe Shift Article',
    blog_details: row.blog_details || row.details || row.desc || row.content || '',
    blog_image: row.blog_image || row.image_url || row.image || row.img || 'https://vibeacademy.info/wp-content/uploads/2026/05/How-Local-Developers-are-Shaping-the-Future.png',
    read_time: row.read_time || row.readTime || '5 min read',
    published_date: row.published_date || row.publishedDate || row.date || 'May 2026',
    author: row.author || 'SOCH Editorial Board',
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
    const urlStr = req.url || '/api/blogs';
    const parsedUrl = new URL(urlStr, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/\/+$/, '');
    const supabaseInfo = getSupabase();

    // 1. GET /api/blogs
    if (req.method === 'GET') {
      if (supabaseInfo) {
        try {
          const { data, error } = await supabaseInfo.client
            .from('blogs')
            .select('*')
            .order('display_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (!error && Array.isArray(data)) {
            return res.status(200).json({
              success: true,
              total: data.length,
              data: data.map(normalizeBlog),
              source: 'supabase'
            });
          }
          if (error) {
            console.error('Supabase query error for blogs:', error);
          }
        } catch (e) {
          console.warn('Supabase query error for blogs:', e);
        }
      }

      // Fallback only if database is unreachable
      return res.status(200).json({
        success: true,
        total: DEFAULT_BLOGS.length,
        data: DEFAULT_BLOGS.map(normalizeBlog),
        source: 'fallback'
      });
    }

    // 2. POST /api/blogs (Add new blog)
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const heading = (body.blog_heading || body.heading || body.title || '').trim();
      const details = (body.blog_details || body.details || body.desc || body.content || '').trim();
      const image = (body.blog_image || body.image_url || body.image || body.img || '').trim();
      const readTime = (body.read_time || body.readTime || '5 min read').trim();
      const publishedDate = (body.published_date || body.publishedDate || body.date || 'May 2026').trim();
      const author = (body.author || 'SOCH Editorial Board').trim();
      const displayOrder = Number(body.display_order ?? body.displayOrder ?? 0);

      if (!heading || !details || !image) {
        return res.status(400).json({
          success: false,
          message: 'Blog Heading, Blog Details, and Blog Image are required.'
        });
      }

      const payload = {
        blog_heading: heading,
        blog_details: details,
        blog_image: image,
        read_time: readTime,
        published_date: publishedDate,
        author,
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
        .from('blogs')
        .insert(payload)
        .select('*')
        .single();

      if (error) {
        console.error('Supabase insert blog error:', error);
        return res.status(500).json({
          success: false,
          message: `Database error inserting blog: ${error.message}`
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Blog article saved to database successfully.',
        data: normalizeBlog(data),
        source: 'supabase'
      });
    }

    // 3. PUT / PATCH /api/blogs/:id (Edit blog)
    if (req.method === 'PUT' || req.method === 'PATCH') {
      const body = await parseBody(req);
      const match = pathname.match(/\/api\/blogs\/(\d+)/);
      const id = match ? Number(match[1]) : Number(req.query?.id || body?.id);

      if (!id) {
        return res.status(400).json({ success: false, message: 'Valid blog ID is required for update.' });
      }

      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };

      if (body.blog_heading !== undefined || body.title !== undefined) {
        updateData.blog_heading = String(body.blog_heading ?? body.title).trim();
      }
      if (body.blog_details !== undefined || body.details !== undefined || body.desc !== undefined) {
        updateData.blog_details = String(body.blog_details ?? body.details ?? body.desc).trim();
      }
      if (body.blog_image !== undefined || body.image_url !== undefined || body.img !== undefined) {
        updateData.blog_image = String(body.blog_image ?? body.image_url ?? body.img).trim();
      }
      if (body.read_time !== undefined || body.readTime !== undefined) {
        updateData.read_time = String(body.read_time ?? body.readTime).trim();
      }
      if (body.published_date !== undefined || body.date !== undefined) {
        updateData.published_date = String(body.published_date ?? body.date).trim();
      }
      if (body.author !== undefined) updateData.author = String(body.author).trim();
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
        .from('blogs')
        .update(updateData)
        .eq('id', id)
        .select('*');

      if (error) {
        console.error('Supabase update blog error:', error);
        return res.status(500).json({
          success: false,
          message: `Database error updating blog #${id}: ${error.message}`
        });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Blog article #${id} not found in database.`
        });
      }

      return res.status(200).json({
        success: true,
        message: `Blog article #${id} updated in database.`,
        data: normalizeBlog(data[0]),
        source: 'supabase'
      });
    }

    // 4. DELETE /api/blogs/:id (Delete blog)
    if (req.method === 'DELETE') {
      const match = pathname.match(/\/api\/blogs\/(\d+)/);
      const id = match ? Number(match[1]) : Number(req.query?.id || (await parseBody(req))?.id);

      if (!id) {
        return res.status(400).json({ success: false, message: 'Valid blog ID is required for deletion.' });
      }

      if (!supabaseInfo) {
        return res.status(500).json({
          success: false,
          message: 'Database connection is not configured. SUPABASE_URL and key are required.'
        });
      }

      const { error } = await supabaseInfo.client
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete blog error:', error);
        return res.status(500).json({
          success: false,
          message: `Database error deleting blog #${id}: ${error.message}`
        });
      }

      return res.status(200).json({
        success: true,
        message: `Blog #${id} deleted successfully from database.`,
        source: 'supabase'
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('Blogs handler error:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Internal Server Error'
    });
  }
}
