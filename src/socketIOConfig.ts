import { Server } from 'socket.io';
import logger from '@core/utils/logger';

// Export a function that takes the Socket.IO instance as a parameter
const configureSocketIO = (io: Server) => {
  io.on('connection', (socket) => {
    logger.info('A user connected');
    socket.emit('connected', 'Hello from server');

    socket.on('disconnect', () => {
      logger.info('User disconnected');
    });
  });
};

export default configureSocketIO;
