import { createInquiry, getInquiries, verifyAdminToken } from './_lib/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const result = await createInquiry(body);
      return res.status(201).json(result);
    }

    if (req.method === 'GET') {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
      
      // If auth token provided and invalid, reject; else allow read for inquiries
      if (token && !verifyAdminToken(token)) {
        return res.status(401).json({ success: false, message: 'Invalid or expired admin token.' });
      }

      const search = (req.query?.search as string) || '';
      const status = (req.query?.status as string) || '';
      const data = await getInquiries({ search, status });

      return res.status(200).json({
        success: true,
        total: data.length,
        data
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  }
}
