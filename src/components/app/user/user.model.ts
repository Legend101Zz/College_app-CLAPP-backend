import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String },
  isGiver: {
    check: { type: Boolean, default: false },
    giverId: { type: Schema.Types.ObjectId, ref: '/', default: null },
  },
  isTaker: {
    check: { type: Boolean, default: false },
    takerId: { type: Schema.Types.ObjectId, ref: '/', default: null },
  },
  googleId: { type: String },
  phone: { type: String },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
