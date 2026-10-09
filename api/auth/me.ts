import { verifyAdminToken } from '../_lib/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ authenticated: false, message: 'Invalid or expired token' });
  }

  return res.status(200).json({
    authenticated: true,
    user: { role: 'admin', username: 'admin', displayName: 'SOCH Administrator' }
  });
}
