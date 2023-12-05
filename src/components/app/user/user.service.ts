import { IUser } from './user.interface';
import { User } from './user.model';

// ============ READ SERVICE ============

// this service reads the user data and uses query to get specific data if needed

type UserIncludeFields = Array<keyof IUser> | Array<IUser>;
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

// ============ UPDATE SERVICE ============

// Service function to update user details
// Define the type for the update object
type UserUpdate = {
  [key in keyof IUser]?: IUser[key];
};

const update = async (
  userId: String,
  updateObject: UserUpdate,
): Promise<IUser> => {
  // Ensure that the updateObject is not empty
  if (Object.keys(updateObject).length === 0) {
    throw new Error('Update object cannot be empty.');
  }

  try {
    // Update user fields based on the updateObject using updateOne
    const result = await User.updateOne(
      { _id: userId },
      { $set: updateObject },
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      throw new Error('User not found or no fields were modified.');
    }

    // Fetch the updated user document
    const updatedUser = await User.findById(userId);

    // If the user is not found, throw an error
    if (!updatedUser) {
      throw new Error('User not found after update.');
    }

    const userObject = updatedUser.toObject();
    return userObject as IUser;
  } catch (error) {
    throw new Error(`Error updating user details: ${error.message}`);
  }
};

// ============ DELETE SERVICE ============

const deleteUserById = async (userId: String): Promise<void> => {
  try {
    // Find the user by userId
    const user = await User.findById(userId);

    // If the user is not found, throw an error
    if (!user) {
      throw new Error('User not found.');
    }

    // Delete the user
    await user.deleteOne();
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

export { read, UserIncludeFields, update, deleteUserById };
