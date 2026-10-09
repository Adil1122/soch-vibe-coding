import { checkHealth } from './_lib/store';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const health = await checkHealth();
  return res.status(200).json({
    name: 'SOCH Vibe Coding API',
    version: '1.0.0',
    endpoints: [
      '/api/inquiries',
      '/api/inquiries/health',
      '/api/inquiries/stats',
      '/api/inquiries/:id/payment-status',
      '/api/auth/login',
      '/api/auth/me'
    ],
    ...health
  });
}
