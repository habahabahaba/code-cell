// 3rd party:
import { createProxyMiddleware } from 'http-proxy-middleware';
// Express:
import express from 'express';
// Node:
import { dirname } from 'path';
import { createRequire } from 'module';

// Routes:
import createCellsRouter from './routes/cells.js';

export function serve(
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean = false
): Promise<void> {
  const app = express();

  // Adding routes:
  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: `http://localhost:5173`,
        ws: true,
        // logger: console, // logLevel: 'silent' is no longer available;
      })
    );
  } else {
    // Resolve the client path
    //   console.log('import.meta.url: ', import.meta.url);
    const require = createRequire(import.meta.url);
    const clientPath = require.resolve(
      '@code-cell/local-client/dist/index.html'
    );
    //   console.log('clientPath: ', clientPath);

    // Serve static files from the directory containing the resolved client path
    app.use(express.static(dirname(clientPath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
}
