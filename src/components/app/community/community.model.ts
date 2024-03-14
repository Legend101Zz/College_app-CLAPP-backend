import mongoose, { Schema } from 'mongoose';
import { ICommunity } from './community.interface';

const CommunitySchema: Schema<ICommunity> = new Schema({
  name: { type: String, required: true },
  doer: [{ doerId: Schema.Types.ObjectId }],
  giver: Schema.Types.ObjectId,
  manager: Schema.Types.ObjectId,
  task: Schema.Types.ObjectId,
  rooms: [{ roomId: Schema.Types.ObjectId }],
  createdAt: { type: Date, default: Date.now },
});

const communityModel = mongoose.model<ICommunity>('Community', CommunitySchema);
export default communityModel;
