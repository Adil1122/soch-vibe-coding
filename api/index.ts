import inquiriesHandler from './inquiries.ts';
import authHandler from './auth.ts';
import successStoriesHandler from './success-stories.ts';
import blogsHandler from './blogs.ts';
import uploadHandler from './upload.ts';

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
  } catch {
    try {
      res.statusCode = status;
      res.end(JSON.stringify(data));
    } catch {}
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : (res.statusCode = 200, res.end());
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

    return sendJson(res, 200, {
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
    return sendJson(res, 500, {
      error: 'API handler failure',
      message: err?.message || 'Internal server error'
    });
  }
}
