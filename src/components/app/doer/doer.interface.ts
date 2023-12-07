import mongoose from 'mongoose';

export interface ITasks {
  taskId: mongoose.Schema.Types.ObjectId;
  taskName: string;
}

export interface IReviews {
  review: string;
  rating: number;
}
export interface IDoer {
  _id: mongoose.Schema.Types.ObjectId;
  ResponseTime: number;
  Tasks: ITasks[];
  Reviews: IReviews[];
  Profile: string;
}
