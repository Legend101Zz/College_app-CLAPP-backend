import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import User from './user.model';
import { assert } from 'console';
// this service reads the user data and uses query to get specific data if needed

type UserIncludeFields = Array<keyof IUser>;
const read = async (
  userId: number,
  includeFields?: UserIncludeFields,
): Promise<Partial<IUser>> => {
  // Fetch user data from the database
  let query = User.findById(userId);

  if (includeFields && includeFields.length > 0) {
    // If includeFields is provided, select only the specified fields
    query = query.select(includeFields.join(' '));
  }
  // Execute the query
  const userData = await query.exec();

  if (!userData) {
    // Handle the case where the user is not found
    return {};
  }

  // Convert the Mongoose document to a plain JavaScript object
  const userObject = userData.toObject();

  return userObject as Partial<IUser>;
};

const update = (user: IUser): boolean => {
  userStorage = userStorage.map((u) =>
    u.id === user.id ? { ...u, updatedField: 1 } : u,
  );
  return true;
};

const deleteById = (id: string) => {
  userStorage = userStorage.filter((user) => user.id !== id);
  logger.debug(`User ${id} has been removed`);
  return true;
};

export { create, read, update, deleteById };
