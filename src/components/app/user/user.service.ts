import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

// this service reads the user data and uses query to get specific data if needed

type UserIncludeFields = Array<keyof IUser>;
const read = (
  userId: number,
  includeFields?: UserIncludeFields,
): Partial<IUser> => {
  // Fetch user data from the database
  let userData: IUser;

  if (includeFields && includeFields.length > 0) {
    // Create a type that includes only the specified fields
    type IncludedFields = Pick<IUser, typeof includeFields[number]>;

    // Use Pick to create a type with the included fields
    type PartialUserData = Partial<IncludedFields>;

    // Create a partial user data object
    const partialUserData: PartialUserData = includeFields.reduce(
      (acc, key) => {
        acc[key] = userData[key] as PartialUserData[keyof PartialUserData];
        return acc;
      },
      {} as PartialUserData,
    );

    return partialUserData;
  }
  // Return an empty partial user data object if no fields are specified
  return {};
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
