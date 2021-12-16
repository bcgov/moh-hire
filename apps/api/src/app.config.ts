import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';

import { AppModule } from './app.module';
import { Documentation } from './common/documentation';
import { SuccessResponseInterceptor } from './common/interceptors/success-response.interceptor';
import { ErrorExceptionFilter } from './common/error-exception.filter';
import { TrimPipe } from './common/trim.pipe';
import { API_PREFIX } from './config';

const logger = () =>
  WinstonModule.createLogger({
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
export async function createNestApp(): Promise<{
  app: NestExpressApplication;
  expressApp: express.Application;
}> {
  // Express app
  const expressApp = express();
  // Nest Application With Express Adapter
  let app: NestExpressApplication;
  if (process.env.RUNTIME_ENV === 'local') {
    app = await NestFactory.create(AppModule, {
      logger: logger(),
    });
  } else {
    app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    // Adding winston logger
    app.useLogger(logger());
  }

  // Api prefix api/v1/
  app.setGlobalPrefix(API_PREFIX);

  // Enabling Documentation
  if (process.env.NODE_ENV !== 'prod') {
    Documentation(app);
  }

  // Interceptor
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  // Validation pipe
  app.useGlobalPipes(
    new TrimPipe(),
    // new ValidationPipe({
    //   transform: true,
    //   whitelist: true,
    //   forbidNonWhitelisted: false,
    //   enableDebugMessages: true,
    // }),
  );

  // Global Error Filter
  app.useGlobalFilters(new ErrorExceptionFilter(app.get(Logger)));

  // Printing the environment variables
  console.table({
    project: process.env.PROJECT,
    nodeEnv: process.env.NODE_ENV,
    runtimeEnv: process.env.RUNTIME_ENV,
  });

  return {
    app,
    expressApp,
  };
}
