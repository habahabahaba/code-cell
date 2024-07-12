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
  .action(async (filename = 'cells.js', options: ServeOptions) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(+options.port, path.basename(filename), dir);
      console.log(`
        Code-Cell successfully opened ${filename}. Navigate to http://localhost:${options.port} to continue working with cells.
        `);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'EADDRINUSE'
      ) {
        console.log(
          'THIS PORT IS ALREADY IN USE. Try running Code-Cell on a different port. (serve -p [new port number]).'
        );
      } else if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(
          `There was a problem while executing the serve command: ${JSON.stringify(error)}`
        );
      }
      process.exit(1);
    }
  });
