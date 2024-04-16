import { Server } from 'socket.io';
import logger from '@core/utils/logger';
import StandardIOEventCalls from '@core/utils/socket';
import addNotification from './notifications.service';
import { INotifications } from './notications.interface';

// Function to handle notifications
const sendNotification = (io: Server) => {
  try {
    io.on(
      StandardIOEventCalls.notification,
      async (notificationInput: INotifications) => {
        try {
          // Add the notification to the database
          await addNotification(notificationInput);

          // Emit the notification data to all connected clients
          io.emit('notification', notificationInput);
        } catch (error) {
          logger.error('Error adding notification:', error.message);
        }
      },
    );
  } catch (error) {
    throw new Error(`Error in IO server: ${error.message}`);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { sendNotification };
