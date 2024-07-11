// 3rd party:
import path from 'path';
import { Command } from 'commander';
// From Workspace:
import { serve } from '@code-cell/local-api';

// Types, interfaces and enumns:
interface ServeOptions {
  port: string;
}

// Commands:
export const serveCommand = new Command()
  .command('serve [filename]') // [filename] is optional
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run code-cell server on', '5311')
  .action((filename = 'cells.js', options: ServeOptions) => {
    const dir = path.join(process.cwd(), path.dirname(filename));

    serve(+options.port, path.basename(filename), dir);
  });
