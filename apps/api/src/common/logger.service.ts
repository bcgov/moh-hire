import { LoggerService } from '@nestjs/common';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';
import postToSlack from './slack';
import axios, { AxiosError } from 'axios';

export class AppLogger implements LoggerService {
  private logger;

  constructor() {
    this.logger = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            process.env.RUNTIME_ENV === 'local'
              ? nestWinstonModuleUtilities.format.nestLike('EHPR', { prettyPrint: true })
              : winston.format.json(),
          ),
        }),
      ],
      exitOnError: false,
    });
  }

  log(message: unknown, context?: string) {
    this.logger.log(message, context);
  }

  error(e: unknown, context?: string) {
    const error = e as Error & { response?: Error };
    let message: string | object = error.message;

    if (typeof e === 'string') {
      message = e;
    }

    if (axios.isAxiosError(e)) {
      message = {
        data: (e as AxiosError).response?.data,
        url: (e as AxiosError).response?.config.url,
      };
    }

    // For handling manually crafted validation error message arrays, see 'exceptionFactory' in 'app.config.ts'
    if (error.response?.message) {
      message = error.response?.message;
    }

    postToSlack({ message, stack: error.stack, context });
    this.logger.error(message, error.stack, context);
  }

  warn(message: unknown, context?: string) {
    this.logger.warn(message, context);
  }
}
