// import mongoose from 'mongoose';
import { User } from '../user/user.model';
import Doer from './doer.model';
// import { IDoer } from './doer.interface';
import { IDoer, ISkills } from './doer.interface';
import { update } from '../user/user.service';

interface IRegisterDoerParams {
  userId: string;
  FullName: string;
  DisName: string;
  Description: string;
  Skills: ISkills[];
  Education: string;
  Experience: string;
  LinkedIn: string;
  walletId: string;
  taskIds: string[];
  Specialtags: string[];
}

const registerDoer = async ({
  userId,
  FullName,
  DisName,
  Description,
  Skills,
  Education,
  Experience,
  LinkedIn,
  walletId,
  taskIds,
  Specialtags,
}: IRegisterDoerParams): Promise<IDoer> => {
  try {
    const user = await User.findById(userId);
    const userIdStr = userId.toString();
    if (!user) {
      throw new Error('User not found');
    }
    const existingDoer = await Doer.findOne({ userId });

    if (existingDoer) {
      throw new Error('Giver already registered for this user');
    }
    const newDoer: IDoer = new Doer({
      FullName,
      DisName,
      Description,
      Skills,
      Education,
      Experience,
      LinkedIn,
      walletId,
      Tasks: taskIds.map((taskId) => ({ taskId })),
      userId,
      Specialtags,
    });
    // const savedDoer = await newDoer.save();
    const savedDoer = await newDoer.save();

    await update(userIdStr, {
      isTaker: { check: true, takerId: savedDoer._id },
    });
    return savedDoer;
  } catch (error) {
    throw new Error(`Error registering giver: ${error.message}`);
  }
};

const deleteDoerTask = async (
  userId: string,
  taskId: string,
): Promise<IDoer> => {
  try {
    const doer = await Doer.findOne({ userId });

    if (!doer) {
      throw new Error('Doer not found');
    }

    // Assuming you have a 'Tasks' array with 'taskId' properties in your 'Doer' model
    doer.Tasks = doer.Tasks.filter((task) => task.taskId.toString() !== taskId);

    // Save the updated doer
    await doer.save();

    return doer;
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};

const updateDoerUsingUserId = async (
  userId: string,
  updateData: any,
): Promise<IDoer> => {
  try {
    const updatedDoer = await Doer.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true },
    );

    if (!updatedDoer) {
      throw new Error('Doer not found for updating');
    }

    return updatedDoer;
  } catch (error) {
    throw new Error(`Error updating doer: ${error.message}`);
  }
};

const getDoerByUserId = async (userId: string): Promise<IDoer | null> => {
  try {
    const doer = await Doer.findOne({ userId });

    return doer;
  } catch (error) {
    throw new Error(`Error getting giver data by userId: ${error.message}`);
  }
};

type DoerIncludeFields = Array<keyof IDoer> | Array<IDoer>;

const read = async (
  userId: string,
  includeFields?: DoerIncludeFields,
): Promise<Partial<IDoer> | null> => {
  try {
    let query = Doer.findOne({ userId });

    if (includeFields && includeFields.length > 0) {
      const fieldProjection: Record<string, 1> = {};
      includeFields.forEach((field) => {
        fieldProjection[field as string] = 1;
      });
      query = query.select(fieldProjection);
    }

    // Log the MongoDB query
    // console.log('MongoDB Query:', query.getQuery());

    const DoerData = await query.exec();

    return DoerData ? await DoerData.toObject() : null;
  } catch (error) {
    // console.error('Error in giverService.read:', error);
    return null;
  }
};

export default {
  registerDoer,
  deleteDoerTask,
  updateDoerUsingUserId,
  getDoerByUserId,
  read,
};
