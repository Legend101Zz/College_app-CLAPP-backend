// registerGiver.ts

import { User } from '../user/user.model';
import GiverModel from './giver.model';
import { IGiver } from './giver.interface';
import { update } from '../user/user.service';

const registerGiver = async (userId: string): Promise<IGiver> => {
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
        category: 'rookie',
      },
      ResponseTime: 0,
      Wallet: [],
      Tasks: [],
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

export default registerGiver;
