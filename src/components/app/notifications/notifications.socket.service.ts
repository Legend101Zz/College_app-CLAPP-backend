import { Server } from 'socket.io';
import logger from '@core/utils/logger';
import StandardIOEventCalls from '@core/utils/socket';
import addNotification from './notifications.service';
import { INotifications } from './notications.interface';

// Function to handle notifications
const sendNotification = async (
  io: Server,
  notificationInput: INotifications,
): Promise<void> => {
  try {
    try {
      logger.debug('notificationInput', notificationInput);
      // Add the notification to the database
      await addNotification(notificationInput);

      // Emit the notification data to all connected clients
      io.emit(StandardIOEventCalls.notification, notificationInput);
      logger.info('Notification io done');
    } catch (error) {
      logger.error('Error adding notification:', error.message);
    }
  } catch (error) {
    throw new Error(`Error in IO server: ${error.message}`);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { sendNotification };
