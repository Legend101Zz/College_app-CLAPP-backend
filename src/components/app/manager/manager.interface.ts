import mongoose, { Document } from 'mongoose';

export interface ITasks {
  taskId: mongoose.Schema.Types.ObjectId;
  // taskName: string;
}
export interface IWallet {
  walletId: mongoose.Schema.Types.ObjectId;
  // walletName: string;
}
export interface IReviews {
  review: string;
  rating: number;
}
export interface IEducation {
  collegeName: string;
  major: string;
}

export interface IExperience {
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date;
}
export interface IManager extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  FullName: string;
  DisName: string;
  Description: string;
  // Skills: ISkills[];
  Education: IEducation;
  Experience: IExperience;
  LinkedIn: string;
  walletId: IWallet;
  Tasks: ITasks[];
  Reviews: IReviews[];
  Specialtags: string[];
}
