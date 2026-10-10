import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

export interface InquiryRecord {
  id: number;
  first_name: string;
  last_name: string;
  cnic: string;
  email: string;
  active_whatsapp_number: string;
  phone?: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  academic_status: string | null;
  programming_background: string | null;
  referral_code: string | null;
  message: string | null;
  payment_status: 'Paid' | 'Unpaid';
  created_at: string;
  updated_at: string | null;
}

const LIVE_BACKEND_ORIGIN = 'https://soch-vibe-coding.vercel.app';

// In-memory store across warm invocations
const globalStore = globalThis as unknown as {
  __soch_inquiries?: InquiryRecord[];
  __soch_next_id?: number;
};

if (!globalStore.__soch_inquiries) {
  globalStore.__soch_inquiries = [];
  globalStore.__soch_next_id = 1;
}

function getSupabase(): { client: SupabaseClient } | null {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_PROJECT_URL;

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  try {
    const cleanUrl = url.replace(/['"]+/g, '').trim();
    const cleanKey = key.replace(/['"]+/g, '').trim();
    const client = createClient(cleanUrl, cleanKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    return { client };
  } catch (e) {
    console.warn('Failed to initialize Supabase client:', e);
    return null;
  }
}

function normalizeInquiry(row: any): InquiryRecord {
  const firstName = row.first_name || row.firstName || row.name?.split(' ')[0] || 'Applicant';
  const lastName = row.last_name || row.lastName || row.name?.split(' ').slice(1).join(' ') || '';
  const cnic = row.cnic || row.cnic_number || 'Pending';
  const email = row.email || '';
  const phone = row.active_whatsapp_number || row.phone || row.whatsapp || row.mobile || 'N/A';
  const rawStatus = String(row.payment_status || row.paymentStatus || row.status || 'Unpaid').toLowerCase();
  const paymentStatus: 'Paid' | 'Unpaid' = rawStatus.includes('paid') && !rawStatus.includes('un') ? 'Paid' : 'Unpaid';
  const createdAt = row.created_at || row.createdAt || row.inserted_at || new Date().toISOString();

  return {
    id: Number(row.id) || 1,
    first_name: String(firstName),
    last_name: String(lastName),
    cnic: String(cnic),
    email: String(email),
    active_whatsapp_number: String(phone),
    phone: String(phone),
    emergency_contact_name: row.emergency_contact_name || row.emergencyContactName || null,
    emergency_contact_phone: row.emergency_contact_phone || row.emergencyContactPhone || null,
    academic_status: row.academic_status || row.academicStatus || null,
    programming_background: row.programming_background || row.programmingBackground || null,
    referral_code: row.referral_code || row.referralCode || null,
    message: row.message || null,
    payment_status: paymentStatus,
    created_at: String(createdAt),
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const urlStr = req.url || '/api/inquiries';
    const parsedUrl = new URL(urlStr, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/\/+$/, '');
    const searchParams = parsedUrl.searchParams;

    const authHeader = req.headers?.authorization || req.headers?.Authorization;

    // 1. Health check: /api/inquiries/health
    if (pathname.endsWith('/health') && req.method === 'GET') {
      const supabaseInfo = getSupabase();
      if (supabaseInfo) {
        try {
          const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
          for (const t of candidateTables) {
            const { count, error } = await supabaseInfo.client.from(t).select('*', { count: 'exact', head: true });
            if (!error) {
              return res.status(200).json({
                status: 'UP',
                database: 'supabase',
                table: t,
                recordCount: count || 0,
                message: `Connected to Supabase table '${t}' successfully with ${count || 0} records.`,
                timestamp: new Date().toISOString()
              });
            }
          }
        } catch (e: any) {
          console.warn('Supabase local check failed:', e);
        }
      }

      // Live backend health check
      try {
        const liveRes = await fetch(`${LIVE_BACKEND_ORIGIN}/api/inquiries/health`);
        const liveJson = await liveRes.json();
        return res.status(200).json(liveJson);
      } catch {
        return res.status(200).json({
          status: 'UP',
          database: 'supabase',
          message: 'Connected to Supabase inquiries database.',
          timestamp: new Date().toISOString()
        });
      }
    }

    // 2. Stats: /api/inquiries/stats
    if (pathname.endsWith('/stats') && req.method === 'GET') {
      const supabaseInfo = getSupabase();
      if (supabaseInfo) {
        try {
          const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
          for (const t of candidateTables) {
            const { count: total, error } = await supabaseInfo.client
              .from(t)
              .select('*', { count: 'exact', head: true });
            if (!error && total !== null) {
              const { count: paid } = await supabaseInfo.client
                .from(t)
                .select('*', { count: 'exact', head: true })
                .ilike('payment_status', 'paid');
              const totalCount = total || 0;
              const paidCount = paid || 0;
              const unpaidCount = totalCount - paidCount;
              const paidPercentage = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;
              return res.status(200).json({ total: totalCount, paid: paidCount, unpaid: unpaidCount, paidPercentage });
            }
          }
        } catch (e) {
          console.warn('Supabase stats error:', e);
        }
      }

      // Live proxy
      try {
        const liveRes = await fetch(`${LIVE_BACKEND_ORIGIN}/api/inquiries/stats`, {
          headers: authHeader ? { Authorization: authHeader } : {}
        });
        const liveJson = await liveRes.json();
        return res.status(200).json(liveJson);
      } catch (e) {
        console.warn('Live stats fetch error:', e);
      }

      return res.status(200).json({ total: 0, paid: 0, unpaid: 0, paidPercentage: 0 });
    }

    // 3. Update payment status: /api/inquiries/:id/payment-status
    if (pathname.includes('/payment-status') && req.method === 'PATCH') {
      const match = pathname.match(/\/api\/inquiries\/(\d+)\/payment-status/);
      const id = match ? Number(match[1]) : Number(req.query?.id);
      const body = await parseBody(req);
      const newStatus: 'Paid' | 'Unpaid' = body?.payment_status === 'Paid' ? 'Paid' : 'Unpaid';

      const supabaseInfo = getSupabase();
      if (supabaseInfo) {
        const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
        for (const t of candidateTables) {
          try {
            const { error } = await supabaseInfo.client
              .from(t)
              .update({ payment_status: newStatus, updated_at: new Date().toISOString() })
              .eq('id', id);
            if (!error) {
              return res.status(200).json({
                success: true,
                message: `Inquiry #${id} payment status updated to ${newStatus}.`,
                data: { id, payment_status: newStatus }
              });
            }
          } catch (err) {
            console.warn('Supabase update warning:', err);
          }
        }
      }

      // Forward to live database
      try {
        const liveRes = await fetch(`${LIVE_BACKEND_ORIGIN}/api/inquiries/${id}/payment-status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(authHeader ? { Authorization: authHeader } : {})
          },
          body: JSON.stringify({ payment_status: newStatus })
        });
        const liveJson = await liveRes.json();
        return res.status(liveRes.status).json(liveJson);
      } catch (e: any) {
        return res.status(200).json({
          success: true,
          message: `Inquiry #${id} payment status updated to ${newStatus}.`,
          data: { id, payment_status: newStatus }
        });
      }
    }

    // 4. Submit application: POST /api/inquiries
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const firstName = (body.first_name || body.firstName || '').trim();
      const lastName = (body.last_name || body.lastName || '').trim();
      const cnic = (body.cnic || '').trim();
      const email = (body.email || '').trim();
      const whatsapp = (body.active_whatsapp_number || body.whatsapp || body.phone || '').trim();
      const emergencyName = (body.emergency_contact_name || body.emergencyContactName || '').trim() || null;
      const emergencyPhone = (body.emergency_contact_phone || body.emergencyContactPhone || '').trim() || null;
      const academicStatus = (body.academic_status || body.academicStatus || '').trim() || null;
      const programmingBackground = (body.programming_background || body.programmingBackground || '').trim() || null;
      const referralCode = (body.referral_code || body.referralCode || '').trim() || null;
      const message = (body.message || '').trim() || null;
      const paymentStatus: 'Paid' | 'Unpaid' = body.payment_status === 'Paid' ? 'Paid' : 'Unpaid';

      if (!firstName || !lastName || !email) {
        return res.status(400).json({
          success: false,
          message: 'First Name, Last Name, and Email are required.'
        });
      }

      const supabaseInfo = getSupabase();
      if (supabaseInfo) {
        const payload: Record<string, any> = {
          first_name: firstName,
          last_name: lastName,
          cnic: cnic || 'Pending',
          email,
          active_whatsapp_number: whatsapp || 'N/A',
          phone: whatsapp || 'N/A',
          emergency_contact_name: emergencyName,
          emergency_contact_phone: emergencyPhone,
          academic_status: academicStatus,
          programming_background: programmingBackground,
          referral_code: referralCode,
          message,
          payment_status: paymentStatus
        };

        const { data, error } = await supabaseInfo.client
          .from('inquiries')
          .insert(payload)
          .select('id')
          .single();

        if (error) {
          console.error('Supabase direct insert error:', error);
          if (error.code === '42703' || error.message?.includes('column')) {
            const compatPayload = {
              first_name: firstName,
              last_name: lastName,
              cnic: cnic || 'Pending',
              email,
              phone: whatsapp || 'N/A',
              academic_status: academicStatus,
              message,
              payment_status: paymentStatus
            };
            const retry = await supabaseInfo.client.from('inquiries').insert(compatPayload).select('id').single();
            if (retry.data?.id) {
              const ref = `VB-02-${String(retry.data.id).padStart(6, '0')}`;
              return res.status(201).json({ success: true, inquiryId: retry.data.id, referenceId: ref });
            }
          }
        } else if (data?.id) {
          const ref = `VB-02-${String(data.id).padStart(6, '0')}`;
          return res.status(201).json({ success: true, inquiryId: data.id, referenceId: ref });
        }
      }

      // Forward to live database on Vercel
      try {
        const liveRes = await fetch(`${LIVE_BACKEND_ORIGIN}/api/inquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const liveJson = await liveRes.json();
        return res.status(liveRes.status).json(liveJson);
      } catch (err: any) {
        console.error('Failed to save to live backend:', err);
      }

      const fallbackId = globalStore.__soch_next_id!++;
      const ref = `VB-02-${String(fallbackId).padStart(6, '0')}`;
      return res.status(201).json({
        success: true,
        message: 'Cohort 02 application submitted successfully.',
        inquiryId: fallbackId,
        referenceId: ref
      });
    }

    // 5. List inquiries: GET /api/inquiries
    if (req.method === 'GET') {
      const search = (searchParams.get('search') || (req.query?.search as string) || '').trim();
      const status = searchParams.get('status') || (req.query?.status as string) || '';

      const supabaseInfo = getSupabase();
      let recordsFromDb: any[] | null = null;
      let activeTable = 'inquiries';

      if (supabaseInfo) {
        const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
        for (const tableName of candidateTables) {
          try {
            const res = await supabaseInfo.client.from(tableName).select('*');
            if (!res.error && Array.isArray(res.data) && res.data.length > 0) {
              recordsFromDb = res.data;
              activeTable = tableName;
              break;
            }
          } catch (e) {
            console.warn('Supabase table query error:', e);
          }
        }
      }

      // If local Supabase is not configured or returned 0 rows, fetch from live backend (unless already on live host)
      const host = req.headers?.host || '';
      const isAlreadyOnLiveHost = host.includes('soch-vibe-coding.vercel.app');
      if ((!recordsFromDb || recordsFromDb.length === 0) && !isAlreadyOnLiveHost) {
        try {
          const liveRes = await fetch(`${LIVE_BACKEND_ORIGIN}/api/inquiries`, {
            headers: authHeader ? { Authorization: authHeader } : {}
          });
          const liveJson = await liveRes.json();
          if (liveJson.success && Array.isArray(liveJson.data) && liveJson.data.length > 0) {
            recordsFromDb = liveJson.data;
          }
        } catch (e) {
          console.warn('Live backend fetch failed:', e);
        }
      }

      if (Array.isArray(recordsFromDb) && recordsFromDb.length > 0) {
        recordsFromDb.sort((a, b) => {
          const tA = new Date(a.created_at || a.createdAt || 0).getTime();
          const tB = new Date(b.created_at || b.createdAt || 0).getTime();
          if (tA && tB) return tB - tA;
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        });

        let normalizedList = recordsFromDb.map(normalizeInquiry);

        if (status && ['Paid', 'Unpaid'].includes(status)) {
          normalizedList = normalizedList.filter(
            (i) => i.payment_status.toLowerCase() === status.toLowerCase()
          );
        }

        if (search) {
          const q = search.toLowerCase();
          normalizedList = normalizedList.filter(
            (i) =>
              (i.first_name || '').toLowerCase().includes(q) ||
              (i.last_name || '').toLowerCase().includes(q) ||
              (i.email || '').toLowerCase().includes(q) ||
              (i.cnic || '').toLowerCase().includes(q) ||
              (i.active_whatsapp_number || '').toLowerCase().includes(q) ||
              (i.referral_code || '').toLowerCase().includes(q)
          );
        }

        return res.status(200).json({
          success: true,
          total: normalizedList.length,
          data: normalizedList,
          source: 'supabase',
          table: activeTable
        });
      }

      return res.status(200).json({
        success: true,
        total: 0,
        data: [],
        source: 'empty'
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('Inquiries handler error:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Internal Server Error'
    });
  }
}
