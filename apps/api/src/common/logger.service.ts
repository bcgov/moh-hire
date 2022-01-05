import { LoggerService } from '@nestjs/common';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';
import postToSlack from './slack';

export class Logger implements LoggerService {
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

  log(message: unknown, ...optionalParams: unknown[]) {
    this.logger.log(message, optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    postToSlack({ message, optionalParams });
    this.logger.error(message, optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    this.logger.warn(message, optionalParams);
  }
}
