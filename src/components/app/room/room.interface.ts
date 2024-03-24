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
