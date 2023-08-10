import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sendDataExtract } from './scripts/send-data-extract';

/**
 * To be called by Lambda
 * @param event
 */
export const handler = async (event: { task: string }) => {
  const app = await NestFactory.createApplicationContext(AppModule);
  if (event.task === 'extract') {
    await sendDataExtract(app, 'Weekly Extract');
  }
  await app.close();
};

/**
 * To be locally run by Yarn
 */
if (require.main === module) {
  handler({ task: 'extract' });
}
