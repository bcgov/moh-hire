import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { helloWorld } from '@ehpr/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(helloWorld());
  await app.listen(3000);
}
bootstrap();
