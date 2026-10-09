import inquiriesHandler from './inquiries';
import authHandler from './auth';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const urlStr = req.url || '/api';

  if (urlStr.includes('/api/inquiries')) {
    return inquiriesHandler(req, res);
  }

  if (urlStr.includes('/api/auth')) {
    return authHandler(req, res);
  }

  return res.status(200).json({
    name: 'SOCH Vibe Coding API',
    status: 'UP',
    version: '1.0.0',
    endpoints: [
      '/api/inquiries',
      '/api/inquiries/health',
      '/api/inquiries/stats',
      '/api/inquiries/:id/payment-status',
      '/api/auth/login',
      '/api/auth/me'
    ]
  });
}
