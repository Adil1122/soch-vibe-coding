import * as crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'soch_vibe_coding_secret_key_2026';

function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [data, signature] = parts;
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
    return signature === expected;
  } catch {
    return false;
  }
}

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
  } catch (e) {
    console.error('[auth] Failed to send JSON response:', e);
    try {
      res.statusCode = status;
      res.end(JSON.stringify(data));
    } catch {}
  }
}

async function parseBody(req: any) {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }
  try {
    const buffers: Buffer[] = [];
    for await (const chunk of req) {
      buffers.push(Buffer.from(chunk));
    }
    const raw = Buffer.concat(buffers).toString('utf-8');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status ? res.status(200).end() : (res.statusCode = 200, res.end());
  }

  try {
    const urlStr = req.url || '/api/auth';
    const parsedUrl = new URL(urlStr, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/\/+$/, '');
    const pathParam = String(
      (Array.isArray(req.query?.path) ? req.query.path.join('/') : req.query?.path) ||
      parsedUrl.searchParams.get('path') ||
      ''
    );
    const matchedHeader = String(
      req.headers['x-matched-path'] ||
      req.headers['x-forwarded-uri'] ||
      req.headers['x-original-url'] ||
      ''
    );
    const fullPath = `${pathname}/${pathParam} ${urlStr} ${matchedHeader}`.toLowerCase();

    // /api/auth/login
    const isLogin = fullPath.includes('login') || pathname.endsWith('/login');
    if (isLogin && req.method === 'POST') {
      const body = await parseBody(req);
      const username = (body.username || '').trim().toLowerCase();
      const password = (body.password || '').trim();

      const defaultUser = (process.env.ADMIN_USER || 'admin').toLowerCase();
      const defaultPass = process.env.ADMIN_PASS || 'admin123';

      if (
        (username === defaultUser || username === 'admin@soch.pk' || username === 'admin@vibeacademy.info') &&
        password === defaultPass
      ) {
        const payload = { username, role: 'admin', iat: Date.now() };
        const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
        const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
        const token = `${data}.${signature}`;

        return sendJson(res, 200, {
          success: true,
          token,
          user: {
            username,
            role: 'admin',
            displayName: 'SOCH Administrator'
          }
        });
      }

      return sendJson(res, 401, {
        success: false,
        message: 'Invalid administrator credentials.'
      });
    }

    // /api/auth/me
    const isMe = fullPath.includes('/me') || fullPath.endsWith('me') || pathname.endsWith('/me');
    if (isMe && req.method === 'GET') {
      const authHeader = req.headers?.authorization || req.headers?.Authorization;
      const token = authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

      if (!token || !verifyToken(token)) {
        return sendJson(res, 401, { authenticated: false, message: 'Invalid or expired token' });
      }

      return sendJson(res, 200, {
        authenticated: true,
        user: { role: 'admin', username: 'admin', displayName: 'SOCH Administrator' }
      });
    }

    return sendJson(res, 404, { message: 'Auth route not found' });
  } catch (err: any) {
    console.error('[auth] Handler exception:', err);
    return sendJson(res, 500, { success: false, message: err?.message || 'Internal Server Error' });
  }
}
