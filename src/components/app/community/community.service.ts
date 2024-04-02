import mongoose from 'mongoose';
import { createDefaultRoomService } from '../room/room.service';
import CommunityModel from './community.model';
import { ICommunity } from './community.interface';

interface IRegisterCommunityParams {
  name: string;
  doer?: string[];
  giver: string;
  manager: string;
  task: string;
  rooms?: string[];
}

const createCommunityService = async ({
  name,
  giver,
  manager,
  task,
}: IRegisterCommunityParams): Promise<ICommunity> => {
  try {
    const community = await CommunityModel.create({
      name,
      giver: new mongoose.Types.ObjectId(giver),
      manger: new mongoose.Types.ObjectId(manager),
      task: new mongoose.Types.ObjectId(task),
      createdAt: new Date(),
    });
    // using the room service to create a default room and returning the community instance with room added
    const CommunityWithRoom = await createDefaultRoomService({
      communityId: String(community._id),
      managerId: manager,
    });

    return CommunityWithRoom;
  } catch (error) {
    throw new Error(`Error registering community: ${error.message}`);
  }
};

export default createCommunityService;
