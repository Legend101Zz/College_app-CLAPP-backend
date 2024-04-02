import mongoose from 'mongoose';

export interface IChat {
  id: string;
  timestamp: number;
  userId: mongoose.Schema.Types.ObjectId;
  body: string;
}

export interface IParticipants {
  userId: mongoose.Schema.Types.ObjectId;
}

export interface IRoom {
  _id: mongoose.Schema.Types.ObjectId;
  name: String;
  community: mongoose.Schema.Types.ObjectId;
  participants: IParticipants[];
  chats: IChat[];
}

export interface ICreateDefaultRoomParams {
  communityId: string;
  managerId: string;
}
export interface ICreateRoomInCommunityServiceParams {
  body: {
    name: string;
    participants: [{ userId: string }];
    chats?: [{ id: string; timestamp: number; userId: string; body: string }];
  };
  communityId: string;
}
