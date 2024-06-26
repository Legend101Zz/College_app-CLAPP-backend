import { Types } from 'mongoose';
import { User } from '../user/user.model';
import GiverModel from './giver.model';
// import TaskModel from '../task/task.model';
import { IGiver } from './giver.interface';
import { update } from '../user/user.service';

interface IRegisterGiverParams {
  userId: string;
  badgeCategory?: string;
  responseTime?: number;
  walletId?: string;
  taskIds: string[];
}

const registerGiver = async ({
  userId,
  badgeCategory,
  responseTime,
  walletId,
  taskIds,
}: IRegisterGiverParams): Promise<IGiver> => {
  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if a giver already exists for the user
    const existingGiver = await GiverModel.findOne({ userId });

    if (existingGiver) {
      throw new Error('Giver already registered for this user');
    }

    // Create a new giver
    const newGiver: IGiver = new GiverModel({
      Badge: badgeCategory ? { category: badgeCategory } : undefined,
      ResponseTime: responseTime,
      Wallet: walletId,
      Tasks: taskIds.map((taskId) => ({ taskId })),
      userId,
    });

    // Save the giver
    const savedGiver = await newGiver.save();

    // Update the user to set isGiver to true
    await update(userId, { isGiver: { check: true, giverId: savedGiver._id } });

    return savedGiver;
  } catch (error) {
    throw new Error(`Error registering giver: ${error.message}`);
  }
};

const deleteGiverTask = async (
  userId: string,
  taskId: string,
): Promise<IGiver> => {
  try {
    const giver = await GiverModel.findById(userId);

    if (!giver) {
      throw new Error('Giver not found;');
    }

    // giver.tasks = giver.tasks.filter((taskIdInArray) => taskIdInArray !== taskId);
    giver.Tasks = giver.Tasks.filter(
      (task) => task.taskId.toString() !== taskId,
    );
    // Save the updated giver
    await giver.save();

    return giver;
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};

const updateGiverusingGiverId = async (
  giverId: string,
  updateData: any,
): Promise<IGiver> => {
  try {
    const updatedGiver = await GiverModel.findByIdAndUpdate(
      giverId,
      { $set: updateData },
      { new: true },
    );

    if (!updatedGiver) {
      throw new Error('Giver not found for updating');
    }

    return updatedGiver;
  } catch (error) {
    throw new Error(`Error updating giver: ${error.message}`);
  }
};

const updateGiverusingUserId = async (
  userId: string,
  updateData: any,
): Promise<IGiver> => {
  try {
    const updatedGiver = await GiverModel.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true },
    );

    if (!updatedGiver) {
      throw new Error('Giver not found for updating');
    }

    return updatedGiver;
  } catch (error) {
    throw new Error(`Error updating giver: ${error.message}`);
  }
};

const getGiverByUserId = async (userId: string): Promise<IGiver | null> => {
  try {
    const giver = await GiverModel.findOne({ userId });

    return giver;
  } catch (error) {
    throw new Error(`Error getting giver data by userId: ${error.message}`);
  }
};

const getGiverByGiverId = async (giverId: string): Promise<IGiver | null> => {
  try {
    const giver = await GiverModel.findById(giverId);

    return giver;
  } catch (error) {
    throw new Error(`Error getting giver data by giverId: ${error.message}`);
  }
};

type GiverIncludeFields = Array<keyof IGiver> | Array<IGiver>;

const read = async (
  userId: string,
  includeFields?: GiverIncludeFields,
): Promise<Partial<IGiver> | null> => {
  try {
    let query = GiverModel.findById(userId);

    if (includeFields && includeFields.length > 0) {
      const fieldProjection: Record<string, 1> = {};
      includeFields.forEach((field) => {
        fieldProjection[field as string] = 1;
      });
      query = query.select(fieldProjection);
    }

    // Log the MongoDB query
    // console.log('MongoDB Query:', query.getQuery());

    const giverData = await query.exec();

    return giverData ? await giverData.toObject() : null;
  } catch (error) {
    // console.error('Error in giverService.read:', error);
    return null;
  }
};

const validateGiver = async (
  taskId: string,
  giverId: string,
): Promise<boolean> => {
  try {
    // Check if the taskId and giverId are valid MongoDB ObjectIds
    if (!Types.ObjectId.isValid(taskId) || !Types.ObjectId.isValid(giverId)) {
      throw new Error('Invalid taskId or giverId');
    }

    // Find the giver with the provided giverId and check if it has the given taskId associated
    const giver = await GiverModel.findOne({
      _id: giverId,
      Tasks: { $elemMatch: { taskId } },
    });

    // If giver is found with the taskId associated, return true
    return !!giver;
  } catch (error) {
    throw new Error(
      `Error validating giver's task association: ${error.message}`,
    );
  }
};

export type { GiverIncludeFields };
export default {
  registerGiver,
  deleteGiverTask,
  updateGiverusingGiverId,
  updateGiverusingUserId,
  getGiverByUserId,
  getGiverByGiverId,
  read,
  validateGiver,
};
