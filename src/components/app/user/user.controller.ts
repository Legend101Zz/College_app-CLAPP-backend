import { Request, Response } from 'express';
import httpStatus from 'http-status';
import logger from '@core/utils/logger';
import { read, UserIncludeFields } from '@components/app/user/user.service';
import { IUser } from './user.interface';

const getUserData = (req: Request, res: Response) => {
  // getting userId from params
  const userId = req.params.id;
  const options = req.query;

  try {
    // Check if includeFields option is provided in query
    const includeFields: UserIncludeFields | undefined = options.includeFields
      ? (options.includeFields as UserIncludeFields)
      : undefined;

    // Use the userService read function
    const userData = await userService.read(userId, includeFields);

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
