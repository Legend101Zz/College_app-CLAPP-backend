import { Server } from 'socket.io';
import logger from '@core/utils/logger';

// Export a function that takes the Socket.IO instance as a parameter
const configureSocketIO = (io: Server) => {
  console.log(io);
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default configureSocketIO;
