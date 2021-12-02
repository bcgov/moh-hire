import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Callback,
  Handler,
} from 'aws-lambda';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { API_PREFIX } from './config';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();

    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    nestApp.setGlobalPrefix(API_PREFIX);

    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
): Promise<APIGatewayProxyResult> => {
  const cachedServer = await bootstrap();
  return cachedServer(event, context, callback);
};
