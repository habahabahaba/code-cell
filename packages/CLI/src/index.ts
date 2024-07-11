// From packages:
// import serve from '@code-cell/local-api';
// 3rd party:
import { program } from 'commander';
// Commands:
import { serveCommand } from './commands/serve.js';

program.addCommand(serveCommand);

program.parse(process.argv);
