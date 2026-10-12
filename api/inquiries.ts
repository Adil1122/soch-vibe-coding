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
    console.error('[inquiries] Supabase client initialization exception:', e);
    return null;
  }
}

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

function sendJson(res: any, status: number, data: any) {
  try {
    if (typeof res.status === 'function') {
      res.status(status);
      if (typeof res.json === 'function') {
        return res.json(data);
      }
    } else {
      res.statusCode = status;
    }
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(data));
  } catch (e) {
    console.error('[inquiries] Failed to send JSON response:', e);
    try {
      res.statusCode = status;
      res.end(JSON.stringify(data));
    } catch {}
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : (res.statusCode = 200, res.end());
  }

  try {
    const urlStr = req.url || '/api/inquiries';
    const parsedUrl = new URL(urlStr, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/\/+$/, '');
    const searchParams = parsedUrl.searchParams;

    // Detect path segment from URL, query param (passed by Vercel rewrite), or Vercel headers
    const pathParam = String(
      (Array.isArray(req.query?.path) ? req.query.path.join('/') : req.query?.path) ||
      searchParams.get('path') ||
      ''
    );
    const matchedHeader = String(
      req.headers['x-matched-path'] ||
      req.headers['x-forwarded-uri'] ||
      req.headers['x-original-url'] ||
      ''
    );

    const fullPath = `${pathname}/${pathParam} ${urlStr} ${matchedHeader}`.toLowerCase();
    const supabaseInfo = getSupabase();

    // 1. Health check: /api/inquiries/health
    const isHealthCheck = fullPath.includes('health') || pathname.endsWith('/health');
    if (isHealthCheck && req.method === 'GET') {
      let recordCount = 0;
      let dbConnected = false;
      let dbWarning = null;

      if (supabaseInfo) {
        try {
          const { count, error } = await supabaseInfo.client
            .from('inquiries')
            .select('*', { count: 'exact', head: true });

          if (!error) {
            recordCount = count || 0;
            dbConnected = true;
          } else {
            dbWarning = error.message;
            console.warn('[health] Supabase health check query error:', error.message);
          }
        } catch (e: any) {
          dbWarning = e?.message;
          console.warn('[health] Supabase health check exception:', e);
        }
      }

      return sendJson(res, 200, {
        status: 'UP',
        database: dbConnected ? 'supabase' : 'offline',
        table: 'inquiries',
        recordCount,
        warning: dbWarning,
        message: dbConnected
          ? `Connected to Supabase table 'inquiries' successfully with ${recordCount} records.`
          : dbWarning
          ? `Inquiries API is UP, Supabase query: ${dbWarning}`
          : 'Connected to inquiries service (Supabase credentials missing or invalid in environment).',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Stats: /api/inquiries/stats
    const isStatsCheck = fullPath.includes('stats') || pathname.endsWith('/stats');
    if (isStatsCheck && req.method === 'GET') {
      if (supabaseInfo) {
        try {
          const { count: total, error } = await supabaseInfo.client
            .from('inquiries')
            .select('*', { count: 'exact', head: true });

          if (!error && total !== null) {
            const { count: paid } = await supabaseInfo.client
              .from('inquiries')
              .select('*', { count: 'exact', head: true })
              .ilike('payment_status', 'paid');

            const totalCount = total || 0;
            const paidCount = paid || 0;
            const unpaidCount = totalCount - paidCount;
            const paidPercentage = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;
            return sendJson(res, 200, { total: totalCount, paid: paidCount, unpaid: unpaidCount, paidPercentage });
          }
        } catch (e) {
          console.warn('[stats] Supabase stats error:', e);
        }
      }

      return sendJson(res, 200, { total: 0, paid: 0, unpaid: 0, paidPercentage: 0 });
    }

    // Determine ID from URL or query
    const idMatch = `${pathname}/${pathParam} ${urlStr}`.match(/(?:inquiries\/|\/)(\d+)(?:\/|$|\?)/);
    const id = idMatch ? Number(idMatch[1]) : (req.query?.id ? Number(req.query.id) : null);

    // 3. Update payment status: PATCH /api/inquiries/:id/payment-status
    const isPaymentStatus = fullPath.includes('payment-status');
    if (isPaymentStatus && req.method === 'PATCH') {
      const body = await parseBody(req);
      const targetId = id || Number(body?.id);
      const newStatus: 'Paid' | 'Unpaid' = body?.payment_status === 'Paid' ? 'Paid' : 'Unpaid';

      if (!targetId) {
        return sendJson(res, 400, { success: false, message: 'Valid inquiry ID is required.' });
      }

      if (!supabaseInfo) {
        return sendJson(res, 500, { success: false, message: 'Database connection is not configured.' });
      }

      const { data, error } = await supabaseInfo.client
        .from('inquiries')
        .update({ payment_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', targetId)
        .select('*');

      if (error) {
        console.error('[inquiries] Supabase update payment status error:', error);
        return sendJson(res, 500, {
          success: false,
          message: `Database error updating payment status: ${error.message}`
        });
      }

      return sendJson(res, 200, {
        success: true,
        message: `Inquiry #${targetId} payment status updated to ${newStatus} in database.`,
        data: data && data.length > 0 ? normalizeInquiry(data[0]) : { id: targetId, payment_status: newStatus },
        source: 'supabase'
      });
    }

    // 4. Update full inquiry record: PUT / PATCH /api/inquiries/:id
    if ((req.method === 'PUT' || req.method === 'PATCH') && !isPaymentStatus) {
      const body = await parseBody(req);
      const targetId = id || Number(body?.id);

      if (!targetId) {
        return sendJson(res, 400, { success: false, message: 'Valid inquiry ID is required for update.' });
      }

      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };

      if (body.first_name !== undefined) updateData.first_name = String(body.first_name).trim();
      if (body.last_name !== undefined) updateData.last_name = String(body.last_name).trim();
      if (body.cnic !== undefined) updateData.cnic = String(body.cnic).trim();
      if (body.email !== undefined) updateData.email = String(body.email).trim();
      if (body.active_whatsapp_number !== undefined || body.phone !== undefined) {
        const phone = String(body.active_whatsapp_number || body.phone).trim();
        updateData.active_whatsapp_number = phone;
        updateData.phone = phone;
      }
      if (body.emergency_contact_name !== undefined) updateData.emergency_contact_name = body.emergency_contact_name ? String(body.emergency_contact_name).trim() : null;
      if (body.emergency_contact_phone !== undefined) updateData.emergency_contact_phone = body.emergency_contact_phone ? String(body.emergency_contact_phone).trim() : null;
      if (body.academic_status !== undefined) updateData.academic_status = body.academic_status ? String(body.academic_status).trim() : null;
      if (body.programming_background !== undefined) updateData.programming_background = body.programming_background ? String(body.programming_background).trim() : null;
      if (body.referral_code !== undefined) updateData.referral_code = body.referral_code ? String(body.referral_code).trim() : null;
      if (body.message !== undefined) updateData.message = body.message ? String(body.message).trim() : null;
      if (body.payment_status !== undefined) {
        const rawStatus = String(body.payment_status).toLowerCase();
        updateData.payment_status = rawStatus.includes('paid') && !rawStatus.includes('un') ? 'Paid' : 'Unpaid';
      }

      if (!supabaseInfo) {
        return sendJson(res, 500, { success: false, message: 'Database connection is not configured.' });
      }

      const { data, error } = await supabaseInfo.client
        .from('inquiries')
        .update(updateData)
        .eq('id', targetId)
        .select('*');

      if (error) {
        console.error('[inquiries] Supabase update inquiry error:', error);
        return sendJson(res, 500, {
          success: false,
          message: `Database error updating inquiry #${targetId}: ${error.message}`
        });
      }

      if (!data || data.length === 0) {
        return sendJson(res, 404, { success: false, message: `Inquiry #${targetId} not found in database.` });
      }

      return sendJson(res, 200, {
        success: true,
        message: `Inquiry #${targetId} updated successfully in database.`,
        data: normalizeInquiry(data[0]),
        source: 'supabase'
      });
    }

    // 5. Delete inquiry: DELETE /api/inquiries/:id
    if (req.method === 'DELETE') {
      const body = await parseBody(req);
      const targetId = id || Number(body?.id);

      if (!targetId) {
        return sendJson(res, 400, { success: false, message: 'Valid inquiry ID is required for deletion.' });
      }

      if (!supabaseInfo) {
        return sendJson(res, 500, { success: false, message: 'Database connection is not configured.' });
      }

      const { error } = await supabaseInfo.client
        .from('inquiries')
        .delete()
        .eq('id', targetId);

      if (error) {
        console.error('[inquiries] Supabase delete inquiry error:', error);
        return sendJson(res, 500, {
          success: false,
          message: `Database error deleting inquiry #${targetId}: ${error.message}`
        });
      }

      return sendJson(res, 200, {
        success: true,
        message: `Inquiry #${targetId} permanently deleted from database.`,
        source: 'supabase'
      });
    }

    // 6. Submit application / Add inquiry: POST /api/inquiries
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
        return sendJson(res, 400, {
          success: false,
          message: 'First Name, Last Name, and Email are required.'
        });
      }

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
        payment_status: paymentStatus,
        created_at: new Date().toISOString()
      };

      if (!supabaseInfo) {
        return sendJson(res, 500, {
          success: false,
          message: 'Database connection is not configured.'
        });
      }

      const { data, error } = await supabaseInfo.client
        .from('inquiries')
        .insert(payload)
        .select('*')
        .single();

      if (error) {
        console.error('[inquiries] Supabase direct insert error:', error);
        return sendJson(res, 500, {
          success: false,
          message: `Database error submitting inquiry: ${error.message}`
        });
      }

      const normalized = normalizeInquiry(data);
      const ref = `VB-02-${String(normalized.id).padStart(6, '0')}`;
      return sendJson(res, 201, {
        success: true,
        message: 'Cohort 02 application submitted successfully and stored in database.',
        inquiryId: normalized.id,
        referenceId: ref,
        data: normalized,
        source: 'supabase'
      });
    }

    // 7. Get single inquiry by ID OR List inquiries: GET /api/inquiries
    if (req.method === 'GET') {
      if (!supabaseInfo) {
        return sendJson(res, 500, {
          success: false,
          message: 'Database connection is not configured. Please check SUPABASE_URL and SUPABASE_ANON_KEY.'
        });
      }

      if (id) {
        const { data, error } = await supabaseInfo.client
          .from('inquiries')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) {
          return sendJson(res, 404, { success: false, message: `Inquiry #${id} not found.` });
        }
        return sendJson(res, 200, { success: true, data: normalizeInquiry(data), source: 'supabase' });
      }

      const search = (searchParams.get('search') || (req.query?.search as string) || '').trim();
      const status = searchParams.get('status') || (req.query?.status as string) || '';

      const { data, error } = await supabaseInfo.client
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[inquiries] Supabase query inquiries error:', error);
        return sendJson(res, 500, {
          success: false,
          message: `Database error loading inquiries: ${error.message}`
        });
      }

      let normalizedList = (data || []).map(normalizeInquiry);

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

      return sendJson(res, 200, {
        success: true,
        total: normalizedList.length,
        data: normalizedList,
        source: 'supabase'
      });
    }

    return sendJson(res, 405, { message: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[inquiries] Handler uncaught exception:', err);
    return sendJson(res, 500, {
      success: false,
      message: err?.message || 'Internal Server Error'
    });
  }
}
