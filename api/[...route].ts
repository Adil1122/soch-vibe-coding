import {
  createInquiry,
  getInquiries,
  getStats,
  updatePaymentStatus,
  deleteInquiry,
  loginAdmin,
  verifyAdminToken,
  checkHealth
} from './_lib/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse path from req.query.route or req.url
  let segments: string[] = [];
  if (Array.isArray(req.query?.route)) {
    segments = req.query.route;
  } else if (typeof req.query?.route === 'string') {
    segments = [req.query.route];
  } else {
    const url = new URL(req.url, 'http://localhost');
    segments = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean);
  }

  const p0 = segments[0] || '';
  const p1 = segments[1] || '';
  const p2 = segments[2] || '';

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  try {
    // 1. /api/inquiries/health
    if (p0 === 'inquiries' && p1 === 'health' && req.method === 'GET') {
      const health = await checkHealth();
      return res.status(200).json(health);
    }

    // 2. /api/inquiries/stats
    if (p0 === 'inquiries' && p1 === 'stats' && req.method === 'GET') {
      if (token && !verifyAdminToken(token)) {
        return res.status(401).json({ success: false, message: 'Invalid admin token' });
      }
      const stats = await getStats();
      return res.status(200).json(stats);
    }

    // 3. /api/inquiries/:id/payment-status
    if (p0 === 'inquiries' && p1 && p2 === 'payment-status' && req.method === 'PATCH') {
      if (!token || !verifyAdminToken(token)) {
        return res.status(401).json({ success: false, message: 'Admin authentication required.' });
      }
      const id = Number(p1);
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const result = await updatePaymentStatus(id, body.payment_status);
      return res.status(200).json(result);
    }

    // 4. /api/inquiries/:id (GET or DELETE)
    if (p0 === 'inquiries' && p1 && !p2 && !isNaN(Number(p1))) {
      const id = Number(p1);
      if (req.method === 'GET') {
        const list = await getInquiries();
        const item = list.find((i) => i.id === id);
        if (!item) return res.status(404).json({ success: false, message: 'Not found' });
        return res.status(200).json({ success: true, data: item });
      }
      if (req.method === 'DELETE') {
        if (!token || !verifyAdminToken(token)) {
          return res.status(401).json({ success: false, message: 'Admin authentication required.' });
        }
        const result = await deleteInquiry(id);
        return res.status(200).json(result);
      }
    }

    // 5. /api/inquiries (GET or POST)
    if (p0 === 'inquiries' && !p1) {
      if (req.method === 'POST') {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
        const result = await createInquiry(body);
        return res.status(201).json(result);
      }
      if (req.method === 'GET') {
        if (token && !verifyAdminToken(token)) {
          return res.status(401).json({ success: false, message: 'Invalid admin token' });
        }
        const search = (req.query?.search as string) || '';
        const status = (req.query?.status as string) || '';
        const data = await getInquiries({ search, status });
        return res.status(200).json({ success: true, total: data.length, data });
      }
    }

    // 6. /api/auth/login
    if (p0 === 'auth' && p1 === 'login' && req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const result = loginAdmin(body.username, body.password);
      return res.status(200).json(result);
    }

    // 7. /api/auth/me
    if (p0 === 'auth' && p1 === 'me' && req.method === 'GET') {
      if (!token || !verifyAdminToken(token)) {
        return res.status(401).json({ authenticated: false, message: 'Invalid token' });
      }
      return res.status(200).json({
        authenticated: true,
        user: { role: 'admin', username: 'admin', displayName: 'SOCH Administrator' }
      });
    }

    // Default root /api
    if (!p0) {
      return res.status(200).json({ status: 'ok', service: 'SOCH Vibe Coding API' });
    }

    return res.status(404).json({ error: 'Endpoint not found', path: `/${segments.join('/')}` });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message || 'Error processing request' });
  }
}
