import RoomModel from './room.model';
import { ICommunity } from '../community/community.interface';
import CommunityModel from '../community/community.model';
import {
  IRoom,
  ICreateDefaultRoomParams,
  ICreateRoomInCommunityServiceParams,
} from './room.interface';

const createDefaultRoomService = async ({
  communityId,
  managerId,
}: ICreateDefaultRoomParams): Promise<ICommunity> => {
  try {
    // Create the default room
    const defaultRoom: IRoom = await RoomModel.create({
      name: 'home',
      community: communityId,
      participants: [{ userId: managerId }],
    });

    const community: ICommunity | null = await CommunityModel.findById(
      communityId,
    );

    if (!community) {
      throw new Error(`Community with ID ${communityId} not found`);
    }

    // Add the default room to the community's rooms array
    community.rooms.push({ roomId: defaultRoom._id });

    // Save the updated community document
    await community.save();

    return community;
  } catch (error) {
    throw new Error(`Error creating default room: ${error.message}`);
  }
};

const createRoomInCommunityService = async ({
  body,
  communityId,
}: ICreateRoomInCommunityServiceParams): Promise<any> => {
  const community = await CommunityModel.findById(communityId);
  if (!community) {
    throw new Error('Community not found');
  }
  const nameWithUnderscores = body.name.replace(/\s/g, '_');
  //   console.log(nameWithUnderscores);
  const room = new RoomModel({
    name: nameWithUnderscores,
    participants: body.participants,
    chats: body.chats,
    community: communityId,
  });
  await room.save();
  return room;
};

export { createDefaultRoomService, createRoomInCommunityService };
