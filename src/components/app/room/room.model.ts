import mongoose, { Schema } from 'mongoose';
import { IRoom } from './room.interface';

const RoomSchema: Schema<IRoom> = new Schema({
  name: String,
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
  participants: [{ userId: mongoose.Schema.Types.ObjectId }],
  chats: [
    {
      id: String,
      timestamp: { type: Number, default: Date.now },
      userId: mongoose.Schema.Types.ObjectId,
      body: String,
    },
  ],
});

const RoomModel = mongoose.model<IRoom>('Room', RoomSchema);
export default RoomModel;
