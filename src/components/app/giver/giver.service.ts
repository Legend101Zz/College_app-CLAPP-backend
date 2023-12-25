// registerGiver.ts

import { User } from '../user/user.model';
import GiverModel from './giver.model';
// import TaskModel from '../task/task.model';
import { IGiver } from './giver.interface';
import { update } from '../user/user.service';

interface IRegisterGiverParams {
  userId: string;
  badgeCategory: string;
  responseTime: number;
  walletId: string;
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
      Badge: {
        category: badgeCategory,
      },
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
    const giver = await GiverModel.findOne({ userId });

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

export default {
  registerGiver,
  deleteGiverTask,
};
