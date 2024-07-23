#!/usr/binenv node

// 3rd party:
import { program } from 'commander';
// Commands:
import { startCommand } from './commands/start.js';

program.addCommand(startCommand);

program.parse(process.argv);
