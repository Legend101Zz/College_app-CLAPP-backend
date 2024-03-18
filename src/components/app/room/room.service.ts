import RoomModel from './room.model';
import communityModel from '../community/community.model';

interface ICreateRoomInCommunityServiceParams {
  body: {
    name: string;
    participants: [{ userId: string }];
    chats?: [{ id: string; timestamp: number; userId: string; body: string }];
  };
  communityId: string;
}
const createRoomInCommunityService = async ({
  body,
  communityId,
}: ICreateRoomInCommunityServiceParams): Promise<any> => {
  const community = await communityModel.findById(communityId);
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

export { createRoomInCommunityService };
