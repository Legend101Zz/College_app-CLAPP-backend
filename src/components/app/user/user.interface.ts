import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  username: String;
  email: String;
  password?: String;
  googleId: String;
  isGiver: { check: Boolean; giverId: mongoose.Schema.Types.ObjectId };
  isTaker: { check: Boolean; takerId: mongoose.Schema.Types.ObjectId };
  phone?: String;
}
