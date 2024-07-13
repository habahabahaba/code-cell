// 3rd party:
import { createProxyMiddleware } from 'http-proxy-middleware';
// Express:
import express from 'express';

export function serve(
  port: number,
  filename: string,
  dir: string
): Promise<void> {
  const app = express();

  app.use(
    createProxyMiddleware({
      target: `http://localhost:5173`,
      ws: true,
      //   logger: null, // logLevel: 'silent' is no longer available;
    })
  );

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
}
