import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String, required: true },
  isGiver: {
    check: { type: Boolean, default: false },
    giverId: { type: mongoose.Schema.Types.ObjectId },
  },
  isTaker: {
    check: { type: Boolean, default: false },
    takerId: { type: mongoose.Schema.Types.ObjectId },
  },
  phone: { type: String },
  userRoles: [
    { type: String, enum: ['normal', 'giver', 'taker'], default: ['normal'] },
  ],
});

// eslint-disable-next-line func-names

/// =========TO BE DONE ADD A SCHEMA METHOD TO CREATE A USER DETAILS BASED ON ROLE============

// UserSchema.statics.createUserWithRoles = function (
//   this: mongoose.Model<IUser>,
//   username: string,
//   email: string,
//   googleId: string,
//   userRoles: UserRole[],
// ): IUser {
//   const user: IUser = {
//     _id: new mongoose.Types.ObjectId(),
//     username,
//     email,
//     googleId,
//     userRoles,
//   };

//   if (userRoles.includes('giver')) {
//     user.isGiver = {
//       check: true,
//       giverId: new mongoose.Types.ObjectId(),
//     };
//   }

//   if (userRoles.includes('taker')) {
//     user.isTaker = {
//       check: true,
//       takerId: new mongoose.Types.ObjectId(),
//     };
//   }

//   return new this(user);
// };

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
