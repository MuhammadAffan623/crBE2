import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const { combine, timestamp, printf } = format;

// Ensure the logs directory exists
const logDirectory = 'logs';
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return getColor(level)(
        `${timestamp} [${level.toUpperCase()}] ${message}`
      );
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDirectory, 'combined.log') }),
  ],
});

function getColor(level: string) {
  switch (level) {
    case 'error':
      return chalk.red;
    case 'warn':
      return chalk.yellow;
    case 'info':
      return chalk.cyan;
    case 'http':
      return chalk.rgb(145, 100, 80);
    case 'debug':
      return chalk.green;
    case 'verbose':
      return chalk.magenta;
    default:
      return chalk.white;
  }
}

export default logger;
