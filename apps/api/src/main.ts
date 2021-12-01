// Loading environment variables
// require('../env');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { Documentation } from './common/documentation';
import { SuccessResponseInterceptor } from './common/interceptors/success-response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ErrorExceptionFilter } from './common/error-exception.filter';
import { TrimPipe } from './common/trim.pipe';

async function bootstrap() {
  const transports: winston.transport[] = [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        process.env.RUNTIME_ENV === 'local'
          ? nestWinstonModuleUtilities.format.nestLike()
          : winston.format.json(),
      ),
    }),
  ];

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports,
      exitOnError: false,
    }),
  });

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  if (process.env.NODE_ENV !== 'prod') {
    Documentation(app);
  }

  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  // Add Validation pipe and whitelisting
  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
      enableDebugMessages: true,
    }),
  );

  app.useGlobalFilters(new ErrorExceptionFilter(app.get('Logger')));
  console.table({
    project: process.env.PROJECT,
    nodeEnv: process.env.NODE_ENV,
    runtimeEnv: process.env.RUNTIME_ENV,
  });
  await app.listen(process.env.APP_PORT || 4000);
}
bootstrap();
