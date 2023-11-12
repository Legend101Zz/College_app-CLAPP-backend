import mongoose from 'mongoose';

interface IGiver {
  check: boolean;
  giverId: mongoose.Schema.Types.ObjectId;
}

interface ITaker {
  check: boolean;
  takerId: mongoose.Schema.Types.ObjectId;
}
type UserRoles = UserRole[]; // Array of roles

type UserProps = {
  [UserRole.Giver]: Giver;
  [UserRole.Taker]: Taker;
};

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  username: String;
  email: String;
  password?: String;
  googleId: String;
  isGiver?: { check: Boolean; giverId: mongoose.Schema.Types.ObjectId };
  isTaker?: { check: Boolean; takerId: mongoose.Schema.Types.ObjectId };
  role: UserRoles;
  phone?: String;
}

// to do add roles array and add mongoose functions to implement this
