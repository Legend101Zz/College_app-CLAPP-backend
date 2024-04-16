import { Request, Response } from 'express';
import { Server } from 'socket.io';
import httpStatus from 'http-status';
import logger from '@core/utils/logger';
import { INotifications } from './notications.interface';
import { sendNotification } from './notifications.socket.service';

// Controller function to handle notification requests
const handleNotificationRequest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Extract notification data from the request body
    const notificationInput: INotifications = req.body;
    console.log(req.body);
    const io: Server = req.app.get('io');
    // Pass the notification data to the sendNotification service
    sendNotification(io, notificationInput);

    // Send a No Content response with status code 204
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    logger.error(error);

    // Send an Internal Server Error response with status code 500
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleNotificationRequest };
