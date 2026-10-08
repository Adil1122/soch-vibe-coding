import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend connection
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`NestJS server running locally on http://localhost:${port}`);
  logger.log(`Endpoints active:`);
  logger.log(`  POST   http://localhost:${port}/api/inquiries`);
  logger.log(`  GET    http://localhost:${port}/api/inquiries/health`);
  logger.log(`  GET    http://localhost:${port}/api/inquiries (Admin)`);
  logger.log(`  PATCH  http://localhost:${port}/api/inquiries/:id/payment-status (Admin)`);
  logger.log(`  POST   http://localhost:${port}/api/auth/login (Admin)`);
}

bootstrap();
