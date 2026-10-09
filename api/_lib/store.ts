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

// In-memory persistent store across warm invocations
const globalStore = globalThis as unknown as {
  __soch_inquiries?: InquiryRecord[];
  __soch_next_id?: number;
};

if (!globalStore.__soch_inquiries) {
  globalStore.__soch_inquiries = [];
  globalStore.__soch_next_id = 1;
}

function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  } catch {
    return null;
  }
}

export async function createInquiry(body: any) {
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
    throw new Error('First Name, Last Name, and Email are required.');
  }

  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
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
        })
        .select('id')
        .single();

      if (!error && data?.id) {
        const id = data.id;
        const referenceId = `VB-02-${String(id).padStart(6, '0')}`;
        return {
          success: true,
          message: 'Cohort 02 application submitted successfully.',
          inquiryId: id,
          referenceId,
          data: {
            id,
            firstName,
            lastName,
            cnic,
            email,
            whatsapp,
            paymentStatus
          }
        };
      }
    } catch (err) {
      console.warn('Supabase insert failed, falling back to in-memory store:', err);
    }
  }

  // Resilient fallback storage
  const id = globalStore.__soch_next_id!++;
  const referenceId = `VB-02-${String(id).padStart(6, '0')}`;
  const record: InquiryRecord = {
    id,
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

  globalStore.__soch_inquiries!.unshift(record);

  return {
    success: true,
    message: 'Cohort 02 application submitted successfully.',
    inquiryId: id,
    referenceId,
    data: {
      id,
      firstName,
      lastName,
      cnic,
      email,
      whatsapp,
      paymentStatus
    }
  };
}

export async function getInquiries(params?: { search?: string; status?: string }) {
  const supabase = getSupabase();

  if (supabase) {
    try {
      let qb = supabase.from('inquiries').select('*');
      if (params?.status && ['Paid', 'Unpaid'].includes(params.status)) {
        qb = qb.eq('payment_status', params.status);
      }
      if (params?.search && params.search.trim()) {
        const s = params.search.trim();
        qb = qb.or(`first_name.ilike.%${s}%,last_name.ilike.%${s}%,email.ilike.%${s}%,cnic.ilike.%${s}%,active_whatsapp_number.ilike.%${s}%`);
      }
      qb = qb.order('created_at', { ascending: false });

      const { data, error } = await qb;
      if (!error && Array.isArray(data)) {
        return data as InquiryRecord[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to memory store:', err);
    }
  }

  let list = [...(globalStore.__soch_inquiries || [])];

  if (params?.status && ['Paid', 'Unpaid'].includes(params.status)) {
    list = list.filter((i) => i.payment_status === params.status);
  }

  if (params?.search && params.search.trim()) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(
      (i) =>
        i.first_name.toLowerCase().includes(q) ||
        i.last_name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.cnic.toLowerCase().includes(q) ||
        i.active_whatsapp_number.toLowerCase().includes(q) ||
        (i.referral_code && i.referral_code.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function getStats() {
  const list = await getInquiries();
  const total = list.length;
  const paid = list.filter((i) => i.payment_status === 'Paid').length;
  const unpaid = total - paid;
  const paidPercentage = total > 0 ? Math.round((paid / total) * 100) : 0;
  return { total, paid, unpaid, paidPercentage };
}

export async function updatePaymentStatus(id: number, status: 'Paid' | 'Unpaid') {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ payment_status: status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (!error) {
        return { success: true, message: `Inquiry #${id} status updated to ${status}.` };
      }
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }
  }

  const item = globalStore.__soch_inquiries?.find((i) => i.id === id);
  if (!item) {
    throw new Error(`Inquiry with ID ${id} not found.`);
  }

  item.payment_status = status;
  item.updated_at = new Date().toISOString();
  return { success: true, message: `Inquiry #${id} status updated to ${status}.`, data: item };
}

export async function deleteInquiry(id: number) {
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (!error) return { success: true, message: `Inquiry #${id} deleted.` };
    } catch (err) {
      console.warn('Supabase delete failed:', err);
    }
  }

  const idx = globalStore.__soch_inquiries?.findIndex((i) => i.id === id) ?? -1;
  if (idx !== -1) {
    globalStore.__soch_inquiries?.splice(idx, 1);
  }
  return { success: true, message: `Inquiry #${id} deleted.` };
}

const SECRET_KEY = process.env.JWT_SECRET || 'soch_vibe_coding_secret_key_2026';

export function loginAdmin(username?: string, password?: string) {
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'admin123';

  if (!username || !password) {
    throw new Error('Username and password are required.');
  }

  const u = username.trim().toLowerCase();
  const p = password.trim();

  if (
    (u === adminUser.toLowerCase() || u === 'admin@soch.pk' || u === 'admin@vibeacademy.info') &&
    p === adminPass
  ) {
    const payload = { username: u, role: 'admin', iat: Date.now() };
    const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('base64url');
    const token = `${data}.${signature}`;

    return {
      success: true,
      token,
      user: {
        username: u,
        role: 'admin',
        displayName: 'SOCH Administrator'
      }
    };
  }

  throw new Error('Invalid admin credentials.');
}

export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [data, signature] = parts;
    const expected = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('base64url');
    return signature === expected;
  } catch {
    return false;
  }
}

export async function checkHealth() {
  const supabase = getSupabase();
  let dbStatus = 'READY';

  if (supabase) {
    try {
      const { error } = await supabase.from('inquiries').select('id').limit(1);
      dbStatus = error ? 'CONFIGURED_WARNING' : 'UP';
    } catch {
      dbStatus = 'OFFLINE';
    }
  }

  return {
    status: 'UP',
    database: supabase ? 'supabase' : 'serverless-memory',
    dbConnection: dbStatus,
    timestamp: new Date().toISOString()
  };
}
