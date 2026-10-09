import { updatePaymentStatus, verifyAdminToken } from '../../_lib/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ success: false, message: 'Admin authentication required.' });
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const id = Number(req.query?.id);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const status = body.payment_status as 'Paid' | 'Unpaid';

    if (!['Paid', 'Unpaid'].includes(status)) {
      return res.status(400).json({ success: false, message: 'payment_status must be Paid or Unpaid' });
    }

    const result = await updatePaymentStatus(id, status);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
}
