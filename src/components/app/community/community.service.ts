import mongoose from 'mongoose';
import CommunityModel from './community.model';
import { ICommunity } from './community.interface';

interface IRegisterCommunityParams {
  name: string;
  doer: string[];
  giver: string;
  manager: string;
  task: string;
  rooms: string[];
}

const createCommunityService = async ({
  name,
  doer,
  giver,
  manager,
  task,
  rooms,
}: IRegisterCommunityParams): Promise<ICommunity> => {
  try {
    const community = await CommunityModel.create({
      name,
      doer: doer.map((id) => new mongoose.Types.ObjectId(id)), // Convert each string id to ObjectId
      giver: new mongoose.Types.ObjectId(giver), // Convert giver to ObjectId
      manager: new mongoose.Types.ObjectId(manager), // Convert manager to ObjectId
      task: new mongoose.Types.ObjectId(task), // Convert task to ObjectId
      rooms: rooms.map((id) => new mongoose.Types.ObjectId(id)), // Convert each string id to ObjectId
      createdAt: new Date(), // Correct way to set createdAt field
    });

    return community;
  } catch (error) {
    throw new Error(`Error registering community: ${error.message}`);
  }
};

export default createCommunityService;
