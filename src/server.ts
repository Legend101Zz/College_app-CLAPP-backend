import { Server } from 'http';
import socketIO from 'socket.io';
import app from '@app';
import config from '@config/config';
import logger from '@core/utils/logger';
import errorHandler from 'core/utils/errorHandler';
import configureSocketIO from 'socketIOConfig';

const { port } = config;

const server: Server = app.listen(port, (): void => {
  logger.info(`Application listens on PORT: ${port}`);
});

// initialising socket server
const IO = new socketIO.Server(server, { cors: { origin: '*' } });
configureSocketIO(IO);
app.set('io', IO);

// console.log('checking IO2', IO);

const exitHandler = (): void => {
  if (app) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error): void => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    exitHandler();
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

export default IO;
