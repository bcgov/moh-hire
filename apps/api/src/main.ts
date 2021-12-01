// Loading environment variables
// require('../env');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { helloWorld } from '@ehpr/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.table({
    project: process.env.PROJECT,
    nodeEnv: process.env.NODE_ENV,
    runtimeEnv: process.env.RUNTIME_ENV,
  });
  console.log(helloWorld());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
