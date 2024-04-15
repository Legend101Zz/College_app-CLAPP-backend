import mongoose from 'mongoose';
import logger from '@core/utils/logger';
import { INotifications } from './notications.interface';
import NotificationsModel from './notifications.model';

const addNotification = async (
  notificationInput: INotifications,
): Promise<void> => {
  try {
    // Create a new notification document based on the input
    const notification = new NotificationsModel(notificationInput);

    // Save the notification to the database
    await notification.save();

    logger.info('Notification added successfully');
  } catch (error) {
    throw new Error(`Error adding notification: ${error.message}`);
  }
};

export default addNotification;
