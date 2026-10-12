import inquiriesHandler from './inquiries';
import authHandler from './auth';
import successStoriesHandler from './success-stories';
import blogsHandler from './blogs';
import uploadHandler from './upload';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const urlStr = req.url || '/api';

    if (urlStr.includes('/api/inquiries')) {
      return await inquiriesHandler(req, res);
    }

    if (urlStr.includes('/api/auth')) {
      return await authHandler(req, res);
    }

    if (urlStr.includes('/api/success-stories')) {
      return await successStoriesHandler(req, res);
    }

    if (urlStr.includes('/api/blogs')) {
      return await blogsHandler(req, res);
    }

    if (urlStr.includes('/api/upload')) {
      return await uploadHandler(req, res);
    }

    return res.status(200).json({
      name: 'SOCH Vibe Coding API',
      status: 'UP',
      version: '1.1.0',
      endpoints: [
        '/api/inquiries',
        '/api/inquiries/:id',
        '/api/inquiries/health',
        '/api/inquiries/stats',
        '/api/inquiries/:id/payment-status',
        '/api/success-stories',
        '/api/success-stories/:id',
        '/api/blogs',
        '/api/blogs/:id',
        '/api/upload',
        '/api/auth/login',
        '/api/auth/me'
      ]
    });
  } catch (err: any) {
    console.error('API Index Handler error:', err);
    return res.status(500).json({
      error: 'API handler failure',
      message: err?.message || 'Internal server error'
    });
  }
}
