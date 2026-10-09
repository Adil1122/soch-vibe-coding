'use strict';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('reflect-metadata');
require('dotenv').config();

// Import from compiled backend (built via: npm --prefix backend run build)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NestFactory } = require('@nestjs/core');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ExpressAdapter } = require('@nestjs/platform-express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { AppModule } = require('../backend/dist/app.module');

// Lazy-cached Express app (reused across warm invocations)
let app = null;

async function getApp() {
  if (app) return app;

  const server = express();
  const adapter = new ExpressAdapter(server);
  const nestApp = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  nestApp.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await nestApp.init();
  app = server;
  return server;
}

// Vercel serverless handler
module.exports = async function handler(req, res) {
  const expressApp = await getApp();
  expressApp(req, res);
};
