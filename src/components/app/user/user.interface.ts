import mongoose from 'mongoose';

interface IGiver {
  check: boolean;
  giverId: mongoose.Schema.Types.ObjectId;
}

interface ITaker {
  check: boolean;
  takerId: mongoose.Schema.Types.ObjectId;
}

type UserRole = 'normal' | 'giver' | 'taker';

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  googleId: string;
  isGiver?: IGiver;
  isTaker?: ITaker;
  phone?: string;
  userRoles: UserRole[];
}
