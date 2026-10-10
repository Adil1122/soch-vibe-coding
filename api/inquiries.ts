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

// In-memory store across warm invocations (fallback)
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

const JWT_SECRET = process.env.JWT_SECRET || 'soch_vibe_coding_secret_key_2026';

function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [data, signature] = parts;
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
    return signature === expected;
  } catch {
    return false;
  }
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
  // Safe CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const urlStr = req.url || '/api/inquiries';
    const parsedUrl = new URL(urlStr, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/\/+$/, '');
    const searchParams = parsedUrl.searchParams;

    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    const token = authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    // 1. Health check: /api/inquiries/health
    if (pathname.endsWith('/health') && req.method === 'GET') {
      const supabaseInfo = getSupabase();
      if (!supabaseInfo) {
        return res.status(200).json({
          status: 'WARNING',
          database: 'serverless-memory',
          message: 'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) not found in environment variables. Set them in Vercel Project Settings > Environment Variables.',
          timestamp: new Date().toISOString()
        });
      }

      try {
        const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
        let workingTable: string | null = null;
        let tableCount = 0;
        let lastErr: any = null;

        for (const t of candidateTables) {
          const { count, error } = await supabaseInfo.client.from(t).select('*', { count: 'exact', head: true });
          if (!error) {
            workingTable = t;
            tableCount = count || 0;
            break;
          } else {
            lastErr = error;
          }
        }

        if (workingTable) {
          return res.status(200).json({
            status: 'UP',
            database: 'supabase',
            table: workingTable,
            recordCount: tableCount,
            message: `Connected to Supabase table '${workingTable}' successfully with ${tableCount} records.`,
            timestamp: new Date().toISOString()
          });
        }

        return res.status(200).json({
          status: 'ERROR',
          database: 'supabase',
          message: `Supabase reached, but query returned error: ${lastErr?.message || 'Table not found'} (code: ${lastErr?.code}). Ensure table 'inquiries' exists.`,
          timestamp: new Date().toISOString()
        });
      } catch (err: any) {
        return res.status(200).json({
          status: 'ERROR',
          database: 'supabase',
          message: `Failed to connect to Supabase: ${err.message}`,
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

      const list = globalStore.__soch_inquiries || [];
      const total = list.length;
      const paid = list.filter((i) => i.payment_status === 'Paid').length;
      const unpaid = total - paid;
      const paidPercentage = total > 0 ? Math.round((paid / total) * 100) : 0;
      return res.status(200).json({ total, paid, unpaid, paidPercentage });
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
            if (!error) break;
          } catch (err) {
            console.warn('Supabase update warning:', err);
          }
        }
      }

      const item = globalStore.__soch_inquiries?.find((i) => i.id === id);
      if (item) {
        item.payment_status = newStatus;
        item.updated_at = new Date().toISOString();
      }

      return res.status(200).json({
        success: true,
        message: `Inquiry #${id} payment status updated to ${newStatus}.`,
        data: item || { id, payment_status: newStatus }
      });
    }

    // 4. Single inquiry detail or delete: /api/inquiries/:id
    const singleMatch = pathname.match(/\/api\/inquiries\/(\d+)$/);
    if (singleMatch) {
      const id = Number(singleMatch[1]);
      const supabaseInfo = getSupabase();

      if (req.method === 'GET') {
        if (supabaseInfo) {
          const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
          for (const t of candidateTables) {
            const { data } = await supabaseInfo.client.from(t).select('*').eq('id', id).single();
            if (data) return res.status(200).json({ success: true, data: normalizeInquiry(data) });
          }
        }
        const item = globalStore.__soch_inquiries?.find((i) => i.id === id);
        if (!item) {
          return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }
        return res.status(200).json({ success: true, data: item });
      }

      if (req.method === 'DELETE') {
        if (supabaseInfo) {
          const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
          for (const t of candidateTables) {
            await supabaseInfo.client.from(t).delete().eq('id', id);
          }
        }
        const idx = globalStore.__soch_inquiries?.findIndex((i) => i.id === id) ?? -1;
        if (idx !== -1) {
          globalStore.__soch_inquiries?.splice(idx, 1);
        }
        return res.status(200).json({ success: true, message: `Inquiry #${id} deleted.` });
      }
    }

    // 5. Submit application: POST /api/inquiries
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

      let insertedId = globalStore.__soch_next_id!++;

      // AWAIT SUPABASE INSERTION
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
          console.error('Supabase insert error:', error);
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
              insertedId = retry.data.id;
            } else if (retry.error) {
              return res.status(500).json({
                success: false,
                message: `Supabase save failed: ${retry.error.message}`,
                details: retry.error
              });
            }
          } else {
            return res.status(500).json({
              success: false,
              message: `Supabase save failed: ${error.message}`,
              details: error
            });
          }
        } else if (data?.id) {
          insertedId = data.id;
        }
      }

      const referenceId = `VB-02-${String(insertedId).padStart(6, '0')}`;

      const newRecord: InquiryRecord = {
        id: insertedId,
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
        payment_status: paymentStatus,
        created_at: new Date().toISOString(),
        updated_at: null
      };

      globalStore.__soch_inquiries = globalStore.__soch_inquiries || [];
      globalStore.__soch_inquiries.unshift(newRecord);

      return res.status(201).json({
        success: true,
        message: 'Cohort 02 application submitted successfully.',
        inquiryId: insertedId,
        referenceId,
        data: {
          id: insertedId,
          firstName,
          lastName,
          cnic,
          email,
          whatsapp,
          paymentStatus
        }
      });
    }

    // 6. List inquiries: GET /api/inquiries
    if (req.method === 'GET') {
      const search = (searchParams.get('search') || (req.query?.search as string) || '').trim();
      const status = searchParams.get('status') || (req.query?.status as string) || '';

      const supabaseInfo = getSupabase();
      let recordsFromDb: any[] | null = null;
      let lastError: any = null;
      let activeTable = 'inquiries';

      if (supabaseInfo) {
        const candidateTables = ['inquiries', 'Inquiries', 'inquiry'];
        for (const tableName of candidateTables) {
          try {
            // Select all columns without strict ordering to avoid missing column error
            const res = await supabaseInfo.client.from(tableName).select('*');
            if (!res.error && Array.isArray(res.data)) {
              recordsFromDb = res.data;
              activeTable = tableName;
              if (res.data.length > 0) {
                break;
              }
            } else if (res.error) {
              lastError = res.error;
            }
          } catch (e) {
            lastError = e;
          }
        }
      }

      if (Array.isArray(recordsFromDb)) {
        // Sort in memory by created_at or id descending
        recordsFromDb.sort((a, b) => {
          const tA = new Date(a.created_at || a.createdAt || 0).getTime();
          const tB = new Date(b.created_at || b.createdAt || 0).getTime();
          if (tA && tB) return tB - tA;
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        });

        let normalizedList = recordsFromDb.map(normalizeInquiry);

        // Merge memory cache items if not already present
        for (const item of (globalStore.__soch_inquiries || [])) {
          if (!normalizedList.some(n => n.id === item.id || (n.email && n.email === item.email))) {
            normalizedList.unshift(item);
          }
        }

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
          table: activeTable,
          rawCount: recordsFromDb.length
        });
      }

      if (lastError) {
        console.error('Supabase query error in GET /api/inquiries:', lastError);
        return res.status(200).json({
          success: true,
          total: (globalStore.__soch_inquiries || []).length,
          data: globalStore.__soch_inquiries || [],
          source: 'memory-fallback',
          supabaseError: lastError.message || String(lastError),
          supabaseCode: lastError.code,
          hint: 'Ensure table inquiries exists in Supabase and RLS allows SELECT operations.'
        });
      }

      let list = [...(globalStore.__soch_inquiries || [])];

      if (status && ['Paid', 'Unpaid'].includes(status)) {
        list = list.filter((i) => i.payment_status.toLowerCase() === status.toLowerCase());
      }

      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
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
        total: list.length,
        data: list,
        source: 'memory'
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
