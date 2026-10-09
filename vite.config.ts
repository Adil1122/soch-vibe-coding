import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api')) {
            return next();
          }
          try {
            const { default: handler } = await server.ssrLoadModule('/api/index.ts');
            let body = {};
            if (req.method === 'POST' || req.method === 'PATCH') {
              const buffers: Buffer[] = [];
              for await (const chunk of req) {
                buffers.push(Buffer.from(chunk));
              }
              const data = Buffer.concat(buffers).toString();
              if (data) {
                try {
                  body = JSON.parse(data);
                } catch {
                  body = data;
                }
              }
            }
            (req as any).body = body;
            const urlObj = new URL(req.url, 'http://localhost:3000');
            const routeSegments = urlObj.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean);
            (req as any).query = {
              route: routeSegments,
              ...Object.fromEntries(urlObj.searchParams.entries())
            };
            (res as any).status = (code: number) => {
              res.statusCode = code;
              return res;
            };
            (res as any).json = (data: any) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            await handler(req, res);
          } catch (err: any) {
            console.error('API dev middleware error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
  },
});

