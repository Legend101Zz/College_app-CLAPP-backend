import { Request, Response } from 'express';
import httpStatus from 'http-status';
import logger from '@core/utils/logger';
import {
  read,
  UserIncludeFields,
  update,
} from '@components/app/user/user.service';

import { IUser } from './user.interface';

const getUserData = async (req: Request, res: Response) => {
  // getting userId from params
  const userId: number = parseInt(req.params.id, 10);
  const options = req.query;

  try {
    // Check if includeFields option is provided in query
    const includeFields: UserIncludeFields | undefined = options.includeFields
      ? (options.includeFields as UserIncludeFields)
      : undefined;

    // Use the userService read function
    const userData = await read(userId, includeFields);

    // Send the user data as a response with OK status (200)
    res.status(httpStatus.OK).json(userData);
  } catch (error) {
    // Handle any errors that occur during the process
    logger.error(error);

    // Send an Internal Server Error response with status code 500
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const updateUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const updateObject = req.body; // Assuming the request body contains the fields to update

    // Call the service to update user details
    const updatedUser = await update(userId, updateObject);

    // Send the updated user as a response with OK status (200)
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    // Handle any errors that occur during the process
    logger.error(error);

    // Send an Internal Server Error response with status code 500
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getUserData, updateUserData };
