import mongoose from 'mongoose';

export interface IBadge {
  category: 'rookie' | 'intermediate' | 'advanced';
}
export interface ITasks {
  taskId: mongoose.Schema.Types.ObjectId;
  taskName: string;
}
export interface IGiver {
  _id: mongoose.Schema.Types.ObjectId;
  Badge: IBadge;
  ResponseTime: number;
  Wallet: number;
  Tasks: ITasks;
}
