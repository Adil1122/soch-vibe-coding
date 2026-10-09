import { getInquiries, deleteInquiry, verifyAdminToken, InquiryRecord } from '../_lib/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ success: false, message: 'Admin authentication required.' });
  }

  const id = Number(req.query?.id);

  try {
    if (req.method === 'GET') {
      const all = await getInquiries();
      const item = all.find((i: InquiryRecord) => i.id === id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.status(200).json({ success: true, data: item });
    }

    if (req.method === 'DELETE') {
      const result = await deleteInquiry(id);
      return res.status(200).json(result);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
}
