/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { errorlogger, logger } from './shared/logger';
import dotenv from 'dotenv'
process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});
dotenv.config()

let server: Server;

async function run() {
  try {
    
    await mongoose.connect(process.env.mongo_url  as string);
    // logger.info(`🛢   Database is connected successfully`);
    console.log(`🛢   Database is connected successfully`);

    server = app.listen(process.env.PORT, () => {
      // logger.info(`Application  listening on port ${config.port}`);
      console.log(`Application  listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

run();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
