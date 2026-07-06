import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const localPojianVideoPath = env.LOCAL_POJIAN_VIDEO_PATH;

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'local-private-video',
          apply: 'serve',
          configureServer(server) {
            server.middlewares.use('/secure-video/pojian.mp4', (req, res) => {
              if (!localPojianVideoPath || !fs.existsSync(localPojianVideoPath)) {
                res.statusCode = 404;
                res.end('Local video file not configured.');
                return;
              }

              const stat = fs.statSync(localPojianVideoPath);
              const range = req.headers.range;

              res.setHeader('Accept-Ranges', 'bytes');
              res.setHeader('Content-Type', 'video/mp4');

              if (!range) {
                res.setHeader('Content-Length', stat.size);
                fs.createReadStream(localPojianVideoPath).pipe(res);
                return;
              }

              const [startText, endText] = range.replace(/bytes=/, '').split('-');
              const start = Number.parseInt(startText, 10);
              const end = endText ? Number.parseInt(endText, 10) : stat.size - 1;

              if (Number.isNaN(start) || Number.isNaN(end) || start >= stat.size || end >= stat.size) {
                res.statusCode = 416;
                res.setHeader('Content-Range', `bytes */${stat.size}`);
                res.end();
                return;
              }

              res.statusCode = 206;
              res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
              res.setHeader('Content-Length', end - start + 1);
              fs.createReadStream(localPojianVideoPath, { start, end }).pipe(res);
            });
          },
        },
      ],
      base: process.env.VERCEL ? '/' : process.env.NODE_ENV === 'production' ? '/LuN3cy/' : '/',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
