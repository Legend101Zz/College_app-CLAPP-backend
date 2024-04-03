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

type CommunityName = `${string}_${string}`;

const isValidCommunityName = (name: string): name is CommunityName => {
  // 'exampleCommunityName_123456789012345678901234';  Valid community name
  const pattern = /^[a-zA-Z0-9]+_[a-f\d]{24}$/;
  return pattern.test(name);
};

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

export { createCommunityService, isValidCommunityName };
