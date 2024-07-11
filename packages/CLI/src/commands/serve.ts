// 3rd party:
import { Command } from 'commander';
// From packages:
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
    serve(+options.port, filename, '/');
  });
